import React, { useCallback, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import ThemedScrollView from "../../components/ThemedScrollView";
import { ThemedText } from "../../components/ThemedText";
import { ThemedButton } from "../../components/ThemedButton";
import { ThemedView } from "../../components/ThemedView";
import { ThemedTextInput } from "../../components/ThemedTextInput";
import Icon from "react-native-vector-icons/FontAwesome";
import { router, useFocusEffect } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

const backendUrl = process.env.EXPO_PUBLIC_API_URL;

export default function ContactTab({ navigation }) {
    const user = useSelector((state) => state.user.value);
    const [firstName, setFirstName] = useState(user.firstname);
    const [lastName, setLastName] = useState(user.lastname);
    const [email, setEmail] = useState(user.email);
    const [messageTitle, setMessageTitle] = useState("");
    const [message, setMessage] = useState("");
    const [msgSend, setMsgSend] = useState(false);

    useFocusEffect(
        useCallback(() => {
            // Clear the update message when the screen is focused
            return () => {
                setMsgSend(false);
                setMessage("");
                setMessageTitle("");
            };
        }, [])
    );

    const handleSendMessage = async () => {
        console.log(
            firstName,
            lastName,
            email,
            messageTitle,
            message,
            JSON.stringify({
                firstname: firstName,
                lastname: lastName,
                email: email,
                title: messageTitle,
                message,
            })
        );
        console.log(backendUrl);
        fetch(`${backendUrl}/mail/contact-us`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstname: firstName,
                lastname: lastName,
                email: email,
                title: messageTitle,
                message: message,
            }),
        })
            .then((res) => {
                console.log(res);
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setMsgSend(true);
            });
    };

    return (
        <ThemedScrollView>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Nous contacter</ThemedText>
            </ThemedView>

            {msgSend ? (
                <ThemedView>
                    <ThemedText>Votre message à bien été envoyé.</ThemedText>
                </ThemedView>
            ) : (
                <>
                    <ThemedView>
                        <ThemedTextInput
                            onChangeText={(value) => setFirstName(value)}
                            value={firstName}
                            placeholder="Prénom"
                            label="Votre prénom"
                            style={[styles.profileInfo, styles.input]}
                        />

                        <ThemedTextInput
                            onChangeText={(value) => setLastName(value)}
                            value={lastName}
                            placeholder="Nom"
                            label="Votre nom"
                            style={[styles.profileInfo, styles.input]}
                        />

                        <ThemedTextInput
                            onChangeText={(value) => setEmail(value)}
                            value={email}
                            placeholder="Adresse email valide"
                            label="Votre email"
                            style={[styles.profileInfo, styles.input]}
                        />

                        <ThemedTextInput
                            onChangeText={(value) => setMessageTitle(value)}
                            value={messageTitle}
                            placeholder="Titre de votre message"
                            label="Titre de votre message"
                            style={[styles.profileInfo, styles.input]}
                        />
                        <ThemedTextInput
                            onChangeText={(value) => setMessage(value)}
                            value={message}
                            placeholder="Message"
                            label="Votre message"
                            style={[styles.message, styles.input]}
                            multiline
                        />
                    </ThemedView>
                    <ThemedView style={styles.sendButton}>
                        <ThemedButton onPress={handleSendMessage}>Envoyer un message</ThemedButton>
                    </ThemedView>
                </>
            )}
        </ThemedScrollView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        elevation: 1,
        zIndex: 1,
    },

    rightHeader: {
        flexDirection: "row",
        alignItems: "center",
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
    input: {
        borderWidth: 1,
        borderColor: "#A53939",
        padding: 5,
        borderRadius: 7,
    },
    message: {
        height: 200,
        // width: 350,
        radius: 40,
        flexWrap: "wrap",
        fontSize: 16,
        textAlignVertical: "top",
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
    sendButton: {
        alignItems: "center",
    },
});
