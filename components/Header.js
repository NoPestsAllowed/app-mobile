import { StyleSheet, TouchableOpacity, useColorScheme, View, Text, Image } from "react-native";
import { ThemedText } from "./ThemedText";
import { useSession } from "../hooks/useSession";

export function Header({ style, lightColor, darkColor, children, ...rest }) {
    const {session}=useSession()
    return (
                <View style={styles.headerContainer}>
                    <Image source={require("../assets/images/icon.png")} style={styles.noPestsAllowedLogo} />
                    <View style={styles.rightHeader}>
                        <Text style={styles.welcomeText}>Welcome, John!</Text>
                        <View style={styles.avatarContainer}>
                            <Image source={require("../assets/images/avatar1.jpg")} style={styles.avatar} />
                        </View>
                    </View>
                </View>
        )}
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: "#9f4634",
        height:130,
    },
    noPestsAllowedLogo: {
        height: 75,
        width: 75,
        top: 15,
    },
    rightHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    welcomeText: {
        marginRight: 25,
        fontSize: 24,
        color: 'white',
        top: 15,
        fontWeight: "800",
    },
    avatarContainer: {
        height: 77, 
        width: 77, 
        borderRadius: 50, 
        borderWidth: 2, 
        borderColor: 'silver', 
        justifyContent: 'center',
        alignItems: 'center',
        top: 15,
    },
    avatar: {
        height: 75,
        width: 75,
        borderRadius: 40, 
    },
});
