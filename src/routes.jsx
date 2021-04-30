import React from 'react'
import { Redirect, Router, Switch } from 'react-router-dom'
import history from './history'
import Auth from './pages/Auth'
import Main from './pages/Main'
import GameBoard from './pages/GameBoard'
import Profile from './pages/Profile'
import Info from './pages/Info'
import PrivateRoute from './components/Routes/PrivateRoute'
import LoginRoute from './components/Routes/LoginRoute'
import Liders from './pages/Liders'
import {
  AUTH_URL,
  GAME_URL,
  MAIN_URL,
  PROFILE_URL,
  INFO_URL,
  LIDERS,
} from './constants/routes'

const Routes = () => (
  <Router history={history}>
    <Switch>
      <LoginRoute exact path={AUTH_URL} component={Auth} />
      <PrivateRoute exact path={MAIN_URL} component={Main} />
      <PrivateRoute exact path={GAME_URL} component={GameBoard} />
      <PrivateRoute exact path={PROFILE_URL} component={Profile} />
      <PrivateRoute exact path={INFO_URL} component={Info} />
      <PrivateRoute exact path={LIDERS} component={Liders} />
      <Redirect to={AUTH_URL} />
    </Switch>
  </Router>
)

export default Routes
