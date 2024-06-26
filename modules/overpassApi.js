const osmtogeojson = require("osmtogeojson");
const querystring = require("querystring");

const fetchOverpass = async (query, options) => {
    options = options || {};

    const requestOptions = {
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
        body: querystring.stringify({ data: query }),
    };

    // console.log("here");
    let result = await fetch(options.overpassUrl || "https://overpass-api.de/api/interpreter", requestOptions);
    let decoded = await result.json();
    // console.log(makeResultDisplayable(decoded));
    // return toGeoJSON(decoded);
    return makeResultDisplayable(decoded);
};

const makeResultDisplayable = (arrayOfObjectFromOverpass) => {
    console.log("makingResultDisplayable");
    console.log("elements count : ", arrayOfObjectFromOverpass.elements.length);
    const relations = arrayOfObjectFromOverpass.elements
        .filter((item) => {
            return item.type === "relation";
        })
        .map((item) => {
            const itemInfo = {
                id: item.id,
                type: item.type,
                ...item.tags,
            };
            // console.log(itemInfo);
            return item;
        });
    let keyedNodes = {};
    arrayOfObjectFromOverpass.elements
        .filter((item) => {
            return item.type === "node" && item.tags && item.tags["addr:housenumber"];
        })
        .map((item) => {
            // console.log(item);
            keyedNodes[item.id] = item;
            return item;
        });
    // console.log("keyedNodes count : ", keyedNodes.length);

    const amenityNodes = arrayOfObjectFromOverpass.elements
        .filter((item) => {
            console.log(item);
            return (
                item.tags &&
                item.tags["name"] &&
                item.tags["type"] !== "relation" &&
                item.tags["type"] !== "associatedStreet" &&
                !item.tags["highway"] &&
                !item.tags["power"]
            );
        })
        .map((item, index) => {
            // console.log(item);
            keyedNodes[`amenities-${index}`] = item;
            return item;
        });
    // keyedNodes["amenities"] = amenityNodes;
    // console.log("amenityNodes count : ", amenityNodes);

    const relationsNodes = {};
    relations.map((item) => {
        const members = item.members
            .filter((i) => i.type === "node")
            .map((i) => {
                // console.log(i, keyedNodes[i.ref]);
                const property = keyedNodes[i.ref];
                // console.log(keyedNodes[i.ref]);
                // delete keyedNodes[i.ref];
                // console.log(keyedNodes[i.ref]);
                return property;
            });
        // console.log(members);
        relationsNodes[item.tags.name] = members;
    });
    // console.log("relationsNodes count : ", keyedNodes.length);

    // console.log("relationsNodes", relationsNodes);
    nodesWithStreet = [];
    for (let street in relationsNodes) {
        if (Object.hasOwn(relationsNodes, street)) {
            nodesWithStreet.push(
                relationsNodes[street].map((nod) => {
                    if (nod) {
                        nod["street"] = street;
                        return nod;
                    }
                })
            );
        }
    }
    return [...amenityNodes, ...nodesWithStreet].flat(Infinity).filter((i) => i);
};

const toGeoJSON = (data) => {
    // console.log(data);
    return osmtogeojson(data, {
        // flatProperties: options.flatProperties || false
    });
};

module.exports = { fetchOverpass };
