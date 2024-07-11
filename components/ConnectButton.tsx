import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
    DiscoveryDocument,
    exchangeCodeAsync,
    makeRedirectUri,
    RefreshTokenRequestConfig,
    TokenResponse,
    TokenResponseConfig,
    useAuthRequest,
} from "expo-auth-session";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { useOIDCAuth } from "@/hooks/useOIDCAuth";
import { ThemedView } from "./ThemedView";

// const CLIENT_ID = "oidc_client";

// const clientId = CLIENT_ID;

export default function ConnectButton() {
    const { authenticate } = useOIDCAuth();
    const handleRegistration = async () => {
        console.log("ready to connect");
        const result = await authenticate();
        console.log(result);
    };
    return (
        <ThemedView style={[styles.container]}>
            <Button title="Connect" onPress={handleRegistration} />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        borderColor: "#e2e8f0",
        borderWidth: 1,
        borderRadius: 12,
        width: "80%",
        marginHorizontal: "auto",
    },
});
