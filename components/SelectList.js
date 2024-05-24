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
                rel["type"="associatedStreet"](around:${distance},${latitude},${longitude});
                rel["amenity"](around:${distance},${latitude},${longitude});
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
                node["amenity"](around:150,${latitude},${longitude});
            );
            (._;>;);
            out meta;
        `);
        if (overpassQueryResult) {
            // console.log("overpassQueryResult.features", overpassQueryResult);
            const result = overpassQueryResult.flat(1);
            setOverpassResult(
                // overpassQueryResult.features.filter((item, idx) => overpassQueryResult.features.indexOf(item) === idx)
                result
                    .filter((item, idx) => result.indexOf(item) === idx)
                    .filter((item) => {
                        console.log(
                            "here",
                            item && item.street,
                            item.tags["amenity"] &&
                                (item.tags["addr:housenumber"] || item.tags["contact:housenumber"]) &&
                                (item.tags["addr:street"] || item.tags["contact:street"])
                        );
                        return (
                            (item && item.street) ||
                            (item.tags["amenity"] &&
                                (item.tags["addr:housenumber"] || item.tags["contact:housenumber"]) &&
                                (item.tags["addr:street"] || item.tags["contact:street"]))
                        );
                    })
            );
        } else {
            console.log("in else");
        }
    };

    const displayableItem = (item) => {
        // console.log(item);
        if (item.street) {
            return `${item.tags["addr:housenumber"]} ${item.street}`;
        } else if (
            item.tags["amenity"] &&
            (item.tags["addr:housenumber"] || item.tags["contact:housenumber"]) &&
            (item.tags["addr:street"] || item.tags["contact:street"])
        ) {
            // console.log(item.tags["amenity"], typeof item.tags["name"] !== "undefined", item.tags["name"]);
            let resultText =
                item.tags["amenity"] + " " + typeof item.tags["name"] !== "undefined" ? item.tags["name"] : "";
            // console.log(resultText);
            if (item.tags["addr:housenumber"] || item.tags["contact:housenumber"]) {
                // console.log(item.tags["addr:housenumber"], item.tags["contact:housenumber"]);
                // console.log(
                //     typeof item.tags["addr:housenumber"] !== "undefined"
                //         ? item.tags["addr:housenumber"]
                //         : item.tags["contact:housenumber"]
                // );
                resultText += ", ";
                resultText +=
                    typeof item.tags["addr:housenumber"] !== "undefined"
                        ? item.tags["addr:housenumber"]
                        : item.tags["contact:housenumber"];
            }

            if (item.tags["addr:street"] || item.tags["contact:street"]) {
                console.log(
                    item,
                    "-" + typeof item.tags["addr:street"] !== "undefined"
                        ? item.tags["addr:street"]
                        : item.tags["contact:street"]
                );
                resultText += " ";
                resultText +=
                    typeof item.tags["addr:street"] !== "undefined"
                        ? item.tags["addr:street"]
                        : item.tags["contact:street"];
            }
            return resultText;
        }
    };

    return (
        <ThemedView>
            <Text>SelectList</Text>
            <ThemedView>
                <ThemedTextInput placeholder="Search location" onChangeText={(v) => autocompleteLocation(v)} />
                <ThemedText>{overpassResult && overpassResult.length} results length</ThemedText>
                <ThemedView
                // style={{
                //     maxHeight: "20%",
                // }}
                >
                    <Animated.View>
                        <ScrollView
                            contentContainerStyle={{
                                paddingVertical: 10,
                                overflow: "hidden",
                            }}
                            nestedScrollEnabled={true}
                        >
                            {overpassResult &&
                                overpassResult.map((item, idx) => {
                                    return <ThemedText key={item.uid + idx}>{displayableItem(item)}</ThemedText>;
                                })}
                        </ScrollView>
                    </Animated.View>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
}
