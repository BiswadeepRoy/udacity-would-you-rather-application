import { RECEIVE_USERS, SET_AUTHED_USER_RECEIVE_POLLS, ADD_POLL, VOTE_POLL, AUTHENTICATE } from '../actions'

export default function reducer(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS: {
            return {
                authedUser: null,
                users: action.users,
                questions: {},
                authenticate: false
            }
        }
        case SET_AUTHED_USER_RECEIVE_POLLS: {
            return {
                authedUser: action.authedUser,
                users: state.users,
                questions: action.questions,
                authenticate: state.authenticate
            }
        }
        case AUTHENTICATE: {
            return {
                ...state,
                authenticate: action.authenticate
            }
        }
        case ADD_POLL:
        case VOTE_POLL: {
            return {
                authedUser: state.authedUser,
                users: action.users,
                questions: action.questions,
                authenticate: state.authenticate
            }
        }

        default: {
            return state
        }
    }
}