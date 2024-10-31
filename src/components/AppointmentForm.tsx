import React, { useState } from 'react';
import { format } from 'date-fns';
import { Clock, User, FileText } from 'lucide-react';
import { Appointment } from '../types';

interface AppointmentFormProps {
  selectedDate: Date;
  onSave: (appointment: Omit<Appointment, 'id' | 'status'>) => void;
  onCancel: () => void;
}

export function AppointmentForm({ selectedDate, onSave, onCancel }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    time: '09:00',
    duration: 30,
    description: '',
    attendee: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      date: selectedDate,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            <Clock className="w-4 h-4 inline mr-1" />
            Time
          </label>
          <input
            type="time"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
          >
            <option value={15}>15</option>
            <option value={30}>30</option>
            <option value={45}>45</option>
            <option value={60}>60</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          <User className="w-4 h-4 inline mr-1" />
          Attendee
        </label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.attendee}
          onChange={(e) => setFormData({ ...formData, attendee: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          <FileText className="w-4 h-4 inline mr-1" />
          Description
        </label>
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Save Appointment
        </button>
      </div>
    </form>
  );
}