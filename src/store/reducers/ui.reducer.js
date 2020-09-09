import { LIGHT_MODE, DARK_MODE } from '../action/action.types'

const intialState = {
    isDarkMode: false
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case LIGHT_MODE:
            return {
                isDarkMode: false
            };
        case DARK_MODE:
            return {
                isDarkMode: true
            };
        default:
            return state
    }
}

export default reducer;