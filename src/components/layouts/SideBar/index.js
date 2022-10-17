import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import SideBarItem from './SideBarItem';

const sidebarItems = [
  {
    label: 'My Wallet',
    path: '/my-wallet',
    iconClassName: 'fa fa-credit-card fa-2x',
  },
  {
    label: 'Transaction',
    path: '/transaction',
    iconClassName: 'fa fa-money fa-2x',
  },
  {
    label: 'Report',
    path: '/report',
    iconClassName: 'fa fa-pie-chart fa-2x',
  },
];

const SideBar = () => {
  const location = useLocation();
  return (
    <Navbar variant='dark' bg='dark' className='h-100 text-secondary d-flex align-items-start pt-3'>
      <Nav
        activeKey={location.pathname}
        className=' d-flex flex-column justify-content-start align-items-center w-100'>
        {sidebarItems.map((item, index) => (
          <SideBarItem {...item} key={index} />
        ))}
      </Nav>
    </Navbar>
  );
};

export default SideBar;
