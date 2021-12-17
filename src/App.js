import React, {Component} from 'react';
import Navigation from './Navigation';
import {LogBox} from 'react-native';
LogBox.ignoreLogs([
  'Reanimated 2',
  'AsyncStorage',
  'Deprecation',
  "Can't",
  'new',
  'Each',
]);

export default class App extends Component {
  render() {
    return <Navigation />;
  }
}
