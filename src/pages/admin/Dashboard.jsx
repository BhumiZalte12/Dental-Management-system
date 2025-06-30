import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    patients: 0,
    appointments: 0,
    upcoming: 0,
    pending: 0,
    revenue: 0,
    topPatients: 0,
  });

  useEffect(() => {
    const patients = JSON.parse(localStorage.getItem("dental_patients") || "[]");
    const incidents = JSON.parse(localStorage.getItem("dental_incidents") || "[]");

    const upcoming = incidents.filter(i => new Date(i.appointmentDate) > new Date()).length;
    const pending = incidents.filter(i => i.status !== "Completed").length;
    const topPatientsSet = new Set(
      incidents
        .filter(i => i.status === "Completed")
        .map(i => i.patientId)
        .slice(0, 3)
    );

    setStats({
      patients: patients.length,
      appointments: incidents.length,
      upcoming,
      pending,
      revenue: incidents.reduce((sum, i) => sum + (Number(i.cost) || 0), 0),
      topPatients: topPatientsSet.size,
    });
  }, []);

  return (
    <div className="p-6 pt-24 bg-sky-50 min-h-screen">
      <h1 className="text-3xl font-bold text-sky-800 mb-10 text-center">Welcome, {user?.name || "Admin"}</h1>

      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-2xl font-semibold mb-6 text-blue-700">Clinic KPIs Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-blue-100 text-blue-800 p-6 rounded shadow hover:scale-[1.03] transition">
            <h4 className="text-lg font-semibold">🗓️ Upcoming Appointments</h4>
            <p className="mt-2 text-3xl font-bold">{stats.upcoming}</p>
          </div>
          <div className="bg-green-100 text-green-800 p-6 rounded shadow hover:scale-[1.03] transition">
            <h4 className="text-lg font-semibold">🏆 Top Patients</h4>
            <p className="mt-2 text-3xl font-bold">{stats.topPatients}</p>
          </div>
          <div className="bg-yellow-100 text-yellow-800 p-6 rounded shadow hover:scale-[1.03] transition">
            <h4 className="text-lg font-semibold">⏳ Pending Treatments</h4>
            <p className="mt-2 text-3xl font-bold">{stats.pending}</p>
          </div>
          <div className="bg-purple-100 text-purple-800 p-6 rounded shadow hover:scale-[1.03] transition">
            <h4 className="text-lg font-semibold">💰 Total Revenue</h4>
            <p className="mt-2 text-3xl font-bold">₹ {stats.revenue.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
