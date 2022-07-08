import React from "react";
import BestSellerProduct from "../bestSellerProduct/BestSellerProduct";
import "./bestSeller.scss";

const BestSeller = () => {
  const smallBoxColorsArray = [
    "#FDCD42",
    "#FE8E68",
    "#7D4CDC",
    "#51DFB4",
    "#5C6EE7",
  ];
  const bigBoxColorsArray = [
    "#FDCD4224",
    "#FC8F6A33",
    "#7A3DFD29",
    "#4FE0B333",
    "#02268926",
  ];
  return (
    <div className="bestSeller-container">
      <div className="mi-flex-sb mb-4">
        <p className="bestSeller-heading f-500">Best Seller</p>
        <button className="mi-btn view-reports-btn mi-btn-blue">
          View Reports
        </button>
      </div>
      {bigBoxColorsArray.map((bigBoxColor, index) => (
        <BestSellerProduct
          bigBoxColor={bigBoxColor}
          smallBoxColor={smallBoxColorsArray[index]}
        />
      ))}
    </div>
  );
};

export default BestSeller;
