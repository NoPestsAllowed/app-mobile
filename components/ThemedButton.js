import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";

export function ThemedButton({ style, lightColor, darkColor, children, elevated = true, ...rest }) {
    return (
        <TouchableOpacity style={[styles.btnContainer, style, elevated ? styles.elevated : ""]} {...rest}>
            <ThemedText style={styles.buttonText}>{children}</ThemedText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btnContainer: {
        width: "80%",
        borderWidth: 1,
        borderColor: "#0a7ea4",
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "center",
        margin: 5,
    },
    elevated: {
        backgroundColor: "#A53939",
        paddingVertical: 15,
        paddingHorizontal: 50,
        margin: 10,
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#888",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 7,
        elevation: 3,
    },
    buttonText: {
        color: "#f5f5f5",
        fontSize: 18,
    },
});
