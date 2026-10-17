import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Search, 
  Globe, 
  Mail, 
  FileText, 
  Truck, 
  Calculator, 
  Settings, 
  LogOut, 
  Users, 
  Eye, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  RefreshCw, 
  Save, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Copy, 
  Check, 
  ShieldCheck, 
  Clock, 
  Smartphone, 
  Monitor, 
  Share2, 
  Sparkles,
  ArrowUpRight,
  MessageSquare,
  Star,
  ThumbsUp,
  XCircle,
  BookOpen,
  Edit3,
  Tag
} from 'lucide-react';
import { 
  AnalyticsData, 
  SeoConfig, 
  EmailReportConfig, 
  TrackingShipment, 
  ShippingRate, 
  QuoteRequest, 
  CompanyProfile,
  ShipmentStatus,
  Testimonial,
  LogisticsArticle,
  ArticleCategory,
  ArticleStatus
} from '../../types';
import { CahayaKargoLogo } from '../CahayaKargoLogo';
import { AdminArticleModal } from './AdminArticleModal';
import { ArticleDetailModal } from '../ArticleDetailModal';

interface AdminDashboardProps {
  onLogout: () => void;
  onViewPublicSite: () => void;
  companyProfile: CompanyProfile;
  setCompanyProfile: React.Dispatch<React.SetStateAction<CompanyProfile>>;
  seoConfig: SeoConfig;
  setSeoConfig: React.Dispatch<React.SetStateAction<SeoConfig>>;
  emailConfig: EmailReportConfig;
  setEmailConfig: React.Dispatch<React.SetStateAction<EmailReportConfig>>;
  analytics: AnalyticsData;
  setAnalytics: React.Dispatch<React.SetStateAction<AnalyticsData>>;
  shipments: TrackingShipment[];
  setShipments: React.Dispatch<React.SetStateAction<TrackingShipment[]>>;
  rates: ShippingRate[];
  setRates: React.Dispatch<React.SetStateAction<ShippingRate[]>>;
  quotes: QuoteRequest[];
  setQuotes: React.Dispatch<React.SetStateAction<QuoteRequest[]>>;
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  articles: LogisticsArticle[];
  setArticles: React.Dispatch<React.SetStateAction<LogisticsArticle[]>>;
  onOpenReceiptModal: (shipment: TrackingShipment) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onLogout,
  onViewPublicSite,
  companyProfile,
  setCompanyProfile,
  seoConfig,
  setSeoConfig,
  emailConfig,
  setEmailConfig,
  analytics,
  setAnalytics,
  shipments,
  setShipments,
  rates,
  setRates,
  quotes,
  setQuotes,
  testimonials,
  setTestimonials,
  articles,
  setArticles,
  onOpenReceiptModal
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'seo' | 'email' | 'resi' | 'tarif' | 'quotes' | 'testimoni' | 'branding' | 'artikel'>('analytics');
  const [testimonialFilter, setTestimonialFilter] = useState<'semua' | 'menunggu_moderasi' | 'disetujui' | 'ditolak'>('semua');
  
