import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { ThemedText } from "./ThemedText";

export function ThemedButton({ style, lightColor, darkColor, children, ...rest }) {
    return (
        <TouchableOpacity style={[styles.btnContainer, style]} {...rest}>
            <ThemedText style={styles.btnText}>{children}</ThemedText>
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
        marginTop: 5,
    },
    btnText: {},
});
