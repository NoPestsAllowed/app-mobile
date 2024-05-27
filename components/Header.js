import React, { useState, useEffect, useRef } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Image,
    Alert,
    Animated,
    Easing,
    Platform,
    Modal,
} from "react-native";
import { useSession } from "../hooks/useSession";
import { router } from "expo-router";
import { ThemedText } from "./ThemedText";
import { useSelector } from 'react-redux';

export function Header({ style, lightColor, darkColor, children, ...rest }) {
    const { session } = useSession();
    const [menuVisible, setMenuVisible] = useState(false);
    const [borderColor, setBorderColor] = useState("#c17829");

    const rotation = useRef(new Animated.Value(0)).current;
    const user = useSelector((state) => state.user.value);

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

    useEffect(() => {
        const changeBorderColor = () => {
            setBorderColor(prevColor => (prevColor === "#c17829" ? "#470a07" : "#c17829"));
        };

        const borderColorInterval = setInterval(changeBorderColor, 4500);

        return () => clearInterval(borderColorInterval);
    }, []);

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
                <ThemedText style={styles.welcomeText}>Welcome, {user.firstname}</ThemedText>
                <TouchableOpacity style={[styles.avatarContainer, { borderColor }]} onPress={handleAvatarPress}>
                    <Image source={require("../assets/images/avatar1.png")} style={styles.avatar} />
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
                            <ThemedText style={styles.menuItemText}>Create Depositions</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => router.navigate("deposition/mydepositions")}
                        >
                            <ThemedText style={styles.menuItemText}>My Depositions</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => router.navigate("contact")}>
                            <ThemedText style={styles.menuItemText}>Contact us</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => router.navigate("login")}>
                            <ThemedText style={styles.menuItemText}>Logout</ThemedText>
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
        height: 100,
    },
    logoContainer: {
        height: 77,
        width: 77,
        top: 3,
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
        marginRight: 5,
        fontSize: 16,
        color: "white",
        top: 7,
        fontWeight: "800",
    },
    avatarContainer: {
        height: 77,
        width: 77,
        borderRadius: 50,
        borderWidth: 3,
        justifyContent: "center",
        alignItems: "center",
        top: 3,
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
        fontWeight: "700",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
});
