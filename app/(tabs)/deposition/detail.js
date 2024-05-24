import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import ParallaxScrollView from "../../../components/ParallaxScrollView";
import { ThemedText } from "../../../components/ThemedText";
import { ThemedView } from "../../../components/ThemedView";
import { ThemedTextInput } from "../../../components/ThemedTextInput";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function MydepositionsTab({ navigation }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [modifyNotifications, setModifyNotifications] = useState(false);
    const [authorizeNotifications, setAuthorizeNotifications] = useState(false);

    const handleLogout = () => {
        navigation.navigate("Home");
    };

    const handleDeleteAccount = () => {
        navigation.navigate("Home");
    };

    const toggleModifyNotifications = () => {
        setModifyNotifications(!modifyNotifications);
    };

    const toggleAuthorizeNotifications = () => {
        setAuthorizeNotifications(!authorizeNotifications);
    };

    const user = useSelector((state) => state.user.value);
    const photos = user.photo.map((data, i) => {
        return (
            <View key={i} style={styles.photosContainer}>
                <FontAwesome name="times" size={20} color="#000000" style={styles.deleteIcon} />
                <Image source={{ uri: data }} style={styles.photos} />
            </View>
        );
    });

    return (
        <ParallaxScrollView headerBackgroundColor={{ light: "#9f4634", dark: "#1D3D47" }}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Dépositions Numéro 2</ThemedText>
            </ThemedView>
            <ThemedView>
                <ThemedText>Created at: 22/05/2024</ThemedText>
            </ThemedView>

            <ThemedView style={styles.rowContainer}>
                <ThemedText>
                    {} Nous avons loué notre Airnb depuis une semaine et à notre arrivée il était plein de fourmis. Nous
                    ne pouvons rien poser sur le sol, car les insectes continuent de courir partout et touchent tout.
                    Nos vacances sont gâchées à cause de ce problème.
                </ThemedText>
            </ThemedView>

            <ThemedView style={styles.notificationContainer}>
                <TouchableOpacity onPress={toggleAuthorizeNotifications}></TouchableOpacity>
            </ThemedView>

            <ThemedView style={styles.photosContainer}>
                {/* <Image style={styles.photos} source={require("../../../assets/images/avatar1.jpg")} />
                <Image style={styles.photos} source={require("../../../assets/images/avatar1.jpg")} />
                <Image style={styles.photos} source={require("../../../assets/images/avatar1.jpg")} />
                <Image style={styles.photos} source={require("../../../assets/images/avatar1.jpg")} />
                <Image style={styles.photos} source={require("../../../assets/images/avatar1.jpg")} />
                <Image style={styles.photos} source={require("../../../assets/images/avatar1.jpg")} /> */}
                {photos}
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
    },
    noPestsAllowedLogo: {
        height: 100,
        width: 100,
        top: 50,
    },
    rightHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    welcomeText: {
        marginRight: 25,
        fontSize: 24,
        color: "#A53939",
        top: 50,
        fontWeight: 800,
    },
    avatarContainer: {
        height: 104,
        width: 104,
        borderRadius: 52,
        borderWidth: 2,
        borderColor: "silver",
        justifyContent: "center",
        alignItems: "center",
        top: 50,
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 50,
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
    button: {
        backgroundColor: "#A53939",
        padding: 10,
        margin: 5,
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#888",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 7,
        elevation: 3,
    },
    notifications: {
        fontSize: 18,
        fontStyle: "italic",
    },
    buttonText: {
        color: "#f5f5f5",
        fontSize: 18,
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    line1: {
        height: 35,
        flex: 1,
        textAlign: "left",
        paddingLeft: 10,
        lineHeight: 35,
        left: 5,
        fontSize: 16,
        backgroundColor: "lightgrey",
    },
    line2: {
        height: 35,
        flex: 3,
        paddingLeft: 10,
        textAlign: "left",
        lineHeight: 35,
        fontSize: 16,
        backgroundColor: "#A429",
    },
    notificationContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "lightgrey",
    },
    photos: {
        margin: 10,
        width: 150,
        height: 150,
        borderWidth: 2,
        borderColor: "#ca8035",
    },
    photosContainer: {
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
    },
});
