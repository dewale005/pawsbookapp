import { ALL_CHAT_LIST } from '../action/action.types';

intialState = {
    chatlist: []
}

export const chatListReducer = (state = intialState, action) => {
    switch (action.type) {
        case ALL_CHAT_LIST:
            return {
                chatlist: action.data
            }
        default:
            return state
    }
}