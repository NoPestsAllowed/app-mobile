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
import {useDispatch , useSelector } from "react-redux";
import {updatePhoto} from "../../../reducers/user";

export default function CreateDepositionTab({ navigation }) {
    const [depositionName, setDepositionName] = useState("");
    const [localisation, setLocalisation] = useState("");
    const [ownerEmail, setOwnerEmail] = useState("");
    const [description, setDescription] = useState("");
    const [userLocation, setUserLocation] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [cameraOpen, setCameraOpen] = useState(false);

  
    let cameraRef = useRef(null);

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

    const myPhoto = useSelector((state) => state.user.value.photo);
    const [photo, setPhoto] = useState({});
    const dispatch = useDispatch();
    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            dispatch(updatePhoto(photo?.uri));
            console.log(photo);
            setCameraOpen(false); // Close the camera after taking a picture
        }
    };


    if (cameraOpen && hasCameraPermission) {
        return (
            <CameraView style={{ flex: 1 }} ref={cameraRef} >
                <View style={styles.snapContainer}>
                    <TouchableOpacity onPress={() => takePicture()}  onChangeText={(value) => setPhoto(value)} value={photo}>
                        <FontAwesome name="circle-thin" size={95} color="#ffffff" />
                    </TouchableOpacity>
                    <View style={styles.controls}>

                    </View>
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

            <ThemedTextInput
                onChangeText={(value) => setLocalisation(value)}
                value={localisation}
                placeholder="Location"
                label="Location"
                style={[styles.profileInfo, styles.input]}
            />

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
});
