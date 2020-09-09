/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Icon,
  Text,
  ListItem,
  Avatar,
  Divider,
  Button,
  List,
} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native-safe-area-context';
import SwipeablePanel from 'react-native-sheets-bottom';
import {connect} from 'react-redux';
import Swiper from 'react-native-swiper';
import IMG from '../../assets/img/logo2.jpg';
import Logo1 from '../../assets/img/logo_dark.png';
import Logo2 from '../../assets/img/logo_light.png';
import Animated from 'react-native-reanimated';
import {ApiConfig} from '../../util/config';
import {TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
import {likepost} from '../../services/post';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const Home = ({navigation, posts, mode, user, like}) => {
  const [swipepanel, setSwipepanel] = useState(false);
  const [animatePress, setAnimatePress] = useState(new Animated.Value(1));

  const likeIcon = props => <Icon {...props} name="heart" />;
  const commentIcon = props => <Icon {...props} name="message-square" />;
  const chatIcon = props => <Icon {...props} name="paper-plane" />;
  const likeIconOutline = props => <Icon {...props} name="heart-outline" />;
  const logo = props => (
    <View style={{justifyContent: 'center', maxHeight: '15%'}}>
      <Avatar
        size="giant"
        source={mode ? Logo1 : Logo2}
        style={{
          width: 140,
          height: 38,
          alignSelf: 'center',
          resizeMode: 'contain',
        }}
      />
    </View>
  );

  const likePost = _id => {
    like(_id);
  };

  const postAction = ({props, like}) => (
    <View style={{flexDirection: 'column'}}>
      <View
        style={{
          width: 50,
          height: 50,
          backgroundColor: 'white',
          borderRadius: 25,
          justifyContent: 'center',
          marginBottom: 20,
        }}>
        <Button
          status="danger"
          size="giant"
          accessoryLeft={like ? likeIcon : likeIconOutline}
          appearance="ghost"
          onPress={() => likePost(props.post)}
        />
      </View>
      <View
        style={{
          width: 50,
          height: 50,
          backgroundColor: 'white',
          borderRadius: 25,
          justifyContent: 'center',
          marginBottom: 20,
        }}>
        <Button
          status="info"
          accessoryLeft={chatIcon}
          appearance="ghost"
          onPress={() => setSwipepanel(true)}
        />
      </View>
      <View
        style={{
          width: 50,
          height: 50,
          backgroundColor: 'white',
          borderRadius: 25,
          justifyContent: 'center',
          marginBottom: 20,
        }}>
        <Button
          accessoryLeft={commentIcon}
          appearance="ghost"
          onPress={() => navigation.navigate('comment', props)}
        />
      </View>
    </View>
  );

  const animateIn = () => {
    Animated.timing(animatePress, {
      toValue: 0.5,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const Message = props => (
    <>
      <Icon {...props} name="paper-plane" />
      <View
        style={{
          backgroundColor: 'red',
          left: 17,
          top: -5,
          width: 15,
          height: 15,
          justifyContent: 'center',
          borderRadius: 10,
          alignItems: 'center',
          position: 'absolute',
        }}>
        <Text style={{fontSize: 10}}>1</Text>
      </View>
    </>
  );
  const DirMess = props => (
    <TopNavigationAction
      icon={Message}
      onPress={() => navigation.navigate('chatlist')}
    />
  );
  const Brand = props => <TopNavigationAction icon={logo} />;
  const AvatarImage = props => (
    <Avatar size="tiny" source={IMG} defaultSource={IMG} resizeMode="cover" />
  );

  const checkLike = (arr, id) => {
    const result = arr.filter(res => res.user.user._id == id);
    if (result.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  function arrayUnique(array) {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
      for (var j = i + 1; j < a.length; ++j) {
        if (a[i].user._id === a[j].user._id) {
          a.splice(j--, 1);
        }
      }
    }

    return a;
  }

  // const chalist = arrayUnique(user.following.concat(user.followers));

  const renderItemAccessory = props => (
    <Button size="tiny" onPress={() => alert(props)}>
      Send
    </Button>
  );

  const renderItemIcon = props => <Icon {...props} name="person" />;

  const renderItem = ({item, index}) => {
    return (
      <ListItem
        key={index}
        title={`${item.user.username}`}
        description={`${item.user.name}`}
        accessoryLeft={renderItemIcon}
        accessoryRight={() => renderItemAccessory(item.user._id)}
      />
    );
  };

  useEffect(() => {
    animateIn();
  }, [animateIn]);
  return (
    <Layout
      style={{flex: 1}}
      onPress={() => {
        setSwipepanel(false);
      }}>
      <SafeAreaView>
        <TopNavigation accessoryRight={DirMess} accessoryLeft={Brand} />
        <Divider />
        <ScrollView>
          {posts.length === 0 ? (
            <View
              style={{
                marginTop: height / 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text />
            </View>
          ) : (
            posts.map((data, i) => (
              <View key={i}>
                <ListItem
                  accessoryLeft={AvatarImage}
                  title={data.authur.username}
                  description={data.authur.email}
                  onPress={() => null}
                />
                <View style={{height: 280}}>
                  <TopNavigation
                    style={{
                      backgroundColor: 'transaparent',
                      position: 'absolute',
                      width: 50,
                      right: 0,
                      bottom: 0,
                      zIndex: 1,
                    }}
                    accessoryRight={() =>
                      postAction({
                        props: {data: data.comment, post: data._id},
                        like: checkLike(data.likes, user._id),
                      })
                    }
                  />
                  <Swiper>
                    {data.posts.map((image, j) => (
                      <ImageBackground
                        key={j}
                        source={{
                          uri: `${ApiConfig.local}${image.url}`,
                        }}
                        defaultSource={IMG}
                        style={{
                          width: width,
                          height: 280,
                          resizeMode: 'contain',
                        }}
                      />
                    ))}
                  </Swiper>
                </View>
                <Text
                  category="c2"
                  style={{paddingVertical: 1, paddingLeft: 12, marginTop: 12}}>
                  {data.likes.length} Likes
                </Text>
                <Text
                  category="c1"
                  style={{paddingVertical: 1, paddingLeft: 12}}>
                  <Text category="c2">{data.authur.username}</Text>{' '}
                  {data.description}
                </Text>
                {data.comment.length > 0 ? (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('comment', {
                        data: data.comment,
                        post: data._id,
                      })
                    }>
                    <Text
                      category="c2"
                      style={{
                        paddingLeft: 12,
                        paddingVertical: 4,
                        color: '#B2B2B2',
                      }}>
                      View all {data.comment.length} comments
                    </Text>
                  </TouchableOpacity>
                ) : null}
                <Text
                  category="c1"
                  style={{
                    paddingLeft: 12,
                    paddingVertical: 4,
                    color: '#B2B2B2',
                  }}>
                  {moment(data.date_created)
                    .startOf('minute')
                    .fromNow()}
                </Text>
              </View>
            ))
          )}
          <TopNavigation alignment="center" title="Loading...." />
          <ActivityIndicator />
        </ScrollView>
      </SafeAreaView>
      <SwipeablePanel
        fullWidth
        isActive={swipepanel}
        onClose={() => {
          setSwipepanel(false);
        }}
        onPressCloseButton={() => {
          setSwipepanel(false);
        }}>
        {/* <View style={{paddingHorizontal: '2%'}}>
          <List data={chalist} renderItem={renderItem} />
        </View> */}
      </SwipeablePanel>
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    posts: state.post.post,
    user: state.user.user,
    mode: state.mode.isDarkMode,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    like: payload => dispatch(likepost(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
