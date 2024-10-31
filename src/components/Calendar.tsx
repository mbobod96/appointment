import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameDay } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Appointment } from '../types';

interface CalendarProps {
  selectedDate: Date;
  appointments: Appointment[];
  onSelectDate: (date: Date) => void;
}

export function Calendar({ selectedDate, appointments, onSelectDate }: CalendarProps) {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <CalendarIcon className="w-5 h-5" />
          {format(selectedDate, 'MMMM yyyy')}
        </h2>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
        {days.map((day) => {
          const dayAppointments = appointments.filter((apt) => 
            isSameDay(new Date(apt.date), day)
          );
          
          return (
            <button
              key={day.toString()}
              onClick={() => onSelectDate(day)}
              className={`
                aspect-square p-2 flex flex-col items-center justify-center rounded-lg
                hover:bg-blue-50 transition-colors relative
                ${isToday(day) ? 'bg-blue-100' : ''}
                ${isSameDay(day, selectedDate) ? 'border-2 border-blue-500' : ''}
              `}
            >
              <span className="text-sm">{format(day, 'd')}</span>
              {dayAppointments.length > 0 && (
                <div className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-blue-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}