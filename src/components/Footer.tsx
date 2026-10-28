import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  LogIn,
  Search,
  Globe,
  Compass,
  Layers,
  Truck,
  CheckCircle2
} from 'lucide-react';
import { CahayaKargoLogo } from './CahayaKargoLogo';
import { CompanyProfile } from '../types';

interface FooterProps {
  companyProfile: CompanyProfile;
  onOpenAdminModal?: () => void;
  isAdminLoggedIn?: boolean;
  onGoToAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  companyProfile,
}) => {
  return (
    <footer id="kontak" className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* =========================================================================
            SECTION 1: MAIN FOOTER NAVIGATION GRID
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <CahayaKargoLogo variant="white" customLogoUrl={companyProfile.logoUrl} />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              PT Samudra Lintas Artha (Mitra Kargo) merupakan penyedia jasa transportasi pengiriman barang kargo darat, laut, udara, sewa armada truk dan jasa pindahan dengan jaringan terluas ke 38 provinsi di Indonesia melalui portal mitrakargo.net.
            </p>

            <div className="space-y-2 text-xs pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>{companyProfile.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Hotline: {companyProfile.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Email: {companyProfile.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>{companyProfile.operatingHours}</span>
              </div>
            </div>
          </div>

          {/* Layanan Utama */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-amber-500" />
              Layanan Utama
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Kargo Darat (Trucking Door-to-Door)</a></li>
              <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Kargo Laut (Kapal Roro & Kontainer FCL/LCL)</a></li>
              <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Kargo Udara (Air Freight Express Port to Door)</a></li>
              <li><a href="#armada" className="hover:text-amber-400 transition-colors">Sewa Truk CDD, Fuso & Tronton Wingbox</a></li>
              <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Jasa Pindahan Rumah, Kantor & Gudang</a></li>
              <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Project Cargo & Kirim Alat Berat Konstruksi</a></li>
              <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Jasa Kirim Motor & Mobil Towing Antar Pulau</a></li>
              <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Cold Chain & Reefer Container Kargo Beku</a></li>
            </ul>
          </div>

          {/* Rute Favorit (Diperbanyak dan Lebih Lengkap) */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-amber-500" />
              Rute Favorit
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#cek-tarif" className="hover:text-amber-400 transition-colors">Ekspedisi Jakarta ke Surabaya</a></li>
              <li><a href="#cek-tarif" className="hover:text-amber-400 transition-colors">Ekspedisi Jakarta ke Medan</a></li>
              <li><a href="#cek-tarif" className="hover:text-amber-400 transition-colors">Ekspedisi Jakarta ke Makassar</a></li>
              <li><a href="#cek-tarif" className="hover:text-amber-400 transition-colors">Ekspedisi Jakarta ke Balikpapan & IKN</a></li>
              <li><a href="#cek-tarif" className="hover:text-amber-400 transition-colors">Ekspedisi Surabaya ke Banjarmasin</a></li>
              <li><a href="#cek-tarif" className="hover:text-amber-400 transition-colors">Ekspedisi Jakarta ke Denpasar Bali</a></li>
              <li><a href="#cek-tarif" className="hover:text-amber-400 transition-colors">Ekspedisi Jakarta ke Pontianak & Samarinda</a></li>
              <li><a href="#cek-tarif" className="hover:text-amber-400 transition-colors">Ekspedisi Jakarta ke Palembang & Lampung</a></li>
              <li><a href="#cek-tarif" className="hover:text-amber-400 transition-colors">Ekspedisi Jakarta ke Batam & Pekanbaru</a></li>
              <li><a href="#cek-tarif" className="hover:text-amber-400 transition-colors">Ekspedisi Surabaya ke Manado & Ambon</a></li>
              <li><a href="#cek-tarif" className="hover:text-amber-400 transition-colors">Ekspedisi Jakarta ke Jayapura Papua</a></li>
              <li><a href="#cek-tarif" className="hover:text-amber-400 transition-colors">Ekspedisi Jakarta ke Kupang & Mataram Lombok</a></li>
            </ul>
          </div>

          {/* Bantuan & Akses Admin */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-500" />
              Bantuan & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#lacak-resi" className="hover:text-amber-400 transition-colors">Cek Status Resi Pengiriman Real-Time</a></li>
              <li><a href="#faq" className="hover:text-amber-400 transition-colors">Syarat & Ketentuan Pengiriman Barang</a></li>
              <li><a href="#faq" className="hover:text-amber-400 transition-colors">Kebijakan Asuransi All-Risk & Klaim</a></li>
              <li><a href="#faq" className="hover:text-amber-400 transition-colors">Daftar Barang Berbahaya (Dangerous Goods)</a></li>
              <li><a href="#faq" className="hover:text-amber-400 transition-colors">Standar Packing Kayu & Bubble Wrap</a></li>
              <li className="pt-2">
                <a
                  href="https://mitrakargo.ai.studio/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-500 text-amber-400 hover:text-amber-300 font-bold text-xs transition-colors cursor-pointer shadow-2xs"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login Portal</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* =========================================================================
            SECTION 2: COMPREHENSIVE CATEGORIZED SEO DIRECTORY (SEO-FRIENDLY LINKS)
            Columns: 'Layanan Utama', 'Rute Populer', 'Industri & Solusi', 'Area Jangkauan'
           ========================================================================= */}
        <div className="pt-2 pb-6 border-b border-slate-800/70">
          <div className="flex items-center gap-2 mb-6">
            <Globe className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Direktori Solusi Logistik & Jaringan Nasional
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-[11px]">
            {/* Column 1: Layanan Utama */}
            <div className="space-y-2.5">
              <h5 className="font-semibold text-slate-300 border-l-2 border-amber-500 pl-2 text-xs">
                Layanan Utama
              </h5>
              <ul className="space-y-1.5 text-slate-400">
                <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Jasa Kargo Darat Truk CDD, Fuso & Tronton</a></li>
                <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Pengiriman Kargo Laut Kapal Roro Cepat</a></li>
                <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Jasa Sewa Kontainer FCL & LCL Antar Pulau</a></li>
                <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Kargo Udara Sehari Sampai Port-to-Door</a></li>
                <li><a href="#armada" className="hover:text-amber-400 transition-colors">Sewa Truk Tronton Wingbox Harian Bulanan</a></li>
                <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Jasa Pindahan Rumah & Apartemen Profesional</a></li>
                <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Jasa Pindahan Kantor, Ruko & Relokasi Pabrik</a></li>
                <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Ekspedisi Pengiriman Motor Bebek, Matic & Moge</a></li>
                <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Jasa Kirim Mobil Car Carrier & Towing Gendong</a></li>
                <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Project Cargo Pengiriman Alat Berat Konstruksi</a></li>
              </ul>
            </div>

            {/* Column 2: Rute Populer */}
            <div className="space-y-2.5">
              <h5 className="font-semibold text-slate-300 border-l-2 border-amber-500 pl-2 text-xs">
                Rute Populer
              </h5>
              <ul className="space-y-1.5 text-slate-400">
                <li><a href="#cek-tarif" className="hover:text-amber-400 transition-colors">Ekspedisi Murah Jakarta ke Surabaya Door-to-Door</a></li>
                <li><a href="#cek-tarif" className="hover:text-amber-400 transition-colors">Kargo Jakarta ke Medan Tarif Termurah</a></li>
                <li><a href="#cek-tarif" className="hover:text-amber-400 transition-colors">Ekspedisi Jakarta ke Makassar Kapal Roro Cepat</a></li>
                <li><a href="#cek-tarif" className="hover:text-amber-400 transition-colors">Kargo Logistik Balikpapan & Kawasan IKN</a></li>
                <li><a href="#cek-tarif" className="hover:text-amber-400 transition-colors">Ekspedisi Surabaya ke Banjarmasin & Palangkaraya</a></li>
                <li><a href="#cek-tarif" className="hover:text-amber-400 transition-colors">Kargo Murah Jakarta ke Denpasar Bali & Mataram</a></li>
                <li><a href="#cek-tarif" className="hover:text-amber-400 transition-colors">Pengiriman Jakarta ke Pontianak & Singkawang</a></li>
                <li><a href="#cek-tarif" className="hover:text-amber-400 transition-colors">Ekspedisi Jakarta ke Palembang & Bandar Lampung</a></li>
                <li><a href="#cek-tarif" className="hover:text-amber-400 transition-colors">Kargo Express Jakarta ke Batam & Kepulauan Riau</a></li>
                <li><a href="#cek-tarif" className="hover:text-amber-400 transition-colors">Ekspedisi Jakarta ke Jayapura, Timika & Sorong</a></li>
              </ul>
            </div>

            {/* Column 3: Industri & Solusi */}
            <div className="space-y-2.5">
              <h5 className="font-semibold text-slate-300 border-l-2 border-amber-500 pl-2 text-xs">
                Industri & Solusi
              </h5>
              <ul className="space-y-1.5 text-slate-400">
                <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Logistik Distribusi FMCG & Ritel Nasional</a></li>
                <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Pengiriman Material Konstruksi & Besi Baja</a></li>
                <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Ekspedisi Sparepart Alat Berat & Pertambangan</a></li>
                <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Distribusi Produk Farmasi & Alat Medis</a></li>
                <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Logistik Komoditas Pertanian & Perkebunan</a></li>
                <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Cold Chain Storage & Truk Reefer Frozen Food</a></li>
                <li><a href="#layanan" className="hover:text-amber-400 transition-colors">E-commerce B2B Warehouse & Fulfillment Service</a></li>
                <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Jasa Packing Kayu Standar Ekspor & Palletizing</a></li>
                <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Asuransi Kargo Komprehensif All-Risk Marine</a></li>
                <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Dedicated Fleet Contract Logistik Perusahaan</a></li>
              </ul>
            </div>

            {/* Column 4: Area Jangkauan */}
            <div className="space-y-2.5">
              <h5 className="font-semibold text-slate-300 border-l-2 border-amber-500 pl-2 text-xs">
                Area Jangkauan
              </h5>
              <ul className="space-y-1.5 text-slate-400">
                <li><a href="#jangkauan" className="hover:text-amber-400 transition-colors">Jangkauan 38 Provinsi & 514 Kota/Kabupaten</a></li>
                <li><a href="#jangkauan" className="hover:text-amber-400 transition-colors">Jaringan Ekspedisi Pulau Jawa & Madura Terpadu</a></li>
                <li><a href="#jangkauan" className="hover:text-amber-400 transition-colors">Koridor Kargo Lintas Sumatera (Aceh - Lampung)</a></li>
                <li><a href="#jangkauan" className="hover:text-amber-400 transition-colors">Jalur Distribusi Kalimantan Barat, Tengah, Timur & Selatan</a></li>
                <li><a href="#jangkauan" className="hover:text-amber-400 transition-colors">Pelabuhan Kargo Laut Sulawesi & Hub Makassar</a></li>
                <li><a href="#jangkauan" className="hover:text-amber-400 transition-colors">Pengiriman Kepulauan Bali, NTB & NTT</a></li>
                <li><a href="#jangkauan" className="hover:text-amber-400 transition-colors">Jaringan Kargo Maluku & Maluku Utara</a></li>
                <li><a href="#jangkauan" className="hover:text-amber-400 transition-colors">Ekspedisi Logistik Seluruh Tanah Papua</a></li>
                <li><a href="#jangkauan" className="hover:text-amber-400 transition-colors">Hub Pergudangan Marunda & Cakung Jakarta Utara</a></li>
                <li><a href="#jangkauan" className="hover:text-amber-400 transition-colors">Depo Transit Tanjung Perak Surabaya & Tanjung Mas</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 3: BOTTOM BAR (COPYRIGHT & CERTIFICATIONS)
           ========================================================================= */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {companyProfile.name}. Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Sertifikasi ISO 9001:2015 & ALFI/ILFA
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">
              Izin Kemenhub RI: SK.00412/ALFI-LOG/JKT/2026
            </span>
          </div>
        </div>

        {/* =========================================================================
            SECTION 4: EXTENSIVE GOOGLE SEARCH KEYWORD INDEX (VERY BOTTOM)
            Massively expanded long-tail keywords for search engine indexing
           ========================================================================= */}
        <div className="pt-6 border-t border-slate-900 text-[11px] text-slate-500 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <p className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
              Index Pencarian Google:
            </p>
          </div>
          
          <div className="space-y-2 text-slate-500/90 leading-relaxed text-justify text-[11px]">
            <p>
              jasa ekspedisi murah jakarta | kargo darat surabaya murah | tarif kirim motor antar pulau | kargo kapal laut makassar | jasa pindahan rumah profesional | sewa fuso tronton wingbox harian bulanan | cek resi mitra kargo online | cek resi pt samudra lintas artha | ekspedisi logistik alat berat balikpapan ikn | kargo udara sehari sampai bandara soekarno hatta kualanamu | ekspedisi jakarta medan murah | kargo jakarta pontianak termurah | tarif kirim mobil jakarta bali towing car carrier | jasa kargo laut fcl lcl kontainer tanjung priok tanjung perak | pengiriman cepat jakarta semarang bandung yogyakarta | sewa truk cdd box long kapasitas besar | ekspedisi cargo surabaya banjarmasin balikpapan samarinda | jasa angkut pindahan kantor antar provinsi | ekspedisi kirim sparepart mesin genset trafo pabrik | ongkir ekspedisi cargo murah door to door | pengiriman kapal roro cepat jakarta batam pangkal pinang | ekspedisi cargo jakarta ambon kupang mataram ternate | kargo murah jakarta sorong manokwari timika jayapura papua | jasa kirim motor matic vespa sport moge packing kayu garansi | sewa truk tronton lossbak trailer 20ft 40ft lowbed | jasa ekspedisi frozen food reefer container kargo pendingin | ekspedisi cairan kimia dangerous goods bersertifikat | ekspedisi jakarta padang pekanbaru jambi palembang lampung | jasa packing kayu pallet bubble wrap wrapping plastik aman | logistik pergudangan supply chain b2b kontrak pengiriman pabrik distributor | cek tarif ongkir kargo terupdate hari ini | lacak status pengiriman resi live tracking gps | ekspedisi resmi terdaftar kemenhub alfi ilfa asosiasi logistik indonesia.
            </p>
            <p>
              jasa pengiriman barang berat jakarta | kargo murah bandung surabaya malang | tarif ekspedisi jakarta kendari palu gorontalo | ekspedisi kargo tarakan nunukan tanjung selor | kargo kapal pelni kirim barang antar pulau | jasa pindahan kos mahasiswa jabodetabek | sewa armada truk pick up grand max l300 harian | kirim barang konveksi garmen tekstil tanah abang ke daerah | ekspedisi kirim kabel fiber optic tiang pln proyek | ekspedisi mesin fotocopy printer percetakan aman bergaransi | tarif cargo kilat satu hari sampai sicepat jne j&t cargo wahana dakota indah cargo alternatif | ekspedisi kirim furniture mebel jepara ke sumatera kalimantan | jasa kirim kasur lemari kulkas mesin cuci pindahan rumah tangga | ekspedisi pengiriman pipa besi plat baja konstruksi | sewa truk engkel cde 4 roda bak terbuka box tertutup | jasa drop barang gudang shopee lazada tokopedia tiktok shop fulfillment | kargo udara spesialis kirim dokumen berharga dan sampel laboratorium | ekspedisi kirim hewan peliharaan bersertifikat karantina | kargo bibit tanaman benih pertanian hidroponik | ekspedisi makanan kering snack herbal kopi ke seluruh indonesia | ekspedisi logistik solar bbm industri tambang sawit batubara sumatera kalimantan | kargo sewa satu truk carter fuso jakarta surabaya bali | pengiriman velg ban mobil motor grosir sparepart variasi | ekspedisi peralatan pesta tenda sound system panggung event organizer | jasa bongkar muat kargo pelabuhan stevedoring cargodores trucking indonesia.
            </p>
            <p>
              daftar tarif kargo per kilogram termurah indonesia | ekspedisi jakarta pangkal pinang tanjung pandan belitung | kargo kapal roro jakarta pontianak waktu tempuh cepat | tarif kirim motor beat scoopy vario nmax pcx klx antar pulau | ekspedisi jakarta bengkulu lubuklinggau lahat curup | jasa pindahan apartemen jakarta barat selatan utara timur pusat | vendor logistik distribusi sembako beras gula minyak goreng | ekspedisi material keramik genteng semen mortar proyek perumahan | sewa tronton drop deck dolly trailer angkut traktor dozer | ekspedisi cargo surabaya denpasar mataram bima sumbawa | pengiriman kargo laut jakarta merauke fakfak kaimana biak serui | kargo murah jakarta banda aceh lhokseumawe meulaboh | cek nomor resi pengiriman barang cepat akurat 24 jam | call center customer service ekspedisi kargo fast response whatsapp 087882621638 | ekspedisi aman terpercaya berasuransi all risk pt samudra lintas artha mitrakargo.net.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};
