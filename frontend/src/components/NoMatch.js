import React from 'react'
import logo from '../assets/brands/error.png'

const NoMatch = () => (
  <div>
       <img src={logo} alt="Logo" />
    <center>
    <h1>404 - Not Found!</h1>
    <Link to="/">
      Go Home
    </Link>
    </center>
  </div>
)

export default NoMatch
