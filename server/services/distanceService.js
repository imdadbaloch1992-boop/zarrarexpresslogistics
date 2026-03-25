import axios from "axios";

export const getDistanceInMiles = async (originPostcode, destinationPostcode) => {
  try {
    const apiKey = process.env.ORS_API_KEY;

    if (!apiKey) {
      throw new Error("ORS API Key missing in .env file");
    }

    // 1️⃣ Convert origin postcode → coordinates
    const originGeo = await axios.get(
      "https://api.openrouteservice.org/geocode/search",
      {
        params: {
          api_key: apiKey,
          text: originPostcode
        }
      }
    );

    const destinationGeo = await axios.get(
      "https://api.openrouteservice.org/geocode/search",
      {
        params: {
          api_key: apiKey,
          text: destinationPostcode
        }
      }
    );

    // ✅ Check if features exist
    if (
      !originGeo.data.features ||
      originGeo.data.features.length === 0 ||
      !destinationGeo.data.features ||
      destinationGeo.data.features.length === 0
    ) {
      throw new Error("Could not find coordinates for provided postcodes");
    }

    const originCoords = originGeo.data.features[0].geometry.coordinates;
    const destinationCoords = destinationGeo.data.features[0].geometry.coordinates;

    // 2️⃣ Get driving distance
    const routeResponse = await axios.post(
      "https://api.openrouteservice.org/v2/directions/driving-car",
      {
        coordinates: [originCoords, destinationCoords]
      },
      {
        headers: {
          Authorization: apiKey,
          "Content-Type": "application/json"
        }
      }
    );

    // ✅ Validate route response
    if (
      !routeResponse.data.routes ||
      routeResponse.data.routes.length === 0 ||
      !routeResponse.data.routes[0].summary ||
      typeof routeResponse.data.routes[0].summary.distance !== "number"
    ) {
      throw new Error("Route data missing or invalid");
    }

    const meters = routeResponse.data.routes[0].summary.distance;

    const miles = meters * 0.000621371;

    return Number(miles.toFixed(2));

  } catch (error) {
    console.error("Distance Error:", error.response?.data || error.message);
    // Always throw so controller can catch and stop booking
    throw new Error("Failed to calculate distance");
  }
};