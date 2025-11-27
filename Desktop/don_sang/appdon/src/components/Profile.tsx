import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Droplet, Calendar, Shield, Bell, LogOut, ChevronRight, Edit2, Upload, X } from 'lucide-react';
import { User as UserType } from '../types';

export function Profile({ user, onUserUpdate }: { user?: UserType | null; onUserUpdate?: (updatedUser: UserType) => void }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [analysisFile, setAnalysisFile] = useState<File | null>(user?.analysisFile || null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    city: user?.city || '',
    bloodType: user?.bloodType || '',
    dateOfBirth: user?.dateOfBirth || ''
  });

  // Synchronize editData when user changes
  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        city: user.city || '',
        bloodType: user.bloodType || '',
        dateOfBirth: user.dateOfBirth || ''
      });
    }
  }, [user]);

  // Mock user data with user prop fallback
  const userData = user ? {
    name: user.name || 'Nouvel utilisateur',
    email: user.email || '',
    phone: user.phone || 'Non renseigné',
    bloodType: user.bloodType || 'Non renseigné',
    dateOfBirth: user.dateOfBirth || '2000-01-01',
    city: user.city || 'Non renseigné',
    region: user.city ? 'Région' : 'Non renseigné',
    totalDonations: user.totalDonations || 0,
    nextDonation: new Date(Date.now() + 64 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    memberSince: user.memberSince || new Date().toISOString().split('T')[0]
  } : {
    name: 'Koffi Mensah',
    email: 'koffi.mensah@example.tg',
    phone: '+228 90 12 34 56',
    bloodType: 'O+',
    dateOfBirth: '1995-03-15',
    city: 'Lomé',
    region: 'Maritime',
    totalDonations: 5,
    nextDonation: '2025-12-29',
    memberSince: '2024-01-15'
  };

  const handleSaveEdit = () => {
    if (onUserUpdate && user) {
      const updatedUser: UserType = {
        ...user,
        name: editData.name,
        email: editData.email,
        phone: editData.phone,
        city: editData.city,
        bloodType: editData.bloodType,
        dateOfBirth: editData.dateOfBirth
      };
      onUserUpdate(updatedUser);
    }
    setIsEditing(false);
  };

  const menuItems = [
    {
      icon: User,
      label: 'Informations personnelles',
      description: 'Modifier mon profil',
      action: () => alert('Fonctionnalité à venir')
    },
    {
      icon: Droplet,
      label: 'Mon groupe sanguin',
      description: userData.bloodType,
      action: () => alert('Fonctionnalité à venir')
    },
    {
      icon: Bell,
      label: 'Notifications',
      description: notificationsEnabled ? 'Activées' : 'Désactivées',
      hasToggle: true,
      toggleValue: notificationsEnabled,
      onToggle: setNotificationsEnabled
    },
    {
      icon: MapPin,
      label: 'Localisation',
      description: locationEnabled ? 'Activée' : 'Désactivée',
      hasToggle: true,
      toggleValue: locationEnabled,
      onToggle: setLocationEnabled
    },
    {
      icon: Shield,
      label: 'Confidentialité et sécurité',
      description: 'Gérer mes données',
      action: () => alert('Fonctionnalité à venir')
    }
  ];

  return (
    <div className="p-4 space-y-6 pb-8">
      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Modifier le profil</h3>
              <button
                onClick={() => setIsEditing(false)}
                className="w-8 h-8 hover:bg-gray-100 rounded-full flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input
                  type="tel"
                  value={editData.phone}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                <input
                  type="text"
                  value={editData.city}
                  onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Groupe sanguin</label>
                <select
                  value={editData.bloodType}
                  onChange={(e) => setEditData({ ...editData, bloodType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                >
                  <option value="">Sélectionner</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                <input
                  type="date"
                  value={editData.dateOfBirth}
                  onChange={(e) => setEditData({ ...editData, dateOfBirth: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Header */}
      <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-red-600" />
            </div>
            <div>
              <h2>{userData.name}</h2>
              <p className="text-sm opacity-90">{userData.city}, {userData.region}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm">
                  Groupe {userData.bloodType}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/30 transition"
          >
            <Edit2 className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-white/20">
          <div className="text-center">
            <p className="text-2xl font-bold">{userData.totalDonations}</p>
            <p className="text-xs opacity-90 mt-1">Dons</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{userData.totalDonations * 3}</p>
            <p className="text-xs opacity-90 mt-1">Vies sauvées</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">
              {Math.floor((new Date().getTime() - new Date(userData.memberSince).getTime()) / (1000 * 60 * 60 * 24 * 30))}
            </p>
            <p className="text-xs opacity-90 mt-1">Mois</p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
        <h3 className="text-gray-900 mb-3">Coordonnées</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-gray-900">{userData.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Téléphone</p>
              <p className="text-gray-900">{userData.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Date de naissance</p>
              <p className="text-gray-900">
                {new Date(userData.dateOfBirth).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Next Donation Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-blue-900">Prochain don possible</h3>
            <p className="text-sm text-blue-700">
              {new Date(userData.nextDonation).toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Analysis File Upload Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h3 className="text-blue-900 mb-3 flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Copie de votre résultat d'analyse
        </h3>
        <p className="text-sm text-blue-800 mb-4">
          Ajoutez une copie de votre résultat d'analyse sanguine pour confirmer votre groupe sanguin (optionnel).
        </p>
        <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:bg-blue-100 transition">
          <Upload className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-blue-700 font-medium">
            {analysisFile ? analysisFile.name : 'Cliquez pour importer (max 5 MB)'}
          </span>
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                if (file.size > 5 * 1024 * 1024) {
                  alert('Fichier trop volumineux (max 5 MB)');
                  return;
                }
                setAnalysisFile(file);
              }
            }}
            accept="image/*,application/pdf"
            className="hidden"
          />
        </label>
        {analysisFile && (
          <div className="mt-3 p-3 bg-white rounded border border-blue-300">
            <p className="text-sm text-gray-700">
              ✓ <strong>{analysisFile.name}</strong> - {(analysisFile.size / 1024).toFixed(2)} KB
            </p>
            <button
              onClick={() => setAnalysisFile(null)}
              className="text-sm text-red-600 hover:underline mt-2"
            >
              Supprimer le fichier
            </button>
          </div>
        )}
      </div>

      {/* Settings Menu */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <h3 className="text-gray-900 px-4 pt-4 pb-3">Paramètres</h3>
        <div className="divide-y divide-gray-200">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition text-left"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">{item.label}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
              {item.hasToggle ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    item.onToggle?.(!item.toggleValue);
                  }}
                  className={`relative w-14 h-7 rounded-full transition ${
                    item.toggleValue ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-5 h-5 bg-white rounded-full transition transform ${
                      item.toggleValue ? 'translate-x-8' : 'translate-x-1'
                    }`}
                  />
                </button>
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
        <h3 className="text-gray-900 mb-3">À propos</h3>
        <div className="space-y-2">
          <button className="w-full text-left py-2 text-gray-700 hover:text-red-600 transition">
            Conditions d'utilisation
          </button>
          <button className="w-full text-left py-2 text-gray-700 hover:text-red-600 transition">
            Politique de confidentialité
          </button>
          <button className="w-full text-left py-2 text-gray-700 hover:text-red-600 transition">
            Aide et support
          </button>
          <div className="pt-2">
            <p className="text-sm text-gray-600">Version 1.0.0</p>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <button className="w-full bg-red-50 border border-red-200 text-red-600 py-3 rounded-xl hover:bg-red-100 transition flex items-center justify-center gap-2">
        <LogOut className="w-5 h-5" />
        Se déconnecter
      </button>

      {/* Footer Info */}
      <div className="text-center pt-4">
        <p className="text-sm text-gray-600">
          Membre depuis {new Date(userData.memberSince).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Don de Sang Togo • Sauvez des vies
        </p>
      </div>
    </div>
  );
}
