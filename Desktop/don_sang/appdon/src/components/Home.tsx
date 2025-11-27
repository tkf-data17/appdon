import { MapPin, Calendar, AlertCircle, Info, Heart, Users, ChevronRight } from 'lucide-react';

type Page = 'home' | 'centers' | 'appointments' | 'alerts' | 'history' | 'eligibility' | 'profile' | 'education';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="p-4 space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="w-12 h-12" />
          <div>
            <h2>Donnez votre sang</h2>
            <p className="text-sm opacity-90">Sauvez jusqu'à 3 vies par don</p>
          </div>
        </div>
        <div className="bg-white/20 backdrop-blur rounded-xl p-4 mt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-90 mb-1">Votre groupe sanguin</p>
              <p className="text-2xl font-bold">O+</p>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-90 mb-1">Prochain don possible</p>
              <p className="font-semibold">Dans 45 jours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="mb-3 text-gray-900">Actions rapides</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onNavigate('centers')}
            className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition text-left border border-gray-100"
          >
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
              <MapPin className="w-6 h-6 text-red-600" />
            </div>
            <p className="font-semibold text-gray-900">Trouver un centre</p>
            <p className="text-sm text-gray-600 mt-1">Près de vous</p>
          </button>

          <button
            onClick={() => onNavigate('appointments')}
            className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition text-left border border-gray-100"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <p className="font-semibold text-gray-900">Prendre RDV</p>
            <p className="text-sm text-gray-600 mt-1">Planifier un don</p>
          </button>

          <button
            onClick={() => onNavigate('alerts')}
            className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition text-left border border-gray-100 relative"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <p className="font-semibold text-gray-900">Alertes urgentes</p>
            <p className="text-sm text-gray-600 mt-1">3 alertes actives</p>
            <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          <button
            onClick={() => onNavigate('eligibility')}
            className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition text-left border border-gray-100"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <Info className="w-6 h-6 text-green-600" />
            </div>
            <p className="font-semibold text-gray-900">Éligibilité</p>
            <p className="text-sm text-gray-600 mt-1">Puis-je donner ?</p>
          </button>
        </div>
      </div>

      {/* Educational Banner */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="text-3xl">📚</div>
          <div>
            <h3>Découvrez le don de sang</h3>
            <p className="text-sm opacity-90">Mythes, réalités et processus expliqués</p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('education')}
          className="w-full bg-white text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition flex items-center justify-center gap-2"
        >
          En savoir plus
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-red-600" />
          <h3 className="text-gray-900">Impact au Togo</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">12,847</p>
            <p className="text-xs text-gray-600 mt-1">Donneurs actifs</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">2,341</p>
            <p className="text-xs text-gray-600 mt-1">Dons ce mois</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">7,023</p>
            <p className="text-xs text-gray-600 mt-1">Vies sauvées</p>
          </div>
        </div>
      </div>

      {/* Urgent Need Banner */}
      <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-orange-900">Besoin urgent à Lomé</p>
            <p className="text-sm text-orange-800 mt-1">
              Le CHU Sylvanus Olympio recherche activement des donneurs de groupe <span className="font-semibold">O-</span> et <span className="font-semibold">AB-</span>
            </p>
            <button
              onClick={() => onNavigate('alerts')}
              className="mt-3 bg-orange-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-700 transition"
            >
              Voir les détails
            </button>
          </div>
        </div>
      </div>

      {/* Educational Tips */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
        <h3 className="text-blue-900 mb-2">💡 Le saviez-vous ?</h3>
        <p className="text-sm text-blue-800">
          Un don de sang peut sauver jusqu'à 3 vies. Le sang ne peut pas être fabriqué artificiellement, votre don est irremplaçable.
        </p>
      </div>
    </div>
  );
}