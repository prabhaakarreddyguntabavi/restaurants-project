import {Component} from 'react'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-Container">
      <div className="footer-logo-container">
        <img
          src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1716723459/Group_7420_pmbkw0.png"
          alt="footer"
        />
        <h1 className="footer-logo-text">Tasty Kitchens</h1>
      </div>
      <p className="footer-paragraph">
        The only thing we are serious about is food. Contact us on
      </p>
      <div className="social-media-container">
        <img
          src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1716723858/Frame_12_ipg1fb.png"
          alt="p"
          className="social-media-icon"
        />
        <img
          src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1716723903/Frame_10_ymedhv.png"
          alt="i"
          className="social-media-icon"
        />
        <img
          src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1716723890/Frame_11_fxfwsa.png"
          alt="t"
          className="social-media-icon"
        />
        <img
          src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1716723879/Frame_13_pwmres.png"
          alt="f"
          className="social-media-icon"
        />
      </div>
    </div>
  )
}
