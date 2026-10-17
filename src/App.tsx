import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrackingSection } from './components/TrackingSection';
import { TarifCalculatorSection } from './components/TarifCalculatorSection';
import { ServicesSection } from './components/ServicesSection';
import { FleetSection } from './components/FleetSection';
import { CoverageMapSection } from './components/CoverageMapSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ReceiptModal } from './components/receipt/ReceiptModal';
import { 
  initialCompanyProfile, 
  initialRates, 
  initialShipments, 
  initialQuotes, 
  initialAnalytics, 
  initialSeoConfig, 
  initialEmailReportConfig, 
  indonesianCities 
} from './data/initialData';
import { 
  CompanyProfile, 
  ShippingRate, 
  TrackingShipment, 
  QuoteRequest, 
  AnalyticsData, 
  SeoConfig, 
  EmailReportConfig 
} from './types';

export default function App() {
  // Current view: 'public' or 'admin'
  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');
  const [activeSection, setActiveSection] = useState('hero');

  // Modals
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [selectedReceiptShipment, setSelectedReceiptShipment] = useState<TrackingShipment | null>(null);

  const handleOpenReceiptModal = (shipment: TrackingShipment) => {
    setSelectedReceiptShipment(shipment);
    setIsReceiptModalOpen(true);
  };

  // Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('cahaya_kargo_admin_auth') === 'true';
  });

  // App State with LocalStorage Persistence
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>(() => {
    const saved = localStorage.getItem('cahaya_kargo_profile');
    return saved ? JSON.parse(saved) : initialCompanyProfile;
  });

  const [rates, setRates] = useState<ShippingRate[]>(() => {
    const saved = localStorage.getItem('cahaya_kargo_rates');
    return saved ? JSON.parse(saved) : initialRates;
  });

  const [shipments, setShipments] = useState<TrackingShipment[]>(() => {
    const saved = localStorage.getItem('cahaya_kargo_shipments');
    return saved ? JSON.parse(saved) : initialShipments;
  });

  const [quotes, setQuotes] = useState<QuoteRequest[]>(() => {
    const saved = localStorage.getItem('cahaya_kargo_quotes');
    return saved ? JSON.parse(saved) : initialQuotes;
  });

  const [seoConfig, setSeoConfig] = useState<SeoConfig>(() => {
    const saved = localStorage.getItem('cahaya_kargo_seo');
    return saved ? JSON.parse(saved) : initialSeoConfig;
  });

  const [emailConfig, setEmailConfig] = useState<EmailReportConfig>(() => {
    const saved = localStorage.getItem('cahaya_kargo_email');
    return saved ? JSON.parse(saved) : initialEmailReportConfig;
  });

  const [analytics, setAnalytics] = useState<AnalyticsData>(initialAnalytics);

  // Search parameters passed from Hero to Tracking / Calculator
  const [searchedResi, setSearchedResi] = useState('CK-889210');
  const [calcOrigin, setCalcOrigin] = useState('Jakarta (Jabodetabek)');
  const [calcDest, setCalcDest] = useState('Surabaya');
  const [calcWeight, setCalcWeight] = useState(100);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('cahaya_kargo_profile', JSON.stringify(companyProfile));
  }, [companyProfile]);

  useEffect(() => {
    localStorage.setItem('cahaya_kargo_rates', JSON.stringify(rates));
  }, [rates]);

  useEffect(() => {
    localStorage.setItem('cahaya_kargo_shipments', JSON.stringify(shipments));
  }, [shipments]);

  useEffect(() => {
    localStorage.setItem('cahaya_kargo_quotes', JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem('cahaya_kargo_seo', JSON.stringify(seoConfig));
    
    // Dynamically sync head title & meta tags
    if (seoConfig.metaTitle) {
      document.title = seoConfig.metaTitle;
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && seoConfig.metaDescription) {
      metaDesc.setAttribute('content', seoConfig.metaDescription);
    }
    const metaKw = document.querySelector('meta[name="keywords"]');
    if (metaKw && seoConfig.metaKeywords) {
      metaKw.setAttribute('content', seoConfig.metaKeywords);
    }
    const gscTag = document.getElementById('gsc-meta-tag');
    if (gscTag && seoConfig.gscVerificationCode) {
      gscTag.setAttribute('content', seoConfig.gscVerificationCode);
    }
  }, [seoConfig]);

  useEffect(() => {
    localStorage.setItem('cahaya_kargo_email', JSON.stringify(emailConfig));
  }, [emailConfig]);

  // Handle quote submission from public modal
  const handleQuoteSubmit = (newQuoteData: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>) => {
    const newQuote: QuoteRequest = {
      ...newQuoteData,
      id: `quote-${Date.now()}`,
      status: 'baru',
      createdAt: '17 Okt 2026, ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
    };

    setQuotes([newQuote, ...quotes]);

    // Update analytics
    setAnalytics(prev => ({
      ...prev,
      todayUniqueVisitors: prev.todayUniqueVisitors + 1,
      recentEvents: [
        {
          id: `ev-${Date.now()}`,
          timestamp: '17 Okt 2026, ' + new Date().toLocaleTimeString('id-ID'),
          ipMasked: '182.1.xx.xx',
          city: newQuote.origin.split(' ')[0],
          device: 'Web Client',
          browser: 'Chrome',
          page: '/minta-penawaran',
          action: `Permintaan Penawaran Baru: ${newQuote.goodsType} (${newQuote.estimatedWeightKg} Kg) ke ${newQuote.destination}`,
          referrer: 'Website Direct'
        },
        ...prev.recentEvents
      ]
    }));
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setIsAdminLoginModalOpen(false);
    setCurrentView('admin');
  };

  const handleLogout = () => {
    localStorage.removeItem('cahaya_kargo_admin_auth');
    localStorage.removeItem('cahaya_kargo_admin_user');
    setIsAdminLoggedIn(false);
    setCurrentView('public');
  };

  const handleHeroQuickTarif = (origin: string, dest: string, weight: number) => {
    setCalcOrigin(origin);
    setCalcDest(dest);
    setCalcWeight(weight);
  };

  // Render Admin Dashboard if in admin mode
  if (currentView === 'admin' && isAdminLoggedIn) {
    return (
      <>
        <AdminDashboard
          onLogout={handleLogout}
          onViewPublicSite={() => setCurrentView('public')}
          companyProfile={companyProfile}
          setCompanyProfile={setCompanyProfile}
          seoConfig={seoConfig}
          setSeoConfig={setSeoConfig}
          emailConfig={emailConfig}
          setEmailConfig={setEmailConfig}
          analytics={analytics}
          setAnalytics={setAnalytics}
          shipments={shipments}
          setShipments={setShipments}
          rates={rates}
          setRates={setRates}
          quotes={quotes}
          setQuotes={setQuotes}
          onOpenReceiptModal={handleOpenReceiptModal}
        />
        <ReceiptModal
          isOpen={isReceiptModalOpen}
          onClose={() => setIsReceiptModalOpen(false)}
          shipment={selectedReceiptShipment || shipments[0]}
          companyProfile={companyProfile}
        />
      </>
    );
  }

  // Public Facing Website
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      
      {/* Top Navbar */}
      <Navbar
        companyProfile={companyProfile}
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        onOpenAdminModal={() => setIsAdminLoginModalOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        onGoToAdmin={() => setCurrentView('admin')}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onSearchResi={(resi) => setSearchedResi(resi)}
          onCalculateQuickTarif={handleHeroQuickTarif}
          rates={rates}
          cities={indonesianCities}
          shipments={shipments}
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        />

        {/* Lacak Resi (AWB Tracking) */}
        <TrackingSection
          shipments={shipments}
          searchedResi={searchedResi}
          onSearchResi={(resi) => setSearchedResi(resi)}
          onOpenReceiptModal={handleOpenReceiptModal}
        />

        {/* Cek Tarif / Ongkir Calculator */}
        <TarifCalculatorSection
          rates={rates}
          cities={indonesianCities}
          initialOrigin={calcOrigin}
          initialDestination={calcDest}
          initialWeight={calcWeight}
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        />

        {/* Layanan Kargo Terlengkap */}
        <ServicesSection
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        />

        {/* Pilihan Armada Truk & Kontainer */}
        <FleetSection />

        {/* Titik Hub & Jangkauan Seluruh Indonesia */}
        <CoverageMapSection />

        {/* Pertanyaan Umum (FAQ) */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer
        companyProfile={companyProfile}
        onOpenAdminModal={() => setIsAdminLoginModalOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        onGoToAdmin={() => setCurrentView('admin')}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <aside aria-label="Bantuan WhatsApp" className="fixed bottom-6 right-6 z-40">
        <a
          href={`https://wa.me/${companyProfile.whatsapp}?text=Halo%20Cahaya%20Kargo,%20saya%20ingin%20konsultasi%20pengiriman%20kargo.`}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-full shadow-2xl hover:shadow-emerald-500/40 transition-all hover:scale-105"
        >
          <span className="w-3 h-3 rounded-full bg-white animate-ping"></span>
          <span className="text-xs font-extrabold hidden sm:inline">Chat CS 24 Jam</span>
        </a>
      </aside>

      {/* Modals */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        onSubmitQuote={handleQuoteSubmit}
        cities={indonesianCities}
      />

      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <ReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        shipment={selectedReceiptShipment || shipments[0]}
        companyProfile={companyProfile}
      />

    </div>
  );
}
