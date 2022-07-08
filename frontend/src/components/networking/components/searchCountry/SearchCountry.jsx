import React from 'react'
import "./searchCountry.scss"
import CountryListDropdown from '../countryListDropdown/CountryListDropdown'

const SearchCountry = () => {
  return (
    <div>
        <div className="mi-flex-ac mt-4">
        <input
          type="search"
          placeholder="Search by Countries"
          className="searchCountries"
        />
        <i className="fa-solid fa-magnifying-glass search-icon"></i>
      </div>
      <p className="countries-list-heading">Country List</p>
         <CountryListDropdown />
         <CountryListDropdown />
         <CountryListDropdown />  
    </div>
  )
}

export default SearchCountry