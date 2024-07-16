import { Button, StyleSheet, useColorScheme, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { ThemedText } from "@/components/ThemedText";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { ThemedButton } from "@/components/ThemedButton";
import Menu from "@/components/navigation/Menu";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function TabsLayout() {
    const colorScheme = useColorScheme();
    // const getHeaderTitle = (route: any) => {
    //     // If the focused route is not found, we need to assume it's the initial screen
    //     // This can happen during if there hasn't been any navigation inside the screen
    //     // In our case, it's "Feed" as that's the first screen inside the navigator
    //     const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
    //     console.log("routeName is ", routeName);

    //     switch (routeName) {
    //         case "Feed":
    //             return "News feed";
    //         case "Profile":
    //             return "My profile";
    //         case "Account":
    //             return "My account";
    //     }
    // };

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
                            <TabBarIcon name={focused ? "home" : "home-outline"} color={color} />
                        ),
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
            </Tabs>
        </View>
    );
}

const styles = StyleSheet.create({});
