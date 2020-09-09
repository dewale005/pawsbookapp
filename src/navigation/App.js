/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Text,
  Avatar,
} from '@ui-kitten/components';
import Profile from '../screen/pages/Profile';
import Home from '../screen/pages/Home';
import Search from '../screen/pages/Search';
import Camera from '../screen/pages/Camera';
import Love from '../screen/pages/Love';
import {View, ImageBackground} from 'react-native';
import SideDrawer from './SideDrawer';
import Dog2 from '../assets/img/dog3.png';
import Dog from '../assets/img/logo2.jpg';
import {profile, allUsers} from '../services/profile';
import {connect} from 'react-redux';
import {mypost, chatList} from '../services/post';
import { ApiConfig } from '../util/config';
import { Socket } from '../services/ui';

const {Navigator, Screen} = createBottomTabNavigator();

const HomeIcon = props => (
  <>
    <Avatar {...props} shape="square" source={Dog2} />
    <View
      style={{
        backgroundColor: 'red',
        left: 45,
        top: 5,
        width: 8,
        height: 8,
        justifyContent: 'center',
        borderRadius: 6,
        alignItems: 'center',
        position: 'absolute',
      }}>
      <Text />
    </View>
  </>
);
const SearchIcon = props => <Icon {...props} name="search" />;
const CameraIcon = props => <Icon {...props} name="plus-square-outline" />;
const LoveIcon = props => <Icon {...props} name="heart" />;
const ProfileIcon = props => <Avatar size="tiny" source={Dog} />;

const BottomTabBar = ({navigation, state}) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab icon={HomeIcon} />
    <BottomNavigationTab icon={SearchIcon} />
    <BottomNavigationTab icon={CameraIcon} />
    <BottomNavigationTab icon={LoveIcon} />
    <BottomNavigationTab icon={ProfileIcon} />
  </BottomNavigation>
);

const App = ({userData, post, users, chatlist}) => {
  useEffect(() => {
    userData();
    post();
    users();
    chatlist();
    Socket.on('refreshPage', () => {
      userData();
      post();
      users();
    })
  }, [userData]);

  return (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
      <Screen name="Home" component={Home} />
      <Screen name="Search" component={Search} />
      <Screen name="Camera" component={Camera} />
      <Screen name="Love" component={Love} />
      <Screen name="Profile" component={SideDrawer} />
    </Navigator>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    userData: () => dispatch(profile()),
    post: () => dispatch(mypost()),
    users: () => dispatch(allUsers()),
    chatlist: () => dispatch(chatList()),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(App);
