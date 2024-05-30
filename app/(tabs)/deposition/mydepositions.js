import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, TouchableOpacity, Text, View, FlatList, Platform, TouchableHighlight } from "react-native";
import ParallaxScrollView from "../../../components/ParallaxScrollView";
import { ThemedText } from "../../../components/ThemedText";
import { ThemedView } from "../../../components/ThemedView";
import { ThemedButton } from "../../../components/ThemedButton";
import { ThemedButtonEdit } from "../../../components/ThemedButtonEdit";
import { Link, router, useFocusEffect } from "expo-router";
import { useSelector } from "react-redux";
import EmptyState from "../../../components/EmptyState";
import MapView, { Marker } from "react-native-maps";
import DepositionCard from "../../../components/DepositionCard";
import moment from "moment";
import "moment/locale/fr";

moment.locale("fr");

const backendUrl = process.env.EXPO_PUBLIC_API_URL;

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
    const [depositions, setDepositions] = useState([]);
    const user = useSelector((state) => state.user.value);

    useFocusEffect(
        useCallback(() => {
            fetch(`${backendUrl}/users/depositions`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            })
                .then((res) => res.json())
                .then((depositionsResponse) => {
                    console.log(depositionsResponse.depositions.length);
                    setDepositions(depositionsResponse.depositions);
                });
            return () => {
                console.log("This route is now unfocused.");
            };
        }, [])
    );

    // const depositions = [
    //     { title: 'Maison', address: '1 Rue de la Republique, Meudon', key: '1' },
    //     { title: 'AirBnb', address: '35 Louis Avenue, Nice', key: '2' },
    //     { title: 'Bureau', address: '7 Manon Avenue, Metz', key: '3' },
    //     { title: 'Crèche', address: '1 Rue de Lévis, Paris', key: '4' },
    // ];

    // const renderItem = ({ item }) => (
    //     <TouchableHighlight key={item.key} onPress={() => console.log(item)} underlayColor="#DDDDDD">
    //         <View style={styles.rowContainer}>
    //             <View style={styles.rowContent}>
    //                 <View style={styles.rowTextContainer}>
    //                     <ThemedText style={styles.line1}>{item.title}</ThemedText>
    //                     <ThemedText style={styles.line2}>{item.address}</ThemedText>
    //                 </View>
    //                 <View style={styles.actionButtonsContainer}>
    //                     <ThemedButtonEdit onPress={() => router.navigate("deposition/id", { id: item.key })}>Open</ThemedButtonEdit>
    //                     <ThemedButtonEdit onPress={() => router.navigate("deposition/edit", { id: item.key })}>Edit</ThemedButtonEdit>
    //                     <ThemedButtonEdit onPress={() => router.navigate("deposition/delete", { id: item.key })}>Delete</ThemedButtonEdit>
    //                 </View>
    //             </View>
    //         </View>
    //     </TouchableHighlight>
    // );

    return (
        <ParallaxScrollView headerBackgroundColor={{ light: "#9f4634", dark: "#1D3D47" }}>
            <View style={styles.headerContainer}>
                <View style={styles.thinLine} />
            </View>
            {depositions.map((deposition) => {
                return (
                    <Marker
                        key={deposition._id}
                        coordinate={{
                            latitude: deposition.placeId.geojson.coordinates[0],
                            longitude: deposition.placeId.geojson.coordinates[1],
                        }}
                        title={deposition.name}
                        description={deposition.description}
                    />
                );
            })}

            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title" style={styles.title}>
                    Mes dépositions
                </ThemedText>
            </ThemedView>

            <ThemedView style={styles.nomQuiVeutRienDire}>
                {depositions.length === 0 && (
                    <EmptyState headline="No depo" desc="Start by creating a deposition">
                        <ThemedButton onPress={() => router.navigate("deposition/create")}>
                            Create deposition
                        </ThemedButton>
                    </EmptyState>
                )}

                {depositions.length > 0 &&
                    depositions.map((deposition, index) => {
                        // console.log(deposition._id, index);
                        return (
                            <ThemedView style={styles.rowContainer}>
                                <Link
                                    style={{ marginVertical: 5 }}
                                    key={deposition._id}
                                    href={{
                                        pathname: "/deposition/[id]",
                                        params: { id: deposition._id },
                                    }}
                                >
                                    {/* <DepositionCard key={deposition._id} deposition={deposition} /> */}
                                    <ThemedView key={deposition._id}>
                                        <ThemedView style={styles.rowContent}>
                                            <ThemedView style={styles.rowTextContainer}>
                                                <ThemedText style={styles.line1}>Déposition: </ThemedText>
                                                <ThemedText style={styles.line2}>{deposition.name}</ThemedText>
                                            </ThemedView>
                                            <ThemedView style={styles.rowTextContainer}>
                                                <ThemedText style={styles.line1}> Adresse: </ThemedText>
                                                <ThemedText style={styles.line2}>
                                                    {deposition.placeId.address}
                                                </ThemedText>
                                            </ThemedView>
                                            <ThemedView style={styles.rowTextContainer}>
                                                <ThemedText style={styles.line1}>Description: </ThemedText>
                                                <ThemedText style={styles.line2}> {deposition.description}</ThemedText>
                                            </ThemedView>
                                        </ThemedView>
                                        <ThemedView style={styles.date}>
                                            <ThemedText>
                                                Déposition faite le :{" "}
                                                {moment(deposition.createdAt).format("DD MMMM YYYY")}
                                            </ThemedText>
                                        </ThemedView>
                                    </ThemedView>
                                </Link>
                                <ThemedView style={styles.actionButtonsContainer}>
                                    <ThemedButtonEdit
                                        onPress={() => router.navigate("deposition/edit", { id: item.key })}
                                    >
                                        Edit
                                    </ThemedButtonEdit>
                                    <ThemedButtonEdit
                                        onPress={() => router.navigate("deposition/delete", { id: item.key })}
                                    >
                                        Delete
                                    </ThemedButtonEdit>
                                </ThemedView>
                            </ThemedView>
                        );
                    })}
            </ThemedView>

            <ThemedView style={styles.rowContainerTable}></ThemedView>

            <ThemedText style={styles.profileInfo}>Vous avez {depositions.length} déposition(s)</ThemedText>
            <ThemedButton style={styles.buttonCreate} onPress={() => router.navigate("deposition/create")}>
                Create deposition
            </ThemedButton>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    rowContainer: {
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        shadowColor: "#7a2307",
        shadowOffset: { width: 7, height: 7 },
        shadowOpacity: 0.8,
        elevation: 3,
        marginTop: 10,
    },
    rowContainerTitle: {
        backgroundColor: " #ca8035",
        flexDirection: "row",
        justifyContent: "space-around",
        borderRadius: 5,
        // shadowColor: '#7a2307',
        // shadowOffset: { width: 0, height: 3 },
        // shadowOpacity: 0.5,
        // shadowRadius: 25,
        elevation: 3,
        marginBottom: 10,
    },
    lineTitle1: {
        backgroundColor: " #ca8035",
        fontSize: 20,
        color: "#470a07",
        marginTop: 10,
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
        shadowColor: "#7a2307",
    },
    rowContent: {
        flexDirection: "column",
        flex: 1,
        borderRadius: 25,
        shadowColor: "#7a2307",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 35,
        marginTop: 10,
        backgroundColor: "transparent",
    },
    rowTextContainer: {
        // marginLeft: 5,
        // marginRight: 10,
        flex: 1,
        backgroundColor: "transparent",
        gap: 10,
    },
    actionButtonsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
    },
    line1: {
        fontSize: 18,
        marginRight: 10,
        fontWeight: 500,
        flexWrap: "wrap",
        // marginBottom: 5,
        fontWeight: "bold",
    },
    line2: {
        fontSize: 18,
        marginLeft: 25,
        marginRight: 10,
        color: "black",
        flexWrap: "wrap",
        borderWidth: 1,
        borderRadius: 7,
        marginBottom: 5,

        borderColor: "#A53939",
    },
    titleContainer: {
        backgroundColor: " #ca8035",
    },
    title: {
        shadowColor: "#7a2307",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        textAlign: "center",
    },
    date: {
        alignItems: "flex-end",
        marginTop: 20,
    },
    profileInfo: {
        textAlign: "center",
    },
    buttonCreate: {
        marginLeft: 40,
    },
});
