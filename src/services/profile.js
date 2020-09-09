import axios from 'axios';
import {Alert, AsyncStorage} from 'react-native';
import {getUserData, allUserData} from '../store/action/user.action';
import { goBack } from '../util/navigation';
import { ApiConfig } from '../util/config';
import { Socket } from './ui';


// import AsyncStorage from '@react-native-community/async-storage';

export const profile = () => {
  return async _dispatch => {
    const token = await AsyncStorage.getItem('auth');
    await axios
      .get(`${ApiConfig.local}users/profile`, {
        headers: {
          Authorization: 'bearer ' + token,
        },
      })
      .then(async res => {
        _dispatch(getUserData(res.data));
      })
      .catch(err => {
        console.log(err.response);
      });
  };
};

export const editprofile = payload => {
  return async _dispatch => {
    const token = await AsyncStorage.getItem('auth');
    await axios
      .put(`${ApiConfig.local}users/profile`, payload, {
        headers: {
          Authorization: 'bearer ' + token,
        },
      })
      .then(async res => {
        _dispatch(getUserData(res.data));
        goBack();
      })
      .catch(err => {
        console.log(err.response, err);
      });
  };
};

export const allUsers = () => {
  return async _dispatch => {
    const token = await AsyncStorage.getItem('auth');
    await axios.get(`${ApiConfig.local}users/`, {
      headers: {
        Authorization: 'bearer ' + token,
      },
    })
      .then(async res => {
      _dispatch(allUserData(res.data));
    })
    .catch(err => {
      console.log(err.response);
    });
  }
}

export const followUser = id => {
  return async _dispatch => {
    const token = await AsyncStorage.getItem('auth');
    await axios.post(`${ApiConfig.local}users/follow/${id}`, {}, {
      headers: {
        Authorization: 'bearer ' + token,
      },
    })
      .then(async res => {
        console.log(res);
        Socket.emit('refresh', {})
      }).catch(err => {
        console.log(err.response)
    })
  }
}
