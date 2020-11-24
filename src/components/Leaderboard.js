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
        users: !this.props.authenticate || this.props.authenticate === undefined ? null : this.sortUsers(this.props.users)
    }

    render() {
        return (
            !this.props.authenticate || this.props.authenticate === undefined ?
                <Redirect to={{
                    pathname: "/login",
                    state: { history: '/leaderboard' }
                }} /> :
                (
                    <div className='home'>
                        <div className='poll-container'>
                            <div className='polls'>
                                {this.state.users.map((user, index) =>
                                    (<LeaderSummary key={user.id}
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

const mapStateToProps = ({ authedUser, users, authenticate }) => {
    return { authedUser, users, authenticate }
}

export default connect(mapStateToProps)(Leaderboard)