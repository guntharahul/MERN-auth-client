import React, { useState, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Layout from '../core/Layout';
import { ToastContainer, toast } from 'react-toastify';
import { isAuth } from '../auth/helpers';
import 'react-toastify/dist/ReactToastify.min.css';
const Signup = () => {
  const [values, setValues] = useState({
    name: 'Rahul',
    email: 'rahulguntha@gmail.com',
    password: 'Rahulg27',
    buttonText: 'Submit',
  });
  const { name, email, password, buttonText } = values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: 'Submitting' });
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/signup`,
      data: { name, email, password },
    })
      .then((response) => {
        console.log('signup sucessful', response);
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          buttonText: 'submitted',
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log('signup error', error.response.data);
        setValues({ ...values, buttonText: 'submit' });
        toast.error(error.response.data.error);
      });
  };
  const signUpForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          type='text'
          value={name}
          className='form-control'
          onChange={handleChange('name')}
        ></input>
      </div>
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
      <div className='container my-4 col-md-6  offset-md-3  border border-light p-5'>
        <ToastContainer></ToastContainer>
        {/* check user if already signed in then redirect */}
        {isAuth() ? <Redirect to='/'></Redirect> : null}
        <h1 className='p-5 text-center'>SignUp</h1>
        {signUpForm()}
        <p className='pt-5'>
          Already have an account ? <Link to='/signin'>SignIn</Link>
        </p>
      </div>
    </Layout>
  );
};

export default Signup;
