import React, { useEffect, useState, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Layout from '../core/Layout';
import { ToastContainer, toast } from 'react-toastify';
import jwt from 'jsonwebtoken';
import 'react-toastify/dist/ReactToastify.min.css';
const Activate = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    token: '',
    show: true,
  });
  useEffect(() => {
    let token = match.params.token;
    let tokendata = jwt.decode(token);
    if (token) {
      setValues({ ...values, name: tokendata.name, token });
    }
  }, []);

  const { name, token, show } = values;

  const clickSubmit = (event) => {
    event.preventDefault();
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/account-activation`,
      data: { token },
    })
      .then((response) => {
        // console.log('Account Activation', response);
        setValues({
          ...values,
          show: false,
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        // console.log('Account activation error', error.response.data.error);
        toast.error(error.response.data.error);
      });
  };
  const activationLink = () => (
    <div className='text-center'>
      <h1 className='p-5 '>Hey {name}, ready to activate account</h1>
      <button className='btn btn-outline-primary' onClick={clickSubmit}>
        Activate Account
      </button>
    </div>
  );

  return (
    <Layout>
      <div className='col-md-6 offset-md-3'>
        <ToastContainer></ToastContainer>
        {activationLink()}
      </div>
    </Layout>
  );
};

export default Activate;
