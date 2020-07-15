import React, { useState, Fragment } from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';

const Google = ({ informParent }) => {
  const responseGoogle = (response) => {
    console.log(response.tokenId);
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/google-login`,
      data: { idToken: response.tokenId },
    })
      .then((response) => {
        console.log('Google SignIn sucessful', response);
        // inform parent component (SignIn) which is to save user info in local storage and token in cookie
        informParent(response);
      })
      .catch((error) => {
        console.log('Google Signin error', error.response);
      });
  };
  return (
    <div className='pb-3'>
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};
export default Google;
