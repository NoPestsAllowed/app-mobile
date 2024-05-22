import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { ThemedText } from "../components/ThemedText";
import { ThemedTextInput } from "../components/ThemedTextInput";
import { ThemedView } from "../components/ThemedView";
import { ThemedButton } from "../components/ThemedButton";
import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEmail } from "../reducers/user";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../contexts/authContext";
import { useSession } from "../hooks/useSession";
import { router } from "expo-router";

// const backendUrl = process.env.EXPO_PUBLIC_API_URL;

export default function register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useSession();

    const handleLogin = () => {
        login(email, password);
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ThemedView styles={styles.container}>
                <ThemedText type="title">Login</ThemedText>
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
                <ThemedView style={styles.btnContainer}>
                    <ThemedButton onPress={() => handleLogin()}>Login</ThemedButton>
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
