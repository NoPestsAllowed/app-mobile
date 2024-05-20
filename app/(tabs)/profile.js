import React, { useRef } from 'react';
import { Platform, Animated, Image, StyleSheet, TouchableWithoutFeedback, Easing } from "react-native";

import ParallaxScrollView from "../../components/ParallaxScrollView";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";
import { Collapsible } from "../../components/Collapsible";
import { ExternalLink } from "../../components/ExternalLink";

export default function ProfileTab() {
   
    return (
        <ParallaxScrollView
        headerBackgroundColor={{ light: "Neutral Grey", dark: "#1D3D47" }}
        headerImage={
            <Image source={require("../../assets/images/icon.png")} style={styles.noPestsAllowedLogo} />
        }
    >
         <ThemedView style={styles.titleContainer}>
                <ThemedText type="title" style={{ color: "#1A53939" }}>Profile</ThemedText>
            </ThemedView>

            <ThemedView style={styles.titleContainer}>
           
            {/* <ThemedText style={styles.profileInfo} 
            onChangeText={(value) => setLastName(value)}
            value={firstname}
            placeHolder="First Name"
            label="First Name"
            /> */}

            <ThemedText style={styles.profileInfo}>Last name</ThemedText>
            </ThemedView>
            <ThemedText style={styles.profileInfo}>Birth date</ThemedText>
            
            <ThemedText style={styles.profileInfo}>Change password</ThemedText>
            
            <ThemedText style={styles.profileInfo}>Modify notifications</ThemedText>
            
            <ThemedText style={styles.profileInfo}>Authorize notifications</ThemedText>
            
            <ThemedText style={styles.profileInfo}>Log out</ThemedText>
            
            <ThemedText style={styles.profileInfo}>Delete account</ThemedText> 
    
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    noPestsAllowedLogo: {
        height: 100,
        width: 100,
        top: 100,
        bottom: 25,
        left: 25,
        position: "absolute",
    },
    title: {
        color: "red",

    },
    profileInfo: {
        margin: 5,
        fontSize: 18,
        
    }
});
