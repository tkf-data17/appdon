import { useState } from 'react';
import { Search, Users, Download, Filter } from 'lucide-react';

interface Donor {
  id: number;
  name: string;
  bloodType: string;
  phone: string;
  email: string;
  city: string;
  region: string;
  totalDonations: number;
  lastDonation: string;
  nextEligible: string;
  status: 'eligible' | 'waiting' | 'suspended';
}

const mockDonors: Donor[] = [
  {
    id: 1,
    name: 'Koffi MENSAH',
    bloodType: 'O+',
    phone: '+228 90 12 34 56',
    email: 'koffi.mensah@example.tg',
    city: 'Lomé',
    region: 'Maritime',
    totalDonations: 5,
    lastDonation: '2025-10-15',
    nextEligible: '2026-01-13',
    status: 'waiting'
  },
  {
    id: 2,
    name: 'Afi GBADOE',
    bloodType: 'A+',
    phone: '+228 91 23 45 67',
    email: 'afi.gbadoe@example.tg',
    city: 'Lomé',
    region: 'Maritime',
    totalDonations: 12,
    lastDonation: '2025-08-20',
    nextEligible: '2025-11-18',
    status: 'eligible'
  },
  {
    id: 3,
    name: 'Kokou ASSIH',
    bloodType: 'B-',
    phone: '+228 92 34 56 78',
    email: 'kokou.assih@example.tg',
    city: 'Kara',
    region: 'Kara',
    totalDonations: 8,
    lastDonation: '2025-09-10',
    nextEligible: '2025-12-08',
    status: 'waiting'
  },
  {
    id: 4,
    name: 'Akossiwa DOGBE',
    bloodType: 'AB+',
    phone: '+228 93 45 67 89',
    email: 'akossiwa.dogbe@example.tg',
    city: 'Sokodé',
    region: 'Centrale',
    totalDonations: 3,
    lastDonation: '2025-07-05',
    nextEligible: '2025-10-03',
    status: 'eligible'
  },
  {
    id: 5,
    name: 'Edem KPAKPO',
    bloodType: 'O-',
    phone: '+228 94 56 78 90',
    email: 'edem.kpakpo@example.tg',
    city: 'Lomé',
    region: 'Maritime',
    totalDonations: 15,
    lastDonation: '2025-09-25',
    nextEligible: '2025-12-23',
    status: 'waiting'
  }
];

export function DonorsManagement() {
  const [donors] = useState<Donor[]>(mockDonors);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBloodType, setFilterBloodType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRegion, setFilterRegion] = useState('all');

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const regions = ['Maritime', 'Plateaux', 'Centrale', 'Kara', 'Savanes'];

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.phone.includes(searchTerm);
    const matchesBloodType = filterBloodType === 'all' || donor.bloodType === filterBloodType;
    const matchesStatus = filterStatus === 'all' || donor.status === filterStatus;
    const matchesRegion = filterRegion === 'all' || donor.region === filterRegion;
    return matchesSearch && matchesBloodType && matchesStatus && matchesRegion;
  });

  const eligibleDonors = donors.filter(d => d.status === 'eligible').length;
  const waitingDonors = donors.filter(d => d.status === 'waiting').length;
  const totalDonations = donors.reduce((sum, d) => sum + d.totalDonations, 0);

  const getStatusBadge = (status: Donor['status']) => {
    switch (status) {
      case 'eligible':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Éligible</span>;
      case 'waiting':
        return <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">En attente</span>;
      case 'suspended':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">Suspendu</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total donneurs</p>
          <p className="text-3xl font-bold text-gray-900">{donors.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Éligibles maintenant</p>
          <p className="text-3xl font-bold text-green-600">{eligibleDonors}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">En attente</p>
          <p className="text-3xl font-bold text-orange-600">{waitingDonors}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total dons</p>
          <p className="text-3xl font-bold text-red-600">{totalDonations}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un donneur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          
          <select
            value={filterBloodType}
            onChange={(e) => setFilterBloodType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">Tous les groupes</option>
            {bloodTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="eligible">Éligible</option>
            <option value="waiting">En attente</option>
            <option value="suspended">Suspendu</option>
          </select>

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

      {/* Export Button */}
      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
          <Download className="w-5 h-5" />
          Exporter la liste
        </button>
      </div>

      {/* Donors Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm text-gray-600">Donneur</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">Groupe</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Contact</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Localisation</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">Dons</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Dernier don</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Prochain don</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">Statut</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonors.map(donor => {
                const daysUntilEligible = Math.ceil(
                  (new Date(donor.nextEligible).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                );
                
                return (
                  <tr key={donor.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-gray-900">{donor.name}</p>
                        <p className="text-xs text-gray-600">ID: {donor.id}</p>
                      </div>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-semibold">
                        {donor.bloodType}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <p className="text-gray-900">{donor.phone}</p>
                        <p className="text-gray-600">{donor.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <p className="text-gray-900">{donor.city}</p>
                        <p className="text-gray-600">{donor.region}</p>
                      </div>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className="text-lg font-bold text-red-600">{donor.totalDonations}</span>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm text-gray-900">
                        {new Date(donor.lastDonation).toLocaleDateString('fr-FR')}
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <p className="text-gray-900">
                          {new Date(donor.nextEligible).toLocaleDateString('fr-FR')}
                        </p>
                        {daysUntilEligible > 0 && (
                          <p className="text-gray-600">Dans {daysUntilEligible} jours</p>
                        )}
                      </div>
                    </td>
                    <td className="text-center py-3 px-4">
                      {getStatusBadge(donor.status)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredDonors.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600">Aucun donneur trouvé</p>
        </div>
      )}

      {/* Pagination */}
      {filteredDonors.length > 0 && (
        <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">
            Affichage de {filteredDonors.length} donneur{filteredDonors.length > 1 ? 's' : ''}
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              Précédent
            </button>
            <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              Suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
