import { Link, useFocusEffect } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { ThemedText } from "../components/ThemedText";
import { useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import { useCallback, useState } from "react";
import { ThemedView } from "../components/ThemedView";

const backendUrl = process.env.EXPO_PUBLIC_API_URL;

export default function LandingPage() {
    const [depositions, setDepositions] = useState([]);
    useFocusEffect(
        useCallback(() => {
            fetch(`${backendUrl}/depositions`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${user.token}`,
                },
            })
                .then((res) => res.json())
                .then((depositionsResponse) => {
                    setDepositions(depositionsResponse.depositions);
                });
            return () => {
                console.log("This route is now unfocused.");
            };
        }, [])
    );

    return (
        <View style={styles.container}>
            <MapView
                initialRegion={{
                    latitude: 48.86667,
                    longitude: 2.333333,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                style={{ flex: 1, width: "100%" }}
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
            <View style={styles.main}>
                <ThemedView style={styles.applicationHeadline}>
                    <ThemedText style={styles.appName} type="title">
                        NoPestsAllowed
                    </ThemedText>
                    <ThemedText style={styles.subtitle} type="subtitle">
                        The application to make deposition against location infested by pests.
                    </ThemedText>
                    {/* <ThemedText>Tired of having a depressing vacation ? Start the fight ! </ThemedText> */}
                </ThemedView>

                <ThemedView style={styles.btnContainer}>
                    <Link href="register" style={[styles.link, styles.btn]}>
                        <ThemedText type="link">Register</ThemedText>
                    </Link>
                    <Link href="login" style={[styles.link, styles.btn]}>
                        <ThemedText type="link">Login</ThemedText>
                    </Link>
                </ThemedView>
            </View>
            <Link href="mentions" style={styles.link}>
                <ThemedText type="link">Mentions legales</ThemedText>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        // padding: 24,
    },
    applicationHeadline: {
        backgroundColor: "transparent",
        alignItems: "center",
    },
    appName: {
        fontFamily: "Boogaloo",
    },
    main: {
        flex: 1,
        justifyContent: "center",
        maxWidth: 960,
        marginHorizontal: "auto",
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
    },
    btn: {
        borderColor: "#cbd5e1",
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
});
