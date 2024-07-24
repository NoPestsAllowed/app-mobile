import { Button, Platform, StyleSheet, useColorScheme, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { router, Tabs } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { ThemedText } from "@/components/ThemedText";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { ThemedButton } from "@/components/ThemedButton";
import Menu from "@/components/navigation/Menu";
import { useThemeColor } from "@/hooks/useThemeColor";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

function useNotificationObserver() {
    useEffect(() => {
        let isMounted = true;

        function redirect(notification: Notifications.Notification) {
            const url = notification.request.content.data?.url;
            if (url) {
                router.push(url);
            }
        }

        Notifications.getLastNotificationResponseAsync().then((response) => {
            if (!isMounted || !response?.notification) {
                return;
            }
            redirect(response?.notification);
        });

        const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
            redirect(response.notification);
        });

        return () => {
            isMounted = false;
            subscription.remove();
        };
    }, []);
}

export default function TabsLayout() {
    useNotificationObserver();
    const colorScheme = useColorScheme();
    const [expoPushToken, setExpoPushToken] = useState("");
    const [channels, setChannels] = useState<Notifications.NotificationChannel[]>([]);
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);
    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => token && setExpoPushToken(token));

        if (Platform.OS === "android") {
            Notifications.getNotificationChannelsAsync().then((value) => setChannels(value ?? []));
        }
        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
            console.log(response);
        });

        return () => {
            notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current);
            responseListener.current && Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Tabs
                // screenOptions={{
                //     tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                //     headerShown: false,
                // }}
                screenOptions={({ route }) => ({
                    headerShown: true,
                    title: getFocusedRouteNameFromRoute(route),
                    headerStyle: {
                        backgroundColor: useThemeColor({ light: "#fecaca", dark: "#7f1d1d" }, "background"),
                    },
                    // headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                    // headerTitle: (props) => <ThemedText>{props.children}</ThemedText>,
                    headerRight: () => <Menu />,
                    tabBarStyle: {
                        // backgroundColor: useThemeColor({ light: "#fecaca", dark: "#7f1d1d" }, "background"),
                    },
                    tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                    tabBarInactiveBackgroundColor: useThemeColor({ light: "#fecaca", dark: "#7f1d1d" }, "background"),
                    tabBarActiveBackgroundColor: useThemeColor({ light: "#fecaca", dark: "#7f1d1d" }, "background"),
                })}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Accueil",
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? "home" : "home-outline"} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="private"
                    options={{
                        title: "Private",
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? "git-pull-request" : "git-branch"} color={color} />
                        ),
                        href: null,
                    }}
                />
                <Tabs.Screen
                    name="depositions/index"
                    options={{
                        title: "Depositions",
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? "bug" : "bug-outline"} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="depositions/create"
                    options={{
                        title: "Depositions Create",
                        href: null,
                    }}
                />

                <Tabs.Screen
                    name="depositions/[id]"
                    options={{
                        title: "Depositions Edit",
                        href: null,
                    }}
                />

                <Tabs.Screen
                    name="profile/index"
                    options={{
                        title: "Profile",
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? "person" : "person-outline"} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="profile/[id]"
                    options={{
                        title: "Edit Profile",
                        href: null,
                    }}
                />

                <Tabs.Screen
                    name="settings/index"
                    options={{
                        title: "Settings",
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? "cog" : "cog-outline"} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </View>
    );
}

const styles = StyleSheet.create({});

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log("My notification token", token);
        // Learn more about projectId:
        // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
        // EAS projectId is used here.
        // try {
        //     const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        //     if (!projectId) {
        //         throw new Error("Project ID not found");
        //     }
        //     token = (
        //         await Notifications.getExpoPushTokenAsync({
        //             projectId,
        //         })
        //     ).data;
        //     console.log(token);
        // } catch (e) {
        //     token = `${e}`;
        // }
    } else {
        alert("Must use physical device for Push Notifications");
    }

    return token;
}
