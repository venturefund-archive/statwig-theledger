import React, { Component } from 'react';
import ProfilePic from '../../assets/brands/user-image/Image73@2x.png';
import { useDispatch } from 'react-redux';
import DropdownButton from '../../shared/dropdownButtonGroup';
import Pen from '../../assets/icons/pen.svg';
import Mail from '../../assets/icons/mail.svg';
import './style.scss';
import { config } from '../../config';
const axios = require('axios');
import { getUserInfoUpdated, updateProfile, getUserInfo, setCurrentUser } from '../../actions/userActions';
import { getWarehouseByOrgId } from '../../actions/productActions';
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from 'jwt-decode';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      profile: null,
      editMode: false,
      role: '',
      organisation: '',
      warehouseId: '',
      lastName: '',
      walletAddress: '',
      phoneNumber: '',
      status: '',
      email: '',
      profileData: {},
      profile_picture: '',
      message: '',
      location: '',
      orgs: [],
      wareIds: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  async componentDidMount() {

    const response = await getUserInfoUpdated();
    if (response.status === 200) {
      const {
        profile_picture,
        email,
        firstName,
        lastName,
        phoneNumber,
        address,
        organisation,
        warehouseId,
        status,
        role,
        location,
      } = response.data.data;
      this.setState({
        profile_picture,
        email,
        firstName,
        lastName,
        phoneNumber,
        walletAddress: address,
        organisation,
        warehouseId,
        status,
        role,
        profileData: response.data.data,
        location
      });
    } else {
      //error
    }
    const item = this.state.organisation.split('/')[1]
    const wareHouseResponse = await getWarehouseByOrgId(item);
    if (wareHouseResponse.status === 1) {
      const wareHouseIdResult = wareHouseResponse.data.map((txn) => txn.id)
      this.setState({ wareIds: wareHouseIdResult })
    }

  }
  
  onCancel() {
    const {
      prof,
      email,
      firstName,
      lastName,
      phoneNumber,
      address,
      organisation,
      warehouseId,
      status,
      location,
    } = this.state.profileData;

    this.setState({
      editMode: false,
      profile: prof,
      email,
    firstName,
      phoneNumber,
      walletAddress: address,
      organisation,
      warehouseId,
     lastName,
      status,
      location,
    });
  }

  onChange(e) {
    this.setState({ selectedFile: event.target.files[0] })
    e.preventDefault();
    const formData = new FormData();
    formData.append('profile', event.target.files[0]);
    const configs = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    if (event.target.files[0]) {
      axios
        .post(config().upload, formData, configs)
        .then(response => {
          alert('Profile Picture updated Successfully');
          this.setState({ profile_picture: response.data.data })
        })
        .catch(error => {
          alert(error);
        });
      this.setState({ selectedFile: null });

    }
    else {
      alert('File not selected, please try again')
    }
  }

  async onSubmit() {
    const { firstName,lastName, organisation, warehouseId, phoneNumber, location } = this.state;
    const data = { firstName,lastName, organisation, warehouseId, phoneNumber, location };
    const result = await updateProfile(data);

    if (result.status === 200) {
      this.setState({ message: result.data.message, editMode: false });
      const dispatch = useDispatch();
      if (result.data.data.isRefresh) {
        localStorage.removeItem('theLedgerToken');
        const token = result.data.data.token;
        setAuthToken(token);
        const decoded = jwt_decode(token);
        localStorage.setItem('theLedgerToken', token);
        dispatch(setCurrentUser(decoded));
      }
      dispatch(getUserInfo());
      history.push('/profile');
    } else {
      this.setState({ message: 'Error while updating please try again.' });
    }
  }



  render() {
    const {
      editMode,
      role,
      organisation,
      warehouseId,
      walletAddress,
      phoneNumber,
      status,
      email,
     firstName,
      message,
      lastName,
      location,
      orgs,
      wareIds,
      profile_picture
    } = this.state;

    return (
      <div className="profile">
        <h1 className="breadcrumb">Profile</h1>
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-row justify-content-between">
              <div className="col-2">
                <div className="userPic mb-4 mr-2">
                  <img
                    src={this.props.user.photoId}
                    className="rounded rounded-circle"
                  />
                </div>
                <input
                  id="profile"
                  onChange={this.onChange}
                  type="file"
                  ref={ref => (this.upload = ref)}
                  style={{ display: 'none' }}
                />
                {editMode ? (
                  <button
                    type="button"
                    onClick={e => this.upload.click()}
                    className="btn btn-outline-info"
                  >
                    Change Photo
                  </button>
                ) : ''}
              </div>
              <div className="col-8 mt-5">
                {editMode ? (

                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="shipmentId"> First Name</label>
                      <input
                        className="form-control"
                        value={firstName}
                        onChange={e => this.setState({ firstName: e.target.value })}
                      />

                    </div>
                    <div className="form-group">
                      <label htmlFor="shipmentId">Last Name</label>
                      <input
                        className="form-control"
                        value={lastName}
                        placeholder="Enter last Name"
                        onChange={e =>
                          this.setState({
                            lastName: e.target.value,
                          })
                        }

                      />

                    </div>
                    <div className="form-group">
                      <label htmlFor="shipmentId">Organisation</label>
                      <input
                        className="form-control wallet"
                        disabled
                        value={this.state.organisation}
                       />
                    </div>
                    <div className="form-group">
                      <label htmlFor="shipmentId">Email</label>
                      <input
                        className="form-control wallet"
                        disabled
                        value={this.props.user.emailId}
                        onChange={e =>
                          this.setState({ email: e.target.value })
                        }
                      />

                    </div>
                    <div className="form-group">
                      <label htmlFor="shipmentId">Phone</label>
                      <input
                      placeholder="Enter PhoneNumber"
                        className="form-control"
                        value={phoneNumber}
                        onChange={e => this.setState({ phoneNumber: e.target.value })}
                      />


                    </div>
                    <div className="col">
                        <div className="row location">
                          MY LOCATIONS
                        </div>
                    </div>
                    <div className="col">
                      <div className="row">
                        <div className="col-sm-12 col-lg-7 col-xl-7 location-cards">  
                        <div className="custom-card">
                          <div className="card-header">
                            <div className="d-flex align-items-center justify-content-between">
                              <h5 className="card-title font-weight-bold">HEAD OFFICE</h5>
                              <button
                                className="btn-primary btn edit-button"
                              >
                                <img src={Pen} width="15" height="15" className="mr-2" />
                                <span>EDIT</span>
                              </button>
                            </div>
                          </div>
                          <div className="card-body">
                            <div className="total">
                              City, State, Country
                            </div>
                            <div className="full-address">
                            50 /b/, Takshila Apt, Mahakali Caves Road, Chakala, Andheri (west) Mumbai, Maharashtra,
                            </div>  
                            <div className="pin-code">
                            Zip Code: 400016
                            </div>                                                  
                          </div>                        
                        </div>    
                      </div> 
                      </div>
                    </div>                   


                  </div>


                ) : (
                  <div>
                      <div className="col">
                        <div className="row role">
                          {this.state.role ? <span>{this.state.role}</span> : <span>N/A</span>}
                        </div>
                        <div className="row name">
                          {this.state.firstName ? <span>{this.state.firstName}   </span> : <span>N/A</span>}{this.state.lastName ? <span>{this.state.lastName}</span> : <span>N/A</span>}
                        </div>   
                        <div className="row row-list">
                          <img src={Mail} width="20" height="20" className="mr-3" />
                          {this.state.organisation ? <span>{this.state.organisation}</span> : <span>N/A</span>}
                        </div>   
                        <div className="row row-list">
                          <img src={Mail} width="20" height="20" className="mr-3" />
                          {this.props.user.emailId ? <span>{this.props.user.emailId}</span> : <span>N/A</span>}
                        </div>   
                        <div className="row row-list">
                          <img src={Mail} width="20" height="20" className="mr-3" />
                          {this.state.phoneNumber ? <span>{this.state.phoneNumber}</span> : <span>N/A</span>}
                        </div>                                                                                                               
                      </div>
                      <div className="col">
                        <div className="row location">
                          MY LOCATIONS
                        </div>
                      </div>
                      <div className="col">
                        <div className="row">
                        <div className="col-sm-12 col-lg-7 col-xl-7 location-cards">  
                          <div className="custom-card">
                            <div className="card-header">
                              <div className="d-flex align-items-center justify-content-between">
                                <h5 className="card-title font-weight-bold">HEAD OFFICE</h5>
                                <button
                                  className="btn-primary btn edit-button"
                                >
                                  <img src={Pen} width="15" height="15" className="mr-2" />
                                  <span>EDIT</span>
                                </button>
                              </div>
                            </div>
                            <div className="card-body">
                              <div className="total">
                                City, State, Country
                              </div>
                              <div className="full-address">
                              50 /b/, Takshila Apt, Mahakali Caves Road, Chakala, Andheri (west) Mumbai, Maharashtra,
                              </div>  
                              <div className="pin-code">
                              Zip Code: 400016
                              </div>                                                  
                            </div>                        
                          </div>    
                        </div>                             
                        </div>
                      </div>                      
                    </div>
                  )}
              </div>
              {!editMode ? (
                <div className="col">
                  <button
                    className="btn-primary btn"
                    onClick={() => {
                      this.setState({ editMode: true })
                      this.onOrganisation()
                    }
                    }
                  >
                    <img src={Pen} width="15" height="15" className="mr-3" />
                    <span>EDIT</span>
                  </button>
                </div>
              ) : (
                  <div className="d-flex flex-row justify-content-between">
                    <button className="btn btn-outline-info mr-2" onClick={this.onCancel}>
                      <span>CANCEL</span>
                    </button>
                    <button className="btn-primary btn" onClick={this.onSubmit}>
                      <span>SAVE</span>
                    </button>

                  </div>
                )}
            </div>
          </div>
        </div>
        {
          message && <div className="alert alert-success">{message}</div>
        }
      </div>
    );
  }
}

export default Profile;







