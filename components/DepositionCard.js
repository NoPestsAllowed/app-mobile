import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import moment from "moment";

export default function DepositionCard({ deposition }) {
    // console.log("deposition from card", deposition);
    return (
        <ThemedView>
            <ThemedText type="title" style={styles.title}>
                {deposition.name}
            </ThemedText>
            <ThemedText type="subtitle" style={styles.subtitle}>
                {deposition.placeId.address}
            </ThemedText>
            <ThemedText>{deposition.description}</ThemedText>
            <ThemedView style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                <ThemedText style={styles.date}>{moment(deposition.createdAt).format("L")}</ThemedText>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        //
    },
    title: {
        fontSize: 24,
    },
    subtitle: {
        fontSize: 16,
    },
    date: {
        fontSize: 8,
    },
});
