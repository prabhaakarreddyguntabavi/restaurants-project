import {Component} from 'react'

import {Route, Switch, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import LoginForm from './components/LoginForm'
import HomePage from './components/HomePage'
import AddFoodItem from './components/AddFoodItem'
import AddToCardList from './components/AddToCardList'
import NotFoundPage from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import FoodDetails from './context/FoodDetails'

import './App.css'

class App extends Component {
  state = {
    selectedMenu: 'home',
  }

  selectedMenuFunction = value => {
    this.setState({selectedMenu: value})
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    this.setState({selectedMenu: 'home'})
    return <Redirect to="/login" />
  }

  render() {
    const {selectedMenu} = this.state
    return (
      <FoodDetails.Provider
        value={{
          selectedMenu,
          selectedMenuFunction: this.selectedMenuFunction,
          onClickLogout: this.onClickLogout,
        }}
      >
        <Switch>
          {/* <ProtectedRoute exact path="/login" component={LoginForm} /> */}
          <ProtectedRoute exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={HomePage} />
          <ProtectedRoute exact path="/cart" component={AddToCardList} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={AddFoodItem}
          />
          <ProtectedRoute path="/bad-path" component={NotFoundPage} />
          <Redirect to="/bad-path" />
        </Switch>
      </FoodDetails.Provider>
    )
  }
}

export default App
