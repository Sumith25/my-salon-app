import { useEffect, useState } from "react";

export default function ServicesCustomer() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Services for Booking</h1>
      <ul className="list-disc pl-5 space-y-4">
        {services.map((service) => (
          <li key={service.id}>
            <div className="flex flex-col">
              <span className="font-semibold">{service.name}</span>
              <span>Cost: ${service.cost}</span>
              <span>Duration: {service.duration}</span>
              <button className="mt-1 bg-blue-500 text-white px-3 py-1 rounded w-max">Book</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
