import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const SideBarItem = ({ path, label, iconClassName }) => {
  return (
    <Nav.Item className='w-100 mb-3'>
      <Nav.Link
        as={NavLink}
        to={path}
        className='d-flex flex-column align-items-center'
      >
        <i className={iconClassName} />
        <span className='d-none d-sm-inline'>{label}</span>
      </Nav.Link>
    </Nav.Item>
  );
};

export default SideBarItem;
