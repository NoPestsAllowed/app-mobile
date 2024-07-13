import { Redirect, Stack } from "expo-router";
import { useOIDCAuth } from "@/hooks/useOIDCAuth";

export default function RootLayout() {
    const { isLoggedIn } = useOIDCAuth();

    if (!isLoggedIn) {
        return <Redirect href="/" />;
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen key="(tabs)" name="(tabs)" />
        </Stack>
    );
}
