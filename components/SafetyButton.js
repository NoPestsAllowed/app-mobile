import { TouchableOpacity, StyleSheet } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";
import { ThemedView } from "./ThemedView";
import { useState, useEffect } from "react";
import { ThemedText } from "./ThemedText";
import * as Location from "expo-location";

const backendUrl = process.env.EXPO_PUBLIC_API_URL;

export function SafetyButton({ style, lightColor, darkColor, ...otherProps }) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");
    const [userLocation, setUserLocation] = useState(null);

    const validateSafety = () => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === "granted") {
                let location = await Location.getCurrentPositionAsync({});
                setUserLocation(location);
            }
        })();
    };

    useEffect(() => {
        if (userLocation) {
            console.log(userLocation);
            fetch(`${backendUrl}/depositions/by-location`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userLocation),
            })
                .then((res) => res.json())
                .then((safePlaceResponse) => {
                    console.log(safePlaceResponse);
                    // setLastDepositionCount(LastDepositionResponse.depositions.length);
                });
        }
        return () => {};
    }, [userLocation]);

    return (
        <TouchableOpacity style={[styles.container, { backgroundColor }]} onPress={validateSafety}>
            <ThemedText>Vérifier si ma localisation est infestée</ThemedText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        // display: "none",
        borderWidth: 1,
        borderColor: "#9ca3af",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
    },
});
