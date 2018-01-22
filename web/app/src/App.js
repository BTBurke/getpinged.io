import React from 'react';
import Login from './login/login';
import cookie from 'react-cookies';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Session from './session/session';


const NakedRedirect = () => (
  <Redirect to='/projects' />
)

const App = () => (
  <Router>
    <div>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Login} />
      <PrivateRoute path="/projects" component={Session} />
      <PrivateRoute path="/search" component={Session} />
      <PrivateRoute exact path="/" component={NakedRedirect} />
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
