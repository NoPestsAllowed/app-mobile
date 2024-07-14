import { createContext, PropsWithChildren, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import {
    AuthSessionResult,
    DiscoveryDocument,
    exchangeCodeAsync,
    makeRedirectUri,
    RefreshTokenRequestConfig,
    TokenResponse,
    TokenResponseConfig,
    useAuthRequest,
} from "expo-auth-session";
import { jwtDecode } from "jwt-decode";
import { Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { router } from "expo-router";

interface AuthContextType {
    authenticate: () => Promise<void>;
    signOut: () => void;
    isLoggedIn: boolean;
    user: any;
}

export const AuthContext = createContext<AuthContextType>({
    authenticate: async () => {},
    signOut: () => {},
    isLoggedIn: false,
    user: false,
});

if (!process.env.EXPO_PUBLIC_OIDC_CLIENT) {
    throw new Error("OIDC Client is not defined");
}
const clientId = process.env.EXPO_PUBLIC_OIDC_CLIENT;

WebBrowser.maybeCompleteAuthSession();

export const AuhtProvider = ({ discovery, children }: { discovery: DiscoveryDocument } & PropsWithChildren) => {
    const [user, setUser] = useState<object | false>(false);
    const { getItemAsync: getCachedToken, setItemAsync: setToken } = SecureStore;
    const redirectUri = makeRedirectUri({
        scheme: "com.anonymous.no-pests-allowed",
    });
    const [request, result, promptAsync] = useAuthRequest(
        {
            clientId,
            scopes: ["openid", "offline_access", "email", "userid"],
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
                const refreshConfig: RefreshTokenRequestConfig = {
                    clientId,
                    refreshToken: tokenConfig.refreshToken,
                };

                if (!discovery) {
                    console.log("No discovery");
                    // throw new Error("No discovery");
                }

                try {
                    console.log("refreshing Token Async");
                    tokenResponse = await tokenResponse.refreshAsync(refreshConfig, discovery);
                } catch (error) {
                    console.error("error refreshing token async", error);
                    setToken("jwtToken", "");
                    console.log("CLEARED TOKEN");
                }
            }

            setToken("jwtToken", JSON.stringify(tokenResponse.getRequestConfig()));
            const decoded = jwtDecode(tokenResponse.accessToken);
            setUser({ jwtToken: tokenResponse.accessToken, decoded });
        }
    };

    useEffect(() => {
        readTokenFromStorage();
        if (result) {
            if (result.type === "error" && result.error) {
                console.log("ALERT ALERT ALERT ALERT ALERT ALERT");

                Alert.alert("Authentication error", result.params.error_description || "something went wrong");
                return;
            }
            if (result.type === "success") {
                console.log("SUCCESS RESULT", result);
                const code = result.params.code;
                if (code) {
                    if (!discovery) {
                        throw new Error("No discovery");
                    }
                    const getToken = async () => {
                        try {
                            console.log("Ready to exchangeCodeAsync");

                            try {
                                const codeRes: TokenResponse = await exchangeCodeAsync(
                                    {
                                        code,
                                        redirectUri,
                                        clientId,
                                        scopes: ["openid", "email", "userid", "offline_access"],
                                        extraParams: {
                                            code_verifier: request?.codeVerifier ?? "",
                                        },
                                    },
                                    discovery
                                );
                                console.log("exchangeCodeAsync done!");
                                console.log("codeRes is ", codeRes);

                                const tokenConfig: TokenResponseConfig = codeRes?.getRequestConfig();
                                const jwtToken = tokenConfig.accessToken;
                                const decoded = jwtDecode(codeRes.idToken ? codeRes.idToken : jwtToken);
                                console.log("jwtToken & decoded user : ", { jwtToken, decoded });

                                setToken("jwtToken", JSON.stringify(tokenConfig));
                                setUser({ jwtToken, idToken: codeRes.idToken, decoded });
                            } catch (error) {
                                console.log("EXCHANGE CODE ASYNC FAILURE");

                                console.log(error);
                            }
                        } catch (error) {
                            console.error("HERE IS THE error", error);
                            throw error;
                        }
                    };
                    getToken();
                }
            }
        }
    }, [result]);

    useEffect(() => {
        if (user) {
            router.push("(app)");
            // router.replace("(app)");
        }
    }, [user]);

    const authContext = {
        authenticate: async () => {
            try {
                promptAsync();
            } catch (error) {
                console.log("error error error error error error error");
                console.error(error);
                // throw error;
            }
        },
        signOut: () => {
            alert("sign out");
            SecureStore.deleteItemAsync("jwtToken");
            setUser(false);
            router.replace("/");
        },
        isLoggedIn: !!user,
        user: user,
    };

    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};
