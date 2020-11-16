import { Navigation } from 'react-minimal-side-navigation';
import { useHistory, useLocation } from 'react-router-dom';
import Icon from 'awesome-react-icons';
import React, { useState } from 'react';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

export const LeftNav = () => {
  const history = useHistory();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <React.Fragment>
      <div>
        <div className='absolute bottom-0 w-full my-8'>
          <Navigation
            activeItemId={location.pathname}
            items={[
              {
                title: 'Profile',
                itemId: '/profile',
                elemBefore: () => <Icon name='user' />,
              },
            ]}
          />
          <Navigation
            activeItemId={location.pathname}
            items={[
              {
                title: 'Settings',
                itemId: '/settings',
                elemBefore: () => <Icon name='settings' />,
              },
            ]}
          />
          <Navigation
            activeItemId={location.pathname}
            items={[
              {
                title: 'Your Points',
                itemId: '/points',
                elemBefore: () => <Icon name='activity' />,
              },
            ]}
          />
        </div>
        <Navigation
          activeItemId={location.pathname}
          items={[
            {
              title: 'Redeem Points',
              itemId: '/redeempoints',
              elemBefore: () => <Icon name='star' />,
              subNav: [
                {
                  title: 'Chemist Shops',
                  itemId: '/about/chemist',
                },
                {
                  title: 'Super Marlets',
                  itemId: '/about/supermarlets',
                },
                {
                  title: 'Medical Consultation',
                  itemId: '/about/medicalconsultation',
                },
                {
                  title: 'Dieticians',
                  itemId: '/about/dieticians',
                },
                {
                  title: 'Gyms',
                  itemId: '/about/gyms',
                },
                {
                  title: 'Organic Stores',
                  itemId: '/about/organicstores',
                },
              ],
            },
          ]}
        />
      </div>
    </React.Fragment>
  );
};

export default LeftNav;
