import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { $t, translationAsObject } from "@/lang";

export default function LegalNotice() {
    const legalNotiveAndTos = translationAsObject("legals");
    const { legalNotices, tos } = legalNotiveAndTos;
    // console.log(Object.entries(legalNotiveAndTos).map((item) => console.log(item)));

    // const buildCGURecursively = (translationObject: {
    //     [key: string]: string | { [key: string]: string | { [key: string]: string | { [key: string]: string } } };
    // }) => {
    //     let items = Object.values(translationObject);
    //     // console.log(items );
    //     console.clear();
    //     const result: { title: string; content?: string | { title: string; content: string }[] }[] = [];
    //     items.map((item) => {
    //         if (typeof item === "string") {
    //             result.push({ title: item });
    //         }
    //         if (typeof item !== "string" && item.content && item.title) {
    //             if (typeof item.content === "string" && typeof item.title === "string") {
    //                 result.push({
    //                     title: item.title,
    //                     content: item.content,
    //                 });
    //             }
    //         }
    //         if (typeof item !== "string" && item.title) {
    //             return Object.values(item).map((property) => {
    //                 if (typeof property === "string") {
    //                     result.push({ title: property });
    //                 } else if (
    //                     typeof property === "object" &&
    //                     property.title &&
    //                     property.content &&
    //                     typeof property.content === "string"
    //                 ) {
    //                     result.push({
    //                         title: property.title as string,
    //                         content: property.content as string,
    //                     });
    //                 } else {
    //                     let section: { title: string; content: string }[] = [];
    //                     let sectionTitle = "";
    //                     Object.values(property).map((prprty) => {
    //                         console.log("prprty", prprty);

    //                         if (typeof prprty !== "string" && prprty?.content !== null && prprty.title) {
    //                             section.push({
    //                                 title: prprty.title,
    //                                 content: prprty.content,
    //                             });
    //                         } else {
    //                             if (typeof prprty === "string") {
    //                                 sectionTitle = prprty;
    //                             }
    //                         }
    //                     });
    //                     result.push({
    //                         content: section,
    //                         title: sectionTitle,
    //                     });
    //                 }
    //             });
    //         }
    //     });

    //     return result;
    // };

    // console.log("LegalNotices :", JSON.stringify(buildCGURecursively(legalNotices), null, 2));
    // // console.log("tos ", tos);

    return (
        <ThemedView>
            <ScrollView>
                <View style={styles.main}>
                    <ThemedText type="title" style={styles.title}>
                        {$t("legals.legalNotices.title")}
                    </ThemedText>
                    <View style={styles.section}>
                        <ThemedText type="subtitle" style={styles.sectionTitle}>
                            {$t("legals.legalNotices.legalInformation.title")}
                        </ThemedText>
                        <View style={styles.subSection}>
                            <ThemedText type="subtitle">
                                {$t("legals.legalNotices.legalInformation.publisher.title")}
                            </ThemedText>
                            <ThemedText>
                                {$t("legals.legalNotices.legalInformation.publisher.name.title")}:{" "}
                                {$t("legals.legalNotices.legalInformation.publisher.name.content")}
                            </ThemedText>
                            <ThemedText>
                                {$t("legals.legalNotices.legalInformation.publisher.address.title")}:{" "}
                                {$t("legals.legalNotices.legalInformation.publisher.address.content")}
                            </ThemedText>
                            <ThemedText>
                                {$t("legals.legalNotices.legalInformation.publisher.phone.title")}:{" "}
                                {$t("legals.legalNotices.legalInformation.publisher.phone.content")}
                            </ThemedText>
                            <ThemedText>
                                {$t("legals.legalNotices.legalInformation.publisher.email.title")}:{" "}
                                {$t("legals.legalNotices.legalInformation.publisher.email.content")}
                            </ThemedText>
                        </View>

                        <View style={styles.subSection}>
                            <ThemedText type="subtitle" style={styles.subheading}>
                                {$t("legals.legalNotices.legalInformation.publicationDirector.title")}
                            </ThemedText>
                            <ThemedText>
                                {$t("legals.legalNotices.legalInformation.publicationDirector.content")}
                            </ThemedText>
                        </View>

                        <View style={styles.subSection}>
                            <ThemedText type="subtitle" style={styles.subheading}>
                                {$t("legals.legalNotices.legalInformation.host.title")}
                            </ThemedText>
                            <ThemedText>
                                {$t("legals.legalNotices.legalInformation.host.name.title")}:{" "}
                                {$t("legals.legalNotices.legalInformation.host.name.content")}
                            </ThemedText>
                            <ThemedText>
                                {$t("legals.legalNotices.legalInformation.host.address.title")}:{" "}
                                {$t("legals.legalNotices.legalInformation.host.address.content")}
                            </ThemedText>
                            <ThemedText>
                                {$t("legals.legalNotices.legalInformation.host.phone.title")}:{" "}
                                {$t("legals.legalNotices.legalInformation.host.phone.content")}
                            </ThemedText>
                            <ThemedText>
                                {$t("legals.legalNotices.legalInformation.host.email.title")}:{" "}
                                {$t("legals.legalNotices.legalInformation.host.email.content")}
                            </ThemedText>
                            <ThemedText>
                                {$t("legals.legalNotices.legalInformation.host.siret.title")}:{" "}
                                {$t("legals.legalNotices.legalInformation.host.siret.content")}
                            </ThemedText>
                        </View>

                        <View style={styles.subSection}>
                            <ThemedText type="subtitle" style={styles.subheading}>
                                {$t("legals.legalNotices.intellectualProperty.title")}
                            </ThemedText>
                            <ThemedText>{$t("legals.legalNotices.intellectualProperty.content")}</ThemedText>
                        </View>

                        <View style={styles.subSection}>
                            <ThemedText type="subtitle" style={styles.subheading}>
                                {$t("legals.legalNotices.personalDataProtection.title")}
                            </ThemedText>
                            <ThemedText>{$t("legals.legalNotices.personalDataProtection.content")}</ThemedText>
                        </View>

                        <View style={styles.subSection}>
                            <ThemedText type="subtitle" style={styles.subheading}>
                                {$t("legals.legalNotices.liability.title")}
                            </ThemedText>
                            <ThemedText>{$t("legals.legalNotices.liability.content")}</ThemedText>
                        </View>

                        <View style={styles.subSection}>
                            <ThemedText type="subtitle" style={styles.subheading}>
                                {$t("legals.legalNotices.hosting.title")}
                            </ThemedText>
                            <ThemedText>{$t("legals.legalNotices.hosting.content")}</ThemedText>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <ThemedText type="subtitle" style={styles.sectionTitle}>
                            {$t("legals.tos.title")}
                        </ThemedText>

                        <View style={styles.subSection}>
                            <ThemedText type="subtitle" style={styles.subheading}>
                                {$t("legals.tos.purpose.title")}
                            </ThemedText>
                            <ThemedText>{$t("legals.tos.purpose.content")}</ThemedText>
                        </View>

                        <View style={styles.subSection}>
                            <ThemedText type="subtitle" style={styles.subheading}>
                                {$t("legals.tos.acceptance.title")}
                            </ThemedText>
                            <ThemedText>{$t("legals.tos.acceptance.content")}</ThemedText>
                        </View>

                        <View style={styles.subSection}>
                            <ThemedText type="subtitle" style={styles.subheading}>
                                {$t("legals.tos.access.title")}
                            </ThemedText>
                            <ThemedText>{$t("legals.tos.access.content")}</ThemedText>
                        </View>

                        <View style={styles.subSection}>
                            <ThemedText type="subtitle" style={styles.subheading}>
                                {$t("legals.tos.accountCreation.title")}
                            </ThemedText>
                            <ThemedText>{$t("legals.tos.accountCreation.content")}</ThemedText>
                        </View>

                        <View style={styles.subSection}>
                            <ThemedText type="subtitle" style={styles.subheading}>
                                {$t("legals.tos.applicationUse.title")}
                            </ThemedText>
                            <ThemedText>{$t("legals.tos.applicationUse.content")}</ThemedText>
                        </View>

                        <View style={styles.subSection}>
                            <ThemedText type="subtitle" style={styles.subheading}>
                                {$t("legals.tos.geolocationNotifications.title")}
                            </ThemedText>
                            <ThemedText>{$t("legals.tos.geolocationNotifications.content")}</ThemedText>
                        </View>

                        <View style={styles.subSection}>
                            <ThemedText type="subtitle" style={styles.subheading}>
                                {$t("legals.tos.publisherLiability.title")}
                            </ThemedText>
                            <ThemedText>{$t("legals.tos.publisherLiability.content")}</ThemedText>
                        </View>

                        <View style={styles.subSection}>
                            <ThemedText type="subtitle" style={styles.subheading}>
                                {$t("legals.tos.disputesWithOwners.title")}
                            </ThemedText>
                            <ThemedText>{$t("legals.tos.disputesWithOwners.content")}</ThemedText>
                        </View>

                        <View style={styles.subSection}>
                            <ThemedText type="subtitle" style={styles.subheading}>
                                {$t("legals.tos.personalDataProtection.title")}
                            </ThemedText>
                            <ThemedText>{$t("legals.tos.personalDataProtection.content")}</ThemedText>
                        </View>

                        <View style={styles.subSection}>
                            <ThemedText type="subtitle" style={styles.subheading}>
                                {$t("legals.tos.intellectualProperty.title")}
                            </ThemedText>
                            <ThemedText>{$t("legals.tos.intellectualProperty.content")}</ThemedText>
                        </View>

                        <View style={styles.subSection}>
                            <ThemedText type="subtitle" style={styles.subheading}>
                                {$t("legals.tos.donationsFunding.title")}
                            </ThemedText>
                            <ThemedText>{$t("legals.tos.donationsFunding.content")}</ThemedText>
                        </View>

                        <View style={styles.subSection}>
                            <ThemedText type="subtitle" style={styles.subheading}>
                                {$t("legals.tos.modificationTOS.title")}
                            </ThemedText>
                            <ThemedText>{$t("legals.tos.modificationTOS.content")}</ThemedText>
                        </View>

                        <View style={styles.subSection}>
                            <ThemedText type="subtitle" style={styles.subheading}>
                                {$t("legals.tos.applicableLaw.title")}
                            </ThemedText>
                            <ThemedText>{$t("legals.tos.applicableLaw.content")}</ThemedText>
                        </View>
                    </View>

                    {/* {buildCGURecursively(legalNotices).map((item, index) => {
                        if (item.content && typeof item.content === "string") {
                            // return (
                            //     <View style={styles.section}>
                            //         <ThemedText type="title">{item.title}</ThemedText>
                            //         <ThemedText>{item.content}</ThemedText>
                            //     </View>
                            // );
                        } else {
                            return (
                                <View style={styles.section}>
                                    <ThemedText type="subtitle">{item.title}</ThemedText>
                                    {item.content && typeof item.content !== "string" && (
                                        <ThemedText>
                                            {item.content.map((item: { title: string; content: string }) => {
                                                return (
                                                    <View>
                                                        <ThemedText>
                                                            <ThemedText style={{ fontWeight: 600 }}>
                                                                {item.title} :{" "}
                                                            </ThemedText>
                                                            {item.content}
                                                        </ThemedText>
                                                    </View>
                                                );
                                            })}
                                        </ThemedText>
                                    )}
                                </View>
                            );
                        }
                    })} */}
                </View>
                <View style={styles.footer}>
                    <Link href="/">
                        <ThemedText type="link">Back to Home</ThemedText>
                    </Link>
                </View>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    main: {
        flex: 1,
        justifyContent: "center",
        maxWidth: 960,
        marginHorizontal: "auto",
    },
    sectionTitle: {
        fontSize: 24,
    },
    title: {
        paddingHorizontal: 25,
        paddingVertical: 15,
    },
    title2: {
        fontSize: 32,
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: 50,
    },
    subtitle: {
        fontSize: 36,
        color: "#38434D",
        lineHeight: 36,
    },
    section: {
        marginVertical: 25,
        marginHorizontal: 15,
    },
    subheading: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subSection: {
        marginVertical: 15,
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
    },
    footer: {
        marginHorizontal: 25,
        marginVertical: 25,
    },
});
