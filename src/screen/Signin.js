/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import Logo1 from '../assets/img/logo_dark.png';
import Logo2 from '../assets/img/logo_light.png';
import {Layout, Text, Input, Icon, Button} from '@ui-kitten/components';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {View, Image} from 'react-native';
import {connect} from 'react-redux';
import {authlogin} from '../services/auth';

const Signin = ({navigation, login, mode}) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

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
    let data = { username, password };
    login(data);
  };

  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'space-around',
        paddingHorizontal: 20,
      }}>
      <View
        style={{justifyContent: 'center', marginTop: '5%', maxHeight: '15%'}}>
        <Image
          source={mode ? Logo1 : Logo2}
          style={{
            width: '70%',
            alignSelf: 'center',
            resizeMode: 'contain',
          }}
        />
      </View>
      <View style={{flex: 1, justifyContent: 'space-evenly', maxHeight: 270}}>
        <Input
          value={username}
          onChangeText={value => setUsername(value)}
          accessoryLeft={Username}
          placeholder="Username"
        />
        <Input
          value={password}
          accessoryLeft={Password}
          accessoryRight={renderIcon}
          placeholder="Password"
          secureTextEntry={secureTextEntry}
          onChangeText={nextValue => setPassword(nextValue)}
        />
        <Button
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
            Log in
          </Text>
        </Button>
        <TouchableWithoutFeedback>
          <Text style={{fontWeight: '500', color: '#B2B2B2', fontSize: 12}}>
            Forgot login details?
          </Text>
        </TouchableWithoutFeedback>
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
        </View>
      </View>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          maxHeight: '100%',
        }}>
        <Button appearance="ghost">
          <Text style={{fontWeight: '700', color: '#B2B2B2', fontSize: 12}}>
            Don’t have account?
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
          onPress={() => navigation.navigate('signup')}
          status="basic">
          <Text style={{fontWeight: '700', color: '#B2B2B2'}}>Sign up</Text>
        </Button>
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
    login: payload => dispatch(authlogin(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signin);
