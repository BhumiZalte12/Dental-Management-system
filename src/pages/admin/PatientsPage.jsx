import { useState, useContext } from "react";
import { DentalContext } from "../../context/DentalContext";
import PatientModal from "../../components/admin/PatientModal";
import { FaUserEdit, FaUserPlus } from "react-icons/fa";

export default function PatientsPage() {
  const { patients, setPatients } = useContext(DentalContext);
  const [showModal, setShowModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);

  const handleSave = (patient) => {
    let updatedPatients;
    if (patient.id) {
      // Edit existing
      updatedPatients = patients.map((p) =>
        p.id === patient.id ? patient : p
      );
    } else {
      // Add new
      const newPatient = {
        ...patient,
        id: `p${Date.now()}`,
      };
      updatedPatients = [...patients, newPatient];
    }
    setPatients(updatedPatients);
    localStorage.setItem("dental_patients", JSON.stringify(updatedPatients));
    setShowModal(false);
    setEditingPatient(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-sky-800">🧑‍⚕️ Patient Management</h1>
        <button
          className="bg-sky-600 hover:bg-sky-700 text-white flex items-center gap-2 px-4 py-2 rounded shadow"
          onClick={() => {
            setEditingPatient(null);
            setShowModal(true);
          }}
        >
          <FaUserPlus />
          Add Patient
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <PatientModal
          onClose={() => {
            setShowModal(false);
            setEditingPatient(null);
          }}
          onSave={handleSave}
          patient={editingPatient}
        />
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm rounded shadow">
          <thead className="bg-gray-100 text-sky-700 uppercase text-xs font-semibold">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Date of Birth</th>
              <th className="py-3 px-4 text-left">Contact</th>
              <th className="py-3 px-4 text-left">Health Info</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 divide-y divide-gray-200">
            {patients.map((p) => (
              <tr key={p.id} className="hover:bg-sky-50 transition">
                <td className="py-3 px-4">{p.name}</td>
                <td className="py-3 px-4">{p.dob}</td>
                <td className="py-3 px-4">{p.contact}</td>
                <td className="py-3 px-4">{p.healthInfo}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => {
                      setEditingPatient(p);
                      setShowModal(true);
                    }}
                    className="text-sky-600 hover:text-sky-800"
                    title="Edit Patient"
                  >
                    <FaUserEdit className="inline-block text-lg" />
                  </button>
                </td>
              </tr>
            ))}
            {patients.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No patients found. Please add one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
