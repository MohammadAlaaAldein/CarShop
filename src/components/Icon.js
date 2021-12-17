import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';

const Icon = props => {
  return (
    <TouchableOpacity
      onPress={() =>
        props.source === 'Home'
          ? props.navigation.navigate('Home', {user: props.user})
          : props.navigation.navigate('Favourite', {user: props.user})
      }
      style={{marginRight: 10}}>
      <Image
        source={
          props.source === 'Home'
            ? require('../assets/icons/Home.png')
            : require('../assets/icons/redHeart.png')
        }
        style={{width: 30, height: 30}}
      />
    </TouchableOpacity>
  );
};
export default Icon;
