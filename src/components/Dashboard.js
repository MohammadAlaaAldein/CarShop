import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Icon = props => {
  return (
    <TouchableOpacity onPress={() => checkLoginStatus(props)}>
      <Image
        source={require('../assets/icons/menu2.png')}
        style={{width: 30, height: 30}}
      />
    </TouchableOpacity>
  );
};
export default Icon;

const checkLoginStatus = async props => {
  try {
    let loginStatus = await AsyncStorage.getItem('loginStatus');
    let user = await AsyncStorage.getItem('user');
    user = user ? JSON.parse(user) : null;

    if (loginStatus === 'true') {
      if (user.adminState === '1') {
        props.navigation.navigate('Admin');
      } else {
        props.navigation.navigate('Profile');
      }
    } else {
      props.navigation.navigate('Login');
    }
  } catch (e) {}
};
