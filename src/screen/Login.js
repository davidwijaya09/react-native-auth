import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Button, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export default function Login({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(null);
    const [attempts, setAttempts] = useState(0); // added state for attempts

    const onSubmit = async () => {
        try {
            const response = await axios.get('http://localhost:3000/user?username=' + username);
            console.log(response.data)
            // setToken(response.data[0].username);
            // await AsyncStorage.setItem('token', response.data[0].username);
            navigation.navigate('Home');
        } catch (error) {
            console.log(error, "kena")
        }
    }



    const onRegister = async () => {
        navigation.navigate('Register');
    }

    const onCreateItinerary = async () => {
        navigation.navigate('CreateItinerary');
    }

    const onExploreLayout = async () => {
        navigation.navigate('ExploreLayout');
    }

    const onItineraryLayout = async () => {
        navigation.navigate('ItineraryLayout');
    }

    const checkToken = async () => {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
            navigation.navigate('Home');
            console.log("you are logged in");
        } else {
            console.log("you are not logged in");
        }
    }

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <View style={styles.container}>
            {/* login using AsyncStorage */}
            <TextInput
                onChangeText={(value) => setUsername(value.toLowerCase())}
                placeholder='Username'
            />
            <TextInput secureTextEntry onChangeText={(value) => setPassword(value)} placeholder='Password' />
            <Text>username : {username}</Text>
            <Text>password : {password}</Text>


            <Button title='Login' onPress={onSubmit} />
            <Button title='Register' onPress={onRegister} />
            <Button title='Create Itinerary' onPress={onCreateItinerary}></Button>
            <Button title='Explore Layout' onPress={onExploreLayout}></Button>
            <Button title='Itinerary Layout' onPress={onItineraryLayout}></Button>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
});
