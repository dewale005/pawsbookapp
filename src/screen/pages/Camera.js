/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {SafeAreaView, View, Dimensions, ScrollView} from 'react-native';
import {
  Layout,
  TopNavigation,
  Button,
  Icon,
  Avatar,
  Input,
  ListItem,
  Text,
} from '@ui-kitten/components';
import TakePicture from '../components/TakePicture';
import {connect} from 'react-redux';
import IMG from '../../assets/img/logo2.jpg';
import Carousel from 'react-native-snap-carousel';
import {post, mypost} from '../../services/post';

const width = Dimensions.get('screen').width;

const Camera = ({navigation, user, postImage, image}) => {
  const photo = new FormData();
  const [pic, setpics] = useState([]);
  const [description, setDescript] = useState('');
  const BackIcon = props => <Icon {...props} name="arrow-back" />;
  const AvatarImage = props => (
    <Avatar source={IMG} defaultSource={IMG} resizeMode="cover" />
  );

  const BackButton = props => (
    <Button
      {...props}
      onPress={() => setpics({})}
      appearance="ghost"
      accessoryLeft={BackIcon}
    />
  );
  const ShareButton = props => (
    <Button {...props} onPress={() => Share()} appearance="ghost">
      Share
    </Button>
  );

  const Share = () => {
    // photo.append('Image': )
    pic.forEach((item, i) => {
      photo.append('image', {
        uri: item.path,
        type: item.mime,
        name: item.filename,
      })
    })
    photo.append("description", description)
    postImage(photo);
    setpics([]);
    setDescript('');
  };

  if (pic.length === 0) {
    return <TakePicture photodata={setpics} />;
  } else {
    return (
      <>
        <Layout style={{flex: 1}}>
          <SafeAreaView>
            <TopNavigation
              accessoryLeft={BackButton}
              accessoryRight={ShareButton}
              title="New Post"
            />
            <View>
              <ListItem
                accessoryLeft={AvatarImage}
                title={user.name}
                description={user.username}
              />
              <Input
                value={description}
                onChangeText={value => setDescript(value)}
                placeholder="Say something about this photo"
              />
              <Avatar
                shape="square"
                source={{uri: pic.path}}
                style={{width: width, height: width}}
              />
            </View>
          </SafeAreaView>
        </Layout>
      </>
    );
  }
};

const mapStateToProps = state => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postImage: payload => dispatch(post(payload)),
    image: () => dispatch(mypost()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Camera);
