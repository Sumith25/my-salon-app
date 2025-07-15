import { useEffect, useState } from "react";

export default function ServicesVisitor() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Services</h1>
      <ul className="list-disc pl-5 space-y-2">
        {services.map((service) => (
          <li key={service.id}>
            {service.name} - ${service.cost} ({service.duration})
          </li>
        ))}
      </ul>
    </div>
  );
}
