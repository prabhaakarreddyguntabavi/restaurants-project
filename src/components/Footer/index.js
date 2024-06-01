// import {FaPinterestSquare} from 'react-icons/fa'
import {
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
  FaPinterestSquare,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-Container">
      <div className="footer-logo-container">
        <img
          src=""
          //   src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1716723459/Group_7420_pmbkw0.png"
          alt="website-footer-logo"
        />
        <h1 className="footer-logo-text">Tasty Kitchens</h1>
      </div>
      <p className="footer-paragraph">
        The only thing we are serious about is food. Contact us on
      </p>
      <div className="social-media-container">
        <FaPinterestSquare
          testid="pintrest-social-icon"
          className="social-media-icon"
        />
        <FaInstagram
          testid="instagram-social-icon"
          className="social-media-icon"
        />
        <FaTwitter testid="twitter-social-icon" className="social-media-icon" />
        <FaFacebookSquare
          testid="facebook-social-icon"
          className="social-media-icon"
        />
      </div>
    </div>
  )
}
