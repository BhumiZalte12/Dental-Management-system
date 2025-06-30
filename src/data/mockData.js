export const mockData = {
  users: [
    {
      id: "1",
      role: "Admin",
      email: "admin@entnt.in",
      password: "admin123",
    },
    {
      id: "2",
      role: "Patient",
      email: "john@entnt.in",
      password: "patient123",
      patientId: "p1",
    },
  ],
  patients: [
    {
      id: "p1",
      name: "John Doe",
      dob: "1990-05-10",
      contact: "1234567890",
      healthInfo: "No allergies",
    },
  ],
  incidents: [
    {
      id: "i1",
      patientId: "p1",
      title: "Toothache",
      description: "Upper molar pain",
      comments: "Sensitive to cold",
      appointmentDate: new Date(Date.now() + 86400000).toISOString(), 
      cost: 180,
      status: "Completed",
      treatment: "Filling",
      files: [],
    },
  ],
};
