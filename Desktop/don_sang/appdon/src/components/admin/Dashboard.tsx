import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Droplet, Building2, TrendingUp, AlertCircle, Calendar } from 'lucide-react';

// Mock data for blood types
const bloodTypeData = [
  { type: 'A+', donors: 3421, stock: 145, demand: 167 },
  { type: 'A-', donors: 421, stock: 23, demand: 45 },
  { type: 'B+', donors: 2156, stock: 89, demand: 102 },
  { type: 'B-', donors: 287, stock: 12, demand: 28 },
  { type: 'AB+', donors: 756, stock: 34, demand: 41 },
  { type: 'AB-', donors: 98, stock: 4, demand: 12 },
  { type: 'O+', donors: 4234, stock: 198, demand: 213 },
  { type: 'O-', donors: 512, stock: 18, demand: 56 },
];

// Daily statistics for the last 7 days
const dailyData = [
  { day: 'Lun', donations: 45, appointments: 52, alerts: 3 },
  { day: 'Mar', donations: 52, appointments: 48, alerts: 2 },
  { day: 'Mer', donations: 38, appointments: 45, alerts: 5 },
  { day: 'Jeu', donations: 61, appointments: 58, alerts: 1 },
  { day: 'Ven', donations: 48, appointments: 55, alerts: 4 },
  { day: 'Sam', donations: 34, appointments: 38, alerts: 2 },
  { day: 'Dim', donations: 28, appointments: 31, alerts: 3 },
];

// Region distribution
const regionData = [
  { name: 'Maritime', value: 5847, color: '#ef4444' },
  { name: 'Plateaux', value: 2134, color: '#3b82f6' },
  { name: 'Centrale', value: 1567, color: '#10b981' },
  { name: 'Kara', value: 1234, color: '#f59e0b' },
  { name: 'Savanes', value: 1065, color: '#8b5cf6' },
];

export function Dashboard() {
  const totalDonors = bloodTypeData.reduce((sum, item) => sum + item.donors, 0);
  const totalStock = bloodTypeData.reduce((sum, item) => sum + item.stock, 0);
  const todayDonations = dailyData[dailyData.length - 1].donations;
  const activeAlerts = 3;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Donneurs actifs</p>
              <p className="text-3xl font-bold text-gray-900">{totalDonors.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">+12% ce mois</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Stock total (unités)</p>
              <p className="text-3xl font-bold text-gray-900">{totalStock}</p>
              <p className="text-sm text-orange-600 mt-1">Niveau moyen</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Droplet className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Dons aujourd'hui</p>
              <p className="text-3xl font-bold text-gray-900">{todayDonations}</p>
              <p className="text-sm text-green-600 mt-1">+8% vs hier</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Alertes actives</p>
              <p className="text-3xl font-bold text-gray-900">{activeAlerts}</p>
              <p className="text-sm text-red-600 mt-1">Nécessite attention</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blood Type Statistics */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="mb-4">
            <h3 className="text-gray-900">Statistiques par groupe sanguin</h3>
            <p className="text-sm text-gray-600">Donneurs, stock et demande</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bloodTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="donors" fill="#3b82f6" name="Donneurs" />
              <Bar dataKey="stock" fill="#10b981" name="Stock (unités)" />
              <Bar dataKey="demand" fill="#ef4444" name="Demande" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Trends */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="mb-4">
            <h3 className="text-gray-900">Tendances journalières</h3>
            <p className="text-sm text-gray-600">7 derniers jours</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="donations" stroke="#ef4444" strokeWidth={2} name="Dons effectués" />
              <Line type="monotone" dataKey="appointments" stroke="#3b82f6" strokeWidth={2} name="Rendez-vous" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Regional Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="mb-4">
            <h3 className="text-gray-900">Répartition régionale</h3>
            <p className="text-sm text-gray-600">Donneurs par région</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={regionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {regionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Stock Alerts */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="mb-4">
            <h3 className="text-gray-900">Alertes de stock</h3>
            <p className="text-sm text-gray-600">Groupes à surveiller</p>
          </div>
          <div className="space-y-3">
            {bloodTypeData
              .filter(item => item.stock < item.demand)
              .sort((a, b) => (a.stock / a.demand) - (b.stock / b.demand))
              .map((item) => {
                const percentage = (item.stock / item.demand) * 100;
                const isUrgent = percentage < 50;
                return (
                  <div key={item.type} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm font-semibold">
                          {item.type}
                        </span>
                        {isUrgent && (
                          <span className="text-xs px-2 py-0.5 bg-red-600 text-white rounded-full">
                            URGENT
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-600">
                        {item.stock}/{item.demand}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          isUrgent ? 'bg-red-600' : 'bg-orange-500'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="mb-4">
            <h3 className="text-gray-900">Activité récente</h3>
            <p className="text-sm text-gray-600">Dernières actions</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Droplet className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Nouveau don enregistré</p>
                <p className="text-xs text-gray-600">CHU Sylvanus Olympio - O+</p>
                <p className="text-xs text-gray-500 mt-1">Il y a 5 min</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Nouveau rendez-vous</p>
                <p className="text-xs text-gray-600">Centre de Transfusion - A+</p>
                <p className="text-xs text-gray-500 mt-1">Il y a 12 min</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-4 h-4 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Alerte créée</p>
                <p className="text-xs text-gray-600">CHU Campus - AB-</p>
                <p className="text-xs text-gray-500 mt-1">Il y a 1 heure</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Building2 className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Nouveau centre ajouté</p>
                <p className="text-xs text-gray-600">CHR Atakpamé</p>
                <p className="text-xs text-gray-500 mt-1">Il y a 2 heures</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Table */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="mb-4">
          <h3 className="text-gray-900">Vue d'ensemble des groupes sanguins</h3>
          <p className="text-sm text-gray-600">Statistiques détaillées</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm text-gray-600">Groupe</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Donneurs</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Stock</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Demande</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Taux</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Statut</th>
              </tr>
            </thead>
            <tbody>
              {bloodTypeData.map((item) => {
                const rate = (item.stock / item.demand) * 100;
                const status = rate >= 100 ? 'optimal' : rate >= 70 ? 'bon' : rate >= 50 ? 'moyen' : 'critique';
                const statusColor = rate >= 100 ? 'green' : rate >= 70 ? 'blue' : rate >= 50 ? 'orange' : 'red';
                
                return (
                  <tr key={item.type} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-semibold">
                        {item.type}
                      </span>
                    </td>
                    <td className="text-right py-3 px-4 text-gray-900">{item.donors.toLocaleString()}</td>
                    <td className="text-right py-3 px-4 text-gray-900">{item.stock}</td>
                    <td className="text-right py-3 px-4 text-gray-900">{item.demand}</td>
                    <td className="text-right py-3 px-4 text-gray-900">{rate.toFixed(0)}%</td>
                    <td className="text-right py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs bg-${statusColor}-100 text-${statusColor}-700`}>
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
