import React, { useState, Fragment } from 'react';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';

const Facebook = ({ informParent }) => {
  const responseFacebook = (response) => {
    console.log(response);
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/facebook-login`,
      data: { userID: response.userID, accessToken: response.accessToken },
    })
      .then((response) => {
        console.log('Facebook SignIn sucessful', response);
        // inform parent component (SignIn) which is to save user info in local storage and token in cookie
        informParent(response);
      })
      .catch((error) => {
        console.log('Facebook Signin error', error.response);
      });
  };
  return (
    <div className='pb-3'>
      <FacebookLogin
        appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
        autoLoad={false}
        fields='name,email,picture'
        icon='fa-facebook'
        callback={responseFacebook}
      />
    </div>
  );
};
export default Facebook;
