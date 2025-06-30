import { useContext, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { DentalContext } from '../../context/DentalContext';
import EventDetailsModal from '../../components/admin/EventDetailsModal';

const locales = { 'en-US': enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarPage() {
  const { incidents, patients } = useContext(DentalContext);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = incidents.map((incident) => {
    const patient = patients.find((p) => p.id === incident.patientId);
    return {
      title: `${patient?.name || 'Unknown'} - ${incident.title}`,
      start: new Date(incident.appointmentDate),
      end: new Date(new Date(incident.appointmentDate).getTime() + 3600000),
      allDay: false,
      resource: incident,
    };
  });

  return (
    <div className="p-6 min-h-screen bg-sky-50 rounded-md shadow-md">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-1">🗓️ Appointment Calendar</h1>
        <p className="text-gray-600">View all scheduled appointments and details in calendar view.</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow border border-blue-100">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          onSelectEvent={(event) => setSelectedEvent(event)} 
        />
      </div>

     
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}
