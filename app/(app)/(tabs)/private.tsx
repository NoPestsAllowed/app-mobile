import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useOIDCAuth } from "@/hooks/useOIDCAuth";
import { ScrollView } from "react-native";

export default function Private() {
    const { user } = useOIDCAuth();
    return (
        <ThemedView>
            <ScrollView>
                <ThemedText>Private</ThemedText>
                {user && <ThemedText>{JSON.stringify(user, null, 4)}</ThemedText>}
            </ScrollView>
        </ThemedView>
    );
}
