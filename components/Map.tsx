import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView, { MapViewProps } from "react-native-maps";

export default function Map(props: MapViewProps) {
    return (
        <View style={styles.container}>
            <MapView style={styles.map} {...props} />
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
