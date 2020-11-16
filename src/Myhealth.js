import React from 'react';
import Layout from './core/Layout';
import LeftNav from './LeftNav';
import PageInfo from './PageInfo';

const Myhealth = () => {
  return (
    <div>
      {' '}
      <Layout>
        <div className='row col-md-12'>
          <LeftNav className='col-md-4'></LeftNav>
          <PageInfo></PageInfo>
        </div>
      </Layout>
    </div>
  );
};

export default Myhealth;
