const usersReducer = (state = {}, action) => {
    switch(action.type){
        case "LOGIN":
            
            localStorage.setItem('token', action.payload.token)
            return action.payload
            
        default:
            return state
    }
}

export default usersReducer