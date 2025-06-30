export const getPatients = () => {
  return JSON.parse(localStorage.getItem('dental_patients')) || [];
};

export const savePatient = (patient) => {
  const patients = getPatients();
  const existingIndex = patients.findIndex(p => p.id === patient.id);
  
  if (existingIndex >= 0) {
    patients[existingIndex] = patient;
  } else {
    patients.push(patient);
  }
  
  localStorage.setItem('dental_patients', JSON.stringify(patients));
  return patient;
};

export const deletePatient = (id) => {
  const patients = getPatients().filter(p => p.id !== id);
  localStorage.setItem('dental_patients', JSON.stringify(patients));
};

export const getIncidents = () => {
  return JSON.parse(localStorage.getItem('dental_incidents')) || [];
};

export const saveIncident = (incident) => {
  const incidents = getIncidents();
  const existingIndex = incidents.findIndex(i => i.id === incident.id);
  
  if (existingIndex >= 0) {
    incidents[existingIndex] = incident;
  } else {
    incidents.push(incident);
  }
  
  localStorage.setItem('dental_incidents', JSON.stringify(incidents));
  return incident;
};

export const deleteIncident = (id) => {
  const incidents = getIncidents().filter(i => i.id !== id);
  localStorage.setItem('dental_incidents', JSON.stringify(incidents));
};