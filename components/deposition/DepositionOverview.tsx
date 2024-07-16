import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Deposition, DepositionWithVisualProofs } from "@/types";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import moment from "moment";
import { ThemedButton } from "../ThemedButton";
import { Link } from "expo-router";

export default function DepositionOverview({
    deposition,
    deleteDeposition,
}: {
    deposition: DepositionWithVisualProofs;
    deleteDeposition: (deposition: Deposition) => void;
}) {
    // console.log("DEPOSITION", deposition);
    return (
        <ThemedView style={styles.rowContainer}>
            <Link
                style={{ marginVertical: 5 }}
                key={deposition._id}
                href={{
                    pathname: "/depositions/[id]",
                    params: { id: deposition._id },
                }}
            >
                <ThemedView style={styles.depositionContent}>
                    <ThemedView style={styles.imageContainer}>
                        <Image style={styles.depositionImg} source={{ uri: deposition.visualProofs[0].url }} />
                    </ThemedView>
                    <ThemedView style={styles.detailsContainer}>
                        <ThemedText type="subtitle" style={styles.line1}>
                            {deposition.name}
                        </ThemedText>
                        {deposition.placeId.address && (
                            <ThemedText numberOfLines={1} style={[styles.line2, styles.address]}>
                                {deposition.placeId.address}
                            </ThemedText>
                        )}
                        <ThemedText style={[styles.line2, styles.pestType]}> {deposition.type}</ThemedText>
                        <ThemedView style={[styles.line2, styles.date]}>
                            <ThemedText style={styles.dateText}>
                                {moment(deposition.createdAt).format("DD MMMM YYYY")}
                            </ThemedText>
                        </ThemedView>
                    </ThemedView>
                    <ThemedText
                        style={[
                            styles.line2,
                            {
                                fontWeight: "bold",
                                color: deposition.status === "accepted" ? "green" : "red",
                            },
                        ]}
                    >
                        {deposition.status}
                    </ThemedText>
                    <ThemedView></ThemedView>
                    {/* <ThemedView style={styles.rowContent}>
                        <ThemedView style={styles.rowTextContainer}>
                            <ThemedText style={styles.line1}>Déposition: </ThemedText>
                            <ThemedText style={styles.line2}>{deposition.name}</ThemedText>
                        </ThemedView>
                        <ThemedView style={styles.rowTextContainer}>
                            <ThemedText style={styles.line1}> Adresse: </ThemedText>
                            <ThemedText style={styles.line2}>{deposition.placeId.address}</ThemedText>
                        </ThemedView>
                        <ThemedView style={styles.rowTextContainer}>
                            <ThemedText style={styles.line1}>Description: </ThemedText>
                            <ThemedText style={styles.line2}> {deposition.description}</ThemedText>
                        </ThemedView>
                        <ThemedView style={styles.rowTextContainer}>
                            <ThemedText style={styles.line1}>Status: </ThemedText>
                            <ThemedText
                                style={[
                                    styles.line2,
                                    {
                                        fontWeight: "bold",
                                        color: deposition.status === "accepted" ? "green" : "red",
                                    },
                                ]}
                            >
                                {deposition.status}
                            </ThemedText>
                        </ThemedView>
                    </ThemedView> */}
                </ThemedView>
            </Link>
            {/* <ThemedView style={styles.actionButtonsContainer}>
                <ThemedButton onPress={() => deleteDeposition(deposition)}>Supprimer</ThemedButton>
            </ThemedView> */}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    rowContainer: {
        flex: 1,
        backgroundColor: "white",
        // alignItems: "center",
        // justifyContent: "space-around",
        // padding: 10,
        // marginBottom: 10,
        borderRadius: 5,
        shadowColor: "#7a2307",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 7,
        // marginTop: 10,
        // borderWidth: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 5,
        alignItems: "center",
        // height: 75,
    },
    rowTextContainer: {
        // marginLeft: 5,
        // marginRight: 10,
        // marginHorizontal: 5,
        // flex: 1,
        // backgroundColor: "white",
        // gap: 10,
    },
    rowContent: {
        // flexDirection: "column",
        // flex: 1,
        // borderRadius: 25,
        // shadowColor: "#7a2307",
        // shadowOffset: { width: 0, height: 3 },
        // shadowOpacity: 0.5,
        // shadowRadius: 35,
        // marginTop: 10,
        // backgroundColor: "transparent",
    },
    imageContainer: {
        // padding: 0,
        // margin: 0,
        // borderWidth: 11,
    },
    depositionImg: {
        height: 75,
        width: 75,
        // resizeMode: "stretch",
        // display: "none",
    },
    depositionContent: {
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: 0,
        margin: 0,
    },
    detailsContainer: {
        backgroundColor: "white",
        // textAlign: "flex",
        alignItems: "flex-start",
        // justifyContent: "flex-end",
        flexShrink: 1,
        paddingHorizontal: 15,
        paddingVertical: 0,
        // paddingVertical: 5,
        // borderWidth: 1,
    },
    depositionDetails: {
        flexDirection: "column",
        paddingVertical: 0,
        // justifyContent: "flex-end",
        // alignItems: "center",
    },
    actionButtonsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
    },
    line1: {
        fontSize: 18,
        // marginRight: 10,
        fontWeight: 500,
        marginTop: 0,
        marginBottom: -5,
    },
    pestType: {
        fontWeight: "bold",
        color: "#64748b",
        marginLeft: -5,
        // marginTop: 2,
    },
    address: {
        //
    },
    line2: {
        // marginTop: -5,
        // fontSize: 18,
        // marginLeft: 25,
        // marginRight: 10,
        // color: "black",
        // paddingHorizontal: 5,
        // paddingVertical: 0,
        // flexWrap: "wrap",
        // borderWidth: 1,
        // borderRadius: 7,
        // marginBottom: 5,
        // borderColor: "#A53939",
    },
    date: {
        backgroundColor: "white",
        marginTop: 15,
        paddingTop: 0,
        // alignItems: "flex-end",
        // marginTop: 20,
        // borderWidth: 1,
    },
    dateText: {
        fontWeight: "light",
        fontSize: 12,
        // paddingLeft: 15,
        // marginLeft: 25,
    },
});
