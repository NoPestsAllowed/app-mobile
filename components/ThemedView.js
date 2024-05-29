import { StyleSheet, View } from "react-native";

import { useThemeColor } from "../hooks/useThemeColor";

export function ThemedView({ style, lightColor, darkColor, ...otherProps }) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");

    return <View style={[{ backgroundColor }, styles.view, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
    view: {
        // display: "none",
    },
});
