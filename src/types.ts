export interface Appointment {
  id: string;
  title: string;
  date: Date;
  time: string;
  duration: number;
  description: string;
  attendee: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}