import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import ParallaxScrollView from "../../components/ParallaxScrollView";
import { ThemedText } from "../../components/ThemedText";
import { ThemedButton } from "../../components/ThemedButton";
import { ThemedView } from "../../components/ThemedView";
import { ThemedTextInput } from "../../components/ThemedTextInput";
import Icon from 'react-native-vector-icons/FontAwesome';
import { router } from "expo-router";
import { useDispatch, useSelector } from 'react-redux';

export default function ContactTab({ navigation }) {
    const [firstName, setFirstName] = useState("John");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [messageTitle, setMessageTitle] = useState("");
    const [message, setMessage] = useState("");

    const user = useSelector((state) => state.user.value);

    const handleSendMessage = () => {
        navigation.navigate('Messagesent');
    };

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#9f4634", dark: "#1D3D47" }}
        >
            
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Contact us</ThemedText>
            </ThemedView>

            <ThemedTextInput
                onChangeText={(value) => setFirstName(value)} 
                value={user.firstname}
                placeholder="First Name"
                label="First Name"
                style={[styles.profileInfo, styles.input]}
            />

            <ThemedTextInput 
                onChangeText={(value) => setLastName(value)} 
                value={user.lastname}
                placeholder="Last Name"
                label="Last Name"
                style={[styles.profileInfo, styles.input]}
            />

            <ThemedTextInput 
                onChangeText={(value) => setEmailAddress(value)} 
                value={user.email}
                placeholder="Email address"
                label="Email address"
                style={[styles.profileInfo, styles.input]}
            />

            <ThemedTextInput 
                onChangeText={(value) => setMessageTitle(value)} 
                value={messageTitle}
                placeholder="Message title"
                label="Message title"
                style={[styles.profileInfo, styles.input]}
            />
                <ThemedTextInput 
                onChangeText={(value) => setMessage(value)} 
                value={message}
                placeholder="Message"
                label="Message"
                style={[styles.message, styles.input]}
                multiline
            />

            <ThemedButton onPress={() => router.navigate("Messagesent")}>Send Message</ThemedButton>
           
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        elevation: 1, 
        zIndex: 1, 
    },

    rightHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    profileInfo: {
        margin: 3,
        fontSize: 18,
    },
    input: {
        borderWidth: 1,
        borderColor: "#A53939",
        padding: 5,
        borderRadius: 7,
    },
    message: {
        height:200,
        width:350,
        radius:40,
        flexWrap: "wrap",
        fontSize:16,
        textAlignVertical: "top",
    },
    notifications: {
        fontSize: 18,
        fontStyle: "italic"
    },
    notificationContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 5,
    }
});
