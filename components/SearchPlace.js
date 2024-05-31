import { Text, StyleSheet, View } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { ThemedTextInput } from "./ThemedTextInput";
import { useSelector } from "react-redux";
import { Dropdown } from "./Dropdown";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useFocusEffect } from "expo-router";

const backendUrl = process.env.EXPO_PUBLIC_API_URL;

export default function SearchPlace() {
    const [searchTerm, setSearchTerm] = useState("");
    const [apiResults, setApiResults] = useState([]);
    const [depositions, setDepositions] = useState([]);
    const user = useSelector((state) => state.user.value);

    const [resultMsg, setResultMsg] = useState("");

    useFocusEffect(
        useCallback(() => {
            return () => {
                clearState();
                setResultMsg("");
            };
        }, [])
    );

    const searchInfestedPlace = (value) => {
        setSearchTerm(value);
        fetch(`${backendUrl}/depositions/search?q=${searchTerm}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        })
            .then((res) => res.json())
            .then((depositions) => {
                const formatedResults = [];
                let places = depositions.depositions.map((deposition) => {
                    return deposition.placeId;
                });
                places = places.filter((it, idx) => places.indexOf(it) === idx);
                places.map((place) => {
                    formatedResults.push({
                        key: place._id,
                        value: place.address,
                    });
                });
                setDepositions(depositions.depositions);
                setApiResults(
                    formatedResults.filter((item, index) => {
                        return index === formatedResults.findIndex((i) => i.key === item.key);
                    })
                );
            });
    };
    const onItemSelected = (item) => {
        const depo = depositions.filter((deposition) => {
            return deposition.placeId._id === item.key;
        });
        if (depo.status === "accepted") {
            // alert("This place is infected ! Move away.");
            setResultMsg("Ce lieu est infecter ! Prenez garde.");
        } else {
            // alert("This place is safe.");
            setResultMsg("Ce lieu n'est pas infecter.");
        }

        clearState();
    };

    const clearState = () => {
        setSearchTerm("");
        setApiResults([]);
        setDepositions([]);
    };
    if (resultMsg !== "") {
        return (
            <ThemedView>
                <ThemedText style={{ color: "red" }}>{resultMsg}</ThemedText>
            </ThemedView>
        );
    }
    return (
        <ThemedView style={styles.container}>
            <ThemedTextInput
                onChangeText={(value) => {
                    searchInfestedPlace(value);
                }}
                value={searchTerm}
                placeholder="Rechercher une adresse"
                style={styles.searchInput}
            />
            <Dropdown results={apiResults} onItemSelected={onItemSelected} />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchInput: {
        //
    },
});
