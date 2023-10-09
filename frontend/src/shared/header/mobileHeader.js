import React, { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/brands/eVAXIN.png";

import "./mobile-header-style.scss";

const MobileHeader = (props) => {
  const [sidebar, openSidebar] = useState(false);

  return (
    <div className='mobile-header'>
      <Link className='branding' to='/'>
        <img src={logo} alt='eVaxin' />
      </Link>
      <div className='actions'>
        <div className='mobile-menu' onClick={() => openSidebar(!sidebar)}>
          <i className='fa fa-bars' aria-hidden='true'></i>
        </div>
        {sidebar && (
          <div className='slider-menu nav flex-column'>
            <>
              <Link className='slider-item nav-link' to='/login'>
                Login
              </Link>
              <Link className='slider-item nav-link' to='/signup'>
                Sign Up
              </Link>
            </>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileHeader;
