import React, {Component} from 'react'
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
    const {history} = this.props
    history.replace('/')
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
                  data-testid="cartItem"
                  key={restaurants.id}
                  className="add-cart-items-container"
                >
                  <div className="cart-items-im-heading">
                    <img
                      className="each-restaurant-image"
                      src={restaurants.imageUrl}
                      alt={restaurants.name}
                    />

                    <h1 className="restaurant-heading">{restaurants.name}</h1>
                  </div>
                  <div className="card-increase-food-count">
                    <button
                      data-testid="decrement-quantity"
                      type="button"
                      onClick={() => this.decreaseCount(restaurants.id)}
                    >
                      -
                    </button>
                    <div data-testid="item-quantity">
                      {restaurants.quantity}
                    </div>
                    <button
                      data-testid="increment-quantity"
                      type="button"
                      onClick={() => this.addFoodItem(restaurants)}
                    >
                      +
                    </button>
                  </div>
                  <p data-testid="total-price" className="cart-item-food-cost">
                    ₹ {restaurants.cost}
                  </p>
                </li>
              ))}
              <hr className="hr-line" />
              <div className="place-order-container">
                <h1 className="place-order-heading">Order Total : </h1>
                <div>
                  <h1 className="place-order-cost">{totalCost}.00</h1>
                  <button
                    onClick={this.orderSuccessFully}
                    className="place-order-button"
                    type="button"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    }
    return (
      <div className="no-search-result">
        <div className="cart-details-not-fond-container">
          <img
            src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1717053162/Layer_2_wvuowg.png"
            alt="empty cart"
          />
          <h1>No Orders Yet!</h1>
          <p>Your cart is empty. Add something from the menu.</p>
          <button
            onClick={() => this.goToHomePage()}
            className="place-order-button"
            type="button"
          >
            Order Now
          </button>
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
                src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1717060612/Vector_ro6x4p.png"
                alt="order success"
              />
              <h1>Payment Successful</h1>
              <p>
                Thank you for orderingYour payment is successfully completed.
              </p>
              <button
                onClick={() => this.goToHomePage()}
                className="place-order-button"
                type="button"
              >
                Go To Home Page
              </button>
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
