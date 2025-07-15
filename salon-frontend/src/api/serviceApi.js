const API_BASE = "http://localhost:5000/api/services";

export const fetchServicesAPI = async () => {
  const response = await fetch(API_BASE);
  return response.json();
};

export const addServiceAPI = async (serviceData) => {
  await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(serviceData),
  });
};

export const updateServiceAPI = async (id, updatedData) => {
  await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
};

export const deleteServiceAPI = async (id) => {
  await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
};
