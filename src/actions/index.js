import { getQuestions, getUsers, saveQuestion, saveQuestionAnswer } from '../util'

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SET_AUTHED_USER_RECEIVE_POLLS = 'SET_AUTHED_USER_RECEIVE_POLLS'
export const ADD_POLL = 'ADD_POLL'
export const VOTE_POLL = 'VOTE_POLL'
export const AUTHENTICATE = 'AUTHENTICATE'

export function receiveUsers() {
    return (dispatch) => {
        getUsers().then((users) => {
            dispatch({
                type: RECEIVE_USERS,
                users
            })
        })
    }
}

export function authenticate(authenticate) {
    return {
        type: AUTHENTICATE,
        authenticate
    }
}

export function setAuthedUserAndReceivePolls(authedUser) {
    return (dispatch) => {
        if (authedUser === null) {
            dispatch({
                type: SET_AUTHED_USER_RECEIVE_POLLS,
                authedUser
            })
        }
        else {
            getQuestions().then((questions) => {
                dispatch({
                    type: SET_AUTHED_USER_RECEIVE_POLLS,
                    questions,
                    authedUser
                })
            })
        }
    }
}

export function addPoll({ optionOneText, optionTwoText, authedUser }) {
    return (dispatch) => {
        saveQuestion({ optionOneText, optionTwoText, author: authedUser }).
            then(() => getQuestions().then((questions) => getUsers().then((users) => {
                dispatch({
                    type: ADD_POLL,
                    users,
                    questions
                })
            }))
            )
    }
}

export function votePoll({ authedUser, qid, answer }) {
    return (dispatch) => {
        saveQuestionAnswer({ authedUser, qid, answer }).
            then(() => getQuestions().then((questions) => getUsers().then((users) => {
                dispatch({
                    type: VOTE_POLL,
                    users,
                    questions
                })
            }))
            )
    }
}

