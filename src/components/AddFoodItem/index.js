import {Component} from 'react'

import Footer from '../Footer'
import Header from '../Header'
import EachRestaurantsList from '../EachRestaurantsList'

import './index.css'

class AddFoodItem extends Component {
  render() {
    const {match} = this.props
    const {params} = match
    const {id} = params

    return (
      <div className="home-page-container">
        <Header />
        <div className="body-container">
          <div>
            <EachRestaurantsList id={id} />
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default AddFoodItem
