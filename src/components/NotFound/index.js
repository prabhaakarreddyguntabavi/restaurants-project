import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

class NotFoundPage extends Component {
  goToHomePage = () => {
    const {history} = this.props
    history.replace('/')
  }

  render() {
    return (
      <div className="add-cart-home-page-container">
        <div className="order-result">
          <div className="cart-details-not-fond-container">
            <img
              src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1717060989/Layer_1_h6h63o.png"
              alt="not found"
            />
            <h1>Page Not Found</h1>
            <p>
              We are sorry, the page you requested could not be found. Please go
              back to the homepage
            </p>
            <Link to="/">
              <button
                // onClick={() => this.goToHomePage()}
                className="place-order-button"
                type="button"
              >
                Home Page
              </button>
            </Link>
          </div>
        </div>
        )
      </div>
    )
  }
}

export default NotFoundPage
