import {
    AccessTokenRequest,
    DiscoveryDocument,
    exchangeCodeAsync,
    fetchDiscoveryAsync,
    makeRedirectUri,
    refreshAsync,
    TokenResponse,
    useAuthRequest,
    useAutoDiscovery,
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

        // console.log(JSON.stringify(endpoints, null, 2));
    })
    .catch((err) => console.error(err));

export default function Page() {
    const [respContent, setRespContent] = useState<string | null>(null);
    const [tokens, setTokens] = useState<TokenResponse>();
    // Endpoint
    const [userConnection, setUserConnection] = useState<{ user: object | null; discovery: DiscoveryDocument | null }>({
        user: null,
        discovery: discovery,
    });

    // const discovery = {
    //     authorizationEndpoint: "http://192.168.1.17:3000/oidc/auth",
    //     tokenEndpoint: "http://192.168.1.17:3000/oidc/token",
    //     revocationEndpoint: "http://192.168.1.17:3000/oidc/session/end",
    // };
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
    // console.log("request", request);
    // console.log("result", result);

    useEffect(() => {
        setRespContent(null);
        if (result?.type === "success") {
            // console.log("result", result);
            const { code } = result.params;
            setRespContent(code);
            // console.log("code is ", code);

            // (async () => {
            //     if (userConnection.discovery !== null && userConnection.discovery.tokenEndpoint) {
            //         const tokenResponse = await fetch(userConnection.discovery.tokenEndpoint, {
            //             method: "POST",
            //             headers: {
            //                 "Content-Type": "application/x-www-form-urlencoded",
            //                 Authorization: "Basic " + btoa("oidc_client:a_different_secret"),
            //             },
            //             body: JSON.stringify({
            //                 client_id: "oidc_client",
            //                 client_secret: "a_different_secret",
            //                 grant_type: "authorization_code",
            //                 code,
            //                 redirect_uri: makeRedirectUri({
            //                     scheme: "com.anonymous.no-pests-allowed",
            //                 }),
            //             }),
            //         });

            //         const tokenData = await tokenResponse.json();
            //         console.log("tokenData", tokenData);
            //     } else {
            //         alert("Ta mère");
            //     }
            // })();
        }
    }, [result]);

    useEffect(() => {
        if (respContent && userConnection.discovery) {
            // console.log("request?.codeVerifier", request?.codeVerifier);
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
                    // const response = await accessToken.performAsync(userConnection.discovery);
                    console.log("accessToken", JSON.stringify(accessToken.getRequestConfig(), null, 4));
                    const response = await exchangeCodeAsync(accessToken.getRequestConfig(), userConnection.discovery);
                    console.log("accessToken response", JSON.stringify(response, null, 4));
                    setTokens(response);
                } catch (error) {
                    console.error(error);
                }

                // if (userConnection.discovery) {
                //     console.log("before exchangeCodeAsync");
                //     // accessToken
                //     //     .performAsync(userConnection.discovery)
                //     //     .then((test) => {
                //     //         console.log("test", test);
                //     //     })
                //     //     .catch((err) => {
                //     //         console.error("test error", err);
                //     //     });

                //     try {
                //         console.log("accessToken config is", accessToken);

                //         const accessTokenResult = await exchangeCodeAsync(accessToken, userConnection.discovery);
                //         console.log("ACCESS_TOKEN", accessTokenResult);
                //     } catch (error) {
                //         console.error("ACCESS_TOKEN ERROR", error);
                //     }
                // }
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
                        {/* {JSON.stringify(jwtDecode(tokens?.idToken ? tokens.idToken : tokens.accessToken), null, 12)} */}
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
