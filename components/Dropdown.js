import { useState, useEffect } from "react";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { ScrollView, Animated, StyleSheet } from "react-native";

// results = [{key: string|number, value: string}]
export function Dropdown({ results, onItemSelected }) {
    const [showResult, setShowResult] = useState(false);
    console.log(results);
    useEffect(() => {
        if (results.length) {
            setShowResult(true);
        }
        return () => {
            setShowResult(false);
        };
    }, [results]);

    const selectItem = (item) => {
        console.log("item", item);
        onItemSelected(item);
    };

    return (
        <ThemedView>
            <Animated.View>
                <ScrollView
                    contentContainerStyle={{
                        paddingVertical: 10,
                        overflow: "hidden",
                    }}
                    nestedScrollEnabled={true}
                >
                    {results.length > 0 &&
                        showResult &&
                        results.map((item, idx) => {
                            console.log("h", item.key, idx);
                            return (
                                <ThemedText style={styles.item} key={item.key} onPress={() => selectItem(item)}>
                                    {item.value}
                                </ThemedText>
                            );
                        })}
                </ScrollView>
            </Animated.View>
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
