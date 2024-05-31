import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
// import { useNavigate } from "react-router-dom";

import {Link} from 'react-router-dom'

import './index.css'

const Header = props => {
  const {history} = props

  const onClickLogout = () => {
    // const navigate = useNavigate()

    console.log(history)
    // history.replace('/login')
    Cookies.remove('jwt_token')
  }

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
                      onClick={() => onClickLogout()}
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
  )
}

export default Header
