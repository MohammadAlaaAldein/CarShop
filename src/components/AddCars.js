import React, {Component, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
  Alert,
} from 'react-native';
import {get, firebaseStorage} from '../firebase/index';
// import {} from '../firebase/firebase';
import {Picker} from '@react-native-picker/picker';
import imagePicker from 'react-native-image-picker';

const screenWidth = Dimensions.get('window').width;

export default class AddCars extends Component {
  state = {
    carId: get('CarData/AllCars').push().key,
    carColor: '',
    carCoverImage: '',
    carDescripton: '',
    carInAppType: '',
    carModal: '',
    carMotoraCapacity: '',
    carNameOrTitle: '',
    carPrice: '',
    carBayType: '',

    image: '',
  };

  addCar = () => {
    let {
      carColor,
      carDescripton,
      carInAppType,
      carModal,
      carMotoraCapacity,
      carNameOrTitle,
      carPrice,
      carBayType,

      carId,

      imageURL,
    } = this.state;

    if (
      carColor &&
      carInAppType &&
      carModal &&
      carMotoraCapacity &&
      carNameOrTitle &&
      carPrice &&
      carBayType &&
      carId &&
      imageURL
    ) {
      get(`CarData/AllCars/${carId}`)
        .set({
          carColor,
          carCoverImage: imageURL,
          carDescripton,
          carInAppType,
          carModal,
          carMotoraCapacity,
          carNameOrTitle,
          carPrice,
          carBayType,
        })
        .then(() => {
          Alert.alert('Car Added Successfully');
          this.setState({
            carId: get('CarData/AllCars').push().key,
            carColor: '',
            carCoverImage: '',
            carDescripton: '',
            carInAppType: '',
            carModal: '',
            carMotoraCapacity: '',
            carNameOrTitle: '',
            carPrice: '',
            carBayType: '',

            image: '',
          });

          this.props.navigation.navigate('Home');
        })
        .catch(err => {
          // Alert.alert('Error', err);
        });
    } else {
      Alert.alert('Alert', 'Please fill all required fields');
    }
  };

  uploadImage = () => {
    let {carId} = this.state;
    imagePicker.showImagePicker({maxWidth: 500}, async response => {
      if (response.didCancel) {
        return;
      }
      let image = response;
      this.setState({image});

      let imagFile = await fetch(image.uri).then(r => r.blob());

      let strorageRef = firebaseStorage(`MotorHub_Cars_Image/${carId}`);
      strorageRef
        .put(imagFile)
        .then(snapshot => {
          snapshot.ref.getDownloadURL().then(downloadURL => {
            this.setState({imageURL: downloadURL});
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  render() {
    let {
      carColor,
      carCoverImage,
      carInAppType,
      carMotoraCapacity,
      carNameOrTitle,
      carBayType,
      image,
    } = this.state;
    return (
      <ScrollView style={{flex: 1}}>
        <View>
          <TouchableOpacity
            onPress={this.uploadImage}
            style={{alignItems: 'flex-end', margin: 10}}>
            <Image
              style={{
                borderWidth: 0.5,
                borderRadius: 5,
                width: 50,
                height: 50,
              }}
              source={require('../assets/icons/addImage.png')}
            />
          </TouchableOpacity>
        </View>

        {image ? (
          <View>
            <Image
              style={{
                borderWidth: 1,
                borderRadius: 20,
                width: screenWidth,
                height: 150,
              }}
              source={{
                uri: image.uri,
              }}
            />
          </View>
        ) : null}

        <View>
          <TextInput
            placeholder="Car Name"
            style={[
              style.text,
              {borderWidth: 0.5, borderRadius: 10, textAlign: 'center'},
            ]}
            onChangeText={text => this.setState({carNameOrTitle: text})}
          />
        </View>

        <View>
          <TextInput
            placeholder="Car Description"
            style={[
              style.text,
              {borderWidth: 0.5, borderRadius: 10, textAlign: 'center'},
            ]}
            multiline={true}
            onChangeText={text => this.setState({carDescripton: text})}
          />
        </View>

        <View>
          <TextInput
            placeholder="Car Model"
            style={[
              style.text,
              {borderWidth: 0.5, borderRadius: 10, textAlign: 'center'},
            ]}
            onChangeText={text => this.setState({carModal: text})}
          />
        </View>

        <View>
          <TextInput
            placeholder="Car Price"
            style={[
              style.text,
              {borderWidth: 0.5, borderRadius: 10, textAlign: 'center'},
            ]}
            onChangeText={text => this.setState({carPrice: text})}
          />
        </View>

        <View>
          <Text style={style.text}>Payment</Text>
          <Picker
            selectedValue={carBayType}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({carBayType: itemValue})
            }>
            <Picker.Item label="Cash" value="Cash" />
            <Picker.Item label="Online Payment" value="Online Payment" />
          </Picker>
        </View>

        <View>
          <Text style={style.text}>Color</Text>
          <Picker
            selectedValue={carColor}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({carColor: itemValue})
            }>
            <Picker.Item label="White" value="White" />
            <Picker.Item label="Black" value="Black" />
            <Picker.Item label="Red" value="Red" />
            <Picker.Item label="Yellow" value="Yellow" />
            <Picker.Item label="Green" value="Green" />
            <Picker.Item label="Silver" value="Silver" />
            <Picker.Item label="Blue" value="Blue" />
          </Picker>
        </View>

        <View>
          <Text style={style.text}>Car Type</Text>
          <Picker
            selectedValue={carInAppType}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({carInAppType: itemValue})
            }>
            <Picker.Item label="New" value="New" />
            <Picker.Item label="Explore" value="Explore" />
          </Picker>
        </View>

        <View>
          <Text style={style.text}>Motor Capacity</Text>
          <Picker
            selectedValue={carMotoraCapacity}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({carMotoraCapacity: itemValue})
            }>
            <Picker.Item label="800CC" value="800CC" />
            <Picker.Item label="1000CC" value="1000CC" />
          </Picker>
        </View>

        <TouchableOpacity
          style={{
            flex: 1,
            borderRadius: 20,
            height: 50,
            backgroundColor: '#0099ff',
            margin: 20,
          }}
          onPress={() => this.addCar()}>
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              textAlignVertical: 'center',
              color: 'white',
              fontWeight: '900',
              fontSize: 18,
            }}>
            Add Car
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  text: {fontSize: 20, margin: 10, fontWeight: 'bold'},
});
