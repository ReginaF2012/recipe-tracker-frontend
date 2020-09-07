const alertsReducer = (state = [], action) => {
    switch(action.type){
        case "ADD_ALERTS":
           return typeof(action.payload) === "string" ? [action.payload] : action.payload
        default:
            return state
    }
}

export default alertsReducer