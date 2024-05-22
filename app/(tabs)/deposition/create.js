import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import ParallaxScrollView from "../../../components/ParallaxScrollView";
import { ThemedText } from "../../../components/ThemedText";
import { ThemedView } from "../../../components/ThemedView";
import { ThemedButton } from "../../../components/ThemedButton";
import { ThemedTextInput } from "../../../components/ThemedTextInput";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CreateDepositionTab({ navigation }) {
    const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [birthDate, setBirthDate] = useState("");
    const [depositionName, setDepositionName] = useState("");
    const [localisation, setLocalisation] = useState("");
    const [ownerEmail, setOwnerEmail] = useState("");

    // const [modifyNotifications, setModifyNotifications] = useState(false);
    // const [authorizeNotifications, setAuthorizeNotifications] = useState(false);

const handleLogout = () => {
    navigation.navigate('Home');
};

// const handleDeleteAccount = () => {
//     navigation.navigate('Home');
// };

// const toggleModifyNotifications = () => {
//     setModifyNotifications(!modifyNotifications);
// };

// const toggleAuthorizeNotifications = () => {
//     setAuthorizeNotifications(!authorizeNotifications);
// };

return (
    <ParallaxScrollView
        headerBackgroundColor={{ light: "#9f4634", dark: "#1D3D47" }}
    >
        <ThemedView style={styles.titleContainer}>
            <ThemedText type="title" style={styles.title}>Créer une déposition</ThemedText>
        </ThemedView>

        {/* <ThemedView style={styles.containerMap}>
            <ThemedText style={styles.mapView}>MAP GEOLOCALISEE</ThemedText>
        </ThemedView> */}

        <ThemedTextInput
            onChangeText={(value) => setDepositionName(value)} 
            value={depositionName}
            placeholder="Nom de la déposition"
            label="Deposition name"
            style={[styles.profileInfo, styles.input]}
        />

        <ThemedTextInput 
            onChangeText={(value) => setLocalisation(value)} 
            value={localisation}
            placeholder="Localisation"
            label="Localisation"
            style={[styles.profileInfo, styles.input]}
        />

        <ThemedTextInput 
            onChangeText={(value) => setOwnerEmail(value)} 
            value={ownerEmail}
            placeholder="Email du proprietaire"
            label="Owner email"
            style={[styles.profileInfo, styles.input]}
        />
        
        <ThemedButton>Open Camera</ThemedButton>
        <ThemedButton>Upload images from phone</ThemedButton>
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
    },
    noPestsAllowedLogo: {
        height: 100,
        width: 100,
        top:50,
    },
    rightHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    welcomeText: {
        marginRight: 25,
        fontSize: 24,
        color: '#A53939',
        top:50,
        fontWeight: "800",
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 125,
        top:50,
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
    buttonSubmit: {
        backgroundColor: '#fff',
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
    submitButton: {
        color: "#A53939",
        fontSize: 18,
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
    },
    // containerMap: {
    //     width: "100%",
    //     height: "20%",
    // },
});