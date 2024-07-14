import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AuhtProvider } from "@/contexts/auth";
import { SafeAreaView } from "react-native";
import { DiscoveryDocument, fetchDiscoveryAsync } from "expo-auth-session";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

if (!process.env.EXPO_PUBLIC_OIDC_ISSUER) {
    throw new Error("OIDC Issuer is not defined");
}
const ISSUER_ENDPOINT = process.env.EXPO_PUBLIC_OIDC_ISSUER;

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        Boogaloo: require("../assets/fonts/Boogaloo-Regular.ttf"),
        Carme: require("../assets/fonts/Carme-Regular.ttf"),
    });

    const [discovery, setDiscovery] = useState<DiscoveryDocument | null>(null);
    useEffect(() => {
        if (discovery === null) {
            (async () => {
                try {
                    const discoveryResponse = await fetchDiscoveryAsync(ISSUER_ENDPOINT);
                    setDiscovery(discoveryResponse);
                    console.log("discovery is set");
                } catch (error) {
                    console.error(error);
                }
            })();
        }
    }, []);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <SafeAreaView style={{ flex: 1 }}>
                {discovery !== null ? (
                    <AuhtProvider discovery={discovery}>
                        <Stack screenOptions={{ headerShown: true }}>
                            <Stack.Screen key="index" name="index" />
                            <Stack.Screen key="legals" name="legal-notice" />
                            <Stack.Screen key="+not-found" name="+not-found" />
                        </Stack>
                    </AuhtProvider>
                ) : (
                    <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ThemedText>Loading</ThemedText>
                    </ThemedView>
                )}
            </SafeAreaView>
        </ThemeProvider>
    );
}
