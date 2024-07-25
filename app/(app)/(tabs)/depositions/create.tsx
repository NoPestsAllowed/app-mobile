import React, { useState, useEffect, useRef, useCallback, SetStateAction } from "react";
import { StyleSheet, View, TouchableOpacity, Platform, Image } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import FontAwesome from "@expo/vector-icons/FontAwesome";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
// import SelectList from "@/components/SelectList";
// import ThemedCheckbox from "@/components/ThemedCheckbox";
import CameraComponent from "@/components/CameraComponent";
// import { useDispatch, useSelector } from "react-redux";
// import * as ImagePicker from "expo-image-picker";
import { useFocusEffect, useRouter } from "expo-router";
import { Coordinates, DevicePicture, VisualProof } from "@/types";
import { useOIDCAuth } from "@/hooks/useOIDCAuth";
// import {
//     addVisualProofToNewDeposition,
//     newDeposition,
//     clearVisualProofToNewDeposition,
//     removeVisualProof,
//     clearNewDeposition,
// } from "@/reducers/depositions";
// import { Picker } from "@react-native-picker/picker";
import RNPickerSelect from "react-native-picker-select";
import Map from "@/components/Map";
import { $t } from "@/lang";
import { displayablePests } from "@/services/pests-service";

const backendUrl = process.env.EXPO_PUBLIC_API_URL;

type Tags = {
    [_key: string]: string;
};
type DepoPlace = {
    tags: Tags;
    center: PlaceLocation;
    lat: number;
    lon: number;
};
type PlaceLocation = {
    lat: number;
    lon: number;
    name?: string;
};
type Place = {
    label: string;
    value: string;
    key: string;
    data: {
        id: number;
        lat: number;
        lon: number;
        center?: { lat: number; lon: number };
        tags: { amenity?: string; name?: string; opening_hours: Date | string };
        type: "node" | "relation" | "way";
    };
};

type LocalVisualProof = {
    coords: Location.LocationObjectCoords | undefined;
} & DevicePicture;

