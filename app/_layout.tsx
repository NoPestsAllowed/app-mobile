import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useReducer, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuhtProvider } from "@/contexts/auth";
import { authReducer } from "@/reducers/auth";
import * as SecureStore from "expo-secure-store";
import { Text, View } from "react-native";
import { DiscoveryDocument, fetchDiscoveryAsync } from "expo-auth-session";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const ISSUER_ENDPOINT = "http://192.168.1.17:3000/oidc";

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        Boogaloo: require("../assets/fonts/Boogaloo-Regular.ttf"),
        Carme: require("../assets/fonts/Carme-Regular.ttf"),
    });

    const [state, dispatch] = useReducer(authReducer, {
        isLoading: true,
        isSignout: false,
        userToken: null,
    });
    const [stack, setStack] = useState([<Stack.Screen name="login" />]);
    console.log(state);
    console.log(state.userToken === null);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    const stakc = () => {
        if (state.userToken) {
            return [
                <Stack.Screen key="(tabs)" name="(tabs)" options={{ headerShown: false }} />,
                <Stack.Screen key="+not-found" name="+not-found" />,
            ];
        }
        return [<Stack.Screen key="login" name="login" />];
    };

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        // const bootstrapAsync = async () => {
        //     let userToken;
        //     try {
        //         userToken = state.userToken;
        //         console.log("hhhhh", userToken);
        //     } catch (e) {
        //         // Restoring token failed
        //     }
        //     // After restoring token, we may need to validate it in production apps
        //     // This will switch to the App screen or Auth screen and this loading
        //     // screen will be unmounted and thrown away.
        //     // dispatch({ type: "RESTORE_TOKEN", token: userToken });
        // };
        // bootstrapAsync();
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
                    {/* <Text>{JSON.stringify(discovery)}</Text> */}
                    <AuhtProvider discovery={discovery}>
                        <Stack>
                            <Stack.Screen key="login" name="login" />
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
