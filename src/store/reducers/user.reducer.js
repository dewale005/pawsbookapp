import {USER_DATA_FETCHED} from '../action/action.types';

const initialState = {
  user: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA_FETCHED:
      return {
        user: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
