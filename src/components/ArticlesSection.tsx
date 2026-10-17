import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  Sparkles,
  Layers,
  ChevronRight,
  TrendingUp,
  Share2
} from 'lucide-react';
import { LogisticsArticle, ArticleCategory } from '../types';

interface ArticlesSectionProps {
  articles: LogisticsArticle[];
  onOpenArticle: (article: LogisticsArticle) => void;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({
  articles,
  onOpenArticle
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: string[] = [
    'Semua',
    'Tips Packing',
    'Info Pelabuhan',
    'Update Regulasi',
    'Panduan Logistik'
  ];

  // Only show published articles on public site
  const publishedArticles = articles.filter(a => a.status === 'dipublikasikan');

  const filteredArticles = publishedArticles.filter(article => {
    const matchesCat = selectedCategory === 'Semua' || article.category === selectedCategory;
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.targetKeywords.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const featuredArticle = publishedArticles[0];

  return (
    <section id="artikel-logistik" className="py-20 bg-gradient-to-b from-white via-slate-50 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-700 font-bold text-xs px-3.5 py-1.5 rounded-full mb-3 uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-amber-600" />
            Edukasi & Wawasan Logistik
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Artikel Logistik & Tips Ekspedisi
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Panduan lengkap teknik packing aman, jadwal operasional pelabuhan kapal roro & kontainer, hingga regulasi resmi Kemenhub untuk kelancaran distribusi kargo Anda.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
          
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari topik atau kata kunci..."
              className="w-full bg-white pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-2xs"
            />
          </div>

        </div>

        {/* Articles List / Grid */}
        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs max-w-md mx-auto">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">Tidak ada artikel yang cocok</h3>
            <p className="text-xs text-slate-500 mt-1">
              Coba gunakan kata kunci pencarian yang lain atau pilih kategori "Semua".
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Semua');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400 transition-colors"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => onOpenArticle(article)}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-amber-400/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer hover:-translate-y-1"
              >
                {/* Article Cover Image */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="bg-slate-950/80 backdrop-blur-md text-amber-300 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-xs">
                      {article.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {article.readTimeMinutes} mnt
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] text-slate-400 mb-2 flex items-center justify-between">
                      <span>{article.publishedAt}</span>
                      <span className="text-slate-500 font-medium">Oleh {article.author.split(' ')[0]}</span>
                    </div>
                    
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug mb-2.5">
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {article.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-600 group-hover:text-amber-700 flex items-center gap-1.5 transition-colors">
                        Baca Selengkapnya
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {article.viewsCount.toLocaleString('id-ID')} views
                      </span>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

        {/* Quick Highlights / SEO Value Banner */}
        <div className="mt-14 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-black uppercase tracking-wider bg-slate-950 text-white px-2.5 py-0.5 rounded">
              Pusat Edukasi Kargo
            </span>
            <h3 className="text-xl sm:text-2xl font-black mt-2">
              Ingin Mengetahui Tarif Khusus Komoditas Anda?
            </h3>
            <p className="text-slate-900 text-xs sm:text-sm font-medium">
              Konsultasikan jenis barang, dimensi kemasan kayu, dan rute pengiriman bersama konsultan logistik resmi kami.
            </p>
          </div>
          <a
            href="https://wa.me/6281288992345?text=Halo%20Cahaya%20Kargo,%20saya%20ingin%20konsultasi%20packing%20dan%20tarif%20pengiriman%20kargo."
            target="_blank"
            rel="noreferrer"
            className="bg-slate-950 hover:bg-slate-900 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md text-xs sm:text-sm whitespace-nowrap flex items-center gap-2 cursor-pointer"
          >
            Konsultasi Gratis via WA
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </a>
        </div>

      </div>
    </section>
  );
};
