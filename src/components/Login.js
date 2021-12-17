import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Button,
  TextInput,
  Alert,
  BackHandler,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';

import {get, loginUser} from '../firebase/index';

import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const LoginScreen = ({navigation}) => {
  const login = async () => {
    if (email && password) {
      loginUser({email, password}).then(res => {
        if (res) {
          if (res.uid) {
            getUserInfo(res.uid);
          } else {
            Alert.alert(
              'Alert',
              'Email or password in incorrect, please try again',
            );
          }
        } else {
          Alert.alert(
            'Alert',
            'Email or password in incorrect, please try again',
          );
        }
      });
    } else {
      Alert.alert('Alert', 'Please fill email and pasword correctly');
    }
  };

  const getUserInfo = userId => {
    get(`UserData/UserInformation/${userId}`)
      .once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          let user = snapshot.val();
          setUserInfo(user);
        } else {
          Alert.alert(
            'Error',
            'Email or Password is incorrect, please try again!',
          );
        }
      })
      .catch(err => {
        Alert.alert('Alert', 'Something went, please try again');
      });
  };

  const setUserInfo = async user => {
    try {
      await AsyncStorage.setItem('loginStatus', 'true');
      await AsyncStorage.setItem('user', JSON.stringify(user));

      navigation.navigate('Home');
    } catch (e) {}
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
      <ImageBackground
        source={require('../assets/icons/splash.jpeg')}
        resizeMode="cover"
        style={{
          flex: 1,
          width: screenWidth,
          height: screenHeight / 3,
        }}></ImageBackground>

      <View style={{flex: 1, width: screenWidth / 1.2, alignItems: 'center'}}>
        <TextInput
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor="grey"
          onChangeText={value => setEmail(value)}
          style={{
            borderRadius: 20,
            borderWidth: 0.8,
            borderColor: 'grey',
            textAlign: 'center',
            fontWeight: '900',
            marginBottom: 10,
            width: screenWidth / 1.3,
          }}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="grey"
          onChangeText={value => setPassword(value)}
          style={{
            borderRadius: 20,
            borderWidth: 0.8,
            borderColor: 'grey',
            textAlign: 'center',
            fontWeight: '900',
            marginBottom: 10,
            width: screenWidth / 1.3,
          }}
        />

        <TouchableOpacity
          onPress={() => login()}
          style={{
            paddingTop: 12,
            paddingBottom: 12,
            backgroundColor: '#0099ff',
            borderRadius: 15,
            borderWidth: 1,
            borderColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            width: screenWidth / 1.3,
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Cochin',
              textAlign: 'center',
              fontWeight: '900',
              fontSize: 18,
            }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
