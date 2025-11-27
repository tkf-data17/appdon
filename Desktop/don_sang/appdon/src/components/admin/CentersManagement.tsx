import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, MapPin, Phone, Clock, X } from 'lucide-react';

interface Center {
  id: number;
  name: string;
  type: 'CHU' | 'CHR' | 'Centre' | 'Mobile';
  city: string;
  region: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  capacity: number;
  status: 'active' | 'inactive';
  totalDonations: number;
}

const mockCenters: Center[] = [
  {
    id: 1,
    name: 'CHU Sylvanus Olympio',
    type: 'CHU',
    city: 'Lomé',
    region: 'Maritime',
    address: 'Boulevard du 13 Janvier, Lomé',
    phone: '+228 22 21 25 01',
    email: 'contact@chu-so.tg',
    hours: 'Lun-Ven: 8h-17h, Sam: 8h-12h',
    capacity: 50,
    status: 'active',
    totalDonations: 1247
  },
  {
    id: 2,
    name: 'CHU Campus',
    type: 'CHU',
    city: 'Lomé',
    region: 'Maritime',
    address: 'Route d\'Aného, Lomé',
    phone: '+228 22 25 58 42',
    email: 'contact@chu-campus.tg',
    hours: 'Lun-Sam: 7h30-18h',
    capacity: 40,
    status: 'active',
    totalDonations: 982
  },
  {
    id: 3,
    name: 'CHR Kara',
    type: 'CHR',
    city: 'Kara',
    region: 'Kara',
    address: 'Avenue de la Kozah, Kara',
    phone: '+228 26 60 01 45',
    email: 'contact@chr-kara.tg',
    hours: 'Lun-Ven: 8h-16h',
    capacity: 30,
    status: 'active',
    totalDonations: 654
  }
];

export function CentersManagement() {
  const [centers, setCenters] = useState<Center[]>(mockCenters);
  const [showForm, setShowForm] = useState(false);
  const [editingCenter, setEditingCenter] = useState<Center | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('all');

  const [formData, setFormData] = useState({
    name: '',
    type: 'Centre' as Center['type'],
    city: '',
    region: 'Maritime',
    address: '',
    phone: '',
    email: '',
    hours: '',
    capacity: 20,
    status: 'active' as Center['status']
  });

  const regions = ['Maritime', 'Plateaux', 'Centrale', 'Kara', 'Savanes'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCenter) {
      // Update existing center
      setCenters(centers.map(c => 
        c.id === editingCenter.id 
          ? { ...formData, id: c.id, totalDonations: c.totalDonations }
          : c
      ));
    } else {
      // Add new center
      const newCenter: Center = {
        ...formData,
        id: Math.max(...centers.map(c => c.id), 0) + 1,
        totalDonations: 0
      };
      setCenters([...centers, newCenter]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'Centre',
      city: '',
      region: 'Maritime',
      address: '',
      phone: '',
      email: '',
      hours: '',
      capacity: 20,
      status: 'active'
    });
    setEditingCenter(null);
    setShowForm(false);
  };

  const handleEdit = (center: Center) => {
    setEditingCenter(center);
    setFormData({
      name: center.name,
      type: center.type,
      city: center.city,
      region: center.region,
      address: center.address,
      phone: center.phone,
      email: center.email,
      hours: center.hours,
      capacity: center.capacity,
      status: center.status
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce centre ?')) {
      setCenters(centers.filter(c => c.id !== id));
    }
  };

  const filteredCenters = centers.filter(center => {
    const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = filterRegion === 'all' || center.region === filterRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Gestion des centres de collecte</h2>
          <p className="text-sm text-gray-600 mt-1">{centers.length} centres enregistrés</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          <Plus className="w-5 h-5" />
          Nouveau centre
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un centre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <select
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">Toutes les régions</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Centers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCenters.map(center => (
          <div key={center.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-gray-900">{center.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    center.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {center.status === 'active' ? 'Actif' : 'Inactif'}
                  </span>
                </div>
                <span className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded">
                  {center.type}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{center.city}, {center.region}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{center.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{center.hours}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4 pt-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-600">Capacité</p>
                <p className="text-lg font-bold text-gray-900">{center.capacity}/jour</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Total dons</p>
                <p className="text-lg font-bold text-red-600">{center.totalDonations}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(center)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                <Edit2 className="w-4 h-4" />
                Modifier
              </button>
              <button
                onClick={() => handleDelete(center.id)}
                className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCenters.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600">Aucun centre trouvé</p>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-gray-900">
                {editingCenter ? 'Modifier le centre' : 'Nouveau centre de collecte'}
              </h3>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 mb-2">
                    Nom du centre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as Center['type'] })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="CHU">CHU</option>
                    <option value="CHR">CHR</option>
                    <option value="Centre">Centre</option>
                    <option value="Mobile">Mobile</option>
                  </select>
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
                    Adresse <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+228 XX XX XX XX"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Horaires <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.hours}
                    onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                    placeholder="Lun-Ven: 8h-17h"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Capacité journalière <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Statut <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Center['status'] })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                  </select>
                </div>
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
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  {editingCenter ? 'Mettre à jour' : 'Créer le centre'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