export default function CreateDepositionTab() {
    const [depositionName, setDepositionName] = useState("");
    // const [localisation, setLocalisation] = useState("");
    const [ownerEmail, setOwnerEmail] = useState<string>("");
    const [description, setDescription] = useState("");
    const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);

    const [depoLocation, setDepoLocation] = useState<Location.LocationObject | null>(null); // where the pictures are taken.
    const [depoPlace, setDepoPlace] = useState<Place | null>(null); // nwr from overpass
    const [depoPlaceLocation, setDepoPlaceLocation] = useState<PlaceLocation | null>(null);

    const [depoByPicture, setDepoByPicture] = useState(true);
    // const [depoByHonnor, setDepoByHonnor] = useState(false);
    // const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [cameraOpen, setCameraOpen] = useState(false);
    // console.log("camera open ?", cameraOpen);

    const [selectedImage, setSelectedImage] = useState(null);
    const [visualProofs, setVisualProofs] = useState<LocalVisualProof[]>();
    const [pestType, setPestType] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [places, setPlaces] = useState<Place[]>();

    const { user } = useOIDCAuth();
    // const pictures = useSelector((state) => state.depositions.value.newDeposition.visualProofs);
    // console.log("pictures", pictures);
    const router = useRouter();
    // const dispatch = useDispatch();

    // const pickImage = async () => {
    //     if (Platform.OS !== "web") {
    //         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //         if (status !== "granted") {
    //             alert("Désolé, nous avons besoin des permissions pour accéder à la galerie!");
    //             return;
    //         }
    //     }

    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });

    //     if (!result.cancelled) {
    //         setSelectedImage(result.uri);
    //     }
    // };

    const initialLocalisation: Coordinates = {
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
                // console.log("status is ", status);
                if (status === "granted") {
                    // console.log("awaiting location");

                    try {
                        let location = await Location.getCurrentPositionAsync({});
                        console.log(location);

                        setUserLocation(location);
                        // console.log("LOCATION", location);
                    } catch (error) {
                        alert(error);
                    }
                }
            })();
            // let lat = 48.887553;
            // let lon = 2.303709;

            return () => {
                // dispatch(clearNewDeposition());
                setIsSubmitting(false);
                clearInputs();
            };
        }, [])
    );

    useEffect(() => {
        if (userLocation) {
            // console.log("userLocation", userLocation);
            setMapLocation({
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude,
                latitudeDelta: 0.000922,
                longitudeDelta: 0.000421,
            });
        }
    }, [userLocation]);

    const openCamera = () => {
        setCameraOpen(true);
    };

    const handlePictureTaken = (picture: LocalVisualProof) => {
        if (picture) {
            setDepoLocation(userLocation);
            // console.log(userLocation);
            if (!userLocation?.coords) {
                throw new Error("Pictures must be geolocalized");
            }
            // picture as Partial<VisualProof>;
            Object.defineProperty(picture, "coords", { value: userLocation.coords });
            // picture.coords = userLocation.coords;
            // picture;
            // console.log("_________", JSON.stringify(picture, null, 2));

            setVisualProofs((vproofs) => {
                return vproofs ? [...vproofs, picture] : [picture];
            });
            // dispatch(addVisualProofToNewDeposition(picture));
        }
    };

    useEffect(() => {
        if (depoLocation) {
            (async () => {
                const fecthPlace = await fetch(`${backendUrl}/geocoder`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        // Authorization: `Bearer ${user.jwtToken}`,
                    },
                    body: JSON.stringify(depoLocation),
                });
                const fetchedPlace = await fecthPlace.json();

                // console.log("—————— FETCHED PLACES ——————");
                // console.log(fetchedPlace);

                setPlaces((pla) =>
                    fetchedPlace.data.map(
                        (item: { label: string; value: any; key: string; data: any; inputLabel?: string }) => {
                            item.inputLabel = item.label;
                            return item;
                        }
                    )
                );
            })();
        }
    }, [depoLocation]);

    const itemSelected = (item: string) => {
        console.log("item is ", item);
        if (places) {
            const placeObject = places.find((place) => {
                return place.key === item;
            });
            // const place = placeObject.data;
            // console.log("place is", placeObject.data);
            console.log("placeObject is", placeObject);

            if (placeObject && placeObject.data) {
                // @ts-ignore
                if (placeObject.data.tags && placeObject.data.tags["contact:email"]) {
                    // @ts-ignore
                    setOwnerEmail((email) => placeObject.data.tags["contact:email"]);
                    // @ts-ignore
                } else if (placeObject.data.tags && placeObject.data.tags["email"]) {
                    // @ts-ignore
                    setOwnerEmail(placeObject.data.tags["email"]);
                }
                setDepoPlace(placeObject);
                console.log(
                    "place.center",
                    placeObject.data.center,
                    placeObject.data.center
                        ? { lat: placeObject.data.center.lat, lon: placeObject.data.center.lon }
                        : { lat: placeObject.data.lat, lon: placeObject.data.lon }
                );
                setDepoPlaceLocation(
                    placeObject.data.center && placeObject.data.center.lat && placeObject.data.center.lon
                        ? { lat: placeObject.data.center.lat, lon: placeObject.data.center.lon }
                        : { lat: placeObject.data.lat, lon: placeObject.data.lon }
                );
            }
        }
    };

    if (cameraOpen) {
        console.log("it's open!");

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
        setIsSubmitting(true);
        // console.log(deposition);
        const depositionFormData = new FormData();
        for (const key in deposition) {
            if (Object.hasOwnProperty.call(deposition, key) && key !== "visualProofs") {
                // @ts-ignore
                if (typeof deposition[key] === "object") {
                    // Faudrait utiliser de la récursion...
                    // @ts-ignore
                    for (const tag in deposition[key]) {
                        // @ts-ignore
                        if (Object.hasOwnProperty.call(deposition[key], tag)) {
                            // @ts-ignore
                            if (typeof deposition[key] === "object") {
                            } else {
                                // @ts-ignore
                                depositionFormData.append(tag, deposition[key][tag]);
                            }
                        }
                    }
                } else {
                    // @ts-ignore
                    depositionFormData.append(key, deposition[key]);
                }
            }
        }
        depositionFormData.append("depo", JSON.stringify(deposition));

        if (visualProofs) {
            visualProofs.map((proof, index) => {
                const photoName = proof.uri?.substring(proof.uri?.lastIndexOf("/") + 1, proof.uri?.length);
                console.log("proof.coords", proof.coords);
                // @ts-ignore
                depositionFormData.append(`visualProofs`, {
                    uri: proof.uri,
                    name: photoName,
                    type: "image/jpeg",
                    // coords: proof.coords,
                });

                depositionFormData.append(
                    `visualProofsMeta`,
                    JSON.stringify({
                        name: photoName,
                        coords: proof.coords,
                    })
                );
            });
        }

        console.log(user);

        // console.log("depositionFormData", depositionFormData);
        fetch(`${backendUrl}/depositions/create`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.jwtToken}`,
            },
            body: depositionFormData,
        })
            .then((res) => res.json())
            .then((createDepositionResponse) => {
                if (createDepositionResponse.result) {
                    setIsSubmitting(false);
                    // dispatch(clearNewDeposition());
                    clearInputs();
                    router.replace("/depositions");
                } else {
                    setIsSubmitting(false);
                    console.error(createDepositionResponse.error);
                }
            })
            .catch((err) => {
                setIsSubmitting(false);
                console.error(err);
            });
    };

    const clearInputs = () => {
        setDepositionName("");
        setOwnerEmail("");
        setDescription("");
        // setUserLocation(null);
        setDepoLocation(null);
        setDepoPlace(null);
        setDepoPlaceLocation(null);
        setDepoByPicture(true);
        // setDepoByHonnor(false);
        setCameraOpen(false);
        setSelectedImage(null);
        setVisualProofs([]);
        setPestType("");
    };

    const handlePictureRemoval = (picture: { uri: string }) => {
        // console.log("removing", picture);
        setVisualProofs((vproofs) => {
            return vproofs ? vproofs.filter((proof) => proof.uri !== picture.uri) : [];
        });
        setDepoPlace(null);
        setDepoLocation(null);
        // dispatch(removeVisualProof(picture));
    };

    const photos = visualProofs
        ? visualProofs.map((picture, i: number) => {
              return (
                  <View key={i} style={styles.photoContainer}>
                      <TouchableOpacity onPress={() => handlePictureRemoval(picture)}>
                          <FontAwesome name="trash" size={20} color="#A53939" style={styles.deleteIcon} />
                      </TouchableOpacity>

                      <Image source={{ uri: picture.uri }} style={styles.photo} />
                  </View>
              );
          })
        : [];

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "grey", dark: "#1D3D47" }}
            headerImage={
                <Map region={mapLocation} style={{ flex: 1 }}>
                    {userLocation && (
                        <Marker
                            key="userLocation"
                            coordinate={{
                                latitude: userLocation.coords.latitude,
                                longitude: userLocation.coords.longitude,
                            }}
                            // title={`${user.firstname} location`}
                            pinColor={"teal"}
                        />
                    )}
                </Map>
            }
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">{$t("strings.createDeposition")}</ThemedText>
            </ThemedView>

            <ThemedTextInput
                onChangeText={setDepositionName}
                value={depositionName}
                placeholder={$t("forms.fields.title.placeholder")}
                label={$t("forms.fields.title.label")}
                // keyboardType="default"
                // inputMode="text"
                // autoCorrect={false}
                style={[styles.global, styles.input]}
            />

            {/* <ThemedView style={styles.btnContainer}>
                <ThemedButton
                    colored={false}
                    elevated={false}
                    onPress={() => {
                        setDepoByPicture(true);
                        setDepoByHonnor(false);
                    }}
                    style={[styles.proofBtn, depoByPicture ? styles.optionSelected : "", { color: "yellow" }]}
                >
                    <ThemedText style={{ fontWeight: "bold" }}>J'ai une preuve</ThemedText>
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
                    <ThemedText style={{ fontWeight: "bold" }}>Je veux déclarer sur l'honneur</ThemedText>
                </ThemedButton>
            </ThemedView> */}

            <ThemedView style={styles.inputBlock}>
                <ThemedText>{$t("forms.fields.selectPestType.label")}</ThemedText>
                <ThemedView style={[styles.selectInput, styles.global]}>
                    <RNPickerSelect
                        style={pickerSelectStyles}
                        value={pestType}
                        onValueChange={(itemValue) => setPestType(itemValue)}
                        items={displayablePests()}
                        placeholder={$t("forms.fields.selectPestType.placeholder")}
                    />
                </ThemedView>
            </ThemedView>

            {depoByPicture && (
                <ThemedView style={styles.pictureBtn}>
                    <ThemedButton onPress={openCamera} style={styles.button}>
                        <ThemedText style={styles.buttonText}>{$t("forms.fields.addProof.label")}</ThemedText>
                    </ThemedButton>

                    {/* <ThemedButton style={styles.button} onPress={pickImage}>
                    <ThemedText style={styles.buttonText}>Upload images from phone</ThemedText>
                </ThemedButton> */}
                    {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
                </ThemedView>
            )}

            {/* {depoByHonnor && <ThemedCheckbox label=" Je déclare sur l'honneur la véracité de ma déposition" />} */}

            {places && (
                <ThemedView style={styles.inputBlock}>
                    <ThemedText>{$t("forms.fields.selectPlace.label")}</ThemedText>
                    <ThemedView style={[styles.selectInput, styles.global]}>
                        <RNPickerSelect
                            style={pickerSelectStyles}
                            // value={location}
                            onValueChange={(itemValue) => itemSelected(itemValue)}
                            items={places}
                            itemKey="label"
                            placeholder={$t("forms.fields.selectPlace.placeholder")}
                        />
                    </ThemedView>
                </ThemedView>
                // <SelectList
                //     userLocation={userLocation}
                //     depoLocation={depoLocation}
                //     itemSelected={(item) => itemSelected(item)}
                // />
                // <Picker
                //     selectedValue={location}
                //     onValueChange={(itemValue, itemIndex) => itemSelected(itemValue)}
                // ></Picker>
            )}

            <ThemedTextInput
                onChangeText={(value) => setOwnerEmail(value)}
                value={ownerEmail}
                placeholder={$t("forms.fields.ownerEmail.placeholder")}
                label={$t("forms.fields.ownerEmail.label")}
                keyboardType="email-address"
                inputMode="email"
                // textContentType="emailAddress"
                style={[styles.global, styles.input]}
            />

            <ThemedTextInput
                onChangeText={(value) => setDescription(value)}
                value={description}
                placeholder={$t("forms.fields.desc.label")}
                label={$t("forms.fields.desc.label")}
                multiline={true}
                numberOfLines={4}
                style={[styles.global, styles.input]}
            />

            <ThemedView style={styles.photosContainer}>{photos}</ThemedView>
            <ThemedView style={{ alignItems: "center" }}>
                {isSubmitting === false ? (
                    <ThemedButton onPress={submitDeposition}>{$t("forms.buttons.send")}</ThemedButton>
                ) : (
                    <ThemedText>{$t("forms.waitingState.sendingDeposition")}</ThemedText>
                )}
            </ThemedView>
        </ParallaxScrollView>
    );
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        // borderWidth: 1,
        // borderColor: "#0a7ea4",
        // borderRadius: 4,
        color: "black",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        // borderColor: "#0a7ea4",
        // borderRadius: 8,
        // color: "black",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

const styles = StyleSheet.create({
    picker: {
        paddingHorizontal: 20,
        // height: 125,
    },
    inputBlock: {
        marginBottom: 25,
    },
    titleContainer: {
        padding: 16,
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 10,
    },
    global: {
        borderWidth: 1,
        borderColor: "#0a7ea4",
        borderRadius: 5,
        paddingHorizontal: 10,
        // paddingVertical: 8,
        backgroundColor: "transparent",
    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: 12,
    },
    // snapContainer: {
    //     flex: 1,
    //     backgroundColor: "transparent",
    //     justifyContent: "flex-end",
    //     alignItems: "center",
    // },
    // controls: {
    //     flexDirection: "row",
    //     justifyContent: "space-between",
    //     width: "100%",
    //     paddingHorizontal: 20,
    //     paddingBottom: 20,
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
    photoContainer: {
        alignItems: "flex-end",
    },
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
    selectInput: {
        // borderColor: "#d1d5db",
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: "transparent",
    },
});
