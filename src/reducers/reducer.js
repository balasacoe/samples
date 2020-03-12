import { FETCH_USERS_DATA } from '../actions/types';

export default function userReducer(state = [], action) {
    switch (action.type) {
        case FETCH_USERS_DATA:
            return action.data;
        default:
            return state;
    }
}