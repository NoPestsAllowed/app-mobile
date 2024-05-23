import React, { useState } from "react";
import { Image, StyleSheet, Platform, Button, Text, View } from "react-native";
import ParallaxScrollView from "../../components/ParallaxScrollView";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";
import { ThemedButton } from "../../components/ThemedButton";
import { useSession } from "../../hooks/useSession";
import { Link } from "expo-router";

export default function HomeTab() {
    const { logout } = useSession();
    const [firstName, setFirstName] = useState("");

    return (
        <ParallaxScrollView
        headerBackgroundColor={{ light: "grey", dark: "#1D3D47" }}
        headerImage={
                <Image source={require("../../assets/images/map.png")} style={styles.map} />

        }
    >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Welcome!{firstName}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Step 1: Try it</ThemedText>
                <ThemedText style={styles.paragraph}>
                    <ThemedText type="defaultSemiBold" style={styles.firstWord}>
                        Edit
                    </ThemedText>{" "}
                    app/(tabs)/index.tsx to see changes. Press{" "}
                    <ThemedText type="defaultSemiBold">
                        {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
                    </ThemedText>{" "}
                    to open developer tools.
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Step 2: Explore</ThemedText>
                <ThemedText style={styles.paragraph}>
                    <ThemedText type="defaultSemiBold" style={styles.firstWord}>
                        Tap
                    </ThemedText>{" "}
                    the Explore tab to learn more about what's included in this starter app.
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
                <ThemedText style={styles.paragraph}>
                    <ThemedText type="defaultSemiBold" style={styles.firstWord}>
                        When
                    </ThemedText>{" "}
                    you're ready, run <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a
                    fresh <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{" "}
                    <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
                    <ThemedText type="defaultSemiBold">app-example</ThemedText>.
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainerlast}>
                <Link href="mentions" style={styles.buttonText}>mentions legales</Link>
                <ThemedButton style={styles.button} onPress={() => logout()}>Logout</ThemedButton>
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
    },
    noPestsAllowedLogo: {
        height: 100,
        width: 100,
        top: 50,
    },
    rightHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    welcomeText: {
        marginRight: 25,
        fontSize: 24,
        color: "#A53939",
        top: 50,
        fontWeight: "800",
    },
    avatarContainer: {
        height: 104,
        width: 104,
        borderRadius: 52,
        borderWidth: 2,
        borderColor: "silver",
        justifyContent: "center",
        alignItems: "center",
        top: 50,
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
        paddingHorizontal: 10,
        flexDirection: "column",
    },
    noPestsAllowedLogo: {
        height: 100,
        width: 100,
        top: 100,
        bottom: 25,
        left: 25,
        position: "absolute",
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
    stepContainerlast: {
        gap: 8,
        marginBottom: 8,
        flexDirection: "column",
        alignItems: "center",
    },
    paragraph: {
        paddingLeft: 5,
    },
    firstWord: {
        marginLeft: 25,
    },
});
