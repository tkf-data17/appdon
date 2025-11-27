import { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { Centers } from './components/Centers';
import { Appointments } from './components/Appointments';
import { Alerts } from './components/Alerts';
import { History } from './components/History';
import { Eligibility } from './components/Eligibility';
import { Profile } from './components/Profile';
import { Education } from './components/Education';
import { Home as HomeIcon, MapPin, Calendar, AlertCircle, Clock, Info, User, BookOpen } from 'lucide-react';
import { Appointment } from './types';
import { supabase } from './supabaseClient'; // Import Supabase client

const mockAppointments: Appointment[] = [
  {
    id: 1,
    center: 'CHU Sylvanus Olympio',
    date: '2025-12-02',
    time: '10:00',
    address: 'Boulevard du 13 Janvier, Lomé',
    status: 'confirmed'
  },
  {
    id: 2,
    center: 'Centre de Transfusion Sanguine',
    date: '2025-10-15',
    time: '14:30',
    address: 'Rue du Commerce, Lomé',
    status: 'completed'
  }
];

type Page = 'home' | 'centers' | 'appointments' | 'alerts' | 'history' | 'eligibility' | 'profile' | 'education';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);

  // --- SUPABASE EXAMPLE: Fetching data ---
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getCountries() {
      try {
        setLoading(true);
        const { data, error } = await supabase.from('countries').select();
        if (error) {
          throw error;
        }
        setCountries(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getCountries();
  }, []);
  // --- END SUPABASE EXAMPLE ---

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'centers':
        return <Centers />;
      case 'appointments':
        return <Appointments appointments={appointments} setAppointments={setAppointments} />;
      case 'alerts':
        return <Alerts />;
      case 'history':
        return <History appointments={appointments} onNavigate={setCurrentPage} />;
      case 'eligibility':
        return <Eligibility />;
      case 'profile':
        return <Profile />;
      case 'education':
        return <Education />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-red-600 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-red-600 text-xl">🩸</span>
              </div>
              <div>
                <h1 className="font-bold">Don de Sang Togo</h1>
                <p className="text-xs opacity-90">Sauvez des vies</p>
              </div>
            </div>
            <button
              onClick={() => setCurrentPage('profile')}
              className="w-10 h-10 bg-red-700 rounded-full flex items-center justify-center hover:bg-red-800 transition"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {/* Supabase Data Display Example */}
        <div className="p-4 bg-white shadow-md rounded-lg mt-4">
          <h2 className="text-xl font-semibold mb-2">Supabase Data Example (Countries)</h2>
          {loading && <p>Loading countries...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {!loading && !error && (
            <ul>
              {countries.length > 0 ? (
                countries.map((country) => (
                  <li key={country.id}>{country.name}</li>
                ))
              ) : (
                <p>No countries found or table 'countries' does not exist.</p>
              )}
            </ul>
          )}
        </div>
        {/* End Supabase Data Display Example */}

        {renderPage()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-2">
          <div className="grid grid-cols-6 gap-1">
            <button
              onClick={() => setCurrentPage('home')}
              className={`flex flex-col items-center py-2 px-1 transition ${
                currentPage === 'home' ? 'text-red-600' : 'text-gray-600'
              }`}
            >
              <HomeIcon className="w-6 h-6 mb-1" />
              <span className="text-xs">Accueil</span>
            </button>
            <button
              onClick={() => setCurrentPage('centers')}
              className={`flex flex-col items-center py-2 px-1 transition ${
                currentPage === 'centers' ? 'text-red-600' : 'text-gray-600'
              }`}
            >
              <MapPin className="w-6 h-6 mb-1" />
              <span className="text-xs">Centres</span>
            </button>
            <button
              onClick={() => setCurrentPage('appointments')}
              className={`flex flex-col items-center py-2 px-1 transition ${
                currentPage === 'appointments' ? 'text-red-600' : 'text-gray-600'
              }`}
            >
              <Calendar className="w-6 h-6 mb-1" />
              <span className="text-xs">RDV</span>
            </button>
            <button
              onClick={() => setCurrentPage('alerts')}
              className={`flex flex-col items-center py-2 px-1 transition relative ${
                currentPage === 'alerts' ? 'text-red-600' : 'text-gray-600'
              }`}
            >
              <AlertCircle className="w-6 h-6 mb-1" />
              <span className="text-xs">Alertes</span>
              <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={() => setCurrentPage('education')}
              className={`flex flex-col items-center py-2 px-1 transition ${
                currentPage === 'education' ? 'text-red-600' : 'text-gray-600'
              }`}
            >
              <BookOpen className="w-6 h-6 mb-1" />
              <span className="text-xs">Infos</span>
            </button>
            <button
              onClick={() => setCurrentPage('history')}
              className={`flex flex-col items-center py-2 px-1 transition ${
                currentPage === 'history' ? 'text-red-600' : 'text-gray-600'
              }`}
            >
              <Clock className="w-6 h-6 mb-1" />
              <span className="text-xs">Hist.</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}