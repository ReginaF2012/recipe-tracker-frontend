
const usersReducer = (state = {}, action) => {
    switch(action.type){
        case "LOGIN":

            localStorage.setItem('token', action.payload.token)
            return JSON.parse(action.payload.user)

        case "LOGOUT":
            localStorage.removeItem('token')
            return {}
            
        default:
            return state
    }
}

export default usersReducer