import { 
  TrackingShipment, 
  ShippingRate, 
  QuoteRequest, 
  AnalyticsData, 
  SeoConfig, 
  EmailReportConfig, 
  CompanyProfile 
} from '../types';

export const initialCompanyProfile: CompanyProfile = {
  name: 'PT Cahaya Kargo Indonesia',
  shortName: 'Cahaya Kargo',
  tagline: 'Solusi Logistik Cepat, Aman & Terpercaya Seluruh Nusantara',
  phone: '+62 21 8920 1199',
  whatsapp: '6281288992345',
  email: 'info@cahayakargo.co.id',
  address: 'Kawasan Pergudangan Logistik Terpadu Blok A5 No. 12, Jl. Cakung Cilincing Raya, Jakarta Utara 14120',
  operatingHours: 'Senin - Sabtu: 08.00 - 21.00 WIB (Customer Support 24/7)',
  instagram: 'https://instagram.com/cahayakargo.id',
  facebook: 'https://facebook.com/cahayakargoid',
  linkedin: 'https://linkedin.com/company/cahaya-kargo',
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
        description: 'Paket telah diterima di loket gudang Cahaya Kargo Cakung dan selesai ditimbang (280 Kg).',
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
  metaTitle: 'Cahaya Kargo – Ekspedisi & Logistik Terpercaya Seluruh Indonesia',
  titleTemplate: '%s | Cahaya Kargo Indonesia',
  metaDescription: 'PT Cahaya Kargo Indonesia: Ekspedisi pengiriman kargo darat, laut, udara, sewa truk dan pindahan termurah dan terpercaya ke seluruh Indonesia. Cek ongkir dan lacak resi online 24 jam.',
  metaKeywords: 'cahaya kargo, ekspedisi murah, ekspedisi jakarta surabaya, kargo darat termurah, kargo laut kontainer, kargo udara express, cek resi cahaya kargo, sewa truk fuso cdd wingbox, kirim barang besar antar pulau',
  canonicalUrl: 'https://cahayakargo.co.id',
  robotsMeta: 'index, follow',
  author: 'PT Cahaya Kargo Indonesia',
  ogTitle: 'Cahaya Kargo – Ekspedisi & Logistik Terpercaya Seluruh Indonesia',
  ogDescription: 'Kirim barang besar dan berat lebih hemat dengan Cahaya Kargo. Layanan Darat, Laut, Udara & Sewa Truk Door-to-Door seluruh wilayah Indonesia.',
  ogImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
  ogSiteName: 'Cahaya Kargo Indonesia',
  twitterCard: 'summary_large_image',
  twitterCreator: '@cahayakargo',
  gscVerificationCode: 'CK-VERIFY-GOOGLE-SEARCH-CONSOLE-2026',
  gscStatus: 'Terverifikasi',
  gscLastCrawled: '17 Okt 2026, 04:12 WIB',
  gscIndexedPagesCount: 48,
  schemaType: 'LogisticsService',
  customSchemaJson: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LogisticsService",
    "name": "Cahaya Kargo Indonesia",
    "alternateName": "PT Cahaya Kargo Logistik",
    "description": "Layanan ekspedisi dan pengiriman kargo skala besar melalui darat, laut, dan udara ke seluruh pelosok Nusantara.",
    "url": "https://cahayakargo.co.id",
    "telephone": "+62-812-8899-2345",
    "email": "info@cahayakargo.co.id",
    "priceRange": "$$",
    "areaServed": {
      "@type": "Country",
      "name": "Indonesia"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Raya Cakung Cilincing No. 88, Pergudangan Marunda Center",
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
Disallow: /admin
Disallow: /api/admin/
Disallow: /private/

Sitemap: https://cahayakargo.co.id/sitemap.xml`,
  sitemapAutoGenerate: true,
  sitemapLastUpdated: '17 Okt 2026, 00:00 WIB'
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
