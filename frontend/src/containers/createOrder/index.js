import React from "react";
import CreateOrder from "../../components/createOrder";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";

const createOrderContainer = (props) => {
  return (
    <div className='container-fluid p-0'>
      <Header {...props} />
      <div className='d-flex'>
        <Sidebar {...props} />
        <div className='content'>
          <CreateOrder {...props} />
        </div>
      </div>
    </div>
  );
};

export default createOrderContainer;
