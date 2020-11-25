import React, { Component } from 'react'
import { connect } from 'react-redux'
import { votePoll } from '../actions'
import { Redirect } from 'react-router-dom'
import VotePoll from './VotePoll'
import PollResults from './PollResults'

class ViewPoll extends Component {

    findAnswer = (questionId, questions, authedUser) => {
        console.log({ authedUser, questions, authedUser })
        if (questions[questionId] === undefined) {
            return { text: 'notvalid', name: 'notvalid' }
        }
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
        if (questions[questionId] === undefined) {
            return {
                optionOneVotes: 'notvalid',
                optionTwoVotes: 'notvalid',
                totalVotes: 'notvalid'
            }
        }
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

    setAnswer = (text, option) => {
        this.setState({
            optionChosen: text,
            active: option
        })
    }

    render() {

        const { users, questions } = this.props
        const questionId = this.props.match.params.question_id

        return (
            !this.props.authenticate || this.props.authenticate === undefined ?
                <Redirect to={{
                    pathname: "/login",
                    state: { history: '/questions/' + questionId }
                }} /> :
                this.props.authenticate && (this.state.optionText === 'notvalid' || this.state.optionChosen === 'notvalid') ?
                    <Redirect to={{
                        pathname: "/error",

                    }} /> :
                    this.state.optionText === null ?
                        <div className='home'>
                            <div className='poll-container' style={{ minHeight: '30%' }}>
                                <div className='poll' style={{ height: '100%', margin: 0 }}>
                                    <div className='user-name'>{users[questions[questionId].author].name} asks..</div>
                                    <VotePoll
                                        avatarUrl={users[questions[questionId].author].avatarURL}
                                        question={questions[questionId]}
                                        saveAnswer={this.saveAnswer}
                                        setAnswer={this.setAnswer}
                                        active={this.state.active}
                                    />
                                </div>
                            </div>
                        </div> :
                        <div className='home'>
                            <div className='poll-container' style={{ minHeight: '30%' }}>
                                <div className='poll' style={{ height: '100%', margin: 0 }}>
                                    <div className='user-name'>{users[questions[questionId].author].name} asks..</div>
                                    <PollResults
                                        avatarUrl={users[questions[questionId].author].avatarURL}
                                        question={questions[questionId]}
                                        active={this.state.active}
                                        optionOneVotes={this.state.optionOneVotes}
                                        optionTwoVotes={this.state.optionTwoVotes}
                                        totalVotes={this.state.totalVotes}
                                    />
                                </div>
                            </div>
                        </div>

        )
    }
}


const mapStateToProps = ({ authedUser, questions, users, authenticate }, { match }) => {
    console.log({ authedUser, questions, users, authenticate })
    return { authedUser, questions, users, authenticate }
}

export default connect(mapStateToProps)(ViewPoll)