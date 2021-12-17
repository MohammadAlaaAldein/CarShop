import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';
import {get} from '../firebase/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

export default class Admin extends Component {
  state = {
    usersNumber: 0,
    carsNumber: 0,
  };

  componentDidMount() {
    this.getUsers();
    this.getCars();
  }

  getUsers = () => {
    get('UserData/UserInformation')
      .once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          let users = Object.keys(snapshot.val());

          let usersNumber = users.length;
          this.setState({usersNumber});
        }
      });
  };

  getCars = () => {
    get('CarData/AllCars')
      .once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          let cars = Object.keys(snapshot.val());

          let carsNumber = cars.length;
          this.setState({carsNumber});
        }
      });
  };

  logout = async () => {
    try {
      await AsyncStorage.setItem('loginStatus', 'false');
      await AsyncStorage.setItem('user', '');
    } catch (e) {}
    this.props.navigation.navigate('Home');
  };

  render() {
    let {usersNumber, carsNumber} = this.state;

    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('AddCars')}
          style={{
            backgroundColor: '#0099ff',
            width: 200,
            height: 100,
            borderRadius: 20,
            margin: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 25, fontWeight: '900', color: 'white'}}>
            Add Cars
          </Text>
        </TouchableOpacity>

        <View
          style={{
            backgroundColor: '#0099ff',
            width: 200,
            height: 100,
            borderRadius: 20,
            margin: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 25, fontWeight: '900', color: 'white'}}>
            Users : {usersNumber}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: '#0099ff',
            width: 200,
            height: 100,
            borderRadius: 20,
            margin: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 25, fontWeight: '900', color: 'white'}}>
            Cars : {carsNumber}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            borderRadius: 20,
            width: screenWidth / 1.2,
            height: 50,
            backgroundColor: '#0099ff',
            // marginTop: 100,
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
