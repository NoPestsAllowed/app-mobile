import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, Alert } from "react-native";
import { useSession } from "../hooks/useSession";

export function Header({ style, lightColor, darkColor, children, ...rest }) {
    const { session } = useSession();
    const [menuVisible, setMenuVisible] = useState(false);

    const handleAvatarPress = () => {
        setMenuVisible(!menuVisible);
    };

    const handleMenuItemPress = (menuItem) => {
        // Handle the press event for each menu item
        switch (menuItem) {
            case "create":
                // Handle create depositories action
                Alert.alert("Create Depositions");
                break;
            case "my":
                // Handle my depositories action
                Alert.alert("My Depositions");
                break;
            case "logout":
                // Handle logout action
                Alert.alert("Logout");
                break;
            default:
                break;
        }
        // Hide the menu after handling the press
        setMenuVisible(false);
    };

    return (
        <View style={styles.headerContainer}>
            <Image source={require("../assets/images/icon.png")} style={styles.noPestsAllowedLogo} />
            <View style={styles.rightHeader}>
                <Text style={styles.welcomeText}>Welcome, John!</Text>
                <TouchableOpacity style={styles.avatarContainer} onPress={handleAvatarPress}>
                    <Image source={require("../assets/images/avatar1.jpg")} style={styles.avatar} />
                </TouchableOpacity>
            </View>
            {menuVisible && (
                <View style={styles.popupMenu}>
                    <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuItemPress("create")}>
                        <Text style={styles.menuItemText}>Create Deposits</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuItemPress("my")}>
                        <Text style={styles.menuItemText}>My Deposits</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuItemPress("logout")}>
                        <Text style={styles.menuItemText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: "#9f4634",
        height: 130,
    },
    noPestsAllowedLogo: {
        height: 75,
        width: 75,
        top: 15,
    },
    rightHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    welcomeText: {
        marginRight: 25,
        fontSize: 24,
        color: "white",
        top: 15,
        fontWeight: "800",
    },
    avatarContainer: {
        height: 77,
        width: 77,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "silver",
        justifyContent: "center",
        alignItems: "center",
        top: 15,
    },
    avatar: {
        height: 75,
        width: 75,
        borderRadius: 40,
    },
    popupMenu: {
        position: "absolute",
        top: 50,
        right: 20,
        height:350,
        backgroundColor: "#ca8035",
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        elevation: 4,
        color: "white",
    },
    menuItem: {
        paddingVertical: 8,
    },
    menuItemText: {
        fontSize: 16,
    },
});
