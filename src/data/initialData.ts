import { 
  TrackingShipment, 
  ShippingRate, 
  QuoteRequest, 
  AnalyticsData, 
  SeoConfig, 
  EmailReportConfig, 
  CompanyProfile,
  Testimonial,
  LogisticsArticle
} from '../types';

export const initialCompanyProfile: CompanyProfile = {
  name: 'PT Samudra Lintas Artha',
  shortName: 'Mitra Kargo',
  tagline: 'Solusi Logistik & Ekspedisi Cerdas Berbasis AI Seluruh Nusantara',
  phone: '+62 878-8262-1638',
  whatsapp: '6287882621638',
  email: 'info@mitrakargo.net',
  address: 'Kawasan Pergudangan Logistik Terpadu Blok A5 No. 12, Jl. Cakung Cilincing Raya, Jakarta Utara 14120',
  operatingHours: 'Senin - Sabtu: 08.00 - 21.00 WIB (Customer Support 24/7)',
  instagram: 'https://instagram.com/mitrakargo.net',
  facebook: 'https://facebook.com/mitrakargoid',
  linkedin: 'https://linkedin.com/company/samudra-lintas-artha',
};

export const indonesianCities = [
  'Jakarta (Jabodetabek)',
  'Surabaya',
  'Bandung',
  'Semarang',
  'Yogyakarta',
  'Solo',
  'Malang',
  'Medan',
  'Palembang',
  'Pekanbaru',
  'Bandar Lampung',
  'Padang',
  'Batam',
  'Denpasar (Bali)',
  'Mataram (Lombok)',
  'Makassar',
  'Manado',
  'Balikpapan',
  'Samarinda',
  'Banjarmasin',
  'Pontianak',
  'Jayapura',
  'Ambon',
  'Kupang'
];

export const initialRates: ShippingRate[] = [
  // Dari Jakarta
  { id: 'rate-1', origin: 'Jakarta (Jabodetabek)', destination: 'Surabaya', serviceType: 'darat', pricePerKg: 2500, minWeightKg: 50, etdDays: '2-3 Hari', notes: 'Door to door via Tol Trans Jawa' },
  { id: 'rate-2', origin: 'Jakarta (Jabodetabek)', destination: 'Surabaya', serviceType: 'udara', pricePerKg: 18500, minWeightKg: 10, etdDays: '1 Hari (Next Day)', notes: 'Prioritas Cargo Udara CGK-SUB' },
  { id: 'rate-3', origin: 'Jakarta (Jabodetabek)', destination: 'Surabaya', serviceType: 'sewa_truk', pricePerKg: 1800, minWeightKg: 2000, etdDays: '1-2 Hari', notes: 'CDD Long Box Full Charter' },
  
  { id: 'rate-4', origin: 'Jakarta (Jabodetabek)', destination: 'Medan', serviceType: 'darat', pricePerKg: 4500, minWeightKg: 50, etdDays: '4-5 Hari', notes: 'Via Lintas Timur Sumatera' },
  { id: 'rate-5', origin: 'Jakarta (Jabodetabek)', destination: 'Medan', serviceType: 'laut', pricePerKg: 3500, minWeightKg: 100, etdDays: '5-7 Hari', notes: 'Kapal Cargo Roro Tanjung Priok ke Belawan' },
  { id: 'rate-6', origin: 'Jakarta (Jabodetabek)', destination: 'Medan', serviceType: 'udara', pricePerKg: 28000, minWeightKg: 10, etdDays: '1-2 Hari', notes: 'Prioritas Udara Port to Door' },
  
  { id: 'rate-7', origin: 'Jakarta (Jabodetabek)', destination: 'Makassar', serviceType: 'laut', pricePerKg: 4200, minWeightKg: 50, etdDays: '4-6 Hari', notes: 'Kapal Cepat Kontainer FCL/LCL' },
  { id: 'rate-8', origin: 'Jakarta (Jabodetabek)', destination: 'Makassar', serviceType: 'udara', pricePerKg: 32000, minWeightKg: 10, etdDays: '1-2 Hari', notes: 'Air Cargo Express' },
  
  { id: 'rate-9', origin: 'Jakarta (Jabodetabek)', destination: 'Balikpapan', serviceType: 'laut', pricePerKg: 4500, minWeightKg: 50, etdDays: '5-7 Hari', notes: 'Kapal Pelni / Roro Tanjung Perak Hub' },
  { id: 'rate-10', origin: 'Jakarta (Jabodetabek)', destination: 'Balikpapan', serviceType: 'udara', pricePerKg: 34000, minWeightKg: 10, etdDays: '1-2 Hari', notes: 'Air Cargo Express Bandara SAMS Sepinggan' },
  
  { id: 'rate-11', origin: 'Jakarta (Jabodetabek)', destination: 'Denpasar (Bali)', serviceType: 'darat', pricePerKg: 3500, minWeightKg: 50, etdDays: '3-4 Hari', notes: 'Via Tol Trans Jawa & Penyeberangan Ketapang-Gilimanuk' },
  { id: 'rate-12', origin: 'Jakarta (Jabodetabek)', destination: 'Semarang', serviceType: 'darat', pricePerKg: 2000, minWeightKg: 50, etdDays: '1-2 Hari', notes: 'Tol Trans Jawa One-Day Service' },
  { id: 'rate-13', origin: 'Jakarta (Jabodetabek)', destination: 'Palembang', serviceType: 'darat', pricePerKg: 3000, minWeightKg: 50, etdDays: '2-3 Hari', notes: 'Tol Bakauheni - Palembang' },
  { id: 'rate-14', origin: 'Jakarta (Jabodetabek)', destination: 'Pontianak', serviceType: 'laut', pricePerKg: 3800, minWeightKg: 100, etdDays: '4-6 Hari', notes: 'Kapal Cargo Tanjung Priok - Dwikora Pontianak' },
  
  // Dari Surabaya
  { id: 'rate-15', origin: 'Surabaya', destination: 'Makassar', serviceType: 'laut', pricePerKg: 3500, minWeightKg: 50, etdDays: '3-4 Hari', notes: 'Direct Hub Tanjung Perak' },
  { id: 'rate-16', origin: 'Surabaya', destination: 'Banjarmasin', serviceType: 'laut', pricePerKg: 3200, minWeightKg: 50, etdDays: '2-3 Hari', notes: 'Kapal Roro Cepat Tanjung Perak' },
  { id: 'rate-17', origin: 'Surabaya', destination: 'Jakarta (Jabodetabek)', serviceType: 'darat', pricePerKg: 2300, minWeightKg: 50, etdDays: '2-3 Hari', notes: 'Tol Trans Jawa Door to Door' }
];

