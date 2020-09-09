import { daymode, nightmode } from '../store/action/ui.action';
import io from 'socket.io-client'
import { ApiConfig } from '../util/config';

export const dayApp = () => {
  return _dispatch => {
    _dispatch(daymode());
  };
};

export const nightApp = () => {
  return _dispatch => {
    _dispatch(nightmode());
  };
};

export const Socket = io(ApiConfig.local);


