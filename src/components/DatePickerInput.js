import React, { useState } from 'react';
import {
    TextInput,
    Modal,
    View,
    Button,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export function DatePickerInput(props) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState(new Date());
    const [dateText, setDateText] = useState("");

    const onChange = (event, selectedDate) => {
        console.log("onChange triggered");
        const currentDate = selectedDate || date;
        setModalVisible(false);
        setDate(currentDate);
        setDateText(currentDate.toLocaleDateString());
        if (props.onDateChange) {
            props.onDateChange(currentDate);
        }
    };

    return (
        <>
            <TextInput
                style={props.style}
                placeholder={props.placeholder}
                value={dateText}
                editable={false}
                onFocus={() => setModalVisible(true)}
            />
            {isModalVisible && (
                <Modal animationType="slide" transparent={true} visible={isModalVisible}>
                    <View style={props.modalStyle}>
                        <DateTimePicker
                            testID="datePicker"
                            value={date}
                            mode="date"
                            is24Hour={true}
                            display="spinner"
                            onChange={onChange}
                        />
                        <Button onPress={() => setModalVisible(false)} title="Close" />
                    </View>
                </Modal>
            )}
        </>
    );
}
