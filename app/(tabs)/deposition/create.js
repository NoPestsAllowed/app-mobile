import React, { useState, useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import ParallaxScrollView from "../../../components/ParallaxScrollView";
import { ThemedText } from "../../../components/ThemedText";
import { ThemedView } from "../../../components/ThemedView";
import { ThemedButton } from "../../../components/ThemedButton";
import { ThemedTextInput } from "../../../components/ThemedTextInput";
import Icon from "react-native-vector-icons/FontAwesome";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import SelectList from "../../../components/SelectList";
import ThemedCheckbox from "../../../components/ThemedCheckbox";
// const { fetchOverpass } = require("../../../modules/overpassApi");

export default function CreateDepositionTab({ navigation }) {
    const [depositionName, setDepositionName] = useState("");
    const [localisation, setLocalisation] = useState("");
    const [ownerEmail, setOwnerEmail] = useState("");
    const [userLocation, setUserLocation] = useState(null);

    const [depoByPicture, setDepoByPicture] = useState(true);
    const [depoByHonnor, setDepoByHonnor] = useState(false);

    const initialLocalisation = {
        latitude: 48.86667,
        longitude: 2.333333,
        latitudeDelta: 0.000922,
        longitudeDelta: 0.000421,
    };
    const [mapLocation, setMapLocation] = useState(initialLocalisation);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === "granted") {
                const location = await Location.watchPositionAsync(
                    {
                        distanceInterval: 10,
                    },
                    (location) => {
                        console.log(location);
                        setUserLocation(location);
                    }
                );
            }
        })();
    }, []);

    useEffect(() => {
        if (userLocation) {
            setMapLocation({
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude,
                latitudeDelta: 0.000922,
                longitudeDelta: 0.000421,
            });
        }
    }, [userLocation]);

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "grey", dark: "#1D3D47" }}
            headerImage={<MapView region={mapLocation} style={{ flex: 1 }}></MapView>}
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title" style={styles.title}>
                    Créer une déposition
                </ThemedText>
            </ThemedView>

            <ThemedTextInput
                onChangeText={(value) => setDepositionName(value)}
                value={depositionName}
                placeholder="Nom de la déposition"
                label="Deposition name"
                style={[styles.profileInfo, styles.input]}
            />

            <ThemedView style={styles.btnContainer}>
                <ThemedButton
                    onPress={() => {
                        setDepoByPicture(true);
                        setDepoByHonnor(false);
                    }}
                    style={[styles.proofBtn, depoByPicture === true ? styles.optionSelected : ""]}
                >
                    J'ai un preuve
                </ThemedButton>

                <ThemedButton
                    onPress={() => {
                        setDepoByPicture(false);
                        setDepoByHonnor(true);
                    }}
                    style={[styles.proofBtn, depoByHonnor ? styles.optionSelected : ""]}
                >
                    Je veux déclarer sur l'honneur
                </ThemedButton>
            </ThemedView>

            {depoByPicture && (
                <>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Open Camera</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Upload images from phone</Text>
                    </TouchableOpacity>
                </>
            )}

            {depoByHonnor && <ThemedCheckbox label="Je déclare sur l'honneur la véracité de ma déposition" />}

            {userLocation && <SelectList userLocation={userLocation} />}

            <ThemedTextInput
                onChangeText={(value) => setOwnerEmail(value)}
                value={ownerEmail}
                placeholder="Email du proprietaire"
                label="Owner email"
                style={[styles.profileInfo, styles.input]}
            />

            <TouchableOpacity style={styles.buttonSubmit}>
                <Text style={styles.submitButton}>Submit</Text>
            </TouchableOpacity>
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
        fontWeight: "800",
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 125,
        top: 50,
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
        color: "#A53939",
        shadowColor: "#888",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 7,
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
    buttonSubmit: {
        backgroundColor: "#fff",
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
    submitButton: {
        color: "#A53939",
        fontSize: 18,
    },
    notifications: {
        fontSize: 18,
        fontStyle: "italic",
    },
    buttonText: {
        color: "#f5f5f5",
        fontSize: 18,
    },
    notificationContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 5,
    },
    // containerMap: {
    //     width: "100%",
    //     height: "20%",
    // },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    proofBtn: {
        width: "40%",
        alignItems: "center",
    },
    optionSelected: {
        backgroundColor: "green",
        border: 2,
        border: "green",
    },
});
