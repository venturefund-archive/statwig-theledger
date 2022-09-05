import React, { useState } from "react";
import "./Connection.css";
import Vaccineledgerlight from "../../assets/logos/vaccineledger-light.svg";
import VaccineLedgerLogo from "../../assets/logos/vaccineledger.svg";
import statwig from "../../assets/logos/statwig-logo.png";
import check from "../../assets/icons/check.svg";
import Illustration from "../../assets/images/illustration/illustration.png";
import Account from "../../components/signUp/Account";
import Organization from "../../components/signUp/Organization";
import Verify from "../../components/verify/Verify";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Connection() {
  const history = useHistory();
  let { id } = useParams();
  console.log(id);
  const [connection] = useState(id);
  return (
    <section className="connect-layout-container">
      <div className="connection-two-column-grid-layout">
        <div className="banner-section banner-grid-name">
          <div className="banner-inner-container">
            <div className="banner-top">
              <figure className="connection-brand-logo">
                <img src={Vaccineledgerlight} alt="Vaccineledger" />
              </figure>
              <section className="our-benefits-container">
                <article className="benefit-card">
                  <img src={check} alt="check" className="check-icon" />
                  <p className="mi-subheading f-500 mi-white">
                    Maintain your Orders
                  </p>
                  <div className="straight-line"></div>
                </article>
                <article className="benefit-card">
                  <img src={check} alt="check" className="check-icon" />
                  <p className="mi-subheading f-500 mi-white">
                    Real Time shipment details
                  </p>
                  <div className="straight-line"></div>
                </article>
                <article className="benefit-card">
                  <img src={check} alt="check" className="check-icon" />
                  <p className="mi-subheading f-500 mi-white">Track & Trace</p>
                  <div className="straight-line"></div>
                </article>
                <article className="benefit-card">
                  <img src={check} alt="check" className="check-icon" />
                  <p className="mi-subheading f-500 mi-white">
                    View your Partner Locations
                  </p>
                  <div className="straight-line"></div>
                </article>
                <article className="benefit-card">
                  <img src={check} alt="check" className="check-icon" />
                  <p className="mi-subheading f-500 mi-white">
                    Alerts and Notifications
                  </p>
                  <div className="straight-line"></div>
                </article>
                <article className="benefit-card">
                  <img src={check} alt="check" className="check-icon" />
                  <p className="mi-subheading f-500 mi-white">
                    Monitor Cold chain conditions
                  </p>
                  <div className="straight-line"></div>
                </article>
                <article className="benefit-card">
                  <img src={check} alt="check" className="check-icon" />
                  <p className="mi-subheading f-500 mi-white">
                    Efficiently manage your inventory
                  </p>
                </article>
              </section>
            </div>
            <div className="powerby">
              <p className="mi-small f-700 mi-white">Powered by</p>
              <img src={statwig} alt="statwig" className="statwig-power-logo" />
            </div>
            <img
              src={Illustration}
              alt="Illustration"
              className="connect-Illustration"
            />
          </div>
        </div>
        <div className="main-context-section form-grid-name">
          <div className="connection-mobile-header">
            <figure className="brand-logo">
              <img
                src={VaccineLedgerLogo}
                alt="vaccineledger"
                className="brand-logo-image"
              />
            </figure>
          </div>
          <div className="connection-body-container">
            <section
              className="back-navigation mi-link mi-grey-xs"
              onClick={() => {
                history.push("/")
              }}
            >
              <i className="fa-solid fa-arrow-left"></i>
              <p className="mi-subheading f-400">Back</p>
            </section>
            <div className="login-system-layout">
              {connection === "account" && <Account />}
              {connection === "organization" && <Organization />}
              {connection === "verify" && <Verify />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
