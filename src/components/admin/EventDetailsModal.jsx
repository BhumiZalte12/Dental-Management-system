import React from "react";

export default function EventDetailsModal({ event, onClose }) {
  const { title, resource } = event;
  const [patientName, appointmentTitle] = title.split(" - ");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          🧾 Appointment Details
        </h2>

        <div className="space-y-2 text-gray-700 text-sm">
          <p><strong>👤 Patient:</strong> {patientName}</p>
          <p><strong>📌 Title:</strong> {appointmentTitle}</p>
          <p><strong>💬 Description:</strong> {resource.description || "N/A"}</p>
          <p><strong>🗓️ Date:</strong> {new Date(resource.appointmentDate).toLocaleString()}</p>
          <p><strong>💊 Treatment:</strong> {resource.treatment || "Pending"}</p>
          <p><strong>📈 Status:</strong> {resource.status}</p>
          <p><strong>💰 Cost:</strong> ₹{resource.cost || "0"}</p>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
