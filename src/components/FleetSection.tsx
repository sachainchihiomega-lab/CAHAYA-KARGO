import React from 'react';
import { Truck, Shield, Check, Box, Gauge } from 'lucide-react';

export const FleetSection: React.FC = () => {
  const fleets = [
    {
      name: 'Colt Diesel Double (CDD) Box / Long',
      capacity: '4 - 5.5 Ton',
      volume: '14 - 18 CBM (Kubik)',
      dimension: 'Panjang 4.2m - 5.5m x Lebar 2m x Tinggi 2m',
      idealFor: 'Distribusi FMCG, elektronik, paket toko online, tekstil & pindahan rumah besar.',
      badge: 'Armada Terbanyak'
    },
    {
      name: 'Fuso Heavy Duty (Bak / Box)',
      capacity: '8 - 12 Ton',
      volume: '25 - 32 CBM',
      dimension: 'Panjang 6.2m - 7.5m x Lebar 2.4m x Tinggi 2.3m',
      idealFor: 'Bahan bangunan, pakan ternak, mesin industri sedang, dan distribusi antar provinsi.',
      badge: 'Muatan Menengah'
    },
    {
      name: 'Tronton Wingbox 3-Axle',
      capacity: '15 - 25 Ton',
      volume: '45 - 50 CBM',
      dimension: 'Panjang 9.4m x Lebar 2.5m x Tinggi 2.5m',
      idealFor: 'Logistik pabrik manufaktur, loading forklift dari samping, kecepatan bongkar muat maksimal.',
      badge: 'Kapasitas Jumbo'
    },
    {
      name: 'Kontainer FCL 20 Feet & 40 Feet',
      capacity: '20 - 28 Ton',
      volume: '33 CBM (20ft) / 67 CBM (40ft)',
      dimension: 'Standar ISO Intermodal Maritim',
      idealFor: 'Kargo antar pulau skala ekspor-impor, raw materials tambang, dan muatan curah komoditas.',
      badge: 'Kargo Antar Pulau'
    }
  ];

  return (
    <section id="armada" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-blue-700 bg-blue-100 px-3 py-1 rounded-full text-xs font-bold mb-3">
            <Truck className="w-3.5 h-3.5" />
            Spesifikasi Armada Lengkap
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pilihan Armada Pengiriman Siap Jalan 24/7
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Seluruh kendaraan terawat berkala, dilengkapi GPS tracking aktif, dan dikemudikan pengemudi profesional bersertifikat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {fleets.map((fleet, index) => (
            <div 
              key={index}
              className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 hover:border-amber-400 hover:bg-white hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-md bg-amber-500/10 text-amber-700 border border-amber-500/20">
                    {fleet.badge}
                  </span>
                  <div className="flex items-center gap-1 text-emerald-600 text-xs font-semibold">
                    <Shield className="w-3.5 h-3.5" /> GPS Terpasang
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {fleet.name}
                </h3>

                <div className="grid grid-cols-2 gap-3 my-4 bg-white p-3.5 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Kapasitas Muatan:</span>
                    <strong className="text-sm text-slate-900">{fleet.capacity}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Volume Ruang:</span>
                    <strong className="text-sm text-slate-900">{fleet.volume}</strong>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Dimensi Bak / Box:</span>
                    <span className="text-xs font-medium text-slate-700">{fleet.dimension}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Ideal untuk:</strong> {fleet.idealFor}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Siap Sewa Harian / Kontrak Bulanan
                </span>
                <span className="font-semibold text-amber-600">
                  Charter Tersedia
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
