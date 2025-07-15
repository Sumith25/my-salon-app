const API_BASE = "http://localhost:5000/api/staff";

export const fetchStaffAPI = async () => {
  const response = await fetch(API_BASE);
  return response.json();
};

export const addStaffAPI = async (staffData) => {
  await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(staffData),
  });
};

export const updateStaffAPI = async (id, updatedData) => {
  await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
};

export const deleteStaffAPI = async (id) => {
  await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
};
export const fetchStaffByIdAPI = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`);
  return response.json();
}