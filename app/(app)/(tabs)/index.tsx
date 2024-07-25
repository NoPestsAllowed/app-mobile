import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import Map from "@/components/Map";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ApiDepositionResponse, Deposition } from "@/types";
import { Marker } from "react-native-maps";
import ConnectButton from "@/components/ConnectButton";
import { useFocusEffect } from "expo-router";
import { useOIDCAuth } from "@/hooks/useOIDCAuth";
import { $t } from "@/lang";

const backendUrl = process.env.EXPO_PUBLIC_API_URL;

export default function index() {
    const [depositions, setDepositions] = useState<Deposition[]>();
    const [lastDepositionCount, setLastDepositionCount] = useState(0);
    const { user } = useOIDCAuth();

    useFocusEffect(
        useCallback(() => {
            getDepositions();
            return () => {
                console.log("This route is now unfocused.");
            };
        }, [])
    );

    const getDepositions = async () => {
        const depositionsResponse = await fetch(`${backendUrl}/users/depositions`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.idToken ?? user.jwtToken}`,
            },
        });
        const { depositions }: ApiDepositionResponse = await depositionsResponse.json();
        // console.log("depositions", depositions);

        setDepositions(depositions);

        const depositionsLastDayResponse = await fetch(`${backendUrl}/depositions/last-day`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const { depositions: depositionsLastDay }: ApiDepositionResponse = await depositionsLastDayResponse.json();
        // console.log("depositionsLastDayResponse", depositionsLastDay);
        setLastDepositionCount(depositionsLastDay ? depositionsLastDay.length : 0);
    };

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
                        {$t("strings.noPestsDescription")}
                    </ThemedText>
                </ThemedView>

                <ThemedText style={styles.paragraph}>
                    {$t("strings.depoLast24", { count: lastDepositionCount })}
                </ThemedText>
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
    appName: {
        fontFamily: "Boogaloo",
    },
    subtitle: {
        color: "#38434D",
        lineHeight: 36,
    },
    paragraph: {
        width: "80%",
        marginBottom: 24,
        marginHorizontal: "auto",
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
});
