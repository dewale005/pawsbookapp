import {ADD_PHOTO, ALL_PHOTO, ALL_CHAT_LIST} from './action.types';

export const addPhoto = payload => {
  return {
    type: ADD_PHOTO,
    data: payload,
  };
};

export const allPost = () => {
  return {
    type: ALL_PHOTO,
  };
};

export const allchatlist = payload => {
  return {
    type: ALL_CHAT_LIST,
    data: payload
  }
}