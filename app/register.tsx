import { ScrollView, StyleSheet, Text, View } from "react-native";
import ConnectButton from "@/components/ConnectButton";
import { useOIDCAuth } from "@/hooks/useOIDCAuth";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function Register() {
    const { user } = useOIDCAuth();

    return (
        <ThemedView style={styles.container}>
            <ScrollView>
                <ThemedText style={styles.pageTitle}>RegisterPage</ThemedText>
                <ConnectButton />
                {user && <ThemedText>{JSON.stringify(user, null, 4)}</ThemedText>}
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    pageTitle: {
        fontSize: 24,
        fontFamily: "Carme",
        marginVertical: 12,
    },
});
