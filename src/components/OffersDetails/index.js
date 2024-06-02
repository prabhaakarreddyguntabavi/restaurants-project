import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'

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

class OffersDetails extends Component {
  state = {
    listOfVideos: [],
    isLoading: apiStatus.initial,
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

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'

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
        listOfVideos: fetchedData.offers,
        isLoading: apiStatus.success,
      })
    } else {
      this.setState({
        listOfVideos: [],
        isLoading: apiStatus.failed,
      })
    }
  }

  onSuccess = () => {
    const {listOfVideos} = this.state
    console.log(listOfVideos.offers)

    if (listOfVideos.length !== 0) {
      return (
        <Slider {...settings}>
          {listOfVideos.map(eachOffer => (
            <li key={eachOffer.id}>
              <img
                src={eachOffer.image_url}
                alt="offer"
                className="offer-image"
              />
            </li>
          ))}
        </Slider>
      )
    }
    return (
      <div className="no-search-result">
        <img
          src=""
          //   src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
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
      testid="restaurants-offers-loader"
    >
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onFailure = () => (
    <div className="no-search-result">
      <img src="" alt="failure view" />
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

export default OffersDetails
