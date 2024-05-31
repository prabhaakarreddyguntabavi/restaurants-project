import {Component} from 'react'

import OffersDetails from '../OffersDetails'
import RestaurantsList from '../RestaurantsList'
import Footer from '../Footer'
import Header from '../Header'

import './index.css'

class HomePage extends Component {
  state = {
    sortBy: 'Highest',
  }

  onChangeShortBy = event => {
    this.setState({sortBy: event.target.value})
  }

  render() {
    const {sortBy} = this.state

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
