import { StyleSheet, KeyboardAvoidingView, Platform, Text, TouchableOpacity, Image } from "react-native";
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
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <ThemedView style={[styles.titleContainer, styles.bgTransparent]}>
                <Image source={require("../assets/images/icon.png")} style={styles.noPestsAllowedLogo} />
                <ThemedText type="title" style={styles.title}>
                    Login
                </ThemedText>
            </ThemedView>

            <ThemedTextInput
                onChangeText={(value) => {
                    setEmail(value);
                }}
                value={email}
                placeholder="Email"
                label="Email"
                keyboardType="email-address"
                inputMode="email"
                style={[styles.profileInfo, styles.input]}
            />

            <ThemedTextInput
                onChangeText={(value) => setPassword(value)}
                value={password}
                placeholder="Password"
                label="Password"
                keyboardType="current-password"
                style={[styles.profileInfo, styles.input]}
                secureTextEntry={true}
            />

            <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
                <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
        //     <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        //         <ThemedView >
        //             <ThemedText style={styles.title}  type="title">Login</ThemedText>
        //             <ThemedTextInput style={styles.input}
        //                 onChangeText={(value) => setEmail(value)}
        //                 value={email}
        //                 placeholder="Email"
        //                 keyboardType="email-address"
        //                 label="Email"
        //             />
        //             <ThemedTextInput style={styles.input}
        //                 onChangeText={(value) => setPassword(value)}
        //                 value={password}
        //                 placeholder="Password"
        //                 keyboardType="current-password"
        //                 label="Password"
        //             />
        //              <TouchableOpacity onPress={() => handleLogin()} style={styles.btnContainer}>
        //     <Text style={styles.buttonText}>Se connecter</Text>
        // </TouchableOpacity>
        //         </ThemedView>
        //     </KeyboardAvoidingView>
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
    bgTransparent: {
        backgroundColor: "transparent",
    },
    inputContainer: {
        width: "100%",
        padding: 30,
        borderRadius: 1,
    },
    input: {
        borderWidth: 1,
        borderColor: "#A53939",
        padding: 5,
        borderRadius: 7,
        margin: 3,
        fontSize: 18,
        textAlign: "center",
        width: "100%",
    },
    buttonText: {
        color: "#f5f5f5",
        fontSize: 18,
    },
    button: {
        width: "100%",
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

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         margin: 30,
//        alignItems: 'center',
//        justifyContent: 'center',

//     },
//     btnContainer: {
//         flexDirection: "row",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: '#A53939',
//         padding: 10,
//         margin: 20,
//         borderRadius: 10,
//         alignItems: 'center',
//         shadowColor: '#888',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 1,
//         shadowRadius: 7,
//         elevation: 3,
//         width: "90 %",
//     },
//     buttonText: {
//         color: '#f5f5f5',
//         fontSize: 18,
//     },
// input: {
//     borderWidth: 1,
//     borderColor: '#A53939',
//     padding: 5,
//     borderRadius: 7,
//     margin: 3,
//     fontSize: 18,
//     textAlign: "center",
//     width: "90%"
// },
