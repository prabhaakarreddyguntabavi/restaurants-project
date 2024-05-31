import {Component} from 'react'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {FiAlignJustify} from 'react-icons/fi'

// import { useNavigate } from "react-router-dom";

import {Link} from 'react-router-dom'

import './index.css'

class Header extends Component {
  state = {
    mobileMenu: false,
  }

  onClickLogout = () => {
    const {history} = this.props
    // const navigate = useNavigate()

    console.log(history)
    // history.replace('/login')
    Cookies.remove('jwt_token')
  }

  showMenuDetails = () => {
    console.log('prabhakar')
    this.setState(previousState => ({mobileMenu: !previousState.mobileMenu}))
  }

  render() {
    const {mobileMenu} = this.state
    return (
      <>
        <div className="heading-styles">
          <div className="logo-container">
            <img
              src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1716700303/Frame_274_kojsnk.png"
              className="website-logo-desktop-img"
              alt="website logo"
            />
            <h1 className="logo-text-styles">Tasty Kitchens</h1>
          </div>
          <div className="mobile-menu-button">
            <FiAlignJustify
              className="menu-icons"
              onClick={this.showMenuDetails}
            />
          </div>

          <div className="heading-text-styles">
            <Link className="home-link" to="/">
              <p>Home</p>
            </Link>
            <Link className="home-link" to="/cart">
              <p>Cart</p>
            </Link>
            <div>
              <Popup
                modal
                trigger={
                  <button type="button" className="logout-button">
                    Logout
                  </button>
                }
              >
                {close => (
                  <>
                    <div className="popup-container">
                      <div className="closing-container">
                        <p>Are you sure, you want to logout</p>
                        <button
                          type="button"
                          className="trigger-button"
                          data-testid="closeButton"
                          onClick={() => close()}
                        >
                          Cancel
                        </button>
                        <button
                          className="logout-button"
                          type="button"
                          onClick={() => this.onClickLogout()}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </Popup>
            </div>
          </div>
        </div>
        {mobileMenu && (
          <div className="heading-text-styles-mobile">
            <Link className="home-link" to="/">
              <p>Home</p>
            </Link>
            <Link className="home-link" to="/cart">
              <p>Cart</p>
            </Link>
            <button type="button" className="logout-button">
              Logout
            </button>
          </div>
        )}
      </>
    )
  }
}

export default Header
