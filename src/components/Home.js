import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  ImagePropTypes,
} from 'react-native';
import {get} from '../firebase/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Home extends Component {
  state = {
    newCars: [],
    exploreCars: [],
    user: {},
  };

  componentDidMount() {
    this.getUserInfo();
    this.getCars();
  }

  getUserInfo = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      user = JSON.parse(user);
      this.setState({user});
    } catch (error) {}
  };

  getCars = () => {
    get('CarData/AllCars')
      .once('value')
      .then(snapshot => {
        let cars = snapshot.val();

        let newCars = [];
        let exploreCars = [];

        cars = Object.values(cars);

        cars.map(car => {
          if (car.carInAppType === 'New') {
            newCars.push(car);
          } else {
            exploreCars.push(car);
          }
        });

        this.setState({newCars, exploreCars});
      })
      .catch(err => {
        console.log(err);
      });
  };

  viewCar = item => {
    let {user} = this.state;
    let carId = item.item.carId;
    let favourite = user && user.favourite ? user.favourite : {};

    return (
      <TouchableOpacity
        style={{margin: 20}}
        onPress={() =>
          this.props.navigation.navigate('CarDetails', {car: item.item})
        }>
        <ImageBackground
          style={{height: 150, width: 250, borderRadius: 20}}
          source={{uri: item.item.carCoverImage}}>
          <TouchableOpacity
            style={{height: 30, width: 30, margin: 5}}
            onPress={() =>
              favourite[carId]
                ? this.removeFavourite(carId)
                : this.addFavourite(carId)
            }>
            <Image
              style={{height: 30, width: 30, margin: 5}}
              source={
                favourite[carId]
                  ? require('../assets/icons/redHeart.png')
                  : require('../assets/icons/whiteHeart.png')
              }
            />
          </TouchableOpacity>
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
      this.setState({user});
    } catch (e) {}
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 10,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 30,
              textAlign: 'left',
              marginLeft: 10,
              color: 'black',
              fontWeight: 'bold',
            }}>
            New Cars
          </Text>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Favourite')}>
            <Image
              source={require('../assets/icons/redHeart.png')}
              style={{width: 40, height: 40, margin: 10}}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.newCars}
          renderItem={this.viewCar}
          keyExtractor={item => item.orderId}
          horizontal={true}
        />

        <View>
          <Text
            style={{
              fontSize: 30,
              textAlign: 'left',
              marginLeft: 10,
              color: 'black',
              fontWeight: 'bold',
            }}>
            Explore Cars
          </Text>
        </View>

        <FlatList
          data={this.state.exploreCars}
          renderItem={this.viewCar}
          keyExtractor={item => item.orderId}
          horizontal={true}
        />
      </View>
    );
  }
}
