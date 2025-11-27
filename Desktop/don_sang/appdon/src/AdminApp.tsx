import { useState } from 'react';
import { Dashboard } from './components/admin/Dashboard';
import { CentersManagement } from './components/admin/CentersManagement';
import { HospitalsManagement } from './components/admin/HospitalsManagement';
import { DonorsManagement } from './components/admin/DonorsManagement';
import { AlertsManagement } from './components/admin/AlertsManagement';
import { Reports } from './components/admin/Reports';
import { 
  LayoutDashboard, 
  MapPin, 
  Building2, 
  Users, 
  AlertCircle, 
  FileText,
  LogOut,
  Menu,
  X
} from 'lucide-react';

type Page = 'dashboard' | 'centers' | 'hospitals' | 'donors' | 'alerts' | 'reports';

export default function AdminApp() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'centers', label: 'Centres de collecte', icon: MapPin },
    { id: 'hospitals', label: 'Hôpitaux', icon: Building2 },
    { id: 'donors', label: 'Donneurs', icon: Users },
    { id: 'alerts', label: 'Alertes', icon: AlertCircle },
    { id: 'reports', label: 'Rapports', icon: FileText },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'centers':
        return <CentersManagement />;
      case 'hospitals':
        return <HospitalsManagement />;
      case 'donors':
        return <DonorsManagement />;
      case 'alerts':
        return <AlertsManagement />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
            {sidebarOpen ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                    <span className="text-white">🩸</span>
                  </div>
                  <div>
                    <h1 className="font-bold text-gray-900">Admin</h1>
                    <p className="text-xs text-gray-600">Don de Sang Togo</p>
                  </div>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1 hover:bg-gray-100 rounded mx-auto"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-2 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id as Page)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition ${
                    isActive
                      ? 'bg-red-50 text-red-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* User */}
          <div className="border-t border-gray-200 p-4">
            <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center'}`}>
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white">
                <span>A</span>
              </div>
              {sidebarOpen && (
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-600">admin@togo.tg</p>
                </div>
              )}
            </div>
            {sidebarOpen && (
              <button className="w-full mt-3 flex items-center gap-2 text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition">
                <LogOut className="w-4 h-4" />
                <span>Déconnexion</span>
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div>
            <h2 className="text-gray-900">
              {menuItems.find(item => item.id === currentPage)?.label}
            </h2>
            <p className="text-sm text-gray-600">
              {new Date().toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              Nouvelle alerte
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
