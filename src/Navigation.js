import React from 'react';

import Splash from './components/Splash';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Icon from './components/Icon';
import Profile from './components/Profile';
import Admin from './components/Admin';
import Favourite from './components/Favourite';
import CarDetails from './components/CarDetails';
import AddCars from './components/AddCars';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={({navigation}) => ({
            headerShown: false,
            headerRight: props => (
              <Dashboard {...props} navigation={navigation} />
            ),

            headerShown: true,
            headerStyle: {
              backgroundColor: '#00bbff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={({navigation, route}) => ({
            headerShown: true,
            headerStyle: {
              backgroundColor: '#00bbff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="Admin"
          component={Admin}
          options={({navigation, route}) => ({
            headerShown: true,
            headerStyle: {
              backgroundColor: '#00bbff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="Favourite"
          component={Favourite}
          options={({navigation, route}) => ({
            headerShown: true,
            headerStyle: {
              backgroundColor: '#00bbff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="CarDetails"
          component={CarDetails}
          options={({navigation, route}) => ({
            headerShown: true,
            headerStyle: {
              backgroundColor: '#00bbff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          })}
        />

        <Stack.Screen
          name="AddCars"
          component={AddCars}
          options={({navigation, route}) => ({
            headerShown: true,
            headerStyle: {
              backgroundColor: '#00bbff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={({navigation, route}) => ({
          headerRight: props => (
            <Dashboard {...props} navigation={navigation} />
          ),

          headerShown: true,
          headerStyle: {
            backgroundColor: '#00bbff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          tabBarLabel: '',
          tabBarIcon: props => (
            <Icon
              source="Home"
              {...props}
              navigation={navigation}
              user={user}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Favourite"
        component={Favourite}
        options={({navigation, route}) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: '#00bbff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          tabBarLabel: '',
          tabBarIcon: props => (
            <Icon
              source="Favourite"
              {...props}
              navigation={navigation}
              user={user}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
