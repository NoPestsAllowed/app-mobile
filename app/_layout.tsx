import {
    DarkTheme,
    DefaultTheme,
    getFocusedRouteNameFromRoute,
    ParamListBase,
    RouteProp,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AuhtProvider } from "@/contexts/auth";
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
        if (loaded && discovery !== null) {
            SplashScreen.hideAsync();
        }
    }, [loaded, discovery]);

    if (!loaded) {
        return null;
    }

    if (error) {
        alert(typeof error === "string" ? error : JSON.stringify(error));
    }

    const headerMustBeShown = (route: RouteProp<ParamListBase, string>) => {
        // console.log(route);
        return route.name !== "(app)";
    };

    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            {discovery !== null ? (
                <AuhtProvider discovery={discovery}>
                    <Stack
                        screenOptions={({ route }) => ({
                            headerShown: headerMustBeShown(route),
                            headerStyle: {
                                backgroundColor: "#f4511e",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                            },
                            title: "Home",
                            // headerTitle: (props) => <ThemedText>{props.children}</ThemedText>,
                            // headerRight: () => (
                            //     <Button onPress={() => alert("This is a button!")} title="Info" color="red" />
                            // ),
                        })}
                    >
                        <Stack.Screen key="index" name="index" options={{ title: "NoPestsAllowed" }} />
                        <Stack.Screen key="legals" name="legal-notice" options={{ title: "Mentions légale" }} />
                        <Stack.Screen key="+not-found" name="+not-found" options={{ title: "Page Not Found" }} />
                    </Stack>
                </AuhtProvider>
            ) : (
                <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ThemedText>Loading discovery endpoints</ThemedText>
                </ThemedView>
            )}
        </ThemeProvider>
    );
}
