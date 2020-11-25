import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Error extends Component {
    render() {
        return (
            <div className='login'>
                <div className='login-container'>
                    <div className='login-label'>404 Not Found !!</div>
                    <div style = {{fontSize: '1.2em'}}>Incorrect question searched !!!</div>
                    <Link style={{ textDecoration: 'none' }} to={{
                        pathname: "/login",
                        state: { history: this.props.location.state === undefined ? '/' : this.props.location.state.history }
                    }}>Click to go to Login Page</Link>
                </div>
            </div>
        );
    }
}


export default connect()(Error)