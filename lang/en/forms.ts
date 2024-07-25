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
            label: "firstName",
            placeholder: "Your firstName",
        },
        lastName: {
            label: "lastName",
            placeholder: "Your lastName",
        },
        email: {
            label: "Email",
            placeholder: "Your email",
        },
        msgTitle: {
            label: "Object",
            placeholder: "Mail object",
        },
        contactUsBody: {
            label: "Message",
            placeholder: "Mail content",
        },
        title: {
            label: "Title",
            placeholder: "Give a name to your deposition,"
        },
        selectPestType: {
            label: "Select Pest",
            // needed for RNPickerSelect
            placeholder: {
                label: "Select pest type for your deposition",
                value: null
            }
        },
        addProof: {
            label: "Add proof"
        },
        selectPlace: {
            label: "Select place",
            // needed for RNPickerSelect
            placeholder: {
                label: "Select an item",
                value: null,
            },
        },
        ownerEmail: {
            label: "Owner email",
            placeholder: "We need owner email in order to inform it about infection"
        },
        desc: {
            label: "Description",
            placeholder: "Tell us more..."
        },
        trackMe: {
            label: "Track Me",
        },
        geofence: {
            label: "Geofencing",
            desc: "Alert me when I arrive at an infested place",
        }
    },
    buttons: {
        send: "Submit",
        update: "Update",
        delete: "Delete",
        save: "Save",
    },
    waitingState: {
        sendingDeposition: "Sending deposition."
    }
}
