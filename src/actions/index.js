import { FETCH_USERS_DATA } from './types';
import { API_USERS } from '../constants/apiConstants';
import { getData } from '../utils/apiutil';


export const fetchData = (data) => {
    return {
        type: FETCH_USERS_DATA,
        data
    }
};

export const fetchUsersData = () => {
    return (dispatch) => {
        getData(`${API_USERS.getAllUsers}`).then((data) => {
            dispatch(fetchData(data));
        });
    };
};