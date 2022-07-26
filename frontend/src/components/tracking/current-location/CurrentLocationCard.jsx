import React from "react";
import "./currentLocationCard.scss";
import ProductListingCard from "./ProductListingCard";

const CurrentLocationCard = () => {
  return (
    <div className="current-location-container">
      <div className="mi-flex-sb current-location-header pb-2">
        <div className="mi-flex-ac">
          <div className="mi-flex-ac">
            <div className="current-location-icon-ctn">
              <i className="fa-solid fa-location-dot current-location-icon"></i>
            </div>
          </div>
          <div className="mi-flex f-col">
            <h6 className="current-loc-org-name">ABC Organization Pvt, Ltd</h6>
            <p className="current-loc-address">
              IT Hub, VP road Pune Maharashtra 400096 India
            </p>
          </div>
        </div>
        <div className="current-loc-date">12/05/2022</div>
      </div>
      <div className="mt-2 mb-4">
        <p className="product-listing-heading">Product List</p>
        <ProductListingCard />
        <ProductListingCard />
      </div>
    </div>
  );
};

export default CurrentLocationCard;
