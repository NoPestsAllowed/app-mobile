import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";

export function ThemedButton({ style, lightColor, darkColor, children, ...rest }) {
    return (
        <TouchableOpacity style={[styles.button, style]} {...rest}>
            <ThemedText style={styles.buttonText}>{children}</ThemedText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#A53939',
        paddingVertical: 15, 
        paddingHorizontal: 50, 
        margin: 10, 
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#888',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 7,
        elevation: 3,
    },
    buttonText: {
        color: '#f5f5f5',
        fontSize: 18,
    },
});
