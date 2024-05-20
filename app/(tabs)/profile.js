import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import ParallaxScrollView from "../../components/ParallaxScrollView";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";
import { ThemedTextInput } from "../../components/ThemedTextInput";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ProfileTab({ navigation }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [modifyNotifications, setModifyNotifications] = useState(false);
    const [authorizeNotifications, setAuthorizeNotifications] = useState(false);

    const handleLogout = () => {
        navigation.navigate('Home');
    };

    const handleDeleteAccount = () => {
        navigation.navigate('Home');
    };

    const toggleModifyNotifications = () => {
        setModifyNotifications(!modifyNotifications);
    };

    const toggleAuthorizeNotifications = () => {
        setAuthorizeNotifications(!authorizeNotifications);
    };

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "grey", dark: "#1D3D47" }}
            headerImage={
                <Image source={require("../../assets/images/icon.png")} style={styles.noPestsAllowedLogo} />
            }
            // <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
            //     <Text style={styles.buttonText}>Welcome, Name</Text>
            // </TouchableOpacity>
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title" style={styles.title}>Profile</ThemedText>
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

            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Log out</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
                <Text style={styles.buttonText}>Delete account</Text>
            </TouchableOpacity>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    noPestsAllowedLogo: {
        height: 100,
        width: 100,
        top: 100,
        bottom: 25,
        left: 25,
        position: "absolute",
    },
    profileInfo: {
        margin: 3,
        fontSize: 18,
    },
    title: {
        fontSize: 32,
        color: '#A53939',
        shadowColor: '#888',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 7,
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
    notifications: {
        fontSize: 18,
        fontStyle: 'italic'
    },
    buttonText: {
        color: '#f5f5f5',
        fontSize: 18,
    },
    notificationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
    }
});
