import React, { useState } from 'react';
import { 
  Star, 
  MessageSquarePlus, 
  ShieldCheck, 
  CheckCircle2, 
  User, 
  Building2, 
  MapPin, 
  X, 
  Send,
  ThumbsUp,
  Quote
} from 'lucide-react';
import { Testimonial, ServiceType } from '../types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  onSubmitTestimonial: (newReview: Omit<Testimonial, 'id' | 'createdAt' | 'status'>) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  onSubmitTestimonial,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [roleOrCompany, setRoleOrCompany] = useState('');
  const [city, setCity] = useState('Jakarta');
  const [rating, setRating] = useState(5);
  const [serviceType, setServiceType] = useState<ServiceType>('darat');
  const [comment, setComment] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Filter only approved testimonials for public display
  const approvedTestimonials = testimonials.filter((t) => t.status === 'disetujui');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    onSubmitTestimonial({
      name: name.trim(),
      roleOrCompany: roleOrCompany.trim() || 'Pelanggan Setia',
      city: city.trim(),
      rating,
      serviceType,
      comment: comment.trim(),
      isVerifiedBuyer: true
    });

    setSubmittedSuccess(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSubmittedSuccess(false);
    setName('');
    setRoleOrCompany('');
    setComment('');
    setRating(5);
  };

  const getServiceLabel = (type: ServiceType) => {
    switch (type) {
      case 'darat': return 'Kargo Darat';
      case 'laut': return 'Kargo Laut';
      case 'udara': return 'Kargo Udara';
      case 'sewa_truk': return 'Sewa Truk Charter';
      case 'pindahan': return 'Jasa Pindahan';
      default: return 'Logistik';
    }
  };

  return (
    <section id="testimoni" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-1.5 text-amber-700 bg-amber-100 px-3 py-1 rounded-full text-xs font-bold mb-3">
              <ThumbsUp className="w-3.5 h-3.5" />
              Kepuasan Pelanggan Nyata
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Testimoni Klien & Mitra Pengiriman
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-2xl">
              Dipercaya oleh ratusan pabrik manufaktur, distributor nasional, UMKM e-commerce, hingga pengiriman perorangan di seluruh Indonesia.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-xs text-center">
              <div className="flex items-center justify-center gap-1 text-amber-500 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-800">4.9 / 5.0 Rating Kepuasan</span>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-extrabold px-5 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer active:scale-95"
            >
              <MessageSquarePlus className="w-4 h-4 text-amber-400" />
              Tulis Testimoni Anda
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {approvedTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between relative group"
            >
              <Quote className="absolute right-5 top-5 w-8 h-8 text-slate-100 group-hover:text-amber-100 transition-colors pointer-events-none" />

              <div>
                {/* Rating & Service Badge */}
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 uppercase">
                    {getServiceLabel(item.serviceType)}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{item.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm text-slate-900">{item.name}</span>
                    {item.isVerifiedBuyer && (
                      <span title="Pelanggan Terverifikasi">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {item.roleOrCompany} &bull; <span className="text-slate-700 font-semibold">{item.city}</span>
                  </div>
                </div>

                <span className="text-[10px] text-slate-400 font-mono">
                  {item.createdAt}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* MODAL: SUBMIT TESTIMONIAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  <Star className="w-5 h-5 fill-slate-950" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-white">Beri Ulasan / Testimoni</h3>
                  <p className="text-[11px] text-slate-400">Bagikan pengalaman pengiriman Anda bersama Mitra Kargo (PT Samudra Lintas Artha)</p>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedSuccess ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Terima Kasih Atas Ulasan Anda!</h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Ulasan Anda telah berhasil dikirim. Sesuai kebijakan kepatuhan website, testimoni akan segera tampil setelah disetujui oleh tim moderator admin.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleCloseModal}
                    className="bg-slate-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-slate-800 transition-colors"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
                
                {/* Rating Stars Input */}
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Rating Kepuasan Layanan:
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 focus:outline-none transition-transform hover:scale-125"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-amber-700 ml-2 bg-amber-50 px-2 py-0.5 rounded">
                      {rating} Bintang ({rating === 5 ? 'Sangat Puas' : rating === 4 ? 'Puas' : 'Cukup'})
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Contoh: Budi Santoso"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Perusahaan / Toko / Jabatan</label>
                    <input
                      type="text"
                      value={roleOrCompany}
                      onChange={(e) => setRoleOrCompany(e.target.value)}
                      placeholder="Contoh: PT Jaya Abadi / Pelanggan Pribadi"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Kota Domisili / Asal Muatan *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Contoh: Jakarta / Surabaya / Medan"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Layanan Kargo Yang Digunakan *</label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value as ServiceType)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:bg-white"
                    >
                      <option value="darat">Kargo Darat (Trucking)</option>
                      <option value="laut">Kargo Laut (Kapal Roro / Kontainer)</option>
                      <option value="udara">Kargo Udara (Air Freight)</option>
                      <option value="sewa_truk">Sewa Truk Charter (FTL)</option>
                      <option value="pindahan">Jasa Pindahan</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ulasan / Pengalaman Pengiriman *</label>
                  <textarea
                    rows={3}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Ceritakan pengalaman Anda seputar kecepatan pengiriman, kondisi barang, ketepatan waktu, dan keramahan kurir/admin..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Kirim Ulasan Sekarang
                  </button>
                  <p className="text-[10px] text-slate-400 text-center mt-2">
                    Ulasan Anda akan dimoderasi tim admin sebelum dipublikasikan ke publik.
                  </p>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
export default TestimonialsSection;
