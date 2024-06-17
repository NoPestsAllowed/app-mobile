import { StyleSheet, useColorScheme } from "react-native";
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from "react-native-reanimated";

import { ThemedView } from "./ThemedView";

const HEADER_HEIGHT = 250;

export default function ParallaxScrollView({ children, headerImage, headerBackgroundColor }) {
    const colorScheme = useColorScheme() ?? "light";

    return (
        <ThemedView style={styles.container}>
            <Animated.ScrollView>
                <ThemedView style={styles.content}>{children}</ThemedView>
            </Animated.ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 250,
        overflow: "hidden",
    },
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: "hidden",
    },
});
