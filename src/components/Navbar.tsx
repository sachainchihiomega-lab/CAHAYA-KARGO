import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  MessageSquare, 
  LogIn, 
  Menu, 
  X, 
  Truck, 
  Calculator, 
  Search, 
  Headphones, 
  Layers
} from 'lucide-react';
import { CahayaKargoLogo } from './CahayaKargoLogo';
import { CompanyProfile } from '../types';

interface NavbarProps {
  companyProfile: CompanyProfile;
  onOpenQuoteModal: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  companyProfile,
  onOpenQuoteModal,
  activeSection,
  setActiveSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm border-b border-slate-100">
      {/* Top Bar Announcement & Hotline */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Layanan Ekspedisi 24 Jam
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              Kawasan Pergudangan Logistik Terpadu Blok A5 No. 12, Jakarta Utara
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href={`https://wa.me/${companyProfile.whatsapp}?text=Halo%20Mitra%20Kargo%20(PT%20Samudra%20Lintas%20Artha),%20saya%20ingin%20konsultasi%20pengiriman%20kargo.`}
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp CS: 0878-8262-1638
            </a>
            <span className="text-slate-600">|</span>
            {/* Tombol Login merujuk langsung ke https://mitrakargo.ai.studio/ */}
            <a
              href="https://mitrakargo.ai.studio/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-slate-200 hover:text-amber-400 transition-colors cursor-pointer bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-md text-xs font-bold border border-slate-700"
            >
              <LogIn className="w-3.5 h-3.5 text-amber-400" />
              <span>Login</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="cursor-pointer py-1"
          >
            <CahayaKargoLogo customLogoUrl={companyProfile.logoUrl} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            <button 
              onClick={() => handleNavClick('hero')}
              className={`text-sm font-semibold transition-colors cursor-pointer hover:text-amber-600 ${
                activeSection === 'hero' ? 'text-amber-600 font-bold' : 'text-slate-700'
              }`}
            >
              Beranda
            </button>
            <button 
              onClick={() => handleNavClick('cek-tarif')}
              className={`text-sm font-semibold transition-colors cursor-pointer hover:text-amber-600 flex items-center gap-1.5 ${
                activeSection === 'cek-tarif' ? 'text-amber-600 font-bold' : 'text-slate-700'
              }`}
            >
              <Calculator className="w-4 h-4 text-amber-500" />
              Cek Tarif
            </button>
            <button 
              onClick={() => handleNavClick('lacak-resi')}
              className={`text-sm font-semibold transition-colors cursor-pointer hover:text-amber-600 flex items-center gap-1.5 ${
                activeSection === 'lacak-resi' ? 'text-amber-600 font-bold' : 'text-slate-700'
              }`}
            >
              <Search className="w-4 h-4 text-blue-600" />
              Lacak Resi
            </button>
            <button 
              onClick={() => handleNavClick('layanan')}
              className={`text-sm font-semibold transition-colors cursor-pointer hover:text-amber-600 flex items-center gap-1.5 ${
                activeSection === 'layanan' ? 'text-amber-600 font-bold' : 'text-slate-700'
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-600" />
              Layanan Kargo
            </button>
            <button 
              onClick={() => handleNavClick('armada')}
              className={`text-sm font-semibold transition-colors cursor-pointer hover:text-amber-600 ${
                activeSection === 'armada' ? 'text-amber-600 font-bold' : 'text-slate-700'
              }`}
            >
              Armada
            </button>
            <button 
              onClick={() => handleNavClick('jangkauan')}
              className={`text-sm font-semibold transition-colors cursor-pointer hover:text-amber-600 ${
                activeSection === 'jangkauan' ? 'text-amber-600 font-bold' : 'text-slate-700'
              }`}
            >
              Rute & Cabang
            </button>
            <button 
              onClick={() => handleNavClick('testimoni')}
              className={`text-sm font-semibold transition-colors cursor-pointer hover:text-amber-600 ${
                activeSection === 'testimoni' ? 'text-amber-600 font-bold' : 'text-slate-700'
              }`}
            >
              Testimoni
            </button>
            <button 
              onClick={() => handleNavClick('artikel-logistik')}
              className={`text-sm font-semibold transition-colors cursor-pointer hover:text-amber-600 flex items-center gap-1.5 ${
                activeSection === 'artikel-logistik' ? 'text-amber-600 font-bold' : 'text-slate-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Artikel Logistik
            </button>
            <button 
              onClick={() => handleNavClick('kontak')}
              className={`text-sm font-semibold transition-colors cursor-pointer hover:text-amber-600 ${
                activeSection === 'kontak' ? 'text-amber-600 font-bold' : 'text-slate-700'
              }`}
            >
              Kontak
            </button>
          </nav>

          {/* Desktop Right Buttons: Login link to https://mitrakargo.ai.studio/ and Minta Penawaran */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://mitrakargo.ai.studio/"
              target="_blank"
              rel="noreferrer"
              className="border border-slate-200 hover:border-amber-500 text-slate-800 hover:text-amber-600 font-bold px-3.5 py-2.5 rounded-lg text-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs hover:bg-amber-50/50"
            >
              <LogIn className="w-4 h-4 text-amber-500" />
              <span>Login</span>
            </a>
            <button
              onClick={onOpenQuoteModal}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-lg text-sm shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Truck className="w-4 h-4" />
              Minta Penawaran
            </button>
          </div>

          {/* Mobile Header Right */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href="https://mitrakargo.ai.studio/"
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1.5 text-xs font-bold text-slate-800 hover:text-amber-600 bg-slate-100 rounded-lg flex items-center gap-1"
              title="Login"
            >
              <LogIn className="w-4 h-4 text-amber-500" />
              <span>Login</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <button
              onClick={() => handleNavClick('cek-tarif')}
              className="flex items-center justify-center gap-2 bg-amber-50 text-amber-800 p-3 rounded-lg font-semibold text-sm border border-amber-200"
            >
              <Calculator className="w-4 h-4 text-amber-600" />
              Cek Tarif
            </button>
            <button
              onClick={() => handleNavClick('lacak-resi')}
              className="flex items-center justify-center gap-2 bg-blue-50 text-blue-800 p-3 rounded-lg font-semibold text-sm border border-blue-200"
            >
              <Search className="w-4 h-4 text-blue-600" />
              Lacak Resi
            </button>
          </div>

          <div className="space-y-1 border-t border-slate-100 pt-2">
            <button 
              onClick={() => handleNavClick('hero')}
              className="w-full text-left py-2.5 px-3 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Beranda
            </button>
            <button 
              onClick={() => handleNavClick('layanan')}
              className="w-full text-left py-2.5 px-3 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Layanan Kargo (Darat, Laut, Udara, Sewa Truk)
            </button>
            <button 
              onClick={() => handleNavClick('armada')}
              className="w-full text-left py-2.5 px-3 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Pilihan Armada Truk
            </button>
            <button 
              onClick={() => handleNavClick('jangkauan')}
              className="w-full text-left py-2.5 px-3 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Rute & Kantor Cabang
            </button>
            <button 
              onClick={() => handleNavClick('testimoni')}
              className="w-full text-left py-2.5 px-3 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Testimoni Pelanggan
            </button>
            <button 
              onClick={() => handleNavClick('artikel-logistik')}
              className="w-full text-left py-2.5 px-3 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Artikel & Edukasi Logistik</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Blog</span>
            </button>
            <button 
              onClick={() => handleNavClick('faq')}
              className="w-full text-left py-2.5 px-3 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Tanya Jawab (FAQ)
            </button>
            <button 
              onClick={() => handleNavClick('kontak')}
              className="w-full text-left py-2.5 px-3 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Hubungi Kami
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-lg text-sm flex items-center justify-center gap-2 shadow"
            >
              <Truck className="w-4 h-4" />
              Minta Penawaran Harga
            </button>
            
            <a
              href="https://mitrakargo.ai.studio/"
              target="_blank"
              rel="noreferrer"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-lg text-xs flex items-center justify-center gap-2 transition-all shadow"
            >
              <LogIn className="w-3.5 h-3.5 text-amber-400" />
              <span>Login ke Portal (mitrakargo.ai.studio)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
