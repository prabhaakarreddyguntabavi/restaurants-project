import {Component} from 'react'
import {FiAlignJustify} from 'react-icons/fi'
import {IoMdCloseCircle} from 'react-icons/io'
import {Link} from 'react-router-dom'

import FoodDetails from '../../context/FoodDetails'

// import { useNavigate } from "react-router-dom";
import './index.css'

class Header extends Component {
  state = {
    mobileMenu: false,
  }

  showMenuDetails = () => {
    this.setState(previousState => ({mobileMenu: !previousState.mobileMenu}))
  }

  render() {
    const {mobileMenu} = this.state
    return (
      <FoodDetails.Consumer>
        {value => {
          const {selectedMenu, selectedMenuFunction, onClickLogout} = value
          return (
            <>
              <div className="heading-styles">
                <div className="logo-container">
                  <Link to="/">
                    <img
                      src=""
                      // src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1716700303/Frame_274_kojsnk.png"
                      className="website-logo-desktop-img"
                      alt="website logo"
                    />
                  </Link>
                  <h1 className="logo-text-styles">Tasty Kitchens</h1>
                </div>
                <div className="mobile-menu-button">
                  <FiAlignJustify
                    className="menu-icons"
                    onClick={this.showMenuDetails}
                  />
                </div>

                <ul className="heading-text-styles">
                  <Link
                    onClick={() => selectedMenuFunction('home')}
                    className="home-link"
                    to="/"
                  >
                    <li
                      className={`${
                        selectedMenu === 'home' && 'menu-selected-color'
                      }`}
                    >
                      Home
                    </li>
                  </Link>
                  <Link
                    onClick={() => selectedMenuFunction('cart')}
                    className="home-link"
                    to="/cart"
                  >
                    <li
                      className={`${
                        selectedMenu === 'cart' && 'menu-selected-color'
                      }`}
                    >
                      Cart
                    </li>
                  </Link>
                  <div>
                    <button
                      onClick={() => onClickLogout()}
                      type="button"
                      className="logout-button"
                    >
                      Logout
                    </button>
                  </div>
                </ul>
              </div>
              {mobileMenu && (
                <div className="mobile-menu-bar-container">
                  <div className="heading-text-styles-mobile">
                    <Link
                      onClick={() => this.selectedMenuFunction('home')}
                      className="home-link"
                      to="/"
                    >
                      <p
                        className={`${
                          selectedMenu === 'home' && 'menu-selected-color'
                        }`}
                      >
                        Home
                      </p>
                    </Link>
                    <Link
                      onClick={() => this.selectedMenuFunction('cart')}
                      className="home-link"
                      to="/cart"
                    >
                      <p
                        className={`${
                          selectedMenu === 'cart' && 'menu-selected-color'
                        }`}
                      >
                        Cart
                      </p>
                    </Link>
                    <button
                      onClick={() => onClickLogout()}
                      type="button"
                      className="logout-button"
                    >
                      Logout
                    </button>
                  </div>
                  <IoMdCloseCircle
                    onClick={this.showMenuDetails}
                    className="closing-menu-bar"
                  />
                </div>
              )}
            </>
          )
        }}
      </FoodDetails.Consumer>
    )
  }
}

export default Header
