import React from "react";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { useTranslation } from "react-i18next";
import TestMap from "../../components/testMap/TestMap";

const TestMapContainer = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <div className='container-fluid p-0'>
      <Header {...props} t={t} />
      <div className='d-flex'>
        <Sidebar {...props} t={t} />
        <div className='Map-content'>
          <TestMap />
        </div>
      </div>
    </div>
  );
};

export default TestMapContainer;
