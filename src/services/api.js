const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function submitTripData(formData) {
  const response = await fetch(`${BACKEND_URL}/submit`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Network response error", response.status);
  }
  return response.json();
}

export async function getVisitedCities() {
  const response = await fetch(`${BACKEND_URL}/visitedcities`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Network response error", response.status);
  }
  console.log("getVisitedCities executed");
  return response.json();
}

export async function getVisitedCityById(id) {
  try {
    const response = await fetch(`${BACKEND_URL}/visitedcities/${id}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch city with ID ${id}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching visited city by ID:", error);
    throw error;
  }
}

export async function deleteVisitedCity(id){
  const response = await fetch(`${BACKEND_URL}/visitedcities/${id}`, {
    method: "DELETE",
    credentials: "include", 
  });

  if (!response.ok) {
    throw new Error(`Failed to delete city with ID ${id}`);
  }

  return true;
}

export async function getAiRecData() {
  const response = await fetch(`${BACKEND_URL}/rec`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Network response error", response.status);
  }
  return response.json();
}

export async function sendChat({ message }) {
  if (!message.trim()) return;
  const response = await fetch(`${BACKEND_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ message }),
  });
  if (!response.ok) {
    throw new Error("Network error");
  }
  return response.json();
}
