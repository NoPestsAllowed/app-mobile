import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import ParallaxScrollView from "../../../components/ParallaxScrollView";
import { ThemedText } from "../../../components/ThemedText";
import { ThemedView } from "../../../components/ThemedView";
import { ThemedTextInput } from "../../../components/ThemedTextInput";
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch , useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function MydepositionsTab({ navigation }) {
    const [firstName, setFirstName] = useState(""); 
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [modifyNotifications, setModifyNotifications] = useState(false);
    const [authorizeNotifications, setAuthorizeNotifications] = useState(false);
    

    const handleLogout = () => {
        navigation.navigate('Home');
    };

    const handleDeleteAccount = () => {
        navigation.navigate('Home');
    };

    const toggleModifyNotifications = () => {
        setModifyNotifications(!modifyNotifications);
    };

    const toggleAuthorizeNotifications = () => {
        setAuthorizeNotifications(!authorizeNotifications);
    };
    
    const user = useSelector((state) => state.user.value);
    const photos = user.photo.map((data, i) => {
        return (
            <View key={i} style={styles.photosContainer}>
                <FontAwesome name='times' size={20} color='#000000' style={styles.deleteIcon} />
                <Image source={{ uri: data }} style={styles.photos} />
            </View>
        );
    });

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "grey", dark: "#1D3D47" }}
            headerImage={
                <View style={styles.headerContainer}>
                    <Image source={require("../../../assets/images/icon.png")} style={styles.noPestsAllowedLogo} />
                    <View style={styles.rightHeader}>
                        <Text style={styles.welcomeText}>Welcome, {firstName}!</Text>
                        <View style={styles.avatarContainer}>
                            <Image source={require("../../../assets/images/avatar1.jpg")} style={styles.avatar} />
                        </View>
                    </View>
                </View>
            }
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title" style={styles.title}>Dépositions Numéro 2</ThemedText>
               
            </ThemedView>
            <ThemedView>
            <ThemedText>Created at:22/05/2024</ThemedText>
            </ThemedView>

            <ThemedView style={styles.rowContainer}>
            <ThemedText>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi incidunt provident aut culpa voluptate at, vero quos, voluptatem quaerat accusantium minus, itaque nostrum. Cumque impedit quisquam, sit corporis tempore sed.
         Pariatur, dolorem fugit. Vitae tempora ipsam corrupti corporis itaque perspiciatis accusantium ab, ad repellendus a minus ducimus minima pariatur possimus incidunt fuga suscipit expedita nemo porro omnis sit exercitationem! Aliquid!
         Sapiente aliquam voluptate quos perferendis aperiam suscipit impedit, harum neque minima fugit reiciendis quod eligendi numquam perspiciatis accusamus quia officia eaque eum, velit, sunt asperiores exercitationem iusto laudantium. Obcaecati, repudiandae.</ThemedText>
      
            </ThemedView>

            <ThemedView style={styles.notificationContainer}>
                <TouchableOpacity onPress={toggleAuthorizeNotifications}>
                </TouchableOpacity>
            </ThemedView>

            <ThemedView style={styles.photosContainer}>
                { /* <Image style={styles.photos} source={require("../../../assets/images/avatar1.jpg")} />
                <Image style={styles.photos} source={require("../../../assets/images/avatar1.jpg")} />
                <Image style={styles.photos} source={require("../../../assets/images/avatar1.jpg")} />
                <Image style={styles.photos} source={require("../../../assets/images/avatar1.jpg")} />
                <Image style={styles.photos} source={require("../../../assets/images/avatar1.jpg")} />
                <Image style={styles.photos} source={require("../../../assets/images/avatar1.jpg")} /> */}
                {photos}
            </ThemedView>


            
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    noPestsAllowedLogo: {
        height: 100,
        width: 100,
        top: 50,
    },
    rightHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    welcomeText: {
        marginRight: 25,
        fontSize: 24,
        color: '#A53939',
        top: 50,
        fontWeight: "800",
    },
    avatarContainer: {
        height: 104, 
        width: 104, 
        borderRadius: 52, 
        borderWidth: 2, 
        borderColor: 'silver', 
        justifyContent: 'center',
        alignItems: 'center',
        top: 50,
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 50, 
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    profileInfo: {
        margin: 3,
        fontSize: 18,
    },
    title: {
        fontSize: 32,
        color: '#A53939',
        shadowColor: '#888',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 7,
    },
    input: {
        borderWidth: 1,
        borderColor: '#A53939',
        padding: 5,
        borderRadius: 7,
    },
    button: {
        backgroundColor: '#A53939',
        padding: 10,
        margin: 5,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#888',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 7,
        elevation: 3,
    },
    notifications: {
        fontSize: 18,
        fontStyle: 'italic'
    },
    buttonText: {
        color: '#f5f5f5',
        fontSize: 18,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    line1: {
        height:35,
        flex: 1,
        textAlign: 'left',
        paddingLeft: 10,
        lineHeight: 35,
        left:5,
        fontSize: 16,
        backgroundColor: "lightgrey",
    },
    line2: {
        height:35,
        flex: 3,
        paddingLeft: 10,
        textAlign: 'left',
        lineHeight: 35,
        fontSize: 16,
        backgroundColor: '#A429',
    },
    notificationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "lightgrey",
    },
    photos: {
        margin: 10,
        width:150,
        height:150,
    },
    photosContainer: {
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
    }
});
