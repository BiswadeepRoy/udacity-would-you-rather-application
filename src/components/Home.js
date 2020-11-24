import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PollSummary from './PollSummary'

class Home extends Component {

    state = {
        tab: 'unanswered',
        questionId: null
    }

    render() {
        const answeredQuestions = this.props.authedUser === null || this.props.authedUser === undefined ? [] :
            Object.keys(this.props.questions).filter(id =>
                this.props.questions[id].optionOne.votes.includes(this.props.authedUser) ||
                this.props.questions[id].optionTwo.votes.includes(this.props.authedUser)).sort((a, b) =>
                    this.props.questions[b].timestamp - this.props.questions[a].timestamp)

        const unansweredQuestions = this.props.authedUser === null || this.props.authedUser === undefined ? [] :
            Object.keys(this.props.questions).filter(id =>
                !this.props.questions[id].optionOne.votes.includes(this.props.authedUser) &&
                !this.props.questions[id].optionTwo.votes.includes(this.props.authedUser)).sort((a, b) =>
                    this.props.questions[b].timestamp - this.props.questions[a].timestamp)

        return (
            this.props.authedUser === null || this.props.authedUser === undefined ?
                <Redirect to={{ pathname: '/login' }} /> :

                this.state.questionId !== null ? (<Redirect to={{ pathname: '/questions/' + this.state.questionId }} />) :

                    (<div className='home'>
                        <div className='poll-container'>
                            {this.state.tab === 'unanswered' ?
                                <div className='tabs'><div className='active' onClick={() => this.setState({ tab: 'unanswered' })}>Unanswered Polls</div>
                                    <div className='inactive' onClick={() => this.setState({ tab: 'answered' })}>Answered Polls</div></div> :
                                <div className='tabs'><div className='inactive' onClick={() => this.setState({ tab: 'unanswered' })}>Unanswered Polls</div>
                                    <div className='active' onClick={() => this.setState({ tab: 'answered' })}>Answered Polls</div></div>}

                            {this.state.tab === 'unanswered' ? <div className='polls'>{unansweredQuestions.map(questionId => {
                                return (
                                    <div style={{ width: '100%' }}
                                        onClick={() => {
                                            this.setState({
                                                questionId
                                            })
                                        }} key={questionId}>
                                        <PollSummary
                                            avatarUrl={this.props.users[this.props.questions[questionId].author].avatarURL}
                                            name={this.props.users[this.props.questions[questionId].author].name}
                                            optionText={this.props.questions[questionId].optionOne.text}>
                                        </PollSummary></div>
                                )
                            })}</div>
                                :
                                <div className='polls'>{answeredQuestions.map(questionId => {
                                    return (<div style={{ width: '100%' }}
                                        onClick={() => {
                                            this.setState({
                                                questionId
                                            })
                                        }} key={questionId}>
                                        <PollSummary
                                            avatarUrl={this.props.users[this.props.questions[questionId].author].avatarURL}
                                            name={this.props.users[this.props.questions[questionId].author].name}
                                            optionText={this.props.questions[questionId].optionOne.text}>
                                        </PollSummary></div>)
                                })}</div>}
                        </div>
                    </div>)
        )
    }
}

const mapStateToProps = ({ authedUser, questions, users }) => {
    return { authedUser, questions, users }
}

export default connect(mapStateToProps)(Home)