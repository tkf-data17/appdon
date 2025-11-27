import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Building2, Phone, Mail, X } from 'lucide-react';

interface Hospital {
  id: number;
  name: string;
  type: 'CHU' | 'CHR' | 'Hôpital' | 'Clinique';
  city: string;
  region: string;
  address: string;
  phone: string;
  email: string;
  director: string;
  beds: number;
  status: 'active' | 'inactive';
  bloodRequests: number;
}

const mockHospitals: Hospital[] = [
  {
    id: 1,
    name: 'CHU Sylvanus Olympio',
    type: 'CHU',
    city: 'Lomé',
    region: 'Maritime',
    address: 'Boulevard du 13 Janvier, Lomé',
    phone: '+228 22 21 25 01',
    email: 'direction@chu-so.tg',
    director: 'Dr. Kokou MENSAH',
    beds: 350,
    status: 'active',
    bloodRequests: 156
  },
  {
    id: 2,
    name: 'CHU Campus',
    type: 'CHU',
    city: 'Lomé',
    region: 'Maritime',
    address: 'Route d\'Aného, Lomé',
    phone: '+228 22 25 58 42',
    email: 'direction@chu-campus.tg',
    director: 'Dr. Afi GBADOE',
    beds: 280,
    status: 'active',
    bloodRequests: 124
  },
  {
    id: 3,
    name: 'CHR Kara',
    type: 'CHR',
    city: 'Kara',
    region: 'Kara',
    address: 'Avenue de la Kozah, Kara',
    phone: '+228 26 60 01 45',
    email: 'direction@chr-kara.tg',
    director: 'Dr. Koffi ASSIH',
    beds: 150,
    status: 'active',
    bloodRequests: 78
  }
];

export function HospitalsManagement() {
  const [hospitals, setHospitals] = useState<Hospital[]>(mockHospitals);
  const [showForm, setShowForm] = useState(false);
  const [editingHospital, setEditingHospital] = useState<Hospital | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('all');

  const [formData, setFormData] = useState({
    name: '',
    type: 'Hôpital' as Hospital['type'],
    city: '',
    region: 'Maritime',
    address: '',
    phone: '',
    email: '',
    director: '',
    beds: 50,
    status: 'active' as Hospital['status']
  });

  const regions = ['Maritime', 'Plateaux', 'Centrale', 'Kara', 'Savanes'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingHospital) {
      setHospitals(hospitals.map(h => 
        h.id === editingHospital.id 
          ? { ...formData, id: h.id, bloodRequests: h.bloodRequests }
          : h
      ));
    } else {
      const newHospital: Hospital = {
        ...formData,
        id: Math.max(...hospitals.map(h => h.id), 0) + 1,
        bloodRequests: 0
      };
      setHospitals([...hospitals, newHospital]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'Hôpital',
      city: '',
      region: 'Maritime',
      address: '',
      phone: '',
      email: '',
      director: '',
      beds: 50,
      status: 'active'
    });
    setEditingHospital(null);
    setShowForm(false);
  };

  const handleEdit = (hospital: Hospital) => {
    setEditingHospital(hospital);
    setFormData({
      name: hospital.name,
      type: hospital.type,
      city: hospital.city,
      region: hospital.region,
      address: hospital.address,
      phone: hospital.phone,
      email: hospital.email,
      director: hospital.director,
      beds: hospital.beds,
      status: hospital.status
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet hôpital ?')) {
      setHospitals(hospitals.filter(h => h.id !== id));
    }
  };

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = filterRegion === 'all' || hospital.region === filterRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Gestion des hôpitaux</h2>
          <p className="text-sm text-gray-600 mt-1">{hospitals.length} hôpitaux enregistrés</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          <Plus className="w-5 h-5" />
          Nouvel hôpital
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un hôpital..."
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

      {/* Hospitals Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm text-gray-600">Établissement</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Type</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Localisation</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Directeur</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Lits</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Demandes</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">Statut</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHospitals.map(hospital => (
                <tr key={hospital.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-gray-900">{hospital.name}</p>
                      <p className="text-sm text-gray-600">{hospital.city}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm">
                      {hospital.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm text-gray-900">{hospital.region}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm text-gray-900">{hospital.director}</p>
                  </td>
                  <td className="text-right py-3 px-4 text-gray-900">{hospital.beds}</td>
                  <td className="text-right py-3 px-4">
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm font-semibold">
                      {hospital.bloodRequests}
                    </span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      hospital.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {hospital.status === 'active' ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(hospital)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                        title="Modifier"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(hospital.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredHospitals.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600">Aucun hôpital trouvé</p>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-gray-900">
                {editingHospital ? 'Modifier l\'hôpital' : 'Nouvel hôpital'}
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
                    Nom de l'établissement <span className="text-red-500">*</span>
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
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as Hospital['type'] })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="CHU">CHU</option>
                    <option value="CHR">CHR</option>
                    <option value="Hôpital">Hôpital</option>
                    <option value="Clinique">Clinique</option>
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

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 mb-2">
                    Directeur <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.director}
                    onChange={(e) => setFormData({ ...formData, director: e.target.value })}
                    placeholder="Dr. Prénom NOM"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Nombre de lits <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.beds}
                    onChange={(e) => setFormData({ ...formData, beds: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Statut <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Hospital['status'] })}
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
                  {editingHospital ? 'Mettre à jour' : 'Créer l\'hôpital'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
