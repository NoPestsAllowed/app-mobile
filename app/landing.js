import { Link, useFocusEffect } from "expo-router";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { ThemedText } from "../components/ThemedText";
import { useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import { useCallback, useState } from "react";
import { ThemedView } from "../components/ThemedView";
import SearchPlace from "../components/SearchPlace";

const backendUrl = process.env.EXPO_PUBLIC_API_URL;

export default function LandingPage() {
    const [depositions, setDepositions] = useState([]);
    const [lastDepositionCount, setLastDepositionCount] = useState(0);
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
            return () => {
                console.log("This route is now unfocused.");
            };
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
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

                {/* <ThemedView> */}
                {/* <SearchPlace /> */}
                {/* </ThemedView> */}

                <ThemedView style={styles.btnContainer}>
                    <Link href="register" style={styles.btn}>
                        <ThemedText type="link">Inscription</ThemedText>
                    </Link>
                    <Link href="login" style={styles.btn}>
                        <ThemedText type="link">Connection</ThemedText>
                    </Link>
                </ThemedView>
            </View>
            <ThemedText style={styles.paragraph}>
                <ThemedText type="defaultSemiBold" style={styles.firstWord}>
                    {lastDepositionCount}
                </ThemedText>{" "}
                rapports d'insectes ont été ajoutés au cours des dernières 24 heures !
            </ThemedText>
            <ThemedView style={{ backgroundColor: "transparent", paddingVertical: 8 }}>
                <Link href="mentions">
                    <ThemedText type="link">Mentions legales</ThemedText>
                </Link>
            </ThemedView>
        </SafeAreaView>
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
        width: "80%",
        marginBottom: 24,
    },
});
