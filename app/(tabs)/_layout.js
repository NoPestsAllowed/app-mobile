import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "../../components/navigation/TabBarIcon";
import { Header } from "../../components/Header";
import { Colors } from "../../constants/Colors";
import { KeyboardAvoidingView, useColorScheme } from "react-native";
import { useSelector } from "react-redux";
import { Redirect, useNavigation } from "expo-router";
import { useSession } from "../../hooks/useSession";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const user = useSelector((state) => state.user.value);

    if (!user.token) {
        return <Redirect href="landing" />;
    }

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView style={{ flex: 1 }}>
                    <Header></Header>
                    <Tabs
                        screenOptions={{
                            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                            headerShown: false,
                        }}
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
                            name="deposition/mydepositions"
                            options={{
                                title: "Mes dépositions",
                                tabBarIcon: ({ color, focused }) => (
                                    <TabBarIcon name={focused ? "folder" : "folder-outline"} color={color} />
                                ),
                            }}
                        />
                        <Tabs.Screen
                            name="profile/index"
                            options={{
                                title: "Profile",
                                tabBarIcon: ({ color, focused }) => (
                                    <TabBarIcon name={focused ? "eye" : "eye-outline"} color={color} />
                                ),
                            }}
                        />
                        <Tabs.Screen
                            name="profile/update"
                            options={{
                                title: "Update Profile",
                                href: null,
                            }}
                        />

                        <Tabs.Screen
                            name="deposition/create"
                            options={{
                                title: "Deposition Create",
                                href: null,
                            }}
                        />
                        <Tabs.Screen
                            name="deposition/detail"
                            options={{
                                title: "Deposition Detail",
                                href: null,
                            }}
                        />
                        <Tabs.Screen
                            name="deposition/[id]"
                            options={{
                                title: "Deposition Detail",
                                href: null,
                            }}
                        />
                        {/* <Tabs.Screen
                            name="deposition/mydepositions"
                            options={{
                                title: "MyDeposition",
                                href: null,
                            }}
                        /> */}
                        <Tabs.Screen
                            name="contact"
                            options={{
                                title: "Contact",
                                tabBarIcon: ({ color, focused }) => (
                                    <TabBarIcon name={focused ? "mail" : "mail-outline"} color={color} />
                                ),
                            }}
                        />
                    </Tabs>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}
