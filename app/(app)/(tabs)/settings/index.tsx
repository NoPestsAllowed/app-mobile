import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { useFocusEffect } from "expo-router";
import { fetchDepositions } from "@/services/deposition-service";
import * as Notifications from "expo-notifications";
import { $t } from "@/lang";

const LOCATION_TASK_NAME = "background-location-task";
const GEOFENCING_TASK_NAME = "geofencing-task";

var setMyPositionFn = (locations: Location) => {
    console.log("No state [myPosition] defined");
};
var setMessageFn = (string: string) => {
    console.log("No state [message] defined");
};

export default function index() {
    const [trackingEnabled, setTrackingEnabled] = useState(false);
    const [geofencingEnabled, setGeofencingEnabled] = useState(false);
    // const [notificationPermissions, setNotificationPermissions] = useState<Notifications.PermissionStatus>(
    //     Notifications.PermissionStatus.UNDETERMINED
    // );
    const [message, setMessage] = useState("");
    const [myPosition, setMyPosition] = useState<Location | null>(null);
    setMyPositionFn = setMyPosition;
    setMessageFn = setMessage;
    const toggleTracking = async () => {
        const foregroundLocationStatus = await Location.requestForegroundPermissionsAsync();
        if (!trackingEnabled) {
            if (foregroundLocationStatus.granted) {
                const backgroundLocationStatus = await Location.requestBackgroundPermissionsAsync();
                if (backgroundLocationStatus.granted) {
                    startWatchingPositionInBackground();
                }
            }
        } else {
            stopWatchingPosition();
        }
    };

    const startWatchingPositionInBackground = async () => {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
            accuracy: Location.Accuracy.High,
            deferredUpdatesDistance: 10,
            deferredUpdatesInterval: 1500,
            // pausesUpdatesAutomatically: true,
            // foregroundService: {
            //     notificationTitle: "Location change",
            //     notificationBody: "Yes, your are tracked",
            // },
        });
        setTrackingEnabled(true);
    };

    const stopWatchingPosition = async () => {
        await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
        setTrackingEnabled(false);
        setMyPosition(null);
    };

    const toggleGeofencing = async () => {
        if (geofencingEnabled) {
            stopGeofencing();
            setGeofencingEnabled(false);
        } else {
            requestNotificationPermissions();
            startGeofencing();
            setGeofencingEnabled(true);
        }
    };

    const requestNotificationPermissions = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        // setNotificationPermissions(status);
        return status;
    };

    const geofenceRegions = async () => {
        const depositions = await fetchDepositions();
        // console.log(JSON.stringify(depositions, null, 2));

        const regions: Location.LocationRegion[] = [];
        depositions?.map((deposition) => {
            regions.push({
                latitude: deposition.visualProofs[0].latitude,
                longitude: deposition.visualProofs[0].longitude,
                radius: 10,
                identifier: deposition.name,
                notifyOnEnter: true,
                notifyOnExit: true,
            });
        });
        console.log(JSON.stringify(regions, null, 6));

        return regions;
    };

    const startGeofencing = async () => {
        const regions = await geofenceRegions();
        await Location.startGeofencingAsync(GEOFENCING_TASK_NAME, regions);
        console.log(myPosition);
    };

    const stopGeofencing = async () => {
        console.log(" stopping geofencing");
        await Location.stopGeofencingAsync(GEOFENCING_TASK_NAME);
        setMessage("");
    };

    useFocusEffect(
        useCallback(() => {
            (async () => {
                // const registeredTask = await TaskManager.getRegisteredTasksAsync();
                const isTracking = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
                const isForegroundLocationEnabled = await Location.getForegroundPermissionsAsync();

                if (isForegroundLocationEnabled.granted) {
                    const isBackgroundLocationEnabled = await Location.getBackgroundPermissionsAsync();
                    if (isBackgroundLocationEnabled.granted && isTracking) {
                        setTrackingEnabled(true);
                    }
                }
            })();
        }, [])
    );

    return (
        <ThemedView style={styles.container}>
            <ScrollView>
                <ThemedText style={styles.title} type="title">
                    {$t("strings.settings")}
                </ThemedText>
                <View style={styles.inputGroup}>
                    <ThemedText>{$t("forms.fields.trackMe.label")} !</ThemedText>
                    <Switch
                        style={styles.toggle}
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={trackingEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleTracking}
                        value={trackingEnabled}
                    />
                </View>
                {myPosition && <ThemedText>{JSON.stringify(myPosition, null, 8)}</ThemedText>}
                {message && message !== "" && <ThemedText>{message}</ThemedText>}
                <View style={styles.inputGroup}>
                    <ThemedText>{$t("forms.fields.geofence.label")} !</ThemedText>
                    <Switch
                        style={styles.toggle}
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={geofencingEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleGeofencing}
                        value={geofencingEnabled}
                    />
                </View>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
    },
    title: {
        paddingHorizontal: 25,
        paddingVertical: 15,
    },
    inputGroup: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        width: 250,
    },
    toggle: {
        marginLeft: 15,
    },
});

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data: locations, error }: TaskManager.TaskManagerTaskBody<Location>) => {
    if (locations) {
        // console.log("locations", JSON.stringify(locations, null, 2));
        setMyPositionFn(locations);
    }
    if (error) {
        // check `error.message` for more details.
        console.log(error.message);
        alert(typeof error === "string" ? error : JSON.stringify(error, null, 2));
        return;
    }
});

TaskManager.defineTask(
    GEOFENCING_TASK_NAME,
    ({
        data,
        error,
    }: TaskManager.TaskManagerTaskBody<{
        eventType: Location.LocationGeofencingEventType;
        region: Location.LocationGeofencingRegionState;
    }>) => {
        console.log(JSON.stringify(data, null, 2));

        if (data.eventType === Location.LocationGeofencingEventType.Enter) {
            scheduleLocaleNotification("Infested Place !", "Be carefull this place is infested by pests.");
            setMessageFn("You enter an infested zone\n" + JSON.stringify(data.region));
        }
        if (data.eventType === Location.LocationGeofencingEventType.Exit) {
            scheduleLocaleNotification(
                "Leaving Infested Place !",
                "You are now safe! Enjoy...",
                "We hope your are happy with NoPestsAllowed.",
                false
            );
            setMessageFn("Leaving\n" + JSON.stringify(data.region));
        }
        if (error) {
            // check `error.message` for more details.
            console.log(error.message);
            alert(typeof error === "string" ? error : JSON.stringify(error, null, 2));
            setMessageFn(error.message);
            return;
        }
    }
);

const scheduleLocaleNotification = (title: string, body?: string, subtitle?: string, sound = true, delay = 2) => {
    Notifications.scheduleNotificationAsync({
        content: {
            title,
            subtitle,
            body,
            sound,
            data: {
                url: "/depositions",
            },
        },
        trigger: {
            seconds: delay,
        },
    });
};
