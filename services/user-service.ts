import { ApiUpdateUserResponse, User } from "@/types";

const backendUrl = process.env.EXPO_PUBLIC_API_URL;

export const fetchAuthenticatedUser = async (token: string) => {
    const profileResponse = await fetch(`${backendUrl}/users/me`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });
    const profileResponseJson = await profileResponse.json();
    const profile = profileResponseJson.user;
    console.log("USER PROFILE IS : ", profileResponseJson);

    if (!profile || profileResponseJson.result !== true) {
        throw new Error("Profile not found");
    }
    return profile;
}

export const updateAuthenticatedUser = async (token: string, user: {firstName: string; lastName: string; dateOfBirth?: Date}) => {
    const updateUserQuery = await fetch(`${backendUrl}/users/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
            firstname: user.firstName,
            lastname: user.lastName,
        }),
    });
    const updateResponse = await updateUserQuery.json();
    if (updateResponse.result === true) {
        return true;
    }
    return false;
}

export const deleteAuthenticatedUser = async (token: string) => {
    const deleteUserQuery = await fetch(`${backendUrl}/users/delete`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const deleteUserResult = await deleteUserQuery.json();
    // if (deleteUserResult.result === true) {
        // return true;
    // }
    console.log("deleteUserResult", deleteUserResult);

    return deleteUserResult.result;
        // .then((response) => response.json())
        // .then((data) => {
        //     console.log(data);

        //     // if (data) {
        //     //     navigation.navigate("/");
        //     // } else {
        //     //     console.error(data.error);
        //     // }
        // })
        // .catch((error) => {
        //     console.error("Error:", error);
        // });
}
