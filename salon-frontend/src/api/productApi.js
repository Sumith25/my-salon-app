const API_BASE = "http://localhost:5000/api/products";

export const fetchProductsAPI = async () => {
  const response = await fetch(API_BASE);
  return response.json();
};

export const addProductAPI = async (productData) => {
  await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });
};

export const updateProductAPI = async (id, updatedData) => {
  await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
};

export const deleteProductAPI = async (id) => {
  await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
};
export const fetchProductByIdAPI = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`);
  return response.json();
};