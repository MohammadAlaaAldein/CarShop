import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import {get} from '../firebase/index';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Favourite extends Component {
  state = {
    cars: [],
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
      this.getCars(Object.keys(user.favourite));
    } catch (error) {}
  };

  getCars = carsIDs => {
    let cars = [];
    carsIDs.map(carId => {
      get(`CarData/AllCars/${carId}`)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            let car = snapshot.val();
            cars.push(car);
            this.setState({cars});
          }
        })
        .catch(err => console.log(err));
    });
    this.setState({cars});
  };

  viewCar = item => {
    let {user} = this.state;
    let carId = item.item.carId;
    let favourite = user.favourite ? user.favourite : {};

    return (
      <TouchableOpacity style={{margin: 20}}>
        <ImageBackground
          style={{height: 150, width: 250, borderRadius: 20}}
          source={{uri: item.item.carCoverImage}}>
          {/* <TouchableOpacity
            onPress={() =>
              favourite[carId]
                ? this.removeFavourite(carId)
                : this.addFavourite(carId)
            }>
            <Image
              style={{height: 30, width: 30, margin: 5}}
              source={require('../assets/icons/redHeart.png')}
            />
          </TouchableOpacity> */}
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  addFavourite = async carId => {
    try {
      let user = await AsyncStorage.getItem('user');

      user = JSON.parse(user);
      let userId = user.id;

      get(`UserData/UserInformation/${userId}/favourite/${carId}`).set(true);

      // user = {...user, favourite: {[carId]: true}};
      user.favourite = {...user.favourite, [carId]: true};

      await AsyncStorage.setItem('user', JSON.stringify(user));
      this.setState({user});
    } catch (e) {}
  };

  removeFavourite = async carId => {
    try {
      let user = await AsyncStorage.getItem('user');

      user = JSON.parse(user);
      let userId = user.id;

      get(`UserData/UserInformation/${userId}/favourite/${carId}`).set(null);

      // user = {...user, favourite: {[carId]: true}};
      // user.favourite = {...user.favourite, [carId]: true};
      delete user.favourite[carId];

      await AsyncStorage.setItem('user', JSON.stringify(user));
      this.setState({user}, () => {
        this.getUserInfo();
      });
    } catch (e) {}
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 10,
        }}>
        <View>
          <Text
            style={{
              fontSize: 30,
              textAlign: 'left',
              marginLeft: 10,
              color: 'black',
              fontWeight: 'bold',
            }}>
            Favourite Cars
          </Text>
        </View>
        {this.state.cars.length > 0 ? (
          <FlatList
            data={this.state.cars}
            renderItem={this.viewCar}
            keyExtractor={item => item.orderId}
            // horizontal={true}
          />
        ) : null}
      </View>
    );
  }
}
