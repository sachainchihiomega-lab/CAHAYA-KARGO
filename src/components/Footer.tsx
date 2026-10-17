import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  MessageSquare, 
  Truck, 
  Lock
} from 'lucide-react';
import { CahayaKargoLogo } from './CahayaKargoLogo';
import { CompanyProfile } from '../types';

interface FooterProps {
  companyProfile: CompanyProfile;
  onOpenAdminModal: () => void;
  isAdminLoggedIn: boolean;
  onGoToAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  companyProfile,
  onOpenAdminModal,
  isAdminLoggedIn,
  onGoToAdmin,
}) => {
  return (
    <footer id="kontak" className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <CahayaKargoLogo variant="white" customLogoUrl={companyProfile.logoUrl} />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              PT Cahaya Kargo Indonesia merupakan penyedia jasa transportasi pengiriman barang kargo darat, laut, udara, sewa armada truk dan jasa pindahan dengan jaringan terluas ke 38 provinsi di Indonesia.
            </p>

            <div className="space-y-2 text-xs pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>{companyProfile.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Hotline: {companyProfile.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Email: {companyProfile.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>{companyProfile.operatingHours}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Layanan Utama</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Kargo Darat (Trucking Door-to-Door)</a></li>
              <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Kargo Laut (Kapal Roro & Kontainer FCL/LCL)</a></li>
              <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Kargo Udara (Air Freight Express)</a></li>
              <li><a href="#armada" className="hover:text-amber-400 transition-colors">Sewa Truk CDD, Fuso & Tronton Wingbox</a></li>
              <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Jasa Pindahan Rumah & Kantor</a></li>
              <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Project Cargo & Kirim Alat Berat</a></li>
            </ul>
          </div>

          {/* Rute Populer */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Rute Favorit</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#cek-tarif" className="hover:text-amber-400 transition-colors">Ekspedisi Jakarta ke Surabaya</a></li>
              <li><a href="#cek-tarif" className="hover:text-amber-400 transition-colors">Ekspedisi Jakarta ke Medan</a></li>
              <li><a href="#cek-tarif" className="hover:text-amber-400 transition-colors">Ekspedisi Jakarta ke Makassar</a></li>
              <li><a href="#cek-tarif" className="hover:text-amber-400 transition-colors">Ekspedisi Jakarta ke Balikpapan (IKN)</a></li>
              <li><a href="#cek-tarif" className="hover:text-amber-400 transition-colors">Ekspedisi Surabaya ke Banjarmasin</a></li>
              <li><a href="#cek-tarif" className="hover:text-amber-400 transition-colors">Ekspedisi Jakarta ke Denpasar Bali</a></li>
            </ul>
          </div>

          {/* Bantuan & Akses Admin */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Bantuan & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#lacak-resi" className="hover:text-amber-400 transition-colors">Cek Status Resi Pengiriman</a></li>
              <li><a href="#faq" className="hover:text-amber-400 transition-colors">Syarat & Ketentuan Pengiriman</a></li>
              <li><a href="#faq" className="hover:text-amber-400 transition-colors">Kebijakan Asuransi & Klaim</a></li>
              <li><a href="#faq" className="hover:text-amber-400 transition-colors">Daftar Barang Berbahaya (DG)</a></li>
              <li className="pt-2">
                <button
                  onClick={isAdminLoggedIn ? onGoToAdmin : onOpenAdminModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-500 text-amber-400 hover:text-amber-300 font-semibold text-xs transition-colors cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  {isAdminLoggedIn ? 'Dashboard Admin Aktif' : 'Login Dashboard Admin'}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* SEO Keywords Directory Footer (Boosts search engine indexing & organic rankings) */}
        <div className="py-6 border-b border-slate-800/60 text-[11px] text-slate-500 space-y-2">
          <p className="font-semibold text-slate-400 uppercase tracking-wider">
            Index Pencarian Google:
          </p>
          <p className="leading-relaxed">
            jasa ekspedisi murah jakarta | kargo darat surabaya murah | tarif kirim motor antar pulau | kargo kapal laut makassar | jasa pindahan rumah profesional | sewa fuso tronton wingbox harian bulanan | cek resi cahaya kargo online | ekspedisi logistik alat berat balikpapan ikn | kargo udara sehari sampai bandara soekarno hatta kualanamu.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {companyProfile.name}. Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Sertifikasi ISO 9001:2015 & ALFI/ILFA
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
