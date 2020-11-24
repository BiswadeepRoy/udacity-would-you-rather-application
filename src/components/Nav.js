import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUserAndReceivePolls, authenticate } from '../actions'

class Nav extends Component {

    logout = () => {
        this.props.dispatch(setAuthedUserAndReceivePolls(null))
        this.props.dispatch(authenticate(false))
    }

    render() {
        return (this.props.authenticate && this.props.authedUser !== null) ? (
            <nav className='nav-bar'>
                <div className='nav-left'>
                    <NavLink className='nav' exact to='/' activeClassName='active-nav'>Home</NavLink>
                    <NavLink className='nav' to='/add' activeClassName='active-nav'>Create Poll</NavLink>
                    <NavLink className='nav' to='/leaderboard' activeClassName='active-nav'>LeaderBoard</NavLink>
                </div>
                <div className='nav-right'>
                    Welcome ! {this.props.authedUser ? this.props.users[this.props.authedUser].name : ''}
                    <NavLink className='nav' style={{ color: 'black', fontWeight: '500' }}
                        onClick={() => this.logout()} to='/login'>
                        Log out</NavLink>
                </div>
            </nav>
        ) : (null)
    }
}

const mapStateToProps = ({ authedUser, users, authenticate }) => {
    return { authedUser, users, authenticate }
}

export default connect(mapStateToProps)(Nav)