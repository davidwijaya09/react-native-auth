import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Button, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export default function Register({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [token, setToken] = useState(null);
    const [attempts, setAttempts] = useState(0); // added state for attempts

    const onRegister = async () => {
        try {
            const response = await axios.post('http://localhost:3000/user', {
                username: username,
                password: password,
                email: email
            });

            if (response.data && response.data.success) {
                Alert.alert('Success', 'Registered successfully!');
            } 
            else {
                Alert.alert('Success', 'Registered successfully!');
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'There was a network issue. Please check your connection and try again.');
        }
    }

    const onBack = async () => {
        navigation.navigate('Login');
    }


    const checkToken = async () => {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
            navigation.navigate('Home');
            console.log("Registered successfully!");
        } else {
            console.log("Registered failed. Try again.");
        }
    }

    useEffect(() => {
        checkToken();
    }, []); // Using useEffect to call checkToken only once when the component mounts

    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={(value) => setUsername(value.toLowerCase())}
                placeholder='Username'
            />
            <TextInput secureTextEntry onChangeText={(value) => setPassword(value)} placeholder='Password' />
            <TextInput
                onChangeText={(value) => setEmail(value)}
                placeholder='Email'
            />

            <Button title='Register' onPress={onRegister} />
            <Button title='Back' onPress={onBack} />

            {/* <Text>username : {username}</Text>
            <Text>password : {password}</Text> */}
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
