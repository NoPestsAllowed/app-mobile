import { StyleSheet, useColorScheme, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function TabsLayout() {
    const colorScheme = useColorScheme();
    return (
        <View style={{ flex: 1 }}>
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
                            <TabBarIcon name={focused ? "folder" : "folder-outline"} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </View>
    );
}

const styles = StyleSheet.create({});
