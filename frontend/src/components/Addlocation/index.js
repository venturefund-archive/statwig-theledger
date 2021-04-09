import React, { useState, useEffect } from 'react';
import Add from '../../assets/icons/add.svg';
import uploadBlue from '../../assets/icons/UploadBlue.svg';
import uploadWhite from '../../assets/icons/UploadWhite.svg';
import { getManufacturers, addNewProduct, addMultipleProducts } from '../../actions/poActions';
import DropdownButton from '../../shared/dropdownButtonGroup';
import Modal from '../../shared/modal';
import './style.scss';
import location from "../../assets/icons/TotalShipmentsDelayed.svg";
const Addlocation=()=>{
return (
 
 <div>      
       <div className="addproduct">
       <h1 className="breadcrumb">ADD NEW LOCATION</h1>
       <div className="card">
         <div className="card-body">
           <div className="d-flex flex-row justify-content-between">
             <div className="col mr-5">
               {/* <div className="form-group">
                 <label htmlFor="shipmentId"> Location Name</label>
                 <input
                   type="text"
                   className="form-control"
                   name="name"
                   placeholder="Enter Location Name"
                   
                 />
               </div> */}
               </div></div>
               <div className="row">
                  <div className="col-md-6 com-sm-12">
               <div className="form-group">
                 <label htmlFor="Location Name">Location Name</label>
                 <input
                   type="number"
                   className="form-control"
                   name="Enter Pincode"
                   maxlength="6"
                   placeholder="Enter Location Name "
                   
                 />
               </div></div></div>
               <div className="row">
                  <div className="col-md-6 com-sm-12">
               <div className="form-group">
                 <label htmlFor="shipmentId">Pincode</label>
                 <input
                   type="number"
                   className="form-control"
                   name="Enter Pincode"
                   maxlength="6"
                   placeholder="Enter Pincode "
                   
                 />
               </div></div></div>
               <div className="row">
                  <div className="col-md-6 com-sm-12">
               <div className="form-group">
                 <label htmlFor="shipmentId"> Flat, House No,Building,Company </label>
                 <input
                   type="text"
                   className="form-control"
                   name="productcategory"
                   placeholder="Enter  Flat, House No,Building,Company "
              
                 />
                 </div></div>
               </div>
               <div className="row">
                  <div className="col-md-6 com-sm-12">
               <div className="form-group">
                 <label htmlFor="shipmentId">Area,Colony,Street,District,Sector,Village </label>
                 <input
                   type="text"
                   className="form-control"
                   name="Area,Colony,Street,District,Sector,Village y"
                   placeholder="Enter Area,Colony,Street,District,Sector,Village "
                   
                 />
               </div></div></div>

               <div className="row">
                  <div className="col-md-6 com-sm-12">
               <div className="form-group">
                 <label htmlFor="shipmentId">Landmark</label>
                 <input
                   type="text"
                   className="form-control"
                   name="Landmark"
                   placeholder="Enter Landmark"
                 
                 />
               </div></div></div>
               <div className="row">
                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label htmlFor="Select Location"  placeholder="Enter Area,Colony,Street,District,Sector,Village ">Select Town/City*</label>
                      <div className="form-control">
                        <DropdownButton
                         
                        />
                      </div>
                    </div>
                  </div>
                  </div>

                  <div className="row">
                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label htmlFor="Select Location">State/ Province/ Region*</label>
                      <div className="form-control">
                        <DropdownButton
                         
                        />
                      </div>
                    </div>
                  </div>
                  </div>

                  
                  <div className="row">
                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label htmlFor="Select Location">Country*</label>
                      <div className="form-control">
                        <DropdownButton
                         
                        />
                      </div>
                    </div>
                  </div>
                  </div>
                 <div>
                 <button id="close" className="btn btn-orange fontSize20 font-bold mr-4">
                <span>Request Admin For Approval</span>
              </button>
        
              </div>
             </div>
             </div>
          </div>
        </div>
      
              
                    
)}

export default Addlocation;