export const initialShipments: TrackingShipment[] = [
  {
    resiNumber: 'CK-889210',
    senderName: 'PT Mega Sukses Sentosa',
    senderPhone: '08119827364',
    senderCity: 'Jakarta (Jabodetabek)',
    recipientName: 'CV Sumber Makmur Abadi',
    recipientPhone: '08123984711',
    recipientAddress: 'Jl. Rungkut Industri III No. 45, Kompleks SIER, Surabaya',
    recipientCity: 'Surabaya',
    serviceType: 'darat',
    goodsDescription: 'Suku Cadang Mesin Industri & Kabel Tembaga',
    weightKg: 280,
    colliCount: 6,
    dimensions: { length: 120, width: 80, height: 90 },
    totalCost: 700000,
    paymentStatus: 'Lunas',
    status: 'sedang_dikirim',
    currentLocation: 'Hub Distribusi Surabaya Timur',
    estimatedDelivery: 'Hari ini, estimasi pukul 16:30 WIB',
    createdAt: '2026-10-15 09:30 WIB',
    notes: 'Prioritas handling, hindari tumpukan basah.',
    checkpoints: [
      {
        id: 'cp-1',
        timestamp: '15 Okt 2026, 09:30 WIB',
        location: 'Drop Point Cakung, Jakarta Timur',
        status: 'menunggu_pickup',
        description: 'Paket telah diterima di loket gudang Mitra Kargo Cakung dan selesai ditimbang (280 Kg).',
        officerName: 'Bambang S.'
      },
      {
        id: 'cp-2',
        timestamp: '15 Okt 2026, 14:15 WIB',
        location: 'Sorting Hub Marunda, Jakarta Utara',
        status: 'diterima_hub',
        description: 'Paket telah disortir dan dimasukkan ke dalam Armada Truk Tronton B-9481-TEX tujuan Surabaya.',
        officerName: 'Hendra Wijaya'
      },
      {
        id: 'cp-3',
        timestamp: '15 Okt 2026, 21:00 WIB',
        location: 'Tol Trans Jawa (KM 220 Cirebon)',
        status: 'dalam_perjalanan',
        description: 'Armada dalam perjalanan melintasi Tol Trans Jawa menuju Hub Jawa Timur.',
        officerName: 'Driver: Supriyadi'
      },
      {
        id: 'cp-4',
        timestamp: '16 Okt 2026, 06:45 WIB',
        location: 'Hub Transit Utama Tambak Sawah, Sidoarjo',
        status: 'transit_gudang',
        description: 'Muatan tiba dengan aman di Warehouse Utama Sidoarjo. Unloading dan cross-check dokumen jalan.',
        officerName: 'Agus Santoso'
      },
      {
        id: 'cp-5',
        timestamp: '17 Okt 2026, 08:30 WIB',
        location: 'Hub Distribusi Surabaya Timur',
        status: 'sedang_dikirim',
        description: 'Paket dibawa kurir armada CDD Box (Driver: Joko Purwanto - 081399881122) menuju alamat penerima.',
        officerName: 'Joko Purwanto'
      }
    ]
  },
  {
    resiNumber: 'CK-772154',
    senderName: 'Toko Elektronik Gemilang',
    senderPhone: '08138291029',
    senderCity: 'Jakarta (Jabodetabek)',
    recipientName: 'Dr. Antonius Wicaksono',
    recipientPhone: '08527819200',
    recipientAddress: 'Jl. Merdeka No. 18, Pusat Kota Medan, Sumatera Utara',
    recipientCity: 'Medan',
    serviceType: 'udara',
    goodsDescription: 'Peralatan Medis & Komponen Server',
    weightKg: 35,
    colliCount: 2,
    dimensions: { length: 50, width: 45, height: 40 },
    totalCost: 980000,
    paymentStatus: 'Lunas',
    status: 'selesai',
    currentLocation: 'Alamat Penerima Medan (Terkirim)',
    estimatedDelivery: '16 Okt 2026 (Terkirim)',
    createdAt: '2026-10-14 11:20 WIB',
    notes: 'Packing kayu & bubble wrap tebal asuransi all-risk.',
    checkpoints: [
      {
        id: 'cp-10',
        timestamp: '14 Okt 2026, 11:20 WIB',
        location: 'Cargo Terminal Bandara Soekarno-Hatta (CGK)',
        status: 'diterima_hub',
        description: 'Barang lolos security screening X-Ray dan siap loading penerbangan pagi.',
        officerName: 'Air Cargo Ops'
      },
      {
        id: 'cp-11',
        timestamp: '15 Okt 2026, 08:45 WIB',
        location: 'Bandara Kualanamu (KNO) Medan',
        status: 'transit_gudang',
        description: 'Barang tiba di Cargo Warehouse Kualanamu, dokumen manifest telah di-cleared.',
        officerName: 'Rizal Fahmi'
      },
      {
        id: 'cp-12',
        timestamp: '16 Okt 2026, 14:10 WIB',
        location: 'Jl. Merdeka No. 18 Medan',
        status: 'selesai',
        description: 'Paket telah diterima langsung oleh Dr. Antonius Wicaksono dalam kondisi segel baik & utuh.',
        officerName: 'Kurir Express: Andi Pratama'
      }
    ]
  },
  {
    resiNumber: 'CK-663891',
    senderName: 'PT Nusantara Agro Sejahtera',
    senderPhone: '08129837162',
    senderCity: 'Surabaya',
    recipientName: 'Koperasi Mina Samudera',
    recipientPhone: '08137788990',
    recipientAddress: 'Kompleks Pelabuhan Paotere No. 12, Makassar',
    recipientCity: 'Makassar',
    serviceType: 'laut',
    goodsDescription: 'Pakan Ikan & Peralatan Budidaya Marin',
    weightKg: 1450,
    colliCount: 40,
    dimensions: { length: 200, width: 120, height: 160 },
    totalCost: 5075000,
    paymentStatus: 'Tempo',
    status: 'dalam_perjalanan',
    currentLocation: 'Laut Jawa (Kapal KM Dharma Kencana VII)',
    estimatedDelivery: '19 Okt 2026',
    createdAt: '2026-10-16 16:00 WIB',
    checkpoints: [
      {
        id: 'cp-20',
        timestamp: '16 Okt 2026, 16:00 WIB',
        location: 'Warehouse Pelabuhan Tanjung Perak Surabaya',
        status: 'diterima_hub',
        description: 'Muatan 1.450 Kg dimasukkan ke dalam Kontainer LCL No. CK-TC-0922.',
        officerName: 'Tim Logistik Pelabuhan'
      },
      {
        id: 'cp-21',
        timestamp: '17 Okt 2026, 04:30 WIB',
        location: 'Perairan Laut Jawa Menuju Selat Makassar',
        status: 'dalam_perjalanan',
        description: 'Kapal berlayar sesuai jadwal. Posisi cuaca terpantau aman dan ombak stabil.',
        officerName: 'Nahkoda / Vessel Tracking'
      }
    ]
  }
];

