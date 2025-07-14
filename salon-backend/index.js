import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Dummy in-memory data
const adminUser = { username: "admin", password: "password" };
const customerUser = { username: "customer", password: "password" };

let services = [
  { id: 1, name: "Haircut" },
  { id: 2, name: "Facial" },
  { id: 3, name: "Manicure" },
];

let customers = [];
let nextCustomerId = 1;
// Routes
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username === adminUser.username && password === adminUser.password) {
    return res.json({ role: "admin" });
  }

  if (username === customerUser.username && password === customerUser.password) {
    return res.json({ role: "customer" });
  }

  const registeredCustomer = customers.find(
    (c) => c.email === username && c.password === password
  );

  if (registeredCustomer) {
    return res.json({ role: "customer", name: registeredCustomer.name });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});


app.post("/api/customers", (req, res) => {
  const customer = { id: nextCustomerId++, ...req.body };
  customers.push(customer);
  res.status(201).json({ message: "Customer registered", customer });
});

app.put("/api/customers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = customers.findIndex((c) => c.id === id);
  if (index === -1) return res.status(404).json({ message: "Customer not found" });

  customers[index] = { ...customers[index], ...req.body };
  res.json({ message: "Customer updated", customer: customers[index] });
});

app.delete("/api/customers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  customers = customers.filter((c) => c.id !== id);
  res.json({ message: "Customer deleted" });
});

app.get("/api/customers", (req, res) => {
  res.json(customers);
});


app.get("/api/services", (req, res) => {
  res.json(services);
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
