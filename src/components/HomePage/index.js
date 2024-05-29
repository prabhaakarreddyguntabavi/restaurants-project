import {Component} from 'react'

import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'

import FoodDetails from '../../context/FoodDetails'
import OffersDetails from '../OffersDetails'
import RestaurantsList from '../RestaurantsList'
import Footer from '../Footer'
import Header from '../Header'

import './index.css'

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

const restaurantData = [
  {
    cost: 345,
    quantity: 2,
    id: 'c3b24b72-3356-4c26-a2cf-8379eb9053cd',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/food-items-2/chicken-salad-16.jpg',
    name: 'Chicken Salad',
  },
  {
    cost: 345,
    quantity: 2,
    id: 'c3b24b72-3356-4c26-a2cf-8379eb9053cd',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/food-items-2/chicken-salad-16.jpg',
    name: 'Chicken Salad',
  },
]

class HomePage extends Component {
  state = {
    sortBy: 'Highest',
  }

  onChangeShortBy = event => {
    this.setState({sortBy: event.target.value})
  }

  render() {
    const {sortBy} = this.state
    // const jwtToken = Cookies.get('jwt_token')

    // if (jwtToken !== undefined) {
    //   return <Redirect to="/" />
    // }

    return (
      <div className="home-page-container">
        <Header />
        <div className="body-container">
          <div>
            <OffersDetails />
          </div>
          <div>
            <div className="all-restaurants-container">
              <RestaurantsList sortBy={sortBy} />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default HomePage
