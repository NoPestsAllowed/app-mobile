import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { ThemedText } from "../components/ThemedText";
import { ThemedTextInput } from "../components/ThemedTextInput";
import { ThemedView } from "../components/ThemedView";
import React, { useState } from "react";
import { ThemedButton } from "../components/ThemedButton";
import { useDispatch } from "react-redux";
import { updateEmail, setToken } from "../reducers/user";
import { router } from "expo-router";

const backendUrl = process.env.EXPO_PUBLIC_API_URL;

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();

    const handleRegistration = () => {
        let user = {
            firstname: firstName,
            lastname: lastName,
            email,
            password,
        };

        fetch(`${backendUrl}/register`, {
            method: "Post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((registrationResult) => {
                dispatch(updateEmail(email));
                dispatch(setToken(registrationResult.user.token));
                router.push("/(tabs)");
            })
            .catch((err) => console.error(err));
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ThemedView styles={styles.container}>
                <ThemedView>
                    <ThemedText type="title">Register</ThemedText>
                </ThemedView>
                <ThemedTextInput
                    onChangeText={(value) => setFirstName(value)}
                    value={firstName}
                    placeholder="First Name"
                    label="First Name"
                />
                <ThemedTextInput
                    onChangeText={(value) => setLastName(value)}
                    value={lastName}
                    placeholder="Last Name"
                    label="Last Name"
                />
                <ThemedTextInput
                    onChangeText={(value) => setEmail(value)}
                    value={email}
                    placeholder="Email"
                    keyboardType="email-address"
                    label="Email"
                />
                <ThemedTextInput
                    onChangeText={(value) => setPassword(value)}
                    value={password}
                    placeholder="Password"
                    label="Password"
                />
                <ThemedTextInput
                    onChangeText={(value) => setConfirmPassword(value)}
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    label="Confirm password"
                />
                <ThemedView style={styles.btnContainer}>
                    <ThemedButton onPress={() => handleRegistration()}>Register</ThemedButton>
                </ThemedView>
            </ThemedView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});
