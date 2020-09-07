
const URL = "http://localhost:3001/api/v1/users"
const LOGIN = (user) => ({type: "LOGIN", payload: user})
const LOGOUT = {type: "LOGOUT"}
const INVALID_AUTHENTICATION = (errors) => ({type: "INVALID_AUTHENTICATION", payload: errors})
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
            !!json.errors ? dispatch(INVALID_AUTHENTICATION(json.errors)) : dispatch(LOGIN(json))})
    }
}

export const logoutUser = (dispatch) => {
    dispatch(LOGOUT)
}
