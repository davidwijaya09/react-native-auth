import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { destinationData } from '../constants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient'
import { HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { activitiesDetails } from '../constants/itinerary';
import { TrashIcon } from 'react-native-heroicons/outline';

export default function Activites() {
    const navigation = useNavigation();
    const renderItem = ({ item }) => {
        return <ActivityCard navigation={navigation} item={item} />;
    };

    return (
        <View style={{ flex: 1, paddingHorizontal: 2 }}>
            <FlatList
                scrollEnabled={false}
                data={activitiesDetails}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            // contentContainerStyle={{ flexDirection: 'column' }}
            />
        </View>
    );
}

const ActivityCard = ({ item, navigation }) => {
    const [isFavourite, toggleFavourite] = useState(false);
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('ActivityDetail', { ...item })}
            style={{
                width: wp(60),
                height: wp(55),
                marginTop: 0,   // reduced margin top
                marginBottom: 0
            }}
            className="flex justify-end relative p-4 py-6 space-y-2 mb-5">
            <Image
                source={item.image}
                style={{ width: wp(87), height: wp(50), borderRadius: 35 }}
                className="absolute"
            />

            <Text style={{ fontSize: wp(4) }} className="text-white font-semibold">{item.activity}</Text>
            <Text style={{ fontSize: wp(2.2) }} className="text-white">{item.duration}</Text>
            <Text style={{ fontSize: wp(2.2) }} className="text-white">{item.description}</Text>
            <Text style={{ fontSize: wp(2.2) }} className="text-white">{item.time}</Text>


            <TouchableOpacity
                onPress={() => toggleFavourite(!isFavourite)}
                style={{
                    backgroundColor: 'rgba(255,255,255,0.4)',
                    borderRadius: wp(5),
                    padding: wp(2),
                    position: 'absolute',
                    right: -80,
                    bottom: 15,
                }}>
                <TrashIcon size={wp(5)} color={isFavourite ? "red" : "white"} />
            </TouchableOpacity>

        </TouchableOpacity>
    )
}