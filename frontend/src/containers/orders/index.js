import React from "react";
import Orders from "../../components/orders";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { useTranslation } from "react-i18next";

const OrdersContainer = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <div className='container-fluid p-0'>
      <Header {...props} t={t} />
      <div className='d-flex'>
        <Sidebar {...props} t={t} />
        <div className='content'>
          <Orders {...props} i18n={i18n} t={t} />
        </div>
      </div>
    </div>
  );
};

export default OrdersContainer;
