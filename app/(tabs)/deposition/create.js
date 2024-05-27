import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, TouchableOpacity, Platform, Image } from "react-native";
import ParallaxScrollView from "../../../components/ParallaxScrollView";
import { ThemedText } from "../../../components/ThemedText";
import { ThemedView } from "../../../components/ThemedView";
import { ThemedButton } from "../../../components/ThemedButton";
import { ThemedTextInput } from "../../../components/ThemedTextInput";
import MapView from "react-native-maps";
import * as Location from "expo-location";
// import { Camera, CameraView } from "expo-camera";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
import SelectList from "../../../components/SelectList";
import ThemedCheckbox from "../../../components/ThemedCheckbox";
import CameraComponent from "../../../components/CameraComponent";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

const backendUrl = process.env.EXPO_PUBLIC_API_URL;

export default function CreateDepositionTab({ navigation }) {
    const [depositionName, setDepositionName] = useState("");
    const [localisation, setLocalisation] = useState("");
    const [ownerEmail, setOwnerEmail] = useState("");
    const [description, setDescription] = useState("");
    const [userLocation, setUserLocation] = useState(null);

    const [depoLocation, setDepoLocation] = useState(null);
    const [depoPlace, setDepoPlace] = useState(null);

    const [depoByPicture, setDepoByPicture] = useState(true);
    const [depoByHonnor, setDepoByHonnor] = useState(false);
    // const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [cameraOpen, setCameraOpen] = useState(false);

    const [selectedImage, setSelectedImage] = useState(null);
    const [visualProofs, setVisualProofs] = useState([]);

    const user = useSelector((state) => state.user.value);

    const router = useRouter();
    const dispatch = useDispatch();

    const pickImage = async () => {
        if (Platform.OS !== "web") {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                alert("Désolé, nous avons besoin des permissions pour accéder à la galerie!");
                return;
            }
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setSelectedImage(result.uri);
        }
    };

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
                let location = await Location.getCurrentPositionAsync({});
                setUserLocation(location);
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

    // useEffect(() => {
    //     (async () => {
    //         const { status } = await Camera.requestCameraPermissionsAsync();
    //         setHasCameraPermission(status === "granted");
    //     })();
    // }, []);

    const openCamera = () => {
        setCameraOpen(true);
    };

    const handlePictureTaken = (picture) => {
        console.log(picture);
        setDepoLocation(userLocation);
        setVisualProofs((vproofs) => [...vproofs, picture]);
    };

    const itemSelected = (item) => {
        console.log("itemSelected", item);
        if (item.tags["contact:email"]) {
            setOwnerEmail(item.tags["contact:email"]);
        } else if (item.tags["email"]) {
            setOwnerEmail(item.tags["email"]);
        }
        setDepoPlace(item);
    };

    // const takePicture = async () => {
    //     if (cameraRef.current) {
    //         const photo = await cameraRef.current.takePictureAsync();
    //         console.log(photo);
    //         setCameraOpen(false); // Close the camera after taking a picture
    //     }
    // };

    if (cameraOpen) {
        return (
            // <CameraView style={{ flex: 1 }} ref={cameraRef} flashmode={"on"}>
            //     <View style={styles.snapContainer}>
            //         <TouchableOpacity onPress={takePicture}>
            //             <FontAwesome name="circle-thin" size={95} color="#ffffff" />
            //         </TouchableOpacity>
            //     </View>
            // </CameraView>

            <CameraComponent
                closeCamera={() => {
                    console.log("closing cam");
                    setCameraOpen(false);
                }}
                handlePictureTaken={(picture) => handlePictureTaken(picture)}
            />
        );
    }

    const submitDeposition = () => {
        const deposition = {
            name: depositionName,
            description: description,
            placeOwnerEmail: ownerEmail,
            place: depoPlace,
            visualProofs: visualProofs,
        };

        fetch(`${backendUrl}/depositions/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(deposition),
        })
            .then((res) => res.json())
            .then((createDepositionResponse) => {
                console.log("createDepositionResponse", createDepositionResponse);
                clearInputs();
                // Redirect user to deposition/index
                // this does not work:
                // router.navigate("deposition/index");
            })
            .catch((err) => console.error(err));
    };

    const clearInputs = () => {
        setDepositionName("");
        setOwnerEmail("");
        setDescription("");
        // setUserLocation(null);
        setDepoLocation(null);
        setDepoPlace(null);
        setDepoByPicture(true);
        setDepoByHonnor(false);
        setCameraOpen(false);
        setSelectedImage(null);
        setVisualProofs([]);
    };

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "grey", dark: "#1D3D47" }}
            headerImage={<MapView region={mapLocation} style={{ flex: 1 }} />}
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Créer une déposition</ThemedText>
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
                    colored={false}
                    elevated={false}
                    onPress={() => {
                        setDepoByPicture(true);
                        setDepoByHonnor(false);
                    }}
                    style={[styles.proofBtn, depoByPicture ? styles.optionSelected : ""]}
                >
                    J'ai une preuve
                </ThemedButton>

                <ThemedButton
                    colored={false}
                    elevated={false}
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
                <ThemedView style={styles.pictureBtn}>
                    <ThemedButton onPress={openCamera} style={styles.button}>
                        <ThemedText style={styles.buttonText}>Open Camera</ThemedText>
                    </ThemedButton>

                    {/* <ThemedButton style={styles.button} onPress={pickImage}>
                        <ThemedText style={styles.buttonText}>Upload images from phone</ThemedText>
                    </ThemedButton> */}
                    {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
                </ThemedView>
            )}

            {depoByHonnor && <ThemedCheckbox label="Je déclare sur l'honneur la véracité de ma déposition" />}

            {depoLocation && <SelectList depoLocation={depoLocation} itemSelected={(item) => itemSelected(item)} />}

            <ThemedTextInput
                onChangeText={(value) => setOwnerEmail(value)}
                value={ownerEmail}
                placeholder="Owner Email"
                label="Owner Email"
                keyboardType="email-address"
                inputMode="email"
                style={[styles.profileInfo, styles.input]}
            />

            <ThemedTextInput
                onChangeText={(value) => setDescription(value)}
                value={description}
                placeholder="Description"
                label="Description"
                style={[styles.profileInfo, styles.input]}
            />

            <ThemedView style={{ alignItems: "center" }}>
                <ThemedButton onPress={submitDeposition}>Submit</ThemedButton>
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        padding: 16,
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    profileInfo: {
        margin: 3,
        fontSize: 18,
    },
    input: {
        marginVertical: 8,
    },
    snapContainer: {
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
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
        backgroundColor: "#bbf7d0",
        borderWidth: 2,
        borderColor: "green",
    },
    pictureBtn: {
        alignItems: "center",
    },
    button: {
        marginVertical: 10,
    },
    buttonText: {
        color: "#fff",
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
    },
});
