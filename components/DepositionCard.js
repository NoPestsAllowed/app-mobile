import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import moment from "moment";

export default function DepositionCard({ deposition }) {
    // console.log("deposition from card", deposition);
    return (
        <ThemedView style={styles.container}>
            {/* <ThemedView style={styles.content}> */}
            <ThemedText type="title" style={styles.title}>
                {deposition.name}
            </ThemedText>
            {/* </ThemedView> */}
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
        // flex: 1,
        borderWidth: 1,
        borderColor: "#94a3b8",
        borderRadius: 7,
        // paddingVertical: 5,
        paddingHorizontal: 15,
    },
    content: {
        borderTopRadius: 6,
        backgroundColor: "#f3f4f6",
        overflow: "hidden",
    },
    title: {
        fontSize: 18,
        marginVertical: 5,
        // paddingHorizontal: 5,
        // borderTopRadius: 6,
        // backgroundColor: "#f3f4f6",
    },
    subtitle: {
        fontSize: 14,
        marginVertical: 5,
        // paddingHorizontal: 5,
    },
    date: {
        fontSize: 8,
        paddingHorizontal: 5,
    },
});
