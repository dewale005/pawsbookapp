import axios from 'axios';
import {Alert, AsyncStorage} from 'react-native';
import {goBack, navigate} from '../util/navigation';
import { addPhoto, allchatlist } from '../store/action/post.action';
import { ApiConfig } from '../util/config'
import { Socket } from './ui';

export const post = payload => {
  return async _dispatch => {
      const token = await AsyncStorage.getItem('auth');
      await axios
        .post(`${ApiConfig.local}users/post`, payload, {
          headers: {
            Authorization: 'bearer ' + token,
          },
        })
        .then(async res => {
          Socket.emit('refresh', {})
          navigate('Home');
        })
        .catch(err => {
          console.log(err.response, err);
        });
  };
};

export const mypost = () => {
  return async _dispatch => {
    const token = await AsyncStorage.getItem('auth');
    await axios
      .get(`${ApiConfig.local}users/post`, {
        headers: {
          Authorization: 'bearer ' + token,
        },
      })
      .then(async res => {
        _dispatch(addPhoto(res.data));
      })
      .catch(err => {
        console.log(err.response, err);
      });
  };
};

export const likepost = post => {
  return async _dispatch => {
    const token = await AsyncStorage.getItem('auth');
    await axios.post(`${ApiConfig.local}users/like/${post}`,  {},{
      headers: {
        Authorization: 'bearer ' + token,
      }
    }).then(async res => {
      Socket.emit('refresh', {})
    }).catch(err => {
      console.log(err.response)
      Alert.alert("Error", err.response.data.message, [{text: 'Ok'}])
    })
  }
}

export const commentpost = post => {
  return async _dispatch => {
    const token = await AsyncStorage.getItem('auth');
    await axios.post(`${ApiConfig.local}users/comment/${post.post}`,  {description: post.description},{
      headers: {
        Authorization: 'bearer ' + token,
      }
    }).then(async res => {
      console.log(res)
      Socket.emit('refresh', {})
    }).catch(err => {
      console.log(err.response)
      Alert.alert("Error", err.response.data.message, [{text: 'Ok'}])
    })
  }
}

export const chatList = () => {
  return async _dispatch => {
    const token = await AsyncStorage.getItem('auth');
    await axios
      .get(`${ApiConfig.local}users/chat`, {
        headers: {
          Authorization: 'bearer ' + token,
        },
      })
      .then(async res => {
        _dispatch(allchatlist(res.data));
      })
      .catch(err => {
        console.log(err.response, err);
      });
  };
}

export const getpetshops = () => {
  
}
