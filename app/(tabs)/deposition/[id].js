import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, ActivityIndicator, View } from "react-native";
import ParallaxScrollView from "../../../components/ParallaxScrollView";
import { ThemedText } from "../../../components/ThemedText";
import { ThemedView } from "../../../components/ThemedView";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useLocalSearchParams, useGlobalSearchParams, Link } from "expo-router";
import { useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import moment from "moment";
import { router } from "expo-router";
import { ThemedButton } from "../../../components/ThemedButton";

const backendUrl = process.env.EXPO_PUBLIC_API_URL;

export default function DepositionDetail() {
    const { id } = useLocalSearchParams();
    const user = useSelector((state) => state.user.value);
    // console.log("here", id);
    const [deposition, setDeposition] = useState(null);
    console.log("dep", deposition);

    useEffect(() => {
        fetch(`${backendUrl}/depositions/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log("////////");
                // console.log(data.deposition.placeId);
                setDeposition(data.deposition);
            })
            .catch((err) => console.log(err));
        return () => {
            setDeposition(null);
        };
    }, [id]);

    if (!deposition) {
        return (
            <ThemedView style={styles.loadingContainer}>
                <ActivityIndicator size={75} color="#9f4634" />
            </ThemedView>
        );
    }
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
            headerImage={
                <MapView
                    initialRegion={{
                        latitude: deposition.placeId.geojson.coordinates[0],
                        longitude: deposition.placeId.geojson.coordinates[1],
                        latitudeDelta: 0.000922,
                        longitudeDelta: 0.000421,
                    }}
                    style={{ flex: 1 }}
                >
                    <Marker
                        key={deposition.id}
                        coordinate={{
                            latitude: deposition.placeId.geojson.coordinates[0],
                            longitude: deposition.placeId.geojson.coordinates[1],
                        }}
                        title={deposition.name}
                        description={deposition.description}
                    />
                </MapView>
            }
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">{deposition.name}</ThemedText>
            </ThemedView>
            <ThemedView>
                <ThemedText>Created at: {moment(deposition.createdAt).format("L")}</ThemedText>
                <ThemedText>Type: {deposition.type}</ThemedText>
                <ThemedText>Status: {deposition.status}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.rowContainer}>
                <ThemedText>{deposition.description}</ThemedText>
            </ThemedView>

            {deposition.visualProofs.length > 0 && (
                <ThemedView style={styles.photosContainer}>
                    {deposition.visualProofs.map((visualProof, index) => {
                        console.log(visualProof);
                        return (
                            <View key={index} style={styles.photoContainer}>
                                {/* <TouchableOpacity onPress={() => handlePictureRemoval(visualProof)}>
                                    <FontAwesome name="times" size={20} color="#000000" style={styles.deleteIcon} />
                                </TouchableOpacity> */}

                                <Image source={{ uri: visualProof.url }} style={styles.photo} />
                                <ThemedButton onPress={() => router.navigate("deposition/mydepositions")}>
                                    Retour
                                </ThemedButton>
                            </View>
                        );
                    })}
                </ThemedView>
            )}
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
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
    photo: {
        margin: 10,
        width: 150,
        height: 150,
        // borderWidth: 2,
        // borderColor: "#ca8035",
    },
    photosContainer: {
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
    },
    photoContainer: {
        alignItems: "flex-end",
    },
});
