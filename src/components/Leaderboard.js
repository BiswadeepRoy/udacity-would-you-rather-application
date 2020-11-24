import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import LeaderSummary from './LeaderSummary'

class Leaderboard extends Component {

    sortUsers = (users) => {
        const usersScores = Object.values(users).map((user) => {
            const score = Object.keys(user.answers).length + user.questions.length
            return { ...user, score }
        })
        return usersScores.sort((user1, user2) => user2.score - user1.score)
    }

    state = {
        users: this.props.authedUser === null || this.props.authedUser === undefined ? null : this.sortUsers(this.props.users)
    }

    render() {
        return (
            this.props.authedUser === null || this.props.authedUser === undefined ? (<Redirect to={{ pathname: '/error' }} />) :
                (
                    <div className='home'>
                        <div className='poll-container'>
                            <div className='polls'>
                                {this.state.users.map((user, index) =>
                                    (<LeaderSummary
                                        avatarUrl={user.avatarURL}
                                        name={user.name}
                                        answers={user.score - user.questions.length}
                                        questions={user.questions.length}
                                        position={index}
                                    >
                                    </LeaderSummary>))}
                            </div>
                        </div>
                    </div>
                ))
    }
}

const mapStateToProps = ({ authedUser, users }) => {
    return { authedUser, users }
}

export default connect(mapStateToProps)(Leaderboard)