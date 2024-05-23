import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import ParallaxScrollView from "../../../components/ParallaxScrollView";
import { ThemedText } from "../../../components/ThemedText";
import { ThemedView } from "../../../components/ThemedView";
import { ThemedButton } from "../../../components/ThemedButton";
import { ThemedTextInput } from "../../../components/ThemedTextInput";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { Camera, CameraView } from "expo-camera";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SelectList from "../../../components/SelectList";
import ThemedCheckbox from "../../../components/ThemedCheckbox";
// const { fetchOverpass } = require("../../../modules/overpassApi");

export default function CreateDepositionTab({ navigation }) {
    const [depositionName, setDepositionName] = useState("");
    const [localisation, setLocalisation] = useState("");
    const [ownerEmail, setOwnerEmail] = useState("");
    const [description, setDescription] = useState("");
    const [userLocation, setUserLocation] = useState(null);

    const [depoByPicture, setDepoByPicture] = useState(true);
    const [depoByHonnor, setDepoByHonnor] = useState(false);
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [cameraOpen, setCameraOpen] = useState(false);

    const cameraRef = useRef(null);

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
                Location.watchPositionAsync(
                    {
                        distanceInterval: 10,
                    },
                    (location) => {
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

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(status === 'granted');
        })();
    }, []);

    const openCamera = () => {
        setCameraOpen(true);
    };

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            console.log(photo);
            setCameraOpen(false); // Close the camera after taking a picture
        }
    };


    if (cameraOpen && hasCameraPermission) {
        return (
            <CameraView style={{ flex: 1 }} ref={cameraRef} flashmode={"on"}>
                <View style={styles.snapContainer}>
                    <TouchableOpacity onPress={takePicture}>
                        <FontAwesome name="circle-thin" size={95} color="#ffffff" />
                    </TouchableOpacity>

                </View>
            </CameraView>
        );
    }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "grey", dark: "#1D3D47" }}
            headerImage={<MapView region={mapLocation} style={{ flex: 1 }} />}
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title" style={styles.title}>
                    Create Deposition
                </ThemedText>
            </ThemedView>

            <ThemedTextInput
                onChangeText={(value) => setDepositionName(value)}
                value={depositionName}
                placeholder="Deposition Name"
                label="Deposition Name"
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
                placeholder="Owner Email"
                label="Owner Email"
                style={[styles.profileInfo, styles.input]}
            />

            <ThemedTextInput
                onChangeText={(value) => setDescription(value)}
                value={description}
                placeholder="Description"
                label="Description"
                style={[styles.profileInfo, styles.input]}
            />

            <ThemedButton onPress={openCamera}>Open Camera</ThemedButton>
            <ThemedButton>Upload Images from Phone</ThemedButton>
            <ThemedButton onPress={() => navigation.goBack()}>Logout</ThemedButton>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        padding: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    profileInfo: {
        margin: 16,
    },
    input: {
        marginVertical: 8,
    },
    snapContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
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
