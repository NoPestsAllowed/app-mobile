import { authReducer, AuthAction, AuthState } from "@/reducers/auth";
import { createContext, PropsWithChildren, ReducerAction, useEffect, useMemo, useReducer, useState } from "react";
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

interface AuthContextType {
    signIn: () => Promise<void>;
    // signUp: () => Promise<AuthSessionResult | void>;
    signOut: () => void;
    user: any;
}

export const AuthContext = createContext<AuthContextType>({
    signIn: async () => {},
    // signUp: async () => {},
    signOut: () => {},
    user: {},
});

if (!process.env.EXPO_PUBLIC_OIDC_CLIENT) {
    throw new Error("OIDC Client is not defined");
}
const clientId = process.env.EXPO_PUBLIC_OIDC_CLIENT;

WebBrowser.maybeCompleteAuthSession();

export const AuhtProvider = ({ discovery, children }: { discovery: DiscoveryDocument } & PropsWithChildren) => {
    const [user, setUser] = useState({});
    const { getItemAsync: getCachedToken, setItemAsync: setToken } = SecureStore;
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
    // console.log("result result result result result result result result");
    // console.log(result);

    ////////////////////////////////////////////////////////////////////////////
    const [state, dispatch] = useReducer(authReducer, {
        isLoading: true,
        isSignout: false,
        userToken: null,
    });

    const authContext = {
        signIn: async () => {
            // In a production app, we need to send some data (usually username, password) to server and get a token
            // We will also need to handle errors if sign in failed
            // After getting token, we need to persist the token using `SecureStore`
            // In the example, we'll use a dummy token
            try {
                promptAsync();
            } catch (error) {
                console.log("error error error error error error error");
                console.error(error);
                throw error;
            }

            dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
        },
        signOut: () => dispatch({ type: "SIGN_OUT" }),
        user: user,
        // signUp: async (data: any) => {
        //     // In a production app, we need to send user data to server and get a token
        //     // We will also need to handle errors if sign up failed
        //     // After getting token, we need to persist the token using `SecureStore`
        //     // In the example, we'll use a dummy token

        //     dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
        // },
    };

    // const authContext = useMemo(
    //     () => ({
    //         signIn: async () => {
    //             // In a production app, we need to send some data (usually username, password) to server and get a token
    //             // We will also need to handle errors if sign in failed
    //             // After getting token, we need to persist the token using `SecureStore`
    //             // In the example, we'll use a dummy token
    //             try {
    //                 const token = await promptAsync();
    //                 console.log("after prompt async", token);
    //             } catch (error) {
    //                 console.log("error error error error error error error");

    //                 console.error(error);
    //             }

    //             dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
    //         },
    //         signOut: () => dispatch({ type: "SIGN_OUT" }),
    //         // signUp: async (data: any) => {
    //         //     // In a production app, we need to send user data to server and get a token
    //         //     // We will also need to handle errors if sign up failed
    //         //     // After getting token, we need to persist the token using `SecureStore`
    //         //     // In the example, we'll use a dummy token

    //         //     dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
    //         // },
    //     }),
    //     []
    // );
    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};
