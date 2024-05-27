import { Text, StyleSheet } from "react-native";

import { useThemeColor } from "../hooks/useThemeColor";

export function ThemedText({ style, lightColor, darkColor, type = "default", ...rest }) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

    return (
        <Text
            style={[
                { color },
                type === "default" ? styles.default : undefined,
                type === "title" ? styles.title : undefined,
                type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
                type === "subtitle" ? styles.subtitle : undefined,
                type === "link" ? styles.link : undefined,
                style,
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
        lineHeight: 24,
    },
    defaultSemiBold: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: 600,
    },
    title: {
        fontSize: 32,
        // color: "#A53939",
        shadowColor: "#888",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 7,
        fontWeight: 800,
        margin: 1,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    link: {
        lineHeight: 30,
        fontSize: 16,
        color: "#ca8035",
    },
});
