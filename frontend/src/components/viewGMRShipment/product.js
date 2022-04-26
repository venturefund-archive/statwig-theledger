import React from "react";
import "./style.scss";

const Product = (props) => {
  return Object.keys(props.shipments).length === 0 ? (
    <div className='row panel justify-content-between'>N/A</div>
  ) : (
    <>
      {props.shipments?.products?.map((product, index) => (
        <div
          className={
            props.productHighLight
              ? "col panel commonpanle highlight mb-3"
              : "col panel commonpanle mb-3"
          }
          key={index}
        >
            <p className='product-name'>OPV - oral polio vaccine</p>
          <div className='d-flex flex-row '>
            <ul className='w-75 elemens'>
              <li className='mb-1 text-secondary'>Product Name</li>
              <li className='mb-1 text-secondary'>Manufacturer</li>
              <li className='mb-1 text-secondary'>Quantity</li>
              <li className='mb-1 text-secondary'>Serial No /Label ID</li>
            </ul>
            <ul className='elemens w-75'>
              <li className='mb-1'>{product.productName}</li>
              <li className='mb-1'>{product.manufacturer}</li>
              <li className='mb-1'>{product.productQuantity}</li>
              <li className='mb-1'>{props.shipments.label.labelId}</li>
            </ul>
            <div></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Product;
