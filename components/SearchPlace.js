import { Text, StyleSheet, View } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { ThemedTextInput } from "./ThemedTextInput";
import { useSelector } from "react-redux";
import { Dropdown } from "./Dropdown";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useFocusEffect } from "expo-router";
import { Picker } from "@react-native-picker/picker";

const backendUrl = process.env.EXPO_PUBLIC_API_URL;

export default function SearchPlace() {
    const [searchTerm, setSearchTerm] = useState("");
    const [apiResults, setApiResults] = useState([]);
    const [depositions, setDepositions] = useState([]);
    const user = useSelector((state) => state.user.value);
    const [isInfected, setIsInfected] = useState(false);

    const [showResult, setShowResult] = useState(false);

    const [resultMsg, setResultMsg] = useState("Ce lieu n'est pas infecter.");

    useFocusEffect(
        useCallback(() => {
            return () => {
                clearState();
                setIsInfected(false);
                setResultMsg("Ce lieu n'est pas infecter.");
                setShowResult(false);
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
        console.log("item", item);
        const depo = depositions.filter((deposition) => {
            console.log(depositions.map((dep) => dep.placeId._id));

            return deposition.placeId._id === item;
        });
        console.log("depo", depo);
        depo.map((el) => {
            console.log(el.status);
            if (el.status === "accepted") {
                setIsInfected((infected) => true);
                setResultMsg("Ce lieu est infecter ! Prenez garde.");
                return;
            }
        });

        // console.log(isInfected);
        if (isInfected) {
            // alert("This place is infected ! Move away.");
            setResultMsg("Ce lieu est infecter ! Prenez garde.");
        } else {
            // alert("This place is safe.");
            setResultMsg("Ce lieu n'est pas infecter.");
        }
        setShowResult(true);
        clearState();
    };

    const clearState = () => {
        setSearchTerm("");
        setApiResults([]);
        setDepositions([]);
    };
    if (showResult !== false) {
        return (
            <ThemedView>
                <ThemedText style={{ color: isInfected ? "red" : "green" }}>
                    {isInfected ? "Ce lieu est infecter ! Prenez garde." : "Ce lieu n'est pas infecter."}
                </ThemedText>
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
            {/* <Dropdown results={apiResults} onItemSelected={onItemSelected} /> */}
            {apiResults.length > 0 && (
                <Picker
                    onValueChange={(itemValue, itemIndex) => {
                        console.log(itemValue);
                        onItemSelected(itemValue);
                    }}
                >
                    <Picker.Item label="Sélectionner votre nuisible" enabled={false} />
                    {apiResults.map((result) => {
                        return <Picker.Item key={result.key} label={result.value} value={result.key} />;
                    })}
                </Picker>
            )}
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