  // Articles State
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<LogisticsArticle | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewingArticle, setPreviewingArticle] = useState<LogisticsArticle | null>(null);
  const [articleSearchQuery, setArticleSearchQuery] = useState('');
  const [articleCategoryFilter, setArticleCategoryFilter] = useState<string>('Semua');
  const [articleStatusFilter, setArticleStatusFilter] = useState<'semua' | 'dipublikasikan' | 'draft'>('semua');

  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  
  // Real-time visitor simulation pulse
  const [liveVisitorPulse, setLiveVisitorPulse] = useState(analytics.activeVisitors);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  // Email Test Modal State
  const [showEmailPreviewModal, setShowEmailPreviewModal] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // GSC URL Inspection Simulator State
  const [inspectUrl, setInspectUrl] = useState('https://cahayakargo.co.id/cek-ongkir');
  const [inspectionResult, setInspectionResult] = useState<any | null>(null);
  const [isInspecting, setIsInspecting] = useState(false);

  // New Shipment Form State
  const [showAddResiModal, setShowAddResiModal] = useState(false);
  const [newResi, setNewResi] = useState<Partial<TrackingShipment>>({
    resiNumber: `CK-${Math.floor(100000 + Math.random() * 900000)}`,
    senderName: '',
    senderCity: 'Jakarta (Jabodetabek)',
    recipientName: '',
    recipientCity: 'Surabaya',
    recipientAddress: '',
    serviceType: 'darat',
    goodsDescription: '',
    weightKg: 50,
    colliCount: 1,
    totalCost: 150000,
    paymentStatus: 'Lunas',
    status: 'diterima_hub',
    currentLocation: 'Hub Cakung, Jakarta',
    estimatedDelivery: '2-3 Hari Kerja',
  });

  // Pulse active visitors realistically every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveVisitorPulse((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const next = Math.max(12, prev + delta);
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const showNotification = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 3500);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  // Inspect URL in Google Search Console simulator
  const handleInspectUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setIsInspecting(true);
    setTimeout(() => {
      setIsInspecting(false);
      setInspectionResult({
        url: inspectUrl,
        indexed: true,
        crawledAs: 'Googlebot Smartphone (Mobile First)',
        lastCrawlTime: '17 Okt 2026, 03:22 WIB',
        mobileFriendly: true,
        schemaDetected: 'LogisticsService (Valid JSON-LD)',
        canonicalMatch: true
      });
    }, 800);
  };

  // Trigger Google ping
  const handlePingGoogle = () => {
    showNotification('Notifikasi PING berhasil dikirim ke Google & Bing Search Bot! Sitemap akan di-crawl ulang.');
  };

  // Trigger test weekly email report
  const handleSendTestWeeklyReport = () => {
    setIsSendingEmail(true);
    setTimeout(() => {
      setIsSendingEmail(false);
      setShowEmailPreviewModal(true);
      
      const newHistoryItem = {
        id: `rep-${Date.now()}`,
        sentAt: `17 Okt 2026, ${new Date().toLocaleTimeString('id-ID')}`,
        recipient: emailConfig.recipientEmail,
        status: 'Terkirim' as const,
        summary: `Laporan Mingguan Otomatis: ${analytics.todayUniqueVisitors} Pengunjung Unik, ${quotes.length} Leads Masuk, Skor SEO 98/100.`
      };

      setEmailConfig((prev) => ({
        ...prev,
        lastSentAt: newHistoryItem.sentAt,
        history: [newHistoryItem, ...prev.history]
      }));

      showNotification(`Laporan mingguan berhasil dikirim ke ${emailConfig.recipientEmail}!`);
    }, 1000);
  };

  // Add new shipment
  const handleCreateShipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResi.resiNumber || !newResi.senderName || !newResi.recipientName) return;

    const fullShipment: TrackingShipment = {
      resiNumber: newResi.resiNumber,
      senderName: newResi.senderName,
      senderPhone: '0812' + Math.floor(10000000 + Math.random() * 90000000),
      senderCity: newResi.senderCity || 'Jakarta',
      recipientName: newResi.recipientName,
      recipientPhone: '0813' + Math.floor(10000000 + Math.random() * 90000000),
      recipientAddress: newResi.recipientAddress || 'Alamat Penerima',
      recipientCity: newResi.recipientCity || 'Surabaya',
      serviceType: newResi.serviceType || 'darat',
      goodsDescription: newResi.goodsDescription || 'Muatan Paket Kargo',
      weightKg: Number(newResi.weightKg) || 50,
      colliCount: Number(newResi.colliCount) || 1,
      totalCost: Number(newResi.totalCost) || 150000,
      paymentStatus: newResi.paymentStatus || 'Lunas',
      status: newResi.status || 'diterima_hub',
      currentLocation: newResi.currentLocation || 'Hub Sortir Asal',
      estimatedDelivery: newResi.estimatedDelivery || '2-3 Hari',
      createdAt: '17 Okt 2026, 09:00 WIB',
      checkpoints: [
        {
          id: `cp-${Date.now()}`,
          timestamp: '17 Okt 2026, 09:00 WIB',
          location: newResi.currentLocation || 'Hub Asal',
          status: newResi.status || 'diterima_hub',
          description: `Paket diterima di loket, ditimbang ${newResi.weightKg} Kg, manifest dibuat.`,
          officerName: 'Admin Loket Pusat'
        }
      ]
    };

    setShipments([fullShipment, ...shipments]);
    setShowAddResiModal(false);
    showNotification(`Resi baru ${fullShipment.resiNumber} berhasil diterbitkan!`);
  };

  // Calculate SEO Health Score
  const calculateSeoScore = () => {
    let score = 0;
    if (seoConfig.metaTitle.length >= 30 && seoConfig.metaTitle.length <= 70) score += 15;
    if (seoConfig.metaDescription.length >= 100 && seoConfig.metaDescription.length <= 165) score += 20;
    if (seoConfig.metaKeywords.length > 20) score += 10;
    if (seoConfig.canonicalUrl.startsWith('https://')) score += 10;
    if (seoConfig.robotsMeta.includes('index')) score += 10;
    if (seoConfig.gscVerificationCode) score += 15;
    if (seoConfig.ogTitle && seoConfig.ogImage) score += 10;
    if (seoConfig.customSchemaJson.includes('LogisticsService')) score += 10;
    return Math.min(score, 100);
  };

  const seoScore = calculateSeoScore();

  // Article Handlers
  const handleSaveArticle = (savedArticle: LogisticsArticle) => {
    const existingIndex = articles.findIndex(a => a.id === savedArticle.id);
    if (existingIndex >= 0) {
      const updated = [...articles];
      updated[existingIndex] = savedArticle;
      setArticles(updated);
      showNotification(`Artikel "${savedArticle.title.slice(0, 30)}..." berhasil diperbarui!`);
    } else {
      setArticles([savedArticle, ...articles]);
      showNotification(`Artikel baru "${savedArticle.title.slice(0, 30)}..." berhasil diterbitkan!`);
    }
    setShowArticleModal(false);
    setEditingArticle(null);
  };

  const handleDeleteArticle = (id: string, title: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus artikel: "${title}"?`)) {
      setArticles(articles.filter(a => a.id !== id));
      showNotification(`Artikel berhasil dihapus.`);
    }
  };

  const handleToggleArticleStatus = (id: string) => {
    const updated = articles.map(a => {
      if (a.id === id) {
        const nextStatus: ArticleStatus = a.status === 'dipublikasikan' ? 'draft' : 'dipublikasikan';
        return { ...a, status: nextStatus };
      }
      return a;
    });
    setArticles(updated);
    showNotification(`Status artikel berhasil diperbarui.`);
  };

  const handleOpenEditArticle = (article: LogisticsArticle) => {
    setEditingArticle(article);
    setShowArticleModal(true);
  };

  const handleOpenPreviewArticle = (article: LogisticsArticle) => {
    setPreviewingArticle(article);
    setShowPreviewModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      
      {/* Admin Topbar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo + Admin Badge */}
            <div className="flex items-center gap-3">
              <CahayaKargoLogo variant="white" className="h-8" />
              <div className="hidden sm:flex items-center gap-2 border-l border-slate-700 pl-3">
                <span className="text-xs bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-500/30">
                  PANEL ADMIN
                </span>
                <span className="text-xs text-slate-400">
                  User: <strong className="text-white">ADMIN</strong>
                </span>
              </div>
            </div>

            {/* Live Indicator + Action Buttons */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  Pengunjung Live: <strong className="text-emerald-400 font-bold">{liveVisitorPulse}</strong>
                </span>
              </div>

              <button
                onClick={onViewPublicSite}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-slate-700 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                Lihat Website
              </button>

              <button
                onClick={onLogout}
                className="bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-rose-500/30 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Save Notification Toast */}
      {saveSuccessMsg && (
        <div className="bg-emerald-600 text-white px-4 py-2.5 text-center text-xs sm:text-sm font-bold shadow-lg animate-in slide-in-from-top duration-300 sticky top-16 z-40 flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Main Admin Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-3 mb-6 border-b border-slate-200 scrollbar-none">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Analitik Trafik Real-Time
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'seo'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            Pengaturan SEO & Search Console
            <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-1.5 py-0.5 rounded-full">
              {seoScore}/100
            </span>
          </button>

          <button
            onClick={() => setActiveTab('email')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'email'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            Pelaporan Email Mingguan
          </button>

          <button
            onClick={() => setActiveTab('resi')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'resi'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Truck className="w-4 h-4" />
            Manajemen Resi ({shipments.length})
          </button>

          <button
            onClick={() => setActiveTab('quotes')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'quotes'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            Leads & Penawaran ({quotes.length})
          </button>

          <button
            onClick={() => setActiveTab('tarif')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'tarif'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Calculator className="w-4 h-4" />
            Master Tarif Ongkir
          </button>

          <button
            onClick={() => setActiveTab('testimoni')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'testimoni'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Star className="w-4 h-4 text-amber-400" />
            Manajemen Testimoni ({testimonials.length})
            {testimonials.filter(t => t.status === 'menunggu_moderasi').length > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full animate-pulse">
                {testimonials.filter(t => t.status === 'menunggu_moderasi').length} Baru
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('artikel')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'artikel'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            Artikel Logistik ({articles.length})
            <span className="bg-emerald-100 text-emerald-900 text-[10px] font-black px-1.5 py-0.5 rounded-full">
              {articles.filter(a => a.status === 'dipublikasikan').length} Live
            </span>
          </button>

          <button
            onClick={() => setActiveTab('branding')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'branding'
                ? 'bg-slate-800 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            Pengaturan & Logo
          </button>
        </div>

        {/* TAB 1: ANALITIK TRAFIK REAL-TIME */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            
            {/* Top Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Live Visitors</span>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
                </div>
                <div className="text-3xl font-black text-slate-900">{liveVisitorPulse}</div>
                <div className="text-xs text-emerald-600 mt-1 flex items-center gap-1 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" /> +18.4% dari jam sebelumnya
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Pageviews Hari Ini</span>
                  <Eye className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-3xl font-black text-slate-900">{analytics.todayPageviews.toLocaleString('id-ID')}</div>
                <div className="text-xs text-slate-500 mt-1">Total impresi halaman</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Pengunjung Unik</span>
                  <Users className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-3xl font-black text-slate-900">{analytics.todayUniqueVisitors.toLocaleString('id-ID')}</div>
                <div className="text-xs text-emerald-600 mt-1 font-semibold">+12.1% minggu ini</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Rata-rata Durasi</span>
                  <Clock className="w-4 h-4 text-purple-500" />
                </div>
                <div className="text-3xl font-black text-slate-900">{analytics.avgDurationMinutes} mnt</div>
                <div className="text-xs text-slate-500 mt-1">Bounce rate: {analytics.bounceRatePercent}% (Bagus)</div>
              </div>
            </div>

            {/* Traffic Trend 24h & 7d */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Hourly Traffic Chart Simulation */}
              <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Tren Trafik 24 Jam Terakhir</h3>
                    <p className="text-xs text-slate-500">Aktivitas pengunjung per interval waktu</p>
                  </div>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md font-bold">
                    Puncak: 10:00 - 14:00 WIB
                  </span>
                </div>

                <div className="h-44 flex items-end gap-2 pt-6 pb-2 border-b border-slate-100">
                  {analytics.historyTrend24h.map((h, i) => {
                    const heightPercent = Math.min(100, Math.round((h.visitors / 300) * 100));
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                        <div 
                          className="w-full bg-blue-500 group-hover:bg-amber-500 rounded-t-md transition-all duration-300 min-h-[8px]"
                          style={{ height: `${heightPercent}%` }}
                        >
                          {/* Tooltip */}
                          <div className="opacity-0 group-hover:opacity-100 pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded font-mono whitespace-nowrap z-10 transition-opacity">
                            {h.visitors} org ({h.hour})
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-400 group-hover:text-slate-900 font-mono">
                          {h.hour.slice(0, 2)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* 7 Days Leads & Growth */}
                <div className="pt-2">
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                    <span>Performa 7 Hari Terakhir:</span>
                    <span className="text-emerald-600">Total Leads: 168 Permintaan</span>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {analytics.historyTrend7d.map((d, i) => (
                      <div key={i} className="bg-slate-50 p-2 rounded-lg text-center border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-medium">{d.date}</span>
                        <strong className="text-xs text-slate-900 block mt-0.5">{d.visitors}</strong>
                        <span className="text-[10px] text-amber-600 font-bold block">{d.leads} leads</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Geographic Visitor Distribution */}
              <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Asal Kota Pengunjung</h3>
                  <p className="text-xs text-slate-500">Sebaran geografis berdasarkan IP pengunjung</p>
                </div>

                <div className="space-y-3 pt-2">
                  {analytics.cityDistribution.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-slate-800">{item.city}</span>
                        <span className="text-slate-500 font-mono">{item.visits} ({item.percentage}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-amber-500 h-full rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <Smartphone className="w-3.5 h-3.5 text-blue-500" /> Mobile 68%
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <Monitor className="w-3.5 h-3.5 text-slate-600" /> Desktop 29%
                  </span>
                </div>
              </div>

            </div>

            {/* Referrers & Live Event Stream */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Top Referrers */}
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Sumber Trafik Teratas (Referrer)</h3>
                  <p className="text-xs text-slate-500">Saluran datangnya calon pelanggan kargo</p>
                </div>

                <div className="space-y-3 pt-1">
                  {analytics.topReferrers.map((ref, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-xs font-bold text-slate-800">{ref.source}</span>
                      <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-mono">
                        {ref.visits} ({ref.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-time Activity Stream */}
              <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Stream Aktivitas Pengunjung
                    </h3>
                    <p className="text-xs text-slate-500">Log interaksi real-time di website</p>
                  </div>
                  <button 
                    onClick={() => showNotification('Data feed analitik real-time diperbarui!')}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    title="Refresh Data"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                  {analytics.recentEvents.map((ev) => (
                    <div key={ev.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                      <div className="flex justify-between items-center text-slate-500 font-mono text-[11px]">
                        <span className="font-bold text-slate-800">{ev.city} ({ev.device})</span>
                        <span>{ev.timestamp}</span>
                      </div>
                      <div className="font-semibold text-blue-800">
                        {ev.action}
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Halaman: {ev.page}</span>
                        <span>Ref: {ev.referrer}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: PUSAT PENGATURAN SEO & GOOGLE SEARCH CONSOLE (LENGKAP DETAIL SESUAI BRIEF) */}
        {activeTab === 'seo' && (
          <div className="space-y-8">
            
            {/* SEO Health Card Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  SEO Audit Engine 2026
                </div>
                <h3 className="text-2xl font-black text-white">
                  Skor Optimasi SEO: <span className="text-amber-400">{seoScore}/100</span> (Sangat Prima)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                  Website PT Cahaya Kargo telah dioptimalkan agar mudah diindeks, mendominasi hasil pencarian Google, dan memiliki Schema.org Logistik lengkap.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <button
                  onClick={handlePingGoogle}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-5 py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Ping Google & Bing Bot
                </button>
              </div>
            </div>

            {/* Google Search Console Direct Integration Box */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                    <Search className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg">Integrasi Google Search Console</h3>
                    <p className="text-xs text-slate-500">Verifikasi kepemilikan domain dan status pengindeksan Google</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold border border-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {seoConfig.gscStatus}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Kode Verifikasi Meta Tag (Google-Site-Verification)
                  </label>
                  <input
                    type="text"
                    value={seoConfig.gscVerificationCode}
                    onChange={(e) => setSeoConfig({ ...seoConfig, gscVerificationCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Otomatis diinjeksikan ke dalam tag &lt;head&gt; halaman index.html
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Halaman Terindeks Google
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={seoConfig.gscIndexedPagesCount}
                      onChange={(e) => setSeoConfig({ ...seoConfig, gscIndexedPagesCount: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-xs font-bold text-slate-600 whitespace-nowrap">Halaman Aktif</span>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Terakhir di-crawl: {seoConfig.gscLastCrawled}
                  </span>
                </div>

                <div className="flex flex-col justify-end">
                  <button
                    onClick={() => showNotification('Konfigurasi Google Search Console berhasil disimpan!')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Simpan Pengaturan GSC
                  </button>
                </div>
              </div>

              {/* URL Inspection Simulator */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-700 block">
                  Simulasi URL Inspection Tool (Google Search Console):
                </span>
                <form onSubmit={handleInspectUrl} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="url"
                    value={inspectUrl}
                    onChange={(e) => setInspectUrl(e.target.value)}
                    placeholder="https://cahayakargo.co.id/cek-ongkir"
                    className="flex-1 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                  />
                  <button
                    type="submit"
                    disabled={isInspecting}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-lg text-xs whitespace-nowrap flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {isInspecting ? 'Menginspeksi URL...' : 'Uji URL Sekarang'}
                  </button>
                </form>

                {inspectionResult && (
                  <div className="bg-white p-3.5 rounded-lg border border-emerald-200 text-xs space-y-1 animate-in fade-in">
                    <div className="flex items-center gap-2 text-emerald-700 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>URL ada di Google Index & Ramah Perangkat Seluler (Mobile-Friendly)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-slate-600 text-[11px] pt-1">
                      <div>Perayap: <strong>{inspectionResult.crawledAs}</strong></div>
                      <div>Waktu Rayap: <strong>{inspectionResult.lastCrawlTime}</strong></div>
                      <div>Deteksi Skema: <strong className="text-blue-700">{inspectionResult.schemaDetected}</strong></div>
                      <div>Kesesuaian Kanonikal: <strong className="text-emerald-700">Cocok</strong></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Meta Tags & SEO Configuration Form */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <h3 className="font-extrabold text-slate-900 text-lg border-b border-slate-100 pb-3 flex items-center gap-2">
                <Globe className="w-5 h-5 text-amber-500" />
                Pengaturan Meta Tags Utama (On-Page SEO)
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Judul Halaman (Meta Title):
                    </label>
                    <span className={`text-[11px] font-mono ${seoConfig.metaTitle.length > 60 ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>
                      {seoConfig.metaTitle.length} / 60 Karakter Ideal
                    </span>
                  </div>
                  <input
                    type="text"
                    value={seoConfig.metaTitle}
                    onChange={(e) => setSeoConfig({ ...seoConfig, metaTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Deskripsi Halaman (Meta Description):
                    </label>
                    <span className={`text-[11px] font-mono ${seoConfig.metaDescription.length > 160 ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>
                      {seoConfig.metaDescription.length} / 160 Karakter Ideal
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    value={seoConfig.metaDescription}
                    onChange={(e) => setSeoConfig({ ...seoConfig, metaDescription: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Kata Kunci SEO (Meta Keywords - Dipisahkan Koma):
                  </label>
                  <input
                    type="text"
                    value={seoConfig.metaKeywords}
                    onChange={(e) => setSeoConfig({ ...seoConfig, metaKeywords: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      URL Kanonikal (Canonical URL):
                    </label>
                    <input
                      type="url"
                      value={seoConfig.canonicalUrl}
                      onChange={(e) => setSeoConfig({ ...seoConfig, canonicalUrl: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-900 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Petunjuk Robot Perayap (Robots Meta):
                    </label>
                    <select
                      value={seoConfig.robotsMeta}
                      onChange={(e) => setSeoConfig({ ...seoConfig, robotsMeta: e.target.value as any })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                    >
                      <option value="index, follow">index, follow (Sangat Direkomendasikan)</option>
                      <option value="noindex, follow">noindex, follow</option>
                      <option value="index, nofollow">index, nofollow</option>
                      <option value="noindex, nofollow">noindex, nofollow</option>
                    </select>
                  </div>
                </div>

                {/* Google Search Snippet Preview Box */}
                <div className="mt-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-2">
                    Pratinjau Tampilan di Hasil Pencarian Google (SERP Preview):
                  </span>
                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-1">
                    <div className="text-xs text-slate-700 flex items-center gap-1 font-mono">
                      <span>cahayakargo.co.id</span>
                      <span className="text-slate-400">&rsaquo; cek-ongkir</span>
                    </div>
                    <div className="text-base text-blue-800 hover:underline font-bold cursor-pointer">
                      {seoConfig.metaTitle}
                    </div>
                    <div className="text-xs text-slate-600 leading-relaxed">
                      {seoConfig.metaDescription}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => showNotification('Pengaturan Meta Tags berhasil disimpan!')}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Simpan Perubahan SEO
                  </button>
                </div>
              </div>
            </div>

            {/* Schema.org JSON-LD Structured Data Editor */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-600" />
                    Data Terstruktur Schema.org (JSON-LD Rich Snippet)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Membuat Google memahami profil bisnis, jam buka, nomor telepon, dan harga secara terstruktur.
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(seoConfig.customSchemaJson, 'schema')}
                  className="text-xs text-slate-600 hover:text-blue-600 flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200"
                >
                  {copiedItem === 'schema' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedItem === 'schema' ? 'Disalin' : 'Salin JSON'}
                </button>
              </div>

              <textarea
                rows={8}
                value={seoConfig.customSchemaJson}
                onChange={(e) => setSeoConfig({ ...seoConfig, customSchemaJson: e.target.value })}
                className="w-full p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex justify-between items-center text-xs text-slate-500">
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> JSON-LD Tervalidasi Sesuai Panduan Google
                </span>
                <button
                  onClick={() => showNotification('Schema.org JSON-LD berhasil diperbarui!')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  Simpan Schema
                </button>
              </div>
            </div>

            {/* Robots.txt & Dynamic Sitemap */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Robots.txt */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-900 text-sm">Konfigurasi robots.txt</h4>
                  <button
                    onClick={() => handleCopy(seoConfig.robotsTxt, 'robots')}
                    className="text-xs text-slate-600 hover:text-blue-600 flex items-center gap-1"
                  >
                    {copiedItem === 'robots' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    Salin
                  </button>
                </div>
                <textarea
                  rows={6}
                  value={seoConfig.robotsTxt}
                  onChange={(e) => setSeoConfig({ ...seoConfig, robotsTxt: e.target.value })}
                  className="w-full p-3 bg-slate-900 text-slate-200 font-mono text-xs rounded-xl"
                />
                <button
                  onClick={() => showNotification('File robots.txt berhasil disimpan!')}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 rounded-lg text-xs"
                >
                  Simpan robots.txt
                </button>
              </div>

              {/* Sitemap.xml Generator */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-900 text-sm">XML Sitemap Generator</h4>
                  <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    Auto-Sync Aktif
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Daftar URL sitemap mencakup Beranda, Cek Ongkir, Lacak Resi, Layanan Kargo, Armada, dan Rute Cabang.
                </p>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs font-mono text-slate-700 space-y-1">
                  <div>https://cahayakargo.co.id/ (Prio: 1.0)</div>
                  <div>https://cahayakargo.co.id/cek-ongkir (Prio: 0.9)</div>
                  <div>https://cahayakargo.co.id/lacak-resi (Prio: 0.9)</div>
                  <div>https://cahayakargo.co.id/layanan/kargo-darat (Prio: 0.8)</div>
                  <div>https://cahayakargo.co.id/layanan/kargo-laut (Prio: 0.8)</div>
                </div>
                <button
                  onClick={handlePingGoogle}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2 rounded-lg text-xs"
                >
                  Generate & Submit Sitemap.xml
                </button>
              </div>

            </div>

          </div>
        )}

        {/* TAB 3: SISTEM PELAPORAN EMAIL OTOMATIS SETIAP MINGGU */}
        {activeTab === 'email' && (
          <div className="space-y-6">
            
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-purple-700 bg-purple-100 px-3 py-1 rounded-full text-xs font-bold mb-2">
                    <Mail className="w-3.5 h-3.5" />
                    Sistem Pelaporan Otomatis Berkala
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-xl">
                    Pengiriman Laporan Mingguan ke Email Admin
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Mengirimkan digest performa trafik, leads kargo, rangkuman SEO, dan status operasional secara otomatis setiap minggu.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-slate-700">Status Sistem:</label>
                  <button
                    onClick={() => setEmailConfig({ ...emailConfig, enabled: !emailConfig.enabled })}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                      emailConfig.enabled 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {emailConfig.enabled ? 'AKTIF BERJALAN' : 'NONAKTIF'}
                  </button>
                </div>
              </div>

              {/* Email Parameters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Alamat Email Penerima Laporan:
                  </label>
                  <input
                    type="email"
                    value={emailConfig.recipientEmail}
                    onChange={(e) => setEmailConfig({ ...emailConfig, recipientEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Default sesuai akun: <strong className="text-slate-700">sachainchihiomega@gmail.com</strong>
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Jadwal & Hari Pengiriman:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={emailConfig.reportDay}
                      onChange={(e) => setEmailConfig({ ...emailConfig, reportDay: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800"
                    >
                      <option value="Senin">Setiap Senin</option>
                      <option value="Jumat">Setiap Jumat</option>
                      <option value="Minggu">Setiap Minggu</option>
                    </select>
                    <input
                      type="text"
                      value={emailConfig.reportTime}
                      onChange={(e) => setEmailConfig({ ...emailConfig, reportTime: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800"
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Zona Waktu: WIB (Jakarta)
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Frekuensi Pengiriman:
                  </label>
                  <select
                    value={emailConfig.reportFrequency}
                    onChange={(e) => setEmailConfig({ ...emailConfig, reportFrequency: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800"
                  >
                    <option value="weekly">Mingguan (Weekly - Direkomendasikan)</option>
                    <option value="biweekly">2 Minggu Sekali (Bi-Weekly)</option>
                    <option value="monthly">Bulanan (Monthly)</option>
                  </select>
                </div>
              </div>

              {/* Content Checkboxes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  Komponen Yang Disertakan Dalam Laporan:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer text-xs font-medium text-slate-800">
                    <input
                      type="checkbox"
                      checked={emailConfig.includeTrafficSummary}
                      onChange={(e) => setEmailConfig({ ...emailConfig, includeTrafficSummary: e.target.checked })}
                      className="w-4 h-4 text-purple-600 rounded"
                    />
                    <span>Ringkasan Trafik & Pengunjung</span>
                  </label>

                  <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer text-xs font-medium text-slate-800">
                    <input
                      type="checkbox"
                      checked={emailConfig.includeSeoHealth}
                      onChange={(e) => setEmailConfig({ ...emailConfig, includeSeoHealth: e.target.checked })}
                      className="w-4 h-4 text-purple-600 rounded"
                    />
                    <span>Skor & Indexing Google Search</span>
                  </label>

                  <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer text-xs font-medium text-slate-800">
                    <input
                      type="checkbox"
                      checked={emailConfig.includeLeadsAndQuotes}
                      onChange={(e) => setEmailConfig({ ...emailConfig, includeLeadsAndQuotes: e.target.checked })}
                      className="w-4 h-4 text-purple-600 rounded"
                    />
                    <span>Permintaan Penawaran (Leads)</span>
                  </label>

                  <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer text-xs font-medium text-slate-800">
                    <input
                      type="checkbox"
                      checked={emailConfig.includeShipmentStats}
                      onChange={(e) => setEmailConfig({ ...emailConfig, includeShipmentStats: e.target.checked })}
                      className="w-4 h-4 text-purple-600 rounded"
                    />
                    <span>Statistik Resi Kargo Aktif</span>
                  </label>
                </div>
              </div>

              {/* Actions & Immediate Test */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-xs text-slate-500">
                  Laporan Terakhir Dikirim: <strong className="text-slate-800">{emailConfig.lastSentAt || 'Belum ada'}</strong>
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => showNotification('Konfigurasi jadwal email mingguan disimpan!')}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Simpan Jadwal
                  </button>

                  <button
                    onClick={handleSendTestWeeklyReport}
                    disabled={isSendingEmail}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isSendingEmail ? (
                      <span>Mengirim Laporan...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Kirim Laporan Uji Coba Sekarang
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Email Dispatch History Log */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" />
                Riwayat Pengiriman Laporan Email Otomatis
              </h4>

              <div className="space-y-2">
                {emailConfig.history.map((h) => (
                  <div key={h.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{h.sentAt}</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                          {h.status}
                        </span>
                        <span className="text-slate-500">&rarr; {h.recipient}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] mt-0.5">{h.summary}</p>
                    </div>

                    <button
                      onClick={() => setShowEmailPreviewModal(true)}
                      className="text-purple-600 hover:text-purple-800 font-bold text-xs whitespace-nowrap"
                    >
                      Lihat Salinan Email &rarr;
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: MANAJEMEN RESI & PENGIRIMAN */}
        {activeTab === 'resi' && (
          <div className="space-y-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">Daftar Nomor Resi (Air Waybill) Aktif</h3>
                  <p className="text-xs text-slate-500">Kelola nomor resi, update checkpoints lokasi, dan status serah terima</p>
                </div>

                <button
                  onClick={() => setShowAddResiModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Terbitkan Resi Baru
                </button>
              </div>

              {/* Shipments Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-3">No. Resi</th>
                      <th className="py-3 px-3">Pengirim & Asal</th>
                      <th className="py-3 px-3">Penerima & Tujuan</th>
                      <th className="py-3 px-3">Layanan / Berat</th>
                      <th className="py-3 px-3">Lokasi Terkini</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                    {shipments.map((s) => (
                      <tr key={s.resiNumber} className="hover:bg-slate-50">
                        <td className="py-3 px-3 font-mono font-bold text-blue-600">
                          {s.resiNumber}
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{s.senderName}</div>
                          <div className="text-[11px] text-slate-500">{s.senderCity}</div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{s.recipientName}</div>
                          <div className="text-[11px] text-slate-500">{s.recipientCity}</div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="capitalize">{s.serviceType}</span> - <strong>{s.weightKg} Kg</strong>
                        </td>
                        <td className="py-3 px-3 text-slate-600">
                          {s.currentLocation}
                        </td>
                        <td className="py-3 px-3">
                          <select
                            value={s.status}
                            onChange={(e) => {
                              const newStatus = e.target.value as ShipmentStatus;
                              setShipments(shipments.map(item => 
                                item.resiNumber === s.resiNumber ? { ...item, status: newStatus } : item
                              ));
                              showNotification(`Status resi ${s.resiNumber} diubah menjadi ${newStatus}`);
                            }}
                            className="bg-slate-100 border border-slate-300 rounded px-2 py-1 text-xs font-semibold"
                          >
                            <option value="menunggu_pickup">Menunggu Pickup</option>
                            <option value="diterima_hub">Diterima di Hub</option>
                            <option value="dalam_perjalanan">Dalam Perjalanan</option>
                            <option value="transit_gudang">Transit Gudang</option>
                            <option value="sedang_dikirim">Sedang Dikirim</option>
                            <option value="selesai">Selesai (Terkirim)</option>
                          </select>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => onOpenReceiptModal(s)}
                              className="text-xs bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-2 py-1 rounded flex items-center gap-1 shadow-xs cursor-pointer"
                              title="Cetak & Download PDF Resi Resmi"
                            >
                              <FileText className="w-3 h-3" />
                              PDF Resi
                            </button>
                            <button
                              onClick={() => {
                                // Add checkpoint prompt simulation
                                const loc = prompt('Masukkan lokasi pos baru:', 'Hub Distribusi');
                                const desc = prompt('Keterangan checkpoint:', 'Muatan telah tiba di loket.');
                                if (loc && desc) {
                                  const updated = shipments.map(item => {
                                    if (item.resiNumber === s.resiNumber) {
                                      return {
                                        ...item,
                                        currentLocation: loc,
                                        checkpoints: [
                                          ...item.checkpoints,
                                          {
                                            id: `cp-${Date.now()}`,
                                            timestamp: '17 Okt 2026, ' + new Date().toLocaleTimeString('id-ID'),
                                            location: loc,
                                            status: item.status,
                                            description: desc,
                                            officerName: 'Admin Hub'
                                          }
                                        ]
                                      };
                                    }
                                    return item;
                                  });
                                  setShipments(updated);
                                  showNotification(`Checkpoint baru untuk ${s.resiNumber} berhasil ditambahkan!`);
                                }
                              }}
                              className="text-xs bg-slate-800 text-white hover:bg-slate-700 px-2 py-1 rounded flex items-center gap-1 cursor-pointer"
                            >
                              + Checkpoint
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

          </div>
        )}

        {/* TAB 5: LEADS & PERMINTAAN PENAWARAN */}
        {activeTab === 'quotes' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">Daftar Leads Masuk (Form Penawaran)</h3>
                  <p className="text-xs text-slate-500">Calon klien yang meminta penawaran harga pengiriman</p>
                </div>
                <span className="text-xs font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                  Total: {quotes.length} Prospek
                </span>
              </div>

              <div className="space-y-3">
                {quotes.map((q) => (
                  <div key={q.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-slate-900">{q.name}</span>
                        {q.company && <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-semibold">{q.company}</span>}
                        <span className="text-[11px] text-slate-400 font-mono">({q.createdAt})</span>
                      </div>
                      <div className="text-xs text-slate-600">
                        Rute: <strong className="text-slate-800">{q.origin} &rarr; {q.destination}</strong> | Layanan: <span className="capitalize">{q.serviceType}</span> ({q.estimatedWeightKg} Kg)
                      </div>
                      <div className="text-xs text-slate-500">
                        Barang: {q.goodsType} {q.notes && <span>- "{q.notes}"</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={q.status}
                        onChange={(e) => {
                          const newStatus = e.target.value as any;
                          setQuotes(quotes.map(item => item.id === q.id ? { ...item, status: newStatus } : item));
                          showNotification(`Status prospek ${q.name} diperbarui!`);
                        }}
                        className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold"
                      >
                        <option value="baru">Baru</option>
                        <option value="dihubungi">Dihubungi</option>
                        <option value="penawaran_dikirim">Penawaran Dikirim</option>
                        <option value="deal">Deal (Closing)</option>
                        <option value="batal">Batal</option>
                      </select>

                      <a
                        href={`https://wa.me/${q.phone.replace(/^0/, '62')}?text=Halo%20Bpk/Ibu%20${encodeURIComponent(q.name)},%20kami%20dari%20PT%20Cahaya%20Kargo%20Indonesia%20ingin%20mengirimkan%20penawaran%20harga%20rute%20${encodeURIComponent(q.origin)}%20ke%20${encodeURIComponent(q.destination)}.`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Chat WA
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: MASTER TARIF */}
        {activeTab === 'tarif' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">Master Data Tarif & Ongkir Kargo</h3>
                  <p className="text-xs text-slate-500">Daftar harga per Kg dan estimasi waktu sampai per kota tujuan</p>
                </div>
                <button
                  onClick={() => showNotification('Data tarif berhasil disinkronkan!')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  Simpan Perubahan Tarif
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-3">Kota Asal</th>
                      <th className="py-3 px-3">Kota Tujuan</th>
                      <th className="py-3 px-3">Layanan</th>
                      <th className="py-3 px-3">Tarif per Kg (Rp)</th>
                      <th className="py-3 px-3">Min. Berat (Kg)</th>
                      <th className="py-3 px-3">Estimasi (ETD)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                    {rates.map((r, i) => (
                      <tr key={r.id} className="hover:bg-slate-50">
                        <td className="py-3 px-3">{r.origin}</td>
                        <td className="py-3 px-3 font-bold">{r.destination}</td>
                        <td className="py-3 px-3 capitalize">{r.serviceType}</td>
                        <td className="py-3 px-3">
                          <input
                            type="number"
                            value={r.pricePerKg}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setRates(rates.map(item => item.id === r.id ? { ...item, pricePerKg: val } : item));
                            }}
                            className="w-24 px-2 py-1 border border-slate-300 rounded text-xs font-bold text-slate-900"
                          />
                        </td>
                        <td className="py-3 px-3">
                          <input
                            type="number"
                            value={r.minWeightKg}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setRates(rates.map(item => item.id === r.id ? { ...item, minWeightKg: val } : item));
                            }}
                            className="w-20 px-2 py-1 border border-slate-300 rounded text-xs"
                          />
                        </td>
                        <td className="py-3 px-3">
                          <input
                            type="text"
                            value={r.etdDays}
                            onChange={(e) => {
                              const val = e.target.value;
                              setRates(rates.map(item => item.id === r.id ? { ...item, etdDays: val } : item));
                            }}
                            className="w-28 px-2 py-1 border border-slate-300 rounded text-xs"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: MANAJEMEN TESTIMONI & ULASAN PELANGGAN */}
        {activeTab === 'testimoni' && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 pb-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-amber-700 bg-amber-100 px-3 py-1 rounded-full text-xs font-bold mb-2">
                    <Star className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
                    Moderasi Ulasan Publik
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-xl">
                    Manajemen Testimoni & Ulasan Klien
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Kelola dan setujui ulasan pelanggan agar tampil pada halaman depan website resmi PT Cahaya Kargo.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const name = prompt('Nama Klien / Perusahaan:', 'PT Mitra Logistik Pratama');
                      const comment = prompt('Ulasan Testimoni:', 'Layanan pengiriman kargo cepat, aman, dan respon customer service sangat responsif.');
                      const city = prompt('Kota Domisili:', 'Surabaya');
                      if (name && comment) {
                        const newReview: Testimonial = {
                          id: `testi-${Date.now()}`,
                          name,
                          roleOrCompany: 'Mitra Korporat Terverifikasi',
                          city: city || 'Jakarta',
                          rating: 5,
                          serviceType: 'darat',
                          comment,
                          status: 'disetujui',
                          createdAt: '17 Okt 2026',
                          isVerifiedBuyer: true
                        };
                        setTestimonials([newReview, ...testimonials]);
                        showNotification('Testimoni baru berhasil ditambahkan dan disetujui!');
                      }
                    }}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Tambah Ulasan Manual
                  </button>
                </div>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-100">
                <button
                  onClick={() => setTestimonialFilter('semua')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    testimonialFilter === 'semua'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Semua ({testimonials.length})
                </button>

                <button
                  onClick={() => setTestimonialFilter('menunggu_moderasi')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                    testimonialFilter === 'menunggu_moderasi'
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  Menunggu Moderasi ({testimonials.filter(t => t.status === 'menunggu_moderasi').length})
                </button>

                <button
                  onClick={() => setTestimonialFilter('disetujui')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                    testimonialFilter === 'disetujui'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Disetujui / Tampil ({testimonials.filter(t => t.status === 'disetujui').length})
                </button>

                <button
                  onClick={() => setTestimonialFilter('ditolak')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                    testimonialFilter === 'ditolak'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
                  }`}
                >
                  <XCircle className="w-3.5 h-3.5 text-rose-600" />
                  Ditolak ({testimonials.filter(t => t.status === 'ditolak').length})
                </button>
              </div>

              {/* Testimonials List */}
              <div className="space-y-4">
                {testimonials
                  .filter((t) => testimonialFilter === 'semua' || t.status === testimonialFilter)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white transition-all space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center text-amber-400">
                            {[...Array(item.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          
                          <span className="font-extrabold text-sm text-slate-900">{item.name}</span>
                          <span className="text-xs text-slate-500">
                            ({item.roleOrCompany} &bull; {item.city})
                          </span>
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-400 font-mono">{item.createdAt}</span>
                          {item.status === 'disetujui' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Tampil di Website
                            </span>
                          )}
                          {item.status === 'menunggu_moderasi' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 animate-pulse">
                              <Clock className="w-3 h-3 text-amber-700" />
                              Perlu Persetujuan
                            </span>
                          )}
                          {item.status === 'ditolak' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
                              <XCircle className="w-3 h-3 text-rose-600" />
                              Ditolak (Disembunyikan)
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200">
                        "{item.comment}"
                      </p>

                      {/* Moderation Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                        <span className="text-[11px] text-slate-500 font-medium">
                          Layanan: <strong className="capitalize text-slate-700">{item.serviceType.replace('_', ' ')}</strong>
                        </span>

                        <div className="flex items-center gap-2">
                          {item.status !== 'disetujui' && (
                            <button
                              onClick={() => {
                                setTestimonials(testimonials.map(t => t.id === item.id ? { ...t, status: 'disetujui' } : t));
                                showNotification(`Ulasan dari ${item.name} berhasil disetujui dan kini tampil di website!`);
                              }}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Setujui & Publikasikan
                            </button>
                          )}

                          {item.status !== 'ditolak' && (
                            <button
                              onClick={() => {
                                setTestimonials(testimonials.map(t => t.id === item.id ? { ...t, status: 'ditolak' } : t));
                                showNotification(`Ulasan dari ${item.name} ditolak dan disembunyikan.`);
                              }}
                              className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              Tolak / Sembunyikan
                            </button>
                          )}

                          <button
                            onClick={() => {
                              if (confirm(`Hapus ulasan dari ${item.name}?`)) {
                                setTestimonials(testimonials.filter(t => t.id !== item.id));
                                showNotification('Ulasan berhasil dihapus.');
                              }
                            }}
                            className="text-rose-600 hover:text-rose-800 p-1.5 rounded hover:bg-rose-50 transition-colors"
                            title="Hapus Ulasan"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}

                {testimonials.filter((t) => testimonialFilter === 'semua' || t.status === testimonialFilter).length === 0 && (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    Tidak ada ulasan pada kategori filter ini.
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* TAB 7: PENGATURAN UMUM & BRANDING LOGO */}
        {activeTab === 'branding' && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <h3 className="font-extrabold text-slate-900 text-lg border-b border-slate-100 pb-3 flex items-center gap-2">
                <Settings className="w-5 h-5 text-amber-500" />
                Pengaturan Perusahaan, Kontak & Logo
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Nama Perusahaan Resmi:
                  </label>
                  <input
                    type="text"
                    value={companyProfile.name}
                    onChange={(e) => setCompanyProfile({ ...companyProfile, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Tagline Bisnis:
                  </label>
                  <input
                    type="text"
                    value={companyProfile.tagline}
                    onChange={(e) => setCompanyProfile({ ...companyProfile, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Nomor WhatsApp CS (Tanpa Tanda Plus):
                  </label>
                  <input
                    type="text"
                    value={companyProfile.whatsapp}
                    onChange={(e) => setCompanyProfile({ ...companyProfile, whatsapp: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Hotline Kantor:
                  </label>
                  <input
                    type="text"
                    value={companyProfile.phone}
                    onChange={(e) => setCompanyProfile({ ...companyProfile, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Alamat Kantor Pusat & Warehouse:
                  </label>
                  <textarea
                    rows={2}
                    value={companyProfile.address}
                    onChange={(e) => setCompanyProfile({ ...companyProfile, address: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                  />
                </div>

                {/* Custom Logo URL */}
                <div className="md:col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <span className="text-xs font-bold text-slate-700 block">
                    Pengaturan Logo Brand Cahaya Kargo:
                  </span>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="p-3 bg-white rounded-xl border border-slate-200 flex-shrink-0">
                      <CahayaKargoLogo customLogoUrl={companyProfile.logoUrl} />
                    </div>
                    <div className="flex-1 w-full">
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">
                        URL Gambar Logo Custom (Opsional):
                      </label>
                      <input
                        type="url"
                        placeholder="https://... atau kosongkan untuk logo vektor SVG bawaan"
                        value={companyProfile.logoUrl || ''}
                        onChange={(e) => setCompanyProfile({ ...companyProfile, logoUrl: e.target.value || undefined })}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => showNotification('Profil & pengaturan branding berhasil disimpan!')}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2"
                >
                  <Save className="w-3.5 h-3.5" />
                  Simpan Pengaturan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: MODUL ARTIKEL & EDUKASI LOGISTIK (SEO ORGANIK) */}
        {activeTab === 'artikel' && (
          <div className="space-y-6">
            
            {/* Header with Metrics & Actions */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-emerald-500/10 text-emerald-600 rounded-xl">
                    <BookOpen className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                      Modul Artikel Logistik & Edukasi
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-black px-2 py-0.5 rounded-full uppercase">
                        SEO Organik
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Kelola konten edukatif tips packing, jadwal kapal roro pelabuhan, dan update regulasi kargo untuk merajai ranking Google.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingArticle(null);
                    setShowArticleModal(true);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Artikel Baru
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Total Artikel Edukasi
                </span>
                <strong className="text-2xl font-black text-slate-900">
                  {articles.length}
                </strong>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Tips, Regulasi & Pelabuhan
                </span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Live di Website (Google)
                </span>
                <strong className="text-2xl font-black text-emerald-600">
                  {articles.filter(a => a.status === 'dipublikasikan').length}
                </strong>
                <span className="text-[11px] text-emerald-700 font-medium block mt-0.5">
                  Terindeks Search Engine
                </span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Total Pembaca (Views)
                </span>
                <strong className="text-2xl font-black text-blue-600">
                  {articles.reduce((acc, curr) => acc + (curr.viewsCount || 0), 0).toLocaleString('id-ID')}
                </strong>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Trafik Pembaca Organik
                </span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Rata-rata Skor SEO
                </span>
                <strong className="text-2xl font-black text-amber-500">
                  {articles.length > 0 
                    ? Math.round(articles.reduce((acc, curr) => acc + (curr.seoScore || 90), 0) / articles.length)
                    : 95}/100
                </strong>
                <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">
                  Sangat Optimal
                </span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={articleSearchQuery}
                  onChange={(e) => setArticleSearchQuery(e.target.value)}
                  placeholder="Cari judul, kata kunci, tagar..."
                  className="w-full bg-slate-50 pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* Category Dropdown */}
                <select
                  value={articleCategoryFilter}
                  onChange={(e) => setArticleCategoryFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700"
                >
                  <option value="Semua">Semua Kategori</option>
                  <option value="Tips Packing">Tips Packing</option>
                  <option value="Info Pelabuhan">Info Pelabuhan</option>
                  <option value="Update Regulasi">Update Regulasi</option>
                  <option value="Panduan Logistik">Panduan Logistik</option>
                  <option value="Studi Kasus">Studi Kasus</option>
                </select>

                {/* Status Dropdown */}
                <select
                  value={articleStatusFilter}
                  onChange={(e) => setArticleStatusFilter(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700"
                >
                  <option value="semua">Semua Status</option>
                  <option value="dipublikasikan">Dipublikasikan</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            {/* Articles Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                      <th className="p-4">Artikel & Meta SEO</th>
                      <th className="p-4">Kategori</th>
                      <th className="p-4">Kata Kunci Target</th>
                      <th className="p-4">Skor SEO</th>
                      <th className="p-4">Views</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {articles
                      .filter(art => {
                        const matchesCategory = articleCategoryFilter === 'Semua' || art.category === articleCategoryFilter;
                        const matchesStatus = articleStatusFilter === 'semua' || art.status === articleStatusFilter;
                        const matchesSearch = 
                          art.title.toLowerCase().includes(articleSearchQuery.toLowerCase()) ||
                          art.targetKeywords.toLowerCase().includes(articleSearchQuery.toLowerCase()) ||
                          art.tags.some(t => t.toLowerCase().includes(articleSearchQuery.toLowerCase())) ||
                          art.author.toLowerCase().includes(articleSearchQuery.toLowerCase());
                        return matchesCategory && matchesStatus && matchesSearch;
                      })
                      .map((art) => (
                        <tr key={art.id} className="hover:bg-slate-50/80 transition-colors">
                          
                          {/* Title & Thumbnail */}
                          <td className="p-4 max-w-sm">
                            <div className="flex items-start gap-3">
                              <img
                                src={art.coverImage}
                                alt={art.title}
                                className="w-14 h-12 rounded-lg object-cover border border-slate-200 shrink-0 bg-slate-100"
                              />
                              <div>
                                <h4 className="font-bold text-slate-900 line-clamp-2 leading-snug hover:text-emerald-600 transition-colors">
                                  {art.title}
                                </h4>
                                <div className="text-[11px] text-slate-400 font-mono mt-1 flex items-center gap-1">
                                  <Globe className="w-3 h-3 text-slate-400" />
                                  /{art.slug}
                                </div>
                                <div className="text-[10px] text-slate-400 mt-0.5">
                                  Oleh {art.author} • {art.publishedAt}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="p-4 whitespace-nowrap">
                            <span className="bg-slate-100 text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-md border border-slate-200">
                              {art.category}
                            </span>
                          </td>

                          {/* Target Keywords */}
                          <td className="p-4 max-w-xs">
                            <div className="text-slate-600 text-[11px] line-clamp-2 leading-relaxed">
                              {art.targetKeywords}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {art.tags.slice(0, 2).map((t, i) => (
                                <span key={i} className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded">
                                  #{t}
                                </span>
                              ))}
                            </div>
                          </td>

                          {/* SEO Score */}
                          <td className="p-4 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                                (art.seoScore || 90) >= 90
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : (art.seoScore || 90) >= 75
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}>
                                {art.seoScore || 90}/100
                              </span>
                              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            </div>
                          </td>

                          {/* Views */}
                          <td className="p-4 whitespace-nowrap text-slate-600 font-medium">
                            {art.viewsCount.toLocaleString('id-ID')}
                          </td>

                          {/* Status with Toggle */}
                          <td className="p-4 whitespace-nowrap">
                            <button
                              onClick={() => handleToggleArticleStatus(art.id)}
                              className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                                art.status === 'dipublikasikan'
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                  : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                              }`}
                              title="Klik untuk mengubah status"
                            >
                              <span className={`w-2 h-2 rounded-full ${art.status === 'dipublikasikan' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                              {art.status === 'dipublikasikan' ? 'Live di Web' : 'Draft'}
                            </button>
                          </td>

                          {/* Actions */}
                          <td className="p-4 whitespace-nowrap text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => handleOpenPreviewArticle(art)}
                                className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                title="Pratinjau Artikel"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              
                              <button
                                onClick={() => handleOpenEditArticle(art)}
                                className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                                title="Edit Artikel"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => handleDeleteArticle(art.id, art.title)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                title="Hapus Artikel"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>

                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {articles.length === 0 && (
                <div className="p-8 text-center text-slate-400">
                  Belum ada artikel logistik. Klik "Tambah Artikel Baru" untuk membuat postingan blog edukatif pertama Anda.
                </div>
              )}
            </div>

            {/* Organic SEO Education Box */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-lg border border-slate-700 space-y-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-amber-500 text-slate-950 rounded-lg">
                  <Sparkles className="w-4 h-4" />
                </span>
                <h4 className="font-bold text-sm text-amber-400">
                  Manfaat SEO Organik dari Artikel Logistik
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Artikel edukasi tentang <strong>Tips Packing</strong>, <strong>Jadwal Pelabuhan RoRo</strong>, dan <strong>Regulasi Zero ODOL Kemenhub</strong> menangkap pencarian kata kunci bervolume tinggi (*high intent*) dari pelaku industri, pemilik pabrik, dan distributor yang membutuhkan kepastian pengiriman kargo. Hal ini secara signifikan meningkatkan *dwell time* pengunjung, memperbanyak indeks halaman Google, dan menghasilkan leads pengiriman baru secara gratis tanpa biaya iklan.
              </p>
            </div>

          </div>
        )}

      </div>

      {/* MODAL 1: ADD NEW RESI */}
      {showAddResiModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
              <h4 className="font-bold text-sm">Terbitkan Resi / AWB Baru</h4>
              <button onClick={() => setShowAddResiModal(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateShipment} className="p-6 space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nomor Resi (Auto-Generated):</label>
                <input
                  type="text"
                  required
                  value={newResi.resiNumber}
                  onChange={(e) => setNewResi({ ...newResi, resiNumber: e.target.value })}
                  className="w-full px-3 py-2 border rounded font-mono font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nama Pengirim:</label>
                  <input
                    type="text"
                    required
                    value={newResi.senderName}
                    onChange={(e) => setNewResi({ ...newResi, senderName: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nama Penerima:</label>
                  <input
                    type="text"
                    required
                    value={newResi.recipientName}
                    onChange={(e) => setNewResi({ ...newResi, recipientName: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kota Asal:</label>
                  <input
                    type="text"
                    value={newResi.senderCity}
                    onChange={(e) => setNewResi({ ...newResi, senderCity: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kota Tujuan:</label>
                  <input
                    type="text"
                    value={newResi.recipientCity}
                    onChange={(e) => setNewResi({ ...newResi, recipientCity: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Berat (Kg):</label>
                  <input
                    type="number"
                    value={newResi.weightKg}
                    onChange={(e) => setNewResi({ ...newResi, weightKg: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Status Awal:</label>
                  <select
                    value={newResi.status}
                    onChange={(e) => setNewResi({ ...newResi, status: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="diterima_hub">Diterima di Hub</option>
                    <option value="dalam_perjalanan">Dalam Perjalanan</option>
                    <option value="sedang_dikirim">Sedang Dikirim</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Deskripsi Barang:</label>
                <input
                  type="text"
                  placeholder="Misal: Suku cadang mesin & baut baja"
                  value={newResi.goodsDescription}
                  onChange={(e) => setNewResi({ ...newResi, goodsDescription: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddResiModal(false)}
                  className="px-4 py-2 border rounded text-slate-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white font-bold rounded"
                >
                  Simpan & Terbitkan Resi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PRATINJAU SALINAN EMAIL MINGGUAN */}
      {showEmailPreviewModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in">
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400" />
                <span className="font-bold text-sm">Salinan Email: Laporan Performa Mingguan Cahaya Kargo</span>
              </div>
              <button onClick={() => setShowEmailPreviewModal(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            {/* Email Body Simulation */}
            <div className="p-6 bg-slate-100 max-h-[75vh] overflow-y-auto">
              <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
                {/* Email Header */}
                <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 p-6 text-white text-center">
                  <div className="flex justify-center mb-2">
                    <CahayaKargoLogo variant="white" className="h-8" />
                  </div>
                  <h4 className="font-black text-lg text-amber-400">Laporan Performa Mingguan Otomatis</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Periode: 10 Okt - 17 Okt 2026 | Dikirim untuk: {emailConfig.recipientEmail}
                  </p>
                </div>

                {/* Email Stats Body */}
                <div className="p-6 space-y-6 text-slate-800 text-xs">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 font-medium">
                    &bull; Status Website & Optimasi Google: <strong>SEO Score 98/100 (Terverifikasi GSC)</strong>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Visitor</span>
                      <strong className="text-lg text-slate-900">11.450</strong>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Leads Baru</span>
                      <strong className="text-lg text-amber-600">168</strong>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Resi Aktif</span>
                      <strong className="text-lg text-blue-600">{shipments.length}</strong>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Indeks Google</span>
                      <strong className="text-lg text-emerald-600">{seoConfig.gscIndexedPagesCount} Hal.</strong>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-900 mb-2">3 Rute Pengiriman Paling Banyak Dicari Minggu Ini:</h5>
                    <ol className="list-decimal pl-5 space-y-1 text-slate-600">
                      <li>Jakarta &rarr; Surabaya (Kargo Darat 2.500/kg) - 1.120 Pencarian</li>
                      <li>Jakarta &rarr; Medan (Kargo Laut & Udara) - 640 Pencarian</li>
                      <li>Jakarta &rarr; Balikpapan (Proyek IKN / Alat Berat) - 420 Pencarian</li>
                    </ol>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg text-[11px] text-slate-500 border border-slate-200">
                    Sistem ini terkonfigurasi otomatis untuk mengirim email rekapitulasi setiap hari <strong>{emailConfig.reportDay} pukul {emailConfig.reportTime}</strong>.
                  </div>
                </div>

                <div className="bg-slate-50 p-4 border-t border-slate-200 text-center text-[10px] text-slate-400">
                  PT Cahaya Kargo Indonesia &bull; Kawasan Pergudangan Marunda Center &bull; Layanan Logistik 24 Jam
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowEmailPreviewModal(false)}
                className="bg-slate-900 text-white font-bold px-5 py-2 rounded-xl text-xs"
              >
                Tutup Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADMIN ARTICLE EDITOR */}
      <AdminArticleModal
        isOpen={showArticleModal}
        onClose={() => {
          setShowArticleModal(false);
          setEditingArticle(null);
        }}
        onSave={handleSaveArticle}
        initialArticle={editingArticle}
      />

      {/* MODAL: ARTICLE PREVIEW (ADMIN READER) */}
      <ArticleDetailModal
        article={previewingArticle}
        isOpen={showPreviewModal}
        onClose={() => {
          setShowPreviewModal(false);
          setPreviewingArticle(null);
        }}
        allArticles={articles}
        onSelectArticle={(art) => setPreviewingArticle(art)}
        onOpenQuoteModal={() => {
          setShowPreviewModal(false);
          onViewPublicSite();
        }}
        companyProfile={companyProfile}
      />

    </div>
  );
};
