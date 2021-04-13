import React, { useState, useEffect } from 'react';
import DropdownButton from '../../shared/dropdownButtonGroup';
import Location from '../../assets/icons/CurrentLocation1.png';
// import React, { useState,useRef } from 'react';

import './style.scss';



const Addlocation=()=>{
return (
      
<div> 
    
<div className="addproduct">
    <h1 className="breadcrumb">ADD NEW LOCATION</h1>
   <div className="card">
        <div className="card-body">
            <div className="d-flex flex-row justify-content-between">
                <div className="col mr-5">
                </div>
            </div>
            <div className="row">
              <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                        <label htmlFor="Location Name">Location Name*</label>
                        <input
                        type="text"
                        className="form-control"
                        name="Enter Name"
                        placeholder="Enter Location Name "/>
                         {/* <div className="d-flex justify-content-between">
          <div className="d-flex">
          <button className="btn btn-blue btn-lg float-right">
          <img src={Location} width="26" height="26" className="mr-2 mb-1" />
          <span style={{color:'white'}}>Use my current Location</span>
          </button>

          </div>
          </div>  */}
                       </div>
                       
                    </div>
             
                </div>
               
                <p></p>
          
          <div className="login-wrappe">
         
          <label htmlFor="Flat"> Pincode* </label>
          <div className="container">
    <div className="row">
          <div className="col-sm-6 col-lg-5">
          <div className="login-form">
          <div className="form-groupverify pl-5 pr-5 mb-5">
          <input 
                  id="1"
                  type='text'
                  className="form-controlverify mr-3" 
                  maxlength="1"
                  />
                   <input 
                  id="2"
                  type='text' 
                  className="form-controlverify mr-3" 
                  maxlength="1"
                 
               />

                <input 
                 id="3"
                 type='text' 
                 className="form-controlverify mr-3" 
                 maxlength="1"
               
                 />

                <input 
                  id="4"
                  type='text' 
                  className="form-controlverify mr-3" 
                  maxlength="1"
                   
                  />
                   <input 
                 id="5"
                 type='text' 
                 className="form-controlverify mr-3" 
                 maxlength="1"
               
                 />

                <input 
                  id="6"
                  type='text' 
                  className="form-controlverify mr-3" 
                  maxlength="1"
                   
                  />
                  

          </div></div></div></div></div></div>
          
          <br></br><br></br>
           <div className="row">
                <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                    <label htmlFor="Flat"> Flat, House No,Building,Company* </label>
                    <input
                    type="text"
                    className="form-control"
                    name="productcategory"
                    placeholder="Enter  Flat, House No,Building,Company "
                
                    />
                    </div>
                </div>
           </div>
  
           <div className="row">
                <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                    <label htmlFor="Area">Area,Colony,Street,District,Sector,Village* </label>
                    <input
                    type="text"
                    className="form-control"
                    name="Area,Colony,Street,District,Sector,Village y"
                    placeholder="Enter Area,Colony,Street,District,Sector,Village "
                    
                    />
                    </div>
                </div>
           </div>

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
              <div className="col-md-6 com-sm-16">
                <div className="form-group">
                  <label htmlFor="Select Location"  placeholder="Enter Area,Colony,Street,District,Sector,Village ">Select Town/City*</label>
                  <div className="form-control" >
                    <DropdownButton>
                      
                    </DropdownButton>
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
              
             <button class="close" className="btn btn-yellow btn-lg float-right">
            <span>Request Admin For Approval</span>
          </button>
    
          </div>
         </div>
         </div>
         </div></div>       
)}

export default Addlocation;
