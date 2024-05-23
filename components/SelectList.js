import { View, Text, Animated, ScrollView } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "../components/ThemedView";
import { ThemedTextInput } from "../components/ThemedTextInput";
import { ThemedText } from "../components/ThemedText";
const { fetchOverpass } = require("../modules/overpassApi");

export default function SelectList({ userLocation }) {
    console.log("userLocation", userLocation);
    const [overpassResult, setOverpassResult] = useState([]);
    const { latitude, longitude } = userLocation.coords;
    console.log("overpassResult", latitude, longitude);

    const autocompleteLocation = async (value) => {
        const distance = 25;

        console.log(
            "autocomplete",
            `
            [out:json];
            (
                rel["type"="associatedStreet"](around:50,${latitude},${longitude});
            );
            (._;>;);
            out meta;
        `
        );

        // const overpassQueryResult = await fetchOverpass(`
        //     [out:json];
        //     (way["highway"="residential"]["name"]["addr:housenumber"](around:${distance},${latitude},${longitude});
        //     rel["type"="associatedStreet"](around:${distance},${latitude},${longitude}););
        //     out center;
        //     out center;
        // `);
        const overpassQueryResult = await fetchOverpass(`
            [out:json];
            (
                rel["type"="associatedStreet"](around:50,${latitude},${longitude});
            );
            (._;>;);
            out meta;
        `);
        if (overpassQueryResult) {
            // console.log("overpassQueryResult.features", overpassQueryResult);
            const result = overpassQueryResult.flat(1);
            setOverpassResult(
                // overpassQueryResult.features.filter((item, idx) => overpassQueryResult.features.indexOf(item) === idx)
                result.filter((item, idx) => result.indexOf(item) === idx)
            );
        } else {
            console.log("in else");
        }
    };

    return (
        <ThemedView>
            <Text>SelectList</Text>
            <ThemedView>
                <ThemedTextInput placeholder="Search location" onChangeText={(v) => autocompleteLocation(v)} />
                <ThemedText>{overpassResult && overpassResult.length} results length</ThemedText>
                <ThemedView>
                    <Animated.View>
                        <ScrollView
                            contentContainerStyle={{
                                paddingVertical: 10,
                                overflow: "hidden",
                            }}
                            nestedScrollEnabled={true}
                        >
                            {overpassResult &&
                                overpassResult.map((d, idx) => {
                                    if (d) {
                                        return (
                                            <ThemedText key={d.uid + idx}>
                                                {d?.tags ? d.tags["addr:housenumber"] : JSON.stringify(d.tags)}
                                                {" " + d.street}
                                            </ThemedText>
                                        );
                                    }
                                })}
                        </ScrollView>
                    </Animated.View>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
}
