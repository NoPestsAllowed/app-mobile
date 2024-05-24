import { View, Text, Animated, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { ThemedView } from "../components/ThemedView";
import { ThemedTextInput } from "../components/ThemedTextInput";
import { ThemedText } from "../components/ThemedText";
import { StyleSheet } from "react-native";
const { fetchOverpass } = require("../modules/overpassApi");

export default function SelectList({ depoLocation, itemSelected }) {
    console.log("depoLocation", depoLocation);
    const [overpassResult, setOverpassResult] = useState([]);
    const [displayLocationName, setDisplayLocationName] = useState("");
    const [showResult, setShowResult] = useState(false);

    const { latitude, longitude } = depoLocation.coords;

    const loadLocation = async (value) => {
        const distance = 25;

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
                        // console.log(
                        //     "here",
                        //     item && item.street,
                        //     item.tags["amenity"] &&
                        //         (item.tags["addr:housenumber"] || item.tags["contact:housenumber"]) &&
                        //         (item.tags["addr:street"] || item.tags["contact:street"])
                        // );
                        return (
                            (item && item.street) ||
                            (item.tags["amenity"] &&
                                (item.tags["addr:housenumber"] || item.tags["contact:housenumber"]) &&
                                (item.tags["addr:street"] || item.tags["contact:street"]))
                        );
                    })
            );
            setShowResult(true);
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

    useEffect(() => {
        loadLocation();
    }, [depoLocation]);

    const selectItem = (item) => {
        console.log("selected", item);
        itemSelected(item);
        setDisplayLocationName(displayableItem(item));
        setShowResult(false);
    };

    return (
        <ThemedView>
            <Text>SelectList</Text>
            <ThemedView>
                <ThemedTextInput placeholder="Select location" value={displayLocationName} disabled={true} />
                {/* onChangeText={(v) => autocompleteLocation(v)} */}
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
                                showResult &&
                                overpassResult.map((item, idx) => {
                                    return (
                                        <ThemedText
                                            style={styles.item}
                                            key={item.uid + idx}
                                            onPress={() => selectItem(item)}
                                        >
                                            {displayableItem(item)}
                                        </ThemedText>
                                    );
                                })}
                        </ScrollView>
                    </Animated.View>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    item: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderColor: "#cbd5e1",
        borderWidth: 1,
    },
});
