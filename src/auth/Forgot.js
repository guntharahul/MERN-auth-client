import React, { useState, Fragment } from 'react';
import axios from 'axios';
import Layout from '../core/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Forgot = ({ history }) => {
  const [values, setValues] = useState({
    email: 'rahulguntha@gmail.com',
    buttonText: 'Request Password reset Link',
  });
  const { email, buttonText } = values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: 'Submitting' });
    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API_URL}/forgot-password`,
      data: { email },
    })
      .then((response) => {
        console.log('forgot password sucessful', response);
        toast.success(response.data.message);
        setValues({
          ...values,
          buttonText: 'Send email again.',
        });
      })
      .catch((error) => {
        // console.log('signin error', error.response.data.error);
        toast.error(error.response.data.error);
        setValues({ ...values, buttonText: 'Request Password reset Link' });
      });
  };
  const passwordForgotForm = () => (
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

      <div>
        <button className='btn btn-primary' onClick={clickSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  );
  return (
    <Layout>
      <div className='col-md-6 offset-md-3'>
        <ToastContainer></ToastContainer>
        <h1 className='p-5 text-center'>Forgot Password</h1>
        {passwordForgotForm()}
      </div>
    </Layout>
  );
};

export default Forgot;