export const initialQuotes: QuoteRequest[] = [
  {
    id: 'quote-101',
    name: 'Budi Hartono',
    company: 'PT Sentosa Baja Persada',
    phone: '081288339911',
    email: 'budi.hartono@sentosabaja.com',
    origin: 'Jakarta (Jabodetabek)',
    destination: 'Balikpapan',
    serviceType: 'sewa_truk',
    estimatedWeightKg: 8500,
    goodsType: 'Pipa Besi & Konstruksi Proyek IKN',
    notes: 'Butuh armada Fuso Bak Terbuka dengan terpal tebal, pengiriman tanggal 25 Oktober.',
    status: 'baru',
    createdAt: '17 Okt 2026, 08:15 WIB'
  },
  {
    id: 'quote-102',
    name: 'Siti Rahmawati',
    company: 'CV Kuliner Nusantara',
    phone: '085712349876',
    email: 'siti@kulinernusantara.id',
    origin: 'Bandung',
    destination: 'Medan',
    serviceType: 'darat',
    estimatedWeightKg: 350,
    goodsType: 'Keripik & Bumbu Olahan Kering',
    notes: 'Packing karton standar, butuh asuransi barang makanan olahan.',
    status: 'dihubungi',
    createdAt: '16 Okt 2026, 15:40 WIB'
  },
  {
    id: 'quote-103',
    name: 'Denny Prasetya',
    company: 'Pribadi (Pindahan Rumah)',
    phone: '081399887766',
    email: 'denny.prasetya@gmail.com',
    origin: 'Jakarta (Jabodetabek)',
    destination: 'Denpasar (Bali)',
    serviceType: 'pindahan',
    estimatedWeightKg: 1200,
    goodsType: 'Perabot Rumah Tangga & Elektronik',
    notes: 'Butuh jasa packing bubble wrap dan bongkar muat di lokasi Denpasar.',
    status: 'penawaran_dikirim',
    createdAt: '15 Okt 2026, 11:20 WIB'
  }
];

