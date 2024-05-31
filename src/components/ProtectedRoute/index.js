import {Redirect, Route} from 'react-router-dom'
import Cookie from 'js-cookie'

const ProtectedRoute = props => {
  const token = Cookie.get('jwt_token')
  const {path} = props
  console.log(path === '/login' && token !== undefined)

  if (path === '/login' && token !== undefined) {
    return <Redirect to="/" />
  }
  if (token === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
