import './App.css'

/* eslint-disable react/no-unused-state */
import {Component} from 'react'

import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import HomePage from './components/HomePage'
import AddFoodItem from './components/AddFoodItem'
import AddToCardList from './components/AddToCardList'
import NotFoundPage from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

// const sortByOptions = [
//   {
//     id: 0,
//     displayText: 'Highest',
//     value: 'Highest',
//   },
//   {
//     id: 2,
//     displayText: 'Lowest',
//     value: 'Lowest',
//   },
// ]

class App extends Component {
  state = {
    isDarkMood: false,
    selectOption: 'HOME',
    savedVideos: [],
    showNavBar: false,
  }

  render() {
    return (
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/" component={HomePage} />
        <ProtectedRoute exact path="/cart" component={AddToCardList} />
        <ProtectedRoute exact path="/restaurant/:id" component={AddFoodItem} />
        <ProtectedRoute path="/bad-path" component={NotFoundPage} />
        <Redirect to="/bad-path" />
      </Switch>
    )
  }
}

export default App