export const initialAnalytics: AnalyticsData = {
  activeVisitors: 38,
  todayPageviews: 2842,
  todayUniqueVisitors: 1248,
  avgDurationMinutes: 4.2,
  bounceRatePercent: 28.4,
  liveVisitorsList: [
    { id: 'lv-1', city: 'Jakarta Pusat', page: '/cek-ongkir?asal=Jakarta&tujuan=Surabaya', device: 'Mobile Chrome (Android)', timeAgo: '2 detik lalu' },
    { id: 'lv-2', city: 'Surabaya', page: '/lacak-resi?no=CK-889210', device: 'Desktop Chrome (Windows 11)', timeAgo: '6 detik lalu' },
    { id: 'lv-3', city: 'Medan', page: '/layanan/kargo-laut', device: 'Mobile Safari (iOS 18)', timeAgo: '14 detik lalu' },
    { id: 'lv-4', city: 'Makassar', page: '/kontak-cabang', device: 'Mobile Chrome', timeAgo: '22 detik lalu' },
    { id: 'lv-5', city: 'Semarang', page: '/kalkulator-volume', device: 'Desktop Firefox', timeAgo: '35 detik lalu' },
    { id: 'lv-6', city: 'Balikpapan', page: '/sewa-truk-tronton', device: 'Desktop Edge', timeAgo: '48 detik lalu' },
    { id: 'lv-7', city: 'Bandung', page: '/cek-ongkir', device: 'Mobile Chrome', timeAgo: '1 menit lalu' },
    { id: 'lv-8', city: 'Palembang', page: '/lacak-resi', device: 'Mobile Samsung Browser', timeAgo: '1 menit lalu' }
  ],
  historyTrend24h: [
    { hour: '00:00', visitors: 18, pageviews: 45 },
    { hour: '02:00', visitors: 8, pageviews: 21 },
    { hour: '04:00', visitors: 12, pageviews: 32 },
    { hour: '06:00', visitors: 34, pageviews: 89 },
    { hour: '08:00', visitors: 142, pageviews: 380 },
    { hour: '10:00', visitors: 265, pageviews: 690 },
    { hour: '12:00', visitors: 198, pageviews: 520 },
    { hour: '14:00', visitors: 289, pageviews: 740 },
    { hour: '16:00', visitors: 245, pageviews: 610 },
    { hour: '18:00', visitors: 178, pageviews: 430 },
    { hour: '20:00', visitors: 135, pageviews: 310 },
    { hour: '22:00', visitors: 68, pageviews: 165 }
  ],
  historyTrend7d: [
    { date: '11 Okt', visitors: 1420, pageviews: 3890, leads: 18 },
    { date: '12 Okt', visitors: 1580, pageviews: 4120, leads: 22 },
    { date: '13 Okt', visitors: 1390, pageviews: 3750, leads: 15 },
    { date: '14 Okt', visitors: 1650, pageviews: 4420, leads: 28 },
    { date: '15 Okt', visitors: 1720, pageviews: 4680, leads: 31 },
    { date: '16 Okt', visitors: 1890, pageviews: 5120, leads: 35 },
    { date: '17 Okt (Hari ini)', visitors: 1248, pageviews: 2842, leads: 19 }
  ],
  topPages: [
    { path: '/cek-ongkir', title: 'Kalkulator Tarif & Cek Ongkir Kargo', views: 1120, percentage: 39.4 },
    { path: '/lacak-resi', title: 'Lacak Pengiriman Resi Online Real-time', views: 840, percentage: 29.5 },
    { path: '/', title: 'Beranda – Ekspedisi & Logistik Terpercaya', views: 560, percentage: 19.7 },
    { path: '/layanan/kargo-darat', title: 'Jasa Kargo Darat Door-to-Door', views: 190, percentage: 6.7 },
    { path: '/layanan/sewa-truk', title: 'Sewa Truk CDD, Fuso, Tronton Wingbox', views: 132, percentage: 4.7 }
  ],
  topReferrers: [
    { source: 'Google Organic Search (SEO)', visits: 1480, percentage: 52.1 },
    { source: 'Direct / Bookmark', visits: 620, percentage: 21.8 },
    { source: 'WhatsApp Web & Share', visits: 410, percentage: 14.4 },
    { source: 'Google Ads (Search)', visits: 210, percentage: 7.4 },
    { source: 'Instagram / LinkedIn Profile', visits: 122, percentage: 4.3 }
  ],
  cityDistribution: [
    { city: 'Jakarta & Bodetabek', visits: 1180, percentage: 41.5 },
    { city: 'Surabaya & Sidoarjo', visits: 590, percentage: 20.8 },
    { city: 'Medan & Deli Serdang', visits: 310, percentage: 10.9 },
    { city: 'Bandung & Cimahi', visits: 240, percentage: 8.4 },
    { city: 'Semarang & Solo', visits: 190, percentage: 6.7 },
    { city: 'Makassar', visits: 160, percentage: 5.6 },
    { city: 'Kota Lainnya', visits: 172, percentage: 6.1 }
  ],
  deviceBreakdown: [
    { type: 'Mobile (Android & iOS)', percentage: 68.2 },
    { type: 'Desktop (Windows & Mac)', percentage: 28.5 },
    { type: 'Tablet & Lainnya', percentage: 3.3 }
  ],
  recentEvents: [
    {
      id: 'ev-1',
      timestamp: '17 Okt 2026, 08:39 WIB',
      ipMasked: '182.253.xx.xx',
      city: 'Jakarta Utara',
      device: 'Mobile Android',
      browser: 'Chrome 130',
      page: '/cek-ongkir',
      action: 'Hitung Ongkir: Jakarta -> Surabaya 150kg (Kargo Darat)',
      referrer: 'Google Organic'
    },
    {
      id: 'ev-2',
      timestamp: '17 Okt 2026, 08:38 WIB',
      ipMasked: '114.125.xx.xx',
      city: 'Surabaya',
      device: 'Desktop Windows',
      browser: 'Chrome 129',
      page: '/lacak-resi',
      action: 'Tracking Resi: CK-889210 (Status: Sedang Dikirim)',
      referrer: 'Direct'
    },
    {
      id: 'ev-3',
      timestamp: '17 Okt 2026, 08:36 WIB',
      ipMasked: '180.244.xx.xx',
      city: 'Medan',
      device: 'Mobile iOS',
      browser: 'Safari',
      page: '/minta-penawaran',
      action: 'Submit Form Penawaran: Kargo Laut 8.5 Ton',
      referrer: 'Google Organic'
    },
    {
      id: 'ev-4',
      timestamp: '17 Okt 2026, 08:34 WIB',
      ipMasked: '103.111.xx.xx',
      city: 'Makassar',
      device: 'Desktop MacOS',
      browser: 'Chrome 130',
      page: '/layanan/kargo-laut',
      action: 'Melihat Detail Jadwal Kapal Roro Tanjung Perak - Soekarno Hatta',
      referrer: 'Google Organic'
    }
  ]
};

export const initialSeoConfig: SeoConfig = {
  metaTitle: 'Mitra Kargo – PT Samudra Lintas Artha | Ekspedisi Cerdas Berbasis AI Seluruh Indonesia',
  titleTemplate: '%s | PT Samudra Lintas Artha (Mitra Kargo)',
  metaDescription: 'PT Samudra Lintas Artha (Mitra Kargo): Ekspedisi pengiriman kargo cerdas berbasis Artificial Intelligence (AI). Solusi optimasi rute armada, kalkulasi tarif akurat, dan automasi supply chain bisnis darat, laut, udara ke seluruh Nusantara di mitrakargo.net.',
  metaKeywords: 'mitra kargo, pt samudra lintas artha, logistik ai, ekspedisi cerdas ai, ai logistics indonesia, kargo darat termurah, kargo laut kontainer, kargo udara express, cek resi mitra kargo, sewa truk fuso cdd wingbox, kirim barang besar antar pulau',
  canonicalUrl: 'https://mitrakargo.net',
  robotsMeta: 'index, follow',
  author: 'PT Samudra Lintas Artha',
  ogTitle: 'Mitra Kargo – PT Samudra Lintas Artha | Ekspedisi Cerdas Berbasis AI Seluruh Indonesia',
  ogDescription: 'Bisnis Anda lebih hemat dan efisien dengan ekspedisi kargo berbasis AI dari PT Samudra Lintas Artha (Mitra Kargo). Layanan Darat, Laut, Udara & Sewa Truk Door-to-Door seluruh wilayah Indonesia.',
  ogImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
  ogSiteName: 'Mitra Kargo - PT Samudra Lintas Artha',
  twitterCard: 'summary_large_image',
  twitterCreator: '@mitrakargo',
  gscVerificationCode: 'MK-VERIFY-GOOGLE-SEARCH-CONSOLE-2026',
  gscStatus: 'Terverifikasi',
  gscLastCrawled: '18 Okt 2026, 04:12 WIB',
  gscIndexedPagesCount: 52,
  schemaType: 'LogisticsService',
  customSchemaJson: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LogisticsService",
    "name": "PT Samudra Lintas Artha",
    "alternateName": "Mitra Kargo",
    "description": "Layanan ekspedisi dan pengiriman kargo skala besar melalui darat, laut, dan udara ke seluruh pelosok Nusantara oleh PT Samudra Lintas Artha.",
    "url": "https://mitrakargo.net",
    "telephone": "+62-878-8262-1638",
    "email": "info@mitrakargo.net",
    "priceRange": "$$",
    "areaServed": {
      "@type": "Country",
      "name": "Indonesia"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kawasan Pergudangan Logistik Terpadu Blok A5 No. 12, Jl. Cakung Cilincing Raya",
      "addressLocality": "Jakarta Utara",
      "addressRegion": "DKI Jakarta",
      "postalCode": "14120",
      "addressCountry": "ID"
    }
  }, null, 2),
  robotsTxt: `User-agent: *
Allow: /
Allow: /cek-ongkir
Allow: /lacak-resi
Allow: /layanan
Allow: /rute
Allow: /blog
Disallow: /admin
Disallow: /api/admin/
Disallow: /private/

Sitemap: https://mitrakargo.net/sitemap.xml`,
  sitemapAutoGenerate: true,
  sitemapLastUpdated: '18 Okt 2026, 00:00 WIB'
};

