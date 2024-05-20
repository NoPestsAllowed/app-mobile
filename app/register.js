import { TextInput } from "react-native";
import { ThemedText } from "../components/ThemedText";
import { ThemedTextInput } from "../components/ThemedTextInput";
import { ThemedView } from "../components/ThemedView";
import React, { useState } from "react";

export default function register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    return (
        <ThemedView>
            <ThemedText type="title">register</ThemedText>
            <ThemedTextInput
                onChangeText={(value) => setFirstName(value)}
                value={firstName}
                placeholder="First Name"
                label="First Name"
            />
            <ThemedTextInput
                onChangeText={(value) => setLastName(value)}
                value={lastName}
                placeholder="Last Name"
                label="Last Name"
            />
            <ThemedTextInput
                onChangeText={(value) => setEmail(value)}
                value={email}
                placeholder="Email"
                label="Email"
            />
            <ThemedTextInput
                onChangeText={(value) => setPassword(value)}
                value={password}
                placeholder="Password"
                label="Password"
            />
            <ThemedTextInput
                onChangeText={(value) => setConfirmPassword(value)}
                value={confirmPassword}
                placeholder="Confirm Password"
                label="Confirm password"
            />
        </ThemedView>
    );
}
