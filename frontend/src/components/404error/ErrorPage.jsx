import React from 'react';
import "./style.scss";
import errorImage from "../../assets/images/error.png";


export default function ErrorPage() {
    return (
        <div className="error-page-layout">
            <div className="error-container-lid">
                <div className="error-main-container">
                <figure>
                    <img src={errorImage} alt="" className="error-image" />
                </figure>
                <article className='content-area'>
                    <h1 className="error-heading">SOMETHING WENT WRONG</h1>
                    <p className="error-message">We are very sorry for inconvenience.</p>
                    <p className="error-message">It looks you are trying to access a page that either has been deleted or never been existed</p>
                    <button className="home-btn btn btn-primary">Back to Home</button>
                </article>
                </div>
            </div>
        </div>
    )
}
