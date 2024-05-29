import {Component} from 'react'

import {Link} from 'react-router-dom'

import './index.css'

class Header extends Component {
  render() {
    return (
      <div className="heading-styles">
        <div className="logo-container">
          <img
            src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1716700303/Frame_274_kojsnk.png"
            className="website-logo-desktop-img"
            alt="website logo"
          />
          <h1 className="logo-text-styles">Tasty Kitchens</h1>
        </div>
        <div className="heading-text-styles">
          <Link className="home-link" to="/">
            <p>Home</p>
          </Link>
          <Link className="home-link" to="/">
            <p>Cart</p>
          </Link>
          <div>
            <button type="button" className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
