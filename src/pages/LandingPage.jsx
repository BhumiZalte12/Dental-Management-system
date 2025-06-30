import React, { useState } from "react";
import Services from "../components/Services";
import Navbar from "../components/Navbar";
import Appointment from "../components/admin/Appointment";

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Navbar />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-sky-50 py-16 px-4">
          <div className="max-w-screen-xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
            {/* Left Content */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-sky-800 leading-tight mb-6">
                Entrust your <span className="text-sky-600">smile</span> to professionals
              </h1>
              <p className="text-gray-700 text-base sm:text-lg mb-6">
                Modern dental care with a personal touch. We use the latest technology and a compassionate approach to ensure a pain-free, healthy smile.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-sky-600 text-white px-6 py-3 rounded shadow hover:bg-sky-700 transition"
              >
                Book Appointment
              </button>
            </div>

            {/* Right Image */}
            <div className="w-full md:w-1/2">
              <img
                src="/clinic-bg.png"
                alt="Dental Clinic"
                className="w-full max-w-md mx-auto rounded-xl shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Services */}
        <Services />

        {/* Appointment Modal */}
        <Appointment isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>

      {/* Footer */}
      <footer className="bg-sky-800 text-white mt-16">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">ENTNT Dental Care</h4>
            <p className="text-sm">
              Your trusted partner in oral healthcare. Delivering excellence with care and compassion.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/services" className="hover:underline">Services</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
              <li><a href="/login/admin" className="hover:underline">Admin Login</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-sm">📍 123 Dental Lane, Smile City, India</p>
            <p className="text-sm mt-2">📞 +91 98765 43210</p>
            <p className="text-sm">📧 contact@entntdental.com</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4 text-xl">
              <a href="#" className="hover:text-blue-300">🌐</a>
              <a href="#" className="hover:text-blue-300">📘</a>
              <a href="#" className="hover:text-blue-300">📷</a>
            </div>
          </div>
        </div>
        <div className="text-center py-4 bg-sky-900 text-sm">
          &copy; {new Date().getFullYear()} ENTNT Dental Care. All rights reserved.
        </div>
      </footer>
    </>
  );
}
