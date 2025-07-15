import { useEffect, useState } from "react";
import {
  fetchProductsAPI,
  addProductAPI,
  updateProductAPI,
  deleteProductAPI,
} from "../api/productApi";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", quantity: "" });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", price: "", quantity: "" });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await fetchProductsAPI();
    setProducts(data);
  };

  const handleAddChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    await addProductAPI(newProduct);
    setNewProduct({ name: "", price: "", quantity: "" });
    fetchProducts();
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await updateProductAPI(editingId, editData);
    setEditingId(null);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await deleteProductAPI(id);
    fetchProducts();
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Products Management</h1>
      <form onSubmit={handleAddSubmit} className="grid grid-cols-3 gap-2 mb-6">
        <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleAddChange} className="border p-2" required />
        <input type="text" name="price" placeholder="Price" value={newProduct.price} onChange={handleAddChange} className="border p-2" required />
        <input type="text" name="quantity" placeholder="Quantity" value={newProduct.quantity} onChange={handleAddChange} className="border p-2" required />
        <button type="submit" className="col-span-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">Add Product</button>
      </form>
      <table className="w-full border-collapse rounded-md border border-gray-300 shadow-sm">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="border p-2">{editingId === p.id ? <input name="name" value={editData.name} onChange={handleEditChange} className="border p-1 w-full" /> : p.name}</td>
              <td className="border p-2">{editingId === p.id ? <input name="price" value={editData.price} onChange={handleEditChange} className="border p-1 w-full" /> : p.price}</td>
              <td className="border p-2">{editingId === p.id ? <input name="quantity" value={editData.quantity} onChange={handleEditChange} className="border p-1 w-full" /> : p.quantity}</td>
              <td className="border p-2 flex gap-2">
                {editingId === p.id ? (
                  <>
                    <button onClick={handleEditSubmit} className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded">Save</button>
                    <button onClick={() => setEditingId(null)} className="text-gray-500 text-sm">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { setEditingId(p.id); setEditData(p); }} className="text-blue-500 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:underline">Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
