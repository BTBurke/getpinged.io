import React from 'react';
import Login from './login/login';
import cookie from 'react-cookies';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

class Session extends React.Component {
  
  render() {
    return (
    <div>
      This is the internal site
    </div>
    )
  }
}

const App = () => (
  <Router>
    <div>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Login} />
      <PrivateRoute path="/projects" component={Session} />
    </div>
  </Router>
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    loggedIn ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { 
          from: props.location,
          errorMsg: "Session expired. Please log in." 
        },
      }}/>
    )
  )}/>
)

const loggedIn = cookie.load('pinged') !== undefined

export default App;
