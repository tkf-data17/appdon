import { Calendar, Droplet, Award, TrendingUp, Download } from 'lucide-react';
import { Appointment, Donation } from '../types';

type Page = 'home' | 'centers' | 'appointments' | 'alerts' | 'history' | 'eligibility' | 'profile' | 'education';

interface HistoryProps {
  appointments: Appointment[];
  onNavigate: (page: Page) => void;
}

export function History({ appointments, onNavigate }: HistoryProps) {
  // Convert all appointments into a unified history item format
  const historyItems: Donation[] = appointments
    .map(apt => {
      // For completed appointments, treat as a completed donation
      if (apt.status === 'completed') {
        return {
          id: apt.id,
          date: apt.date,
          center: apt.center,
          city: apt.address.split(',')[1]?.trim() || 'Inconnu',
          bloodType: 'O+', // Placeholder, as blood type is not in Appointment
          volume: 450, // Placeholder
          status: 'completed' as const,
        };
      } else {
        // For confirmed or pending appointments, treat as a scheduled donation
        return {
          id: apt.id,
          date: apt.date,
          center: apt.center,
          city: apt.address.split(',')[1]?.trim() || 'Inconnu',
          bloodType: 'N/A', // Not relevant for scheduled
          volume: 0, // Not relevant for scheduled
          status: 'scheduled' as const,
        };
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const completedDonations = historyItems.filter(item => item.status === 'completed');
  const scheduledDonations = historyItems.filter(item => item.status === 'scheduled');

  const totalDonations = completedDonations.length;
  const totalVolume = completedDonations.reduce((sum, d) => sum + d.volume, 0);
  const livesSaved = totalDonations * 3; // 1 don = 3 vies
  
  // Calculate next possible donation date (90 days after last completed donation)
  const lastCompletedDonation = completedDonations[0]; // Assuming sorted by date descending
  const nextPossibleDate = lastCompletedDonation 
    ? new Date(new Date(lastCompletedDonation.date).getTime() + 90 * 24 * 60 * 60 * 1000)
    : new Date();
  
  const daysUntilNext = Math.ceil((nextPossibleDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const canDonateNow = daysUntilNext <= 0;

  // Group history items by year
  const historyByYear: { [key: string]: Donation[] } = {};
  historyItems.forEach(item => {
    const year = new Date(item.date).getFullYear().toString();
    if (!historyByYear[year]) {
      historyByYear[year] = [];
    }
    historyByYear[year].push(item);
  });

  const getStatusBadge = (status: Donation['status']) => {
    switch (status) {
      case 'completed':
        return <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 border border-red-200">Complété</span>;
      case 'scheduled':
        return <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200">Prévu</span>;
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-gray-900">Mon historique</h2>
        <p className="text-sm text-gray-600 mt-1">Suivez vos dons et votre impact</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 text-white shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Droplet className="w-5 h-5" />
            <p className="text-sm opacity-90">Dons effectués</p>
          </div>
          <p className="text-3xl font-bold">{totalDonations}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5" />
            <p className="text-sm opacity-90">Vies sauvées</p>
          </div>
          <p className="text-3xl font-bold">{livesSaved}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Droplet className="w-5 h-5" />
            <p className="text-sm opacity-90">Volume total</p>
          </div>
          <p className="text-3xl font-bold">{(totalVolume / 1000).toFixed(1)}L</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5" />
            <p className="text-sm opacity-90">Niveau</p>
          </div>
          <p className="text-3xl font-bold">
            {totalDonations >= 10 ? 'Gold' : totalDonations >= 5 ? 'Silver' : 'Bronze'}
          </p>
        </div>
      </div>

      {/* Next Donation Card */}
      <div className={`rounded-xl p-4 shadow-md border-2 ${
        canDonateNow 
          ? 'bg-green-50 border-green-300' 
          : 'bg-blue-50 border-blue-300'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            canDonateNow ? 'bg-green-600' : 'bg-blue-600'
          }`}>
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className={canDonateNow ? 'text-green-900' : 'text-blue-900'}>
              {canDonateNow ? 'Vous pouvez donner !' : 'Prochain don possible'}
            </h3>
            <p className={`text-sm ${canDonateNow ? 'text-green-700' : 'text-blue-700'}`}>
              {canDonateNow 
                ? 'Vous êtes éligible pour faire un don maintenant'
                : `Dans ${daysUntilNext} jours (${nextPossibleDate.toLocaleDateString('fr-FR')})`
              }
            </p>
          </div>
        </div>
        {canDonateNow && (
          <button 
            onClick={() => onNavigate('appointments')}
            className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Prendre rendez-vous
          </button>
        )}
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
        <h3 className="text-gray-900 mb-3">🏆 Badges obtenus</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className={`text-center p-3 rounded-lg ${
            totalDonations >= 1 ? 'bg-yellow-50 border-2 border-yellow-400' : 'bg-gray-50 border border-gray-200 opacity-50'
          }`}>
            <div className="text-3xl mb-1">🩸</div>
            <p className="text-xs text-gray-700">Premier don</p>
          </div>
          <div className={`text-center p-3 rounded-lg ${
            totalDonations >= 5 ? 'bg-yellow-50 border-2 border-yellow-400' : 'bg-gray-50 border border-gray-200 opacity-50'
          }`}>
            <div className="text-3xl mb-1">⭐</div>
            <p className="text-xs text-gray-700">5 dons</p>
          </div>
          <div className={`text-center p-3 rounded-lg ${
            totalDonations >= 10 ? 'bg-yellow-50 border-2 border-yellow-400' : 'bg-gray-50 border border-gray-200 opacity-50'
          }`}>
            <div className="text-3xl mb-1">🏅</div>
            <p className="text-xs text-gray-700">10 dons</p>
          </div>
        </div>
      </div>

      {/* Export Button */}
      <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2">
        <Download className="w-5 h-5" />
        Télécharger mon historique
      </button>

      {/* History Timeline */}
      <div>
        <h3 className="text-gray-900 mb-3">Historique détaillé</h3>
        {Object.keys(historyByYear).sort((a, b) => parseInt(b) - parseInt(a)).map(year => (
          <div key={year} className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <h4 className="text-gray-700">{year}</h4>
              <span className="text-sm text-gray-500">
                ({historyByYear[year].length} élément{historyByYear[year].length > 1 ? 's' : ''})
              </span>
            </div>
            <div className="space-y-3">
              {historyByYear[year].sort((a, b) => 
                new Date(b.date).getTime() - new Date(a.date).getTime()
              ).map((item, index) => (
                <div key={item.id} className="flex gap-3">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.status === 'completed'
                        ? 'bg-red-600'
                        : 'bg-blue-600' // Different color for scheduled
                    }`}>
                      <Droplet className={`w-5 h-5 text-white`} />
                    </div>
                    {index < historyByYear[year].length - 1 && (
                      <div className="w-0.5 h-12 bg-gray-200" />
                    )}
                  </div>

                  {/* History Item Card */}
                  <div className="flex-1 bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-gray-900">{item.center}</h4>
                        <p className="text-sm text-gray-600">{item.city}</p>
                      </div>
                      {getStatusBadge(item.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(item.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long'
                        })}</span>
                      </div>
                      {item.status === 'completed' && (
                        <div className="flex items-center gap-1">
                          <Droplet className="w-4 h-4" />
                          <span>{item.volume}ml</span>
                        </div>
                      )}
                      {item.status === 'scheduled' && (
                        <span className="text-sm text-gray-500">Rendez-vous</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {historyItems.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Droplet className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 mb-2">Aucun historique disponible</h3>
          <p className="text-sm text-gray-600 mb-4">
            Prenez votre premier rendez-vous pour commencer votre historique.
          </p>
          <button 
            onClick={() => onNavigate('appointments')}
            className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition"
          >
            Prendre mon premier RDV
          </button>
        </div>
      )}
    </div>
  );
}