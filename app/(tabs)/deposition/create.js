import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, View, TouchableOpacity, Platform, Image } from "react-native";
import ParallaxScrollView from "../../../components/ParallaxScrollView";
import { ThemedText } from "../../../components/ThemedText";
import { ThemedView } from "../../../components/ThemedView";
import { ThemedButton } from "../../../components/ThemedButton";
import { ThemedTextInput } from "../../../components/ThemedTextInput";
import MapView from "react-native-maps";
import * as Location from "expo-location";
// import { Camera, CameraView } from "expo-camera";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SelectList from "../../../components/SelectList";
import ThemedCheckbox from "../../../components/ThemedCheckbox";
import CameraComponent from "../../../components/CameraComponent";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect, useRouter } from "expo-router";
import {
    addVisualProofToNewDeposition,
    newDeposition,
    clearVisualProofToNewDeposition,
    removeVisualProof,
    clearNewDeposition,
} from "../../../reducers/depositions";
import { Picker } from "@react-native-picker/picker";

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
    const [pestType, setPestType] = useState("");

    const user = useSelector((state) => state.user.value);
    const pictures = useSelector((state) => state.depositions.value.newDeposition.visualProofs);
    // console.log("pictures", pictures);
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

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status === "granted") {
                    let location = await Location.getCurrentPositionAsync({});
                    setUserLocation(location);
                }
            })();
            // let lat = 48.887553;
            // let lon = 2.303709;

            return () => {
                dispatch(clearNewDeposition());
                clearInputs();
            };
        }, [])
    );

    useEffect(() => {
        if (userLocation) {
            // console.log(userLocation);
            setMapLocation({
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude,
                latitudeDelta: 0.000922,
                longitudeDelta: 0.000421,
            });
            // console.log(
            //     `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLocation.coords.latitude},${userLocation.coords.longitude}&radius=1500&key=AIzaSyBgG5sxkZoQYq9mpaX6SJz737Axroga9Ho`
            // );
            // fetch(
            //     `https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=establishment,food&location=${userLocation.coords.latitude},${userLocation.coords.longitude}&radius=1500&key=AIzaSyBgG5sxkZoQYq9mpaX6SJz737Axroga9Ho`
            // )
            //     .then((res) => res.json())
            //     .then((data) => {
            //         console.log(
            //             "gg",
            //             // data
            //             data.results.map((item) => {
            //                 // console.log(item);
            //                 return item.name;
            //             })
            //         );
            //     });
        }
    }, [userLocation]);

    const openCamera = () => {
        setCameraOpen(true);
    };

    const handlePictureTaken = (picture) => {
        setDepoLocation(userLocation);
        setVisualProofs((vproofs) => [...vproofs, picture]);
        dispatch(addVisualProofToNewDeposition(picture));
    };

    const itemSelected = (item) => {
        if (item.tags["contact:email"]) {
            setOwnerEmail(item.tags["contact:email"]);
        } else if (item.tags["email"]) {
            setOwnerEmail(item.tags["email"]);
        }
        setDepoPlace(item);
    };

    if (cameraOpen) {
        return (
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
            pestType: pestType,
        };

        // console.log(deposition);
        const depositionFormData = new FormData();
        for (const key in deposition) {
            if (Object.hasOwnProperty.call(deposition, key) && key !== "visualProofs") {
                if (typeof deposition[key] === "object") {
                    // Faudrait utiliser de la récursion...
                    for (const tag in deposition[key]) {
                        if (Object.hasOwnProperty.call(deposition[key], tag)) {
                            if (typeof deposition[key] === "object") {
                            } else {
                                depositionFormData.append(tag, deposition[key][tag]);
                            }
                        }
                    }
                } else {
                    depositionFormData.append(key, deposition[key]);
                }
            }
        }
        depositionFormData.append("depo", JSON.stringify(deposition));

        visualProofs.map((proof, index) => {
            const photoName = proof.uri?.substring(proof.uri?.lastIndexOf("/") + 1, proof.uri?.length);
            // console.log(proof.uri);
            depositionFormData.append(`visualProofs`, {
                uri: proof.uri,
                name: photoName,
                type: "image/jpeg",
            });
        });
        // console.log("depositionFormData", depositionFormData);
        fetch(`${backendUrl}/depositions/create`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
            body: depositionFormData,
        })
            .then((res) => res.json())
            .then((createDepositionResponse) => {
                if (createDepositionResponse.result) {
                    dispatch(clearNewDeposition());
                    clearInputs();
                    router.replace("/deposition");
                } else {
                    console.error(createDepositionResponse.error);
                }
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
        setPestType("");
    };

    const handlePictureRemoval = (picture) => {
        // console.log("removing", picture);
        setVisualProofs((vproofs) => {
            vproofs.filter((proof) => proof.uri !== picture.uri ?? []);
        });
        dispatch(removeVisualProof(picture));
    };

    const photos = pictures.map((picture, i) => {
        return (
            <View key={i} style={styles.photoContainer}>
                <TouchableOpacity onPress={() => handlePictureRemoval(picture)}>
                    <FontAwesome name="trash" size={20} color="#A53939" style={styles.deleteIcon} />
                </TouchableOpacity>

                <Image source={{ uri: picture.uri }} style={styles.photo} />
            </View>
        );
    });
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
                placeholder="Donner un nom à votre déposition"
                label="Titre"
                style={[styles.profileInfo, styles.input]}
            />

            <ThemedView style={styles.btnContainer}>
                {/* <ThemedButton
                    colored={false}
                    elevated={false}
                    onPress={() => {
                        setDepoByPicture(true);
                        setDepoByHonnor(false);
                    }}
                    style={[styles.proofBtn, depoByPicture ? styles.optionSelected : "", { color: "yellow" }]}
                >
                    <ThemedText style={{ fontWeight: "bold" }}>J'ai une preuve</ThemedText>
                </ThemedButton> */}

                {/* <ThemedButton
                    colored={false}
                    elevated={false}
                    onPress={() => {
                        setDepoByPicture(false);
                        setDepoByHonnor(true);
                    }}
                    style={[styles.proofBtn, depoByHonnor ? styles.optionSelected : ""]}
                >
                    <ThemedText style={{ fontWeight: "bold" }}>Je veux déclarer sur l'honneur</ThemedText>
                </ThemedButton> */}
            </ThemedView>

            {depoByPicture && (
                <ThemedView style={styles.pictureBtn}>
                    <ThemedButton onPress={openCamera} style={styles.button}>
                        <ThemedText style={styles.buttonText}>Ajouter une preuve</ThemedText>
                    </ThemedButton>

                    {/* <ThemedButton style={styles.button} onPress={pickImage}>
                    <ThemedText style={styles.buttonText}>Upload images from phone</ThemedText>
                </ThemedButton> */}
                    {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
                </ThemedView>
            )}

            {depoByHonnor && <ThemedCheckbox label=" Je déclare sur l'honneur la véracité de ma déposition" />}

            {depoLocation && (
                <SelectList
                    userLocation={userLocation}
                    depoLocation={depoLocation}
                    itemSelected={(item) => itemSelected(item)}
                />
                // <Picker
                //     selectedValue={location}
                //     onValueChange={(itemValue, itemIndex) => itemSelected(itemValue)}
                // ></Picker>
            )}

            <ThemedView style={[styles.selectInput, styles.global]}>
                <Picker selectedValue={pestType} onValueChange={(itemValue, itemIndex) => setPestType(itemValue)}>
                    <Picker.Item label="Sélectionner votre nuisible" enabled={false} />
                    <Picker.Item label="Tique" value="tique" />
                    <Picker.Item label="Punaise de lit" value="punaise_de_lit" />
                    <Picker.Item label="Cafard" value="cafard" />
                    <Picker.Item label="Rat" value="rat" />
                    <Picker.Item label="Souris" value="souris" />
                    <Picker.Item label="Puce" value="puce" />
                    <Picker.Item label="Araignée" value="araignee" />
                    <Picker.Item label="Fourmi" value="fourmi" />
                    <Picker.Item label="Mite alimentaire" value="mite_alimentaire" />
                    <Picker.Item label="Punaise des bois" value="punaise_des_bois" />
                    <Picker.Item label="Punaise verte" value="punaise_verte" />
                    <Picker.Item label="Punaise grise" value="punaise_grise" />
                    <Picker.Item label="Chenille processionnaire" value="chenille_processionnaire" />
                    <Picker.Item label="Cloporte" value="cloporte" />
                    <Picker.Item label="Termite" value="termite" />
                    <Picker.Item label="Autres" value="autres" />
                </Picker>
            </ThemedView>

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

            <ThemedView style={styles.photosContainer}>{photos}</ThemedView>
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
        marginVertical: 10,
    },
    profileInfo: {
        // margin: 3,
        fontSize: 18,
    },
    global: {
        borderWidth: 1,
        borderColor: "#0a7ea4",
        borderRadius: 5,
        paddingHorizontal: 10,
        // paddingVertical: 5,
        // marginVertical: 2,
        backgroundColor: "transparent",
    },
    input: {
        marginVertical: 2,
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
        backgroundColor: "#ca8035",
        borderWidth: 3,
        // borderColor: "green",
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
    // galleryContainer: {
    //     flexWrap: "wrap",
    //     flexDirection: "row",
    //     justifyContent: "center",
    // },
    // photoContainer: {
    //     alignItems: "flex-end",
    // },
    photo: {
        margin: 10,
        width: 150,
        height: 150,
    },
    deleteIcon: {
        marginRight: 10,
    },
    photosContainer: {
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
    },
    // selectInput: {
    //     borderColor: "#d1d5db",
    //     borderWidth: 1,
    //     borderRadius: 8,
    //     backgroundColor: "transparent",
    // },
});
