import { useState } from "react";
import { FaUser, FaPhone, FaBirthdayCake, FaHeartbeat } from "react-icons/fa";

export default function PatientModal({ onClose, onSave, patient }) {
  const [form, setForm] = useState({
    id: patient?.id || "",
    name: patient?.name || "",
    dob: patient?.dob || "",
    contact: patient?.contact || "",
    healthInfo: patient?.healthInfo || "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.dob && form.contact) {
      onSave(form);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-sky-700 mb-6 text-center">
          {patient ? "Edit Patient" : "Add New Patient"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="flex items-center border rounded px-3 py-2">
            <FaUser className="text-sky-600 mr-2" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          
          <div className="flex items-center border rounded px-3 py-2">
            <FaBirthdayCake className="text-sky-600 mr-2" />
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          
          <div className="flex items-center border rounded px-3 py-2">
            <FaPhone className="text-sky-600 mr-2" />
            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              value={form.contact}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          
          <div className="flex items-start border rounded px-3 py-2">
            <FaHeartbeat className="text-sky-600 mr-2 mt-1" />
            <textarea
              name="healthInfo"
              placeholder="Health Info (optional)"
              value={form.healthInfo}
              onChange={handleChange}
              className="w-full outline-none resize-none"
              rows={3}
            />
          </div>

         
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
