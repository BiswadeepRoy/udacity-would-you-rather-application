import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { addPoll } from '../actions'

class CreatePoll extends Component {

    state = {
        optionOne: '',
        optionTwo: ''
    }

    changeOptionOne = (value) => {
        this.setState({
            optionOne: value
        })
    }

    changeOptionTwo = (value) => {
        this.setState({
            optionTwo: value
        })
    }

    addQuestion = (event) => {
        event.preventDefault()
        if (this.state.optionOne === '' || this.state.optionTwo === '') {
            alert('Please enter the options')
        }
        else {
            this.props.dispatch(addPoll({ optionOneText: this.state.optionOne, optionTwoText: this.state.optionTwo, authedUser: this.props.authedUser }))

            this.setState({
                optionOne: '',
                optionTwo: ''
            })

            alert('Successfully Added')
        }
    }

    render() {
        return (
            this.props.authedUser === null || this.props.authedUser === undefined ? (<Redirect to={{ pathname: '/error' }} />) :
                (
                    <div className='home'>
                        <div className='poll-container' style={{ minHeight: '35%' }}>
                            <div className='poll' style={{ height: '100%', margin: 0 }}>
                                <div className='user-name' style={{ fontSize: '1.2em' }}>Would You Rather ..</div>
                                <div className='summary' style={{ width: '100%' }}>
                                    <div className='question' style={{ width: '100%' }}>

                                        <div style={{ fontWeight: '700', fontSize: '1.2em' }}>Complete the question</div>

                                        <input style={{ fontSize: '1.1em', width: '75%' }}
                                            placeholder='Please Enter option 1'
                                            onChange={(event) => this.changeOptionOne(event.target.value)}
                                            value={this.state.optionOne}
                                        ></input>

                                        <div style={{ fontWeight: '700', fontSize: '1.2em' }}>OR</div>

                                        <input style={{ fontSize: '1.1em', width: '75%' }}
                                            placeholder='Please Enter option 2'
                                            onChange={(event) => this.changeOptionTwo(event.target.value)}
                                            value={this.state.optionTwo}
                                        ></input>

                                        <button style={{ padding: 15, fontSize: '1em' }} onClick={(event) => this.addQuestion(event)}>
                                            Create Poll</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
    }
}

const mapStateToProps = ({ authedUser }) => {
    return { authedUser }
}

export default connect(mapStateToProps)(CreatePoll)