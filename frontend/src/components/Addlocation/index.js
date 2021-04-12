import React, { useState, useEffect } from 'react';
import DropdownButton from '../../shared/dropdownButtonGroup';



const Addlocation=()=>{
return (
 
 <div>      
       <div className="addproduct">
       <h1 className="breadcrumb">ADD NEW LOCATION</h1>
       <div className="card">
         <div className="card-body">
           <div className="d-flex flex-row justify-content-between">
             <div className="col mr-5">
               
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
                 <label htmlFor="Pincode">Pincode</label>
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
                 <label htmlFor="Flat"> Flat, House No,Building,Company </label>
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
                 <label htmlFor="Area">Area,Colony,Street,District,Sector,Village </label>
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
                 <label htmlFor="Landmark">Landmark</label>
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
                      <label htmlFor="State/ Province/ Region*">State/ Province/ Region*</label>
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
                      <label htmlFor="Country*">Country*</label>
                      <div className="form-control">
                        <DropdownButton
                         
                        />
                      </div>
                    </div>
                  </div>
                  </div>
                 <div>
                 <button class="close" className="btn btn-orange fontSize20 font-bold mr-4">
                <span>Request Admin For Approval</span>
              </button>
        
              </div>
             </div>
             </div>
          </div>
        </div>                 
)}

export default Addlocation;
