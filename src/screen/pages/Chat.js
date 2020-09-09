import React, {useEffect, useState, useRef} from 'react';
import IMG from '../../assets/img/logo2.jpg';
import {
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  AsyncStorage,
  StyleSheet,
} from 'react-native';
import {
  Layout,
  TopNavigation,
  Divider,
  Avatar,
  Button,
  Text,
  Input,
} from '@ui-kitten/components';
import {ApiConfig} from '../../util/config';
import axios from 'axios';
import { Socket } from '../../services/ui';

const Chat = ({ route }) => {
  var scrollViewRef = useRef();
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const {_id, name, avatar, username} = route.params;

  const chat = async id => {
    const token = await AsyncStorage.getItem('auth');
    await axios
      .get(`${ApiConfig.local}users/chat/${id}`, {
        headers: {
          Authorization: 'bearer ' + token,
        },
      })
      .then(res => {
        console.log(res.data.message);
        setData(res.data.message);
      })
      .catch(err => console.log(err.response));
  };

  const sendMessage = async id => {
    const token = await AsyncStorage.getItem('auth');
    await axios
      .post(`${ApiConfig.local}users/chat/${id}`, {message},{
        headers: {
          Authorization: 'bearer ' + token,
        },
      })
      .then(res => {
        Socket.emit('sendchat', {})
        setMessage('');
      })
      .catch(err => console.log(err.response));
  }

  useEffect(() => {
    chat(_id);
    Socket.on('chatRecieve', () => { 
      chat(_id);
    })
  }, []);

  const Post = props => (
    <Button status="info" size="tiny" onPress={() => sendMessage(_id)}>
      Send
    </Button>
  );

  const Profile = props => (
    <Avatar
      style={{width: 30, height: 30}}
      shape="round"
      size="giant"
      source={avatar}
      defaultSource={IMG}
    />
  );
  return (
    <Layout
      level="1"
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <SafeAreaView>
        <TopNavigation accessoryRight={Profile} title={name} subtitle={username} alignment="center" />
        <Divider />
      </SafeAreaView>
      <ScrollView ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated: true})}>
        {data.map((item, i) => (
          <Layout key={i} level={item.senderId === _id ? "2" : "4"} style={item.senderId === _id ? style.senderchat : style.mychat}>
            <Text style={style.text}>{item.body}</Text>
          </Layout>
        ))}
      </ScrollView>
      <KeyboardAvoidingView behavior="padding">
        <SafeAreaView>
          <Input
            accessoryLeft={Profile}
            accessoryRight={Post}
            onChangeText={value => setMessage(value)}
            value={message}
            placeholder="Add a comment..."
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Layout>
  );
};

const style = StyleSheet.create({
  mychat: {
    padding: 8,
    marginHorizontal: 20,
    marginVertical: 7,
    borderRadius: 50,
    maxWidth: '80%',
    alignSelf: 'flex-end',
  },
  senderchat: {
    padding: 8,
    marginHorizontal: 20,
    marginVertical: 7,
    borderRadius: 50,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  text: {
    paddingHorizontal: 8
  },
});

// const mapDispatchToProps = dipatch => {
//   return {
//     chatData: id => dipatch(chat(id)),
//   }
// }

export default Chat;
// export default connect(null, mapDispatchToProps)(Chat);
