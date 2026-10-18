import React, { useState } from 'react';
import { 
  Calculator, 
  Truck, 
  Ship, 
  Plane, 
  Layers, 
  HelpCircle, 
  ArrowRight, 
  Check, 
  Info,
  Calendar,
  Sparkles
} from 'lucide-react';
import { ShippingRate, ServiceType } from '../types';

interface TarifCalculatorProps {
  rates: ShippingRate[];
  cities: string[];
  initialOrigin?: string;
  initialDestination?: string;
  initialWeight?: number;
  onOpenQuoteModal: () => void;
}

export const TarifCalculatorSection: React.FC<TarifCalculatorProps> = ({
  rates,
  cities,
  initialOrigin = 'Jakarta (Jabodetabek)',
  initialDestination = 'Surabaya',
  initialWeight = 100,
  onOpenQuoteModal
}) => {
  const [origin, setOrigin] = useState(initialOrigin);
  const [destination, setDestination] = useState(initialDestination);
  const [actualWeight, setActualWeight] = useState(initialWeight);
  
  // Dimensions for volumetric calculator
  const [useVolumetric, setUseVolumetric] = useState(false);
  const [lengthCm, setLengthCm] = useState(80);
  const [widthCm, setWidthCm] = useState(60);
  const [heightCm, setHeightCm] = useState(50);
  const [colli, setColli] = useState(1);

  // Volumetric weight formula: (P x L x T) / 4000 (Darat/Laut standard Indonesia)
  const volumeWeightDarat = Math.round(((lengthCm * widthCm * heightCm) / 4000) * colli);
  const volumeWeightUdara = Math.round(((lengthCm * widthCm * heightCm) / 5000) * colli);

  // Effective weight
  const effectiveWeightDarat = useVolumetric 
    ? Math.max(actualWeight, volumeWeightDarat) 
    : actualWeight;

  // Find matching rates
  const matchingRates = rates.filter(
    (r) => 
      (r.origin.toLowerCase().includes(origin.toLowerCase()) || origin.toLowerCase().includes(r.origin.toLowerCase())) &&
      (r.destination.toLowerCase().includes(destination.toLowerCase()) || destination.toLowerCase().includes(r.destination.toLowerCase()))
  );

  // If exact route not found in predefined sample table, provide smart fallback estimation based on general distance
  const fallbackRates: ShippingRate[] = [
    {
      id: 'fallback-darat',
      origin,
      destination,
      serviceType: 'darat',
      pricePerKg: 3000,
      minWeightKg: 50,
      etdDays: '3-4 Hari',
      notes: 'Estimasi rute darat / penyeberangan standar'
    },
    {
      id: 'fallback-laut',
      origin,
      destination,
      serviceType: 'laut',
      pricePerKg: 4000,
      minWeightKg: 50,
      etdDays: '5-7 Hari',
      notes: 'Kapal Cargo / Kontainer LCL'
    },
    {
      id: 'fallback-udara',
      origin,
      destination,
      serviceType: 'udara',
      pricePerKg: 28000,
      minWeightKg: 10,
      etdDays: '1-2 Hari',
      notes: 'Port to Door Air Cargo'
    }
  ];

  const displayRates = matchingRates.length > 0 ? matchingRates : fallbackRates;

  const calculateTotal = (rate: ShippingRate) => {
    const chargeable = Math.max(effectiveWeightDarat, rate.minWeightKg);
    return chargeable * rate.pricePerKg;
  };

  const getServiceBadge = (type: ServiceType) => {
    switch (type) {
      case 'darat':
        return { label: 'Kargo Darat', icon: Truck, color: 'text-amber-700 bg-amber-50 border-amber-200' };
      case 'laut':
        return { label: 'Kargo Laut', icon: Ship, color: 'text-blue-700 bg-blue-50 border-blue-200' };
      case 'udara':
        return { label: 'Kargo Udara', icon: Plane, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
      case 'sewa_truk':
        return { label: 'Sewa Truk / Charter', icon: Layers, color: 'text-purple-700 bg-purple-50 border-purple-200' };
      default:
        return { label: 'Pindahan', icon: Truck, color: 'text-slate-700 bg-slate-50 border-slate-200' };
    }
  };

  return (
    <section id="cek-tarif" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-amber-700 bg-amber-100 px-3 py-1 rounded-full text-xs font-bold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            Kalkulator Ongkir & Tarif Transparan
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Cek Ongkos Kirim Kargo ke Seluruh Kota di Indonesia
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Dapatkan transparansi biaya pengiriman tanpa biaya tersembunyi. Dilengkapi kalkulator berat volumetrik otomatis.
          </p>
        </div>

        {/* Input Parameters Box */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Asal */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Kota Asal Pengiriman:
              </label>
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Tujuan */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Kota Tujuan Pengiriman:
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Berat Aktual */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Berat Aktual (Kg):
                </label>
                <span className="text-xs font-black text-amber-600 bg-amber-100 px-2 py-0.5 rounded">
                  {actualWeight} Kg
                </span>
              </div>
              <input
                type="number"
                min="5"
                max="50000"
                value={actualWeight}
                onChange={(e) => setActualWeight(Math.max(1, Number(e.target.value)))}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
              />
            </div>
          </div>

          {/* Toggle Volumetric Calculator */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="toggle-volumetric"
                  checked={useVolumetric}
                  onChange={(e) => setUseVolumetric(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 cursor-pointer"
                />
                <label htmlFor="toggle-volumetric" className="text-xs sm:text-sm font-bold text-slate-800 cursor-pointer flex items-center gap-1.5">
                  Hitung Berat Volumetrik (P x L x T)
                  <span className="text-[11px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-medium">
                    Untuk barang besar/ringan (seperti perabot/mesin)
                  </span>
                </label>
              </div>

              {useVolumetric && (
                <span className="text-xs text-slate-600">
                  Berat ditagihkan: <strong className="text-slate-900">{effectiveWeightDarat} Kg</strong> (mengambil nilai tertinggi)
                </span>
              )}
            </div>

            {/* Volumetric Input Fields */}
            {useVolumetric && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 bg-white p-4 rounded-xl border border-slate-200">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">Panjang (cm):</label>
                  <input
                    type="number"
                    value={lengthCm}
                    onChange={(e) => setLengthCm(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">Lebar (cm):</label>
                  <input
                    type="number"
                    value={widthCm}
                    onChange={(e) => setWidthCm(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">Tinggi (cm):</label>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">Jumlah Koli:</label>
                  <input
                    type="number"
                    min="1"
                    value={colli}
                    onChange={(e) => setColli(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Comparison Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              Pilihan Layanan untuk Rute: <span className="text-blue-600">{origin}</span> &rarr; <span className="text-amber-600">{destination}</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              Berat Dihitung: {effectiveWeightDarat} Kg
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayRates.map((rate) => {
              const badge = getServiceBadge(rate.serviceType);
              const Icon = badge.icon;
              const totalEst = calculateTotal(rate);
              const isUnderMin = effectiveWeightDarat < rate.minWeightKg;

              return (
                <div
                  key={rate.id}
                  className="bg-white rounded-2xl border-2 border-slate-200 hover:border-amber-500 shadow-sm hover:shadow-xl transition-all p-6 flex flex-col justify-between group"
                >
                  <div>
                    {/* Badge */}
                    <div className="flex justify-between items-start mb-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badge.color}`}>
                        <Icon className="w-3.5 h-3.5" />
                        {badge.label}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {rate.etdDays}
                      </span>
                    </div>

                    {/* Price per Kg */}
                    <div className="mb-4">
                      <div className="text-xs text-slate-500 font-medium">Tarif per Kg:</div>
                      <div className="text-2xl font-black text-slate-900">
                        Rp {rate.pricePerKg.toLocaleString('id-ID')}
                        <span className="text-xs font-normal text-slate-500"> / Kg</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Min. Berat: <strong>{rate.minWeightKg} Kg</strong>
                        {isUnderMin && (
                          <span className="text-amber-700 ml-1 font-semibold">
                            (Dikenakan biaya min. {rate.minWeightKg} Kg)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Notes */}
                    {rate.notes && (
                      <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-4 leading-relaxed">
                        {rate.notes}
                      </p>
                    )}

                    {/* Features checklist */}
                    <ul className="text-xs space-y-1.5 text-slate-600 mb-6">
                      <li className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        Door to door pickup & delivery
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        Real-time AWB tracking
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        Cover asuransi pengiriman
                      </li>
                    </ul>
                  </div>

                  {/* Total calculation & Action */}
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex justify-between items-baseline mb-3">
                      <span className="text-xs font-bold text-slate-500 uppercase">Estimasi Total:</span>
                      <span className="text-xl font-extrabold text-amber-600">
                        Rp {totalEst.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <a
                      href={`https://wa.me/6287882621638?text=Halo%20Mitra%20Kargo%20(PT%20Samudra%20Lintas%20Artha),%20saya%20ingin%20booking%20kargo%20${rate.serviceType}%20dari%20${origin}%20ke%20${destination}%20estimasi%20berat%20${effectiveWeightDarat}kg.`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                    >
                      Pesan Sekarang via WA (0878-8262-1638)
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Corporate & Charter Callout */}
        <div className="mt-12 bg-gradient-to-r from-blue-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded">
              <Sparkles className="w-3.5 h-3.5" /> Khusus Muatan &gt; 1 Ton / Kontrak Rutin
            </span>
            <h4 className="text-xl sm:text-2xl font-bold">
              Butuh Sewa Truk Full (FTL) atau Pengiriman Kontainer Proyek?
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Dapatkan rate korporasi khusus, tempo pembayaran (TOP 30 hari), armada dedicated, dan account manager pribadi untuk perusahaan Anda.
            </p>
          </div>
          <button
            onClick={onOpenQuoteModal}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl text-sm whitespace-nowrap shadow-md cursor-pointer transition-transform active:scale-95 flex-shrink-0"
          >
            Minta Penawaran B2B
          </button>
        </div>

      </div>
    </section>
  );
};
