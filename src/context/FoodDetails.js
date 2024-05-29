import React from 'react'

const FoodDetails = React.createContext({
  isDarkMood: false,
  onChangeDarkMood: () => {},
  selectOption: 'HOME',
  onChangeHeadingTopics: () => {},
  savedVideos: [],
  onSaveVideos: () => {},
  showNavBar: false,
  showNavBarFunction: () => {},
})

export default FoodDetails
