import { createContext, PropsWithChildren, useEffect, useState } from "react";
import {
    AuthSessionResult,
    DiscoveryDocument,
    exchangeCodeAsync,
    makeRedirectUri,
    RefreshTokenRequestConfig,
    TokenRequestConfig,
    TokenResponse,
    TokenResponseConfig,
    useAuthRequest,
} from "expo-auth-session";
import { jwtDecode } from "jwt-decode";
import { Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { router } from "expo-router";
import { clearToken, getToken, setToken } from "@/services/token-service";

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
    const [user, setUser] = useState<{ jwtToken: string; idToken?: string; decoded: object } | false>(false);
    const redirectUri = makeRedirectUri({
        scheme: "com.anonymous.nopestsallowed",
    });

    const [request, result, promptAsync] = useAuthRequest(
        {
            clientId,
            scopes: ["openid", "offline_access", "email", "userid"],
            redirectUri,
        },
        discovery
    );
    // alert("Req is : \n" + JSON.stringify(request, null, 2));

    const requestFreshToken = async (tokenResponse: TokenResponse) => {
        const refreshConfig: RefreshTokenRequestConfig = {
            clientId,
            refreshToken: tokenResponse.refreshToken,
        };

        try {
            return await tokenResponse.refreshAsync(refreshConfig, discovery);
        } catch (error) {
            await clearToken();
        }
    };

    const readTokenFromStorage = async () => {
        const tokenString = await getToken();
        const tokenConfig: TokenResponseConfig = tokenString ? JSON.parse(tokenString) : null;
        if (tokenConfig) {
            let tokenResponse = new TokenResponse(tokenConfig);
            if (tokenResponse.shouldRefresh()) {
                try {
                    requestFreshToken(tokenResponse).then((response) => {
                        if (response) {
                            tokenResponse = response;
                        }
                    });
                } catch (error) {
                    await clearToken();
                }
            }
        }
    };

    const getTokenForCode = async (code: string) => {
        try {
            const codeRes = await exchangeCodeAsync(
                {
                    code,
                    redirectUri,
                    clientId,
                    scopes: ["openid", "email", "userid", "offline_access"],
                    extraParams: {
                        code_verifier:
                            request?.codeVerifier && request?.codeVerifier !== null ? request?.codeVerifier : "",
                    },
                },
                discovery
            );
            const tokenConfig: TokenResponseConfig = codeRes?.getRequestConfig();
            const jwtToken = tokenConfig.accessToken;
            try {
                const decoded = jwtDecode(codeRes.idToken ? codeRes.idToken : jwtToken);
                console.log("jwtToken & decoded user : ", { jwtToken, decoded });

                // Alert.alert("It works", JSON.stringify(decoded, null, 2), [
                //     {
                //         text: "Set token",
                //         onPress: () => {
                //             setToken(JSON.stringify(tokenConfig)).then((res) => {
                //                 setUser({ jwtToken, idToken: codeRes.idToken, decoded });
                //             });
                //         },
                //     },
                // ]);
                setToken(JSON.stringify(tokenConfig)).then((res) => {
                    setUser({ jwtToken, idToken: codeRes.idToken, decoded });
                });
            } catch (error) {
                alert("Failed to decode token with error : \n" + JSON.stringify(error, null, 2));
            }
            // console.log("exchangeCodeAsync done!");
            // console.log("codeRes is ", codeRes);
            // alert("trying to getToken (after) : codeRes is" + JSON.stringify(codeRes));
            // const tokenConfig: TokenResponseConfig = codeRes?.getRequestConfig();
            // const jwtToken = tokenConfig.accessToken;
            // const decoded = jwtDecode(codeRes.idToken ? codeRes.idToken : jwtToken);
            // console.log("jwtToken & decoded user : ", { jwtToken, decoded });

            // await setToken(JSON.stringify(tokenConfig));
            // setUser({ jwtToken, idToken: codeRes.idToken, decoded });
        } catch (error) {
            console.log("EXCHANGE CODE ASYNC FAILURE");
            alert("error: " + error);
            // throw error;
            await clearToken();
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
                // alert("Result success " + JSON.stringify(result));
                console.log("SUCCESS RESULT", JSON.stringify(result));
                const code = result.params.code;
                if (code) {
                    if (!discovery) {
                        throw new Error("No discovery");
                    }
                    // Alert.alert("ready", "go", [
                    //     {
                    //         text: "Go",
                    //         onPress: () => {
                    //             getTokenForCode(code);
                    //         },
                    //     },
                    // ]);
                    getTokenForCode(code);
                }
            }
        }
    }, [result]);

    useEffect(() => {
        if (user) {
            router.replace("(app)");
            // router.replace("(app)");
        }
    }, [user]);

    const authContext = {
        authenticate: async () => {
            console.log("authenticating");
            try {
                promptAsync();
            } catch (error) {
                console.log("error error error error error error error");
                console.error(error);
                // alert("authenticate error " + JSON.stringify(error));
                throw error;
            }
        },
        signOut: async () => {
            // alert("sign out");
            await clearToken();
            setUser(false);
            router.push("/"); // Must be replace but app crash when logging out from modal...
        },
        isLoggedIn: !!user,
        user: user,
    };

    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};
