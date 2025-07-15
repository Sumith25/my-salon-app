import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

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
let products = [];
let nextProductId = 1;
let staff = [];
let nextStaffId = 1;

// Login Route Start
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
      customerId: registeredCustomer.id.toString(), // 🔴 This is IMPORTANT for filtering bookings
    });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});
// Login Route End

// Customer Routes Start
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
// Customer Routes End

// Services Routes Start
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
// Services Routes End

// Appointments Routes Start
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
// Appointments Routes End

// Products Routes Start
app.get("/api/products", (req, res) => {
  res.json(products);
});

app.post("/api/products", (req, res) => {
  const product = { id: nextProductId++, ...req.body };
  products.push(product);
  res.status(201).json({ message: "Product added", product });
});

app.put("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ message: "Product not found" });

  products[index] = { ...products[index], ...req.body };
  res.json({ message: "Product updated", product: products[index] });
});

app.delete("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter((p) => p.id !== id);
  res.json({ message: "Product deleted" });
});
// Products Routes End

// Staff Routes Start
app.get("/api/staff", (req, res) => {
  res.json(staff);
});

app.post("/api/staff", (req, res) => {
  const member = { id: nextStaffId++, ...req.body };
  staff.push(member);
  res.status(201).json({ message: "Staff member added", member });
});

app.put("/api/staff/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = staff.findIndex((s) => s.id === id);
  if (index === -1) return res.status(404).json({ message: "Staff member not found" });

  staff[index] = { ...staff[index], ...req.body };
  res.json({ message: "Staff member updated", member: staff[index] });
});

app.delete("/api/staff/:id", (req, res) => {
  const id = parseInt(req.params.id);
  staff = staff.filter((s) => s.id !== id);
  res.json({ message: "Staff member deleted" });
});
// Staff Routes End

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});