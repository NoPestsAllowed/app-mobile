import { Button, StyleSheet, ViewStyle } from "react-native";
import { useOIDCAuth } from "@/hooks/useOIDCAuth";
import { ThemedView } from "./ThemedView";

export default function ConnectButton({ style }: { style?: ViewStyle }) {
    const { authenticate, signOut, isLoggedIn } = useOIDCAuth();
    const handleRegistration = async () => {
        console.log("ready to connect");
        const result = await authenticate();
        // router.replace("/");
        console.log(result);
    };
    return (
        <ThemedView style={[styles.container, style]}>
            {isLoggedIn ? (
                <Button title="Logout" onPress={() => signOut()} />
            ) : (
                <Button title="Connect" onPress={handleRegistration} />
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        borderColor: "#e2e8f0",
        borderWidth: 1,
        borderRadius: 12,
    },
});
