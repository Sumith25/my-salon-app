import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

// For __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dummy in-memory data
const adminUser = { username: "admin", password: "password" };
const customerUser = { username: "customer", password: "password" };

let services = [
  { id: 1, name: "Haircut", cost: "20", duration: "30 mins" },
  { id: 2, name: "Facial", cost: "50", duration: "60 mins" },
  { id: 3, name: "Manicure", cost: "25", duration: "45 mins" },
];
let nextServiceId = 4;
let customers = [];
let nextCustomerId = 1;
let appointments = [];
let nextAppointmentId = 1;

// ---------------- API ROUTES ----------------

// Login Route
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
    return res.json({
      role: "customer",
      name: registeredCustomer.name,
      customerId: registeredCustomer.id,
    });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

// Customers API
app.post("/api/customers", (req, res) => {
  const customer = { id: nextCustomerId++, ...req.body };
  customers.push(customer);
  res.status(201).json({ message: "Customer registered", customer });
});

app.get("/api/customers", (req, res) => {
  res.json(customers);
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

// Services API
app.get("/api/services", (req, res) => {
  res.json(services);
});

app.post("/api/services", (req, res) => {
  const service = { id: nextServiceId++, ...req.body };
  services.push(service);
  res.status(201).json({ message: "Service added", service });
});

app.put("/api/services/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = services.findIndex((s) => s.id === id);
  if (index === -1) return res.status(404).json({ message: "Service not found" });
  services[index] = { ...services[index], ...req.body };
  res.json({ message: "Service updated", service: services[index] });
});

app.delete("/api/services/:id", (req, res) => {
  const id = parseInt(req.params.id);
  services = services.filter((s) => s.id !== id);
  res.json({ message: "Service deleted" });
});

// Appointments API
app.post("/api/appointments", (req, res) => {
  const appointment = { id: nextAppointmentId++, ...req.body };
  appointments.push(appointment);
  res.status(201).json({ message: "Appointment booked", appointment });
});

app.get("/api/appointments", (req, res) => {
  res.json(appointments);
});

app.delete("/api/appointments/:id", (req, res) => {
  const id = parseInt(req.params.id);
  appointments = appointments.filter((a) => a.id !== id);
  res.json({ message: "Appointment deleted" });
});

// ---------------- SERVE REACT BUILD ----------------
app.use(express.static(path.join(__dirname, "../salon-frontend/dist"))); // or build/

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../salon-frontend/dist/index.html")); // or build/index.html
});

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
