import { Image, StyleSheet, Platform, Alert } from "react-native";
import ParallaxScrollView from "../../../components/ParallaxScrollView";
import { ThemedText } from "../../../components/ThemedText";
import { ThemedView } from "../../../components/ThemedView";
import { Collapsible } from "../../../components/Collapsible";
import { ExternalLink } from "../../../components/ExternalLink";
import { ThemedButton } from "../../../components/ThemedButton";
import { Link, router, useFocusEffect } from "expo-router";
import MapView, { Marker } from "react-native-maps";
import EmptyState from "../../../components/EmptyState";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import DepositionCard from "../../../components/DepositionCard";
import moment from "moment";
import "moment/locale/fr";
import { ThemedButtonEdit } from "../../../components/ThemedButtonEdit";

moment.locale("fr");

const backendUrl = process.env.EXPO_PUBLIC_API_URL;

export default function DepositionTab() {
    const [depositions, setDepositions] = useState([]);
    const user = useSelector((state) => state.user.value);

    useFocusEffect(
        useCallback(() => {
            fetch(`${backendUrl}/users/depositions`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            })
                .then((res) => res.json())
                .then((depositionsResponse) => {
                    console.log(depositionsResponse.depositions.length);
                    setDepositions(depositionsResponse.depositions);
                });
            return () => {
                console.log("This route is now unfocused.");
            };
        }, [])
    );

    const handleDeleteDeposition = (deposition) => {
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
                                Authorization: `Bearer ${user.token}`,
                            },
                            body: JSON.stringify({ depositionId: deposition._id }),
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                if (data.result) {
                                    // Optionally navigate or update state here
                                    console.log("Deposition supprimée");
                                    fetchDepositions();
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

    const fetchDepositions = () => {
        fetch(`${backendUrl}/users/depositions`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        })
            .then((res) => res.json())
            .then((depositionsResponse) => {
                console.log(depositionsResponse.depositions.length);
                setDepositions(depositionsResponse.depositions);
            });
    };

    // useEffect(() => {
    //     fetch(`${backendUrl}/depositions`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${user.token}`,
    //         },
    //     })
    //         .then((res) => res.json())
    //         .then((depositionsResponse) => {
    //             // console.log("here", depositionsResponse);
    //             setDepositions(depositionsResponse.depositions);
    //         });
    // }, []);

    // console.log("depos", depos);
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
            headerImage={
                <MapView
                    initialRegion={{
                        latitude: 48.86667,
                        longitude: 2.333333,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    style={{ flex: 1 }}
                >
                    {depositions.map((deposition) => {
                        return (
                            <Marker
                                key={deposition._id}
                                coordinate={{
                                    latitude: deposition.placeId.geojson.coordinates[0],
                                    longitude: deposition.placeId.geojson.coordinates[1],
                                }}
                                title={deposition.name}
                                description={deposition.description}
                            />
                        );
                    })}
                </MapView>
            }
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title" style={styles.title}>
                    Mes dépositions
                </ThemedText>
            </ThemedView>

            <ThemedView style={styles.nomQuiVeutRienDire}>
                {depositions.length > 0 &&
                    depositions.map((deposition, index) => {
                        return (
                            <ThemedView style={styles.rowContainer} key={deposition._id}>
                                <Link
                                    style={{ marginVertical: 5 }}
                                    key={deposition._id}
                                    href={{
                                        pathname: "/deposition/[id]",
                                        params: { id: deposition._id },
                                    }}
                                >
                                    <ThemedView key={deposition._id} style={{ width: 250 }}>
                                        <ThemedView style={styles.rowContent}>
                                            <ThemedView style={styles.rowTextContainer}>
                                                <ThemedText style={styles.line1}>Déposition: </ThemedText>
                                                <ThemedText style={styles.line2}>{deposition.name}</ThemedText>
                                            </ThemedView>
                                            <ThemedView style={styles.rowTextContainer}>
                                                <ThemedText style={styles.line1}> Adresse: </ThemedText>
                                                <ThemedText style={styles.line2}>
                                                    {deposition.placeId.address}
                                                </ThemedText>
                                            </ThemedView>
                                            <ThemedView style={styles.rowTextContainer}>
                                                <ThemedText style={styles.line1}>Description: </ThemedText>
                                                <ThemedText style={styles.line2}> {deposition.description}</ThemedText>
                                            </ThemedView>
                                            <ThemedView style={styles.rowTextContainer}>
                                                <ThemedText style={styles.line1}>Status: </ThemedText>
                                                <ThemedText
                                                    style={[
                                                        styles.line2,
                                                        {
                                                            fontWeight: "bold",
                                                            color: deposition.status === "accepted" ? "green" : "red",
                                                        },
                                                    ]}
                                                >
                                                    {deposition.status}
                                                </ThemedText>
                                            </ThemedView>
                                        </ThemedView>
                                        <ThemedView style={styles.date}>
                                            <ThemedText>
                                                Déposition faite le :{" "}
                                                {moment(deposition.createdAt).format("DD MMMM YYYY")}
                                            </ThemedText>
                                        </ThemedView>
                                    </ThemedView>
                                </Link>
                                <ThemedView style={styles.actionButtonsContainer}>
                                    {/* <ThemedButtonEdit>Modifier</ThemedButtonEdit> */}
                                    <ThemedButtonEdit onPress={() => handleDeleteDeposition(deposition)}>
                                        Supprimer
                                    </ThemedButtonEdit>
                                </ThemedView>
                            </ThemedView>
                        );
                    })}
            </ThemedView>

            <ThemedView style={styles.rowContainerTable}></ThemedView>

            <ThemedText style={styles.profileInfo}>Vous avez {depositions.length} déposition(s)</ThemedText>
            <ThemedButton style={styles.buttonCreate} onPress={() => router.navigate("deposition/create")}>
                Create deposition
            </ThemedButton>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    rowContainer: {
        backgroundColor: "transparent",
        alignItems: "center",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        shadowColor: "#7a2307",
        shadowOffset: { width: 7, height: 7 },
        shadowOpacity: 0.8,
        elevation: 3,
        marginTop: 10,
    },
    rowContainerTitle: {
        backgroundColor: " #ca8035",
        flexDirection: "row",
        justifyContent: "space-around",
        borderRadius: 5,
        // shadowColor: '#7a2307',
        // shadowOffset: { width: 0, height: 3 },
        // shadowOpacity: 0.5,
        // shadowRadius: 25,
        elevation: 3,
        marginBottom: 10,
    },
    lineTitle1: {
        backgroundColor: " #ca8035",
        fontSize: 20,
        color: "#470a07",
        marginTop: 10,
    },
    lineTitle2: {
        backgroundColor: " #ca8035",
        fontSize: 20,
        color: "#470a07",
    },
    lineTitle3: {
        backgroundColor: " #ca8035",
        fontSize: 20,
        color: "#470a07",
        shadowOpacity: 0.5,
        shadowColor: "#7a2307",
    },
    rowContent: {
        flexDirection: "column",
        flex: 1,
        borderRadius: 25,
        shadowColor: "#7a2307",
        shadowOffset: { width: 0, height: 3 },
        // shadowOpacity: 0.5,
        shadowRadius: 35,
        marginTop: 10,
        backgroundColor: "transparent",
    },
    rowTextContainer: {
        // marginLeft: 5,
        // marginRight: 10,
        marginHorizontal: 5,
        flex: 1,
        // backgroundColor: "white",
        gap: 10,
    },
    actionButtonsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
    },
    line1: {
        fontSize: 18,
        marginRight: 10,
        fontWeight: 500,
        flexWrap: "wrap",
        // marginBottom: 5,
        fontWeight: "bold",
    },
    line2: {
        fontSize: 18,
        // marginLeft: 25,
        // marginRight: 10,
        // color: "black",
        paddingHorizontal: 5,
        paddingVertical: 10,
        flexWrap: "wrap",
        borderWidth: 1,
        borderRadius: 7,
        marginBottom: 5,

        borderColor: "#A53939",
    },
    titleContainer: {
        backgroundColor: " #ca8035",
    },
    title: {
        shadowColor: "#7a2307",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        textAlign: "center",
    },
    date: {
        alignItems: "flex-end",
        marginTop: 20,
    },
    profileInfo: {
        textAlign: "center",
    },
    buttonCreate: {
        marginLeft: 40,
    },
});
