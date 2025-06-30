import { useState } from "react";
import { INCIDENT_STATUS } from "../../utils/constants";

export default function IncidentModal({ incident, patients, onClose, onSave }) {
  const [form, setForm] = useState({
    patientId: incident?.patientId || "",
    title: incident?.title || "",
    description: incident?.description || "",
    comments: incident?.comments || "",
    appointmentDate: incident?.appointmentDate || "",
    cost: incident?.cost || "",
    treatment: incident?.treatment || "",
    status: incident?.status || "Scheduled",
    nextAppointmentDate: incident?.nextAppointmentDate || "",
    files: incident?.files || [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileData = [];

    const readFiles = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          fileData.push({
            name: file.name,
            url: reader.result,
          });
          resolve();
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readFiles).then(() => {
      setForm((prev) => ({
        ...prev,
        files: [...prev.files, ...fileData],
      }));
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...incident, ...form });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">
          {incident?.id ? "Edit Appointment" : "Add Appointment"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
          {/* Patient Select */}
          <div>
            <label className="block font-semibold mb-1">Select Patient</label>
            <select
              name="patientId"
              value={form.patientId}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            >
              <option value="">-- Choose --</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <textarea
            name="comments"
            placeholder="Comments"
            value={form.comments}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="datetime-local"
            name="appointmentDate"
            value={form.appointmentDate}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          {/* Status */}
          <div>
            <label className="block font-semibold mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              {Object.values(INCIDENT_STATUS).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Conditionally render after-appointment fields */}
          {form.status === "Completed" && (
            <>
              <input
                type="number"
                name="cost"
                placeholder="Cost (₹)"
                value={form.cost}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                name="treatment"
                placeholder="Treatment Description"
                value={form.treatment}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="datetime-local"
                name="nextAppointmentDate"
                value={form.nextAppointmentDate}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <label className="block font-semibold">
                Upload Files (Invoices / Images)
              </label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {form.files.map((file, idx) => (
                  <span
                    key={idx}
                    className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded"
                  >
                    {file.name}
                  </span>
                ))}
              </div>
            </>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
