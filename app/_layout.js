import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

import { useColorScheme } from "react-native";
import { Provider, useSelector } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import * as SecureStore from "expo-secure-store";
import createSecureStore from "redux-persist-expo-securestore";
// import storage from "redux-persist/lib/storage";
import { SessionProvider } from "../providers/SessionProvider";
import user from "../reducers/user";
import { useSession } from "../hooks/useSession";
import depositions from "../reducers/depositions";

const storage = createSecureStore();

const reducers = combineReducers({ user, depositions });

const persistConfig = { key: "noPestsAllowed", storage };

const store = configureStore({
    reducer: persistReducer(persistConfig, reducers),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);
// persistor.purge();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        Boogaloo: require("../assets/fonts/Boogaloo-Regular.ttf"),
        Carme: require("../assets/fonts/Carme-Regular.ttf"),
    });

    const [isSignedUser, setIsSignedUser] = useState(false);
    const { session } = useSession();

    const baseStacks = [
        <Stack.Screen key="landing" name="landing" />,
        <Stack.Screen key="register" name="register" />,
        <Stack.Screen key="login" name="login" />,
        <Stack.Screen key="mentions" name="mentions" />,
        <Stack.Screen key="+not-found" name="+not-found" />,
    ];
    const [stacks, setStacks] = useState(baseStacks);

    useEffect(() => {
        setIsSignedUser((isSigned) => {
            return session?.email !== null;
        });
    }, [session]);

    useEffect(() => {
        if (loaded && isSignedUser) {
            setStacks((stacks) => {
                if (!stacks.some((stack) => stack.props.name === "(tabs)")) {
                    return [<Stack.Screen key="(tabs)" name="(tabs)" />, ...stacks];
                }
                return stacks;
            });
            router.push("/(tabs)");
        }
    }, [isSignedUser]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    const onLogout = () => {
        console.log("user logout : purging persistore");
        persistor.purge();
    };
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <SessionProvider onLogout={onLogout}>
                    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
                        <Stack screenOptions={{ headerShown: false }}>{stacks}</Stack>
                    </ThemeProvider>
                </SessionProvider>
            </PersistGate>
        </Provider>
    );
}
