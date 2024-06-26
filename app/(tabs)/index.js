import React, { useState, useCallback } from "react";
import { StyleSheet, Platform, Image, View } from "react-native";
import ParallaxScrollView from "../../components/ParallaxScrollView";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";
import { ThemedButton } from "../../components/ThemedButton";
import { useSession } from "../../hooks/useSession";
import MapView, { Marker } from "react-native-maps";
import Ant from "../../components/Ant";
import { router, useFocusEffect } from "expo-router";
import SearchPlace from "../../components/SearchPlace";
import { SafetyButton } from "../../components/SafetyButton";

const backendUrl = process.env.EXPO_PUBLIC_API_URL;

export default function HomeTab() {
    const [depositions, setDepositions] = useState([]);
    const [lastDepositionCount, setLastDepositionCount] = useState(0);
    useFocusEffect(
        useCallback(() => {
            fetch(`${backendUrl}/depositions`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((depositionsResponse) => {
                    setDepositions(depositionsResponse.depositions);
                });

            fetch(`${backendUrl}/depositions/last-day`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((LastDepositionResponse) => {
                    setLastDepositionCount(LastDepositionResponse.depositions.length);
                });
            return () => {
                console.log("This route is now unfocused.");
            };
        }, [])
    );

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "grey", dark: "#1D3D47" }}
            headerImage={
                <View style={styles.mapContainer}>
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
                    <Ant
                        path={[
                            { x: 0, y: 0 },
                            { x: 100, y: 150 },
                            { x: 200, y: 50 },
                            { x: 300, y: 300 },
                            { x: 50, y: 400 },
                        ]}
                        duration={10000}
                        delay={0}
                    />
                    <Ant
                        path={[
                            { x: 300, y: 400 },
                            { x: 200, y: 300 },
                            { x: 100, y: 200 },
                            { x: 0, y: 100 },
                            { x: 300, y: 0 },
                        ]}
                        duration={12000}
                        delay={2000}
                    />
                    <Ant
                        path={[
                            { x: 150, y: 0 },
                            { x: 150, y: 150 },
                            { x: 150, y: 300 },
                            { x: 150, y: 450 },
                        ]}
                        duration={8000}
                        delay={1000}
                    />
                </View>
            }
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Bienvenue</ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <SearchPlace />
            </ThemedView>
            {/* <ThemedView style={styles.home}>
                <ThemedText type="subtitle">Vérifier ma localisation</ThemedText>

                <SafetyButton />
            </ThemedView> */}
            <ThemedView style={styles.home}>
                {/* <ThemedView style={styles.alertContainer}> */}
                <Image source={require("../../assets/images/alert.png")} style={styles.alertLogo} />
                <ThemedText type="subtitle" style={styles.alert}>
                    ALERT!
                </ThemedText>
                {/* </ThemedView> */}
                <ThemedText style={styles.paragraph}>
                    <ThemedText type="defaultSemiBold" style={styles.firstWord}>
                        {lastDepositionCount}
                    </ThemedText>{" "}
                    rapports d'insectes ont été ajoutés au cours des dernières 24 heures !
                </ThemedText>
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
    },
    welcomeText: {
        marginRight: 25,
        fontSize: 25,
        color: "#A53939",
        paddingHorizontal: 2,
        flexDirection: "column",
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
    buttonText: {
        color: "#A53939",
        fontSize: 18,
        textDecorationLine: "underline",
    },
    stepContainerlast: {
        gap: 8,
        marginBottom: 5,
        flexDirection: "column",
        alignItems: "center",
    },
    paragraph: {
        paddingLeft: 5,
    },
    alertContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 2,
    },
    alert: {
        marginLeft: 28,
        color: "#7a2307",
        fontSize: 20,
        fontWeight: 800,
    },
    alertLogo: {
        height: 50,
        width: 50,
    },
    firstWord: {
        marginLeft: 25,
        color: "#7a2307",
        fontSize: 20,
    },
    mapContainer: {
        flex: 1,
    },
    home: {
        alignItems: "center",
        justifyContent: "center",
    },
    titleContainer: {
        alignItems: "center",
    },
});
