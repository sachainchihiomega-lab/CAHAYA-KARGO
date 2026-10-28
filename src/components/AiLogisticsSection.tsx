import React from 'react';
import { 
  Cpu, 
  BrainCircuit, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  BarChart3, 
  Zap, 
  Layers, 
  Compass, 
  Bot, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { CompanyProfile } from '../types';

interface AiLogisticsSectionProps {
  companyProfile: CompanyProfile;
  onOpenQuoteModal: () => void;
}

export const AiLogisticsSection: React.FC<AiLogisticsSectionProps> = ({ 
  companyProfile, 
  onOpenQuoteModal 
}) => {
  const aiPillars = [
    {
      icon: Compass,
      title: 'AI Smart Route & Fleet Dispatching',
      badge: 'Optimasi Rute',
      color: 'from-blue-600 to-cyan-500',
      description: 'Algoritma AI menganalisis data kepadatan jalan tol, jadwal sandar kapal RoRo, dan waktu dwell time pelabuhan untuk memilih rute paling cepat dan hemat bahan bakar.',
      impact: 'Pangkas Waktu Tempuh hingga 30%'
    },
    {
      icon: BarChart3,
      title: 'AI Predictive Pricing & Smart Volumetric',
      badge: 'Kalkulasi Otomatis',
      color: 'from-amber-500 to-orange-600',
      description: 'Kecerdasan buatan menghitung rumus kubikasi (CBM) dan berat volumetrik secara presisi tanpa margin tebak-tebakan, memastikan bisnis Anda selalu mendapatkan tarif terendah.',
      impact: 'Hemat Biaya Pengiriman hingga 25%'
    },
    {
      icon: Clock,
      title: 'AI Smart ETA & Real-Time Tracking',
      badge: 'Prediksi Tiba Akurat',
      color: 'from-emerald-600 to-teal-500',
      description: 'Bukan sekadar GPS statis, AI memprediksi estimasi waktu tiba (ETA) dinamis dengan memperhitungkan faktor cuaca perairan selat dan kondisi checkpoint ekspedisi.',
      impact: 'Akurasi Jadwal Kedatangan 99.2%'
    },
    {
      icon: Bot,
      title: 'AI Virtual Business Assistant 24/7',
      badge: 'Otomasi Support Bisnis',
      color: 'from-purple-600 to-pink-500',
      description: 'Asisten cerdas kami standby 24 jam melayani cek resi, rumus kubikasi, konsultasi regulasi Zero ODOL, hingga penerbitan draf penawaran harga secara instan.',
      impact: 'Respon Cepat Tanpa Menunggu Jam Kerja'
    }
  ];

  const businessBenefits = [
    {
      title: 'Efisiensi Biaya Operasional Supply Chain',
      desc: 'Optimasi kapasitas muatan truk dan kontainer LCL/FCL berbasis AI menghilangkan ruang kosong muatan sehingga ongkos per kilogram menjadi jauh lebih murah.'
    },
    {
      title: 'Ketepatan Pengiriman untuk Kelangsungan Pabrik',
      desc: 'Sistem peringatan dini AI mendeteksi potensi hambatan lalu lintas atau penundaan pelayaran lebih awal, menjaga jadwal produksi tetap aman.'
    },
    {
      title: 'Transparansi Penuh untuk Tim Logistik Perusahaan',
      desc: 'Laporan status pengiriman otomatis dibagikan kepada pengirim dan penerima melalui notifikasi WhatsApp dan sistem pelacakan digital.'
    },
    {
      title: 'Konsultasi Muatan Kompleks Tanpa Hambatan',
      desc: 'Dari mesin industri berbobot puluhan ton, sparepart pabrik, hingga cairan kimia non-DG, AI membantu menentukan SOP packing kayu dan jenis armada terbaik.'
    }
  ];

  return (
    <section id="ai-logistik" className="py-20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
      {/* Background tech ambient lights */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Teknologi AI Mitra Kargo</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Logistik Cerdas <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400">Didukung AI</span>, Bisnis Anda Lebih Efisien
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {companyProfile.name} ({companyProfile.shortName}) memadukan jaringan armada nasional dengan kekuatan Artificial Intelligence (Kecerdasan Buatan) untuk memberikan pengalaman pengiriman yang lebih cepat, transparan, hemat biaya, dan minim risiko bagi para pelaku bisnis.
          </p>
        </div>

        {/* 4 AI Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/70 hover:border-amber-400/50 p-6 rounded-2xl flex flex-col justify-between space-y-5 transition-all hover:shadow-xl hover:-translate-y-1 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-700 text-slate-300 border border-slate-600">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-white group-hover:text-amber-300 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-700/60 flex items-center gap-2 text-xs font-bold text-amber-400">
                  <TrendingUp className="w-4 h-4 flex-shrink-0" />
                  <span>{pillar.impact}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Banner: Bagaimana AI Membantu Pertumbuhan Bisnis Anda */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 rounded-3xl border border-sky-900/60 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                <BrainCircuit className="w-4 h-4" />
                Dampak Langsung untuk UMKM & Perusahaan (B2B)
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                Bagaimana Bisnis Anda Diuntungkan oleh Ekspedisi Berbasis AI?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {businessBenefits.map((benefit, i) => (
                  <div key={i} className="space-y-1.5 p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
                    <div className="flex items-center gap-2 text-white font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{benefit.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 pl-6 leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <button
                  onClick={onOpenQuoteModal}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  Konsultasikan Kargo Bisnis Anda
                </button>

                <a
                  href="https://mitrakargo.ai.studio/"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-800 hover:bg-slate-700 text-sky-300 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 border border-sky-500/30 transition-all cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 text-sky-400" />
                  Buka Portal Bisnis AI (mitrakargo.ai.studio)
                </a>
              </div>
            </div>

            {/* Right Interactive AI Metrics Card */}
            <div className="lg:col-span-5 bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-sky-400" />
                  <span className="font-bold text-xs text-white">AI Engine Performance</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Active 24/7
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center p-2.5 bg-slate-900 rounded-lg">
                  <span className="text-slate-400">Model Logistik:</span>
                  <span className="text-white font-bold">Mitra Logistics AI v3.8</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-900 rounded-lg">
                  <span className="text-slate-400">Kalkulasi Ongkir Instan:</span>
                  <span className="text-emerald-400 font-bold">&lt; 0.3 Detik</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-900 rounded-lg">
                  <span className="text-slate-400">Prediksi Akurasi ETA:</span>
                  <span className="text-sky-400 font-bold">99.2% Presisi</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-900 rounded-lg">
                  <span className="text-slate-400">Efisiensi Rute Terkompresi:</span>
                  <span className="text-amber-400 font-bold">-28% Jam Tempuh</span>
                </div>
              </div>

              <div className="p-3 bg-blue-950/60 rounded-xl border border-blue-800/40 text-[11px] text-sky-200 leading-relaxed">
                🤖 <strong>Didukung AI Assistant:</strong> Butuh info kargo sekarang? Klik ikon chat di pojok kanan bawah untuk bertanya tarif, jadwal kapal, atau konsultasi rumus kubikasi secara otomatis!
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
