import {
    StyleSheet,
    StyleSheetProperties,
    TextInput,
    TextInputProps,
    TextStyle,
    useColorScheme,
    View,
    ViewStyle,
} from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { CSSProperties } from "react";

export type ThemedTextProps = TextInputProps & {
    style: ViewStyle;
    lightColor?: string;
    darkColor?: string;
    label: string | false;
    labelStyle?: TextStyle;
};

export function ThemedTextInput({ style, lightColor, darkColor, label = false, labelStyle, ...rest }: ThemedTextProps) {
    const theme = useColorScheme();
    return (
        <View>
            {label && <ThemedText style={[styles.label, labelStyle]}>{label}</ThemedText>}
            <TextInput
                style={[
                    theme === "light" ? styles.light : undefined,
                    theme === "dark" ? styles.dark : undefined,
                    styles.global,
                    style,
                ]}
                {...rest}
            />
        </View>
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
    },
    label: {
        marginVertical: 0,
        paddingVertical: 0,
    },
});
