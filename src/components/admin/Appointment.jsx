"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const Appointment = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3, once: true });
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section ref={ref} id="appointment" className="pt-16 pb-6 px-6 md:px-16 bg-white text-sky-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          {/* Left: Google Map */}
          <motion.div
            className="relative w-full h-60 sm:h-96 md:col-span-2 rounded-xl overflow-hidden shadow-md"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <iframe
              className="w-full h-full"
              src="https://maps.google.com/maps?q=dental%20clinic&t=&z=13&ie=UTF8&iwloc=&output=embed"
              allowFullScreen
              loading="lazy"
            ></iframe>
            <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded shadow-md flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500" />
              <span className="text-sm font-semibold">ENTNT Dental Clinic</span>
            </div>
          </motion.div>

          {/* Right: Booking Info */}
          <motion.div
            className="p-8 bg-sky-50 rounded-2xl shadow-lg md:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-sky-700 font-bold uppercase text-xl">Book Appointment</h3>
            <p className="text-gray-800 mt-2 mb-4">
              Get expert care with the latest technology and a dedicated team.
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-700 transition"
            >
              Open Booking Form
            </button>
          </motion.div>
        </div>
      </section>

      {/* Modal: Booking Form */}
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            className="bg-white p-8 rounded-xl shadow-xl w-[90%] max-w-lg relative"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-4 text-xl text-gray-600 hover:text-red-500"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-sky-700 mb-6 text-center">Book Your Appointment</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full border p-2 rounded" />
              <input type="email" placeholder="Email Address" className="w-full border p-2 rounded" />
              <select className="w-full border p-2 rounded text-gray-600">
                <option value="">Select Service</option>
                <option>Cleaning</option>
                <option>Implants</option>
                <option>Root Canal</option>
              </select>
              <input type="datetime-local" className="w-full border p-2 rounded" />
              <textarea
                placeholder="Any concerns or symptoms?"
                rows="3"
                className="w-full border p-2 rounded"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-sky-600 text-white py-2 rounded hover:bg-sky-700 transition"
              >
                Submit Appointment
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Appointment;
