import {USER_DATA_FETCHED, ALL_USERS} from './action.types'

export const getUserData = data => {
    return {
      type: USER_DATA_FETCHED,
      data: data,
    };
};
  
export const allUserData = data => {
  return {
    type: ALL_USERS,
    data: data
  }
}