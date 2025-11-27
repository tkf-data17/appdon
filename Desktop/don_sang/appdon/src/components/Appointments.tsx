import { useState } from 'react';
import { Calendar, Clock, MapPin, ChevronRight, Plus } from 'lucide-react';
import { Appointment } from '../types';

interface AppointmentsProps {
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  openNewAppointmentForm?: boolean;
}

export function Appointments({ appointments, setAppointments, openNewAppointmentForm = false }: AppointmentsProps) {
  const [showNewAppointment, setShowNewAppointment] = useState(openNewAppointmentForm);
  const [editingAppointmentId, setEditingAppointmentId] = useState<number | null>(null);
  
  // New appointment form state
  const [selectedCenter, setSelectedCenter] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const upcomingAppointments = appointments.filter(apt => apt.status === 'confirmed');
  const pastAppointments = appointments.filter(apt => apt.status === 'completed');

  const centers = [
    'CHU Sylvanus Olympio',
    'CHU Campus',
    'Centre de Transfusion Sanguine',
    'CHR Kara',
    'CHR Sokodé'
  ];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCenter || !selectedDate || !selectedTime) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    if (editingAppointmentId !== null) {
      // Update existing appointment
      setAppointments(prevAppointments =>
        prevAppointments.map(apt =>
          apt.id === editingAppointmentId
            ? { ...apt, center: selectedCenter, date: selectedDate, time: selectedTime }
            : apt
        )
      );
      alert('Rendez-vous modifié avec succès !');
    } else {
      // Create new appointment
      const newId = appointments.length > 0 ? Math.max(...appointments.map(apt => apt.id)) + 1 : 1;
      const newAppointment: Appointment = {
        id: newId,
        center: selectedCenter,
        date: selectedDate,
        time: selectedTime,
        address: centerAddresses[selectedCenter] || 'Adresse inconnue', // Use the map
        status: 'pending' // New appointments start as pending
      };
      setAppointments(prevAppointments => [...prevAppointments, newAppointment]);
      alert('Demande de rendez-vous envoyée ! En attente de confirmation.');
    }

    setShowNewAppointment(false);
    setSelectedCenter('');
    setSelectedDate('');
    setSelectedTime('');
    setEditingAppointmentId(null); // Reset editing state
  };

  const handleEditClick = (appointment: Appointment) => {
    setEditingAppointmentId(appointment.id);
    setSelectedCenter(appointment.center);
    setSelectedDate(appointment.date);
    setSelectedTime(appointment.time);
    setShowNewAppointment(true);
  };

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed':
        return <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 border border-green-200">Confirmé</span>;
      case 'pending':
        return <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200">En attente</span>;
      case 'completed':
        return <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">Complété</span>;
    }
  };

  if (showNewAppointment) {
    return (
      <div className="p-4">
        <div className="mb-6">
          <button
            onClick={() => setShowNewAppointment(false)}
            className="text-red-600 hover:underline mb-2"
          >
            ← Retour
          </button>
          <h2 className="text-gray-900">{editingAppointmentId !== null ? 'Modifier le rendez-vous' : 'Nouveau rendez-vous'}</h2>
          <p className="text-sm text-gray-600 mt-1">Planifiez votre prochain don de sang</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Center Selection */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Centre de don <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedCenter}
              onChange={(e) => setSelectedCenter(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && selectedCenter && selectedDate && selectedTime) {
                  handleSubmit(e as any);
                }
              }}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Sélectionnez un centre</option>
              {centers.map(center => (
                <option key={center} value={center}>{center}</option>
              ))}
            </select>
          </div>


          {/* Date Selection */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && selectedCenter && selectedDate && selectedTime) {
                  handleSubmit(e as any);
                }
              }}
              min={new Date().toISOString().split('T')[0]}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Time Selection */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Heure <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map(time => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 rounded-lg border transition ${
                    selectedTime === time
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-red-500'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="text-blue-900 mb-2">📋 À savoir avant votre don</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Mangez normalement avant le don</li>
              <li>• Buvez beaucoup d'eau (au moins 2 verres)</li>
              <li>• Apportez une pièce d'identité</li>
              <li>• Prévoyez 30-45 minutes pour le don complet</li>
            </ul>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowNewAppointment(false)}
              className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
            >
              Confirmer le RDV
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header with CTA */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Mes rendez-vous</h2>
          <p className="text-sm text-gray-600 mt-1">Gérez vos dons de sang</p>
        </div>
        <button
          onClick={() => setShowNewAppointment(true)}
          className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Upcoming Appointments */}
      {upcomingAppointments.length > 0 && (
        <div>
          <h3 className="text-gray-900 mb-3">À venir</h3>
          <div className="space-y-3">
            {upcomingAppointments.map(apt => (
              <div key={apt.id} className="bg-white rounded-xl p-4 shadow-md border-l-4 border-red-600">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-gray-900">{apt.center}</h4>
                      {getStatusBadge(apt.status)}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">
                      {new Date(apt.date).toLocaleDateString('fr-FR', { 
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{apt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{apt.address}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEditClick(apt)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition text-sm"
                  >
                    Modifier
                  </button>
                  <button className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition text-sm">
                    Annuler
                  </button>
                  <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {upcomingAppointments.length === 0 && (
        <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 mb-2">Aucun rendez-vous prévu</h3>
          <p className="text-sm text-gray-600 mb-4">
            Planifiez votre prochain don de sang dès maintenant
          </p>
          <button
            onClick={() => setShowNewAppointment(true)}
            className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Nouveau rendez-vous
          </button>
        </div>
      )}

      {/* Past Appointments */}
      {pastAppointments.length > 0 && (
        <div>
          <h3 className="text-gray-900 mb-3">Historique récent</h3>
          <div className="space-y-3">
            {pastAppointments.map(apt => (
              <div key={apt.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-gray-700">{apt.center}</h4>
                      {getStatusBadge(apt.status)}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
                      <span>{new Date(apt.date).toLocaleDateString('fr-FR')}</span>
                      <span>•</span>
                      <span>{apt.time}</span>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:underline text-sm">
                    Détails
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Map center names to their addresses for more realistic data
const centerAddresses: { [key: string]: string } = {
  'CHU Sylvanus Olympio': 'Boulevard du 13 Janvier, Lomé',
  'CHU Campus': 'Rue de la Kozah, Lomé',
  'Centre de Transfusion Sanguine': 'Rue du Commerce, Lomé',
  'CHR Kara': 'Route de Bassar, Kara',
  'CHR Sokodé': 'Avenue de la Victoire, Sokodé'
};

