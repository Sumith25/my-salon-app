import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

const users = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'staff', password: 'staff123', role: 'staff' },
  { username: 'customer', password: 'pass123', role: 'customer' },
];

const appointments = [];

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (user) {
    res.json({ username: user.username, role: user.role });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.post('/api/appointments', (req, res) => {
  appointments.push(req.body);
  res.json({ message: 'Appointment booked successfully' });
});

app.get('/api/appointments', (req, res) => {
  res.json(appointments);
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
