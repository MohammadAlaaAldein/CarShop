import React, {Component} from 'react';
import {Text, View, Button, Image} from 'react-native';

export default class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Home');
    }, 1);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <Image
          source={require('../assets/icons/splash.jpeg')}
          style={{width: 250, height: 120}}
        />
      </View>
    );
  }
}
