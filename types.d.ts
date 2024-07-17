import { GeoJsonObject, GeoJsonTypes, Geometry, LineString, Point } from "geojson";

interface Deposition {
    _id: string;
    id?: string;
    name: string;
    description: string;
    placeId: Place;
    status: "pending" | "accepted" | "rejected" | "resolved";
    type: string;
    createdAt: Date;
}

type DepositionWithVisualProofs = Deposition & {
    visualProofs: VisualProof[];
}

interface Place {
    address?: string,
    geojson: Point,
    type: string,
    description: string,
    ownerId: string,
    uniqRef: string,
}

interface ApiDepositionResponse {
    result: boolean;
    error?: string | string[];
    depositions?: Deposition[];
}

interface Coordinates {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

interface VisualProof {
    url: string;
}

interface DevicePicture {
    uri: string;
}

interface User {
    _id: string;
    firstname: string,
    lastname: string;
    email: string;
    dateOfBirth: string;
}

interface ApiUpdateUserResponse {
    result: boolean;
    error?: string | string[];
    message?: string;
}
