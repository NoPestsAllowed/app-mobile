import { useDispatch, useSelector } from "react-redux";
import { updateEmail, setToken, removeToken, clearUserState, updateUser } from "../reducers/user";
import { AuthContext } from "../contexts/authContext";
import { router } from "expo-router";
import { useEffect, useState } from "react";

const backendUrl = process.env.EXPO_PUBLIC_API_URL;

export function SessionProvider(props) {
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
    const [session, setSession] = useState();

    useEffect(() => {
        setSession((session) => {
            return {
                email: user.email,
                token: user.token,
            };
        });
    }, [user]);

    const signIn = (email, password) => {
        fetch(`${backendUrl}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, password: password }),
        })
            .then((res) => {
                return res.json();
            })
            .then((registrationResult) => {
                dispatch(updateEmail(email));
                dispatch(
                    updateUser({
                        firstname: registrationResult.user.firstname,
                        lastname: registrationResult.user.lastname,
                        id: registrationResult.user._id,
                    })
                );
                dispatch(setToken(registrationResult.token));
                router.push("/(tabs)");
            })
            .catch((err) => console.error(err));
    };

    const signOut = async () => {
        // fetch(`${backendUrl}/logout`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${user.token}`,
        //     },
        //     body: JSON.stringify({ token: user.token }),
        // })
        //     .then((res) => res.json())
        //     .then((registrationResult) => {
        //         console.log("logout", registrationResult);
        props.onLogout();
        dispatch(clearUserState());
        router.push("/landing");
        // });
    };

    return (
        <AuthContext.Provider
            value={{
                login: (email, password) => {
                    // console.log("hheerr", email, password);
                    signIn(email, password);
                },
                logout: () => {
                    signOut();
                },
                session,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
