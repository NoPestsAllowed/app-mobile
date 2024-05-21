import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "../../components/navigation/TabBarIcon";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "react-native";
import { useSelector } from "react-redux";
import { Redirect, useNavigation } from "expo-router";
import { useSession } from "../../hooks/useSession";

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const user = useSelector((state) => state.user.value);


    if (!user.token) {
        return <Redirect href="landing" />;
    }

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? "home" : "home-outline"} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="deposition/index"
                options={{
                    title: "Deposition",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? "folder" : "code-slash-outline"} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? "star" : "code-slash-outline"} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
