import { Alert, Button, Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import {
    DiscoveryDocument,
    exchangeCodeAsync,
    fetchDiscoveryAsync,
    makeRedirectUri,
    RefreshTokenRequestConfig,
    TokenResponse,
    TokenResponseConfig,
    useAuthRequest,
    useAutoDiscovery,
} from "expo-auth-session";
import { jwtDecode } from "jwt-decode";
import ConnectButton from "@/components/ConnectButton";

const ISSUER_ENDPOINT = "http://192.168.1.17:3000/oidc";
const CLIENT_ID = "oidc_client";

const clientId = CLIENT_ID;

export default function Register() {
    // const [user, setUser] = useState({});
    // const { getItemAsync: getCachedToken, setItemAsync: setToken } = SecureStore;
    // // const discoveryResponse = useAutoDiscovery(ISSUER_ENDPOINT);
    // const redirectUri = makeRedirectUri({
    //     scheme: "com.anonymous.no-pests-allowed",
    // });

    const [discovery, setDiscovery] = useState<DiscoveryDocument | null>(null);
    // fetchDiscoveryAsync(ISSUER_ENDPOINT).then((discovery) => {

    // });
    useEffect(() => {
        (async () => {
            const discoveryResponse = await fetchDiscoveryAsync(ISSUER_ENDPOINT);
            setDiscovery(discoveryResponse);
        })();
    }, []);

    // const [request, result, promptAsync] = useAuthRequest(
    //     {
    //         clientId,
    //         scopes: ["openid", "offline_access", "email"],
    //         redirectUri,
    //     },
    //     discovery
    // );

    // const readTokenFromStorage = async () => {
    //     const tokenString = await getCachedToken("jwtToken");
    //     const tokenConfig: TokenResponseConfig = tokenString ? JSON.parse(tokenString) : null;

    //     if (tokenConfig) {
    //         let tokenResponse = new TokenResponse(tokenConfig);
    //         if (tokenResponse.shouldRefresh()) {
    //             console.log("REFRESHING");
    //             const refreshConfig: RefreshTokenRequestConfig = {
    //                 clientId,
    //                 refreshToken: tokenConfig.refreshToken,
    //             };

    //             if (!discovery) {
    //                 console.log("No discovery");

    //                 // throw new Error("No discovery");
    //             }
    //             // const endpointConfig: Pick<DiscoveryDocument, "tokenEndpoint"> = discovery.tokenEndpoint;
    //             // console.log(endpointConfig);
    //             console.log("before refreshAsync");

    //             try {
    //                 tokenResponse = await tokenResponse.refreshAsync(refreshConfig, discovery);
    //             } catch (error) {
    //                 console.error("error", error);
    //             }
    //             // tokenResponse = await exchangeCodeAsync(refreshConfig, userConnection.discovery);
    //             console.log("tokenResponse.refreshAsync()", tokenResponse);
    //         }
    //         setToken("jwtToken", JSON.stringify(tokenResponse.getRequestConfig()));
    //         // console.log("tokenResponse.getRequestConfig()", JSON.stringify(tokenResponse.getRequestConfig(), null, 2));

    //         const decoded = jwtDecode(tokenResponse.accessToken);
    //         setUser({ jwtToken: tokenResponse.accessToken, decoded });
    //     }
    // };

    // useEffect(() => {
    //     readTokenFromStorage();
    //     if (result) {
    //         if (result.type === "error" && result.error) {
    //             Alert.alert("Authentication error", result.params.error_description || "something went wrong");
    //             return;
    //         }
    //         if (result.type === "success") {
    //             const code = result.params.code;
    //             if (code) {
    //                 if (!discovery) {
    //                     throw new Error("No discovery");
    //                 }
    //                 const getToken = async () => {
    //                     const codeRes: TokenResponse = await exchangeCodeAsync(
    //                         {
    //                             code,
    //                             redirectUri,
    //                             clientId,
    //                             scopes: ["openid", "offline_access", "email"],
    //                             extraParams: {
    //                                 code_verifier: request?.codeVerifier ?? "",
    //                             },
    //                         },
    //                         discovery
    //                     );
    //                     console.log("codeRes", codeRes);

    //                     const tokenConfig: TokenResponseConfig = codeRes?.getRequestConfig();
    //                     const jwtToken = tokenConfig.accessToken;
    //                     setToken("jwtToken", JSON.stringify(tokenConfig));
    //                     const decoded = jwtDecode(codeRes.idToken ? codeRes.idToken : jwtToken);
    //                     setUser({ jwtToken, decoded });
    //                 };
    //                 getToken();
    //             }
    //         }
    //     }
    // }, [result]);

    // const handleRegistration = () => {
    //     promptAsync();
    // };
    return (
        <View>
            <Text>Register</Text>
            {/* <Button title="Register" onPress={handleRegistration} /> */}
            {discovery && <ConnectButton discovery={discovery} />}
            {/* {user && <Text>{JSON.stringify(user, null, 12)}</Text>} */}
        </View>
    );
}

const styles = StyleSheet.create({});
