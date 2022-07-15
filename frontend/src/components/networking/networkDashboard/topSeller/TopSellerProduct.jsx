import React from "react";

const TopSellerProduct = ({ bigBoxColor, smallBoxColor, Distributor }) => {
  return (
    <>
      <div
        className="best-seller-card"
        style={{ backgroundColor: `${bigBoxColor}` }}
      >
        <div
          className="best-seller-icon-space"
          style={{ background: `${smallBoxColor} ` }}
        >
          <i class="fa-solid fa-prescription-bottle-medical light"></i>
        </div>
        <div className="best-seller-content">
          <div className="product-details">
            <p className="mi-body-md f-500 mi-reset">Paractamol</p>
            <div className="mi-table-data">
              <p className="mi-body-xs black f-700 mi-reset">10000 (Pks)</p>
            </div>
          </div>
          {Distributor && (
            <div className="manufacturer-details">
              <p className="mi-body-sm grey f-400 mi-reset">ABC Manufacturer</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TopSellerProduct;
