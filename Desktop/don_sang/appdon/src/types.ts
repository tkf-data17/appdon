export interface Appointment {
  id: number;
  center: string;
  date: string;
  time: string;
  address: string;
  status: 'confirmed' | 'pending' | 'completed';
}

export interface Donation {
  id: number;
  date: string;
  center: string;
  city: string;
  bloodType: string;
  volume: number;
  status: 'completed' | 'scheduled';
}