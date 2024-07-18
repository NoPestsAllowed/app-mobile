import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView, { MapViewProps, PROVIDER_GOOGLE } from "react-native-maps";

export default function Map(props: MapViewProps) {
    // console.log(PROVIDER_GOOGLE);

    return (
        <View style={styles.container}>
            {Platform.OS === "android" ? (
                <MapView provider={PROVIDER_GOOGLE} style={styles.map} {...props} />
            ) : (
                <MapView style={styles.map} {...props} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
});
