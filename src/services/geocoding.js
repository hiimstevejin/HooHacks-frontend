const googleApiKey = import.meta.env.VITE_GOOGLE_MAP_API;

export async function reverseGeocode(lat, lng) {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleApiKey}`
    );
    const data = await response.json();

    if (data.status !== "OK") {
      throw new Error("Geocoding failed: " + data.status);
    }

    const firstResult = data.results[0];

    const countryComponent = firstResult.address_components.find((comp) =>
      comp.types.includes("country")
    );

    const cityComponent = firstResult.address_components.find((comp) =>
      comp.types.includes("locality")
    );

    return {
      country: countryComponent?.long_name || "",
      countryCode: countryComponent?.short_name || "",
      city: cityComponent?.long_name || "",
    };
  } catch (error) {
    console.error("❌ Reverse geocoding error:", error);
    return { country: "", countryCode: "", city: "" };
  }
}
