import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import ParallaxScrollView from "../components/ParallaxScrollView";
import { ThemedText } from "../components/ThemedText";
import { ThemedButton } from "../components/ThemedButton";
import { ThemedView } from "../components/ThemedView";
import { ThemedTextInput } from "../components/ThemedTextInput";
import Icon from 'react-native-vector-icons/FontAwesome';
import { router } from "expo-router";

export default function MessagesentTab({ navigation }) {
    const [firstName, setFirstName] = useState("John");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthDate, setBirthDate] = useState("");
  
    const handleLogin = () => {
        navigation.navigate('login');
    };

    const handleHome = () => {
        navigation.navigate('Home');
    };


    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#9f4634", dark: "#1D3D47" }}
        >
            
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Your message has been sent !</ThemedText>
            </ThemedView>

            <ThemedTextInput
                onChangeText={(value) => setFirstName(value)} 
                value={firstName}
                placeholder="First Name"
                label="First Name"
                style={[styles.profileInfo, styles.input]}
            />

            <ThemedTextInput 
                onChangeText={(value) => setLastName(value)} 
                value={lastName}
                placeholder="Last Name"
                label="Last Name"
                style={[styles.profileInfo, styles.input]}
            />

            <ThemedTextInput 
                onChangeText={(value) => setBirthDate(value)} 
                value={birthDate}
                placeholder="Birth Date"
                label="Birth Date"
                style={[styles.profileInfo, styles.input]}
            />

            <ThemedTextInput 
                onChangeText={(value) => setPassword(value)} 
                value={password}
                placeholder="Password"
                label="Password"
                style={[styles.profileInfo, styles.input]}
            />

            <ThemedView style={styles.notificationContainer}>
                <ThemedText style={styles.profileInfo}>Modify notifications</ThemedText>
                <Text style={styles.notifications}>Activate</Text>
                <TouchableOpacity onPress={toggleModifyNotifications}>
                    <Icon 
                        name={modifyNotifications ? 'bell' : 'bell-o'} 
                        size={30} 
                        color={modifyNotifications ? '#A53939' : 'grey'} 
                    />
                </TouchableOpacity>
            </ThemedView>

            <ThemedView style={styles.notificationContainer}>
                <ThemedText style={styles.profileInfo}>Authorize geolocation</ThemedText>
                <Text style={styles.notifications}>Activate</Text>
                <TouchableOpacity onPress={toggleAuthorizeNotifications}>
                    <Icon 
                        name='globe' 
                        size={30} 
                        color={authorizeNotifications ? '#A53939' : 'grey'} 
                    />
                </TouchableOpacity>
            </ThemedView>
            <ThemedButton onPress={() => handleDeleteAccount()}>Delete account</ThemedButton>
           
            <ThemedButton onPress={() => logout()}>Logout</ThemedButton>
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
        borderColor: '#A53939',
        padding: 5,
        borderRadius: 7,
    },
    button: {
        backgroundColor: '#A53939',
        padding: 10,
        margin: 5,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#888',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 7,
        elevation: 3,
    },
    buttonText: {
        color: '#f5f5f5',
        fontSize: 18,
    },
    notifications: {
        fontSize: 18,
        fontStyle: 'italic'
    },
    notificationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
    }
});
