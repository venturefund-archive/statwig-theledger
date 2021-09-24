import React from "react";
import Inventory from '../../components/inventory';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import { useSelector } from "react-redux";

const InventoryContainer = props => {

  const inventories = useSelector(state => {
    return state.inventories;
  });

  const inventoriesCount = useSelector(state => {
    return state.inventoriesCount;
  });

  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <Inventory
            inventoriesCount={inventoriesCount}
            inventoryDetails={inventories}
            {...props}
          />
        </div>
      </div>
    </div>
  );
};

export default InventoryContainer;
