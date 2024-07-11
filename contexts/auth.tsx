import { authReducer, AuthAction, AuthState } from "@/reducers/auth";
import { createContext, PropsWithChildren, ReducerAction, useMemo, useReducer } from "react";

interface AuthContextType {
    signIn: (data: any) => Promise<void>;
    signUp: (data: any) => Promise<void>;
    signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    signIn: async (data: any) => {},
    signUp: async (data: any) => {},
    signOut: () => {},
});

export const AuhtProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(authReducer, {
        isLoading: true,
        isSignout: false,
        userToken: null,
    });

    const authContext = useMemo(
        () => ({
            signIn: async (data: any) => {
                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `SecureStore`
                // In the example, we'll use a dummy token

                dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
            },
            signOut: () => dispatch({ type: "SIGN_OUT" }),
            signUp: async (data: any) => {
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `SecureStore`
                // In the example, we'll use a dummy token

                dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
            },
        }),
        []
    );
    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};
