import React, { useState } from 'react';
import { MapPin, Phone, Building2, Globe, Clock, CheckCircle2 } from 'lucide-react';

export const CoverageMapSection: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<'jawa' | 'sumatera' | 'kalimantan' | 'sulawesi' | 'timur'>('jawa');

  const branches = {
    jawa: [
      {
        city: 'Jakarta (Headquarters & Warehouse Utama)',
        address: 'Kawasan Pergudangan Logistik Terpadu Blok A5 No. 12, Jl. Cakung Cilincing Raya, Jakarta Utara',
        phone: '+62 21 8920 1199',
        type: 'Warehouse Hub & Kantor Pusat'
      },
      {
        city: 'Surabaya (Hub Transit Jawa Timur & Indonesia Timur)',
        address: 'Kompleks Pergudangan Tambak Sawah Blok D-8, Sedati, Sidoarjo (Akses Tol Waru - Juanda)',
        phone: '+62 31 867 4432',
        type: 'Hub Maritim & Gudang Konsolidasi'
      },
      {
        city: 'Semarang (Hub Jawa Tengah)',
        address: 'Kawasan Industri Candi Blok XI No. 15, Ngaliyan, Kota Semarang',
        phone: '+62 24 760 9981',
        type: 'Kantor Cabang & Drop Point'
      },
      {
        city: 'Bandung',
        address: 'Jl. Soekarno Hatta No. 492, Batununggal, Kota Bandung',
        phone: '+62 22 756 3120',
        type: 'Drop Point & Loket Penerimaan'
      }
    ],
    sumatera: [
      {
        city: 'Medan (Hub Sumatera Utara & Aceh)',
        address: 'Jl. Kayu Putih No. 88, Tanjung Mulia Hilir, Medan Deli (Dekat Pintu Tol Belmera)',
        phone: '+62 61 662 1099',
        type: 'Hub Regional Sumatera Bagian Utara'
      },
      {
        city: 'Palembang',
        address: 'Jl. Mayor Zen No. 24, Kalidoni, Kota Palembang',
        phone: '+62 711 718 844',
        type: 'Kantor Cabang Distribusi'
      },
      {
        city: 'Pekanbaru',
        address: 'Jl. SM Amin Ringroad Barat No. 5, Arengka 2, Pekanbaru',
        phone: '+62 761 848 112',
        type: 'Drop Point & Distribusi Sawit / Industri'
      },
      {
        city: 'Bandar Lampung',
        address: 'Jl. Bypass Soekarno Hatta No. 102, Kedaton, Bandar Lampung',
        phone: '+62 721 784 219',
        type: 'Gate Penyeberangan Bakauheni'
      }
    ],
    kalimantan: [
      {
        city: 'Balikpapan (Hub Proyek IKN & Kaltim)',
        address: 'Kawasan Pergudangan Kariangau Gapura No. 14, KM 5.5, Balikpapan Barat',
        phone: '+62 542 876 220',
        type: 'Warehouse Hub IKN & Alat Berat'
      },
      {
        city: 'Samarinda',
        address: 'Jl. Pelita No. 29, Sungai Pinang Dalam, Samarinda',
        phone: '+62 541 743 901',
        type: 'Kantor Cabang & Distribusi'
      },
      {
        city: 'Banjarmasin',
        address: 'Jl. Gubernur Soebarjo (Lingkar Selatan) No. 71, Banjarmasin Selatan',
        phone: '+62 511 326 441',
        type: 'Drop Point Pelabuhan Trisakti'
      },
      {
        city: 'Pontianak',
        address: 'Jl. Khatulistiwa No. 110, Siantan Hilir, Pontianak Utara',
        phone: '+62 561 884 329',
        type: 'Drop Point Pelabuhan Dwikora'
      }
    ],
    sulawesi: [
      {
        city: 'Makassar (Pintu Gerbang KTI)',
        address: 'Kompleks Pergudangan Parangloe Indah Blok H2 No. 8, Biringkanaya, Makassar',
        phone: '+62 411 510 882',
        type: 'Hub Sentral Indonesia Timur'
      },
      {
        city: 'Manado',
        address: 'Jl. AA Maramis No. 84, Paniki Bawah, Mapanget, Manado',
        phone: '+62 431 814 553',
        type: 'Cabang & Air Cargo Terminal Sam Ratulangi'
      },
      {
        city: 'Palu',
        address: 'Jl. Trans Sulawesi No. 44, Mamboro, Palu Utara',
        phone: '+62 451 452 110',
        type: 'Drop Point Kargo Darat & Laut'
      }
    ],
    timur: [
      {
        city: 'Denpasar (Bali)',
        address: 'Jl. Cargo Indah I No. 18, Ubung Kaja, Denpasar Utara',
        phone: '+62 361 418 902',
        type: 'Hub Pariwisata, Kerajinan & Event'
      },
      {
        city: 'Mataram (Lombok)',
        address: 'Jl. TGH Faisal No. 33, Sandubaya, Mandalika, Mataram',
        phone: '+62 370 671 200',
        type: 'Drop Point & Kargo Project Mandalika'
      },
      {
        city: 'Jayapura (Papua)',
        address: 'Jl. Raya Entrop No. 88, Jayapura Selatan, Kota Jayapura',
        phone: '+62 967 534 890',
        type: 'Pergudangan Kontainer Pelabuhan Jayapura'
      },
      {
        city: 'Ambon (Maluku)',
        address: 'Jl. Wolter Monginsidi No. 15, Passo, Baguala, Kota Ambon',
        phone: '+62 911 361 740',
        type: 'Drop Point Pelabuhan Yos Sudarso'
      }
    ]
  };

  const regions = [
    { key: 'jawa', label: 'Pulau Jawa' },
    { key: 'sumatera', label: 'Pulau Sumatera' },
    { key: 'kalimantan', label: 'Kalimantan & IKN' },
    { key: 'sulawesi', label: 'Sulawesi' },
    { key: 'timur', label: 'Bali, Nusa Tenggara & Papua' }
  ];

  return (
    <section id="jangkauan" className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full text-xs font-bold mb-3 border border-amber-400/20">
            <Globe className="w-3.5 h-3.5" />
            Jaringan Nasional Terluas
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Kantor Cabang, Hub Logistik & Titik Serah Seluruh Nusantara
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Lebih dari 42 kantor cabang dan ratusan agen perwakilan siap melayani kebutuhan pengiriman barang Anda hingga ke pelosok kecamatan.
          </p>
        </div>

        {/* Region Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {regions.map((reg) => (
            <button
              key={reg.key}
              onClick={() => setSelectedRegion(reg.key as any)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                selectedRegion === reg.key
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              {reg.label}
            </button>
          ))}
        </div>

        {/* Branch Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {branches[selectedRegion].map((b, idx) => (
            <div 
              key={idx}
              className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 hover:border-amber-400 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {b.type}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" /> Buka: 08:00 - 21:00
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white flex items-center gap-2 mt-2">
                  <Building2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  {b.city}
                </h3>

                <p className="text-xs text-slate-300 mt-2 flex items-start gap-1.5 leading-relaxed">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span>{b.address}</span>
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1 font-mono">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  {b.phone}
                </span>
                <a
                  href={`https://wa.me/6281288992345?text=Halo%20Cahaya%20Kargo,%20saya%20ingin%20info%20lokasi%20drop%20point%20${encodeURIComponent(b.city)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 hover:text-amber-300 font-bold transition-colors"
                >
                  Hubungi Cabang Ini &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
