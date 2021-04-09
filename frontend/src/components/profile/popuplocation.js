import React, {useState} from "react";
import { Formik } from "formik";
import FailedPopUp from "../../shared/PopUp/failedPopUp";
import Modal from "../../shared/modal";
import { useDispatch } from "react-redux";
import CloseIcon from '../../assets/icons/cross.svg';
import DropdownButton from "../../shared/dropdownButtonGroup";
import {
    Link
  } from "react-router-dom";

 const PopUpLocation=()=>{
    
    return (
    <div>   
<center><h1 className="breadcrumb">Add Location</h1></center><br></br>

                <div class="wrapper">
                <Link to ={'/Addlocation'}>
                     <button className="btn btn-orange fontSize20 font-bold mr-4">
                    <span>Add New Location</span>
                  </button>
                  </Link>
                </div>
               <center><h4>-----------        OR         ---------</h4></center> 
               <div className="row">
                  <div className="col-md-6 com-sm-12">
                    <div className="form-group">
                      <label htmlFor="Select Location">Select Location*</label>
                      <div className="form-control">
                        <DropdownButton
                         
                        />
                      </div>
                    </div>
                  </div>
                  </div>
                 
                
                <br></br><br></br>
                     <div>
                     <button id="close" className="btn btn-orange fontSize20 font-bold mr-4" disabled>
                    <span>Continue</span>
                  </button>
                </div>  
                </div>
                  
                        
    )}
    export default PopUpLocation;