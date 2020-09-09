import axios from 'axios';
import {Alert, AsyncStorage} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import { signOut, signIn, restore } from '../store/action/auth.action';
import { ApiConfig } from '../util/config';



export const authRegister = payload => {
  return async _dispatch => {
    await axios
      .post(`${ApiConfig.local}users/register`, payload)
      .then(async res => {
        await AsyncStorage.setItem('auth', res.data.token);
        _dispatch(signIn(res.data.token));
      })
      .catch(err => {
        Alert.alert('Authentication Error', err.response.data.message);
      });
  };
};

export const authlogin = payload => {
  return async _dispatch => {
    await axios
      .post(`${ApiConfig.local}users/login`, payload)
      .then(async res => {
        await AsyncStorage.setItem('auth', res.data.token);
        _dispatch(signIn(res.data.token));
      })
      .catch(err => {
        Alert.alert('Authentication Error', err.response.data.message);
      });
  };
};

export const authlogout = () => {
  return async _dispatch => {
    await AsyncStorage.removeItem('auth');
    _dispatch(signOut());
  };
};

export const autologin = () => {
  return async _dispatch => {
    const token = await AsyncStorage.getItem('auth');
    _dispatch(restore(token));
  };
};
