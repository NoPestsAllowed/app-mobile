import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, router, Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useReducer, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuhtProvider } from "@/contexts/auth";
import * as SecureStore from "expo-secure-store";
import { Text, View } from "react-native";
import { DiscoveryDocument, fetchDiscoveryAsync } from "expo-auth-session";
import { useOIDCAuth } from "@/hooks/useOIDCAuth";

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
    const [stack, setStack] = useState([<Stack.Screen name="login" />]);
    // console.log("state", state);
    // console.log(state.userToken === null);
    const { isLoggedIn } = useOIDCAuth();
    // console.log("my OIDC user is : ", user);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    const stakc = () => {
        if (isLoggedIn) {
            return [
                <Stack.Screen key="(tabs)" name="(tabs)" options={{ headerShown: false }} />,
                <Stack.Screen key="+not-found" name="+not-found" />,
            ];
        }
        return [<Stack.Screen key="login" name="login" />];
    };

    useEffect(() => {
        setStack((stack) => stakc());
    }, []);

    const [discovery, setDiscovery] = useState<DiscoveryDocument | null>(null);
    useEffect(() => {
        if (discovery === null) {
            (async () => {
                const discoveryResponse = await fetchDiscoveryAsync(ISSUER_ENDPOINT);
                setDiscovery(discoveryResponse);
            })();
        }
    }, []);

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            {discovery !== null ? (
                <>
                    <AuhtProvider discovery={discovery}>
                        <Stack>
                            <Stack.Screen key="index" name="index" />
                            <Stack.Screen key="login" name="login" />
                            <Stack.Screen key="register" name="register" />
                            <Stack.Screen key="+not-found" name="+not-found" />
                        </Stack>
                    </AuhtProvider>
                </>
            ) : (
                <View>
                    <Text>Loading</Text>
                </View>
            )}
        </ThemeProvider>
    );
}
