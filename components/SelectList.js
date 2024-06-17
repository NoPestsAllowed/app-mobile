import { View, Text, Animated, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { ThemedView } from "../components/ThemedView";
import { ThemedTextInput } from "../components/ThemedTextInput";
import { ThemedText } from "../components/ThemedText";
import { StyleSheet } from "react-native";
const { fetchOverpass } = require("../modules/overpassApi");

export default function SelectList({ userLocation, depoLocation, itemSelected }) {
    const [overpassResult, setOverpassResult] = useState([]);
    const [displayLocationName, setDisplayLocationName] = useState("");
    const [showResult, setShowResult] = useState(false);

    const { latitude, longitude } = depoLocation.coords;

    const loadLocation = async (value) => {
        const distance = 125;

        // console.log(`
        //     [out:json];
        //     (
        //         nwr["type"="associatedStreet"](around:${distance},${latitude},${longitude});
        //         way["highway"="residential"]["name"]["addr:housenumber"](around:${distance},${latitude},${longitude});
        //     );
        //     out center;
        //     (
        //         nwr[building](around:${distance},${latitude},${longitude});
        //         nwr["addr:housenumber"][!"communication:*"](around:${distance},${latitude},${longitude});
        //         nwr["name"](around:${distance},${latitude},${longitude});
        //         nwr["amenity"](around:${distance},${latitude},${longitude});
        //     );
        //     out center;
        // `);
        const overpassQueryResult = await fetchOverpass(`
            [out:json];
            (
                nwr["type"="associatedStreet"](around:${distance},${latitude},${longitude});
                way["highway"="residential"]["name"]["addr:housenumber"](around:${distance},${latitude},${longitude});
            );
            out center;
            (
                nwr["name"](around:${distance},${latitude},${longitude});
                nwr["amenity"](around:${distance},${latitude},${longitude});
                nwr["building"](around:${distance},${latitude},${longitude});
                nwr["addr:housenumber"][!"communication:*"](around:${distance},${latitude},${longitude});
            );
            out center;
        `);

        // Original query
        // nwr[building](around:${distance},${latitude},${longitude});
        // nwr["addr:housenumber"][!"communication:*"](around:${distance},${latitude},${longitude});
        // nwr["tourism"](around:${distance},${latitude},${longitude});
        // nwr["station"](around:${distance},${latitude},${longitude});
        // nwr["amenity"](around:${distance},${latitude},${longitude});
        // nwr["shop"](around:${distance},${latitude},${longitude});
        // nwr["name"](around:${distance},${latitude},${longitude});
        // nwr["cuisine"](around:${distance},${latitude},${longitude});
        // nwr["bar"](around:${distance},${latitude},${longitude});

        if (overpassQueryResult) {
            const sorted = overpassQueryResult
                .map((item) => {
                    if (item.center) {
                        item["distanceFromUser"] = Math.sqrt(
                            Math.pow(item.center.lat - userLocation.coords.latitude, 2) +
                                Math.pow(item.center.lon - userLocation.coords.longitude, 2)
                        );
                    } else if (item.lat && item.lon) {
                        item["distanceFromUser"] = Math.sqrt(
                            Math.pow(item.lat - userLocation.coords.latitude, 2) +
                                Math.pow(item.lon - userLocation.coords.longitude, 2)
                        );
                    }
                    return item;
                })
                .sort((a, b) => {
                    if (!a.hasOwnProperty("distanceFromUser") && !b.hasOwnProperty("distanceFromUser")) {
                        return 0;
                    }
                    if (a.hasOwnProperty("distanceFromUser") && !b.hasOwnProperty("distanceFromUser")) {
                        return -1;
                    }
                    if (!a.hasOwnProperty("distanceFromUser") && b.hasOwnProperty("distanceFromUser")) {
                        return 1;
                    }
                    return a.distanceFromUser - b.distanceFromUser;
                })
                .slice(0, 250);

            setOverpassResult(sorted);
            setShowResult(true);
            console.log("DONE");
        } else {
            console.log("in else");
        }
    };

    const distance = (latA, lonA, latB, lonB) => {
        return (latB - latA) * (latB - latA) + (lonB - lonA) * (lonB - lonA);
    };
    const displayableItem = (item) => {
        // console.log(item);
        if (item?.street) {
            return `${item?.tags["name"] ? item?.tags["name"] + ", " : ""}${item.tags["addr:housenumber"]} ${
                item.street
            }`;
        } else if (item?.tags["amenity"] || item?.tags["name"]) {
            let resultText = item.tags["name"] ?? "";
            if (item.tags["addr:housenumber"] || item.tags["contact:housenumber"]) {
                resultText += ", ";
                resultText +=
                    typeof item.tags["addr:housenumber"] !== "undefined"
                        ? item.tags["addr:housenumber"]
                        : item.tags["contact:housenumber"];
            }

            if (item.tags["addr:street"] || item.tags["contact:street"]) {
                resultText += " ";
                resultText +=
                    typeof item.tags["addr:street"] !== "undefined"
                        ? item.tags["addr:street"]
                        : item.tags["contact:street"];
            }
            return resultText;
        } else {
            console.log("item in else", item);
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
                                        <ThemedText style={styles.item} key={idx} onPress={() => selectItem(item)}>
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
