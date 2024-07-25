import React, { useCallback, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, Text, View, ScrollView } from "react-native";
// import ThemedScrollView from "@/components/ThemedScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedView } from "@/components/ThemedView";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { router, useFocusEffect } from "expo-router";
import { $t } from "@/lang";

const backendUrl = process.env.EXPO_PUBLIC_API_URL;

export default function ContactTab() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
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
        <ThemedView style={styles.container}>
            <ScrollView>
                <ThemedView style={styles.header}>
                    <ThemedText type="title">{$t("strings.contact_us")}</ThemedText>
                </ThemedView>

                {msgSend ? (
                    <ThemedView>
                        <ThemedText>{$t("strings.msgSent")}</ThemedText>
                    </ThemedView>
                ) : (
                    <>
                        <ThemedView style={styles.content}>
                            <ThemedTextInput
                                onChangeText={(value) => setFirstName(value)}
                                value={firstName}
                                placeholder={$t("forms.fields.firstName.label")}
                                label={$t("forms.fields.firstName.placeholder")}
                                style={styles.input}
                            />

                            <ThemedTextInput
                                onChangeText={(value) => setLastName(value)}
                                value={lastName}
                                placeholder={$t("forms.fields.lastName.label")}
                                label={$t("forms.fields.lastName.placeholder")}
                                style={styles.input}
                            />

                            <ThemedTextInput
                                onChangeText={(value) => setEmail(value)}
                                value={email}
                                placeholder={$t("forms.fields.email.label")}
                                label={$t("forms.fields.email.placeholder")}
                                style={styles.input}
                            />

                            <ThemedTextInput
                                onChangeText={(value) => setMessageTitle(value)}
                                value={messageTitle}
                                placeholder={$t("forms.fields.msgTitle.label")}
                                label={$t("forms.fields.msgTitle.placeholder")}
                                style={styles.input}
                            />
                            <ThemedTextInput
                                onChangeText={(value) => setMessage(value)}
                                value={message}
                                placeholder={$t("forms.fields.contactUsBody.label")}
                                label={$t("forms.fields.contactUsBody.placeholder")}
                                style={[styles.message, styles.input]}
                                multiline
                            />
                        </ThemedView>
                        <ThemedView style={styles.buttonContainer}>
                            <ThemedButton onPress={handleSendMessage}>{$t("strings.sendMsg")}</ThemedButton>
                        </ThemedView>
                    </>
                )}
            </ScrollView>
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
        paddingVertical: 25,
    },
    content: {
        marginHorizontal: 15,
        gap: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: "#A53939",
        padding: 5,
        borderRadius: 7,
    },
    message: {
        height: 200,
        flexWrap: "wrap",
        fontSize: 16,
        textAlignVertical: "top",
    },
    buttonContainer: {
        alignItems: "center",
        marginTop: 15,
        marginBottom: 25,
    },
});
