
const alertsReducer = (state = [], action) => {
    switch(action.type){
        case "ADD_ALERTS":

           return typeof(action.payload) !== "object" ? [...state, action.payload] : [...state, ...action.payload]

        default:
            return state
    }
}

export default alertsReducer