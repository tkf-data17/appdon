import { useState } from 'react';
import { Mail, Lock, User, Phone, MapPin, Droplet, Upload, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface AuthProps {
  onLoginSuccess: (user: any) => void;
}

export function Auth({ onLoginSuccess }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    fullName: '',
    phone: '',
    city: '',
    bloodType: '',
    dateOfBirth: '',
    analysisFile: null as File | null
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (isLogin) {
      if (!formData.email) newErrors.email = 'Email requis';
      else if (!validateEmail(formData.email)) newErrors.email = 'Email invalide';
      if (!formData.password) newErrors.password = 'Mot de passe requis';
      else if (formData.password.length < 6) newErrors.password = 'Minimum 6 caractères';
    } else {
      if (!formData.fullName) newErrors.fullName = 'Nom complet requis';
      if (!formData.email) newErrors.email = 'Email requis';
      else if (!validateEmail(formData.email)) newErrors.email = 'Email invalide';
      if (!formData.password) newErrors.password = 'Mot de passe requis';
      else if (formData.password.length < 6) newErrors.password = 'Minimum 6 caractères';
      if (!formData.passwordConfirm) newErrors.passwordConfirm = 'Confirmation requise';
      else if (formData.password !== formData.passwordConfirm) newErrors.passwordConfirm = 'Les mots de passe ne correspondent pas';
      if (!formData.phone) newErrors.phone = 'Téléphone requis';
      if (!formData.city) newErrors.city = 'Ville requise';
      if (!formData.bloodType) newErrors.bloodType = 'Groupe sanguin requis';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date de naissance requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, analysisFile: 'Fichier trop volumineux (max 5 MB)' }));
        return;
      }
      setFormData(prev => ({
        ...prev,
        analysisFile: file
      }));
      setErrors(prev => ({ ...prev, analysisFile: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin) {
      if (!validateForm()) return;
    } else {
      if (!formData.email || !formData.password) {
        setErrors({ email: 'Email et mot de passe requis' });
        return;
      }
    }

    setLoading(true);

    // Simulation de l'authentification
    setTimeout(() => {
      if (isLogin) {
        const userData = {
          email: formData.email,
          name: 'Utilisateur',
          authenticated: true,
          memberSince: new Date().toISOString(),
          totalDonations: 0
        };
        onLoginSuccess(userData);
      } else {
        const userData = {
          email: formData.email,
          name: formData.fullName,
          phone: formData.phone,
          city: formData.city,
          bloodType: formData.bloodType,
          dateOfBirth: formData.dateOfBirth,
          analysisFile: formData.analysisFile,
          authenticated: true,
          memberSince: new Date().toISOString(),
          totalDonations: 0
        };
        onLoginSuccess(userData);
      }
      setLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex gap-0">
        {/* Left Side - Branding (Desktop only) */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center text-white p-12">
          <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mb-6 border border-white/30">
            <span className="text-6xl">🩸</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-center">Don de Sang Togo</h1>
          <p className="text-xl text-red-100 text-center mb-8">Sauvez des vies en donnant votre sang</p>
          <div className="space-y-4 text-red-100">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-sm">✓</span>
              </div>
              <p>Trouvez les centres de don proches de vous</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-sm">✓</span>
              </div>
              <p>Planifiez vos rendez-vous facilement</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-sm">✓</span>
              </div>
              <p>Suivez vos donations et leur impact</p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-6 text-white">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-3 border border-white/30">
              <span className="text-4xl">🩸</span>
            </div>
            <h1 className="text-2xl font-bold">Don de Sang Togo</h1>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-3 mx-auto w-full max-w-48">
            <form onSubmit={handleSubmit} className="space-y-1.5">
              {/* Login Form */}
              {isLogin ? (
                <>
                  <h2 className="text-lg font-bold text-gray-900 mb-0.5">Connexion</h2>
                  <p className="text-gray-600 text-xs mb-2">Bienvenue ! Connectez-vous à votre compte</p>

                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      className={`w-full px-2 py-1 bg-gray-50 border rounded text-xs transition ${
                        errors.email
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } focus:outline-none focus:bg-white focus:border-red-500`}
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-0.5">{errors.fullName}</p>}
                  </div>

                  {/* City */}
                  <div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Mot de passe"
                        value={formData.password}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        className={`w-full px-2 py-1 bg-gray-50 border rounded text-xs transition ${
                          errors.password
                            ? 'border-red-500'
                            : 'border-gray-300'
                        } focus:outline-none focus:bg-white focus:border-red-500 pr-6`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="w-2.5 h-2.5" /> : <Eye className="w-2.5 h-2.5" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-0.5">{errors.password}</p>}
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 text-white py-2 rounded font-semibold text-sm hover:bg-red-700 transition disabled:bg-gray-400 mt-3"
                  >
                    {loading ? 'Connexion...' : 'Se connecter'}
                  </button>

                  {/* Signup Link */}
                  <p className="text-center text-gray-600 text-xs mt-3">
                    Pas encore de compte ?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setIsLogin(false);
                        setFormData({ email: '', password: '', passwordConfirm: '', fullName: '', phone: '', city: '', bloodType: '', analysisFile: null });
                        setErrors({});
                      }}
                      className="text-red-600 font-semibold hover:underline"
                    >
                      S'inscrire
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-bold text-gray-900 mb-0.5">S'inscrire</h2>
                  <p className="text-gray-600 text-xs mb-2">Créez votre compte en quelques étapes</p>

                  {/* Full Name */}
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Nom complet"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      className={`w-full px-2 py-1 bg-gray-50 border rounded text-xs transition ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:bg-white focus:border-red-500`}
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-0.5">{errors.fullName}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      className={`w-full px-2 py-1 bg-gray-50 border rounded text-xs transition ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:bg-white focus:border-red-500`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-0.5">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Téléphone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      className={`w-full px-2 py-1 bg-gray-50 border rounded text-xs transition ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:bg-white focus:border-red-500`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-0.5">{errors.phone}</p>}
                  </div>

                  {/* City */}
                  <div>
                    <input
                      type="text"
                      name="city"
                      placeholder="Ville"
                      value={formData.city}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      className={`w-full px-2 py-1 bg-gray-50 border rounded text-xs transition ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:bg-white focus:border-red-500`}
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-0.5">{errors.city}</p>}
                  </div>

                  {/* Blood Type */}
                  <div>
                    <select
                      name="bloodType"
                      value={formData.bloodType}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      className={`w-full px-2 py-1 bg-gray-50 border rounded text-xs transition appearance-none ${
                        errors.bloodType ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:bg-white focus:border-red-500`}
                    >
                      <option value="">Groupe sanguin</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                    {errors.bloodType && <p className="text-red-500 text-xs mt-0.5">{errors.bloodType}</p>}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      className={`w-full px-2 py-1 bg-gray-50 border rounded text-xs transition ${
                        errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:bg-white focus:border-red-500`}
                    />
                    {errors.dateOfBirth && <p className="text-red-500 text-xs mt-0.5">{errors.dateOfBirth}</p>}
                  </div>

                  {/* Password */}
                  <div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Mot de passe"
                      value={formData.password}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      className={`w-full px-2 py-1 bg-gray-50 border rounded text-xs transition ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:bg-white focus:border-red-500`}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-0.5">{errors.password}</p>}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <input
                      type={showPasswordConfirm ? 'text' : 'password'}
                      name="passwordConfirm"
                      placeholder="Confirmer le mot de passe"
                      value={formData.passwordConfirm}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      className={`w-full px-2 py-1 bg-gray-50 border rounded text-xs transition ${
                        errors.passwordConfirm ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:bg-white focus:border-red-500`}
                    />
                    {errors.passwordConfirm && <p className="text-red-500 text-xs mt-0.5">{errors.passwordConfirm}</p>}
                  </div>

                  {/* Analysis File Upload - Optional */}
                  <div className="bg-blue-50 border border-blue-200 rounded p-1">
                    <label className="block text-xs font-medium text-blue-900 mb-0.5">
                      Résultat d'analyse (optionnel)
                    </label>
                    <label className="flex items-center justify-center gap-1 p-0.5 border border-dashed border-blue-300 rounded cursor-pointer hover:bg-blue-100 transition">
                      <Upload className="w-2.5 h-2.5 text-blue-600" />
                      <span className="text-xs text-blue-700">
                        {formData.analysisFile ? formData.analysisFile.name : 'Importer'}
                      </span>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*,application/pdf"
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Signup Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 text-white py-1 rounded font-semibold text-xs hover:bg-red-700 transition disabled:bg-gray-400 mt-2"
                  >
                    {loading ? 'Inscription...' : 'S\'inscrire'}
                  </button>

                  {/* Login Link */}
                  <p className="text-center text-gray-600 text-xs mt-2\">
                    Vous avez un compte ?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setIsLogin(true);
                        setFormData({ email: '', password: '', passwordConfirm: '', fullName: '', phone: '', city: '', bloodType: '', analysisFile: null });
                        setErrors({});
                      }}
                      className="text-red-600 font-semibold hover:underline"
                    >
                      Se connecter
                    </button>
                  </p>
                </>
              )}
            </form>
          </div>

          {/* Footer */}
          <p className="text-center text-red-100 text-xs mt-6">
            Votre sécurité est notre priorité 🔒
          </p>
        </div>
      </div>
    </div>
  );
}
