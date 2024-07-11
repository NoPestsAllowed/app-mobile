import { Redirect, router, Stack } from "expo-router";
import { useOIDCAuth } from "@/hooks/useOIDCAuth";

export default function RootLayout() {
    const { isLoggedIn } = useOIDCAuth();
    // console.log("my OIDC user is : ", user);

    if (!isLoggedIn) {
        return <Redirect href="/" />;
    }

    return (
        <Stack>
            <Stack.Screen key="(tabs)" name="(tabs)/private" />
        </Stack>
    );
}
