import {Redirect, Route} from 'react-router-dom'
import Cookie from 'js-cookie'
import LoginForm from '../LoginForm'

const ProtectedRoute = props => {
  const token = Cookie.get('jwt_token')
  const {path} = props
  console.log(token === undefined)
  if (token === undefined) {
    return <Route {...props} path="/login" component={LoginForm} />
  }
  if (path === '/login' && token !== undefined) {
    return <Redirect to="/" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
