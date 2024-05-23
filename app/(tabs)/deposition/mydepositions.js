import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View, FlatList, Platform, TouchableHighlight } from "react-native";
import ParallaxScrollView from "../../../components/ParallaxScrollView";
import { ThemedText } from "../../../components/ThemedText";
import { ThemedView } from "../../../components/ThemedView";
import { ThemedButton } from "../../../components/ThemedButton";
import { router } from "expo-router";

export default function MydepositionsTab({ navigation }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [modifyNotifications, setModifyNotifications] = useState(false);
    const [authorizeNotifications, setAuthorizeNotifications] = useState(false);

    const handleLogout = () => {
        navigation.navigate("Home");
    };

    const handleDeleteAccount = () => {
        navigation.navigate("Home");
    };

    const toggleModifyNotifications = () => {
        setModifyNotifications(!modifyNotifications);
    };

    const toggleAuthorizeNotifications = () => {
        setAuthorizeNotifications(!authorizeNotifications);
    };

    const depositions = [
        { title: "Ma maison", address: "1 Rue de la Republique, Meudon", key: "1" },
        { title: "AirBnb", address: "35 Louis Avenue, Nice", key: "2" },
        { title: "Bureau", address: "7 Manon Avenue, Metz", key: "2" },
        { title: "Crèche", address: "1 Rue de Lévis, Paris", key: "3" },
    ];

    const renderItem = ({ item }) => (
        <TouchableHighlight key={item.key} onPress={() => console.log(item)} underlayColor="#DDDDDD">
            <View style={styles.rowContainer}>
                <ThemedText style={styles.line1}>{item.title}</ThemedText>
                <ThemedView style={styles.verticalLine} />
                <ThemedText style={styles.line2}>{item.address}</ThemedText>
            </View>
        </TouchableHighlight>
    );

    return (
        <ParallaxScrollView headerBackgroundColor={{ light: "#9f4634", dark: "#1D3D47" }}>
            <View style={styles.headerContainer}>
                <View style={styles.thinLine} />
            </View>

            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">My depositions</ThemedText>
            </ThemedView>

            <ThemedView style={styles.rowContainerTable}>
                <ThemedView style={styles.rowContainerTitle}>
                    <ThemedText style={styles.lineTitle1}>Name</ThemedText>
                    <ThemedView style={styles.verticalLine} />
                    <ThemedText style={styles.lineTitle2}>Address</ThemedText>
                </ThemedView>

                <FlatList
                    ItemSeparatorComponent={
                        Platform.OS !== "android" &&
                        (({ highlighted }) => <View style={[styles.separator, highlighted && { marginLeft: 0 }]} />)
                    }
                    data={depositions}
                    renderItem={renderItem}
                />
            </ThemedView>

            <ThemedText style={styles.profileInfo}>You have --- depositions</ThemedText>
            <ThemedButton onPress={() => router.navigate("deposition/create")}>Create deposition</ThemedButton>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    thinLine: {
        height: 1,
        backgroundColor: "#A53939",
        width: "100%",
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    profileInfo: {
        margin: 3,
        fontSize: 18,
    },
    rowContainerTable: {
        paddingHorizontal: 10,
    },
    rowContainerTitle: {
        backgroundColor: "#ca8035",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        width: "100%",
    },
    rowContainer: {
        backgroundColor: "#7a2307",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        width: "100%",
    },
    separator: {
        height: 1,
        backgroundColor: "#CCCCCC",
        width: "100%",
    },
    button: {
        backgroundColor: "#A53939",
        padding: 10,
        margin: 5,
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#888",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 7,
        elevation: 3,
    },
    notifications: {
        fontSize: 18,
        fontStyle: "italic",
    },
    buttonText: {
        color: "#f5f5f5",
        fontSize: 18,
    },
    lineTitle1: {
        height: 35,
        flex: 1,
        textAlign: "center",
        paddingLeft: 10,
        lineHeight: 35,
        fontSize: 20,
        color: "white",
        fontWeight: 900,
    },
    lineTitle2: {
        height: 35,
        flex: 3,
        textAlign: "center",
        paddingRight: 10,
        lineHeight: 35,
        fontSize: 20,
        color: "white",
        fontWeight: 900,
    },
    line1: {
        height: 35,
        flex: 1,
        textAlign: "center",
        paddingLeft: 10,
        lineHeight: 35,
        fontSize: 16,
        color: "white",
        fontWeight: 500,
        flexWrap: "wrap",
        right: 5,
    },
    line2: {
        height: 35,
        flex: 3,
        textAlign: "center",
        paddingRight: 10,
        lineHeight: 35,
        fontSize: 16,
        color: "white",
        flexWrap: "wrap",
        right: 5,
    },
    verticalLine: {
        width: 2,
        backgroundColor: "white",
        marginHorizontal: 10,
        height: "100%",
        right: 5,
    },
    notificationContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "lightgrey",
    },
});
