/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Layout,
  Text,
  TopNavigation,
  Icon,
  TopNavigationAction,
  Avatar,
  Button,
  Input,
  ListItem,
  Select,
  SelectItem,
} from '@ui-kitten/components';
import Logo from '../../assets/img/logo2.jpg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import ImagePickerCrop from 'react-native-image-crop-picker';
import {editprofile} from '../../services/profile';

const data = ['Prefer not to say', 'Male', 'Female'];

const Editprofile = ({navigation, user, edit}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [avatar, setAvatar] = useState('');
  const [fullname, setFullname] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [website, setWebsite] = useState(user.webUrl);
  const [bio, setBio] = useState(user.bioData);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const displayValue = data[selectedIndex.row] || user.gender;

  const editprofile = () => {
    let profile = {
      username,
      email,
      name: fullname,
      webUrl: website,
      phone,
      bioData: bio,
      gender: displayValue,
    };
    console.log(profile);
    edit(profile);
  };

  const selectImage = () => {
    ImagePickerCrop.openPicker({
      cropping: true,
      includeBase64: true,
      width: 400,
      height: 400,
      forceJpg: true,
      compressImageQuality: 0.5,
      cropperStatusBarColor: '#000',
      maxFiles: 20,
      avoidEmptySpaceAroundImage: true,
    }).then(image => {
      setAvatar(image.path);
    });
  }

  const renderOption = title => <SelectItem title={title} />;

  const ArrowBack = props => <Icon {...props} name="arrow-back" />;
  const DoneIcon = props => <Icon {...props} name="checkmark" />;
  const DoneButton = props => <Button style={{top: -7, paddingHorizontal: 0}} appearance="ghost" onPress={() => editprofile()}>Save</Button>
  const Done = props => (
    <TopNavigationAction {...props} icon={DoneButton} />
  );

  return (
    <Layout style={{flex: 1}}>
      <SafeAreaView>
        <TopNavigation
          accessoryRight={Done}
        />
        <KeyboardAwareScrollView extraScrollHeight={29}>
          <Layout style={{marginBottom: '30%'}}>
            <View style={{alignItems: 'center'}}>
              <Avatar style={{ width: 70, height: 70 }} source={avatar} defaultSource={Logo} />
              <Button
                style={{width: '60%', paddingHorizontal: 2}}
                appearance="ghost"
                size="tiny" onPress={selectImage}>
                Change profile photo
              </Button>
            </View>
            <View
              style={{
                flex: 1,
                height: 550,
                paddingHorizontal: '5%',
                justifyContent: 'space-around',
              }}>
              <Input
                value={fullname}
                onChangeText={data => setFullname(data)}
                placeholder="Name"
                label="Name"
              />
              <Input
                value={username}
                onChangeText={value => setUsername(value)}
                placeholder="Username"
                label="Username"
              />
              <Input
                value={website}
                onChangeText={value => setWebsite(value)}
                placeholder="Website"
                label="Website"
              />
              <Input
                multiline={true}
                value={bio}
                onChangeText={value => setBio(value)}
                textStyle={{minHeight: 64}}
                placeholder="Bio"
                label="Bio"
              />
              <ListItem title="Profile Information" />
              <Input
                value={email}
                onChangeText={value => setEmail(value)}
                placeholder="Email address"
                label="Email address"
              />
              <Input
                value={phone}
                onChangeText={value => setPhone(value)}
                placeholder="Phone number"
                label="Phone number"
              />
              <Select
                selectedIndex={selectedIndex}
                value={displayValue}
                label="Gender"
                placeholder="Gender"
                onSelect={index => setSelectedIndex(index)}>
                {data.map(renderOption)}
              </Select>
            </View>
          </Layout>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    edit: payload => dispatch(editprofile(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Editprofile);
