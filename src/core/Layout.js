import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuth, signout } from '../auth/helpers';

const Layout = ({ children, match, history }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const isActive = (path) => {
    if (match.path === path) {
      return {
        color: '#000',
      };
    } else {
      return {
        color: '#FFF',
      };
    }
  };

  const nav = () => (
    <ul className='nav bg-primary'>
      <li className='nav-item'>
        <Link to='/' className=' nav-link' style={isActive('/')}>
          Home
        </Link>
      </li>

      {!isAuth() && (
        <Fragment>
          <li className='nav-item'>
            <Link to='/signup' className='nav-link' style={isActive('/signup')}>
              Signup
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/signin' className='nav-link' style={isActive('/signin')}>
              Signin
            </Link>
          </li>
        </Fragment>
      )}

      {isAuth() && isAuth().role === 'admin' && (
        <Fragment>
          <li className='nav-item'>
            <Link to='/admin' className='nav-link' style={isActive('/admin')}>
              {isAuth().name}
            </Link>
          </li>
        </Fragment>
      )}
      {isAuth() && isAuth().role === 'user' && (
        <Fragment>
          <li className='nav-item'>
            <Link
              to='/private'
              className='nav-link'
              style={isActive('/private')}
            >
              {isAuth().name}
            </Link>
          </li>
        </Fragment>
      )}

      {isAuth() && (
        <Fragment>
          <li className='nav-item' style={{ float: 'right' }}>
            <span
              className='nav-link'
              style={{ cursor: 'pointer', color: '#fff' }}
              onClick={() => {
                signout(() => {
                  history.push('/');
                });
              }}
            >
              Signout
            </span>
          </li>
        </Fragment>
      )}

      {isAuth() && (
        <Fragment>
          <li className='nav-item'>
            <Link
              to='/myhealth'
              className='nav-link'
              style={isActive('/myhealth')}
            >
              My Health
            </Link>
          </li>
        </Fragment>
      )}
    </ul>
  );
  return (
    <Fragment>
      {nav()}
      <div>{children}</div>
    </Fragment>
  );
};

export default withRouter(Layout);
// we can also use match to make the current link active
// and also history we can use location.pathname to get the url
