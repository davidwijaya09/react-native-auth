import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { destinationData } from '../constants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient'
import { HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { itineraryData } from '../constants/itinerary';

export default function Itineraries() {
    const navigation = useNavigation();
    const renderItem = ({ item }) => {
        return <ItineraryCard navigation={navigation} item={item} />;
    };

    return (
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <FlatList
                scrollEnabled={false}
                data={itineraryData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                // contentContainerStyle={{ flexDirection: 'column' }}
            />
        </View>
    );
}

const ItineraryCard = ({ item, navigation }) => {
    const [isFavourite, toggleFavourite] = useState(false);
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Itinerary', { ...item })}
            style={{
                width: wp(44), 
                height: wp(65), 
                marginTop: 0,   // reduced margin top
                marginBottom: 0
            }}
            className="flex justify-end relative p-4 py-6 space-y-2 mb-5">
            <Image
                source={item.image}
                style={{ width: wp(95), height: wp(50), borderRadius: 35 }}
                className="absolute"
            />

            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={{ width: wp(44), height: hp(15), borderBottomLeftRadius: 35, borderBottomRightRadius: 35 }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                className="absolute bottom-0"
            />

            <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)} style={{ backgroundColor: 'rgba(255,255,255,0.4)' }} className="absolute top-1 right-3 rounded-full p-3">
                <HeartIcon size={wp(5)} color={isFavourite ? "red" : "white"} />
            </TouchableOpacity>

            <Text style={{ fontSize: wp(4) }} className="text-white font-semibold">{item.title}</Text>
            <Text style={{ fontSize: wp(2.2) }} className="text-white">{item.totalDays}</Text>
            <Text style={{ fontSize: wp(2.2) }} className="text-white">{item.totalDestination} Destination</Text>
            <Text style={{ fontSize: wp(2.2) }} className="text-white">{item.totalPeople}</Text>
        </TouchableOpacity>
    )
}