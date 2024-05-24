import { Image, StyleSheet, Platform } from "react-native";
import ParallaxScrollView from "../../../components/ParallaxScrollView";
import { ThemedText } from "../../../components/ThemedText";
import { ThemedView } from "../../../components/ThemedView";
import { Collapsible } from "../../../components/Collapsible";
import { ExternalLink } from "../../../components/ExternalLink";
import { ThemedButton } from "../../../components/ThemedButton";
import { router } from "expo-router";
import MapView from "react-native-maps";
import EmptyState from "../../../components/EmptyState";

export default function DepositionTab() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
            headerImage={
                <MapView
                    initialRegion={{
                        latitude: 48.86667,
                        longitude: 2.333333,
                        latitudeDelta: 0.000922,
                        longitudeDelta: 0.000421,
                    }}
                    style={{ flex: 1 }}
                ></MapView>
            }
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Deposition</ThemedText>
            </ThemedView>

            <EmptyState headline="No depo" desc="Start by creating a deposition">
                <ThemedButton onPress={() => router.navigate("deposition/create")}>Create deposition</ThemedButton>
              
            </EmptyState>

            <ThemedText>This app includes example code to help you get started.</ThemedText>
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
            </Collapsible>
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
        color: "#f5f5f5",
        fontSize: 18,
    },
});
