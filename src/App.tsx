import React, { useState } from 'react';
import { format } from 'date-fns';
import { PlusCircle, Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from './components/Calendar';
import { AppointmentForm } from './components/AppointmentForm';
import { AppointmentList } from './components/AppointmentList';
import { useAppointments } from './hooks/useAppointments';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const { appointments, addAppointment, updateAppointmentStatus, getAppointmentsByDate } = useAppointments();

  const handleSaveAppointment = (appointmentData: any) => {
    addAppointment(appointmentData);
    setShowForm(false);
  };

  const filteredAppointments = getAppointmentsByDate(selectedDate);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <CalendarIcon className="w-8 h-8 text-blue-600" />
              Appointment Manager
            </h1>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              New Appointment
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Calendar
              selectedDate={selectedDate}
              appointments={appointments}
              onSelectDate={setSelectedDate}
            />
          </div>
          <div className="lg:col-span-2">
            {showForm ? (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">New Appointment</h2>
                <AppointmentForm
                  selectedDate={selectedDate}
                  onSave={handleSaveAppointment}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                  Appointments for {format(selectedDate, 'MMMM d, yyyy')}
                </h2>
                <AppointmentList
                  appointments={filteredAppointments}
                  onStatusChange={updateAppointmentStatus}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;