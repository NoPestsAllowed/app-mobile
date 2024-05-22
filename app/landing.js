import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { ThemedText } from "../components/ThemedText";
import { useSelector } from "react-redux";

export default function LandingPage() {
    const test = useSelector((state) => state.user.value.email);
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <ThemedText type="title" style={styles.title}>
                    Hello World
                </ThemedText>
                <ThemedText>{test}</ThemedText>
                <ThemedText style={styles.subtitle}>This is the first page of your app.</ThemedText>
                <Link href="register" style={styles.link}>
                    <ThemedText type="link">Register</ThemedText>
                </Link>
                <Link href="login" style={styles.link}>
                    <ThemedText type="link">Login</ThemedText>
                </Link>
            </View>
            <Link href="mentions" style={styles.link}>
                    <ThemedText type="link">Mentions legales</ThemedText>
                </Link>
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
