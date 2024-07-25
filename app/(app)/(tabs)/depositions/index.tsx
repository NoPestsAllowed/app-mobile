import { Alert, StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import Map from "@/components/Map";
import { Marker } from "react-native-maps";
import { Link, router, useFocusEffect } from "expo-router";
import moment from "moment";
import { Deposition, DepositionWithVisualProofs } from "@/types";
import { useOIDCAuth } from "@/hooks/useOIDCAuth";
import DepositionOverview from "@/components/deposition/DepositionOverview";
import EmptyState from "@/components/deposition/EmptyState";
import { $t } from "@/lang";

moment.locale("fr");
const backendUrl = process.env.EXPO_PUBLIC_API_URL;

export default function Depositions() {
    const [depositions, setDepositions] = useState([]);
    const { user } = useOIDCAuth();
    // console.log(user);

    useFocusEffect(
        useCallback(() => {
            fetch(`${backendUrl}/users/depositions`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.idToken ?? user.jwtToken}`,
                },
            })
                .then((res) => res.json())
                .then((depositionsResponse) => {
                    // console.log(depositionsResponse.depositions.length);
                    setDepositions(depositionsResponse.depositions);
                });
            return () => {
                console.log("This route is now unfocused.");
            };
        }, [])
    );

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
                Authorization: `Bearer ${user.jwtToken}`,
            },
        })
            .then((res) => res.json())
            .then((depositionsResponse) => {
                // console.log(depositionsResponse.depositions.length);
                setDepositions(depositionsResponse.depositions);
            });
    };

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
            headerImage={
                <Map
                    initialRegion={{
                        latitude: 48.86667,
                        longitude: 2.333333,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    style={{ flex: 1 }}
                >
                    {depositions.length > 0 &&
                        depositions.map((deposition: Deposition) => {
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
                </Map>
            }
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title" style={styles.title}>
                    {$t("strings.myDepositions")}
                </ThemedText>
            </ThemedView>

            <ThemedView style={styles.list}>
                {depositions.length > 0 &&
                    depositions.map((deposition: DepositionWithVisualProofs, index) => {
                        return (
                            <DepositionOverview
                                key={deposition._id}
                                deposition={deposition}
                                deleteDeposition={handleDeleteDeposition}
                            />
                        );
                    })}
            </ThemedView>

            {depositions.length === 0 ? (
                <View style={styles.shadow}>
                    <EmptyState
                        headline={$t("strings.emptyState.noDeposition.headline")}
                        desc={$t("strings.emptyState.noDeposition.desc")}
                    >
                        <ThemedButton
                            style={styles.buttonCreate}
                            textStyle={styles.buttonCreateText}
                            onPress={() => router.navigate("depositions/create")}
                        >
                            {$t("strings.emptyState.noDeposition.btn")}
                        </ThemedButton>
                    </EmptyState>
                </View>
            ) : (
                <ThemedText style={styles.depositionCount}>
                    {$t("strings.myDepositionsCount", { count: depositions.length })}
                </ThemedText>
            )}
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
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
    list: {
        flex: 1,
        rowGap: 12,
    },
    // lineTitle1: {
    //     backgroundColor: " #ca8035",
    //     fontSize: 20,
    //     color: "#470a07",
    //     marginTop: 10,
    // },
    // lineTitle2: {
    //     backgroundColor: " #ca8035",
    //     fontSize: 20,
    //     color: "#470a07",
    // },
    // lineTitle3: {
    //     backgroundColor: " #ca8035",
    //     fontSize: 20,
    //     color: "#470a07",
    //     shadowOpacity: 0.5,
    //     shadowColor: "#7a2307",
    // },
    titleContainer: {
        backgroundColor: " #ca8035",
    },
    title: {
        shadowColor: "#7a2307",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        textAlign: "center",
        marginVertical: 15,
    },
    depositionCount: {
        marginTop: 25,
        textAlign: "center",
    },
    buttonCreate: {
        marginTop: 25,
    },
    buttonCreateText: {
        textAlign: "center",
    },
    shadow: {
        shadowColor: "#7a2307",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
});
