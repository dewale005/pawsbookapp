/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Dimensions, Image} from 'react-native';
import {
  Layout,
  Button,
  TopNavigation,
  Text,
  Avatar,
  Icon,
  TopNavigationAction,
  Toggle,
  ListItem,
  Divider,
  TabView,
  Tab,
  Card,
} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {authlogout} from '../../services/auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import { dayApp, nightApp } from '../../services/ui';
import Map from '../components/Maps';
import IMG from '../../assets/img/logo2.jpg';

const width = Dimensions.get('screen').width;

const Profile = ({navigation, logout, mode, day, night, user}) => {
  const [isDay, setIsDay] = useState(mode);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const BackIcon = props => <Icon {...props} name="arrow-back" />;
  const MenuIcon = props => <Icon {...props} name="menu" />;
  const GridIcon = props => <Icon {...props} name="grid" />;
  const pinIcon = props => <Icon {...props} name="pin" />;
  const chatIcon = props => <Icon {...props} name="message-circle" />;

  const Back = () => <TopNavigationAction icon={BackIcon} />;
  const Menu = () => (
    <TopNavigationAction
      onPress={() => navigation.openDrawer()}
      icon={MenuIcon}
    />
  );

  const logoutUser = () => {
    logout();
  };

  const changeapp = ischecked => {
    setIsDay(ischecked);
    if (isDay) {
      day();
    } else {
      night();
    }
  };

  const editprofile = () => {
    navigation.navigate('editprofile');
  };

  const renderToggle = props => <Toggle checked={isDay} onChange={changeapp} />;
  const renderDetails = props => (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={{alignItems: 'center', paddingHorizontal: '2%'}}>
        <Text category="s1">5M</Text>
        <Text category="c2">Posts</Text>
      </View>
      <View style={{alignItems: 'center', paddingHorizontal: '2%'}}>
        <Text category="s1">{props.following.length}</Text>
        <Text category="c2">Following</Text>
      </View>
      <View style={{alignItems: 'center', paddingHorizontal: '2%'}}>
        <Text category="s1">{props.followers.length}</Text>
        <Text category="c2">Followers</Text>
      </View>
    </View>
  );
  const AvatarImage = props => (
    <View style={{alignItems: 'center'}}>
      <Avatar
        source={IMG}
        defaultSource={IMG}
        size="giant"
        resizeMode="cover"
      />
      <Text category="c2">{user.name}</Text>
    </View>
  );

  return (
    <Layout style={{flex: 1}}>
      <SafeAreaView>
        <TopNavigation
          accessoryRight={Menu}
          accessoryLeft={renderToggle}
          title={evaProps => <Text {...evaProps}>{user.username}</Text>}
        />
        <ListItem accessoryLeft={AvatarImage} accessoryRight={() => renderDetails(user)} />
        <Button
          onPress={() => logoutUser()}
          appearance="outline"
          style={{width: '90%', alignSelf: 'center'}}>
          <Text category="s1">Edit profile</Text>
        </Button>
        <Divider style={{marginVertical: 12}} />
        <TabView
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}>
          <Tab icon={GridIcon}>
            <Layout>
              <ScrollView>
                <View style={style.container}>
                  <View>
                    <Image source={IMG} style={style.card} />
                  </View>
                  <View>
                    <Image source={IMG} style={style.card} />
                  </View>
                  <View>
                    <Image source={IMG} style={style.card} />
                  </View>
                  <View>
                    <Image source={IMG} style={style.card} />
                  </View>
                  <View>
                    <Image source={IMG} style={style.card} />
                  </View>
                  <View>
                    <Image source={IMG} style={style.card} />
                  </View>
                  <View>
                    <Image source={IMG} style={style.card} />
                  </View>
                  <View>
                    <Image source={IMG} style={style.card} />
                  </View>
                  <View>
                    <Image source={IMG} style={style.card} />
                  </View>
                  <View>
                    <Image source={IMG} style={style.card} />
                  </View>
                  <View>
                    <Image source={IMG} style={style.card} />
                  </View>
                  <View>
                    <Image source={IMG} style={style.card} />
                  </View>
                  <View>
                    <Image source={IMG} style={style.card} />
                  </View>
                  <View>
                    <Image source={IMG} style={style.card} />
                  </View>
                  <View>
                    <Image source={IMG} style={style.card} />
                  </View>
                  <View>
                    <Image source={IMG} style={style.card} />
                  </View>
                  <View>
                    <Image source={IMG} style={style.card} />
                  </View>
                  <View>
                    <Image source={IMG} style={style.card} />
                  </View>
                  <View>
                    <Image source={IMG} style={style.card} />
                  </View>
                  <View>
                    <Image source={IMG} style={style.card} />
                  </View>
                  <View>
                    <Image source={IMG} style={style.card} />
                  </View>
                  <View>
                    <Image source={IMG} style={style.card} />
                  </View>
                </View>
              </ScrollView>
            </Layout>
          </Tab>
          <Tab icon={pinIcon}>
            <Layout>
              <Map />
            </Layout>
          </Tab>
        </TabView>
      </SafeAreaView>
    </Layout>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    width: width / 3.06,
    height: width / 3.06,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
  },
});

const mapStateToProps = state => {
  return {
    mode: state.mode.isDarkMode,
    user: state.user.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(authlogout()),
    day: () => dispatch(dayApp()),
    night: () => dispatch(nightApp()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
