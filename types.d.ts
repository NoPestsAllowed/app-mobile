import { GeoJsonObject, GeoJsonTypes, Geometry, LineString, Point } from "geojson";

interface Deposition {
    _id: string;
    name: string;
    description: string;
    placeId: Place;
    status: "pending" | "accepted" | "rejected" | "resolved";
    type: string;
    createdAt: Date;
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
