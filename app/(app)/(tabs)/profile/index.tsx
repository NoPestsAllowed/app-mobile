import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { useOIDCAuth } from "@/hooks/useOIDCAuth";
import { router, useFocusEffect } from "expo-router";
import { User } from "@/types";
import { deleteAuthenticatedUser, fetchAuthenticatedUser } from "@/services/user-service";

export default function Profile() {
    const [user, setUser] = useState<User>();
    const { user: userFromToken, signOut } = useOIDCAuth();

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const fetchedUser = await fetchAuthenticatedUser(userFromToken.jwtToken);
                setUser(fetchedUser);
            })();
        }, [])
    );

    const handleDeleteAccount = () => {
        Alert.alert(
            "Confirmation",
            "Êtes-vous sûr de vouloir supprimer votre compte ?",
            [
                {
                    text: "Annuler",
                    style: "cancel",
                },
                {
                    text: "Supprimer",
                    onPress: async () => {
                        const deletionSuccess = await deleteAuthenticatedUser(userFromToken.jwtToken);
                        if (deletionSuccess) {
                            signOut();
                            router.replace("/");
                        } else {
                            Alert.alert("An error as occured!", "Account not deleted.");
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };
    if (!user) {
        return (
            <ThemedView>
                <ThemedText>An error as occured fetching user profile!</ThemedText>
            </ThemedView>
        );
    }
    return (
        <ThemedView style={styles.container}>
            <View>
                <ThemedView style={styles.header}>
                    <Image
                        source={{
                            uri: `https://ui-avatars.com/api/?name=${user.firstname}%20${user.lastname}&size=110&rounded=true&color=fbbf24&background=991b1b`,
                        }}
                        style={styles.avatar}
                    />
                    <ThemedView style={styles.identityContainer}>
                        <ThemedText style={styles.username}>{user.firstname}</ThemedText>
                        <ThemedText style={styles.email}>{user.email}</ThemedText>
                    </ThemedView>
                </ThemedView>

                <ThemedView style={styles.content}>
                    <View style={styles.userInfos}>
                        <ThemedText style={styles.label}>Prenom: </ThemedText>
                        <ThemedText style={styles.input}>{user.firstname}</ThemedText>

                        <ThemedText style={styles.label}>Nom: </ThemedText>
                        <ThemedText style={styles.input}>{user.lastname}</ThemedText>

                        {user.dateOfBirth && (
                            <>
                                <ThemedText style={styles.label}>Date de naissance: </ThemedText>
                                <ThemedText style={styles.input}>{user.dateOfBirth}</ThemedText>
                            </>
                        )}
                    </View>
                </ThemedView>
            </View>

            {/* <ThemedText style={styles.label}>Email: </ThemedText>
            <ThemedText style={styles.input}>{user.email}</ThemedText> */}

            {/* <ThemedView style={styles.notificationContainer}>
                <ThemedText style={styles.profileInfo}>Autoriser la géolocation</ThemedText>
                <Text style={styles.notifications}>Activer</Text>
                <Pressable onPress={toggleAuthorizeNotifications}>
                    <Icon name="globe" size={30} color={authorizeNotifications ? "#A53939" : "grey"} />
                </Pressable>
            </ThemedView> */}

            <ThemedView style={styles.buttonContainer}>
                <ThemedButton
                    style={styles.button}
                    textStyle={styles.buttonText}
                    onPress={() => router.navigate(`profile/${user._id}`)}
                >
                    Modifier mon compte
                </ThemedButton>
                <ThemedButton style={styles.button} textStyle={styles.buttonText} onPress={() => handleDeleteAccount()}>
                    Supprimer mon compte
                </ThemedButton>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 8,
        paddingHorizontal: 25,
        paddingVertical: 15,
    },
    avatar: {
        height: 55,
        width: 55,
        // borderRadius: 50,
    },
    identityContainer: {
        flexDirection: "column",
    },
    username: {
        fontWeight: "bold",
    },
    email: {
        fontWeight: "light",
    },
    content: {
        marginHorizontal: 15,
        // fontSize: 18,
    },
    userInfos: {
        //
    },
    input: {
        // borderWidth: 1,
        // borderColor: "#A53939",
        padding: 5,
        // borderRadius: 7,
        fontWeight: "bold",
    },
    button: {
        width: "40%",
        backgroundColor: "#A53939",
        padding: 10,
        margin: 5,
        borderRadius: 10,
    },
    buttonText: {
        color: "#f5f5f5",
        fontSize: 18,
        textAlign: "center",
    },
    notifications: {
        fontSize: 18,
        fontStyle: "italic",
    },
    notificationContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 5,
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        marginVertical: 15,
    },
    label: {
        color: "#A53939",
        fontWeight: "bold",
    },
    title: {
        fontSize: 26,
        shadowColor: "#888",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 7,
        fontWeight: "bold",
        margin: 1,
    },
});
