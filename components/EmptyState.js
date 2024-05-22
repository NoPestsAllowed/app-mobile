import { StyleSheet } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedButton } from "./ThemedButton";

export default function EmptyState({ headline, desc, children }) {
    return (
        <ThemedView style={styles.container}>
            <Ionicons name="bug-outline" size={24} color="black" />
            <ThemedText type="subtitle">{headline}</ThemedText>
            {desc && <ThemedText>{desc}</ThemedText>}
            {/* <ThemedButton style={styles.btn}>Create deposition</ThemedButton> */}
            {children}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        borderColor: "#64748b",
        borderWidth: 1,
        borderRadius: 10,
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
});
