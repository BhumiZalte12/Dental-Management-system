import { useState, useContext } from "react";
import { DentalContext } from "../../context/DentalContext";
import IncidentModal from "../../components/admin/IncidentModal";
import { FiCalendar } from "react-icons/fi";
import { INCIDENT_STATUS } from "../../utils/constants";

export default function IncidentsPage() {
  const { incidents, setIncidents, patients, loading } = useContext(DentalContext);
  const [showModal, setShowModal] = useState(false);
  const [editingIncident, setEditingIncident] = useState(null);

  const handleSaveIncident = (updatedIncident) => {
    const updatedList = updatedIncident.id
      ? incidents.map((i) => (i.id === updatedIncident.id ? updatedIncident : i))
      : [...incidents, { ...updatedIncident, id: `i${Date.now()}` }];

    setIncidents(updatedList);
    localStorage.setItem("dental_incidents", JSON.stringify(updatedList));
    setShowModal(false);
    setEditingIncident(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-500 animate-pulse">Loading appointments...</p>
      </div>
    );
  }

  const getPatientName = (id) => {
    const patient = patients.find((p) => p.id === id);
    return patient ? patient.name : "Unknown";
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <FiCalendar className="text-3xl text-sky-700" />
          <h1 className="text-3xl font-bold text-sky-800">Appointment Management</h1>
        </div>
        <button
          className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 transition"
          onClick={() => {
            setEditingIncident(null);
            setShowModal(true);
          }}
        >
          + Add Appointment
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <IncidentModal
          incident={editingIncident}
          patients={patients}
          onClose={() => {
            setShowModal(false);
            setEditingIncident(null);
          }}
          onSave={handleSaveIncident}
        />
      )}

      {/* Table */}
      {incidents.length === 0 ? (
        <p className="text-gray-600 text-center mt-10">No appointments found. Add one to get started.</p>
      ) : (
        <div className="overflow-x-auto shadow border border-gray-200 rounded-lg">
          <table className="w-full text-sm text-left bg-white">
            <thead className="bg-sky-50 text-sky-800 text-sm uppercase">
              <tr>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Treatment</th>
                <th className="px-4 py-3">Cost</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {incidents.map((incident) => (
                <tr key={incident.id} className="hover:bg-sky-50 border-b">
                  <td className="px-4 py-3">{getPatientName(incident.patientId)}</td>
                  <td className="px-4 py-3">{incident.title}</td>
                  <td className="px-4 py-3">
                    {new Date(incident.appointmentDate).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        incident.status === INCIDENT_STATUS.Completed
                          ? "bg-green-100 text-green-700"
                          : incident.status === INCIDENT_STATUS.Cancelled
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {incident.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{incident.treatment || "-"}</td>
                  <td className="px-4 py-3">₹ {incident.cost || "0"}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => {
                        setEditingIncident(incident);
                        setShowModal(true);
                      }}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
