import { ADD_ALERTS } from './alertsActions';
//! URL of API backend
const URL = "https://tranquil-badlands-73443.herokuapp.com/api/v1/users"
const LOGIN = (user) => ({type: "LOGIN", payload: user})
const LOGOUT = {type: "LOGOUT"}
const SIGN_UP = (user) => ({type: "SIGN UP", payload: user})

export const loginUser = (user) => {
    return (dispatch) => {
        fetch(URL+'/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            // Nesting the object here because of strong params on backend
            body: JSON.stringify({user: {...user}})
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
    // use token in local storage to make a fetch request to the rails API
    return (dispatch) => {    
        fetch(URL+'/autologin', {
            headers: {
                "Content-type": "application/json",
                "Accepts": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        // then update state with user object returned from backend
        .then(resp => resp.json())
        .then(json => {
            !!json.errors ? dispatch(ADD_ALERTS(json.errors)) : dispatch(LOGIN(json))
        })
        .catch(errors => console.log(errors))}
}

export const signUpUser = (user) => {
    return (dispatch) => {
        fetch(URL, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify({user: {...user}})
        })
        .then(resp => resp.json())
        .then(json => {
            !!json.errors ? dispatch(ADD_ALERTS(json.errors)) : dispatch(SIGN_UP(json))
        })
        .catch(errors => console.log(errors))
    }
}
