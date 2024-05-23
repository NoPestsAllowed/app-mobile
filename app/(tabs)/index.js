import React, { useState } from "react";
import { Image, StyleSheet, Platform, Button, Text, View } from "react-native";
import ParallaxScrollView from "../../components/ParallaxScrollView";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";
import { ThemedButton } from "../../components/ThemedButton";
import { useSession } from "../../hooks/useSession";

export default function HomeTab() {
    const { logout } = useSession();
    const [firstName, setFirstName] = useState("John");

    return (
        <ParallaxScrollView
        headerBackgroundColor={{ light: "grey", dark: "#1D3D47" }}
        headerImage={
                <Image source={require("../../assets/images/map.png")} style={styles.map} />

        }
    >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Welcome!</ThemedText>
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
            <ThemedView style={styles.alertContainer}>
            <Image source={require("../../assets/images/alert.png")} style={styles.alertLogo} />
                <ThemedText type="subtitle" style={styles.alert}>ALERT!</ThemedText>
                </ThemedView>
                <ThemedText style={styles.paragraph}>
                    <ThemedText type="defaultSemiBold" style={styles.firstWord}>
                        3 
                        {/* {lastDepositions} */}
                    </ThemedText> { }
                     raports d'insectes ont été ajoutés dans les dernières 24 heures !
                     </ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainerlast}>
                <Button title="mentions legale"></Button>
                <ThemedButton onPress={() => logout()}>Logout</ThemedButton>
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
    welcomeText: {
        marginRight: 25,
        fontSize: 24,
        color: "#A53939",
        top: 50,
        fontWeight: "800",
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
    alertContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    alert: {
        marginLeft: 28,
        color: "#7a2307",
        fontSize: "20",
        fontWeight: "800",
    },
    alertLogo: {
        height:50, 
        width:50,
    },
    firstWord: {
        marginLeft: 25,
        color: "#7a2307",
        fontSize: "20",
    },
});
