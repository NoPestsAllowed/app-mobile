import {
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    View,
} from "react-native";
import { ThemedText } from "../components/ThemedText";
import { ThemedTextInput } from "../components/ThemedTextInput";
import { ThemedView } from "../components/ThemedView";
import React, { useState } from "react";
import { ThemedButton } from "../components/ThemedButton";
import { useDispatch } from "react-redux";
import { updateEmail, setToken } from "../reducers/user";
import { router } from "expo-router";

const backendUrl = process.env.EXPO_PUBLIC_API_URL;
const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState(false);

    const dispatch = useDispatch();

    const handleRegistration = () => {
        let user = {
            firstname: firstName,
            lastname: lastName,
            email,
            password,
        };
        if (EMAIL_REGEX.test(email)) {
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
        } else {
            setEmailError(true);
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "padding"} style={styles.container}>
            <ThemedView style={styles.titleContainer}>
                <Image source={require("../assets/images/icon.png")} style={styles.noPestsAllowedLogo} />

                <ThemedText type="title" style={styles.title}>
                    Inscription
                </ThemedText>
            </ThemedView>

            <ThemedTextInput
                onChangeText={(value) => setFirstName(value)}
                value={firstName}
                placeholder="Firstname"
                label="Firstname"
                keyboardType="given-name"
                style={[styles.profileInfo, styles.input]}
            />

            <ThemedTextInput
                onChangeText={(value) => setLastName(value)}
                value={lastName}
                placeholder="Lastname"
                label="Lastname"
                keyboardType="family-name"
                style={[styles.profileInfo, styles.input]}
            />

            <ThemedTextInput
                onChangeText={(value) => setEmail(value)}
                value={email}
                placeholder="Email"
                label="Email"
                keyboardType="email"
                style={[styles.profileInfo, styles.input]}
            />
            {emailError && <Text style={styles.error}>Adresse email non valide</Text>}

            <ThemedTextInput
                onChangeText={(value) => setPassword(value)}
                value={password}
                placeholder="Mot de passe"
                label="Mot de passe"
                keyboardType="current-password"
                style={[styles.profileInfo, styles.input]}
                secureTextEntry={true}
            />

            <ThemedTextInput
                onChangeText={(value) => setConfirmPassword(value)}
                value={confirmPassword}
                placeholder="Confirmer Mot de passe"
                label="Confirmer Mot de passe"
                keyboardType="current-password"
                style={[styles.profileInfo, styles.input]}
                secureTextEntry={true}
            />

            <TouchableOpacity style={styles.button} onPress={() => handleRegistration()}>
                <Text style={styles.buttonText}>S'inscrire</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // margin: 20,
        alignItems: "center",
        justifyContent: "center",
        // gap: 10,
    },
    error: {
        marginTop: 10,
        color: "red",
    },
    input: {
        borderWidth: 1,
        borderColor: "#A53939",
        padding: 5,
        borderRadius: 7,
        margin: 3,
        fontSize: 18,
        textAlign: "center",
        width: "90%",
    },
    buttonText: {
        color: "#f5f5f5",
        fontSize: 18,
    },
    button: {
        width: "90%",
        backgroundColor: "#A53939",
        padding: 10,
        marginTop: 50,
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#888",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 7,
        elevation: 3,
    },
    titleContainer: {
        // flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
    },
    title: {
        fontSize: 32,
        color: "#A53939",
        shadowColor: "#888",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 7,
    },
    noPestsAllowedLogo: {
        height: 150,
        width: 150,
        alignItems: "center",
    },
});
