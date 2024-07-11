import {
    AccessTokenRequest,
    DiscoveryDocument,
    exchangeCodeAsync,
    fetchDiscoveryAsync,
    makeRedirectUri,
    refreshAsync,
    TokenResponse,
    useAuthRequest,
} from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { jwtDecode } from "jwt-decode";

WebBrowser.maybeCompleteAuthSession();

let discovery = {};
fetchDiscoveryAsync("http://192.168.1.17:3000/oidc")
    .then((endpoints) => {
        discovery = { ...endpoints };
    })
    .catch((err) => console.error(err));

export default function Page() {
    const [respContent, setRespContent] = useState<string | null>(null);
    const [tokens, setTokens] = useState<TokenResponse>();
    const [userConnection, setUserConnection] = useState<{ user: object | null; discovery: DiscoveryDocument | null }>({
        user: null,
        discovery: discovery,
    });
    const [request, result, promptAsync] = useAuthRequest(
        {
            clientId: "oidc_client",
            scopes: ["openid", "email", "profile"],
            redirectUri: makeRedirectUri({
                scheme: "com.anonymous.no-pests-allowed",
            }),
        },
        userConnection.discovery
    );

    useEffect(() => {
        setRespContent(null);
        if (result?.type === "success") {
            const { code } = result.params;
            setRespContent(code);
        }
    }, [result]);

    useEffect(() => {
        if (respContent && userConnection.discovery) {
            (async () => {
                if (!userConnection.discovery) {
                    throw new Error("No discovery");
                }
                try {
                    const accessToken = new AccessTokenRequest({
                        code: respContent,
                        clientId: "oidc_client",
                        redirectUri: makeRedirectUri({
                            scheme: "com.anonymous.no-pests-allowed",
                        }),
                        scopes: ["openid", "offline_access", "email"],
                        extraParams: {
                            code_verifier: request?.codeVerifier ? request.codeVerifier : "",
                        },
                    });
                    console.log("accessToken", JSON.stringify(accessToken.getRequestConfig(), null, 4));
                    const response = await exchangeCodeAsync(accessToken.getRequestConfig(), userConnection.discovery);
                    console.log("accessToken response", JSON.stringify(response, null, 4));
                    setTokens(response);
                } catch (error) {
                    console.error(error);
                }
            })();
        }
    }, [respContent]);

    const refreshTokenA = async () => {
        if (userConnection.discovery) {
            const newRefreshToken = await refreshAsync(
                {
                    clientId: "oidc_client",
                    refreshToken: tokens?.refreshToken,
                },
                userConnection.discovery
            );
            console.log(newRefreshToken);
            setTokens(newRefreshToken);
        } else {
            alert("no discovery");
        }
    };

    return (
        <View>
            <Link href="/">Go</Link>
            <Text>Login</Text>
            <Button
                disabled={!request}
                title="Login"
                onPress={() => {
                    promptAsync();
                }}
            />
            {tokens && (
                <>
                    <Text>
                        {"expire at : " +
                            typeof jwtDecode(tokens?.idToken ? tokens.idToken : tokens.accessToken).exp !==
                            "undefined" &&
                            new Date(
                                jwtDecode(tokens?.idToken ? tokens.idToken : tokens.accessToken).exp ?? Date.now()
                            ).toLocaleString()}
                    </Text>
                    <Text>{jwtDecode(tokens?.idToken ? tokens.idToken : tokens.accessToken).exp}</Text>
                </>
            )}
            {tokens && <Button onPress={refreshTokenA} title="Log Refresh Token" />}
            {tokens && <Text>{JSON.stringify(tokens, null, 12)}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({});
