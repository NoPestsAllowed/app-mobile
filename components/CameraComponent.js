import { CameraView, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { ThemedButton } from "./ThemedButton";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function CameraComponent(props) {
    const [facing, setFacing] = useState("back");
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);

    if (!permission) {
        // Camera permissions are still loading.
        return <ThemedView />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <ThemedView style={styles.container}>
                <ThemedText style={{ textAlign: "center" }}>We need your permission to show the camera</ThemedText>
                <ThemedButton onPress={requestPermission} title="grant permission"></ThemedButton>
            </ThemedView>
        );
    }

    function toggleCameraFacing() {
        setFacing((current) => (current === "back" ? "front" : "back"));
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            props.handlePictureTaken(photo);
            props.closeCamera();
        }
    };

    return (
        <ThemedView style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                <ThemedView style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        {/* <ThemedText style={styles.text}>Flip Camera</ThemedText> */}
                        <FontAwesome name="refresh" size={15} color="#ffffff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => props.closeCamera()}>
                        <FontAwesome name="close" size={15} color="#ffffff" />
                    </TouchableOpacity>
                </ThemedView>

                <ThemedView style={styles.takePictureBtnContainer}>
                    <TouchableOpacity onPress={takePicture}>
                        <FontAwesome name="circle-thin" size={95} color="#ffffff" />
                    </TouchableOpacity>
                </ThemedView>
            </CameraView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    camera: {
        flex: 1,
        justifyContent: "space-between",
    },
    buttonContainer: {
        // flex: 1,
        // width: "100%",
        paddingTop: 15,
        flexDirection: "row",
        backgroundColor: "transparent",
        justifyContent: "space-between",
        paddingHorizontal: 5,
        // margin: 64,
    },
    button: {
        borderColor: "white",
        borderRadius: 999,
        borderWidth: 1,
        padding: 5,
        width: 55,
        height: 55,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
    pictureBtn: {
        alignItems: "center",
    },
    takePictureBtnContainer: {
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "flex-end",
        alignItems: "center",
    },
});
