import React, { useState, useCallback, useEffect } from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import ThemedScrollView from "../../../components/ThemedScrollView";
import { ThemedText } from "../../../components/ThemedText";
import { ThemedButton } from "../../../components/ThemedButton";
import { ThemedView } from "../../../components/ThemedView";
import { ThemedTextInput } from "../../../components/ThemedTextInput";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount, userState, clearUserState, updateAccount } from "../../../reducers/user";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

const backendUrl = process.env.EXPO_PUBLIC_API_URL;

export default function UpdateProfileTab({}) {
    const user = useSelector((state) => state.user.value);
    const navigation = useNavigation();

    const [firstName, setFirstName] = useState(user.firstname);
    const [lastName, setLastName] = useState(user.lastname);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [modifyNotifications, setModifyNotifications] = useState(false);
    const [authorizeGeolocation, setAuthorizeGeolocation] = useState(false);
    const [update, setUpdate] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        setFirstName(user.firstname);
        setLastName(user.lastname);
        setEmail(user.email);
    }, [user]);

    useFocusEffect(
        useCallback(() => {
            // Clear the update message when the screen is focused
            (async () => {
                const locationEnabled = await Location.hasServicesEnabledAsync();
                // alert(locationEnabled);
                setAuthorizeGeolocation(locationEnabled);
            })();
            setUpdate("");
        }, [])
    );

    const handleModification = async () => {
        const userId = user.id;
        try {
            const response = await fetch(`${backendUrl}/users/update/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
                body: JSON.stringify({
                    firstname: firstName,
                    lastname: lastName,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data); // Pour déboguer la réponse

            if (data.result) {
                dispatch(updateAccount({ firstname: firstName, lastname: lastName }));
                console.log("Mise à jour réussie");
                setUpdate("Mise à jour réussie");
                navigation.navigate("profile/index");
            } else {
                console.error("Erreur lors de la mise à jour:", data);
                setUpdate("Erreur lors de la mise à jour");
            }
        } catch (error) {
            console.error("Erreur de modification:", error);
            setUpdate("Erreur de modification");
        }
    };

    const toggleModifyNotifications = () => {
        setModifyNotifications(!modifyNotifications);
    };

    const toggleAuthorizeGeolocation = () => {
        console.log("Can not revoke permission from app.");
    };

    return (
        <ThemedScrollView>
            <ThemedView style={styles.titleContainer}>
                <ThemedText style={styles.title}>Profil de {user.firstname}</ThemedText>
                <Image
                    source={{
                        uri: `https://ui-avatars.com/api/?name=${user.firstname}%20${user.lastname}&color=7F9CF5&background=EBF4FF`,
                    }}
                    style={styles.user}
                />
            </ThemedView>
            <ThemedView style={styles.modify}>
                {update && <Text style={styles.message}>Vos modifications on bien été prise en compte!!!</Text>}
            </ThemedView>

            <ThemedText style={styles.label}>Prénom</ThemedText>
            <ThemedTextInput
                onChangeText={(value) => setFirstName(value)}
                value={firstName}
                placeholder="First Name"
                style={[styles.profileInfo, styles.input]}
            />

            <ThemedText style={styles.label}>Nom</ThemedText>
            <ThemedTextInput
                onChangeText={(value) => setLastName(value)}
                value={lastName}
                placeholder="Last Name"
                labelStyle={styles.label}
                style={[styles.profileInfo, styles.input]}
            />

            <ThemedText style={styles.label}>Email</ThemedText>
            <ThemedTextInput
                onChangeText={(value) => setEmail(value)}
                value={user.email}
                placeholder="Email"
                style={[styles.profileInfo, styles.input]}
            />
            {/* <ThemedText style={styles.label}>Birth Date</ThemedText>
            <ThemedTextInput
                onChangeText={(value) => setBirthDate(value)}
                value={birthDate}
                placeholder="Birth Date"
                style={[styles.profileInfo, styles.input]}
            /> */}

            {/* <ThemedView style={styles.notificationContainer}>
                <ThemedText style={styles.profileInfo}>Modify notifications</ThemedText>
                <Text style={styles.notifications}>Activate</Text>
                <TouchableOpacity onPress={toggleModifyNotifications}>
                    <Icon
                        name={modifyNotifications ? "bell" : "bell-o"}
                        size={30}
                        color={modifyNotifications ? "#A53939" : "grey"}
                    />
                </TouchableOpacity>
            </ThemedView> */}

            <ThemedView style={styles.notificationContainer}>
                <ThemedText style={styles.profileInfo}>Autoriser la géolocation</ThemedText>
                <TouchableOpacity onPress={toggleAuthorizeGeolocation}>
                    <Icon name="globe" size={30} color={authorizeGeolocation ? "#A53939" : "grey"} />
                </TouchableOpacity>
            </ThemedView>

            <ThemedView style={styles.profilModification}>
                <ThemedButton onPress={() => handleModification()}>Enregistrer les modifications</ThemedButton>
            </ThemedView>
        </ThemedScrollView>
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
        justifyContent: "space-between",
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
    user: {
        height: 85,
        width: 85,
        borderRadius: 50,
        marginRight: 20,
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
    label: {
        color: "#A53939",
        fontWeight: "bold",
    },
    message: {
        color: "#008000",
        fontSize: 20,
        fontWeight: "bold",
    },
    profilModification: {
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 26,
        shadowColor: "#888",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 7,
        fontWeight: "bold",
        margin: 1,
    },
});
