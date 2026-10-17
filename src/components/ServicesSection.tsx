import React from 'react';
import { 
  Truck, 
  Ship, 
  Plane, 
  Layers, 
  Home, 
  Hammer, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenQuoteModal: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenQuoteModal }) => {
  const services = [
    {
      id: 'darat',
      title: 'Kargo Darat (Trucking)',
      subtitle: 'Layanan Pengiriman Jalur Darat Seluruh Jawa, Bali & Sumatera',
      desc: 'Pengiriman muatan reguler dan partai besar dengan rute door-to-door via Tol Trans Jawa dan Lintas Sumatera. Armada CDD, Fuso, dan Tronton.',
      minWeight: 'Min. 50 Kg',
      etd: '1 - 3 Hari Kerja',
      icon: Truck,
      color: 'from-amber-500 to-orange-600',
      badge: 'Paling Populer',
      features: [
        'Door to door pickup langsung dari gudang Anda',
        'Armada Truk Box tertutup rapat anti bocor',
        'Rute harian Jakarta - Bandung - Semarang - Surabaya',
        'Asuransi pengiriman terjamin'
      ]
    },
    {
      id: 'laut',
      title: 'Kargo Laut (Sea Freight)',
      subtitle: 'Pengiriman Antar Pulau Murah & Efisien',
      desc: 'Solusi termurah untuk muatan tonase besar ke Kalimantan, Sulawesi, Maluku dan Papua via Kapal Roro Cepat dan Kapal Kontainer FCL / LCL.',
      minWeight: 'Min. 50 - 100 Kg',
      etd: '4 - 8 Hari Kerja',
      icon: Ship,
      color: 'from-blue-600 to-indigo-700',
      badge: 'Tarif Paling Hemat',
      features: [
        'Kontainer Full Container Load (FCL) 20ft & 40ft',
        'Less than Container Load (LCL) untuk muatan campur',
        'Kerjasama resmi dengan Pelindo & pelayaran nasional',
        'Fasilitas bongkar muat crane di pelabuhan tujuan'
      ]
    },
    {
      id: 'udara',
      title: 'Kargo Udara (Air Cargo)',
      subtitle: 'Prioritas Express Port-to-Door Super Cepat',
      desc: 'Layanan kargo pesawat udara untuk pengiriman mendesak, suku cadang darurat, dokumen legal penting, dan alat kesehatan dengan estimasi same-day / next-day.',
      minWeight: 'Min. 10 Kg',
      etd: '1 - 2 Hari (Same/Next Day)',
      icon: Plane,
      color: 'from-emerald-600 to-teal-700',
      badge: 'Super Cepat',
      features: [
        'Regulated Agent Air Cargo terverifikasi otoritas bandara',
        'Slot cargo terjadwal setiap penerbangan komersial pagi',
        'Handling khusus untuk fragile & high value goods',
        'Pengantaran prioritas langsung ke pintu penerima'
      ]
    },
    {
      id: 'sewa_truk',
      title: 'Sewa Truk Charter (FTL)',
      subtitle: 'Charter Armada Penuh Khusus Muatan Anda',
      desc: 'Sewa truk eksklusif satu armada penuh tanpa dicampur muatan orang lain. Jadwal fleksibel, rute langsung, dan keamanan maksimal untuk pabrik & distributor.',
      minWeight: 'Kapasitas s/d 25 Ton',
      etd: 'Jadwal Fleksibel 24/7',
      icon: Layers,
      color: 'from-purple-600 to-slate-900',
      badge: 'Charter Penuh',
      features: [
        'Armada Blindvan, Pickup, CDD Long, Fuso, Tronton Wingbox',
        'Dilengkapi GPS tracking realtime 24 jam',
        'Supir berpengalaman & terlatih SOP muatan berat',
        'Segel pengaman kontainer standar industri'
      ]
    },
    {
      id: 'pindahan',
      title: 'Jasa Pindahan Profesional',
      subtitle: 'Pindahan Rumah, Apartemen, Kantor & Pabrik',
      desc: 'Layanan all-in-one meliputi survey gratis, packing rapi (bubble wrap, karton tebal, peti kayu), bongkar muat tenaga ahli, dan penataan kembali di lokasi baru.',
      minWeight: 'Semua Ukuran Perabot',
      etd: 'Sesuai Request Tanggal',
      icon: Home,
      color: 'from-rose-600 to-pink-700',
      badge: 'All-In Layanan',
      features: [
        'Tim packing terlatih & material packing berstandar tinggi',
        'Bongkar pasang perabot lemari, ranjang, AC, dan elektronik',
        'Asuransi proteksi barang bernilai tinggi',
        'Tersedia sewa gudang penyimpanan transit sementara'
      ]
    },
    {
      id: 'project_cargo',
      title: 'Project Cargo & Alat Berat',
      subtitle: 'Spesialis Pengiriman Muatan Industri & Konstruksi',
      desc: 'Pengiriman alat berat tambang & konstruksi (Excavator, Bulldozer, Crane), mesin pabrik over-dimension / over-weight (ODOW) dengan armada Lowbed, Dolly, dan Self-Loader.',
      minWeight: 'Tonase Besar (> 10 Ton)',
      etd: 'Terjadwal Sesuai Rute',
      icon: Hammer,
      color: 'from-yellow-600 to-amber-700',
      badge: 'Muatan Khusus',
      features: [
        'Survey rute jembatan & perizinan kawalan kepolisian',
        'Armada Trailer Lowbed, Flatbed, Multi-Axle dan Dolly',
        'Lashing & chocking bersertifikasi inspeksi keselamatan',
        'Handling project tambang, smelter, migas & proyek IKN'
      ]
    }
  ];

  return (
    <section id="layanan" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-amber-700 bg-amber-100 px-3 py-1 rounded-full text-xs font-bold mb-3">
            <Layers className="w-3.5 h-3.5" />
            Layanan Ekspedisi Terintegrasi
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Layanan Logistik & Pengiriman Skala Besar Terlengkap
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Dirancang khusus untuk mendukung kelancaran rantai pasok UMKM, distributor, pabrik manufaktur, hingga korporasi multinasional.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
              >
                {/* Top Banner accent */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-amber-700 mt-0.5">
                    {item.subtitle}
                  </p>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {item.desc}
                  </p>

                  {/* Highlights */}
                  <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Minimal:</span>
                      <strong className="text-slate-800">{item.minWeight}</strong>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Lead Time:</span>
                      <strong className="text-slate-800">{item.etd}</strong>
                    </div>
                  </div>

                  {/* Feature checklist */}
                  <ul className="mt-4 space-y-2 text-xs text-slate-600">
                    {item.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={onOpenQuoteModal}
                    className="w-full bg-slate-100 hover:bg-amber-500 hover:text-slate-950 text-slate-800 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer group-hover:bg-slate-900 group-hover:text-white"
                  >
                    Konsultasi Layanan Ini
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