export const initialEmailReportConfig: EmailReportConfig = {
  enabled: true,
  recipientEmail: 'sachainchihiomega@gmail.com',
  reportFrequency: 'weekly',
  reportDay: 'Senin',
  reportTime: '08:00 WIB',
  includeTrafficSummary: true,
  includeSeoHealth: true,
  includeLeadsAndQuotes: true,
  includeShipmentStats: true,
  lastSentAt: '12 Okt 2026, 08:00 WIB',
  history: [
    {
      id: 'rep-01',
      sentAt: '12 Okt 2026, 08:00 WIB',
      recipient: 'sachainchihiomega@gmail.com',
      status: 'Terkirim',
      summary: 'Laporan Mingguan Minggu ke-41: 11.240 Visitor (+14.2%), 182 Leads Baru, Skor SEO: 96/100, 24 Resi Baru Aktif.'
    },
    {
      id: 'rep-02',
      sentAt: '05 Okt 2026, 08:00 WIB',
      recipient: 'sachainchihiomega@gmail.com',
      status: 'Terkirim',
      summary: 'Laporan Mingguan Minggu ke-40: 9.840 Visitor (+8.5%), 154 Leads Baru, Skor SEO: 94/100, 19 Resi Baru Aktif.'
    }
  ]
};

export const initialTestimonials: Testimonial[] = [
  {
    id: 'testi-1',
    name: 'Budi Santoso',
    roleOrCompany: 'Direktur Operasional PT Indoprima Niaga',
    city: 'Surabaya',
    rating: 5,
    serviceType: 'darat',
    comment: 'Sudah 2 tahun berlangganan pengiriman suku cadang mesin pabrik Jakarta-Surabaya via Mitra Kargo (PT Samudra Lintas Artha). Pengiriman door-to-door selalu on-time, armada truk CDD dan Fuso sangat bersih, dan resinya bisa dilacak real-time.',
    status: 'disetujui',
    createdAt: '15 Okt 2026',
    isVerifiedBuyer: true
  },
  {
    id: 'testi-2',
    name: 'Hj. Ratna Sari Dewi',
    roleOrCompany: 'Owner Grosir Tekstil Pasar Tanah Abang',
    city: 'Jakarta',
    rating: 5,
    serviceType: 'laut',
    comment: 'Kirim roll kain partai besar ke Makassar dan Banjarmasin paling hemat pakai Kargo Laut Mitra Kargo. Tarif kontainer LCL-nya ramah UMKM, barang dibungkus plastik kedap air jadi aman tidak basah.',
    status: 'disetujui',
    createdAt: '14 Okt 2026',
    isVerifiedBuyer: true
  },
  {
    id: 'testi-3',
    name: 'Ir. Hendarto Prabowo',
    roleOrCompany: 'Project Manager Konstruksi IKN',
    city: 'Balikpapan',
    rating: 5,
    serviceType: 'sewa_truk',
    comment: 'Sewa Tronton Wingbox untuk angkut material konstruksi ke Kariangau Balikpapan berjalan sangat lancar. Supir disiplin, perlengkapan lashing safety lengkap, dan dokumen surat jalan lengkap.',
    status: 'disetujui',
    createdAt: '12 Okt 2026',
    isVerifiedBuyer: true
  },
  {
    id: 'testi-4',
    name: 'Dr. Antonius Wicaksono',
    roleOrCompany: 'Klinik Medika Sejahtera',
    city: 'Medan',
    rating: 5,
    serviceType: 'udara',
    comment: 'Peralatan lab diagnostik urgent dari Cengkareng ke Kualanamu sampai hanya dalam 1 hari! Packing kayu kuat dan tim CS sangat proaktif memantau status resi.',
    status: 'disetujui',
    createdAt: '10 Okt 2026',
    isVerifiedBuyer: true
  },
  {
    id: 'testi-5',
    name: 'Agus Setiawan',
    roleOrCompany: 'Pribadi (Pindahan Rumah)',
    city: 'Denpasar (Bali)',
    rating: 5,
    serviceType: 'pindahan',
    comment: 'Pindahan seisi rumah dari Jakarta Selatan ke Sanur Bali ditangani sangat profesional. Semua perabot kaca di-bubble wrap tebal, tidak ada satu pun yang lecet.',
    status: 'menunggu_moderasi',
    createdAt: '16 Okt 2026',
    isVerifiedBuyer: true
  },
  {
    id: 'testi-6',
    name: 'Maya Angela',
    roleOrCompany: 'Distributor Skincare & Kosmetik',
    city: 'Bandung',
    rating: 4,
    serviceType: 'darat',
    comment: 'Tarifnya terjangkau dan respon admin WA cepat sekali. Harap dipertahankan kecepatannya.',
    status: 'menunggu_moderasi',
    createdAt: '17 Okt 2026',
    isVerifiedBuyer: false
  }
];

