import { CameraView, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { ThemedButton } from "./ThemedButton";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { $t } from "@/lang";

export default function CameraComponent(props: { handlePictureTaken: (arg0: any) => void; closeCamera: () => void }) {
    const [facing, setFacing] = useState("back");
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView | null>(null);
    console.log(permission);

    if (!permission) {
        // Camera permissions are still loading.
        return <ThemedView />;
    }

    if (!permission.granted) {
        // Camera permission are definitively denied by user from device settings.
        if (permission.canAskAgain === false && permission.expires === "never") {
            return (
                <ThemedView style={styles.container}>
                    <ThemedText style={{ textAlign: "center", paddingHorizontal: 25 }}>
                        {$t("ui.permissions.cameraAccess.definitivelyDenied")}
                    </ThemedText>
                </ThemedView>
            );
        }
        // Camera permissions are not granted yet.
        return (
            <ThemedView style={styles.container}>
                <ThemedText style={{ textAlign: "center" }}>{$t("ui.permissions.cameraAccess.text")}</ThemedText>
                <ThemedButton
                    onPress={requestPermission}
                    title={$t("ui.permissions.cameraAccess.btn")}
                    style={{ marginHorizontal: "auto", marginTop: 25 }}
                />
            </ThemedView>
        );
    }

    function toggleCameraFacing() {
        setFacing((current) => (current === "back" ? "front" : "back"));
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync({ quality: 0.3, imageType: "jpg" });
            props.handlePictureTaken(photo);
            props.closeCamera();
        }
    };

    return (
        <ThemedView style={styles.container}>
            <CameraView style={styles.camera} ref={cameraRef}>
                <ThemedView style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        {/* <ThemedText style={styles.text}>Flip Camera</ThemedText> */}
                        <FontAwesome name="refresh" size={15} color="#ffffff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            props.closeCamera();
                        }}
                    >
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
