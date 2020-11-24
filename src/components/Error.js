import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Error extends Component {
    render() {
        return (
            <div className='login'>
                <div className='login-container'>
                    <div className='login-label'>404 Not Found !!</div>
                    <div>Please re-login to see poll</div>
                    <Link style={{ textDecoration: 'none' }} exact to={{
                        pathname: "/login",
                        state: { history: this.props.location.state === undefined ? '/' : this.props.location.state.history }
                    }}>Login Page</Link>
                </div>
            </div>
        );
    }
}


export default connect()(Error)