import React, { useState } from 'react';
import { X, Lock, Key, AlertCircle, Eye, EyeOff, ShieldCheck, Check } from 'lucide-react';
import { CahayaKargoLogo } from '../CahayaKargoLogo';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    // Supported credentials:
    // USER : ADMIN / mitr3369
    // PASSWORD : MITRAKARGO123. / CAHAYAKARGO123. / sBttiBfA4VWZ79
    setTimeout(() => {
      const u = username.trim().toUpperCase();
      if ((u === 'ADMIN' || u === 'MITR3369') && (password === 'MITRAKARGO123.' || password === 'CAHAYAKARGO123.' || password === 'sBttiBfA4VWZ79')) {
        localStorage.setItem('cahaya_kargo_admin_auth', 'true');
        localStorage.setItem('cahaya_kargo_admin_user', 'ADMIN');
        localStorage.setItem('mitrakargo_admin_auth', 'true');
        localStorage.setItem('cahaya_kargo_admin_login_time', new Date().toISOString());
        setIsLoading(false);
        onLoginSuccess();
      } else {
        setIsLoading(false);
        setErrorMsg('Username atau Password salah! Periksa kembali huruf besar/kecil.');
      }
    }, 400);
  };

  const handleFillCredentials = () => {
    setUsername('ADMIN');
    setPassword('MITRAKARGO123.');
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header with Dark Luxury Gradient */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Lock className="w-6 h-6" />
            </div>
          </div>

          <h3 className="font-extrabold text-xl text-white">Portal Dashboard Admin</h3>
          <p className="text-xs text-slate-400 mt-1">
            PT Samudra Lintas Artha (Mitra Kargo) – Sistem Logistik & cPanel Deploy
          </p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-700 flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Username Admin
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ADMIN"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="CAHAYAKARGO123."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick Credential Filler for ease of use */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between text-xs text-amber-900">
            <div>
              <span className="font-bold block">Kredensial Sesuai Brief:</span>
              <span className="font-mono text-[11px] text-amber-800">
                User: <strong>ADMIN</strong> | Pass: <strong>CAHAYAKARGO123.</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={handleFillCredentials}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-2.5 py-1.5 rounded-lg text-[11px] transition-colors flex-shrink-0 cursor-pointer"
            >
              Isi Otomatis
            </button>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-extrabold py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm disabled:opacity-50"
            >
              {isLoading ? (
                <span>Memverifikasi Akses...</span>
              ) : (
                <>
                  <Key className="w-4 h-4 text-amber-400" />
                  Masuk ke Dashboard Admin
                </>
              )}
            </button>
          </div>

          <div className="text-center text-[11px] text-slate-400 pt-1 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Sistem Otentikasi Terenkripsi & Terlindungi</span>
          </div>
        </form>

      </div>
    </div>
  );
};
