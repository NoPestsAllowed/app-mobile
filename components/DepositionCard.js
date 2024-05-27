import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import moment from "moment";
import Feather from "react-native-vector-icons/Feather";

export default function DepositionCard({ deposition }) {
    // console.log("deposition from card", deposition);
    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.content}>
                <ThemedText type="title" style={styles.title}>
                    {deposition.name}
                </ThemedText>
                <Feather name="arrow-up-right" size={15} color="#9ca3af" />
            </ThemedView>
            <ThemedText type="subtitle" style={styles.subtitle}>
                {deposition.placeId.address}
            </ThemedText>
            <ThemedView style={styles.descContainer}>
                <ThemedText style={styles.descText}>{deposition.description}</ThemedText>
            </ThemedView>
            <ThemedView style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                <ThemedText style={styles.date}>{moment(deposition.createdAt).format("L")}</ThemedText>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // width: "80%",
        borderWidth: 1,
        borderColor: "#94a3b8",
        borderRadius: 7,
        // paddingVertical: 5,
        paddingHorizontal: 15,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 0.9,
    },
    content: {
        // width: "100%",
        // borderTopRadius: 6,
        // backgroundColor: "#f3f4f6",
        // overflow: "hidden",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
    descContainer: {
        // flexGrow: 1,
        // // flexShrink: 1,
        // width: 1,
        // flexDirection: "row",
        // justifyContent: "center",
    },
    descText: {
        // width: "100%",
        // flex: 1,
        // flexGrow: 1,
        // height: 1,
        // flexDirection: "column",
        // justifyContent: "center",
    },
    date: {
        fontSize: 8,
        paddingHorizontal: 5,
    },
});
