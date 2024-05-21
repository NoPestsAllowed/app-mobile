import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

import { useColorScheme } from "react-native";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "../reducers/user";

const store = configureStore({
    reducer: { user },
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        Boogaloo: require("../assets/fonts/Boogaloo-Regular.ttf"),
        Carme: require("../assets/fonts/Carme-Regular.ttf"),
    });

    const [isSignedUser, setIsSignedUser] = useState(false);
    // const getUserToken = () => {
    //     // await localStorage.getItem('')
    // };

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }
    console.log("rootLayout", isSignedUser);
    return (
        <Provider store={store}>
            <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
                {isSignedUser ? (
                    <Stack>
                        <Stack.Screen name="landing" />
                        <Stack.Screen name="(tabs)"  component={ProfileTab}  options={{ tabBarVisible: false }} />
                        <Stack.Screen name="+not-found" />
                    </Stack>
                ) : (
                    <Stack>
                        <Stack.Screen name="register" />
                        <Stack.Screen name="landing" />
                        <Stack.Screen name="+not-found" />
                    </Stack>
                )}
            </ThemeProvider>
        </Provider>
    );
}
