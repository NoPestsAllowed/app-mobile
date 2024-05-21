import { createContext } from "react";

export const AuthContext = createContext({
    login: () => null,
    logout: () => null,
    session: null,
});
