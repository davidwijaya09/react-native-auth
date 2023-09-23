import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Switch,
    Button,
    TouchableOpacity,
    Modal,
    KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";

export default function CreateItinerary({ navigation }) {
    const [isInputsDisabled, setInputsDisabled] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);

    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
    const [openEndDatePicker, setOpenEndDatePicker] = useState(false);

    const today = new Date();
    const startDate = getFormatedDate(
        today.setDate(today.getDate() + 1),
        "YYYY/MM/DD"
    );
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [selectedEndDate, setSelectedEndDate] = useState("");
    const [startedDate, setStartedDate] = useState("12/12/2023");

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        navigation.navigate('Login');
    }

    function handleChangeStartDate(propDate) {
        setStartedDate(propDate);
    }

    const handleOnPressStartDate = () => {
        setOpenStartDatePicker(!openStartDatePicker);
    };

    const handleOnPressEndDate = () => {
        setOpenEndDatePicker(!openEndDatePicker);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <StatusBar style='auto' />

                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : ""}
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#fff",
                    }}
                >
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Text style={styles.textHeader}>Create Itinerary</Text>
                        <Text style={styles.textSubHeader}>Itinerary for best vacations plan</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="  City"
                            editable={!isInputsDisabled}
                        />

                        <View style={{ width: "100%", paddingHorizontal: 22, marginTop: 10 }}>
                            <View>
                                <Text style={{ fontSize: 18 }}>Start Date</Text>
                                <TouchableOpacity
                                    style={styles.inputBtn}
                                    onPress={handleOnPressStartDate}
                                >
                                    <Text>{selectedStartDate}</Text>
                                </TouchableOpacity>
                            </View>

                            <View>
                                <Text style={{ fontSize: 18, paddingTop: 10 }}>End Date</Text>
                                <TouchableOpacity
                                    style={styles.inputBtn}
                                    onPress={handleOnPressEndDate}
                                >
                                    <Text>{selectedEndDate}</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                onPress={() => console.log("Subimit data")}
                                style={styles.submitBtn}
                            >
                                <Text style={{ fontSize: 20, color: "white" }}>Submit</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Create modal for date picker */}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={openStartDatePicker}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <DatePicker
                                        mode="calendar"
                                        minimumDate={startDate}
                                        selected={startedDate}
                                        onDateChanged={handleChangeStartDate}
                                        onSelectedChange={(date) => setSelectedStartDate(date)}
                                        options={{
                                            backgroundColor: "#080516",
                                            textHeaderColor: "#469ab6",
                                            textDefaultColor: "#FFFFFF",
                                            selectedTextColor: "#FFF",
                                            mainColor: "#469ab6",
                                            textSecondaryColor: "#FFFFFF",
                                            borderColor: "rgba(122, 146, 165, 0.1)",
                                        }}
                                    />

                                    <TouchableOpacity onPress={handleOnPressStartDate}>
                                        <Text style={{ color: "white" }}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={openEndDatePicker}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <DatePicker
                                        mode="calendar"
                                        minimumDate={selectedStartDate ? selectedStartDate : startDate}
                                        selected={selectedEndDate}
                                        onDateChanged={(date) => setSelectedEndDate(date)}
                                        onSelectedChange={(date) => setSelectedEndDate(date)}
                                        options={{
                                            backgroundColor: "#080516",
                                            textHeaderColor: "#469ab6",
                                            textDefaultColor: "#FFFFFF",
                                            selectedTextColor: "#FFF",
                                            mainColor: "#469ab6",
                                            textSecondaryColor: "#FFFFFF",
                                            borderColor: "rgba(122, 146, 165, 0.1)",
                                        }}
                                    />
                                    <TouchableOpacity onPress={handleOnPressEndDate}>
                                        <Text style={{ color: "white" }}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>


                        <View style={styles.switchContainer}>
                            <Switch
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                            <Text style={styles.switchText}>Auto generate destination with AI</Text>
                        </View>
                    </View>
                    <Button onPress={logout} title='Logout' />
                </KeyboardAvoidingView>


            </View>
        </SafeAreaView>
    );
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
        borderRadius: 4,
        borderColor: "#222",
        height: 50,
        paddingLeft: 8,
        fontSize: 18,
        justifyContent: "center",
        width: "90%", // This will give it a consistent width with the City TextInput
        alignSelf: "center", // This will center the button
        marginTop: 14,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 15,
    },
    switchText: {
        marginLeft: 10,
    },
    textContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    dateInput: {
        width: 110,
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: 'white',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // latar belakang setengah transparan
    },
    modalView: {
        width: '80%', // Anda bisa menyesuaikan lebar modal
        backgroundColor: "white",
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 20, // Tambahkan borderRadius jika Anda ingin sudut modal membulat
    },
    textHeader: {
        fontSize: 30,
        marginVertical: 10,
        marginTop: 50,
        color: "#111",
    },
    textSubHeader: {
        fontSize: 20,
        color: "#111",
        marginBottom: 50,
    },
    inputBtn: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: "#222",
        height: 50,
        paddingLeft: 8,
        fontSize: 18,
        justifyContent: "center",
        marginTop: 14,
    },
    submitBtn: {
        backgroundColor: "#0064D2",
        paddingVertical: 22,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        paddingVertical: 12,
        marginVertical: 16,
    },
    centeredView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "#080516",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        padding: 35,
        width: "90%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});
