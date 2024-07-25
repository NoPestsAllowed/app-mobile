import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Deposition, DepositionWithVisualProofs } from "@/types";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import moment from "moment";
import { ThemedButton } from "../ThemedButton";
import { Link } from "expo-router";
import { $t } from "@/lang";

export default function DepositionOverview({
    deposition,
    deleteDeposition,
}: {
    deposition: DepositionWithVisualProofs;
    deleteDeposition: (deposition: Deposition) => void;
}) {
    // console.log("DEPOSITION", deposition);
    return (
        <ThemedView style={[styles.rowContainer, styles.shadow]}>
            <Link
                key={deposition._id}
                href={{
                    pathname: "/depositions/[id]",
                    params: { id: deposition._id },
                }}
                asChild
            >
                <Pressable style={styles.rowContent}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.depositionImg} source={{ uri: deposition.visualProofs[0].url }} />
                    </View>

                    <View style={styles.detailsContainer}>
                        <ThemedText type="subtitle" style={styles.line1} ellipsizeMode="tail" numberOfLines={1}>
                            {deposition.name}
                        </ThemedText>
                        {deposition.placeId.address && (
                            <ThemedText numberOfLines={1} style={[styles.detail, styles.address]}>
                                {deposition.placeId.address}
                            </ThemedText>
                        )}
                        <ThemedText style={[styles.detail, styles.pestType]}>
                            {$t(`pests.${deposition.type}`)}
                        </ThemedText>

                        <View style={[styles.date]}>
                            <ThemedText style={styles.dateText} type="monospaced">
                                {moment(deposition.createdAt).format("DD MMMM YYYY")}
                            </ThemedText>
                        </View>
                    </View>

                    <ThemedText
                        style={[
                            styles.detail,
                            {
                                color: deposition.status === "accepted" ? "green" : "red",
                            },
                        ]}
                    >
                        {$t(`strings.status.${deposition.status}`)}
                    </ThemedText>
                </Pressable>
            </Link>
            {/* <ThemedView style={styles.actionButtonsContainer}>
                <ThemedButton onPress={() => deleteDeposition(deposition)}>Supprimer</ThemedButton>
            </ThemedView> */}
            {/* <ThemedText>H</ThemedText> */}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    rowContainer: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 5,
        paddingLeft: 5,
        paddingRight: 15,
        paddingVertical: 5,
    },
    rowContent: {
        // display: "none",
        // flex: 1,
        // borderWidth: 1,
        // borderColor: "red",
        // height: "100%",
        // width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // flexDirection: "column",
        // flex: 1,
        // borderRadius: 25,
        // shadowColor: "#7a2307",
        // shadowOffset: { width: 10, height: 30 },
        // shadowOpacity: 5,
        // shadowRadius: 5,
        // marginTop: 10,
        // backgroundColor: "transparent",
    },
    // depositionContent: {
    //     display: "none",
    //     // backgroundColor: "white",
    //     // flex: 1,
    //     // flexDirection: "row",
    //     // alignItems: "center",
    //     // justifyContent: "space-between",
    //     // width: "100%",
    //     // padding: 0,
    //     // margin: 0,
    //     // borderWidth: 1,
    // },
    imageContainer: {
        // height: "100%",
        // width: "100%",
        // padding: 0,
        // margin: 0,
        // borderWidth: 11,
    },
    depositionImg: {
        height: 75,
        width: 75,
        resizeMode: "cover",
        // display: "none",
    },
    detailsContainer: {
        // backgroundColor: "white",
        // // textAlign: "flex",
        // alignItems: "flex-start",
        // // justifyContent: "flex-end",
        flexShrink: 1,
        flexGrow: 1,
        paddingHorizontal: 15,
        // paddingVertical: 0,
        // paddingVertical: 5,
        // borderWidth: 1,
    },
    // depositionDetails: {
    //     // flexDirection: "column",
    //     // paddingVertical: 0,
    //     // justifyContent: "flex-end",
    //     // alignItems: "center",
    // },
    // actionButtonsContainer: {
    //     flexDirection: "row",
    //     justifyContent: "space-around",
    //     marginTop: 10,
    // },
    line1: {
        fontSize: 18,
        // marginRight: 10,
        // fontWeight: 500,
        // marginTop: 0,
        // marginBottom: -5,
    },
    pestType: {
        fontWeight: "bold",
        color: "#64748b",
        // marginLeft: -5,
        // marginTop: -5,
    },
    address: {
        //
    },
    detail: {
        fontWeight: 600,
    },
    date: {
        backgroundColor: "white",
        // paddingTop: 0,
    },
    dateText: {
        fontSize: 12,
    },
    shadow: {
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
});
