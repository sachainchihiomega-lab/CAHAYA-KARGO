import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Check, 
  Copy, 
  ArrowRight, 
  Bookmark, 
  MessageSquare,
  ShieldCheck,
  Tag,
  BookOpen
} from 'lucide-react';
import { LogisticsArticle, CompanyProfile } from '../types';

interface ArticleDetailModalProps {
  article: LogisticsArticle | null;
  isOpen: boolean;
  onClose: () => void;
  allArticles: LogisticsArticle[];
  onSelectArticle: (article: LogisticsArticle) => void;
  onOpenQuoteModal: () => void;
  companyProfile: CompanyProfile;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  isOpen,
  onClose,
  allArticles,
  onSelectArticle,
  onOpenQuoteModal,
  companyProfile
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !article) return null;

  const currentUrl = typeof window !== 'undefined' ? `${window.location.origin}/#artikel-${article.slug}` : '';

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Baca artikel logistik menarik dari Cahaya Kargo: "${article.title}"\n${currentUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const relatedArticles = allArticles
    .filter(a => a.id !== article.id && a.status === 'dipublikasikan')
    .slice(0, 3);

  // Helper to render markdown-like content cleanly
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let tableRows: string[][] = [];
    let inTable = false;

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Check table
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        inTable = true;
        // Ignore separator row like | :--- | :--- |
        if (trimmed.includes('---')) return;
        const cols = trimmed.split('|').slice(1, -1).map(c => c.trim());
        tableRows.push(cols);
        return;
      } else if (inTable) {
        // Table ended, flush
        if (tableRows.length > 0) {
          const header = tableRows[0];
          const rows = tableRows.slice(1);
          elements.push(
            <div key={`table-${index}`} className="my-6 overflow-x-auto rounded-xl border border-slate-200 shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                    {header.map((h, i) => (
                      <th key={i} className="p-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {rows.map((row, ri) => (
                    <tr key={ri} className="hover:bg-slate-50 transition-colors">
                      {row.map((col, ci) => (
                        <td key={ci} className="p-3 text-slate-700">{col}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
          tableRows = [];
        }
        inTable = false;
      }

      // Heading 2
      if (trimmed.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-8 mb-4 border-b border-slate-100 pb-2">
            {trimmed.replace('## ', '')}
          </h2>
        );
        return;
      }

      // Heading 3
      if (trimmed.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-lg sm:text-xl font-bold text-slate-900 mt-6 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            {trimmed.replace('### ', '')}
          </h3>
        );
        return;
      }

      // Blockquote / Tip Box
      if (trimmed.startsWith('> ')) {
        elements.push(
          <div key={index} className="my-6 p-4 rounded-xl bg-amber-50 border-l-4 border-amber-500 text-amber-900 text-sm leading-relaxed">
            {trimmed.replace('> ', '').replace(/\*\*(.*?)\*\*/g, '$1')}
          </div>
        );
        return;
      }

      // Formula block
      if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) {
        elements.push(
          <div key={index} className="my-4 p-4 rounded-xl bg-slate-900 text-amber-300 font-mono text-sm sm:text-base text-center shadow-inner overflow-x-auto">
            {trimmed.replace(/\$\$/g, '').replace(/\\text\{(.*?)\}/g, '$1').replace(/\\times/g, '×').replace(/\\div/g, '÷').replace(/\\frac\{(.*?)\}\{(.*?)\}/g, '($1) / $2')}
          </div>
        );
        return;
      }

      // Bullet points
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const text = trimmed.substring(2);
        elements.push(
          <li key={index} className="text-slate-700 text-sm sm:text-base leading-relaxed ml-4 my-1 list-disc">
            {text}
          </li>
        );
        return;
      }

      // Numbered points
      if (/^\d+\.\s/.test(trimmed)) {
        const text = trimmed.replace(/^\d+\.\s/, '');
        elements.push(
          <li key={index} className="text-slate-700 text-sm sm:text-base leading-relaxed ml-4 my-1.5 list-decimal">
            {text}
          </li>
        );
        return;
      }

      // Empty line
      if (!trimmed) {
        return;
      }

      // Regular paragraph
      elements.push(
        <p key={index} className="text-slate-700 text-sm sm:text-base leading-relaxed my-3">
          {trimmed}
        </p>
      );
    });

    return elements;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col border border-slate-200">
        
        {/* Sticky Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <span className="bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {article.category}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {article.readTimeMinutes} menit baca
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-2 rounded-xl transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Cover Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-md max-h-80 w-full bg-slate-100">
            <img 
              src={article.coverImage} 
              alt={article.title}
              className="w-full h-64 sm:h-80 object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-white text-xs">
              <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Dipublikasikan: {article.publishedAt}
              </span>
              <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg">
                <User className="w-3.5 h-3.5 text-blue-400" />
                {article.author} {article.authorRole ? `(${article.authorRole})` : ''}
              </span>
            </div>
          </div>

          {/* Title & Excerpt */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {article.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mt-3 font-normal leading-relaxed border-l-4 border-amber-500 pl-4 py-1 bg-amber-50/50 rounded-r-xl">
              {article.excerpt}
            </p>
          </div>

          {/* Social Share & Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-y border-slate-100 text-xs sm:text-sm text-slate-500">
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-amber-500" />
              {article.tags.map((tag, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-700 font-medium px-2.5 py-0.5 rounded-md text-xs">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShareWhatsApp}
                className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
              >
                <Share2 className="w-3.5 h-3.5" />
                Bagikan WA
              </button>
              <button
                onClick={handleCopyLink}
                className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Tersalin!' : 'Salin Link'}
              </button>
            </div>
          </div>

          {/* Main Article Content */}
          <article className="prose prose-slate max-w-none">
            {renderFormattedContent(article.content)}
          </article>

          {/* In-Article Conversion CTA */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-8 mt-10 shadow-xl border border-slate-700">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Solusi Logistik Terpercaya
                </span>
                <h3 className="text-xl sm:text-2xl font-black">
                  Butuh Pengiriman Kargo Aman & Sesuai Regulasi?
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                  Dapatkan layanan konsultasi gratis armada, packing kayu terstandarisasi, dan penawaran tarif kargo paling ekonomis ke seluruh Indonesia bersama {companyProfile.name}.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    onClose();
                    onOpenQuoteModal();
                  }}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-3 rounded-xl transition-all shadow-lg shadow-amber-500/20 text-xs sm:text-sm whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
                >
                  Minta Penawaran Gratis
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={`https://wa.me/${companyProfile.whatsapp}?text=Halo%20Cahaya%20Kargo,%20saya%20membaca%20artikel%20"${encodeURIComponent(article.title)}"%20dan%20ingin%20konsultasi%20pengiriman.`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-3 rounded-xl transition-all text-xs sm:text-sm whitespace-nowrap flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat WhatsApp CS
                </a>
              </div>
            </div>
          </div>

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <div className="pt-8 border-t border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-500" />
                Artikel Terkait Lainnya
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onSelectArticle(rel);
                    }}
                    className="group bg-slate-50 hover:bg-amber-50/50 p-4 rounded-xl border border-slate-200 hover:border-amber-300 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded uppercase">
                        {rel.category}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors mt-2 line-clamp-2">
                        {rel.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {rel.excerpt}
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold text-amber-600 mt-3 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Baca Sekarang →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>Kata Kunci Target: <strong className="text-slate-700">{article.targetKeywords}</strong></span>
          <button
            onClick={onClose}
            className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold px-4 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
