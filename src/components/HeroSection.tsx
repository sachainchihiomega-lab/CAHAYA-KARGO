import React, { useState } from 'react';
import { 
  Search, 
  Calculator, 
  Truck, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Zap,
  PhoneCall,
  Ship,
  Plane
} from 'lucide-react';
import { ShippingRate, TrackingShipment } from '../types';

interface HeroSectionProps {
  onSearchResi: (resi: string) => void;
  onCalculateQuickTarif: (origin: string, dest: string, weight: number) => void;
  rates: ShippingRate[];
  cities: string[];
  shipments: TrackingShipment[];
  onOpenQuoteModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearchResi,
  onCalculateQuickTarif,
  rates,
  cities,
  shipments,
  onOpenQuoteModal
}) => {
  const [activeTab, setActiveTab] = useState<'resi' | 'ongkir'>('resi');
  const [inputResi, setInputResi] = useState('CK-889210');
  
  // Quick ongkir state
  const [originCity, setOriginCity] = useState('Jakarta (Jabodetabek)');
  const [destCity, setDestCity] = useState('Surabaya');
  const [weight, setWeight] = useState(100);

  const handleResiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputResi.trim()) return;
    onSearchResi(inputResi.trim());
    const el = document.getElementById('lacak-resi');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOngkirSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculateQuickTarif(originCity, destCity, weight);
    const el = document.getElementById('cek-tarif');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="hero" className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Background Logistics Grid & Light Effects */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Value Prop */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-sky-400/30 text-sky-300 text-xs sm:text-sm font-semibold tracking-wide">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Ekspedisi Cerdas Berbasis AI • Bisnis Tumbuh Cepat & Efisien</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Logistik Cerdas <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400">Didukung AI</span>, Bisnis Anda Lebih Efisien
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              PT Samudra Lintas Artha (Mitra Kargo) mengintegrasikan teknologi Artificial Intelligence (AI) untuk optimasi rute armada tercepat, prediksi waktu tiba (ETA) presisi, dan automasi operasional logistik bisnis Anda 24 jam non-stop ke seluruh Indonesia.
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-left">
              <div className="flex items-center gap-2 bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 p-2.5 rounded-lg">
                <Truck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-[11px] font-semibold text-slate-200">Door-to-Door</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 p-2.5 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-[11px] font-semibold text-slate-200">Asuransi All-Risk</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 p-2.5 rounded-lg">
                <Clock className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span className="text-[11px] font-semibold text-slate-200">AI Smart ETA</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 p-2.5 rounded-lg">
                <Zap className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span className="text-[11px] font-semibold text-slate-200">Bisnis Dibantu AI</span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onOpenQuoteModal}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center gap-2 text-base cursor-pointer active:scale-95"
              >
                Konsultasi & Hitung Muatan
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href="https://wa.me/6287882621638?text=Halo%20Mitra%20Kargo%20(PT%20Samudra%20Lintas%20Artha),%20saya%20ingin%20tanya%20tarif%20dan%20jadwal%20pengiriman."
                target="_blank"
                rel="noreferrer"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-5 py-3.5 rounded-xl border border-slate-700 transition-all flex items-center gap-2 text-sm"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                Hubungi Marketing: 0878-8262-1638
              </a>
            </div>
          </div>

          {/* Right Column: Hero High-Converting Widget (Lacak Resi & Cek Ongkir) */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
              
              {/* Tab Selector */}
              <div className="flex border-b border-slate-200 bg-slate-50">
                <button
                  type="button"
                  onClick={() => setActiveTab('resi')}
                  className={`flex-1 py-3.5 px-4 text-center font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'resi'
                      ? 'bg-white text-blue-700 border-b-2 border-blue-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Search className="w-4 h-4 text-blue-600" />
                  Lacak Resi (AWB)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('ongkir')}
                  className={`flex-1 py-3.5 px-4 text-center font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'ongkir'
                      ? 'bg-white text-amber-700 border-b-2 border-amber-500 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Calculator className="w-4 h-4 text-amber-600" />
                  Cek Tarif Ongkir
                </button>
              </div>

              {/* Tab 1: Quick Track Resi */}
              {activeTab === 'resi' && (
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                      <Search className="w-5 h-5 text-blue-600" />
                      Lacak Status Paket Kargo Anda
                    </h3>
                    <p className="text-xs text-slate-500">
                      Masukkan Nomor Resi / AWB Mitra Kargo untuk melihat posisi real-time paket.
                    </p>
                  </div>

                  <form onSubmit={handleResiSubmit} className="space-y-3">
                    <div className="relative">
                      <input
                        type="text"
                        value={inputResi}
                        onChange={(e) => setInputResi(e.target.value.toUpperCase())}
                        placeholder="Contoh: MK-889210 atau CK-889210"
                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-mono font-semibold tracking-wider placeholder:font-sans placeholder:font-normal placeholder:text-slate-400"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Search className="w-4 h-4" />
                      Lacak Pengiriman Sekarang
                    </button>
                  </form>

                  {/* Sample Quick Resi buttons */}
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1.5 uppercase tracking-wider">
                      Uji Coba Contoh Resi Tersedia:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {shipments.map((s) => (
                        <button
                          key={s.resiNumber}
                          type="button"
                          onClick={() => {
                            setInputResi(s.resiNumber);
                            onSearchResi(s.resiNumber);
                            const el = document.getElementById('lacak-resi');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 text-slate-700 px-2.5 py-1 rounded-md font-mono border border-slate-200 transition-colors"
                        >
                          {s.resiNumber} ({s.recipientCity})
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Quick Ongkir Calculator */}
              {activeTab === 'ongkir' && (
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-amber-600" />
                      Estimasi Biaya Kirim Kargo
                    </h3>
                    <p className="text-xs text-slate-500">
                      Cek tarif termurah kargo darat, laut & udara seluruh Indonesia.
                    </p>
                  </div>

                  <form onSubmit={handleOngkirSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Kota Asal:
                        </label>
                        <select
                          value={originCity}
                          onChange={(e) => setOriginCity(e.target.value)}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                        >
                          {cities.slice(0, 10).map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Kota Tujuan:
                        </label>
                        <select
                          value={destCity}
                          onChange={(e) => setDestCity(e.target.value)}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                        >
                          {cities.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-bold text-slate-700">
                          Estimasi Berat Barang:
                        </label>
                        <span className="text-xs font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                          {weight} Kg
                        </span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="1000"
                        step="10"
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 mt-0.5 font-medium">
                        <span>10 Kg (Min)</span>
                        <span>500 Kg</span>
                        <span>1.000 Kg+</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Calculator className="w-4 h-4" />
                      Cek Tarif Lengkap Sekarang
                    </button>
                  </form>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Tersedia diskon khusus volume besar & kontrak logistik korporat.</span>
                  </div>
                </div>
              )}

              {/* Trust Footer inside widget */}
              <div className="bg-slate-900 text-slate-300 py-2.5 px-4 text-center text-xs flex items-center justify-around border-t border-slate-800 font-medium">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-amber-400" /> Kargo Darat
                </span>
                <span className="flex items-center gap-1">
                  <Ship className="w-3.5 h-3.5 text-blue-400" /> Kargo Laut
                </span>
                <span className="flex items-center gap-1">
                  <Plane className="w-3.5 h-3.5 text-emerald-400" /> Kargo Udara
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Highlight Stats Ribbon */}
        <div className="mt-14 pt-8 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-4xl font-black text-amber-400">1.800.000+</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Ton Kargo Terkirim Aman</div>
          </div>
          <div>
            <div className="text-2xl sm:text-4xl font-black text-white">500+</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Unit Armada Darat & Laut</div>
          </div>
          <div>
            <div className="text-2xl sm:text-4xl font-black text-emerald-400">99.4%</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Tepat Waktu (On-Time Delivery)</div>
          </div>
          <div>
            <div className="text-2xl sm:text-4xl font-black text-blue-400">42+</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Kantor Cabang Seluruh Indonesia</div>
          </div>
        </div>

      </div>
    </div>
  );
};
