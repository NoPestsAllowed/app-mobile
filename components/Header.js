import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, Alert, Animated, Easing, Platform, Modal } from "react-native";
import { useSession } from "../hooks/useSession";
import { router } from "expo-router";

export function Header({ style, lightColor, darkColor, children, ...rest }) {
    const { session } = useSession();
    const [menuVisible, setMenuVisible] = useState(false);

    const rotation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const rotateLogo = () => {
            Animated.timing(rotation, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start(() => {
                rotation.setValue(0);
            });
        };

        rotateLogo();
        const interval = setInterval(rotateLogo, 0.25 * 60 * 1000);

        return () => clearInterval(interval);
    }, [rotation]);

    const handleAvatarPress = () => {
        setMenuVisible(!menuVisible);
    };

    const handleMenuItemPress = (menuItem) => {
        switch (menuItem) {
            case "create":
                Alert.alert("Create Depositions");
                break;
            case "my":
                Alert.alert("My Depositions");
                break;
            case "logout":
                Alert.alert("Logout");
                break;
            default:
                break;
        }
        setMenuVisible(false);
    };

    const rotateY = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    return (
        <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
                <Animated.Image
                    source={require("../assets/images/icon.png")}
                    style={[styles.noPestsAllowedLogo, { transform: [{ rotateY }] }]}
                />
            </View>
            <View style={styles.rightHeader}>
                <Text style={styles.welcomeText}>Welcome, John!</Text>
                <TouchableOpacity style={styles.avatarContainer} onPress={handleAvatarPress}>
                    <Image source={require("../assets/images/avatar1.jpg")} style={styles.avatar} />
                </TouchableOpacity>
            </View>
            <Modal
                visible={menuVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setMenuVisible(false)}
            >
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
                    <View style={styles.popupMenu}>

                        <TouchableOpacity style={styles.menuItem} onPress={() => router.navigate("deposition/create")}>
                            <Text style={styles.menuItemText}>Create Depositions</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => router.navigate("deposition/mydepositions")}>
                            <Text style={styles.menuItemText}>My Depositions</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => router.navigate("contact")}>
                            <Text style={styles.menuItemText}>Contact us</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => router.navigate("login")}>
                            <Text style={styles.menuItemText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
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
    logoContainer: {
        height: 77,
        width: 77,
        top:15,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#c17829",
        justifyContent: "center",
        alignItems: "center",
    },
    noPestsAllowedLogo: {
        height: 75,
        width: 75,
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
        borderColor: "#c17829",
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
        top: 200,
        right: 20,
        height: 225,
        backgroundColor: "#ca8035",
        borderRadius: 20,
        padding: 25,
        elevation: 4,
        color: "black",
        elevation: 10, 
        zIndex: 10, 
    },
    menuItem: {
        paddingVertical: 8,
    },
    menuItemText: {
        fontSize: 18,
        margin: 5,
        color: "white",
        fontWeight:"700",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
});
