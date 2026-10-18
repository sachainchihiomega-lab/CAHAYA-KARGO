import React, { useState } from 'react';
import { 
  Search, 
  Package, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Plane, 
  Ship, 
  User, 
  FileText, 
  Printer, 
  Share2, 
  AlertCircle, 
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { TrackingShipment, ShipmentStatus } from '../types';

interface TrackingSectionProps {
  shipments: TrackingShipment[];
  searchedResi: string;
  onSearchResi: (resi: string) => void;
  onOpenReceiptModal: (shipment: TrackingShipment) => void;
}

export const TrackingSection: React.FC<TrackingSectionProps> = ({
  shipments,
  searchedResi,
  onSearchResi,
  onOpenReceiptModal,
}) => {
  const [inputVal, setInputVal] = useState(searchedResi || 'CK-889210');
  const [notFound, setNotFound] = useState(false);

  const currentShipment = shipments.find(
    (s) => s.resiNumber.toLowerCase() === (searchedResi || inputVal).trim().toLowerCase()
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    onSearchResi(inputVal.trim());
    const found = shipments.some(
      (s) => s.resiNumber.toLowerCase() === inputVal.trim().toLowerCase()
    );
    setNotFound(!found);
  };

  const getStatusBadge = (status: ShipmentStatus) => {
    switch (status) {
      case 'selesai':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Terkirim / Selesai
          </span>
        );
      case 'sedang_dikirim':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300 animate-pulse">
            <Truck className="w-3.5 h-3.5 text-blue-600" />
            Sedang Dikirim ke Alamat
          </span>
        );
      case 'dalam_perjalanan':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <Truck className="w-3.5 h-3.5 text-amber-600" />
            Dalam Perjalanan (In Transit)
          </span>
        );
      case 'transit_gudang':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300">
            <Package className="w-3.5 h-3.5 text-purple-600" />
            Tiba di Hub Transit
          </span>
        );
      case 'diterima_hub':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-300">
            <Package className="w-3.5 h-3.5 text-indigo-600" />
            Diterima di Gudang Sortir
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300">
            <Clock className="w-3.5 h-3.5 text-slate-600" />
            Menunggu Pickup
          </span>
        );
    }
  };

  const getServiceIcon = (type: string) => {
    if (type === 'udara') return <Plane className="w-4 h-4 text-emerald-500" />;
    if (type === 'laut') return <Ship className="w-4 h-4 text-blue-500" />;
    return <Truck className="w-4 h-4 text-amber-500" />;
  };

  const printReceipt = () => {
    window.print();
  };

  return (
    <section id="lacak-resi" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-blue-700 bg-blue-100 px-3 py-1 rounded-full text-xs font-bold mb-3">
            <Search className="w-3.5 h-3.5" />
            Lacak Resi Online Real-Time
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Pantau Posisi Kargo Anda Detik Demi Detik
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Sistem tracking terintegrasi GPS & Manifest Barcode seluruh armada Mitra Kargo (PT Samudra Lintas Artha) di seluruh Indonesia.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md border border-slate-200 mb-8">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value.toUpperCase());
                  setNotFound(false);
                }}
                placeholder="Masukkan Nomor Resi / AWB (Contoh: MK-889210 atau CK-889210)"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-base font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
            >
              <Search className="w-4 h-4" />
              Lacak Paket
            </button>
          </form>

          {/* Quick Resi Clickable Chips */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Contoh Resi Aktif:</span>
            {shipments.map((s) => (
              <button
                key={s.resiNumber}
                type="button"
                onClick={() => {
                  setInputVal(s.resiNumber);
                  onSearchResi(s.resiNumber);
                  setNotFound(false);
                }}
                className={`text-xs px-2.5 py-1 rounded-md font-mono transition-colors ${
                  inputVal === s.resiNumber
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {s.resiNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Not Found State */}
        {notFound && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center text-amber-900 mb-8 animate-in fade-in">
            <AlertCircle className="w-10 h-10 text-amber-600 mx-auto mb-2" />
            <h3 className="font-bold text-base">Nomor Resi "{inputVal}" Belum Ditemukan</h3>
            <p className="text-xs text-amber-700 mt-1 max-w-md mx-auto">
              Pastikan format nomor resi benar (diawali dengan MK- atau CK-), atau resi baru saja diinput di sistem loket cabang dalam 15 menit terakhir.
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <a
                href={`https://wa.me/6287882621638?text=Halo%20CS%20Mitra%20Kargo%20(PT%20Samudra%20Lintas%20Artha),%20mohon%20bantu%20cek%20resi%20${inputVal}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Hubungi CS Pelacakan: 0878-8262-1638
              </a>
            </div>
          </div>
        )}

        {/* Tracking Result Card */}
        {currentShipment && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            {/* Top Bar Card */}
            <div className="bg-slate-900 text-white p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Nomor Resi (Air Waybill)
                  </span>
                  <span className="font-mono text-2xl font-black text-amber-400">
                    {currentShipment.resiNumber}
                  </span>
                  {getStatusBadge(currentShipment.status)}
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Waktu Kirim: {currentShipment.createdAt} | Posisi Terkini:{' '}
                  <span className="text-amber-300 font-bold">{currentShipment.currentLocation}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenReceiptModal(currentShipment)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3.5 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95"
                  title="Cetak & Download Resi PDF Resmi dengan Barcode 2D"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Cetak Resi (PDF)
                </button>
                <a
                  href={`https://wa.me/6287882621638?text=Halo%20Mitra%20Kargo%20(PT%20Samudra%20Lintas%20Artha),%20saya%20ingin%20menanyakan%20status%20resi%20${currentShipment.resiNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Tanya CS
                </a>
              </div>
            </div>

            {/* Shipment Meta Details Grid */}
            <div className="p-6 bg-slate-50/70 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <span className="text-[11px] uppercase font-bold text-slate-400 block">Layanan:</span>
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mt-0.5 capitalize">
                  {getServiceIcon(currentShipment.serviceType)}
                  Kargo {currentShipment.serviceType.replace('_', ' ')}
                </span>
              </div>
              <div>
                <span className="text-[11px] uppercase font-bold text-slate-400 block">Berat & Colli:</span>
                <span className="text-xs font-bold text-slate-800 block mt-0.5">
                  {currentShipment.weightKg} Kg ({currentShipment.colliCount} Koli)
                </span>
              </div>
              <div>
                <span className="text-[11px] uppercase font-bold text-slate-400 block">Estimasi Tiba:</span>
                <span className="text-xs font-bold text-amber-700 block mt-0.5">
                  {currentShipment.estimatedDelivery}
                </span>
              </div>
              <div>
                <span className="text-[11px] uppercase font-bold text-slate-400 block">Status Pembayaran:</span>
                <span className="text-xs font-bold text-emerald-700 block mt-0.5">
                  {currentShipment.paymentStatus} (Rp {currentShipment.totalCost.toLocaleString('id-ID')})
                </span>
              </div>
            </div>

            {/* Route Overview */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-slate-200">
              {/* Pengirim */}
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Data Pengirim
                </span>
                <div className="font-bold text-slate-900 text-sm">{currentShipment.senderName}</div>
                <div className="text-xs text-slate-600 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                  Kota Asal: {currentShipment.senderCity}
                </div>
                <div className="text-xs text-slate-500 mt-1">Telp: {currentShipment.senderPhone}</div>
              </div>

              {/* Penerima */}
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Data Penerima & Alamat Tujuan
                </span>
                <div className="font-bold text-slate-900 text-sm">{currentShipment.recipientName}</div>
                <div className="text-xs text-slate-600 mt-1 flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>{currentShipment.recipientAddress}</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">Telp: {currentShipment.recipientPhone}</div>
              </div>
            </div>

            {/* Checkpoints Timeline History */}
            <div className="p-6">
              <h4 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                Riwayat Perjalanan & Riwayat Posisi (Checkpoints)
              </h4>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {currentShipment.checkpoints.map((cp, idx) => {
                  const isLatest = idx === currentShipment.checkpoints.length - 1;
                  return (
                    <div key={cp.id} className="relative group">
                      {/* Dot icon */}
                      <div 
                        className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm transition-transform ${
                          isLatest 
                            ? 'bg-blue-600 ring-4 ring-blue-100 scale-125' 
                            : 'bg-slate-400'
                        }`} 
                      />

                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 group-hover:border-blue-200 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <span className="font-bold text-sm text-slate-900">
                            {cp.location}
                          </span>
                          <span className="text-xs font-semibold text-slate-500 font-mono">
                            {cp.timestamp}
                          </span>
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed">
                          {cp.description}
                        </p>

                        {cp.officerName && (
                          <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                            <User className="w-3 h-3 text-slate-400" />
                            Petugas / Penanggung Jawab: {cp.officerName}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
