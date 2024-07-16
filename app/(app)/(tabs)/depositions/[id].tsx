import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, ActivityIndicator, View, Alert } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useLocalSearchParams, useGlobalSearchParams, Link } from "expo-router";
// import { useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import moment from "moment";
import { router } from "expo-router";
import { ThemedButton } from "@/components/ThemedButton";
import { Deposition, DepositionWithVisualProofs } from "@/types";
import { useOIDCAuth } from "@/hooks/useOIDCAuth";
// import { ThemedButtonEdit } from "@/components/ThemedButtonEdit";

const backendUrl = process.env.EXPO_PUBLIC_API_URL;

export default function DepositionDetail() {
    const { id } = useLocalSearchParams();
    // const user = useSelector((state) => state.user.value);
    const { user } = useOIDCAuth();
    // console.log("here", id);
    const [deposition, setDeposition] = useState<DepositionWithVisualProofs | null>(null);
    console.log("dep", deposition);

    const handleDeleteDeposition = (deposition: Deposition) => {
        Alert.alert(
            "Confirmation",
            "Êtes-vous sûr de vouloir supprimer votre déposition ?",
            [
                {
                    text: "Annuler",
                    style: "cancel",
                },
                {
                    text: "Supprimer",
                    onPress: () => {
                        fetch(`${backendUrl}/depositions/delete`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${user.jwtToken}`,
                            },
                            body: JSON.stringify({ depositionId: deposition._id }),
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                if (data.result) {
                                    router.navigate("depositions/index");
                                    // Optionally navigate or update state here
                                    console.log("Deposition supprimée");
                                } else {
                                    console.error(data.error);
                                }
                            })
                            .catch((error) => {
                                console.error("Error:", error);
                            });
                    },
                },
            ],
            { cancelable: true }
        );
    };

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
            <ThemedView style={styles.card}>
                <ThemedView style={styles.headerContainer}>
                    <ThemedText type="title">{deposition.name}</ThemedText>
                    <ThemedText> {deposition.type}</ThemedText>
                </ThemedView>

                <ThemedView style={styles.content}>
                    <ThemedView style={styles.subHeader}>
                        <ThemedText>
                            Créée le:{" "}
                            <ThemedText style={styles.bold}>{moment(deposition.createdAt).format("L")}</ThemedText>
                        </ThemedText>
                        {/* <ThemedView style={styles.detailBlock}> */}
                        <ThemedText>
                            <ThemedText style={{ color: deposition.status === "rejected" ? "red" : "green" }}>
                                {deposition.status}
                            </ThemedText>
                        </ThemedText>
                        {/* </ThemedView> */}
                    </ThemedView>

                    <ThemedView style={styles.detailBlock}>
                        {deposition.placeId.address && (
                            <ThemedText numberOfLines={1} style={styles.detailContent}>
                                {deposition.placeId.address}
                            </ThemedText>
                        )}
                    </ThemedView>
                    <ThemedView style={styles.separator}></ThemedView>
                    <ThemedView style={styles.detailBlock}>
                        <ThemedText style={styles.detailTitle}>Description: </ThemedText>
                        <ThemedText style={styles.detailContent}>{deposition.description}</ThemedText>
                    </ThemedView>

                    <ThemedView style={styles.separator}></ThemedView>
                    <ThemedView style={styles.detailBlock}>
                        <ThemedText style={styles.detailTitle}>Preuves: </ThemedText>
                        {deposition.visualProofs.length > 0 && (
                            <ThemedView style={[styles.photosContainer, styles.detailContent]}>
                                {deposition.visualProofs.map((visualProof, index) => {
                                    console.log(visualProof);
                                    return (
                                        <ThemedView key={index}>
                                            <Image source={{ uri: visualProof.url }} style={styles.photo} />
                                        </ThemedView>
                                    );
                                })}
                            </ThemedView>
                        )}
                    </ThemedView>
                </ThemedView>
                <ThemedView style={styles.actionContainer}>
                    <ThemedButton style={styles.actionBtn} onPress={() => handleDeleteDeposition(deposition)}>
                        Supprimer
                    </ThemedButton>
                    {/* <ThemedButton style={styles.actionBtn} onPress={() => router.navigate("/depositions")}>
                        Retour
                    </ThemedButton> */}
                </ThemedView>
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "baseline",
        justifyContent: "space-between",
        // gap: 8,
        marginBottom: 0,
    },
    content: {
        // alignItems: "flex-start",
    },
    bold: {
        fontWeight: "bold",
    },
    subHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        // marginTop: -10,
        marginBottom: 15,
    },
    separator: {
        borderTopWidth: 1,
        width: "90%",
        marginHorizontal: "auto",
        marginVertical: 25,
    },
    detailBlock: {
        // marginTop: 25,
        // flexDirection: "row",
        // alignItems: "center",
    },
    detailTitle: {
        fontWeight: "bold",
    },
    detailContent: {
        paddingStart: 15,
    },
    photo: {
        margin: 10,
        width: 100,
        height: 100,
    },
    photosContainer: {
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        // justifyContent: "center",
    },
    actionContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 45,
        // alignItems: "center",
    },
    actionBtn: {
        width: "40%",
    },
    // supprimer: {
    //     color: "ca8035",
    // },
});
