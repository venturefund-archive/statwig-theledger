import React from 'react'
import { useState } from 'react'

const CountryListDropdown = () => {
    const [toggleButton,setToggleButton] = useState(false)
  return (
    <div className='mb-4'>
        <div className="mi-flex-sa organization-list-dropdown">
        <div className="f-500">United State</div>
        <span className="list-options">(4 options)</span>
        {toggleButton ? (
          <i
            className="fa-solid fa-angle-up"
            onClick={() => setToggleButton(!toggleButton)}
          ></i>
        ) : (
            <i
            className="fa-solid fa-angle-down"
            onClick={() => setToggleButton(!toggleButton)}
          ></i>
        )}
      </div>
      {toggleButton && (
        <ul className="unordered-country-list">
          <li className="mi-flex country-list-item">
            <span>
              <i className="fa-solid fa-building mr-2"></i>
            </span>
            <div>ABC Organization</div>
          </li>
          <li className="mi-flex country-list-item">
            <span>
              <i className="fa-solid fa-building mr-2"></i>
            </span>
            <div>EFH Organization</div>
          </li>
          <li className="mi-flex country-list-item">
            <span>
              <i className="fa-solid fa-building mr-2"></i>
            </span>
            <div>GHI Organization</div>
          </li>
          <li className="mi-flex country-list-item">
            <span>
              <i className="fa-solid fa-building mr-2"></i>
            </span>
            <div>XYZ Organization</div>
          </li>
        </ul>
      )}
     
    </div>
  )
}

export default CountryListDropdown