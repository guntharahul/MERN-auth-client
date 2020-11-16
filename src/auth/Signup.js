import React, { useState, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Layout from '../core/Layout';
import { ToastContainer, toast } from 'react-toastify';
import { isAuth } from '../auth/helpers';
import 'react-toastify/dist/ReactToastify.min.css';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    policynumber: '',
    policyprovider: '',
    age: '',
    bmi: '',
    disease: '',
    gender: '',
    buttonText: 'Submit',
  });
  const {
    name,
    email,
    password,
    policynumber,
    policyprovider,
    age,
    bmi,
    gender,
    disease,
    buttonText,
  } = values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleDropdownChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: 'Submitting' });
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/signup`,
      data: {
        name,
        email,
        password,
        policynumber,
        policyprovider,
        bmi,
        age,
        gender,
        disease,
      },
    })
      .then((response) => {
        console.log('signup sucessful', response);
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          policynumber: '',
          policyprovider: '',
          bmi: '',
          age: '',
          disease: '',
          gender: '',
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
          placeholder='Enter your Name'
          type='text'
          value={name}
          className='form-control'
          onChange={handleChange('name')}
        ></input>
      </div>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          placeholder='Enter your email ID'
          type='email'
          value={email}
          className='form-control'
          onChange={handleChange('email')}
        ></input>
      </div>
      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          placeholder='Enter Password'
          type='password'
          value={password}
          className='form-control'
          onChange={handleChange('password')}
        ></input>
      </div>
      <div className='form-group'>
        <label className='text-muted'>Policy Provider</label>
        <input
          placeholder='Enter Policy Provider'
          type='text'
          value={policyprovider}
          className='form-control'
          onChange={handleChange('policyprovider')}
        ></input>
      </div>
      <div className='form-group'>
        <label className='text-muted'>Policy Number</label>
        <input
          placeholder='Enter your policy number'
          type='text'
          value={policynumber}
          className='form-control'
          onChange={handleChange('policynumber')}
        ></input>
      </div>
      <div className='form-group'>
        <label className='text-muted'>Age</label>
        <input
          placeholder='Enter your age'
          type='text'
          value={age}
          className='form-control'
          onChange={handleChange('age')}
        ></input>
      </div>
      <div className='form-group'>
        <label className='text-muted'>BMI</label>
        <select
          className='form-control'
          defaultValue={bmi}
          onChange={handleDropdownChange('bmi')}
        >
          <option value='N/A'>Select BMI range</option>
          <option value='45-51'>45-51</option>
          <option value='52-59'>52-59</option>
          <option value='59-64'>59-64</option>
        </select>
      </div>
      <div className='form-group'>
        <label className='text-muted'>Gender</label>
        <select
          className='form-control'
          defaultValue={gender}
          onChange={handleDropdownChange('gender')}
        >
          <option value='N/A'>Select your gender</option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
          <option value='other'>Other</option>
          <option value='nodata'>Prefer not to say</option>
        </select>
      </div>
      <div className='form-group'>
        <label className='text-muted'>Disease</label>
        <select
          className='form-control'
          defaultValue={disease}
          onChange={handleDropdownChange('disease')}
        >
          <option value='N/A'>Select Disease</option>
          <option value='type1diabetes'>Type 1 Diabetes</option>
          <option value='type2diabetes'>Type 2 Diabetes</option>
          <option value='cerebrovasculardisease'>
            Cerebrovascular Disease
          </option>
          <option value='septicemia'>Septicemia</option>
          <option value='malignantneoplasm'>Malignant Neoplasm</option>
          <option value='heartdisease'>Heart Related Disease</option>
          <option value='chromicliverdisease'>Chronic Liver Disease</option>
          <option value='none'>None</option>
        </select>
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
