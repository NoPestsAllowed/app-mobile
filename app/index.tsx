import { SafeAreaView, StyleSheet } from "react-native";
import React, { useCallback, useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link, useFocusEffect } from "expo-router";
import Map from "@/components/Map";
import { Marker } from "react-native-maps";
import { ApiDepositionResponse, Deposition } from "@/types";
import { useOIDCAuth } from "@/hooks/useOIDCAuth";
import ConnectButton from "@/components/ConnectButton";
import * as SecureStore from "expo-secure-store";

const backendUrl = process.env.EXPO_PUBLIC_API_URL;

export default function IndexPage() {
    const [depositions, setDepositions] = useState<Deposition[]>();
    const [lastDepositionCount, setLastDepositionCount] = useState(0);
    const [totokeken, setTotokeken] = useState<string | null>();
    useFocusEffect(
        useCallback(() => {
            getDepositions();
            return () => {
                console.log("This route is now unfocused.");
            };
        }, [])
    );

    const getDepositions = async () => {
        const depositionsResponse = await fetch(`${backendUrl}/depositions`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const { depositions }: ApiDepositionResponse = await depositionsResponse.json();
        console.log("depositions", depositions);

        setDepositions(depositions);

        const depositionsLastDayResponse = await fetch(`${backendUrl}/depositions/last-day`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const { depositions: depositionsLastDay }: ApiDepositionResponse = await depositionsLastDayResponse.json();
        console.log("depositionsLastDayResponse", depositionsLastDay);
        setLastDepositionCount(depositionsLastDay ? depositionsLastDay.length : 0);
    };

    const { isLoggedIn, user } = useOIDCAuth();

    return (
        <SafeAreaView style={styles.container}>
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
                    >
                        {depositions &&
                            depositions.length > 0 &&
                            depositions.map((deposition) => {
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
                <ThemedView>
                    <ThemedText style={styles.appName} type="title">
                        NoPestsAllowed
                    </ThemedText>
                    <ThemedText style={styles.subtitle} type="subtitle">
                        The application to make deposition against location infested by pests.
                    </ThemedText>
                </ThemedView>

                {isLoggedIn && (
                    <ThemedView style={styles.btnContainer}>
                        <Link href="(tabs)/private" style={styles.btn}>
                            <ThemedText type="link">Private</ThemedText>
                        </Link>
                    </ThemedView>
                )}

                <ThemedView style={styles.btnContainer}>
                    <ConnectButton style={styles.btn} />
                </ThemedView>

                <ThemedText style={styles.paragraph}>
                    <ThemedText type="defaultSemiBold">{lastDepositionCount}</ThemedText> rapports d'insectes ont été
                    ajoutés au cours des dernières 24 heures !
                </ThemedText>

                <ThemedView style={styles.footerLink}>
                    <Link href="/legal-notice">
                        <ThemedText type="link">Mentions legales</ThemedText>
                    </Link>
                    <Link href="/contact-us">
                        <ThemedText type="link">Contact</ThemedText>
                    </Link>
                </ThemedView>
            </ParallaxScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    applicationHeadline: {
        backgroundColor: "transparent",
        alignItems: "center",
    },
    appName: {
        fontFamily: "Boogaloo",
    },
    subtitle: {
        // fontSize: 36,
        color: "#38434D",
        lineHeight: 36,
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "transparent",
        marginTop: 50,
    },
    btn: {
        borderColor: "#cbd5e1",
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    paragraph: {
        // width: "80%",
        marginBottom: 24,
        marginHorizontal: "auto",
    },
    footerLink: {
        backgroundColor: "transparent",
        paddingVertical: 8,
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
