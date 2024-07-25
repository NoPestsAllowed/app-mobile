export const forms = {
    // Must follow the structure below
    // fields: {
    //     field1: {
    //         label: "",
    //         placeholder: "",
    //     },
    // },
    // sections: {
    //     title: "",
    //     desc: "",
    // },
    fields: {
        firstName: {
            label: "Prénom",
            placeholder: "Votre prénom",
        },
        lastName: {
            label: "Nom",
            placeholder: "Votre nom",
        },
        email: {
            label: "Email",
            placeholder: "Votre mail",
        },
        msgTitle: {
            label: "Objet",
            placeholder: "L'objet du mail",
        },
        contactUsBody: {
            label: "Message",
            placeholder: "Le contenu de votre message",
        },
        title: {
            label: "Titre",
            placeholder: "Donner un nom à votre déposition"
        },
        selectPestType: {
            label: "Sélectionnez un type de nuisible",
            // needed for RNPickerSelect
            placeholder: {
                label: "Sélectionnez un type de nuisible pour votre déposition",
                value: null
            }
        },
        addProof: {
            label: "Ajoutez une preuve"
        },
        selectPlace: {
            label: "Sélectionnez un lieu",
            placeholder: {
                label: "Sélectionnez un élément",
                value: null
            },
        },
        ownerEmail: {
            label: "Mail du propriétaire",
            placeholder: "Le mail du propriétaire permet de l'informer de l'infestation"
        },
        desc: {
            label: "Description",
            placeholder: "Dites en plus..."
        },
        trackMe: {
            label: "Suivez-moi",
        },
        geofence: {
            label: "Géorepérage",
            desc: "Alertez-moi lorsque j'arrive dans un endroit infesté",
        }
    },
    buttons: {
        send: "Envoyer",
        update: "Modifier",
        delete: "Supprimer",
        save: "Enregistrer",
    },
    waitingState: {
        sendingDeposition: "Déposition en cours de traitement."
    }
}
