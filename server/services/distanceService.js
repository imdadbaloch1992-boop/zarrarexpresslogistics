import axios from "axios";

// 🔹 Helper: Convert postcode → coordinates using Nominatim (FREE)
const getCoords = async (postcode) => {
  const res = await axios.get(
    "https://nominatim.openstreetmap.org/search",
    {
      params: {
        q: postcode,
        format: "json",
        limit: 1,
      },
      headers: {
        "User-Agent": "zarrar-enterprise-app", // required by Nominatim
      },
    }
  );

  if (!res.data || res.data.length === 0) {
    throw new Error(`Invalid postcode: ${postcode}`);
  }

  // Return [lng, lat] (IMPORTANT ORDER)
  return [
    parseFloat(res.data[0].lon),
    parseFloat(res.data[0].lat),
  ];
};

export const getDistanceInMiles = async (originPostcode, destinationPostcode) => {
  try {
    const apiKey = process.env.ORS_API_KEY;

    if (!apiKey) {
      throw new Error("ORS API Key missing in environment variables");
    }

    // ✅ 1️⃣ Get coordinates using Nominatim (NO BLOCKING ISSUE)
    const originCoords = await getCoords(originPostcode);
    const destinationCoords = await getCoords(destinationPostcode);

    // ✅ 2️⃣ Get driving distance from ORS
    const routeResponse = await axios.post(
      "https://api.openrouteservice.org/v2/directions/driving-car",
      {
        coordinates: [originCoords, destinationCoords],
      },
      {
        headers: {
          Authorization: apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    // ✅ Validate response
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
    console.error(
      "Distance Error:",
      error.response?.data || error.message
    );

    throw new Error("Failed to calculate distance");
  }
};