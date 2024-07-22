import * as SecureStore from "expo-secure-store";

const { getItemAsync, setItemAsync, deleteItemAsync, isAvailableAsync } = SecureStore;
const tokenKey = "jwtToken"

export const setToken = async (tokenValue: string) => {
    return await setItemAsync(tokenKey, tokenValue);
}

export const getToken = async () => {
    try {
        const token = await getItemAsync(tokenKey)
        // alert("retrieved from service token: " + token);

        return token;
    } catch (error) {
        alert("error getting token async " + JSON.stringify(error))
        return null;
    }
}

export const clearToken = async () => {
    return await deleteItemAsync(tokenKey)
}
