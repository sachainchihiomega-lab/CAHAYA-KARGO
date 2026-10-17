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
  MessageSquare
} from 'lucide-react';
import { 
  AnalyticsData, 
  SeoConfig, 
  EmailReportConfig, 
  TrackingShipment, 
  ShippingRate, 
  QuoteRequest, 
  CompanyProfile,
  ShipmentStatus
} from '../../types';
import { CahayaKargoLogo } from '../CahayaKargoLogo';

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
  setQuotes
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'seo' | 'email' | 'resi' | 'tarif' | 'quotes' | 'branding'>('analytics');
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
                            className="text-xs bg-slate-800 text-white hover:bg-slate-700 px-2.5 py-1 rounded"
                          >
                            + Checkpoint
                          </button>
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

    </div>
  );
};
