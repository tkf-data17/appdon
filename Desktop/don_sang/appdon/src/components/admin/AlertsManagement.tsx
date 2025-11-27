import { useState } from 'react';
import { Plus, AlertCircle, X, Send } from 'lucide-react';

interface Alert {
  id: number;
  type: 'urgent' | 'important' | 'info';
  bloodType: string[];
  hospital: string;
  city: string;
  region: string;
  message: string;
  createdAt: string;
  expiresAt: string;
  status: 'active' | 'expired' | 'resolved';
  responses: number;
}

const mockAlerts: Alert[] = [
  {
    id: 1,
    type: 'urgent',
    bloodType: ['O-', 'AB-'],
    hospital: 'CHU Sylvanus Olympio',
    city: 'Lomé',
    region: 'Maritime',
    message: 'Besoin urgent pour intervention chirurgicale. Merci de vous présenter dès que possible.',
    createdAt: '2025-11-27T08:00:00',
    expiresAt: '2025-11-27T18:00:00',
    status: 'active',
    responses: 12
  },
  {
    id: 2,
    type: 'urgent',
    bloodType: ['A+', 'A-'],
    hospital: 'CHU Campus',
    city: 'Lomé',
    region: 'Maritime',
    message: 'Stocks faibles suite à plusieurs urgences. Votre aide est précieuse.',
    createdAt: '2025-11-27T03:00:00',
    expiresAt: '2025-11-28T12:00:00',
    status: 'active',
    responses: 8
  },
  {
    id: 3,
    type: 'important',
    bloodType: ['O+'],
    hospital: 'CHR Kara',
    city: 'Kara',
    region: 'Kara',
    message: 'Collecte spéciale organisée ce week-end. Tous les donneurs sont les bienvenus.',
    createdAt: '2025-11-26T10:00:00',
    expiresAt: '2025-11-30T17:00:00',
    status: 'active',
    responses: 25
  }
];

export function AlertsManagement() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    type: 'important' as Alert['type'],
    bloodType: [] as string[],
    hospital: '',
    city: '',
    region: 'Maritime',
    message: '',
    expiresAt: ''
  });

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const regions = ['Maritime', 'Plateaux', 'Centrale', 'Kara', 'Savanes'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAlert: Alert = {
      id: Math.max(...alerts.map(a => a.id), 0) + 1,
      ...formData,
      createdAt: new Date().toISOString(),
      status: 'active',
      responses: 0
    };

    setAlerts([newAlert, ...alerts]);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      type: 'important',
      bloodType: [],
      hospital: '',
      city: '',
      region: 'Maritime',
      message: '',
      expiresAt: ''
    });
    setShowForm(false);
  };

  const toggleBloodType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      bloodType: prev.bloodType.includes(type)
        ? prev.bloodType.filter(t => t !== type)
        : [...prev.bloodType, type]
    }));
  };

  const handleResolve = (id: number) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, status: 'resolved' as Alert['status'] } : alert
    ));
  };

  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette alerte ?')) {
      setAlerts(alerts.filter(a => a.id !== id));
    }
  };

  const getAlertStyle = (type: Alert['type']) => {
    switch (type) {
      case 'urgent':
        return {
          bg: 'bg-red-50',
          border: 'border-red-300',
          text: 'text-red-900',
          badge: 'bg-red-600 text-white'
        };
      case 'important':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-300',
          text: 'text-orange-900',
          badge: 'bg-orange-600 text-white'
        };
      case 'info':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-300',
          text: 'text-blue-900',
          badge: 'bg-blue-600 text-white'
        };
    }
  };

  const activeAlerts = alerts.filter(a => a.status === 'active');
  const resolvedAlerts = alerts.filter(a => a.status === 'resolved');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Gestion des alertes</h2>
          <p className="text-sm text-gray-600 mt-1">{activeAlerts.length} alertes actives</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          <Plus className="w-5 h-5" />
          Nouvelle alerte
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Alertes actives</p>
          <p className="text-3xl font-bold text-red-600">{activeAlerts.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Réponses totales</p>
          <p className="text-3xl font-bold text-green-600">
            {alerts.reduce((sum, a) => sum + a.responses, 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Résolues aujourd'hui</p>
          <p className="text-3xl font-bold text-blue-600">
            {resolvedAlerts.length}
          </p>
        </div>
      </div>

      {/* Active Alerts */}
      <div>
        <h3 className="text-gray-900 mb-3">Alertes actives</h3>
        <div className="space-y-3">
          {activeAlerts.map(alert => {
            const style = getAlertStyle(alert.type);
            const hoursLeft = Math.ceil(
              (new Date(alert.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60)
            );

            return (
              <div
                key={alert.id}
                className={`rounded-xl p-5 border-2 ${style.bg} ${style.border} shadow-md`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <h4 className={`${style.text}`}>{alert.hospital}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${style.badge}`}>
                        {alert.type === 'urgent' ? 'URGENT' : alert.type === 'important' ? 'IMPORTANT' : 'INFO'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{alert.city}, {alert.region}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {alert.bloodType.map(type => (
                        <span
                          key={type}
                          className="px-3 py-1 bg-white border-2 border-red-600 text-red-600 rounded-full font-semibold"
                        >
                          {type}
                        </span>
                      ))}
                    </div>

                    <p className={`text-sm ${style.text} mb-3`}>{alert.message}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>📅 Créée {new Date(alert.createdAt).toLocaleDateString('fr-FR')}</span>
                      <span>⏰ Expire dans {hoursLeft}h</span>
                      <span className="text-green-600">✓ {alert.responses} réponses</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-300">
                  <button
                    onClick={() => handleResolve(alert.id)}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Marquer comme résolue
                  </button>
                  <button
                    onClick={() => handleDelete(alert.id)}
                    className="px-4 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {activeAlerts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600">Aucune alerte active</p>
          </div>
        )}
      </div>

      {/* Resolved Alerts */}
      {resolvedAlerts.length > 0 && (
        <div>
          <h3 className="text-gray-900 mb-3">Alertes résolues</h3>
          <div className="space-y-3">
            {resolvedAlerts.map(alert => (
              <div
                key={alert.id}
                className="bg-gray-50 rounded-xl p-4 border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-gray-900">{alert.hospital}</h4>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                        Résolue
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{alert.city} • {alert.bloodType.join(', ')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {alert.responses} réponses
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-gray-900">Créer une nouvelle alerte</h3>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Niveau d'urgence <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['urgent', 'important', 'info'] as const).map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, type })}
                      className={`p-3 rounded-lg border-2 transition ${
                        formData.type === type
                          ? type === 'urgent'
                            ? 'bg-red-50 border-red-600 text-red-900'
                            : type === 'important'
                            ? 'bg-orange-50 border-orange-600 text-orange-900'
                            : 'bg-blue-50 border-blue-600 text-blue-900'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {type === 'urgent' ? 'URGENT' : type === 'important' ? 'Important' : 'Info'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Groupes sanguins recherchés <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {bloodTypes.map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => toggleBloodType(type)}
                      className={`py-2 rounded-lg border-2 transition ${
                        formData.bloodType.includes(type)
                          ? 'bg-red-600 text-white border-red-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-red-500'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Hôpital/Centre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.hospital}
                    onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Ville <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Région <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Date d'expiration <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.expiresAt}
                    onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                    min={new Date().toISOString().slice(0, 16)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  placeholder="Décrivez la situation et les besoins..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Publier l'alerte
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
