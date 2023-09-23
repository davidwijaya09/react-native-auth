import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//SCREEN
import Home from '../screen/Home';
import Login from '../screen/Login';
import Register from '../screen/Register';
import CreateItinerary from '../screen/CreateItinerary';
import ExploreLayout from '../screen/ExploreLayout';
import ItineraryLayout from '../screen/ItineraryLayout';
import DestinationScreen from '../screen/DestinationScreen';
import ItineraryDetScreen from '../screen/ItineraryDetScreen';

const Stack = createStackNavigator();


export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="CreateItinerary" component={CreateItinerary} />
        <Stack.Screen name="ExploreLayout" component={ExploreLayout} />
        <Stack.Screen name="ItineraryLayout" component={ItineraryLayout} />
        <Stack.Screen name="Destination" component={DestinationScreen} />
        <Stack.Screen name="Itinerary" component={ItineraryDetScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "black",
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: "black",
    padding: 10,
    margin: 15,
    alignItems: "center",
    height: 40
  },
  submitButtonText: {
    color: "white"
  }
});