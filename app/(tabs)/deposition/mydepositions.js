import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View, FlatList, Platform, TouchableHighlight } from "react-native";
import ParallaxScrollView from "../../../components/ParallaxScrollView";
import { ThemedText } from "../../../components/ThemedText";
import { ThemedView } from "../../../components/ThemedView";
import { ThemedButton } from "../../../components/ThemedButton";
import { ThemedButtonEdit } from "../../../components/ThemedButtonEdit";
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
        { title: 'Maison', address: '1 Rue de la Republique, Meudon', key: '1' },
        { title: 'AirBnb', address: '35 Louis Avenue, Nice', key: '2' },
        { title: 'Bureau', address: '7 Manon Avenue, Metz', key: '2' },
        { title: 'Crèche', address: '1 Rue de Lévis, Paris', key: '3' },
    ];

    const renderItem = ({ item }) => (
        <TouchableHighlight key={item.key} onPress={() => console.log(item)} underlayColor="#DDDDDD">
            <View style={styles.rowContainer}>
                <View style={styles.rowContent}>
                    <View style={styles.rowTextContainer}>
                        <ThemedText style={styles.line1}>{item.title}</ThemedText>
                        <ThemedText style={styles.line2}>{item.address}</ThemedText>
                    </View>
                    <View style={styles.actionButtonsContainer}>
                        <ThemedButtonEdit onPress={() => router.navigate("deposition/edit", { id: item.key })}>Edit</ThemedButtonEdit>
                        <ThemedButtonEdit onPress={() => router.navigate("deposition/delete", { id: item.key })}>Delete</ThemedButtonEdit>
                    </View>
                </View>
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
                    <ThemedText style={styles.lineTitle3}>Action</ThemedText>
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
            <ThemedButton onPress={() => router.navigate("deposition/create")}>
                Create deposition
            </ThemedButton>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    rowContainer: {
        backgroundColor: "white",
        flexDirection: 'row',
        alignItems: 'center', 
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        shadowColor: '#7a2307',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 25,
        elevation: 3,
    },
    rowContainerTitle: {
        backgroundColor: " #ca8035", 
        flexDirection: 'row',
        justifyContent: "space-around",
        borderRadius: 5,
        shadowColor: '#7a2307',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 25,
        elevation: 3,
        marginBottom:10,
    },
    lineTitle1: {
        backgroundColor: " #ca8035",  
        fontSize: 20,
        color: "#470a07",
    },
    lineTitle2: {
        backgroundColor: " #ca8035",  
        fontSize: 20,
        color: "#470a07",
    },
    lineTitle3: {
        backgroundColor: " #ca8035",  
        fontSize: 20,
        color: "#470a07",
        shadowOpacity: 0.5,
        shadowColor: '#7a2307',
    },
    rowContent: {
        flexDirection: 'column',
        flex: 1,
    },
    rowTextContainer: {
        flexDirection: 'row',
        marginLeft:5,
        marginRight:10,
        flex: 1,
    },
    actionButtonsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
    },
    line1: {
        fontSize: 18,
        marginRight:10,
        color: "black",
        fontWeight: 500,
        flexWrap: "wrap",
        marginBottom: 5,
    },
    line2: {
        fontSize: 18,
        marginLeft:25,
        marginRight:10,
        color: "black",
        flexWrap: "wrap",
    },
});
