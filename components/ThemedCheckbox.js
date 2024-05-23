import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { ThemedText } from "./ThemedText";

export default function ThemedCheckbox({ label = null }) {
    const [checked, setChecked] = useState(false);
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.checkox, checked ? styles.checked : ""]}
                onPress={() => setChecked((checked) => !checked)}
            ></TouchableOpacity>
            {label !== null && <ThemedText onPress={() => setChecked((checked) => !checked)}>{label}</ThemedText>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-arround",
        alignItems: "center",
    },
    checkox: {
        width: 15,
        height: 15,
        borderColor: "#94a3b8",
        borderWidth: 1,
        borderRadius: 5,
    },
    checked: {
        backgroundColor: "green",
    },
});
