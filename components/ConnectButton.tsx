import { Button, Pressable, StyleSheet, ViewStyle } from "react-native";
import { useOIDCAuth } from "@/hooks/useOIDCAuth";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { $t } from "@/lang";

export default function ConnectButton({ style }: { style?: ViewStyle }) {
    const { authenticate, signOut, isLoggedIn } = useOIDCAuth();
    const handleRegistration = async () => {
        await authenticate();
    };
    return (
        <>
            {isLoggedIn ? (
                <Pressable style={[styles.container, style]} onPress={() => signOut()}>
                    <ThemedText style={styles.text}>{$t("ui.logOut")}</ThemedText>
                </Pressable>
            ) : (
                <Pressable style={[styles.container, style]} onPress={handleRegistration}>
                    <ThemedText style={styles.text}>{$t("ui.logIn")}</ThemedText>
                </Pressable>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        borderColor: "#e2e8f0",
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 25,
        paddingVertical: 10,
        // backgroundColor: "blue",
    },
    text: {
        fontWeight: 600,
    },
});
