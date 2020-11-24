import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { votePoll } from '../actions'
import { Redirect } from 'react-router-dom'

class ViewPoll extends Component {

    findAnswer = (questionId, questions, authedUser) => {
        if (questions[questionId].optionOne.votes.includes(authedUser)) {
            return { text: questions[questionId].optionOne.text, name: 'optionOne' }
        }
        else if (questions[questionId].optionTwo.votes.includes(authedUser)) {
            return { text: questions[questionId].optionTwo.text, name: 'optionTwo' }
        }
        else {
            return { text: null, name: null }
        }
    }

    findVotes = (questionId, questions) => {
        return {
            optionOneVotes: questions[questionId].optionOne.votes.length,
            optionTwoVotes: questions[questionId].optionTwo.votes.length,
            totalVotes: questions[questionId].optionOne.votes.length + questions[questionId].optionTwo.votes.length
        }
    }

    state = {
        optionText: this.props.questions ? this.findAnswer(this.props.match.params.question_id, this.props.questions, this.props.authedUser).text : null,
        optionChosen: this.props.questions ? this.findAnswer(this.props.match.params.question_id, this.props.questions, this.props.authedUser).text : null,
        active: this.props.questions ? this.findAnswer(this.props.match.params.question_id, this.props.questions, this.props.authedUser).name : null,
        optionOneVotes: this.props.questions ? this.findVotes(this.props.match.params.question_id, this.props.questions).optionOneVotes : null,
        optionTwoVotes: this.props.questions ? this.findVotes(this.props.match.params.question_id, this.props.questions).optionTwoVotes : null,
        totalVotes: this.props.questions ? this.findVotes(this.props.match.params.question_id, this.props.questions).totalVotes : null,
    }

    saveAnswer = (event) => {
        event.preventDefault()
        this.props.dispatch(votePoll({ authedUser: this.props.authedUser, qid: this.props.match.params.question_id, answer: this.state.active }))
        this.setState((currentState) => {
            return {
                ...currentState,
                optionText: currentState.optionChosen,
                optionOneVotes: currentState.active === 'optionOne' ? currentState.optionOneVotes + 1 : currentState.optionOneVotes,
                optionTwoVotes: currentState.active === 'optionTwo' ? currentState.optionTwoVotes + 1 : currentState.optionTwoVotes,
                totalVotes: currentState.totalVotes + 1
            }
        })
    }

