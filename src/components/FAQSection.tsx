import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Berapa minimal berat barang yang bisa dikirim melalui Cahaya Kargo?',
      a: 'Untuk Kargo Darat dan Laut, berat minimal pengiriman umumnya adalah 50 Kg s/d 100 Kg tergantung rute tujuan. Sedangkan untuk Kargo Udara (Air Cargo Express), minimal pengiriman adalah 10 Kg. Jika barang Anda di bawah batas minimal, tetap bisa dikirim dengan perhitungan tarif minimal tersebut.'
    },
    {
      q: 'Bagaimana cara perhitungan berat volumetrik barang?',
      a: 'Barang yang berukuran besar tetapi ringan akan dihitung berdasarkan volume. Rumus standar Kargo Darat dan Laut adalah: (Panjang x Lebar x Tinggi dalam cm) / 4.000. Untuk Kargo Udara rumusnya adalah: (P x L x T) / 5.000. Sistem kami akan otomatis memilih angka terbesar antara berat timbangan aktual dan berat volumetrik.'
    },
    {
      q: 'Apakah pengiriman dilindungi asuransi dan bagaimana proses klaimnya?',
      a: 'Ya, seluruh pengiriman dapat dilindungi oleh Asuransi Pengiriman All-Risk terpercaya dengan premi sangat terjangkau (0,2% - 0,3% dari total nilai barang). Jika terjadi kehilangan atau kerusakan fisik saat perjalanan, tim klaim kami akan membantu proses penggantian secara transparan dan cepat dalam waktu maksimal 7-14 hari kerja.'
    },
    {
      q: 'Apakah Cahaya Kargo menyediakan layanan jemput barang (Door-to-Door Pickup)?',
      a: 'Tentu saja! Kami melayani penjemputan barang gratis (Free Pickup) untuk area Jabodetabek, Surabaya, Bandung, Semarang, Medan dan kota-kota besar lainnya dengan minimum berat tertentu. Tim armada kami akan datang langsung ke alamat rumah, gudang, atau pabrik Anda.'
    },
    {
      q: 'Barang apa saja yang dilarang atau tidak dapat dikirim (Dangerous Goods)?',
      a: 'Barang yang dilarang meliputi narkotika, obat terlarang, senjata api/amunisi ilegal, barang mudah meledak/terbakar tanpa dokumen MSDS resmi, hewan hidup yang dilindungi, dan barang curian/melanggar hukum RI. Untuk cairan kimia dan baterai lithium, wajib menyertakan dokumen MSDS dan konfirmasi terlebih dahulu.'
    },
    {
      q: 'Apakah tersedia layanan packing kayu atau bubble wrap tambahan?',
      a: 'Ya, kami menyediakan jasa packing profesional seperti packing kayu berstandar pelayaran, bubble wrap tebal, wrapping plastik kedap air, dan kardus tebal untuk menjamin keselamatan barang berharga seperti mesin industri, elektronik, perabot kaca, hingga sepeda motor.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-blue-700 bg-blue-100 px-3 py-1 rounded-full text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Tanya Jawab Seputar Kargo
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Segala informasi penting mengenai syarat pengiriman, asuransi, dan tarif kargo.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-4 px-5 text-left font-bold text-slate-900 flex justify-between items-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer text-sm sm:text-base"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180 text-amber-600' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-5 bg-white text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
