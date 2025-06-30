import { useContext } from 'react';
import { DentalContext } from '../../context/DentalContext';
import { useAuth } from '../../context/AuthContext';
import { formatDateTime } from '../../utils/helpers';

export default function PatientView() {
  const { user } = useAuth();
  const { patients, incidents } = useContext(DentalContext);

  const patient = patients.find(p => p.id === user.patientId);
  const patientIncidents = incidents.filter(i => i.patientId === user.patientId);

  if (!patient) return <div className="p-6 text-center">Loading patient data...</div>;

  const upcoming = patientIncidents.filter(i => new Date(i.appointmentDate) > new Date());
  const history = patientIncidents.filter(i => new Date(i.appointmentDate) <= new Date());

  return (
    <div className="p-6 space-y-10 max-w-6xl mx-auto">
     
      <section className="bg-white p-6 rounded-lg shadow-md border">
        <h2 className="text-2xl font-semibold text-blue-700 flex items-center gap-2 mb-4">
          👤 My Information
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-gray-700">
          <div><p className="text-sm text-gray-500">Full Name</p><p className="font-medium">{patient.name}</p></div>
          <div><p className="text-sm text-gray-500">DOB</p><p className="font-medium">{patient.dob}</p></div>
          <div><p className="text-sm text-gray-500">Contact</p><p className="font-medium">{patient.contact}</p></div>
          <div><p className="text-sm text-gray-500">Health Info</p><p className="font-medium">{patient.healthInfo}</p></div>
        </div>
      </section>

      
      <section className="bg-white p-6 rounded-lg shadow-md border">
        <h2 className="text-2xl font-semibold text-blue-700 flex items-center gap-2 mb-4">
          📅 Upcoming Appointments
        </h2>
        {upcoming.length > 0 ? (
          <div className="space-y-4">
            {upcoming
              .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
              .map(incident => (
                <div key={incident.id} className="p-4 border rounded-md bg-sky-50">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-sky-800">{incident.title}</h3>
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                      {incident.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">
                    🗓 {formatDateTime(incident.appointmentDate)}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">{incident.comments}</p>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No upcoming appointments.</p>
        )}
      </section>

     
      <section className="bg-white p-6 rounded-lg shadow-md border">
        <h2 className="text-2xl font-semibold text-blue-700 flex items-center gap-2 mb-4">
          🏥 Treatment History
        </h2>
        {history.length > 0 ? (
          <div className="space-y-4">
            {history
              .sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate))
              .map(incident => (
                <div key={incident.id} className="border rounded-md p-4 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">{incident.title}</h3>
                    <span className="text-green-700 font-semibold text-sm">
                      ₹{incident.cost || 0}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    🗓 {formatDateTime(incident.appointmentDate)}
                  </p>
                  <p><span className="font-medium">Treatment:</span> {incident.treatment || "N/A"}</p>
                  <p><span className="font-medium">Status:</span> {incident.status}</p>

                 
                  {incident.files?.length > 0 && (
                    <div className="mt-2">
                      <p className="font-medium text-sm mb-1">📎 Attachments:</p>
                      <ul className="list-disc ml-5 text-sm">
                        {incident.files.map((file, idx) => (
                          <li key={idx}>
                            <a
                              href={file.url}
                              download={file.name}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline"
                            >
                              {file.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No treatment history available.</p>
        )}
      </section>
    </div>
  );
}
