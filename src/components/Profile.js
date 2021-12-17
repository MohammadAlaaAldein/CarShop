import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {get} from '../firebase/index';

const screenWidth = Dimensions.get('window').width;

export default class Profile extends Component {
  state = {
    user: {},
  };

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      user = JSON.parse(user);
      this.setState({user});
    } catch (err) {
      console.log(err);
    }
  };

  save = async () => {
    let {user} = this.state;
    let {id, fullName} = user;

    if (fullName.length >= 3) {
      get(`UserData/UserInformation/${id}`).update({fullName});

      try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
      } catch (e) {}

      this.setState({save: true}, () => {
        setTimeout(() => {
          this.setState({save: false});
        }, 5000);
      });
    } else {
      Alert.alert('Error', 'Please fill name correctly');
    }
  };

  logout = async () => {
    try {
      await AsyncStorage.setItem('loginStatus', 'false');
      await AsyncStorage.setItem('user', '');
    } catch (e) {}
    this.props.navigation.navigate('Home');
  };

  render() {
    let {user} = this.state;

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextInput
          style={style.text}
          placeholder="Your Name"
          defaultValue={user.fullName}
          onChangeText={fullName => {
            this.setState({user: {...user, fullName}});
          }}
        />
        <TextInput
          style={style.text}
          placeholder="Your Email"
          defaultValue={user.email}
          editable={false}
        />

        <TouchableOpacity
          style={{
            borderRadius: 20,
            width: screenWidth / 1.2,
            height: 50,
            backgroundColor: '#0099ff',
            marginTop: 20,
          }}
          onPress={this.save}>
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              textAlignVertical: 'center',
              color: 'white',
              fontWeight: '900',
              fontSize: 18,
            }}>
            {this.state.save ? 'Saved' : 'Save'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderRadius: 20,
            width: screenWidth / 1.2,
            height: 50,
            backgroundColor: '#0099ff',
            marginTop: 20,
          }}
          onPress={this.logout}>
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              textAlignVertical: 'center',
              color: 'white',
              fontWeight: '900',
              fontSize: 18,
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

let style = StyleSheet.create({
  text: {
    borderRadius: 20,
    borderWidth: 0.8,
    borderColor: 'grey',
    textAlign: 'center',
    fontWeight: '900',
    marginBottom: 10,
    width: screenWidth / 1.2,
  },
});
