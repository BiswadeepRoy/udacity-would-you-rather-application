import React, { Component } from 'react'
import { receiveUsers } from '../actions'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import ViewPoll from './ViewPoll'
import Nav from './Nav'
import CreatePoll from './CreatePoll'
import Leaderboard from './Leaderboard'
import Error from './Error'
import { connect } from 'react-redux'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(receiveUsers())
  }

  render() {
    return (
      <Router>
        <Nav></Nav>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/login' component={Login}></Route>
          <Route exact path='/questions/:question_id' component={ViewPoll}></Route>
          <Route exact path='/add' component={CreatePoll}></Route>
          <Route exact path='/leaderboard' component={Leaderboard}></Route>
          <Route exact path='/error' component={Error}></Route>
        </Switch>
      </Router>
    )
  }
}

export default connect()(App);
