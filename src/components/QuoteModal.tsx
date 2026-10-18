import React, { useState } from 'react';
import { X, Send, Truck, CheckCircle2, ShieldCheck, Phone, MapPin } from 'lucide-react';
import { QuoteRequest, ServiceType } from '../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitQuote: (newQuote: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>) => void;
  cities: string[];
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  onSubmitQuote,
  cities,
}) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [origin, setOrigin] = useState('Jakarta (Jabodetabek)');
  const [destination, setDestination] = useState('Surabaya');
  const [serviceType, setServiceType] = useState<ServiceType>('darat');
  const [estimatedWeightKg, setEstimatedWeightKg] = useState(150);
  const [goodsType, setGoodsType] = useState('Mesin / Suku Cadang');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitQuote({
      name,
      company,
      phone,
      email,
      origin,
      destination,
      serviceType,
      estimatedWeightKg,
      goodsType,
      notes,
    });
    setIsSuccess(true);
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">Minta Penawaran Harga Kargo</h3>
              <p className="text-xs text-slate-400">Tim Sales & Ops akan merespon dalam waktu maksimal 15 menit</p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-bold text-slate-900">Permintaan Berhasil Terkirim!</h4>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Terima kasih, <strong className="text-slate-900">{name}</strong>. Tim spesialis logistik Mitra Kargo (PT Samudra Lintas Artha) telah menerima rincian muatan Anda dan segera menghubungi nomor <strong className="text-slate-900">{phone}</strong>.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <a
                href={`https://wa.me/6287882621638?text=Halo%20Mitra%20Kargo%20(PT%20Samudra%20Lintas%20Artha),%20saya%20sudah%20submit%20form%20penawaran%20atas%20nama%20${encodeURIComponent(name)}%20rute%20${encodeURIComponent(origin)}%20ke%20${encodeURIComponent(destination)}.`}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2"
              >
                Konfirmasi Cepat via WhatsApp (0878-8262-1638)
              </a>
              <button
                onClick={resetAndClose}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-5 py-2.5 rounded-xl text-xs"
              >
                Tutup
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap / PIC *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Hendra Wijaya"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Perusahaan / Toko (Opsional)</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Contoh: PT Sumber Rejeki"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">No. WhatsApp / HP Aktif *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Contoh: 081288992345"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email (Untuk Kirim Invoice/Proposal)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Contoh: hendra@perusahaan.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kota Asal Pickup *</label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {cities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kota Tujuan Bongkar *</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {cities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Jenis Layanan Yang Diminati *</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value as ServiceType)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="darat">Kargo Darat (Trucking Door-to-Door)</option>
                  <option value="laut">Kargo Laut (Kapal Roro / Kontainer FCL-LCL)</option>
                  <option value="udara">Kargo Udara (Air Cargo Express)</option>
                  <option value="sewa_truk">Sewa Truk Charter (CDD / Fuso / Tronton)</option>
                  <option value="pindahan">Jasa Pindahan Rumah / Kantor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Perkiraan Berat Total (Kg) *</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={estimatedWeightKg}
                  onChange={(e) => setEstimatedWeightKg(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Jenis Komoditas / Barang Yang Dikirim *</label>
              <input
                type="text"
                required
                value={goodsType}
                onChange={(e) => setGoodsType(e.target.value)}
                placeholder="Contoh: Mesin tekstil, beras, kabel, furniture, dll."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Catatan Tambahan (Dimensi / Jadwal / Packing Kayu)</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Misal: Perlu packing kayu, penjemputan hari Rabu pagi, butuh faktur pajak."
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Send className="w-4 h-4" />
                Kirim Permintaan Penawaran Resmi
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
