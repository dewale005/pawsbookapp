import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Layout,
  TopNavigation,
  Input,
  Divider,
  Text,
  ListItem,
  Avatar,
  Button,
} from '@ui-kitten/components';
import IMG from '../../assets/img/logo2.jpg';
import moment from 'moment';
import { commentpost } from '../../services/post';
import { connect } from 'react-redux';


const Comment = ({ route, navigation, comment }) => {
  const [ description, setDecrip ] = useState('')
  const [info, viewInfo] = useState(0);
  const [info2, viewInfo2] = useState(0);
  const {data, post} = route.params;

  const commentPost = () => {
    if (description !== '') {
      const data  = {
        description,
        post,
      }
      comment(data)
      setDecrip('');
    } else {
      null
    }
  }

  const reply = props => (
    <Button appearance="ghost" onPress={() => null}>
      <Text status="primary" category="c1">
        Reply
      </Text>
    </Button>
  );

  const Post = props => (
    <Button status="info" appearance="ghost" onPress={() => commentPost()}>
      Post
    </Button>
  );

  const Profile = props => (
    <Avatar
      style={{width: 30, height: 30}}
      shape="round"
      size="giant"
      source={props}
      defaultSource={IMG}
    />
  );

  const Image = (props, image) => (
    <Avatar
      {...props}
      style={{width: 35, height: 35}}
      shape="round"
      size="giant"
      source={image}
      defaultSource={IMG}
    />
  );

  return (
    <Layout
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <SafeAreaView>
        <TopNavigation />
        <Divider />
        {data.length > 0 ? <View>
          <ScrollView>
            {data.map((item, i) => (
              <ListItem
                accessoryLeft={props => Image(props, item.user.user.avatar)}
                accessoryRight={reply}
                key={i}
                title={
                  <Text category="c1">
                    <Text category="c2">{`${item.user.user.username}`}</Text>{' '}
                    {`${item.user.description}`}
                  </Text>
                }
                description={moment(item.user.created_date)
                  .startOf('minutes')
                  .fromNow()}
              />
            ))}
          </ScrollView>
        </View>: null}
          </SafeAreaView>
          {data.length === 0 ? <View style={{alignItems: 'center'}}>
              <Text>No Comments Available!!!</Text>
          </View> : null}
      <KeyboardAvoidingView behavior="padding">
        <SafeAreaView>
          <Input
            accessoryLeft={Profile}
            accessoryRight={Post}
            onChangeText={value => setDecrip(value)}
            value={description}
            placeholder="Add a comment..."
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Layout>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    comment: payload => dispatch(commentpost(payload))
  }
}

export default connect(null, mapDispatchToProps)(Comment);
