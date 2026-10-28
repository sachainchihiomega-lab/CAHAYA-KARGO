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
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ReceiptModal } from './components/receipt/ReceiptModal';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AiChatbot } from './components/chat/AiChatbot';
import { ArticlesSection } from './components/ArticlesSection';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { AiLogisticsSection } from './components/AiLogisticsSection';
import { 
  initialCompanyProfile, 
  initialRates, 
  initialShipments, 
  initialQuotes, 
  initialAnalytics, 
  initialSeoConfig, 
  initialEmailReportConfig, 
  initialTestimonials,
  initialArticles,
  indonesianCities 
} from './data/initialData';
import { 
  CompanyProfile, 
  ShippingRate, 
  TrackingShipment, 
  QuoteRequest, 
  AnalyticsData, 
  SeoConfig, 
  EmailReportConfig,
  Testimonial,
  LogisticsArticle 
} from './types';

export default function App() {
  // Current view: 'public' or 'admin'
  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');
  const [activeSection, setActiveSection] = useState('hero');

  // Modals
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [selectedReceiptShipment, setSelectedReceiptShipment] = useState<TrackingShipment | null>(null);

  const handleOpenReceiptModal = (shipment: TrackingShipment) => {
    setSelectedReceiptShipment(shipment);
    setIsReceiptModalOpen(true);
  };

  // Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('mitra_kargo_admin_auth') === 'true';
  });

  // App State with LocalStorage Persistence
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>(() => {
    try {
      const saved = localStorage.getItem('mitra_kargo_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name && parsed.name.includes('Samudra')) return parsed;
      }
    } catch {
      // fallback
    }
    return initialCompanyProfile;
  });

  const [rates, setRates] = useState<ShippingRate[]>(() => {
    try {
      const saved = localStorage.getItem('mitra_kargo_rates');
      return saved ? JSON.parse(saved) : initialRates;
    } catch {
      return initialRates;
    }
  });

  const [shipments, setShipments] = useState<TrackingShipment[]>(() => {
    try {
      const saved = localStorage.getItem('mitra_kargo_shipments');
      return saved ? JSON.parse(saved) : initialShipments;
    } catch {
      return initialShipments;
    }
  });

  const [quotes, setQuotes] = useState<QuoteRequest[]>(() => {
    try {
      const saved = localStorage.getItem('mitra_kargo_quotes');
      return saved ? JSON.parse(saved) : initialQuotes;
    } catch {
      return initialQuotes;
    }
  });

  const [seoConfig, setSeoConfig] = useState<SeoConfig>(() => {
    try {
      const saved = localStorage.getItem('mitra_kargo_seo');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.metaTitle && parsed.metaTitle.includes('Mitra')) return parsed;
      }
    } catch {
      // fallback
    }
    return initialSeoConfig;
  });

  const [emailConfig, setEmailConfig] = useState<EmailReportConfig>(() => {
    try {
      const saved = localStorage.getItem('mitra_kargo_email');
      return saved ? JSON.parse(saved) : initialEmailReportConfig;
    } catch {
      return initialEmailReportConfig;
    }
  });

  const [analytics, setAnalytics] = useState<AnalyticsData>(initialAnalytics);

  // Search parameters passed from Hero to Tracking / Calculator
  const [searchedResi, setSearchedResi] = useState('MK-889210');
  const [calcOrigin, setCalcOrigin] = useState('Jakarta (Jabodetabek)');
  const [calcDest, setCalcDest] = useState('Surabaya');
  const [calcWeight, setCalcWeight] = useState(100);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('mitra_kargo_profile', JSON.stringify(companyProfile));
  }, [companyProfile]);

  useEffect(() => {
    localStorage.setItem('mitra_kargo_rates', JSON.stringify(rates));
  }, [rates]);

  useEffect(() => {
    localStorage.setItem('mitra_kargo_shipments', JSON.stringify(shipments));
  }, [shipments]);

  useEffect(() => {
    localStorage.setItem('mitra_kargo_quotes', JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem('mitra_kargo_seo', JSON.stringify(seoConfig));
    
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

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('mitrakargo_testimonials') || localStorage.getItem('cahaya_kargo_testimonials');
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  // Educational Logistics Articles State (Organic SEO)
  const [articles, setArticles] = useState<LogisticsArticle[]>(() => {
    const saved = localStorage.getItem('mitrakargo_articles') || localStorage.getItem('cahaya_kargo_articles');
    return saved ? JSON.parse(saved) : initialArticles;
  });

  const [selectedArticle, setSelectedArticle] = useState<LogisticsArticle | null>(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cahaya_kargo_email', JSON.stringify(emailConfig));
  }, [emailConfig]);

  useEffect(() => {
    localStorage.setItem('mitrakargo_testimonials', JSON.stringify(testimonials));
    localStorage.setItem('cahaya_kargo_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('mitrakargo_articles', JSON.stringify(articles));
    localStorage.setItem('cahaya_kargo_articles', JSON.stringify(articles));
  }, [articles]);

  const handleOpenArticle = (article: LogisticsArticle) => {
    setSelectedArticle(article);
    setIsArticleModalOpen(true);
    setArticles(prev => prev.map(a => a.id === article.id ? { ...a, viewsCount: (a.viewsCount || 0) + 1 } : a));
  };

  const handleSubmitTestimonial = (newReviewData: Omit<Testimonial, 'id' | 'createdAt' | 'status'>) => {
    const newTesti: Testimonial = {
      ...newReviewData,
      id: `testi-${Date.now()}`,
      status: 'menunggu_moderasi',
      createdAt: '18 Okt 2026',
    };
    setTestimonials([newTesti, ...testimonials]);
  };

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
          testimonials={testimonials}
          setTestimonials={setTestimonials}
          articles={articles}
          setArticles={setArticles}
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

        {/* Teknologi AI & Solusi Bisnis Cerdas */}
        <AiLogisticsSection
          companyProfile={companyProfile}
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        />

        {/* Pilihan Armada Truk & Kontainer */}
        <FleetSection />

        {/* Titik Hub & Jangkauan Seluruh Indonesia */}
        <CoverageMapSection />

        {/* Testimoni Klien & Ulasan Kepuasan Pelanggan */}
        <TestimonialsSection
          testimonials={testimonials}
          onSubmitTestimonial={handleSubmitTestimonial}
        />

        {/* Artikel & Edukasi Logistik (Tips Packing, Info Pelabuhan, Update Regulasi) */}
        <ArticlesSection
          articles={articles}
          onOpenArticle={handleOpenArticle}
        />

        {/* Pertanyaan Umum (FAQ) */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer
        companyProfile={companyProfile}
      />

      {/* AI Assistant Chatbot in bottom-right corner (Answers FAQ & general logistics queries automatically) */}
      <AiChatbot companyProfile={companyProfile} />

      {/* Modals */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        onSubmitQuote={handleQuoteSubmit}
        cities={indonesianCities}
      />

      <ReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        shipment={selectedReceiptShipment || shipments[0]}
        companyProfile={companyProfile}
      />

      {/* Article Detail & Reading Modal */}
      <ArticleDetailModal
        isOpen={isArticleModalOpen}
        onClose={() => setIsArticleModalOpen(false)}
        article={selectedArticle}
        allArticles={articles}
        companyProfile={companyProfile}
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        onSelectArticle={handleOpenArticle}
      />

    </div>
  );
}
