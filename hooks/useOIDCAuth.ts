import { AuthContext } from "@/contexts/auth";
import { useContext } from "react";

export function useOIDCAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useOIDCAuth must be used inside AuthContext");

    }
    return context;
}
