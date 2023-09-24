import { Linking, ActionSheetIOS, View, Text, Image, TouchableOpacity, ScrollView, Platform, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { ClockIcon, ShareIcon, MapPinIcon, SunIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';
import Activities from '../components/activities';
import { TextInput } from 'react-native-gesture-handler';


const ios = Platform.OS == 'ios';
const topMargin = ios ? 'mt-1' : 'mt-10';

const shareToEmail = (subject, body) => {
    const emailURL = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&ui=2&tf=1`;
    Linking.openURL(emailURL).catch((err) => console.error('An error occurred', err));
};

export default function ItineraryDetScreen(props) {
    const item = props.route.params;
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);

    const onShare = () => {
        const text = `Check out this itinerary: ${item?.title}`;
        const url = 'https://yourWebsite.com/itineraryLink'; // replace with your link

        const subject = "Check out this itinerary!";
        const body = `${text} - ${url}`;
        shareToEmail(subject, body);
    };

    return (
        <View className="bg-white flex-1">
            {/* destination image */}
            <Image source={item.image} style={{ width: wp(100), height: hp(20) }} />
            <StatusBar style={'light'} />

            {/* back button */}
            <SafeAreaView className={"flex-row justify-between items-center w-full absolute p-4 " + topMargin}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="p-2 rounded-full"
                    style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
                >
                    <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onShare}
                    className="p-2 rounded-full"
                    style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
                >
                    <ShareIcon size={wp(7)} strokeWidth={4} color="white" />
                </TouchableOpacity>
            </SafeAreaView>

            {/* title & descritpion & booking button */}


            <View style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }} className="px-5 flex flex-1 justify-between bg-white pt-10 mt-10">
                <ScrollView showsVerticalScrollIndicator={false} className="space-y-5">

                    <View className="flex-row justify-between items-start">
                        <Text style={{ fontSize: wp(7) }} className="font-bold flex-1 text-neutral-700">
                            {item?.title}
                        </Text>
                        {/* <Text style={{ fontSize: wp(7), color: theme.text }} className="font-semibold">
                            $ {item?.price}
                        </Text> */}
                    </View>

                    <Text style={{ fontSize: wp(3.7), marginBottom: -10 }} className="text-neutral-700 tracking-wide mb-2">15/12/2022 - 22/12/2022</Text>
                    <Text style={{ fontSize: wp(3.7) }} className="text-neutral-700 tracking-wide mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id augue sodales, rhoncus tortor at, rhoncus ex.</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            onPress={() => {
                                // Handle the "View Route" button press here
                                // You can navigate to the view route screen or perform any other action
                            }}
                            style={{
                                backgroundColor: '#f7f7f7',
                                padding: wp(3),
                                borderRadius: wp(4),
                                flex: 1, // Use flex to make the buttons take equal space horizontally
                                marginRight: wp(2), // Add some spacing between the buttons
                            }}
                        >
                            <Image
                                source={{
                                    uri: 'https://img.freepik.com/free-photo/3d-view-map_23-2150471734.jpg?w=1380&t=st=1695443884~exp=1695444484~hmac=2648c9c1534f00c64debb6f766d7f4331123d2e07fad8ec45ad71baa'
                                }}
                                style={{
                                    width: wp(40), height: wp(25), borderRadius: 10, alignSelf: 'center', // Center the image horizontally
                                    justifyContent: 'center',
                                }}
                            />
                            <Text style={{ color: '#0064D2', fontSize: 18, fontWeight: 'bold', marginLeft: 36, marginTop: 10 }}>View Route</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                // Handle the "Open Chat" button press here
                                // You can open a chat screen or perform any other action
                            }}
                            style={{
                                backgroundColor: '#f7f7f7',
                                padding: wp(3),
                                borderRadius: wp(4),
                                flex: 1, // Use flex to make the buttons take equal space horizontally
                                marginLeft: wp(2), // Add some spacing between the buttons
                            }}
                        >
                            <Image
                                source={{
                                    uri: 'https://cdn-icons-png.flaticon.com/512/5362/5362947.png'
                                }}
                                style={{
                                    width: wp(26), height: wp(25), borderRadius: 10, alignSelf: 'center', // Center the image horizontally
                                    justifyContent: 'center',
                                }}
                            />
                            <Text style={{ color: '#0064D2', fontSize: 18, fontWeight: 'bold', marginLeft: 36, marginTop: 10 }}>Open Chat</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={{ fontSize: wp(4), fontWeight: 'bold', marginBottom: -20 }} className="text-neutral-700 tracking-wide mb-2">Day 1 (15/12/2022)</Text>

                    <View>
                        <Activities />
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="  Add a place"
                    // editable={!isInputsDisabled}
                    />
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#222",
        height: 50,
        paddingLeft: 8,
        fontSize: 18,
        justifyContent: "center",
        width: "90%", // This will give it a consistent width with the City TextInput
        alignSelf: "center", // This will center the button
        marginTop: 14,
        marginBottom: 20,
    }
})