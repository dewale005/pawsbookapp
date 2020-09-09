import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Signin from '../screen/Signin';
import Signup from '../screen/Signup';
import {connect} from 'react-redux';
import {navigationRef} from '../util/navigation';
import Profile from '../screen/pages/Profile';
import {autologin} from '../services/auth';
import App from './App';
import Editprofile from '../screen/pages/Editprofile';
import Comment from '../screen/pages/Comment';
import { Icon, Text, Button } from '@ui-kitten/components';
import ChatList from '../screen/pages/ChatList';
import Chat from '../screen/pages/Chat';

const Stack = createStackNavigator();

const MainApp = ({ auth, autosignin }) => {
  const DoneIcon = props => <Icon {...props} name="checkmark" />
  useEffect(() => {
    autosignin();
  }, [autosignin]);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerTintColor: '#000', headerBackTitleVisible: false}}>
        {auth.userToken == null ? (
          <>
            <Stack.Screen
              name="Home"
              options={{headerTransparent: true, title: ''}}
              component={Signin}
            />
            <Stack.Screen
              name="signup"
              options={{headerTransparent: true, title: ''}}
              component={Signup}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="app"
              options={{headerTransparent: true, title: ''}}
              component={App}
            />
            <Stack.Screen
              name="editprofile"
                options={{ headerTransparent: true, title: 'Edit Profile' }}
                component={Editprofile}
            />
            <Stack.Screen
              name="comment"
              options={{headerTransparent: true, title:" Comment" }}
              component={Comment}
            />
            <Stack.Screen
              name="chatlist"
              options={{headerTransparent: true, title:"Chats" }}
              component={ChatList}
            />
            <Stack.Screen
              name="chat"
              options={{headerTransparent: true, title:"" }}
              component={Chat}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dipatch => {
  return {
    autosignin: () => dipatch(autologin()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainApp);
