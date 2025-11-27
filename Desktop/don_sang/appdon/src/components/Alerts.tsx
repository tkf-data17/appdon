import { useState } from 'react';
import { AlertCircle, MapPin, Clock, Bell, BellOff } from 'lucide-react';

interface Alert {
  id: number;
  type: 'urgent' | 'important' | 'info';
  bloodType: string[];
  center: string;
  city: string;
  region: string;
  message: string;
  distance: string;
  postedAt: string;
  expiresAt: string;
}

const mockAlerts: Alert[] = [
  {
    id: 1,
    type: 'urgent',
    bloodType: ['O-', 'AB-'],
    center: 'CHU Sylvanus Olympio',
    city: 'Lomé',
    region: 'Maritime',
    message: 'Besoin urgent pour intervention chirurgicale. Merci de vous présenter dès que possible.',
    distance: '2.3 km',
    postedAt: 'Il y a 2 heures',
    expiresAt: 'Aujourd\'hui 18h'
  },
  {
    id: 2,
    type: 'urgent',
    bloodType: ['A+', 'A-'],
    center: 'CHU Campus',
    city: 'Lomé',
    region: 'Maritime',
    message: 'Stocks faibles suite à plusieurs urgences. Votre aide est précieuse.',
    distance: '4.8 km',
    postedAt: 'Il y a 5 heures',
    expiresAt: 'Demain 12h'
  },
  {
    id: 3,
    type: 'important',
    bloodType: ['O+'],
    center: 'CHR Kara',
    city: 'Kara',
    region: 'Kara',
    message: 'Collecte spéciale organisée ce week-end. Tous les donneurs sont les bienvenus.',
    distance: '420 km',
    postedAt: 'Il y a 1 jour',
    expiresAt: 'Dans 3 jours'
  },
  {
    id: 4,
    type: 'info',
    bloodType: ['B+', 'B-', 'AB+', 'AB-'],
    center: 'Centre de Transfusion Sanguine',
    city: 'Lomé',
    region: 'Maritime',
    message: 'Campagne nationale de sensibilisation. Venez découvrir le don de sang.',
    distance: '1.5 km',
    postedAt: 'Il y a 2 jours',
    expiresAt: 'Dans 5 jours'
  }
];

export function Alerts() {
  const [alerts] = useState<Alert[]>(mockAlerts);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedBloodTypes, setSelectedBloodTypes] = useState<string[]>(['O+']);

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const getAlertStyle = (type: Alert['type']) => {
    switch (type) {
      case 'urgent':
        return {
          bg: 'bg-red-50',
          border: 'border-red-300',
          icon: 'text-red-600',
          badge: 'bg-red-600 text-white'
        };
      case 'important':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-300',
          icon: 'text-orange-600',
          badge: 'bg-orange-600 text-white'
        };
      case 'info':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-300',
          icon: 'text-blue-600',
          badge: 'bg-blue-600 text-white'
        };
    }
  };

  const urgentAlerts = alerts.filter(a => a.type === 'urgent');
  const otherAlerts = alerts.filter(a => a.type !== 'urgent');

  const toggleBloodType = (type: string) => {
    setSelectedBloodTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-gray-900">Alertes de don</h2>
        <p className="text-sm text-gray-600 mt-1">Soyez alerté des besoins urgents près de vous</p>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {notificationsEnabled ? (
              <Bell className="w-5 h-5 text-green-600" />
            ) : (
              <BellOff className="w-5 h-5 text-gray-400" />
            )}
            <div>
              <h3 className="text-gray-900">Notifications</h3>
              <p className="text-sm text-gray-600">
                {notificationsEnabled ? 'Activées' : 'Désactivées'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`relative w-14 h-7 rounded-full transition ${
              notificationsEnabled ? 'bg-green-600' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 w-5 h-5 bg-white rounded-full transition transform ${
                notificationsEnabled ? 'translate-x-8' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Blood Type Filter */}
        <div>
          <p className="text-sm text-gray-700 mb-2">Recevoir les alertes pour :</p>
          <div className="grid grid-cols-4 gap-2">
            {bloodTypes.map(type => (
              <button
                key={type}
                onClick={() => toggleBloodType(type)}
                className={`py-2 rounded-lg border transition ${
                  selectedBloodTypes.includes(type)
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-red-500'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Urgent Alerts */}
      {urgentAlerts.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <h3 className="text-gray-900">Urgences ({urgentAlerts.length})</h3>
          </div>
          <div className="space-y-3">
            {urgentAlerts.map(alert => {
              const style = getAlertStyle(alert.type);
              return (
                <div
                  key={alert.id}
                  className={`rounded-xl p-4 border-2 ${style.bg} ${style.border} shadow-md`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 mt-1">
                      <AlertCircle className={`w-6 h-6 ${style.icon} animate-pulse`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-gray-900">{alert.center}</h4>
                          <p className="text-sm text-gray-600">{alert.city} • {alert.region}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${style.badge}`}>
                          URGENT
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {alert.bloodType.map(type => (
                          <span
                            key={type}
                            className="px-3 py-1 bg-white border-2 border-red-600 text-red-600 rounded-full"
                          >
                            {type}
                          </span>
                        ))}
                      </div>

                      <p className="text-sm text-gray-800 mb-3">{alert.message}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{alert.distance}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{alert.postedAt}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
                          Je peux donner
                        </button>
                        <button className="flex-1 bg-white text-gray-700 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition">
                          Partager
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Other Alerts */}
      {otherAlerts.length > 0 && (
        <div>
          <h3 className="text-gray-900 mb-3">Autres alertes ({otherAlerts.length})</h3>
          <div className="space-y-3">
            {otherAlerts.map(alert => {
              const style = getAlertStyle(alert.type);
              return (
                <div
                  key={alert.id}
                  className={`rounded-xl p-4 border ${style.bg} ${style.border}`}
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className={`w-5 h-5 ${style.icon} flex-shrink-0 mt-0.5`} />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-gray-900">{alert.center}</h4>
                          <p className="text-sm text-gray-600">{alert.city}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${style.badge}`}>
                          {alert.type === 'important' ? 'IMPORTANT' : 'INFO'}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-2">
                        {alert.bloodType.map(type => (
                          <span
                            key={type}
                            className="text-sm px-2 py-0.5 bg-white border border-gray-300 text-gray-700 rounded-full"
                          >
                            {type}
                          </span>
                        ))}
                      </div>

                      <p className="text-sm text-gray-700 mb-2">{alert.message}</p>

                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <span>{alert.distance}</span>
                        <span>•</span>
                        <span>{alert.postedAt}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {alerts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 mb-2">Aucune alerte active</h3>
          <p className="text-sm text-gray-600">
            Vous serez notifié dès qu'un besoin urgent apparaît dans votre région
          </p>
        </div>
      )}
    </div>
  );
}
