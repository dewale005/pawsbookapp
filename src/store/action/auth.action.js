import {RESTORE_TOKEN, SIGN_IN, SIGIN_OUT} from './action.types';

export const signIn = token => {
  return {
    type: SIGN_IN,
    token: token,
  };
};

export const signOut = () => {
  return {
    type: SIGIN_OUT,
  };
};

export const restore = token => {
  return {
    type: RESTORE_TOKEN,
    token: token,
  };
};
