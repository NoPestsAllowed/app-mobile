import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedButton } from "@/components/ThemedButton";
import { fetchAuthenticatedUser } from "@/services/user-service";
import { useOIDCAuth } from "@/hooks/useOIDCAuth";
import { ThemedView } from "@/components/ThemedView";

export default function EditProfile() {
    const { id } = useLocalSearchParams();
    const { user: userToken } = useOIDCAuth();
    if (userToken.decoded.sub !== id) {
        return <ThemedText>You are trying to update another profile</ThemedText>;
    }
    const [profileLoaded, setProfileLoaded] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        (async () => {
            const user = await fetchAuthenticatedUser(userToken.jwtToken);
            console.log(user);

            if (user) {
                setFirstName(user.firstname);
                setLastName(user.lastname);
                setEmail(user.email);
                setBirthDate(user.dateOfBirth);
                setProfileLoaded(true);
            }
        })();
    }, []);

    const handleModification = async () => {
        // const userId = user.id;
        // try {
        //     const response = await fetch(`${backendUrl}/users/update/${userId}`, {
        //         method: "PUT",
        //         headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
        //         body: JSON.stringify({
        //             firstname: firstName,
        //             lastname: lastName,
        //         }),
        //     });
        //     if (!response.ok) {
        //         throw new Error(`HTTP error! status: ${response.status}`);
        //     }
        //     const data = await response.json();
        //     console.log(data); // Pour déboguer la réponse
        //     if (data.result) {
        //         dispatch(updateAccount({ firstname: firstName, lastname: lastName }));
        //         console.log("Mise à jour réussie");
        //         setUpdate("Mise à jour réussie");
        //         navigation.navigate("profile/index");
        //     } else {
        //         console.error("Erreur lors de la mise à jour:", data);
        //         setUpdate("Erreur lors de la mise à jour");
        //     }
        // } catch (error) {
        //     console.error("Erreur de modification:", error);
        //     setUpdate("Erreur de modification");
        // }
    };

    if (!profileLoaded) {
        return (
            <View>
                <Text>Loading profile...</Text>
            </View>
        );
    }

    return (
        <ThemedView style={styles.container}>
            <View>
                <ThemedView style={styles.header}>
                    <Image
                        source={{
                            uri: `https://ui-avatars.com/api/?name=${firstName}%20${lastName}&size=110&rounded=true&color=fbbf24&background=991b1b`,
                        }}
                        style={styles.avatar}
                    />
                    <View style={styles.notificationContainer}>
                        {update && <Text style={styles.message}>Vos modifications on bien été prise en compte!!!</Text>}
                    </View>
                </ThemedView>

                <View style={styles.content}>
                    <ThemedTextInput
                        label="Prénom"
                        labelStyle={styles.label}
                        onChangeText={(value) => setFirstName(value)}
                        value={firstName}
                        placeholder="First Name"
                        style={styles.input}
                    />

                    <ThemedTextInput
                        label="Nom"
                        labelStyle={styles.label}
                        onChangeText={(value) => setLastName(value)}
                        value={lastName}
                        placeholder="Last Name"
                        style={styles.input}
                    />

                    <ThemedTextInput
                        label="Email"
                        labelStyle={styles.label}
                        onChangeText={(value) => setEmail(value)}
                        value={email}
                        placeholder="Email"
                        style={styles.input}
                    />
                    {/* <ThemedText style={styles.label}>Birth Date</ThemedText>
            <ThemedTextInput
                onChangeText={(value) => setBirthDate(value)}
                value={birthDate}
                placeholder="Birth Date"
                    style={styles.input}
            /> */}

                    {/* <View style={styles.notificationContainer}>
                <ThemedText style={styles.profileInfo}>Modify notifications</ThemedText>
                <Text style={styles.notifications}>Activate</Text>
                <TouchableOpacity onPress={toggleModifyNotifications}>
                    <Icon
                        name={modifyNotifications ? "bell" : "bell-o"}
                        size={30}
                        color={modifyNotifications ? "#A53939" : "grey"}
                    />
                </TouchableOpacity>
            </View> */}

                    {/* <View style={styles.notificationContainer}>
                <ThemedText style={styles.profileInfo}>Autoriser la géolocation</ThemedText>
                <Pressable onPress={toggleAuthorizeGeolocation}>
                    <Icon name="globe" size={30} color={authorizeGeolocation ? "#A53939" : "grey"} />
                </Pressable>
            </View> */}
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <ThemedButton onPress={() => handleModification()}>Enregistrer les modifications</ThemedButton>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 8,
        paddingHorizontal: 25,
        paddingVertical: 15,
    },
    content: {
        marginHorizontal: 15,
        // fontSize: 18,
    },
    avatar: {
        height: 55,
        width: 55,
        // borderRadius: 50,
    },
    input: {
        borderWidth: 1,
        borderColor: "#A53939",
        padding: 5,
        borderRadius: 7,
        fontWeight: "bold",
    },
    user: {
        height: 85,
        width: 85,
        borderRadius: 50,
        marginRight: 20,
    },
    notifications: {
        fontSize: 18,
        fontStyle: "italic",
    },
    notificationContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 5,
    },
    label: {
        color: "#A53939",
        fontWeight: "bold",
    },
    message: {
        color: "#008000",
        fontSize: 20,
        fontWeight: "bold",
    },
    buttonContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 15,
    },
    buttonText: {
        color: "#f5f5f5",
        fontSize: 18,
    },
});
