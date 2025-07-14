import { useEffect, useState } from "react";

export default function Services() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/services");
        const data = await response.json();
        setServices(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch services from server.");
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Our Services</h1>
      {error && <p className="text-red-600">{error}</p>}
      <ul className="list-disc pl-5 space-y-2">
        {services.map((service) => (
          <li key={service.id}>{service.name}</li>
        ))}
      </ul>
    </div>
  );
}
