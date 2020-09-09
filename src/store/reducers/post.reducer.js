import {ADD_PHOTO} from '../action/action.types';


const initialState = {
  post: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PHOTO:
      return {
        post: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
