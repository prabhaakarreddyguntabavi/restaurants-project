import { Component } from 'react'

// import Cookies from 'js-cookie'
// import {Redirect, Link} from 'react-router-dom'

import Footer from '../Footer'
import Header from '../Header'
import EachRestaurantsList from '../EachRestaurantsList'

import './index.css'

class AddFoodItem extends Component {
    render() {
        // const jwtToken = Cookies.get('jwt_token')

        // if (jwtToken !== undefined) {
        //   return <Redirect to="/" />
        // }

        const { match } = this.props
        const { params } = match
        const { id } = params
        console.log(id)

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
