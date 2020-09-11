import { ADD_ALERTS } from './alertsActions';
const URL = "http://localhost:3001/api/v1/users"
const LOGIN = (user) => ({type: "LOGIN", payload: user})
const LOGOUT = {type: "LOGOUT"}

export const loginUser = (user) => {
    return (dispatch) => {
        fetch(URL+'/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(resp => resp.json())
        .then(json => {
            !!json.errors ? dispatch(ADD_ALERTS(json.errors)) : dispatch(LOGIN(json))
        })
    }
}

export const logoutUser = (dispatch) => {
    dispatch(LOGOUT)
}

export const autoLoginUser = (dispatch) => {
    // need to use token in local storage to make a fetch request to the rails API
    return (dispatch) => {    
        fetch(URL+'/autologin', {
            headers: {
                "Content-type": "application/json",
                "Accepts": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        // then need to update state with user object returned from backend
        .then(resp => resp.json())
        .then(json => {
            !!json.errors ? dispatch(ADD_ALERTS(json.errors)) : dispatch(LOGIN(json))
        })
        .catch(errors => console.log(errors))}
}
