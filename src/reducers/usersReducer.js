
const usersReducer = (state = {}, action) => {
    switch(action.type){
        case "LOGIN":

            localStorage.setItem('token', action.payload.token)
            return JSON.parse(action.payload.user)

        case "LOGOUT":
            localStorage.removeItem('token')
            return {}

        case "INVALID_AUTHENTICATION":
            return {alerts: action.payload}
            
        default:
            return state
    }
}

export default usersReducer