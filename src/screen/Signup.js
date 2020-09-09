/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import Logo from '../assets/img/logo_dark.png';
import {
  Layout,
  Text,
  Input,
  Icon,
  Button,
  TopNavigation,
  Avatar,
  Datepicker,
  ListItem,
  Select,
  SelectItem,
} from '@ui-kitten/components';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {View, Image, ScrollView, ImageBackground} from 'react-native';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import Logo1 from '../assets/img/logo_dark.png';
import Logo2 from '../assets/img/logo_light.png';
import Dog from '../assets/img/dog_avatar.png';
import {connect} from 'react-redux';
import {authRegister} from '../services/auth';
import ImagePicker from 'react-native-image-picker';

const Signup = ({navigation, register, mode}) => {
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [date, setDate] = useState(new Date());

  const Email = props => <Icon {...props} name="email" />;
  const Username = props => <Icon {...props} name="person" />;
  const Password = props => <Icon {...props} name="lock" />;
  const Facebook = props => <Icon {...props} name="facebook" />;
  const Google = props => <Icon {...props} name="google" />;

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = props => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const submit = () => {
    let data = {
      username,
      email,
      password,
    };
    register(data);
  };

  const uploadImage = () => {
    let options = {
      title: 'Select Profile Picture',
      allowsEditing: true,
      noData: true,
      storage: {
        skipBackup: true,
        cameraRoll: true,
      },
    };
    ImagePicker.showImagePicker(options, response => {
      setImage(response.uri);
    });
  };

  const register_1 = () => {
    return (
      <Layout style={{height: 150, justifyContent: 'space-between'}}>
        <Input
          value={username}
          onChangeText={value => setUserName(value)}
          accessoryLeft={Username}
          placeholder="Username"
        />
        <Input
          value={email}
          onChangeText={value => setEmail(value)}
          keyboardType="email-address"
          accessoryLeft={Email}
          placeholder="Email"
        />
        <Input
          value={password}
          accessoryLeft={Password}
          accessoryRight={renderIcon}
          placeholder="Password"
          secureTextEntry={secureTextEntry}
          onChangeText={nextValue => setPassword(nextValue)}
        />
      </Layout>
    );
  };
  const register_2 = () => {
    return (
      <Layout>
        <Input
          // value={username}
          // onChangeText={value => setUserName(value)}
          // accessoryLeft={Username}
          placeholder="Dog Name"
        />
        <Input
          // value={email}
          // onChangeText={value => setEmail(value)}
          // keyboardType="email-address"
          // accessoryLeft={Email}
          placeholder="Breed"
        />
        <Datepicker date={date} onSelect={setDate} />
        <Select>
          <SelectItem title="Male" />
          <SelectItem title="Female" />
          <SelectItem title="None" />
        </Select>
        <Input
          // value={password}
          // accessoryLeft={Password}
          // accessoryRight={renderIcon}
          placeholder="Address"
          // secureTextEntry={secureTextEntry}
          // onChangeText={nextValue => setPassword(nextValue)}
        />
        <ListItem title="Find On MapView" />
      </Layout>
    );
  };
  const register_3 = () => {
    return (
      <Layout style={{alignItems: 'center'}}>
        <TouchableOpacity onPress={uploadImage}>
          <ImageBackground
            imageStyle={{borderRadius: 200}}
            style={{ width: 200, height: 200 }}
            defaultSource={Dog}
            source={{uri: image}}
          />
        </TouchableOpacity>
      </Layout>
    );
  };

  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'space-around',
        paddingHorizontal: 20,
      }}>
      <TopNavigation />
      <View style={{height: '80%', justifyContent: 'space-around'}}>
        <View style={{height: '30%'}}>
          <Image
            source={mode ? Logo1 : Logo2}
            style={{
              width: '70%',
              height: '30%',
              alignSelf: 'center',
              resizeMode: 'contain',
              borderRadius: 24,
            }}
          />
          <Text style={{textAlign: 'center'}} category="h5">
            Registration
          </Text>
        </View>
        <View style={{height: '100%'}}>
          <ProgressSteps>
            <ProgressStep label="User Account">
              <View>{register_1()}</View>
            </ProgressStep>
            <ProgressStep label="Create Profile 1">
              <View>{register_2()}</View>
            </ProgressStep>
            <ProgressStep label="Add Profile Image">
              <View>
                <View>{register_3()}</View>
              </View>
            </ProgressStep>
          </ProgressSteps>
        </View>
        {/* <Button
          style={{
            width: '100%',
            borderColor: '#D9AC4C',
            backgroundColor: '#D9AC4C',
            shadowOpacity: 0.2,
            shadowRadius: 6,
            shadowOffset: {width: 0, height: 0},
          }}
          onPress={() => submit()}>
          <Text style={{fontWeight: '700', color: '#000', fontSize: 12}}>
            Sign up
          </Text>
        </Button>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button
            accessoryLeft={Google}
            style={{
              width: '48%',
              borderColor: '#EA4335',
              backgroundColor: '#EA4335',
              shadowOpacity: 0.2,
              shadowRadius: 6,
              shadowOffset: {width: 0, height: 0},
            }}
          />
          <Button
            accessoryLeft={Facebook}
            style={{
              width: '48%',
              borderColor: '#3B5998',
              backgroundColor: '#3B5998',
              shadowOpacity: 0.2,
              shadowRadius: 6,
              shadowOffset: {width: 0, height: 0},
            }}
          />
        </View> */}
        {/* <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          maxHeight: '100%',
        }}>
        <Button appearance="ghost">
          <Text style={{fontWeight: '700', color: '#B2B2B2', fontSize: 12}}>
            Already have an account?
          </Text>
        </Button>
        <Button
          style={{
            width: '100%',
            backgroundColor: '#fff',
            shadowOpacity: 0.2,
            shadowRadius: 6,
            shadowOffset: {width: 0, height: 0},
          }}
          onPress={() => navigation.navigate('Home')}
          status="basic">
          <Text style={{fontWeight: '700', color: '#B2B2B2'}}>Sign in</Text>
        </Button>
      </View> */}
      </View>
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    mode: state.mode.isDarkMode,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: payload => dispatch(authRegister(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);
