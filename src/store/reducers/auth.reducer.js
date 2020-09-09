import { RESTORE_TOKEN, SIGN_IN, SIGIN_OUT } from '../action/action.types';

const initialState = {
    loading: true,
    isSignout: false,
    userToken: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case RESTORE_TOKEN:
            return {
                userToken: action.token,
                loading: false
            };
        case SIGN_IN:
            return {
                isSignout: true,
                userToken: action.token
            };
        case SIGIN_OUT:
            return {
                isSignout: false,
                userToken: null
            };
        default:
            return state;
    }
}

export default reducer