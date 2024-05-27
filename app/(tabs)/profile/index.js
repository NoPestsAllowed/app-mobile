import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import ParallaxScrollView from "../../../components/ParallaxScrollView";
import { ThemedText } from "../../../components/ThemedText";
import { ThemedButton } from "../../../components/ThemedButton";
import { ThemedView } from "../../../components/ThemedView";
import { ThemedTextInput } from "../../../components/ThemedTextInput";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount, userState, clearUserState } from "../../../reducers/user";
import { router } from "expo-router";

const backendUrl = process.env.EXPO_PUBLIC_API_URL;

export default function UpdateProfileTab({ navigation }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [modifyNotifications, setModifyNotifications] = useState(false);
    const [authorizeNotifications, setAuthorizeNotifications] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    // console.log(user)
    //const userState = useSelector(state => state.user);

    // const handleLogout = () => {
    //     navigation.navigate('Home');
    // };

    const handleModification = () => { };

    const handleDeleteAccount = () => {
        const userId = user.id;
        console.log(userId);
        fetch(`${backendUrl}/users/delete/${userId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            //  body: JSON.stringify(user)
        })
            // .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data) {
                    dispatch(deleteAccount(userId));
                    dispatch(clearUserState());
                } else {
                    console.error(data.error);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const toggleModifyNotifications = () => {
        setModifyNotifications(!modifyNotifications);
    };

    const toggleAuthorizeNotifications = () => {
        setAuthorizeNotifications(!authorizeNotifications);
    };

    return (
        <ParallaxScrollView headerBackgroundColor={{ light: "#9f4634", dark: "#1D3D47" }}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Profil de {user.firstname}</ThemedText>
            </ThemedView>

            <ThemedText style={styles.label}>Prenom: </ThemedText>
            <ThemedText style={styles.input}>{user.firstname}</ThemedText>

            <ThemedText style={styles.label}>Nom: </ThemedText>
            <ThemedText style={styles.input}>{user.lastname}</ThemedText>


            <ThemedText style={styles.label}>Email: </ThemedText>
            <ThemedText style={styles.input}>{user.email}</ThemedText>


            <ThemedText style={styles.label}>Date of birth: </ThemedText>
            <ThemedText style={styles.input}>{user.birthDate}</ThemedText>

            <ThemedText style={styles.label}>Password </ThemedText>
            <ThemedText style={styles.input}>********</ThemedText>

            {/* <ThemedText
                onChangeText={(value) => setPassword(value)}
                value={password}
                placeholder="Password"
                label="Password"
                style={[styles.profileInfo, styles.input]}
            /> */}

            <ThemedView style={styles.notificationContainer}>
                <ThemedText style={styles.profileInfo}>Modify notifications</ThemedText>
                <Text style={styles.notifications}>Activate</Text>
                <TouchableOpacity onPress={toggleModifyNotifications}>
                    <Icon
                        name={modifyNotifications ? "bell" : "bell-o"}
                        size={30}
                        color={modifyNotifications ? "#A53939" : "grey"}
                    />
                </TouchableOpacity>
            </ThemedView>

            <ThemedView style={styles.notificationContainer}>
                <ThemedText style={styles.profileInfo}>Authorize geolocation</ThemedText>
                <Text style={styles.notifications}>Activate</Text>
                <TouchableOpacity onPress={toggleAuthorizeNotifications}>
                    <Icon name="globe" size={30} color={authorizeNotifications ? "#A53939" : "grey"} />
                </TouchableOpacity>
            </ThemedView>
           
            <ThemedView style={styles.buttonContainer}>
                <ThemedButton onPress={() => router.navigate("profile/update")}>Modifier mon compte</ThemedButton>
                <ThemedButton onPress={() => handleDeleteAccount()}>Delete account</ThemedButton>
                
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
        elevation: 1,
        zIndex: 1,
    },

    rightHeader: {
        flexDirection: "row",
        alignItems: "center",
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
        fontWeight: "bold",
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
    buttonText: {
        color: "#f5f5f5",
        fontSize: 18,
    },
    notifications: {
        fontSize: 18,
        fontStyle: "italic",
    },
    notificationContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 5,
    },
    buttonContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    label: {
        color: "#A53939",
        fontWeight: "bold",
    }
});
