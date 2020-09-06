
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
        .then(json => dispatch(LOGIN(json)))
    }
}

export const logoutUser = (dispatch) => {
    dispatch(LOGOUT)
}