export const initialArticles: LogisticsArticle[] = [
  {
    id: 'art-1',
    title: 'Panduan Lengkap Standar Packing Kayu & Bubble Wrap Kargo: Proteksi Maksimal Alat Berat, Mesin & Elektronik Antar Pulau',
    slug: 'panduan-standar-packing-kayu-kargo-mesin-elektronik-antar-pulau',
    category: 'Tips Packing',
    excerpt: 'Pelajari SOP packing kayu berstandar ISPM 15, ketebalan bubble wrap berlapis, silica gel anti-kelembaban laut, dan teknik strapping pallet untuk mencegah risiko benturan selama pengiriman darat dan laut.',
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    author: 'Tim Ahli Kemasan Mitra Kargo',
    authorRole: 'Senior Packaging Specialist',
    readTimeMinutes: 6,
    tags: ['TipsPacking', 'PackingKayu', 'KargoAman', 'SOPLogistik', 'AntiBanting'],
    targetKeywords: 'tips packing kayu kargo, packing barang elektronik ekspedisi, standar packing bubble wrap antar pulau, SOP palet kayu',
    metaDescription: 'Panduan teknis pengemasan kargo berat dan barang pecah belah dengan peti kayu berstandar ISPM 15, wrapping kedap air, dan label fragile agar aman sampai tujuan.',
    status: 'dipublikasikan',
    viewsCount: 1420,
    sharesCount: 88,
    publishedAt: '15 Okt 2026',
    seoScore: 96,
    content: `## Mengapa Standar Packing Sangat Kritis dalam Ekspedisi Kargo?

Pengiriman kargo antar pulau di Indonesia melibatkan kombinasi moda darat (truk melintasi medan bergelombang) dan moda laut (guncangan ombak pelayaran dan kelembaban udara laut tinggi). Menggunakan kardus standar tanpa perkuatan berisiko tinggi menyebabkan deformasi fisik atau kerusakan komponen internal barang bernilai tinggi.

### 1. Kriteria Kayu yang Memenuhi Standar Ekspedisi
- **Jenis Kayu:** Gunakan kayu sengon, meranti, atau kayu lapis (plywood) tebal minimal 15mm-18mm yang telah diserut rata.
- **Sertifikasi Fumigasi ISPM 15:** Sangat penting untuk rute pelayaran tertentu agar kayu bebas dari hama rayap atau serangga perusak.
- **Rangka Kokoh & Tulang Diagonal:** Tambahkan palang diagonal (cross-brace) pada setiap sisi peti untuk menahan beban tumpukan saat proses *stacking* di dalam kontainer atau bak truk.

### 2. Formulasi Lapisan Pelindung (Layering Technique)
1. **Lapisan Pertama (Stretch Film Kedap Air):** Bungkus mesin atau barang dengan plastik stretch film 3 lapis untuk melindungi dari percikan air, embun garam laut, dan debu transit.
2. **Lapisan Kedua (Bubble Wrap Tebal Heavy Duty):** Gunakan bubble wrap gelembung besar minimal 2 hingga 3 putaran. Berikan bantalan ekstra pada sudut-sudut runcing atau bagian panel kaca/layar.
3. **Lapisan Ketiga (Corner Guard & Styrofoam 2 cm):** Tempelkan styrofoam dengan densitas tinggi pada sisi bawah dan atas agar guncangan vertikal teredam sempurna.
4. **Lapisan Keempat (Peti Kayu / Pallet Base):** Rapatkan peti kayu dengan paku ulir atau baut agar tidak mudah renggang. Pastikan bagian bawah memiliki rongga forklift (*pallet friendly*).

### 3. Pemberian Label Keamanan Internasional
Jangan lupa memasang stiker penandaan:
- **This Side Up (Panah Menghadap Atas):** Mencegah barang diletakkan terbalik.
- **Fragile / Mudah Pecah:** Memberikan instruksi ke operator forklift untuk mengangkat dengan kecepatan rendah.
- **Keep Dry (Simbol Payung):** Wajib diletakkan di area tertutup / tidak terkena hujan langsung.

> **💡 Rekomendasi Mitra Kargo:** Semua pengiriman mesin pabrik, genset, sparepart otomotif, server, dan alat kesehatan di Mitra Kargo (PT Samudra Lintas Artha) otomatis mendapatkan opsi layanan pembuatan peti kayu kustom langsung di gudang asal kami dengan garansi presisi.`
  },
  {
    id: 'art-2',
    title: 'Info Terkini Pelabuhan Tanjung Priok, Tanjung Perak & Makassar: Jadwal Kapal Roro, Estimasi Dwell Time & Alur Gate-In 2026',
    slug: 'info-pelabuhan-tanjung-priok-perak-makassar-jadwal-roro-dwell-time-2026',
    category: 'Info Pelabuhan',
    excerpt: 'Panduan operasional pelabuhan utama logistik maritim Indonesia: update jam operasional gate-in dermaga roro, waktu closing dokumen kontainer FCL/LCL, dan tips menekan biaya penumpukan (demurrage).',
    coverImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    author: 'Capt. Rian Suryanegara',
    authorRole: 'Maritime Logistics Director',
    readTimeMinutes: 7,
    tags: ['InfoPelabuhan', 'TanjungPriok', 'TanjungPerak', 'PelabuhanMakassar', 'KapalRoro', 'DwellTime'],
    targetKeywords: 'jadwal kapal roro tanjung priok makassar, info pelabuhan kargo tanjung perak surabaya, estimasi dwell time kontainer 2026, biaya demurrage pelabuhan',
    metaDescription: 'Update jadwal sandar kapal roro & kontainer pelabuhan Tanjung Priok, Tanjung Perak, dan Soekarno-Hatta Makassar lengkap dengan alur gate-in kargo laut 2026.',
    status: 'dipublikasikan',
    viewsCount: 2150,
    sharesCount: 142,
    publishedAt: '12 Okt 2026',
    seoScore: 98,
    content: `## Dinamika Logistik Maritim Indonesia di Tiga Gerbang Utama

Sebagai negara kepulauan, lebih dari 75% tonase logistik antar pulau diangkut melalui moda kapal laut. Memahami ritme operasional pelabuhan utama di Pulau Jawa dan Sulawesi adalah kunci utama memastikan barang Anda tiba tepat waktu tanpa denda *demurrage* ataupun *storage charge*.

### 1. Pelabuhan Tanjung Priok (Jakarta Utara)
- **Fokus Layanan:** Pusat konsolidasi muatan kargo dari kawasan industri Jabodetabek, Karawang, dan Cikarang menuju seluruh Indonesia Barat dan Timur.
- **Dermaga Kapal Roro:** Terminal Nusantara & Dermaga 106. Melayani keberangkatan harian menuju Lampung, Belawan Medan, Pontianak, Banjarmasin, Balikpapan, dan Makassar.
- **Aturan Closing Gate:** Muatan unit kendaraan (truk fuso, mobil, motor) wajib sudah berada di area parkir dermaga minimal **4 jam sebelum jadwal keberangkatan kapal (ETD)**. Untuk kontainer FCL, closing time dokumen adalah 6 jam sebelum kapal sandar.

### 2. Pelabuhan Tanjung Perak (Surabaya)
- **Peran Strategis:** Pintu gerbang utama menuju Indonesia Bagian Timur (Sulawesi, Maluku, Nusa Tenggara, dan Papua).
- **Efisiensi Roro:** Tanjung Perak memiliki frekuensi pelayaran kapal roro terbanyak di Indonesia. Penyeberangan Surabaya – Makassar memakan waktu tempuh laut rata-rata 36-40 jam.
- **Tips Gate-In:** Hindari jam puncak antrean truk (*bottleneck*) di gerbang Jalan Jamrud dan Kalimas antara pukul 18.00 hingga 21.00 WIB.

### 3. Pelabuhan Soekarno-Hatta (Makassar)
- **Hub Transshipment Indonesia Timur:** Makassar bertindak sebagai pelabuhan transit utama. Kargo dari Jawa dibongkar muat di sini sebelum diteruskan memakai kapal perintis ke Ambon, Sorong, Jayapura, dan Ternate.
- **Rata-rata Dwell Time 2026:** Telah membaik menjadi 2,3 hari berkat digitalisasi sistem NLE (National Logistics Ecosystem).

### Ringkasan Jadwal Rutin Kapal Roro Mitra Kargo
| Rute Pelayaran | Frekuensi Mingguan | Estimasi Waktu Tempuh Laut |
| :--- | :--- | :--- |
| Jakarta – Pontianak | 3x Seminggu (Senin, Rabu, Sabtu) | 36 - 48 Jam |
| Jakarta – Banjarmasin | 4x Seminggu (Selasa, Kamis, Jumat, Minggu) | 48 - 60 Jam |
| Jakarta – Balikpapan | 3x Seminggu (Senin, Kamis, Sabtu) | 60 - 72 Jam |
| Surabaya – Makassar | 5x Seminggu (Setiap Hari Kerja) | 36 - 40 Jam |
| Surabaya – Kupang | 2x Seminggu (Selasa & Jumat) | 72 - 84 Jam |

> **⚓ Solusi Terpadu:** Tim Operasional Dermaga Mitra Kargo (PT Samudra Lintas Artha) siaga 24 jam di pelabuhan dengan akses pas gate-in resmi untuk menjamin prioritas muat armada truk dan kontainer Anda.`
  },
  {
    id: 'art-3',
    title: 'Update Regulasi Kemenhub & Bea Cukai 2026: Batas Muatan Truk Zero ODOL, Sertifikasi Kargo Kimia Cair & Ketentuan Pengiriman ke Wilayah IKN',
    slug: 'update-regulasi-kemenhub-zero-odol-kargo-kimia-cair-ikn-nusantara-2026',
    category: 'Update Regulasi',
    excerpt: 'Ketahui poin penting penegakan tilang elektronik Weigh-in-Motion (WIM) di jalan tol Trans Jawa-Sumatera, syarat lembar data keselamatan (MSDS) barang kimia, dan verifikasi dokumen proyek IKN Balikpapan.',
    coverImage: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
    author: 'Bambang Kusuma, S.T., M.Log',
    authorRole: 'Head of Compliance & Regulatory Affairs',
    readTimeMinutes: 8,
    tags: ['RegulasiLogistik', 'Kemenhub2026', 'ZeroODOL', 'KargoIKN', 'MSDSKimia', 'JembatanTimbang'],
    targetKeywords: 'regulasi odol kemenhub 2026, aturan muatan truk odol jalan tol, syarat kirim cairan kimia kargo, izin pengiriman kargo ikn balikpapan, sanksi tilang WIM',
    metaDescription: 'Penjelasan resmi penegakan aturan muatan berlebih truk Zero ODOL oleh Kemenhub 2026, syarat dokumen MSDS muatan kimia cair, dan alur izin pengiriman logistik IKN.',
    status: 'dipublikasikan',
    viewsCount: 1890,
    sharesCount: 115,
    publishedAt: '09 Okt 2026',
    seoScore: 97,
    content: `## Menjawab Kepatuhan Regulasi Logistik Teranyar di Indonesia

Kementerian Perhubungan (Kemenhub) bersama Korlantas Polri dan Badan Pengatur Jalan Tol (BPJT) memperketat pengawasan armada angkutan barang demi keselamatan jalan dan ketahanan infrastruktur nasional. Pelaku usaha dan pengirim wajib memahami aturan main agar distribusi tidak terhambat razia atau penolakan armada.

### 1. Penegakan Sistematis Program Zero ODOL (Over Dimension & Over Load)
Pemerintah telah mengaktifkan sensor **Weigh-in-Motion (WIM)** di seluruh gerbang tol utama Trans Jawa dan Trans Sumatera:
- **Toleransi Berat Maksimal (JBI / JBB):** Truk yang melebihi batas toleransi muatan di atas 5% otomatis tertolak di gerbang tol dan diarahkan keluar ke jalur arteri atau kantong penindakan.
- **Dimensi Karoseri:** Tinggi, lebar, dan panjang bak truk wajib sesuai dengan Surat Registrasi Uji Tipe (SRUT). Modifikasi bak yang melampaui ketentuan berisiko pemotongan karoseri di tempat.
- **Dampak Bagi Pengirim:** Pengirim disarankan membagi muatan padat/berat (seperti besi beton, keramik, semen) ke dalam armada yang sesuai (contoh: gunakan Tronton 3 Sumbu atau Trailer dibanding memaksakan Colt Diesel Double).

### 2. Standar Pengiriman Kargo Bahan Cair & Kimia (Dangerous Goods)
Tidak semua kargo cair dilarang, namun wajib memenuhi persyaratan sertifikasi:
- **Wajib Menyertakan MSDS (Material Safety Data Sheet):** Dokumen 16 poin yang menjelaskan sifat zat, titik nyala api, tingkat toksisitas, dan pertolongan pertama bila tumpah.
- **Kemasan Terstandarisasi UN (UN Certified Packaging):** Untuk cairan kimia industri, drum besi atau tangki IBC (Intermediate Bulk Container) 1000 liter wajib memiliki segel anti bocor dan *secondary containment*.
- **Pemberitahuan ke Pihak Pelayaran:** Kargo laut kelas DG (Dangerous Goods) memerlukan *declaration form* minimal 3 hari sebelum *vessel closing*.

### 3. Regulasi Khusus Logistik Wilayah Ibu Kota Nusantara (IKN)
Pengiriman material konstruksi, genset, tower crane, dan perabot kantor menuju kawasan IKN Kalimantan Timur melalui rute Pelabuhan Semayang / Kariangau Balikpapan:
- **Surat Jalan Proyek & Barcode Izin Masuk:** Kendaraan logistik yang memasuki KIPP (Kawasan Inti Pusat Pemerintahan) wajib terdaftar dalam sistem perizinan Otorita IKN.
- **Uji Emisi & Kelaikan Kendaraan (KIR):** Truk yang beroperasi di wilayah IKN wajib lolos uji emisi hijau untuk mendukung konsep *Green Smart Forest City*.

> **🛡️ Komitmen Bebas Masalah:** Seluruh armada Mitra Kargo (PT Samudra Lintas Artha) telah 100% tersertifikasi KIR resmi Kemenhub, patuh dimensi legal jalan tol, dan dilengkapi perizinan resmi pengiriman material logistik ke seluruh proyek IKN.`
  },
  {
    id: 'art-4',
    title: 'Strategi Jitu Menghitung Rumus Berat Volume (Dimensi) Kargo Darat, Laut & Udara: Hemat Biaya Kirim Barang Ringan Berukuran Besar',
    slug: 'strategi-menghitung-rumus-berat-volume-dimensi-kargo-darat-laut-udara',
    category: 'Panduan Logistik',
    excerpt: 'Kupas tuntas rumus perhitungan berat volume: pembagi 4.000 untuk darat, 6.000 untuk kargo udara, dan kubikasi CBM (m3) kargo laut agar Anda tidak kaget dengan selisih ongkir barang bervolume besar.',
    coverImage: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80',
    author: 'Dedi Kurniawan',
    authorRole: 'Pricing & Operations Analyst',
    readTimeMinutes: 5,
    tags: ['HitungVolume', 'RumusKargo', 'OngkirMurah', 'TipsHematKargo', 'KubikasiCBM'],
    targetKeywords: 'rumus volume kargo darat 4000, rumus hitung volume kargo udara 6000, cara hitung cbm kargo laut, tips hemat ongkir kargo barang besar',
    metaDescription: 'Pahami cara menghitung volumetric weight kargo ekspedisi dengan rumus PxLxT / 4000 (darat), 6000 (udara), dan kubikasi laut CBM beserta trik packing hemat ongkir.',
    status: 'dipublikasikan',
    viewsCount: 1670,
    sharesCount: 94,
    publishedAt: '05 Okt 2026',
    seoScore: 99,
    content: `## Mengapa Barang Ringan Bisa Dikenakan Tarif yang Lebih Mahal?

Dalam dunia ekspedisi logistik, ruangan (*space*) armada truk, lambung kapal, dan kargo pesawat memiliki kapasitas muat yang terbatas. Sebagai contoh, kapas atau kasur busa seberat 10 kg dapat memakan ruang yang sama besarnya dengan 300 kg pelat besi.

Oleh karena itu, seluruh asosiasi logistik dunia (termasuk ALFI/ILFA di Indonesia) menggunakan standar internasional: **mana yang lebih besar antara berat timbangan aktual (kg) vs berat volume (kgv), itulah yang menjadi acuan penagihan ongkir.**

---

### 1. Rumus Kargo Darat (Truk Fuso, CDD, Box)
Rumus standar yang berlaku di seluruh Indonesia:
$$\\text{Berat Volume (Kg)} = \\frac{P (\\text{cm}) \\times L (\\text{cm}) \\times T (\\text{cm})}{4.000}$$

*Contoh Kasus:*
Anda mengirim kotak berisi mesin pembuat kopi dengan ukuran:
- Panjang = 80 cm, Lebar = 60 cm, Tinggi = 50 cm
- Berat timbangan aktual = 35 Kg
- Hitungan Volume: $(80 \\times 60 \\times 50) \\div 4.000 = 240.000 \\div 4.000 = 60\\text{ Kg}$
- **Hasil:** Karena 60 Kg > 35 Kg, maka ongkir yang dibayarkan dihitung berdasarkan **60 Kg**.

---

### 2. Rumus Kargo Udara (Garuda Cargo, Lion Cargo, Citilink)
Karena ruang kabin pesawat sangat terbatas dan mahal:
$$\\text{Berat Volume Udara} = \\frac{P (\\text{cm}) \\times L (\\text{cm}) \\times T (\\text{cm})}{6.000}$$

---

### 3. Rumus Kargo Laut (Perhitungan Kubikasi / CBM)
Untuk pengiriman via Kapal Kargo Container atau Kapal RoRo, barang dalam jumlah besar biasanya dihitung per meter kubik ($M^3$ atau CBM):
$$\\text{CBM} = \\frac{P (\\text{cm}) \\times L (\\text{cm}) \\times T (\\text{cm})}{1.000.000}$$
Jika total pengiriman Anda mencapai $3,5\\text{ CBM}$ dengan tarif laut Rp 950.000 per CBM, maka total biaya kirim adalah $3,5 \\times 950.000 = \\text{Rp } 3.325.000$.

---

### Trik Jitu Menghemat Ongkir Barang Bervolume Besar
1. **Knock-Down (Bongkar Pasang):** Untuk furnitur meja, lemari, atau rangka besi, kirim dalam kondisi terurai agar tingginya minimal.
2. **Vacuum Sealing:** Untuk produk tekstil, garmen, boneka, atau bantal, gunakan kantong vakum kedap udara yang dapat mengempeskan volume hingga 60%.
3. **Pilih Kardus yang Presisi:** Jangan gunakan kardus yang menyisakan ruang kosong besar di dalam. Ruang kosong yang tidak terisi tetap dihitung dalam ukuran luar kardus!

> **💡 Butuh Kalkulasi Cepat?** Gunakan fitur *Kalkulator Ongkir Otomatis* di website Mitra Kargo (mitrakargo.net) atau hubungi staf operasional kami untuk rekomendasi moda termurah berdasarkan jenis komoditas Anda.`
  }
];

