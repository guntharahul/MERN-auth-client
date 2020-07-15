import React, { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import Layout from '../core/Layout';
import { ToastContainer, toast } from 'react-toastify';
import jwt from 'jsonwebtoken';
import 'react-toastify/dist/ReactToastify.min.css';

const Reset = ({ match }) => {
  // get params by using match props from react-router dom.
  const [values, setValues] = useState({
    name: '',
    token: '',
    newPassword: '',
    buttonText: 'Reset Password',
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);
    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);

  const { name, token, newPassword, buttonText } = values;

  const handleChange = (event) => {
    setValues({ ...values, newPassword: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: 'Submitting' });
    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API_URL}/reset-password`,
      data: { newPassword, resetPasswordLink: token },
    })
      .then((response) => {
        console.log('reset password sucessful', response);
        toast.success(response.data.message);
        setValues({
          ...values,
          buttonText: 'Reset Sucessful',
        });
      })
      .catch((error) => {
        // console.log('reset password error', error.response.data.error);
        toast.error(error.response.data.error);
        setValues({ ...values, buttonText: 'Reset Password' });
      });
  };
  const passwordResetForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>New Password</label>
        <input
          type='password'
          value={newPassword}
          className='form-control'
          onChange={handleChange}
          placeholder='Type new password'
          required
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
        <h1 className='p-5 text-center'>Hey {name},type your new Password</h1>
        {passwordResetForm()}
      </div>
    </Layout>
  );
};

export default Reset;
