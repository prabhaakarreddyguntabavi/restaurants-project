import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  failed: 'FAILED',
  success: 'SUCCESS',
}

class EachRestaurantsList extends Component {
  state = {
    listOfRestaurants: [],
    isLoading: apiStatus.initial,
    addToCardItems: [],
  }

  componentDidMount() {
    const addCardStorage = JSON.parse(localStorage.getItem('cartData'))
    this.setState({
      addToCardItems:
        addCardStorage !== null
          ? addCardStorage.map(each => ({id: each.id, count: each.quantity}))
          : [],
    })
    this.getProducts()
  }

  setDataToLocalStorage = data => {
    console.log(data)
    return {
      cost: data.cost,
      quantity: data.quantity,
      id: data.id,
      imageUrl: data.image_url,
      name: data.name,
    }
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
          JSON.stringify([
            ...addCardFoodItems,
            this.setDataToLocalStorage({...data, quantity: 1}),
          ]),
        )
      }
    } else {
      localStorage.setItem(
        'cartData',
        JSON.stringify([this.setDataToLocalStorage({...data, quantity: 1})]),
      )
    }
    this.setState({
      addToCardItems: JSON.parse(
        localStorage.getItem('cartData'),
      ).map(each => ({id: each.id, count: each.quantity})),
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
      addToCardItems: JSON.parse(
        localStorage.getItem('cartData'),
      ).map(each => ({id: each.id, count: each.quantity})),
    })
  }

  getProducts = async () => {
    this.setState({
      isLoading: apiStatus.inProgress,
    })
    const {id} = this.props

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      this.setState({
        listOfRestaurants: fetchedData,
        isLoading: apiStatus.success,
      })
    } else {
      this.setState({
        listOfRestaurants: [],
        isLoading: apiStatus.failed,
      })
    }
  }

  onIncrement = () => {
    this.setState(
      prevState => ({
        offSet: prevState.offSet + 9,
        count: prevState.count + 1,
      }),
      () => {
        this.getProducts()
      },
    )
  }

  onDecrement = () => {
    this.setState(
      prevState => ({
        offSet: prevState.offSet - 9,
        count: prevState.count - 1,
      }),
      () => {
        this.getProducts()
      },
    )
  }

  addFoodButtonsElement = restaurants => {
    const {addToCardItems} = this.state
    const index = addToCardItems.findIndex(
      eachId => restaurants.id === eachId.id,
    )
    // console.log(addToCardItems)

    if (index > -1) {
      return (
        <div className="pagination-container">
          <button
            data-testid="decrement-count"
            type="button"
            onClick={() => this.decreaseCount(restaurants.id)}
          >
            -
          </button>
          <div data-testid="active-count">{addToCardItems[index].count}</div>
          <button
            data-testid="increment-count"
            type="button"
            onClick={() => this.addFoodItem(restaurants)}
          >
            +
          </button>
        </div>
      )
    }
    return (
      <button
        type="button"
        className="add-food-button"
        onClick={() => this.addFoodItem(restaurants)}
      >
        Add
      </button>
    )
  }

  onSuccess = () => {
    const {listOfRestaurants} = this.state

    if (listOfRestaurants.length !== 0) {
      return (
        <>
          <div className="each-resetorent-main-container">
            <div className="each-rst-container">
              <img
                className="each-item-logo-icon"
                src={listOfRestaurants.image_url}
                alt={listOfRestaurants.name}
              />
              <div className="header-text-container-in-res">
                <h1 className="each-res-list-heading">
                  {listOfRestaurants.name}
                </h1>
                <p className="discription">
                  {listOfRestaurants.cuisine} snacks
                </p>
                <p className="discription">{listOfRestaurants.location}</p>
                <div className="rating-container heading-rating">
                  <div>
                    <div className="rating">
                      <img
                        className="start-icon"
                        src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1716726915/7_Rating_2x_dywhda.png"
                        alt="star"
                      />
                      <p className="rating-count">{listOfRestaurants.rating}</p>
                    </div>

                    <p className="reviews-count">
                      {listOfRestaurants.reviews_count}+ Rating
                    </p>
                  </div>
                  <hr className="horizential-line" />
                  <div>
                    <p className="amount">₹ {listOfRestaurants.cost_for_two}</p>

                    <p className="reviews-count amount-count">count for two</p>
                  </div>
                </div>
              </div>
            </div>
            <ul className="food-items">
              {listOfRestaurants.food_items.map(restaurants => (
                <li
                  data-testid="foodItem"
                  key={restaurants.id}
                  className="each-food-container"
                >
                  <img
                    className="each-restaurant-image"
                    src={restaurants.image_url}
                    alt="restaurant"
                  />
                  <div className="text-container">
                    <h1 className="each-restaurant-heading">
                      {restaurants.name}
                    </h1>
                    <p className="food-cost">₹ {restaurants.cost}</p>
                    <div className="each-rating-container-1">
                      <img
                        src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1716718449/7_Rating_r9ehat.png"
                        alt="star"
                      />{' '}
                      <p className="rating-text">{restaurants.rating}</p>
                    </div>
                    {this.addFoodButtonsElement(restaurants)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )
    }
    return (
      <div className="no-search-result">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
        />
        <h1>No Search results found</h1>
        <p>Try different key words or remove search filter</p>
        <button type="button" onClick={this.getProducts}>
          Retry
        </button>
      </div>
    )
  }

  renderLoader = () => (
    <div
      className="products-loader-container"
      data-testid="restaurant-details-loader"
    >
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onFailure = isDarkMood => (
    <div className="no-search-result">
      <img
        src={
          isDarkMood
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
        }
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request.
        <br /> Please try again
      </p>
      <button type="button" onClick={this.getProducts}>
        Retry
      </button>
    </div>
  )

  getTheOutPut = () => {
    const {isLoading} = this.state
    switch (isLoading) {
      case apiStatus.inProgress:
        return this.renderLoader()
      case apiStatus.failed:
        return this.onFailure()
      case apiStatus.success:
        return this.onSuccess()
      default:
        return null
    }
  }

  render() {
    return <div>{this.getTheOutPut()}</div>
  }
}

export default EachRestaurantsList
