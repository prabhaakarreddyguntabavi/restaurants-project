import React from 'react'

const FoodDetails = React.createContext({
  selectedMenu: 'home',
  selectedMenuFunction: () => {},
  onClickLogout: () => {},
})

export default FoodDetails
