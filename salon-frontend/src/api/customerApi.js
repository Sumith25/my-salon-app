const API_BASE = "http://localhost:5000/api/customers";

export const fetchCustomersAPI = async () => {
  const response = await fetch(API_BASE);
  return response.json();
};

export const deleteCustomerAPI = async (id) => {
  await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
};

export const updateCustomerAPI = async (id, updatedData) => {
  await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
};
