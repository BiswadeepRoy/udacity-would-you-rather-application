import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Error extends Component {
    render() {
        return (
            <div className='login'>
                <div className='login-container'>
                    <div className='login-label'>404 Not Found !!</div>
                    <div>Please re-login to authenticate yourself</div>
                    <Link style={{ textDecoration: 'none' }} exact to={{ pathname: "/login" }}>Login Page</Link>
                </div>
            </div>
        );
    }
}


export default connect()(Error)