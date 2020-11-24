import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUserAndReceivePolls, authenticate } from '../actions'
import { Redirect } from 'react-router-dom'

class Login extends Component {

    state = {
        authenticated: false,
        authedUser: null
    }

    onSelect = (userId) => {
        this.props.dispatch(setAuthedUserAndReceivePolls(userId))
        this.setState({
            authedUser: userId
        })
    }

    onSubmit = (event) => {
        event.preventDefault()
        this.props.dispatch(authenticate(true))
        this.setState({
            authenticated: true
        })
    }

    render() {
        return (
            !this.state.authenticated ? (<div className='login'>
                <div className='login-container'>
                    <div className='login-label'>Who is Polling?</div>
                    <div className='login-users'>
                        {typeof this.props.users === 'undefined' ? <div className='login-user'
                            style={{ backgroundImage: `url('./images/loader.gif')` }}></div> :
                            Object.keys(this.props.users).map(id => {
                                return (<div key={id} className={this.state.authedUser === id ? 'login-user-active' : 'login-user'}
                                    onClick={() => this.onSelect(id)}
                                    style={{ backgroundImage: `url(${this.props.users[id].avatarURL})` }}>
                                    {this.props.users[id].name}
                                </div>
                                )
                            })}
                    </div>
                    <button onClick={(event) => this.onSubmit(event)}>Submit</button>
                </div>
            </div>) : (<Redirect to={{ pathname: '/' }} />)
        )
    }
}


const mapStateToProps = ({ users }) => {
    return { users }
}

export default connect(mapStateToProps)(Login);