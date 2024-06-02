import {Component} from 'react'
import {Link} from 'react-router-dom'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

class AddToCardList extends Component {
  state = {listOfVideos: [], isOrderPlaced: false}

  componentDidMount() {
    const addCardStorage = JSON.parse(localStorage.getItem('cartData'))
    this.setState({
      listOfVideos: addCardStorage !== null ? addCardStorage : [],
    })
  }

  goToHomePage = () => {
    localStorage.removeItem('cartData')
    // const {history} = this.props
    // history.replace('/')
  }

  orderSuccessFully = () => {
    this.setState({
      isOrderPlaced: true,
    })
  }

  addFoodItem = data => {
    const addCardFoodItems = JSON.parse(localStorage.getItem('cartData'))

    let isItemAddedIndex
    if (addCardFoodItems !== null) {
      isItemAddedIndex = addCardFoodItems.findIndex(
        eachItem => eachItem.id === data.id,
      )
      if (isItemAddedIndex > -1) {
        addCardFoodItems[isItemAddedIndex].quantity += 1
        localStorage.setItem('cartData', JSON.stringify([...addCardFoodItems]))
      } else {
        localStorage.setItem(
          'cartData',
          JSON.stringify([...addCardFoodItems, {...data, count: 1}]),
        )
      }
    } else {
      localStorage.setItem('cartData', JSON.stringify([{...data, count: 1}]))
    }
    this.setState({
      addToCardItems: JSON.parse(localStorage.getItem('cartData')),
    })
  }

  decreaseCount = id => {
    let addCardFoodItems = JSON.parse(localStorage.getItem('cartData'))

    const isItemAddedIndex = addCardFoodItems.findIndex(
      eachItem => eachItem.id === id,
    )
    addCardFoodItems[isItemAddedIndex].quantity -= 1
    if (addCardFoodItems[isItemAddedIndex].quantity === 0) {
      addCardFoodItems = addCardFoodItems.filter(eachId => eachId.id !== id)
    }

    localStorage.setItem('cartData', JSON.stringify([...addCardFoodItems]))
    this.setState({
      addToCardItems: JSON.parse(localStorage.getItem('cartData')),
    })
  }

  cardDetails = () => {
    const {listOfVideos} = this.state
    console.log(listOfVideos)
    let totalCost = 0
    let cardDetails = JSON.parse(localStorage.getItem('cartData'))

    if (cardDetails !== null) {
      cardDetails = cardDetails.map(eachFood => {
        const cost = eachFood.quantity * eachFood.cost
        totalCost += cost
        return {...eachFood, cost}
      })
    }

    console.log(JSON.parse(localStorage.getItem('cartData')))

    if (cardDetails !== null) {
      if (cardDetails.length > 0) {
        return (
          <>
            <div className="cart-details-main-container">
              <div className="add-cart-food-items">
                <div className="header-add-cart-items-container">
                  <p>Item</p>
                  <p className="quantity-paragraph">Quantity</p>
                  <p>Price</p>
                </div>
                {cardDetails.map(restaurants => (
                  <li
                    testid="cartItem"
                    key={restaurants.id}
                    className="add-cart-items-container"
                  >
                    <div className="cart-items-im-heading">
                      <img
                        className="each-restaurant-image"
                        src={restaurants.imageUrl}
                        alt={restaurants.name}
                      />

                      <h1 className="restaurant-heading-large">
                        {restaurants.name}
                      </h1>
                    </div>
                    <div className="add-card-text-container">
                      <h1 className="restaurant-heading-mobile">
                        {restaurants.name}
                      </h1>
                      <div className="card-increase-food-count">
                        <button
                          testid="decrement-quantity"
                          type="button"
                          onClick={() => this.decreaseCount(restaurants.id)}
                        >
                          -
                        </button>
                        <div testid="item-quantity">{restaurants.quantity}</div>
                        <button
                          testid="increment-quantity"
                          type="button"
                          onClick={() => this.addFoodItem(restaurants)}
                        >
                          +
                        </button>
                      </div>
                      <p className="cart-item-food-cost">
                        ₹ {restaurants.cost}
                      </p>
                    </div>
                  </li>
                ))}
                <hr className="hr-line" />
                <div className="place-order-container">
                  <h1 className="place-order-heading">Order Total: </h1>
                  <div>
                    <p testid="total-price" className="place-order-cost">
                      {totalCost}.00
                    </p>
                    <Link to="/cart">
                      <button
                        onClick={this.orderSuccessFully}
                        className="place-order-button"
                        type="button"
                      >
                        Place Order
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }
    }
    return (
      <div className="no-search-result">
        <div className="cart-details-not-fond-container">
          <img
            src=""
            // src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1717053162/Layer_2_wvuowg.png"
            alt="empty cart"
            className="No-food-items-found"
          />
          <h1 className="No-food-items-found-heading">No Order Yet!</h1>
          <p className="No-food-items-found-paragraph">
            Your cart is empty. Add something from the menu.
          </p>
          <Link to="/">
            <button
              onClick={() => this.goToHomePage()}
              className="place-order-button"
              type="button"
            >
              Order Now
            </button>
          </Link>
        </div>
      </div>
    )
  }

  render() {
    const {isOrderPlaced} = this.state
    return (
      <div className="add-cart-home-page-container">
        <Header />
        {isOrderPlaced ? (
          <div className="order-result">
            <div className="cart-details-not-fond-container">
              <img
                src=""
                // src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1717060612/Vector_ro6x4p.png"
                alt="order success"
              />
              <h1>Payment Successful</h1>
              <p>
                Thank you for ordering Your payment is successfully completed.
              </p>
              <Link to="/">
                <button
                  onClick={() => this.goToHomePage()}
                  className="place-order-button"
                  type="button"
                >
                  Go To Home Page
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="add-cart-body-container">{this.cardDetails()}</div>
            <Footer />
          </>
        )}
      </div>
    )
  }
}

export default AddToCardList
