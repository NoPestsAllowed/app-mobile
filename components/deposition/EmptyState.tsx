import { StyleSheet, View } from "react-native";
import React, { PropsWithChildren } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedButton } from "@/components/ThemedButton";

export default function EmptyState({
    headline,
    desc,
    children,
}: { headline: string; desc?: string } & PropsWithChildren) {
    return (
        <ThemedView style={styles.container}>
            <Ionicons name="bug-outline" size={24} color="black" />
            <ThemedText type="subtitle">{headline}</ThemedText>
            {desc && <ThemedText>{desc}</ThemedText>}
            <View style={styles.content}>{children}</View>
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
    content: {
        justifyContent: "center",
        alignItems: "center",
    },
});
