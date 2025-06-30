
export function initializeDataOnce() {
  if (!localStorage.getItem("dental_data_initialized")) {
    const initialData = {
      users: [
        {
          id: "1",
          role: "Admin",
          email: "admin@entnt.in",
          password: "admin123"
        },
        {
          id: "2",
          role: "Patient",
          email: "john@entnt.in",
          password: "patient123",
          patientId: "p1" 
        }
      ],
      patients: [
        {
          id: "p1", 
          name: "John Doe",
          dob: "1990-05-10",
          contact: "1234567890",
          healthInfo: "No allergies"
        }
      ],
      incidents: [
        {
          id: "i1",
          patientId: "p1",
          title: "Toothache",
          description: "Upper molar pain",
          comments: "Sensitive to cold",
          appointmentDate: new Date(Date.now() + 86400000).toISOString(),
          cost: 80,
          status: "Completed",
          treatment: "Filling",
          files: [
            {
              name: "invoice.pdf",
              url: "base64string-or-blob-url"
            },
            {
              name: "xray.png",
              url: "base64string-or-blob-url"
            }
          ]
        }
      ]
    };

    localStorage.setItem("dental_users", JSON.stringify(initialData.users));
    localStorage.setItem("dental_patients", JSON.stringify(initialData.patients));
    localStorage.setItem("dental_incidents", JSON.stringify(initialData.incidents));
    localStorage.setItem("dental_data_initialized", "true");
  }
}

export function formatDateTime(date) {
  const d = new Date(date);
  return d.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
