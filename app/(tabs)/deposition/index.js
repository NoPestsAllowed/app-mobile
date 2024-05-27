import { Image, StyleSheet, Platform } from "react-native";
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

const backendUrl = process.env.EXPO_PUBLIC_API_URL;

export default function DepositionTab() {
    const [depositions, setDepositions] = useState([]);
    const user = useSelector((state) => state.user.value);

    useFocusEffect(
        useCallback(() => {
            fetch(`${backendUrl}/depositions`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
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
                <ThemedText type="title">Deposition</ThemedText>
            </ThemedView>

            <ThemedView style={styles.nomQuiVeutRienDire}>
                {depositions.length === 0 && (
                    <EmptyState headline="No depo" desc="Start by creating a deposition">
                        <ThemedButton onPress={() => router.navigate("deposition/create")}>
                            Create deposition
                        </ThemedButton>
                    </EmptyState>
                )}

                {depositions.length > 0 &&
                    depositions.map((deposition) => {
                        console.log(deposition._id);
                        return (
                            <Link
                                style={{ marginVertical: 5 }}
                                key={deposition._id}
                                href={{
                                    pathname: "/deposition/[id]",
                                    params: { id: deposition._id },
                                }}
                            >
                                <DepositionCard deposition={deposition} />
                            </Link>
                        );
                    })}
            </ThemedView>
            {depositions.length > 0 && (
                <ThemedView style={styles.bottomBtnContainer}>
                    <Link href="/deposition/create" asChild>
                        <ThemedButton elevated={false}>Create Deposition</ThemedButton>
                    </Link>
                </ThemedView>
            )}

            {/* {depos} */}
            {/* <ThemedText>This app includes example code to help you get started.</ThemedText>
            <Collapsible title="File-based routing">
                <ThemedText>
                    This app has two screens: <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{" "}
                    <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
                </ThemedText>
                <ThemedText>
                    The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText> sets up
                    the tab navigator.
                </ThemedText>
                <ExternalLink href="https://docs.expo.dev/router/introduction">
                    <ThemedText type="link">Learn more</ThemedText>
                </ExternalLink>
            </Collapsible>
            <Collapsible title="Android, iOS, and web support">
                <ThemedText>
                    You can open this project on Android, iOS, and the web. To open the web version, press{" "}
                    <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
                </ThemedText>
            </Collapsible>
            <Collapsible title="Images">
                <ThemedText>
                    For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{" "}
                    <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for different screen
                    densities
                </ThemedText>
                <Image source={require("../../../assets/images/icon.png")} style={{ alignSelf: "center" }} />
                <ExternalLink href="https://reactnative.dev/docs/images">
                    <ThemedText type="link">Learn more</ThemedText>
                </ExternalLink>
            </Collapsible>
            <Collapsible title="Custom fonts">
                <ThemedText>
                    Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{" "}
                    <ThemedText style={{ fontFamily: "SpaceMono" }}>custom fonts such as this one.</ThemedText>
                </ThemedText>
                <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
                    <ThemedText type="link">Learn more</ThemedText>
                </ExternalLink>
            </Collapsible>
            <Collapsible title="Light and dark mode components">
                <ThemedText>
                    This template has light and dark mode support. The{" "}
                    <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect what the
                    user's current color scheme is, and so you can adjust UI colors accordingly.
                </ThemedText>
                <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
                    <ThemedText type="link">Learn more</ThemedText>
                </ExternalLink>
            </Collapsible>
            <Collapsible title="Animations">
                {Platform.select({
                    ios: (
                        <ThemedText>
                            The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{" "}
                            component provides a parallax effect for the header image.
                        </ThemedText>
                    ),
                })}
            </Collapsible> */}
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    nomQuiVeutRienDire: {
        // width: "90%",
        flex: 1,
    },
    button: {
        backgroundColor: "#A53939",
        padding: 10,
        margin: 5,
        borderRadius: 10,
        alignItems: "center",
        // shadowColor: "#888",
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 1,
        // shadowRadius: 7,
        // elevation: 3,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    },
    bottomBtnContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
});
