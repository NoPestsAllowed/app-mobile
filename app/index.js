import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { ThemedText } from "../components/ThemedText";

export default function Page() {
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <ThemedText type="title" style={styles.title}>
                    Hello World
                </ThemedText>
                <ThemedText style={styles.subtitle}>This is the first page of your app.</ThemedText>
                <Link href="(tabs)" style={styles.link}>
                    <ThemedText type="link">Go to home screen!</ThemedText>
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 24,
    },
    main: {
        flex: 1,
        justifyContent: "center",
        maxWidth: 960,
        marginHorizontal: "auto",
    },
    title: {
        fontSize: 64,
        fontWeight: "bold",
        lineHeight: 64,
    },
    subtitle: {
        fontSize: 36,
        color: "#38434D",
        lineHeight: 36,
    },
});
