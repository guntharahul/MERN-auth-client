import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Layout from '../core/Layout';
import { ToastContainer, toast } from 'react-toastify';
import { isAuth, getCookie, signout, updateUser } from '../auth/helpers';
import 'react-toastify/dist/ReactToastify.min.css';

const Admin = ({ history }) => {
  const [values, setValues] = useState({
    role: '',
    name: '',
    email: '',
    password: '',
    buttonText: 'Update',
  });
  const token = getCookie('token');

  useEffect(() => {
    loadProfile();
  }, []);

  //get user data when the component is loaded so that for has the data
  const loadProfile = () => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/user/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log('private profile update');
        console.log(response);
        const { email, role, name } = response.data;
        setValues({ ...values, name: name, email: email, role: role });
      })
      .catch((error) => {
        console.log('private profile update error', error.response.data.error);
        //if token is expired redirecting the user to home
        if (error.response.status === 401) {
          signout(() => {
            history.push('/');
          });
        }
      });
  };

  const { name, role, email, password, buttonText } = values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: 'Updating' });
    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API_URL}/admin/update`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { name, password },
    })
      .then((response) => {
        console.log('private :profile update sucessful', response);
        updateUser(response, () => {
          setValues({
            ...values,
            buttonText: 'Update',
          });
          toast.success('profile update sucessfully');
        });
      })
      .catch((error) => {
        console.log('private profile update error', error.response.data.error);
        setValues({ ...values, buttonText: 'Update' });
        toast.error(error.response.data.error);
      });
  };
  // onchange method updates the values in the state and are shown in the form

  const updateForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Role</label>
        <input
          type='text'
          value={role}
          className='form-control'
          readOnly
        ></input>
      </div>
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
          readOnly
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
      <div className='col-md-6 offset-md-3'>
        <ToastContainer></ToastContainer>
        <h1 className='p-5 text-center'>Admin: Update profile</h1>
        {updateForm()}
      </div>
    </Layout>
  );
};

export default Admin;
