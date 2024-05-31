import { Link } from "expo-router";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { ThemedText } from "../components/ThemedText";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MentionsPage() {
    // const test = useSelector((state) => state.user.value.email);r
    return (
        <SafeAreaView style={styles.container}>
        <ScrollView >
            <View style={styles.main}>
                <ThemedText type="title">Mentions Legales</ThemedText>
                <View style={styles.section}>
                    <ThemedText style={styles.subheading}>Informations sur l'Éditeur</ThemedText>
                    <ThemedText style={styles.text}>
                        Nom de l'application : NoPestsAllowed{"\n"}
                        Nom de l'éditeur : [Nom de l'éditeur]{"\n"}
                        Adresse du siège social : [Adresse complète]{"\n"}
                        Numéro de téléphone : [Numéro de téléphone]{"\n"}
                        Adresse email de contact : [Email de contact]{"\n"}
                        Numéro d'inscription au registre du commerce et des sociétés (ou équivalent) : [Numéro]
                    </ThemedText>
                </View>

                <View style={styles.section}>
                    <ThemedText style={styles.subheading}>Hébergeur</ThemedText>
                    <ThemedText style={styles.text}>
                        Nom de l'hébergeur : [Nom de l'hébergeur]{"\n"}
                        Adresse du siège social de l'hébergeur : [Adresse complète]{"\n"}
                        Numéro de téléphone de l'hébergeur : [Numéro de téléphone]{"\n"}
                    </ThemedText>
                </View>

                <View style={styles.section}>
                    <ThemedText style={styles.subheading}>Directeur de publication</ThemedText>
                    <ThemedText style={styles.text}>
                        Nom du directeur de publication : [Nom du directeur]{"\n"}
                    </ThemedText>
                </View>
                <ThemedText type="title">Politique de Confidentialité</ThemedText>

                <View style={styles.section}>
                    <ThemedText style={styles.subheading}>Collecte de Données</ThemedText>
                    <ThemedText style={styles.text}>
                        Données de géolocalisation{"\n"}
                        Informations de compte utilisateur (nom, email, etc.){"\n"}
                        Signalements de nuisibles{"\n"}
                        Finalité de la Collecte des Données{"\n"}
                        {"\n"}
                        Les données collectées sont utilisées pour :{"\n"}
                        {"\n"}
                        Fournir les services de l'application{"\n"}
                        Améliorer l'expérience utilisateur{"\n"}
                        Envoyer des notifications de nuisibles{"\n"}
                        Utilisation des Données{"\n"}
                        {"\n"}
                        Vos données peuvent être utilisées pour :{"\n"}
                        {"\n"}
                        Personnaliser les services et le contenu{"\n"}
                        Partager des informations avec des tiers partenaires, sous réserve de votre consentement{"\n"}
                        Analyser les tendances et améliorer nos services{"\n"}
                    </ThemedText>
                </View>

                <View style={styles.section}>
                    <ThemedText style={styles.subheading}>Droits des Utilisateurs </ThemedText>
                    <ThemedText style={styles.text}>
                        Droit d'accès : Vous pouvez demander l'accès à vos données personnelles.{"\n"}
                        Droit de rectification : Vous pouvez demander la correction de vos données.{"\n"}
                        Droit de suppression : Vous pouvez demander la suppression de vos données.{"\n"}
                        Droit de portabilité : Vous pouvez demander à recevoir vos données dans un format structuré.
                        {"\n"}
                        Droit d'opposition : Vous pouvez vous opposer au traitement de vos données.{"\n"}
                        Pour exercer ces droits, veuillez nous contacter à [Email de contact].{"\n"}
                    </ThemedText>
                </View>

                <View style={styles.section}>
                    <ThemedText style={styles.subheading}>Sécurité des Données</ThemedText>
                    <ThemedText style={styles.text}>
                        Nous mettons en place des mesures de sécurité appropriées pour protéger vos données contre tout
                        accès non autorisé.{"\n"}
                    </ThemedText>
                </View>

                <View style={styles.section}>
                    <ThemedText style={styles.subheading}>Sécurité des Données</ThemedText>
                    <ThemedText style={styles.text}>
                        Nous mettons en place des mesures de sécurité appropriées pour protéger vos données contre tout
                        accès non autorisé.{"\n"}
                    </ThemedText>
                </View>

                <ThemedText type="title" style={styles.title2}>
                    Conditions Générales d'Utilisation (CGU)
                </ThemedText>

                <View style={styles.section}>
                    <ThemedText style={styles.subheading}>Description du Service</ThemedText>
                    <ThemedText style={styles.text}>
                        NoPestsAllowed permet aux utilisateurs de signaler et de consulter des informations sur la
                        présence de nuisibles à des emplacements spécifiques. L'application utilise la géolocalisation
                        pour fournir ces services.{"\n"}
                    </ThemedText>
                </View>

                <View style={styles.section}>
                    <ThemedText style={styles.subheading}>Responsabilités de l'Utilisateur</ThemedText>
                    <ThemedText style={styles.text}>
                        En utilisant NoPestsAllowed, vous vous engagez à :{"\n"}
                        Fournir des informations véridiques et exactes lors des signalements.{"\n"}
                        Ne pas utiliser l'application à des fins malveillantes ou illégales.{"\n"}
                    </ThemedText>
                </View>

                <View style={styles.section}>
                    <ThemedText style={styles.subheading}>Responsabilités de l'Éditeur</ThemedText>
                    <ThemedText style={styles.text}>
                        Nous nous efforçons de garantir l'exactitude des informations fournies, mais nous ne pouvons
                        être tenus responsables des erreurs ou omissions. Nous nous réservons le droit de supprimer tout
                        contenu inapproprié.{"\n"}
                    </ThemedText>
                </View>

                <View style={styles.section}>
                    <ThemedText style={styles.subheading}>Propriété Intellectuelle</ThemedText>
                    <ThemedText style={styles.text}>
                        Tous les contenus de l'application, y compris les textes, images, logos et marques, sont
                        protégés par les lois sur la propriété intellectuelle. Toute reproduction ou utilisation non
                        autorisée est interdite.{"\n"}
                    </ThemedText>
                </View>

                <View style={styles.section}>
                    <ThemedText style={styles.subheading}>Modifications des CGU</ThemedText>
                    <ThemedText style={styles.text}>
                        Nous nous réservons le droit de modifier les présentes CGU à tout moment. Les utilisateurs
                        seront informés des modifications via l'application.{"\n"}
                    </ThemedText>
                </View>

                <ThemedText type="title" style={styles.title2}>
                    Mentions Relatives à la Géolocalisation
                </ThemedText>

                <View style={styles.section}>
                    <ThemedText style={styles.subheading}>Consentement</ThemedText>
                    <ThemedText style={styles.text}>
                        L'utilisation de la géolocalisation nécessite votre consentement explicite. Vous pouvez activer
                        ou désactiver la géolocalisation à tout moment dans les paramètres de votre appareil.{"\n"}
                    </ThemedText>
                </View>

                <View style={styles.section}>
                    <ThemedText style={styles.subheading}>Utilisation des Données de Géolocalisation</ThemedText>
                    <ThemedText style={styles.text}>
                        Les données de géolocalisation sont utilisées pour :{"\n"}
                        Fournir des informations pertinentes sur les nuisibles à proximité{"\n"}
                        Améliorer nos services{"\n"}
                    </ThemedText>
                </View>

                <ThemedText type="title" style={styles.title2}>
                    Mentions Relatives aux Signalements
                </ThemedText>

                <View style={styles.section}>
                    <ThemedText style={styles.subheading}>Exactitude des Signalements</ThemedText>
                    <ThemedText style={styles.text}>
                        Les signalements sont faits par les utilisateurs et nous ne garantissons pas leur véracité. Nous
                        nous réservons le droit de vérifier et de supprimer les signalements faux ou malveillants.{" "}
                        {"\n"}
                    </ThemedText>
                </View>

                <View style={styles.section}>
                    <ThemedText style={styles.subheading}>Responsabilité en Cas de Fausse Information</ThemedText>
                    <ThemedText style={styles.text}>
                        Les utilisateurs sont responsables des informations qu'ils fournissent. En cas de signalement
                        intentionnellement faux, l'utilisateur peut être tenu responsable et voir son compte suspendu ou
                        supprimé.{"\n"}
                    </ThemedText>
                </View>

                <View style={styles.section}>
                    <ThemedText style={styles.subheading}>Cookies et Technologies Similaires</ThemedText>
                    <ThemedText style={styles.text}>
                        Utilisation des Cookies{"\n"}
                        Nous utilisons des cookies pour :{"\n"}
                        Améliorer la performance de l'application{"\n"}
                        Analyser l'utilisation de nos services{"\n"}
                    </ThemedText>
                </View>

                <View style={styles.section}>
                    <ThemedText style={styles.subheading}>Gestion des Préférences</ThemedText>
                    <ThemedText style={styles.text}>
                        Vous pouvez gérer ou désactiver les cookies dans les paramètres de votre navigateur.{"\n"}
                    </ThemedText>
                </View>

                <ThemedText type="title" style={styles.title2}>
                    Droit Applicable et Juridiction Compétente
                </ThemedText>

                <View style={styles.section}>
                    <ThemedText style={styles.subheading}>Droit Applicable</ThemedText>
                    <ThemedText style={styles.text}>
                        Les présentes mentions légales et CGU sont soumises au droit [indiquez le pays ou la région].
                        {"\n"}
                    </ThemedText>
                </View>

                <View style={styles.section}>
                    <ThemedText style={styles.subheading}>Juridiction Compétente</ThemedText>
                    <ThemedText style={styles.text}>
                        En cas de litige, les tribunaux de [indiquez la ville] seront seuls compétents.{"\n"}
                    </ThemedText>
                </View>
            </View>
            <Link href="landing" style={styles.link}>
                <ThemedText type="link">Accueil</ThemedText>
            </Link>
        </ScrollView>
        </SafeAreaView>
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
        marginBottom: 20,
    },
    subheading: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
    },
});
