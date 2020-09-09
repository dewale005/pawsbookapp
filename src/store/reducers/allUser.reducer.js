import { ALL_USERS } from "../action/action.types";

const intialState = {
    users: []
}

export const allUserReducers = (state = intialState, action) => {
    switch (action.type) {
        case ALL_USERS:
            return {
                users: action.data
            }
        default:
            return state;
    }
}