const API_BASE = "http://localhost:5000/api/appointments";

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'API request failed');
  }
  // Only try to parse JSON if there is content
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return null;
};

export const fetchAppointmentsAPI = async () => {
  try {
    const response = await fetch(API_BASE);
    const data = await handleResponse(response);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
    return [];
  }
};


export const addAppointmentAPI = async (appointmentData) => {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appointmentData),
  });
  return handleResponse(response);
};

export const deleteAppointmentAPI = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  return handleResponse(response);
};

export const updateAppointmentAPI = async (id, updatedData) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  return handleResponse(response);
};

