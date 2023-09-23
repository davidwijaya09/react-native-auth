import { Button, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Platform, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Itineraries from '../components/itinerary';
const ios = Platform.OS == 'ios';
const topMargin = ios ? 'mt-3' : 'mt-10';
export default function ItineraryLayout({ navigation }) {
    const logout = async () => {
        await AsyncStorage.removeItem('token');
        navigation.navigate('Login');
    }

    const create = async () => {
        navigation.navigate('CreateItinerary');
    }
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView showsVerticalScrollIndicator={false} className={"space-y-6 " + topMargin}>
                {/* create button */}
                <View className="mx-5 flex-row justify-between items-center">
                    <View>
                        <Text style={{ fontSize: wp(7) }} className="font-bold text-neutral-700">Itinerary</Text>
                        <Text style={{ fontSize: wp(3) }} className="text-neutral-700">An itinerary is a detailed plan or route of a trip</Text>
                    </View>
                    <TouchableOpacity>
                        <Button onPress={create} title='Create' />
                    </TouchableOpacity>
                </View>

                {/* itineraries */}
                <View>
                    <Itineraries />
                </View>
                <Button onPress={logout} title='Logout' />
            </ScrollView>
        </SafeAreaView>
    )
}