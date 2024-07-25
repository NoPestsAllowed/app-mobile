import { Button, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TabBarIcon } from "./TabBarIcon";
import { ThemedView } from "../ThemedView";
import ConnectButton from "../ConnectButton";
import { useOIDCAuth } from "@/hooks/useOIDCAuth";
import { Link } from "expo-router";
import { ThemedText } from "../ThemedText";
import { $t } from "@/lang";

export default function Menu() {
    const [open, setOpen] = useState(false);
    const { signOut } = useOIDCAuth();
    const handleLogout = () => {
        setOpen(false);
        signOut();
    };

    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={open}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    setOpen(false);
                }}
                // onDismiss={() => setOpen(false)}
                presentationStyle="overFullScreen"
            >
                <Pressable style={styles.container} onPress={() => setOpen(false)}>
                    <ThemedView style={styles.menu}>
                        <View style={styles.menuItem}>
                            <Link href="/depositions/create">
                                <ThemedText type="link" style={styles.uppercase}>
                                    {$t("strings.createDeposition")}
                                </ThemedText>
                            </Link>
                        </View>
                        <View style={styles.menuItem}>
                            <Link href="/legal-notice">
                                <ThemedText type="link" style={styles.uppercase}>
                                    {$t("strings.legal")}
                                </ThemedText>
                            </Link>
                        </View>
                        <View style={styles.menuItem}>
                            <Link href="/contact-us">
                                <ThemedText type="link" style={styles.uppercase}>
                                    {$t("strings.contact")}
                                </ThemedText>
                            </Link>
                        </View>
                        <View style={styles.logoutBtn}>
                            <Button title={$t("ui.logOut").toUpperCase()} onPress={() => handleLogout()} />
                        </View>
                        {/* <ConnectButton style={styles.logoutBtn} /> */}
                    </ThemedView>
                </Pressable>
            </Modal>
            <Pressable style={styles.btn} onPress={() => setOpen((open) => !open)}>
                <TabBarIcon
                    name={open ? "ellipsis-vertical" : "ellipsis-vertical-outline"}
                    color={open ? "blue" : "black"}
                />
            </Pressable>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        // position: "relative",
        // height: "100%",
        // justifyContent: "center",
        // backgroundColor: "white",
        flex: 1,
        // borderWidth: 2,
        alignItems: "flex-end",
    },
    btn: {
        height: "100%",
        justifyContent: "center",
        position: "relative",
    },
    menu: {
        // position: "absolute",
        // top: "100%",
        // right: 0,
        // borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 25,
        marginTop: 25,
        borderRadius: 5,
        alignItems: "flex-start",
        // backgroundColor: "rgba(254, 226, 226,0.65)",
        backgroundColor: "white",
        // width: "25%",
    },
    menuItem: {
        minWidth: "100%",
        borderBottomWidth: 1,
        borderBottomColor: "#cbd5e1",
        paddingVertical: 5,
    },
    logoutBtn: {
        marginTop: 15,
        margin: "auto",
    },
    uppercase: {
        textTransform: "uppercase",
    },
});
