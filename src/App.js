import React from 'react';
import Layout from './core/Layout';
import LeftNav from './LeftNav';
import PageInfo from './PageInfo';

const App = () => {
  return (
    <Layout>
      <div style={{ background: 'lightgrey' }}>
        <div className='row'>
          <h1 style={{ fontSize: '14em', margin: 'auto', color: 'green' }}>
            Your Health
          </h1>
        </div>
        <div className='row'>
          <h1 style={{ fontSize: '14em', margin: 'auto', color: 'red' }}>
            Our Concern
          </h1>
        </div>
        <footer style={{ margin: 'auto' }}>
          <div className='row'>
            <h6
              style={{
                margin: 'auto',
                position: 'fixed',
                textAlign: 'center',
                left: 0,
                bottom: 0,
              }}
            >
              copyright &copy; Incentives.Help{' '}
            </h6>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default App;
