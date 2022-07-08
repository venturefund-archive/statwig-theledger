import React from "react";
import "./bestSellerProduct.scss";

const BestSellerProduct = ({bigBoxColor, smallBoxColor}) => {
  return (
    <div
      className="bestSeller-product-container"
      style={{ backgroundColor: `${bigBoxColor}` }}
    >
      <div className="bestSeller-product-wrapper mi-flex">
        <div
          className="bestSeller-product-logo-container mi-flex-jc"
          style={{ background: `${smallBoxColor} 0% 0% no-repeat padding-box` }}
        >
          <i class="fa-solid fa-prescription-bottle-medical medical-bottle-icon"></i>
        </div>
        <div className="bestSeller-product-content-container">
          <p className="bestSeller-product-heading">Paracetamol</p>
          <p className="bestSeller-product-text">
            1000<span className="bestSeller-product-subtext">(unit)</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BestSellerProduct;
