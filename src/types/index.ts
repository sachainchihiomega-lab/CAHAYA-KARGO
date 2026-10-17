export type ServiceType = 'darat' | 'laut' | 'udara' | 'sewa_truk' | 'pindahan';

export type ShipmentStatus = 
  | 'menunggu_pickup'
  | 'diterima_hub'
  | 'dalam_perjalanan'
  | 'transit_gudang'
  | 'sedang_dikirim'
  | 'selesai'
  | 'tertahan';

export interface TrackingCheckpoint {
  id: string;
  timestamp: string;
  location: string;
  status: ShipmentStatus;
  description: string;
  officerName?: string;
}

export interface TrackingShipment {
  resiNumber: string;
  senderName: string;
  senderPhone: string;
  senderCity: string;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  recipientCity: string;
  serviceType: ServiceType;
  goodsDescription: string;
  weightKg: number;
  colliCount: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  totalCost: number;
  paymentStatus: 'Lunas' | 'COD' | 'Tempo';
  status: ShipmentStatus;
  currentLocation: string;
  estimatedDelivery: string;
  createdAt: string;
  checkpoints: TrackingCheckpoint[];
  notes?: string;
}

export interface ShippingRate {
  id: string;
  origin: string;
  destination: string;
  serviceType: ServiceType;
  pricePerKg: number;
  minWeightKg: number;
  etdDays: string; // e.g. "2-3 Hari"
  notes?: string;
}

export interface QuoteRequest {
  id: string;
  name: string;
  company?: string;
  phone: string;
  email: string;
  origin: string;
  destination: string;
  serviceType: ServiceType;
  estimatedWeightKg: number;
  goodsType: string;
  notes?: string;
  status: 'baru' | 'dihubungi' | 'penawaran_dikirim' | 'deal' | 'batal';
  createdAt: string;
}

export interface VisitorLog {
  id: string;
  timestamp: string;
  ipMasked: string;
  city: string;
  device: string;
  browser: string;
  page: string;
  action: string;
  referrer: string;
}

export interface AnalyticsData {
  activeVisitors: number;
  todayPageviews: number;
  todayUniqueVisitors: number;
  avgDurationMinutes: number;
  bounceRatePercent: number;
  liveVisitorsList: {
    id: string;
    city: string;
    page: string;
    device: string;
    timeAgo: string;
  }[];
  historyTrend24h: { hour: string; visitors: number; pageviews: number }[];
  historyTrend7d: { date: string; visitors: number; pageviews: number; leads: number }[];
  topPages: { path: string; title: string; views: number; percentage: number }[];
  topReferrers: { source: string; visits: number; percentage: number }[];
  cityDistribution: { city: string; visits: number; percentage: number }[];
  deviceBreakdown: { type: string; percentage: number }[];
  recentEvents: VisitorLog[];
}

export interface SeoConfig {
  metaTitle: string;
  titleTemplate: string;
  metaDescription: string;
  metaKeywords: string;
  canonicalUrl: string;
  robotsMeta: 'index, follow' | 'noindex, follow' | 'index, nofollow' | 'noindex, nofollow';
  author: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogSiteName: string;
  twitterCard: 'summary' | 'summary_large_image';
  twitterCreator: string;
  gscVerificationCode: string;
  gscStatus: 'Terverifikasi' | 'Menunggu Verifikasi' | 'Belum Terhubung';
  gscLastCrawled: string;
  gscIndexedPagesCount: number;
  schemaType: 'LogisticsService' | 'LocalBusiness' | 'Organization';
  customSchemaJson: string;
  robotsTxt: string;
  sitemapAutoGenerate: boolean;
  sitemapLastUpdated: string;
}

export interface EmailReportConfig {
  enabled: boolean;
  recipientEmail: string;
  reportFrequency: 'weekly' | 'biweekly' | 'monthly';
  reportDay: string; // e.g. "Senin"
  reportTime: string; // e.g. "08:00 WIB"
  includeTrafficSummary: boolean;
  includeSeoHealth: boolean;
  includeLeadsAndQuotes: boolean;
  includeShipmentStats: boolean;
  lastSentAt?: string;
  history: {
    id: string;
    sentAt: string;
    recipient: string;
    status: 'Terkirim' | 'Gagal';
    summary: string;
  }[];
}

export interface CompanyProfile {
  name: string;
  shortName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  operatingHours: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  logoUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  roleOrCompany: string;
  city: string;
  rating: number; // 1 to 5
  serviceType: ServiceType;
  comment: string;
  status: 'menunggu_moderasi' | 'disetujui' | 'ditolak';
  createdAt: string;
  isVerifiedBuyer?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
}

export type ArticleCategory = 
  | 'Tips Packing' 
  | 'Info Pelabuhan' 
  | 'Update Regulasi' 
  | 'Panduan Logistik' 
  | 'Studi Kasus';

export type ArticleStatus = 'dipublikasikan' | 'draft';

export interface LogisticsArticle {
  id: string;
  title: string;
  slug: string;
  category: ArticleCategory;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  authorRole?: string;
  readTimeMinutes: number;
  tags: string[];
  targetKeywords: string;
  metaDescription: string;
  status: ArticleStatus;
  viewsCount: number;
  sharesCount: number;
  publishedAt: string;
  updatedAt?: string;
  seoScore?: number;
}

