import { View, Text, Animated, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { ThemedView } from "../components/ThemedView";
import { ThemedTextInput } from "../components/ThemedTextInput";
import { ThemedText } from "../components/ThemedText";
import { StyleSheet } from "react-native";
const { fetchOverpass } = require("../modules/overpassApi");

export default function SelectList({ userLocation, depoLocation, itemSelected }) {
    // console.log("depoLocation", depoLocation);
    const [overpassResult, setOverpassResult] = useState([]);
    const [displayLocationName, setDisplayLocationName] = useState("");
    const [showResult, setShowResult] = useState(false);

    const { latitude, longitude } = depoLocation.coords;

    const loadLocation = async (value) => {
        const distance = 25;

        const overpassQueryResult = await fetchOverpass(`
            [out:json];
            (
                nwr["type"="associatedStreet"](around:50,${latitude},${longitude});
                way["highway"="residential"]["name"]["addr:housenumber"](around:50,${latitude},${longitude});
            );
            out center;
            (
                nwr[building]["addr:housenumber"](around:150,${latitude},${longitude});
                nwr["addr:housenumber"][!"communication:*"](around:150,${latitude},${longitude});
                nwr["tourism"](around:150,${latitude},${longitude});
                nwr["station"](around:150,${latitude},${longitude});
                nwr["amenity"](around:150,${latitude},${longitude});
                nwr["shop"](around:150,${latitude},${longitude});
                nwr["name"](around:150,${latitude},${longitude});
                nwr["cuisine"](around:150,${latitude},${longitude});
                nwr["bar"](around:150,${latitude},${longitude});
            );
            out meta;
        `);
        // before out meta (._;>;);
        if (overpassQueryResult) {
            // console.log("overpassQueryResult.features", overpassQueryResult);
            const result = overpassQueryResult.flat(1);
            const filtered = result
                .filter((item, idx) => result.indexOf(item) === idx && item !== null && (item?.tags || item?.street))
                .filter((item) => {
                    // console.log("here", item);
                    return (
                        item.street ||
                        ((item?.tags["amenity"] || item?.tags["tourism"] || item?.tags["name"]) &&
                            (item.tags["addr:housenumber"] || item.tags["contact:housenumber"]) &&
                            (item.tags["addr:street"] || item.tags["contact:street"]))
                    );
                })
                // .map((item) => {
                //     // console.log(userLocation);
                //     if (item.lat && item.lon) {
                //         item["distanceFromUser"] = Math.sqrt(
                //             Math.pow(item.lat - userLocation.coords.latitude, 2) +
                //                 Math.pow(item.lon - userLocation.coords.longitude, 2)
                //         );
                //     }
                //     return item;
                // })
                .sort((a, b) => {
                    // console.log(typeof a);
                    // if (!a.lat) {
                    //     console.log(a);
                    // }
                    if (
                        !Object.hasOwnProperty(a, "distanceFromUser") &&
                        !Object.hasOwnProperty(b, "distanceFromUser")
                    ) {
                        // console.log("same", a, b);
                        return 0;
                    }
                    if (Object.hasOwnProperty(a, "distanceFromUser") && !Object.hasOwnProperty(b, "distanceFromUser")) {
                        // console.log("a has but not b");
                        return -1;
                    }
                    if (!Object.hasOwnProperty(a, "distanceFromUser") && Object.hasOwnProperty(b, "distanceFromUser")) {
                        // console.log("b has but not a");
                        return 1;
                    }
                    return a.distanceFromUser - b.distanceFromUser;
                })
                .slice(0, 250);
            console.log(filtered.length, result.length);
            setOverpassResult(
                // overpassQueryResult.features.filter((item, idx) => overpassQueryResult.features.indexOf(item) === idx)
                filtered
            );
            setShowResult(true);
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
            return `${item.tags["addr:housenumber"]} ${item.street}`;
        } else if (
            item?.tags["amenity"] ||
            item?.tags["tourism"] ||
            item?.tags["station"]
            // (item.tags["addr:housenumber"] || item.tags["contact:housenumber"]) &&
            // (item.tags["addr:street"] || item.tags["contact:street"])
        ) {
            let resultText =
                item.tags["amenity"] + " " + typeof item.tags["name"] !== "undefined" ? item.tags["name"] : "";
            if (item.tags["addr:housenumber"] || item.tags["contact:housenumber"]) {
                resultText += ", ";
                resultText +=
                    typeof item.tags["addr:housenumber"] !== "undefined"
                        ? item.tags["addr:housenumber"]
                        : item.tags["contact:housenumber"];
            }

            if (item.tags["addr:street"] || item.tags["contact:street"]) {
                // console.log(
                //     item,
                //     "-" + typeof item.tags["addr:street"] !== "undefined"
                //         ? item.tags["addr:street"]
                //         : item.tags["contact:street"]
                // );
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
