import React, { useState } from "react";
import Tabs from "../orders/tabs";
import "./style.scss";

const Settings = (props) => {
  const [visible, setvisible] = useState("one");
  const [
    showMobileVerificationRequiredLabel,
    setShowMobileVerificationRequiredLabel,
  ] = useState(false);

  const [showToolTipForOrderAlerts, setShowToolTipForOrderAlerts] = useState(false);
  const [showToolTipForInventoryAlerts, setShowToolTipForInventoryAlerts] = useState(false);
  const [showToolTipForShippingAlerts, setShowToolTipForShippingAlerts] = useState(false);

  const setIndicatorValuesForTooltipPanel = (type) => {
    if (type === 'orders_alerts') {
      setShowToolTipForOrderAlerts(!showToolTipForOrderAlerts);
    } else if (type === 'inventory_alerts') {
      setShowToolTipForInventoryAlerts(!showToolTipForInventoryAlerts);
    } else if (type === 'shipping_alerts') {
      setShowToolTipForShippingAlerts(!showToolTipForShippingAlerts);
    }
  }

  console.log('inside the settings page', showToolTipForOrderAlerts);
  return (
    <>
      <div className="settings">
        <h1 className="breadcrumb">SETTINGS</h1>
        <div className="card">
          <div className="card-body">
            <div className="mt-4">
              <div className="tabs">
                <ul className="nav nav-pills">
                  <li
                    className={
                      visible === "one" ? "nav-item-active" : "nav-item"
                    }
                    onClick={() => setvisible("one")}
                  >
                    <a
                      className={
                        visible === "one"
                          ? "nav-link"
                          : "nav-link text-secondary"
                      }
                    >
                      Manage Alerts
                    </a>
                  </li>
                </ul>
              </div>
              <div className="subscription-type">
                <span className="subscription-alert-header-text">
                  {"Get alerts on mobile or Email"}
                </span>
                <div className="subscription-alert-section">
                  <input
                    className="subscription-alert-checkbox"
                    type="checkbox"
                  />
                  <label className="subscription-alert-label">{"Email"}</label>
                </div>
                <div className="subscription-alert-section">
                  <input
                    className="subscription-alert-checkbox"
                    type="checkbox"
                  />
                  <label className="subscription-alert-label">
                    {"Mobile SMS"}
                  </label>
                  {showMobileVerificationRequiredLabel && (
                    <p>{"( Please register Mobile number to get alerts )"}</p>
                  )}
                </div>
              </div>
              <div className="alert-type">
                <span className="subscription-alert-header-text">
                  {"Select alerts Type"}
                </span>
                <div className="subscription-alert-section">
                  <input
                    className="subscription-alert-checkbox"
                    type="checkbox"
                  />
                  <label className="subscription-alert-label">
                    {"Orders Alerts"}
                  </label>
                  <img src='' alt='indicator' onClick={() => setIndicatorValuesForTooltipPanel('orders_alerts')} />
                  {
                    showToolTipForOrderAlerts && <span className="tooltiptext">Tooltip text</span>
                  }
                </div>
                <div className="subscription-alert-section">
                  <input
                    className="subscription-alert-checkbox"
                    type="checkbox"
                  />
                  <label className="subscription-alert-label">
                    {"Inventory Alerts"}
                  </label>
                  <img src='' alt='indicator'
                    onClick={() => setIndicatorValuesForTooltipPanel('inventory_alerts')} />
                  {
                    showToolTipForInventoryAlerts && <span className="tooltiptext">Tooltip text</span>
                  }
                </div>
                <div className="subscription-alert-section">
                  <input
                    className="subscription-alert-checkbox"
                    type="checkbox"
                  />
                  <label className="subscription-alert-label">
                    {"Shipment Alerts"}
                  </label>
                  <img src='' alt='indicator'
                    onClick={() => setIndicatorValuesForTooltipPanel('shipment_alerts')} />
                  {
                    showToolTipForShippingAlerts && <span className="tooltiptext">Tooltip text</span>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
