import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import GoogleIcon from "../../../../assets/images/social/google.png";
import TorusIcon from "../../../../assets/images/social/torus.png";
import "./AccessForm.css";
import { useHistory } from "react-router-dom";

export default function AccessForm() {
  const [EmailPhone, setEmailPhone] = useState("email");
  const history = useHistory();
  return (
    <div className="connect-popup-container">
      <div className="auto-connect-options">
        <div
          className="login-button-card"
          onClick={() => {
            history.push("/register/account");
          }}
        >
          <div className="icon-space">
            <img src={GoogleIcon} alt="social" />
          </div>
          <p className="vl-subheading f-500 no-space">Connect with Google</p>
        </div>
        <div
          className="login-button-card"
          onClick={() => {
            history.push("/register/organization");
          }}
        >
          <div className="icon-space">
            <img src={TorusIcon} alt="social" />
          </div>
          <p className="vl-subheading f-500 no-space">Connect with Wallet ID</p>
        </div>
      </div>
      <div className="option-divider">
        <div className="divider-bar"></div>
        <p className="vl-subheading vl-grey-xs">OR</p>
        <div className="divider-bar"></div>
      </div>
      {EmailPhone === "email" ? (
        <div className="manual-connect-options">
          <div className="input-space-holder">
            <TextField
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="change-input-option">
            <div
              className="vl-flex vl-align-center vl-gap-xs vl-blue vl-link"
              onClick={() => setEmailPhone("phone")}
            >
              <i className="fa-solid fa-phone vl-icon-xs"></i>
              <p className="vl-note">Use Phone Number</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="manual-connect-options">
          <div className="input-space-holder">
            <TextField
              id="outlined-basic"
              label="Phone Numer"
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="change-input-option">
            <div
              className="vl-flex vl-align-center vl-gap-xs vl-blue  vl-link"
              onClick={() => setEmailPhone("email")}
            >
              <i className="fa-solid fa-envelope vl-icon-xs"></i>
              <p className="vl-note vl-link">Use Email Address</p>
            </div>
          </div>
        </div>
      )}

      <div className="popup-actions">
        <button
          className="vl-btn vl-btn-md vl-btn-full vl-btn-primary"
          onClick={() => {
            history.push("/login/verify");
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
