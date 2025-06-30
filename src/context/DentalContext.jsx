import { createContext, useContext, useEffect, useState } from "react";

export const DentalContext = createContext();

export const DentalProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const savedPatients = JSON.parse(localStorage.getItem("dental_patients") || "[]");
    const savedIncidents = JSON.parse(localStorage.getItem("dental_incidents") || "[]");
    setPatients(savedPatients);
    setIncidents(savedIncidents);
  }, []);

  return (
    <DentalContext.Provider value={{ patients, setPatients, incidents, setIncidents }}>
      {children}
    </DentalContext.Provider>
  );
};

export const useDental = () => useContext(DentalContext);
