export default function IncidentTable({ incidents = [], patients = [], onEdit }) {
  if (!incidents.length) return <div>No appointments found.</div>;

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2">Patient</th>
          <th className="p-2">Title</th>
          <th className="p-2">Date</th>
          <th className="p-2">Status</th>
          <th className="p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {incidents.map((incident) => {
          const patient = patients.find(p => p.id === incident.patientId);

          return (
            <tr key={incident.id} className="border-t">
              <td className="p-2">{patient?.name || "Unknown"}</td>
              <td className="p-2">{incident.title}</td>
              <td className="p-2">{new Date(incident.appointmentDate).toLocaleString()}</td>
              <td className="p-2">{incident.status}</td>
              <td className="p-2">
                <button
                  className="text-blue-500"
                  onClick={() => onEdit(incident)}
                >
                  Edit
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
