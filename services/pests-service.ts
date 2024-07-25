import { translationAsObject } from "@/lang";

const pestsTranslation = translationAsObject('pests');

export const pestsIdentifier = Object.keys(pestsTranslation);


export const displayablePests = () => {
    const displayablePests = [];

    for (const [pestKey, pestName] of Object.entries(pestsTranslation)) {
        displayablePests.push({
            label: pestName,
            value: pestKey,
        })
    }
    return displayablePests;
}
