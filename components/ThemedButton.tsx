import React, { forwardRef, PropsWithChildren } from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "../hooks/useThemeColor";

interface Props {
    style?: ViewStyle;
    lightColor?: string;
    darkColor?: string;
    elevated?: boolean;
    colored?: Boolean;
    onPress: () => void;
    title?: string;
    rest?: any;
}

type PropsWithChild = Props & PropsWithChildren;
export type Ref = TouchableOpacity;

export const ThemedButton = forwardRef<Ref, PropsWithChild>(function ThemedButton(
    { style, lightColor, darkColor, children, elevated = true, colored = true, onPress, title, ...rest },
    ref
) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");
    const colorText = useThemeColor({ light: lightColor, dark: darkColor }, "text");
    // console.log(backgroundColor);
    return (
        <TouchableOpacity
            style={[
                { backgroundColor },
                styles.btnContainer,
                style,
                elevated && styles.elevated,
                colored && styles.colored,
            ]}
            onPress={onPress}
            {...rest}
            ref={ref}
        >
            <ThemedText style={[, styles.buttonText]}>{title ?? children}</ThemedText>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    btnContainer: {
        width: "80%",
        borderWidth: 1,
        borderColor: "#0a7ea4",
        // backgroundColor: "#A53939",
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    colored: {
        backgroundColor: "#A53939",
    },
    elevated: {
        // backgroundColor: "#A53939",
        // paddingVertical: 15,
        // paddingHorizontal: 50,
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
