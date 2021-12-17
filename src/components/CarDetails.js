import React, {Component} from 'react';
import {Text, View, Image, Dimensions, StyleSheet} from 'react-native';
const screenWidth = Dimensions.get('window').width;

export default class CarDetails extends Component {
  render() {
    let {car} = this.props.route.params;
    return (
      <View style={{flex: 1, alignItems: 'center', margin: 20}}>
        <Image
          style={{width: screenWidth / 1.3, height: 150, borderRadius: 20}}
          source={{uri: car.carCoverImage}}
        />
        <View>
          <View style={style.view}>
            <Text style={style.text}>Name :</Text>
            <Text style={{fontSize: 20, marginTop: 5, fontWeight: '900'}}>
              {car.carNameOrTitle}
            </Text>
          </View>
          <View style={style.view}>
            <Text style={style.text}>Color :</Text>
            <Text style={{fontSize: 20, marginTop: 5, fontWeight: '900'}}>
              {car.carColor}
            </Text>
          </View>
          <View style={style.view}>
            <Text style={style.text}>Description :</Text>
            <Text style={{fontSize: 20, marginTop: 5, fontWeight: '900'}}>
              {car.carDescription}
            </Text>
          </View>
          <View style={style.view}>
            <Text style={style.text}>Model :</Text>
            <Text style={{fontSize: 20, marginTop: 5, fontWeight: '900'}}>
              {car.carModal}
            </Text>
          </View>
          <View style={style.view}>
            <Text style={style.text}>Motor Capacity :</Text>
            <Text style={{fontSize: 20, marginTop: 5, fontWeight: '900'}}>
              {car.carMotorCapacity}
            </Text>
          </View>
          <View style={style.view}>
            <Text style={style.text}>Price :</Text>
            <Text style={{fontSize: 20, marginTop: 5, fontWeight: '900'}}>
              {car.carPrice}
            </Text>
          </View>
          <View style={style.view}>
            <Text style={style.text}>Payment :</Text>
            <Text style={{fontSize: 20, marginTop: 5, fontWeight: '900'}}>
              {car.carBayType}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  view: {flexDirection: 'row', justifyContent: 'space-between'},
  text: {fontSize: 23, marginTop: 5, fontWeight: '900'},
});
