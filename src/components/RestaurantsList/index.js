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

class RestaurantsList extends Component {
  state = {
    listOfVideos: [],
    offSet: 0,
    count: 1,
    isLoading: apiStatus.initial,
    sortBy: 'Highest',
  }

  componentDidMount() {
    this.getProducts()
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
    const {sortBy, offSet} = this.state

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offSet}&limit=${9}&sort_by_rating=${sortBy}`

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
    const {listOfVideos, count} = this.state
    console.log(listOfVideos)

    if (listOfVideos.length !== 0) {
      return (
        <>
          <div className="restorent-main-container">
            {listOfVideos.restaurants.map(restaurants => (
              <Link className="link" to={`/${restaurants.id}`}>
                <div key={restaurants.id} className="restaurant-container">
                  <img
                    className="restaurant-image"
                    src={restaurants.image_url}
                    alt={restaurants.name}
                  />
                  <div className="text-container">
                    <h1 className="restaurant-heading">{restaurants.name}</h1>
                    <p className="paragraph">Fast Food</p>
                    <div className="rating-container">
                      <img
                        src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1716718449/7_Rating_r9ehat.png"
                        alt="star"
                      />{' '}
                      <p className="rating-text">
                        {' '}
                        {restaurants.user_rating.rating}
                        <span className="rating-styles">
                          {`(${restaurants.user_rating.total_reviews} ratings )`}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Counter
            onIncrement={this.onIncrement}
            onDecrement={this.onDecrement}
            count={count}
            totalCount={listOfVideos.total}
          />
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
    const {sortBy} = this.state
    return (
      <div className="restaurants-main-container">
        <div className="popular-restaurants-text-container">
          <div>
            <h1>Popular Restaurants</h1>
            <p>
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
          </div>
          <div className="short-by">
            <img
              src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1716707255/sort_ldyazv.png"
              alt="short"
            />
            <select value={sortBy} onChange={this.onChangeShortBy}>
              {sortByOptions.map(eachOption => (
                <option key={eachOption.id} value={eachOption.value}>
                  {eachOption.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>{' '}
        {this.getTheOutPut()}
      </div>
    )
  }
}

export default RestaurantsList
