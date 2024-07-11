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

const CLIENT_ID = "oidc_client";

const clientId = CLIENT_ID;

export default function ConnectButton({ discovery }: { discovery: DiscoveryDocument }) {
    const [user, setUser] = useState({});
    const { getItemAsync: getCachedToken, setItemAsync: setToken } = SecureStore;
    // const discoveryResponse = useAutoDiscovery(ISSUER_ENDPOINT);
    // setToken("jwtToken", "");
    const redirectUri = makeRedirectUri({
        scheme: "com.anonymous.no-pests-allowed",
    });

    const [request, result, promptAsync] = useAuthRequest(
        {
            clientId,
            scopes: ["openid", "offline_access", "email"],
            redirectUri,
        },
        discovery
    );

    const readTokenFromStorage = async () => {
        const tokenString = await getCachedToken("jwtToken");
        const tokenConfig: TokenResponseConfig = tokenString ? JSON.parse(tokenString) : null;

        if (tokenConfig) {
            let tokenResponse = new TokenResponse(tokenConfig);
            if (tokenResponse.shouldRefresh()) {
                console.log("REFRESHING");
                const refreshConfig: RefreshTokenRequestConfig = {
                    clientId,
                    refreshToken: tokenConfig.refreshToken,
                };

                if (!discovery) {
                    console.log("No discovery");

                    // throw new Error("No discovery");
                }
                // const endpointConfig: Pick<DiscoveryDocument, "tokenEndpoint"> = discovery.tokenEndpoint;
                // console.log(endpointConfig);
                console.log("before refreshAsync");

                try {
                    tokenResponse = await tokenResponse.refreshAsync(refreshConfig, discovery);
                } catch (error) {
                    console.error("error", error);
                }
                // tokenResponse = await exchangeCodeAsync(refreshConfig, userConnection.discovery);
                console.log("tokenResponse.refreshAsync()", tokenResponse);
            }
            setToken("jwtToken", JSON.stringify(tokenResponse.getRequestConfig()));
            // console.log("tokenResponse.getRequestConfig()", JSON.stringify(tokenResponse.getRequestConfig(), null, 2));

            const decoded = jwtDecode(tokenResponse.accessToken);
            setUser({ jwtToken: tokenResponse.accessToken, decoded });
        }
    };

    useEffect(() => {
        readTokenFromStorage();
        if (result) {
            if (result.type === "error" && result.error) {
                Alert.alert("Authentication error", result.params.error_description || "something went wrong");
                return;
            }
            if (result.type === "success") {
                const code = result.params.code;
                if (code) {
                    if (!discovery) {
                        throw new Error("No discovery");
                    }
                    const getToken = async () => {
                        const codeRes: TokenResponse = await exchangeCodeAsync(
                            {
                                code,
                                redirectUri,
                                clientId,
                                scopes: ["openid", "offline_access", "email"],
                                extraParams: {
                                    code_verifier: request?.codeVerifier ?? "",
                                },
                            },
                            discovery
                        );
                        console.log("codeRes", codeRes);

                        const tokenConfig: TokenResponseConfig = codeRes?.getRequestConfig();
                        const jwtToken = tokenConfig.accessToken;
                        setToken("jwtToken", JSON.stringify(tokenConfig));
                        const decoded = jwtDecode(codeRes.idToken ? codeRes.idToken : jwtToken);
                        setUser({ jwtToken, decoded });
                    };
                    getToken();
                }
            }
        }
    }, [result]);

    const handleRegistration = () => {
        promptAsync();
    };
    return (
        <View style={styles.container}>
            <Text>Register</Text>
            <Button title="Register" onPress={handleRegistration} />
            {user && <Text>{JSON.stringify(user, null, 12)}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderColor: "red",
        borderWidth: 1,
    },
});
