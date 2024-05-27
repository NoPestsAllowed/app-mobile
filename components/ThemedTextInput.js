import { Text, StyleSheet, TextInput, useColorScheme } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

export function ThemedTextInput({ style, lightColor, darkColor, label = false, ...rest }) {
    const theme = useColorScheme();
    console.log(rest);
    return (
        <>
            {label && (
                <ThemedView>
                    <ThemedText>{label}</ThemedText>
                </ThemedView>
            )}
            <TextInput
                style={[
                    theme === "light" ? styles.light : undefined,
                    theme === "dark" ? styles.dark : undefined,
                    styles.global,
                    style,
                ]}
                {...rest}
            />
        </>
    );
}

const styles = StyleSheet.create({
    light: {
        backgroundColor: "#ffffff",
        color: "#11181C",
    },
    dark: {
        backgroundColor: "#71717a",
        color: "#ECEDEE",
    },
    global: {
        borderWidth: 1,
        borderColor: "#0a7ea4",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 2,
    },
});
