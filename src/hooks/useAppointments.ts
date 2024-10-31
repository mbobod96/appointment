import { useState, useEffect } from 'react';
import { Appointment } from '../types';

const STORAGE_KEY = 'appointments';

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (appointmentData: Omit<Appointment, 'id' | 'status'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: crypto.randomUUID(),
      status: 'scheduled',
    };
    setAppointments(prev => [...prev, newAppointment]);
    return newAppointment;
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments(prev => 
      prev.map(apt => apt.id === id ? { ...apt, status } : apt)
    );
  };

  const getAppointmentsByDate = (date: Date) => {
    return appointments.filter(apt => 
      new Date(apt.date).toDateString() === date.toDateString()
    );
  };

  return {
    appointments,
    addAppointment,
    updateAppointmentStatus,
    getAppointmentsByDate,
  };
}