import React from "react";
import haircut from "./assets/haircut.jpg";
import facial from "./assets/facial.jpg";
import manicure from "./assets/manicure.jpg";

export default function Home({
  onNavigateToCustomerLogin,
  onNavigateToStaffLogin,
  onNavigateToBooking,
  onNavigateToRegister,
}) {
  const services = [
    {
      title: "Haircut & Styling",
      image: haircut,
      description: "Professional cuts and creative styles tailored to you.",
      price: "₹499",
      duration: "30 mins",
    },
    {
      title: "Facial Glow",
      image: facial,
      description: "Brighten and refresh your skin with premium facials.",
      price: "₹799",
      duration: "45 mins",
    },
    {
      title: "Manicure & Pedicure",
      image: manicure,
      description: "Pamper your hands and feet with our relaxing treatments.",
      price: "₹599",
      duration: "60 mins",
    },
  ];

  return (
    <div className="bg-white min-h-screen font-sans">
      <header className="text-center py-10 px-4">
        <h1 className="text-4xl font-bold text-pink-600 mb-3">
          Welcome to Glamour Salon
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Experience beauty, relaxation, and style at its finest.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button
            onClick={onNavigateToStaffLogin}
            className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700"
          >
            Staff/Admin Login
          </button>
          <button
            onClick={onNavigateToCustomerLogin}
            className="border border-pink-600 text-pink-600 px-6 py-2 rounded-full hover:bg-pink-50"
          >
            Customer Login
          </button>
          <button
            onClick={onNavigateToRegister}
            className="border border-pink-600 text-pink-600 px-6 py-2 rounded-full hover:bg-pink-50"
          >
            Register
          </button>
          <button
            onClick={onNavigateToBooking}
            className="border border-pink-600 text-pink-600 px-6 py-2 rounded-full hover:bg-pink-50"
          >
            Book Appointment
          </button>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
          Our Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-all overflow-hidden flex flex-col"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-6 flex flex-col gap-2">
                <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Price: {service.price}</span>
                  <span>Duration: {service.duration}</span>
                </div>
                <button
                  onClick={onNavigateToBooking}
                  className="mt-4 bg-pink-600 text-white py-2 rounded-full hover:bg-pink-700 transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
