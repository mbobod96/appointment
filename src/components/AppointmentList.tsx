import React from 'react';
import { format } from 'date-fns';
import { Clock, User, CheckCircle, XCircle, Calendar as CalendarIcon } from 'lucide-react';
import { Appointment } from '../types';

interface AppointmentListProps {
  appointments: Appointment[];
  onStatusChange: (id: string, status: Appointment['status']) => void;
}

export function AppointmentList({ appointments, onStatusChange }: AppointmentListProps) {
  const statusColors = {
    scheduled: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{appointment.title}</h3>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-600 flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {format(new Date(appointment.date), 'MMMM d, yyyy')}
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {appointment.time} ({appointment.duration} minutes)
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {appointment.attendee}
                </p>
              </div>
              {appointment.description && (
                <p className="mt-2 text-sm text-gray-600">{appointment.description}</p>
              )}
            </div>
            <div className="flex flex-col items-end space-y-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[appointment.status]}`}>
                {appointment.status}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => onStatusChange(appointment.id, 'completed')}
                  className="p-1 hover:bg-green-100 rounded-full"
                  title="Mark as completed"
                >
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </button>
                <button
                  onClick={() => onStatusChange(appointment.id, 'cancelled')}
                  className="p-1 hover:bg-red-100 rounded-full"
                  title="Cancel appointment"
                >
                  <XCircle className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {appointments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No appointments scheduled for this day
        </div>
      )}
    </div>
  );
}