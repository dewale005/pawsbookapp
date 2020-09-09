import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {
  Layout,
  Text,
  Input,
  Icon,
  Divider,
  List,
  ListItem,
  Button,
} from '@ui-kitten/components';
import {connect} from 'react-redux';
import { followUser } from '../../services/profile';

const Search = ({user, users, follow}) => {
  const SearchIcon = props => <Icon {...props} name="search" />;
  const BarcodeIcon = props => <Icon {...props} name="options-2" />;
  const renderItemAccessory = props => <Button size="tiny" onPress={() => follow(props)}>{!checkFollow(user.following, props) ?'FOLLOW':'FOLLOWING'}</Button>;

    const renderItemIcon = props => <Icon {...props} name="person" />;
    
    const checkFollow = (arr, id) => {
        const result = arr.filter(res => res.user._id == id)
        console.log(result);
        if (result.length > 0) {
          return true
        } else {
          return false
        }
      }

    const renderItem = ({ item, index }) => {
        if (item._id !== user._id) {
            return (<ListItem
                title={`${item.username}`}
                description={`${item.name}`}
                accessoryLeft={renderItemIcon}
                accessoryRight={() => renderItemAccessory(item._id)}
            />)
        }
    };
  return (
    <Layout style={{flex: 1}}>
      <SafeAreaView>
        <Input
          accessoryLeft={SearchIcon}
          accessoryRight={BarcodeIcon}
          placeholder="Search"
        />
        <Divider />
        <List data={users} renderItem={renderItem} />
      </SafeAreaView>
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
      users: state.users.users,
      user: state.user.user
  };
};

const mapDisPatchToProps = dispatch => {
    return {
        follow: payload => dispatch(followUser(payload))
    }
}

export default connect(mapStateToProps, mapDisPatchToProps)(Search);