    render() {

        const { users, questions, avatarURL } = this.props
        const questionId = this.props.match.params.question_id

        return (
            !this.props.authenticate || this.props.authenticate === undefined ?
                <Redirect to={{
                    pathname: "/error"
                }} /> :
                this.state.optionText === null ?
                    <div className='home'>
                        {console.log(this.state)}
                        <div className='poll-container' style={{ minHeight: '30%' }}>
                            <div className='poll' style={{ height: '100%', margin: 0 }}>
                                <div className='user-name'>{users[questions[questionId].author].name} asks..</div>
                                <div className='summary'>
                                    <div className='avatar'><img src={avatarURL} alt={users[questions[questionId].author].name} /></div>
                                    <div className='question'>
                                        <div style={{ fontWeight: '700', fontSize: '1.2em' }}>Would you rather</div>

                                        {this.state.active === 'optionOne' ?
                                            <div className='option active-option' onClick={() => {
                                                this.setState({
                                                    optionChosen: questions[questionId].optionOne.text,
                                                    active: 'optionOne'
                                                })
                                            }}>
                                                {questions[questionId].optionOne.text} </div>
                                            : <div className='option' onClick={() => {
                                                this.setState({
                                                    optionChosen: questions[questionId].optionOne.text,
                                                    active: 'optionOne'
                                                })
                                            }}>
                                                {questions[questionId].optionOne.text} </div>}


                                        {this.state.active === 'optionTwo' ?
                                            <div className='option active-option' onClick={() => {
                                                this.setState({
                                                    optionChosen: questions[questionId].optionTwo.text,
                                                    active: 'optionTwo'
                                                })
                                            }}>
                                                {questions[questionId].optionTwo.text} </div>
                                            : <div className='option' onClick={() => {
                                                this.setState({
                                                    optionChosen: questions[questionId].optionTwo.text,
                                                    active: 'optionTwo'
                                                })
                                            }}>
                                                {questions[questionId].optionTwo.text} </div>}

                                        <button style={{ padding: 10, fontSize: '1em' }} onClick={(event) => this.saveAnswer(event)}>Submit Poll</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> :
                    <div className='home'>
                        <div className='poll-container' style={{ minHeight: '30%' }}>
                            <div className='poll' style={{ height: '100%', margin: 0 }}>
                                <div className='user-name'>{users[questions[questionId].author].name} asks..</div>
                                <div className='summary'>
                                    <div className='avatar'><img src={avatarURL} alt={users[questions[questionId].author].name} /></div>
                                    <div className='question'>
                                        <div style={{ fontWeight: '700', fontSize: '1.2em' }}>Would you rather</div>

                                        {this.state.active === 'optionOne' ?
                                            <div className='option active-option' style={{ cursor: 'context-menu' }}>
                                                {questions[questionId].optionOne.text} <FontAwesomeIcon icon={faCheckCircle} />
                                                <div className='loader-box'>
                                                    <div className='loader' style={{ width: `${parseInt((this.state.optionOneVotes / this.state.totalVotes) * 100, 10)}%` }}>
                                                        {parseInt((this.state.optionOneVotes / this.state.totalVotes) * 100, 10)}%
                                            </div>
                                                </div>
                                                <div style={{ width: '100%', textAlign: 'center' }}>{this.state.optionOneVotes} out of {this.state.totalVotes} votes</div>
                                            </div>
                                            : <div className='option' >
                                                {questions[questionId].optionOne.text}
                                                <div className='loader-box'>
                                                    <div className='loader' style={{ width: `${parseInt((this.state.optionOneVotes / this.state.totalVotes) * 100, 10)}%` }}>
                                                        {parseInt((this.state.optionOneVotes / this.state.totalVotes) * 100, 10)}%
                                            </div>
                                                </div>
                                                <div style={{ width: '100%', textAlign: 'center' }}>{this.state.optionOneVotes} out of {this.state.totalVotes}  votes</div>
                                            </div>}


                                        {this.state.active === 'optionTwo' ?
                                            <div className='option active-option' style={{ cursor: 'context-menu' }}>
                                                {questions[questionId].optionTwo.text} <FontAwesomeIcon icon={faCheckCircle} />
                                                <div className='loader-box'>
                                                    <div className='loader' style={{ width: `${parseInt((this.state.optionTwoVotes / this.state.totalVotes) * 100, 10)}%` }}>
                                                        {parseInt((this.state.optionTwoVotes / this.state.totalVotes) * 100, 10)}%
                                            </div>
                                                </div>
                                                <div style={{ width: '100%', textAlign: 'center' }}>{this.state.optionTwoVotes} out of {this.state.totalVotes}  votes</div>
                                            </div>
                                            : <div className='option' >
                                                {questions[questionId].optionTwo.text}
                                                <div className='loader-box'>
                                                    <div className='loader' style={{ width: `${parseInt((this.state.optionTwoVotes / this.state.totalVotes) * 100, 10)}%` }}>
                                                        {parseInt((this.state.optionTwoVotes / this.state.totalVotes) * 100, 10)}%
                                            </div>
                                                </div>
                                                <div style={{ width: '100%', textAlign: 'center' }}>{this.state.optionTwoVotes} out of {this.state.totalVotes}  votes</div>
                                            </div>}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

        )
    }
}


const mapStateToProps = ({ authedUser, questions, users, authenticate }, { match }) => {
    const avatarURL = questions ? users[questions[match.params.question_id].author].avatarURL : null
    return { authedUser, questions, users, avatarURL, authenticate }
}

export default connect(mapStateToProps)(ViewPoll)