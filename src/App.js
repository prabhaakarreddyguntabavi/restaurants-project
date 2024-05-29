import './App.css'

/* eslint-disable react/no-unused-state */
import {Component} from 'react'

import {Route, Switch, Redirect} from 'react-router-dom'

import FoodDetails from './context/FoodDetails'

import LoginForm from './components/LoginForm'
import HomePage from './components/HomePage'
import AddFoodItem from './components/AddFoodItem'

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

class App extends Component {
  state = {
    isDarkMood: false,
    selectOption: 'HOME',
    savedVideos: [],
    showNavBar: false,
  }

  onChangeDarkMood = () =>
    this.setState(previousState => ({
      isDarkMood: !previousState.isDarkMood,
    }))

  onChangeHeadingTopics = id =>
    this.setState({
      selectOption: id,
    })

  onSaveVideos = dict => {
    const {savedVideos} = this.state

    const isVideoSaved = savedVideos.some(eachVideo => eachVideo.id === dict.id)

    if (isVideoSaved) {
      const updatedSavedVideos = savedVideos.filter(
        eachVideo => eachVideo.id !== dict.id,
      )

      return this.setState({
        savedVideos: updatedSavedVideos,
      })
    }
    return this.setState({
      savedVideos: [...savedVideos, dict],
    })
  }

  render() {
    const {isDarkMood, selectOption, savedVideos, showNavBar} = this.state
    return (
      <FoodDetails.Provider
        value={{
          isDarkMood,
          onChangeDarkMood: this.onChangeDarkMood,
          selectOption,
          onChangeHeadingTopics: this.onChangeHeadingTopics,
          onSaveVideos: this.onSaveVideos,
          savedVideos,
          showNavBar,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/:id" component={AddFoodItem} />
          {/* <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" /> */}
        </Switch>
      </FoodDetails.Provider>
    )
  }
}

export default App
