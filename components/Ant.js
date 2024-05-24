import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";

const Ant = ({ path, duration, delay }) => {
    const position = useRef(new Animated.ValueXY(path[0])).current;

    useEffect(() => {
        const createAnimationSequence = () => {
            const animations = path.map((point, index) => {
                if (index === 0) return null;
                return Animated.timing(position, {
                    toValue: point,
                    duration: duration / path.length,
                    useNativeDriver: false,
                });
            }).filter(animation => animation !== null);

            return Animated.loop(Animated.sequence(animations));
        };

        createAnimationSequence().start();
    }, [position, path, duration]);

    return (
        <Animated.View style={[styles.ant, position.getLayout()]}>
            <Image source={require("../assets/images/ant1.png")} style={styles.antImage} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    ant: {
        position: "absolute",
    },
    antImage: {
        width: 50,
        height: 50,
    },
});

export default Ant;
