import React from "react";
import TextField from "@mui/material/TextField";
import "./Redeem.css";

export default function Redeem({ onClose, RedeemOption }) {
  return (
    <div className="redeem_container">
      <div className="redeem_header">
        <h1 className="reward_title_ts">Claim Your Rewards</h1>

        <div className="close_btn" onClick={onClose}>
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
      <div className="redeem_body">
        <p className="points_subtitle_ts">
          congratulations, You got your points. Please fill the details to
          redeem your rewards
        </p>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Full Name"
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
        {RedeemOption === "bank" ? (
          <TextField
            margin="dense"
            id="name"
            label="Bank Account Number"
            type="text"
            fullWidth
          />
        ) : (
          <TextField
            margin="dense"
            id="name"
            label="Wallet Address"
            type="text"
            fullWidth
          />
        )}
      </div>
      <div className="redeem_footer">
        <button className="mi-btn mi-btn-md mi-btn-secondary">
          {RedeemOption === "bank"
            ? "Redeem to Bank Account"
            : "Buy cryptocurrency"}
        </button>
      </div>
    </div>
  );
}
