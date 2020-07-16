import React, { useState, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Layout from '../core/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { authenticate, isAuth } from './helpers';
import Google from './Google';
import Facebook from './Facebook';

const Signin = ({ history }) => {
  const [values, setValues] = useState({
    email: 'rahulguntha@gmail.com',
    password: 'Rahulg27',
    buttonText: 'Submit',
  });
  const { email, password, buttonText } = values;

  const informParent = (response) => {
    authenticate(response, () => {
      setValues({
        ...values,
        email: '',
        password: '',
        buttonText: 'Submitted',
      });
      isAuth() && isAuth().role === 'admin'
        ? history.push('/admin')
        : history.push('/private');
    });
  };
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: 'Submitting' });
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/signin`,
      data: { email, password },
    })
      .then((response) => {
        console.log('signin sucessful', response);
        // save the response token and user data to local storage and a cookie
        authenticate(response, () => {
          setValues({
            ...values,
            email: '',
            password: '',
            buttonText: 'Submitted',
          });
          // toast.success(`Hey ${response.data.user.name}, welcome back`);
          // redirecting user based on role instead of toast message
          isAuth() && isAuth().role === 'admin'
            ? history.push('/admin')
            : history.push('/private');
        });
      })
      .catch((error) => {
        console.log('signin error', error.response.data.error);
        setValues({ ...values, buttonText: 'submit' });
        toast.error(error.response.data.error);
      });
  };
  const signInForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          type='email'
          value={email}
          className='form-control'
          onChange={handleChange('email')}
        ></input>
      </div>
      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          type='password'
          value={password}
          className='form-control'
          onChange={handleChange('password')}
        ></input>
      </div>
      <div>
        <button className='btn btn-primary' onClick={clickSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  );
  return (
    <Layout>
      <div className='container my-4 col-md-6  offset-md-3 border border-light p-5'>
        <ToastContainer></ToastContainer>
        {isAuth() ? <Redirect to='/'></Redirect> : null}
        <h1 className='p-5 text-center'>SignIn</h1>
        {signInForm()}
        <br />
        <Link to='/auth/password/forgot'>Forgot Password?</Link>
        <p className='pt-5'>
          Don't have an account ? <Link to='signup'>SignUp</Link>
        </p>
        <Google informParent={informParent}></Google>
        <Facebook informParent={informParent}></Facebook>
      </div>
    </Layout>
  );
};

export default Signin;
