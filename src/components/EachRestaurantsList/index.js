import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import Counter from '../Counter'
import Footer from '../Footer'

import './index.css'

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  className: 'offers-container',
}

const apiStatus = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  failed: 'FAILED',
  success: 'SUCCESS',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class EachRestaurantsList extends Component {
  state = {
    listOfVideos: [],
    offSet: 0,
    count: 1,
    isLoading: apiStatus.initial,
    sortBy: 'Highest',
    addToCardItems: [],
  }

  componentDidMount() {
    this.getProducts()
  }

  addFoodItem = data => {
    const addCardFoodItems = JSON.parse(localStorage.getItem('foodItems'))

    let isItemAddedIndex
    if (addCardFoodItems !== null) {
      isItemAddedIndex = addCardFoodItems.findIndex(
        eachItem => eachItem.id === data.id,
      )
      if (isItemAddedIndex > -1) {
        addCardFoodItems[isItemAddedIndex].count += 1
        localStorage.setItem('foodItems', JSON.stringify([...addCardFoodItems]))
      } else {
        localStorage.setItem(
          'foodItems',
          JSON.stringify([...addCardFoodItems, {...data, count: 1}]),
        )
      }
    } else {
      localStorage.setItem('foodItems', JSON.stringify([{...data, count: 1}]))
    }
    this.setState({
      addToCardItems: JSON.parse(localStorage.getItem('foodItems')).map(
        each => each.id,
      ),
    })
  }

  getYearsAgo = publishedDate => {
    const currentDate = new Date()
    const diffInMilliseconds = currentDate - new Date(publishedDate)
    const diffInYears = diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25)

    const yearsAgo = Math.floor(diffInYears)

    return yearsAgo
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
      console.log(fetchedData)
      this.setState({
        listOfVideos: fetchedData,
        isLoading: apiStatus.success,
      })
    } else {
      this.setState({
        listOfVideos: [],
        isLoading: apiStatus.failed,
      })
    }
  }

  onChangeShortBy = event => {
    this.setState({sortBy: event.target.value}, () => {
      this.getProducts()
    })
  }

  onChangeShortBy = event => {
    this.setState({sortBy: event.target.value}, () => {
      this.getProducts()
    })
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

  onSuccess = () => {
    const {listOfVideos, addToCardItems} = this.state

    if (listOfVideos.length !== 0) {
      return (
        <>
          <div className="each-resetorent-main-container">
            <div className="each-rst-container">
              <img
                className="each-item-logo-icon"
                src={listOfVideos.image_url}
                alt={listOfVideos.name}
              />
              <div className="header-text-container-in-res">
                <h1>{listOfVideos.name}</h1>
                <p className="discription">{listOfVideos.cuisine} snacks</p>
                <p className="discription">{listOfVideos.location}</p>
                <div className="rating-container">
                  <div>
                    <div className="rating">
                      <img
                        className="start-icon"
                        src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1716726915/7_Rating_2x_dywhda.png"
                        alt="star"
                      />
                      <p className="rating-count">{listOfVideos.rating}</p>
                    </div>

                    <p className="reviews-count">
                      {listOfVideos.reviews_count}+ Rating
                    </p>
                  </div>
                  <hr className="horizential-line" />
                  <div>
                    <p className="amount">₹ {listOfVideos.cost_for_two}</p>

                    <p className="reviews-count">
                      {listOfVideos.reviews_count}+ Rating
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="food-items">
              {listOfVideos.food_items.map(restaurants => (
                <div key={restaurants.id} className="each-food-container">
                  <img
                    className="each-restaurant-image"
                    src={restaurants.image_url}
                    alt={restaurants.name}
                  />
                  <div className="text-container">
                    <h1 className="restaurant-heading">{restaurants.name}</h1>
                    <p className="food-cost">₹ {restaurants.cost}</p>
                    <div className="each-rating-container-1">
                      <img
                        src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1716718449/7_Rating_r9ehat.png"
                        alt="star"
                      />{' '}
                      <p className="rating-text">{restaurants.rating}</p>
                    </div>
                    {addToCardItems.includes(restaurants.id) ? (
                      <button
                        type="button"
                        className="add-food-button"
                        onClick={() => this.addFoodItem(restaurants)}
                      >
                        Add
                      </button>
                    ) : (
                      <p>1</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
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
    <div className="products-loader-container" data-testid="loader">
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
