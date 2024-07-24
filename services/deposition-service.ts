import { ApiDepositionResponse } from "@/types";

const backendUrl = process.env.EXPO_PUBLIC_API_URL;

export const fetchDepositions = async () => {
    const depositionsResponse = await fetch(`${backendUrl}/depositions`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const { depositions }: ApiDepositionResponse = await depositionsResponse.json();

    return depositions;
}
