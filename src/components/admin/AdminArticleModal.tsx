import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Globe, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  Edit3, 
  FileText, 
  Image, 
  Tag, 
  Clock, 
  User, 
  Check, 
  HelpCircle,
  Hash,
  List,
  Heading,
  Table
} from 'lucide-react';
import { LogisticsArticle, ArticleCategory, ArticleStatus } from '../../types';

interface AdminArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (article: LogisticsArticle) => void;
  initialArticle?: LogisticsArticle | null;
}

export const AdminArticleModal: React.FC<AdminArticleModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialArticle
}) => {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<ArticleCategory>('Tips Packing');
  const [status, setStatus] = useState<ArticleStatus>('dipublikasikan');
  const [excerpt, setExcerpt] = useState('');
  const [targetKeywords, setTargetKeywords] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [author, setAuthor] = useState('Tim Ahli Cahaya Kargo');
  const [authorRole, setAuthorRole] = useState('Senior Logistics Specialist');
  const [readTimeMinutes, setReadTimeMinutes] = useState(5);
  const [tags, setTags] = useState<string[]>(['LogistikIndonesia', 'CahayaKargo']);
  const [tagInput, setTagInput] = useState('');

  // Image Presets for quick selection
  const imagePresets = [
    { label: 'Gudang & Packing', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Dermaga & Kapal', url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Truk Kontainer', url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Palet & Kargo', url: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Forklift & Muatan', url: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80' },
  ];

  // Helper to generate SEO friendly slug
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  useEffect(() => {
    if (initialArticle) {
      setTitle(initialArticle.title);
      setSlug(initialArticle.slug);
      setCategory(initialArticle.category);
      setStatus(initialArticle.status);
      setExcerpt(initialArticle.excerpt);
      setTargetKeywords(initialArticle.targetKeywords);
      setMetaDescription(initialArticle.metaDescription || initialArticle.excerpt);
      setContent(initialArticle.content);
      setCoverImage(initialArticle.coverImage);
      setAuthor(initialArticle.author);
      setAuthorRole(initialArticle.authorRole || '');
      setReadTimeMinutes(initialArticle.readTimeMinutes);
      setTags(initialArticle.tags);
    } else {
      // Default new article template
      setTitle('');
      setSlug('');
      setCategory('Tips Packing');
      setStatus('dipublikasikan');
      setExcerpt('');
      setTargetKeywords('');
      setMetaDescription('');
      setCoverImage(imagePresets[0].url);
      setAuthor('Tim Ahli Cahaya Kargo');
      setAuthorRole('Senior Logistics Specialist');
      setReadTimeMinutes(5);
      setTags(['TipsPacking', 'KargoAman', 'CahayaKargo']);
      setContent(`## Ringkasan Utama

Jelaskan konteks pentingnya topik logistik ini bagi pelaku usaha dan pengirim kargo di Indonesia.

### 1. Poin Pembahasan Pertama
- Langkah 1: Persiapan dokumen dan standar kemasan.
- Langkah 2: Pemilihan moda armada yang tepat (darat / laut / udara).

### 2. Standar Kepatuhan & Regulasi
Uraikan regulasi Kemenhub, standar pelabuhan, atau prosedur keselamatan yang harus dipatuhi.

> **💡 Tips Praktis:** Berikan rekomendasi teknis yang actionable untuk pembaca.`);
    }
  }, [initialArticle, isOpen]);

  // Auto-generate slug when title changes (if user hasn't explicitly customized slug much)
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!initialArticle) {
      setSlug(generateSlug(val));
    }
  };

  // Add Tag
  const handleAddTag = () => {
    const clean = tagInput.trim().replace(/^#/, '');
    if (clean && !tags.includes(clean)) {
      setTags([...tags, clean]);
      setTagInput('');
    }
  };

  // Remove Tag
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  // Insert markdown helper into content
  const insertContentSnippet = (snippet: string) => {
    setContent(prev => prev + '\n' + snippet);
  };

  // Real-time SEO Score calculation (0 - 100)
  const calculateSeoScore = () => {
    let score = 0;
    
    // Title length (40 - 80 chars)
    if (title.length >= 35 && title.length <= 90) score += 20;
    else if (title.length > 20) score += 10;

    // Meta Description length (100 - 160 chars)
    const metaLen = (metaDescription || excerpt).length;
    if (metaLen >= 110 && metaLen <= 170) score += 20;
    else if (metaLen > 50) score += 10;

    // Target keywords present
    if (targetKeywords.length > 5) {
      score += 15;
      const firstKw = targetKeywords.split(',')[0].trim().toLowerCase();
      if (firstKw && title.toLowerCase().includes(firstKw)) score += 10;
      if (firstKw && content.toLowerCase().includes(firstKw)) score += 10;
    }

    // Content length (> 200 words)
    const wordCount = content.trim().split(/\s+/).length;
    if (wordCount >= 250) score += 15;
    else if (wordCount >= 100) score += 10;

    // Has image & tags
    if (coverImage) score += 5;
    if (tags.length >= 2) score += 5;

    return Math.min(score, 100);
  };

  const seoScore = calculateSeoScore();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Mohon masukkan judul artikel');
      return;
    }

    const finalArticle: LogisticsArticle = {
      id: initialArticle ? initialArticle.id : `art-${Date.now()}`,
      title: title.trim(),
      slug: slug.trim() || generateSlug(title),
      category,
      status,
      excerpt: excerpt.trim(),
      targetKeywords: targetKeywords.trim(),
      metaDescription: (metaDescription || excerpt).trim(),
      content: content.trim(),
      coverImage: coverImage.trim() || imagePresets[0].url,
      author: author.trim() || 'Tim Ahli Cahaya Kargo',
      authorRole: authorRole.trim(),
      readTimeMinutes: Number(readTimeMinutes) || 5,
      tags: tags.length > 0 ? tags : ['Logistik'],
      viewsCount: initialArticle ? initialArticle.viewsCount : Math.floor(Math.random() * 50) + 10,
      sharesCount: initialArticle ? initialArticle.sharesCount : 2,
      publishedAt: initialArticle ? initialArticle.publishedAt : new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      updatedAt: initialArticle ? new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : undefined,
      seoScore
    };

    onSave(finalArticle);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col border border-slate-200">
        
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/30">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black flex items-center gap-2">
                {initialArticle ? 'Edit Artikel Logistik' : 'Tulis Artikel Logistik Baru'}
                <span className="text-xs bg-slate-800 text-slate-300 font-normal px-2.5 py-0.5 rounded-full border border-slate-700">
                  SEO Organik
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Publikasikan panduan edukatif tips packing, pelabuhan kargo & regulasi Kemenhub untuk mendominasi Google.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live SEO Score Gauge */}
            <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <div className="text-right">
                <div className="text-[10px] text-slate-400 font-medium">Skor SEO Artikel</div>
                <div className="text-xs font-black text-amber-400">{seoScore}/100</div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-2 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Buttons (Editor vs Preview) */}
        <div className="bg-slate-100 px-6 py-2.5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'editor'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Form Editor
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Live Preview Artikel
            </button>
          </div>

          <div className="text-xs text-slate-500 hidden sm:block">
            Status Publikasi: <span className={status === 'dipublikasikan' ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>{status === 'dipublikasikan' ? 'Live di Web & Google' : 'Draft Admin'}</span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {activeTab === 'editor' ? (
            <form id="article-form" onSubmit={handleFormSubmit} className="space-y-6">
              
              {/* Row 1: Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Judul Artikel Logistik <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[11px] text-slate-400">
                      {title.length} karakter (Rekomendasi: 40-75)
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Contoh: Panduan Lengkap Packing Kayu Mesin & Elektronik Antar Pulau"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Kategori Artikel <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ArticleCategory)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Tips Packing">Tips Packing</option>
                    <option value="Info Pelabuhan">Info Pelabuhan</option>
                    <option value="Update Regulasi">Update Regulasi</option>
                    <option value="Panduan Logistik">Panduan Logistik</option>
                    <option value="Studi Kasus">Studi Kasus</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Slug URL & Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue-500" />
                    Slug URL SEO (Permalinks)
                  </label>
                  <div className="flex items-center">
                    <span className="bg-slate-200 border border-r-0 border-slate-300 rounded-l-xl px-3 py-2 text-xs text-slate-600 font-mono">
                      mitrakargo.net/blog/
                    </span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="panduan-packing-kayu-mesin"
                      className="w-full bg-slate-50 border border-slate-200 rounded-r-xl px-3 py-2 text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Status Publikasi
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setStatus('dipublikasikan')}
                      className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        status === 'dipublikasikan'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Publikasikan
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatus('draft')}
                      className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        status === 'draft'
                          ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Draft
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 3: Target Keywords & Meta Description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                    <span>Target Kata Kunci SEO (Pisahkan koma)</span>
                    <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded">Penting untuk Google</span>
                  </label>
                  <input
                    type="text"
                    value={targetKeywords}
                    onChange={(e) => setTargetKeywords(e.target.value)}
                    placeholder="tips packing kayu kargo, ekspedisi murah antar pulau, jadwal roro tanjung priok"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Ringkasan / Meta Description
                    </label>
                    <span className={`text-[11px] ${excerpt.length >= 110 && excerpt.length <= 165 ? 'text-emerald-600 font-bold' : 'text-slate-400'}`}>
                      {excerpt.length}/160 karakter
                    </span>
                  </div>
                  <input
                    type="text"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Deskripsi singkat yang memikat di hasil pencarian Google Snippet (120-160 karakter)..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Row 4: Cover Image & Quick Presets */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                  <span>URL Gambar Sampul (Cover Image)</span>
                  <span className="text-[11px] text-slate-400">Pilih Preset Cepat atau Input URL Kustom</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="url"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                    {imagePresets.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCoverImage(preset.url)}
                        className={`text-[11px] px-2.5 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors border ${
                          coverImage === preset.url
                            ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 5: Author, Read Time, and Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Nama Penulis
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Tim Edukasi Cahaya Kargo"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Waktu Baca (Menit)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={readTimeMinutes}
                    onChange={(e) => setReadTimeMinutes(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Tagar / Tags (Ketik & Enter)
                  </label>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      placeholder="Contoh: TipsPacking"
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="bg-slate-800 hover:bg-slate-700 text-white text-xs px-3 py-2 rounded-xl font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Tag Chips */}
              {tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  {tags.map((tag, i) => (
                    <span key={i} className="bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-slate-200">
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-slate-400 hover:text-rose-500 cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Row 6: Markdown Content with Shortcut Toolbar */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Isi Konten Artikel (Format Markdown & Teks Kaya) <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => insertContentSnippet('## Sub-Judul Baru\nUraikan penjelasan detail di sini.')}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold px-2 py-1 rounded flex items-center gap-1 cursor-pointer"
                    >
                      <Heading className="w-3 h-3" /> H2
                    </button>
                    <button
                      type="button"
                      onClick={() => insertContentSnippet('### Poin Spesifik\nPenjelasan lebih mendalam.')}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold px-2 py-1 rounded flex items-center gap-1 cursor-pointer"
                    >
                      <Heading className="w-3 h-3" /> H3
                    </button>
                    <button
                      type="button"
                      onClick={() => insertContentSnippet('- Poin ke-1\n- Poin ke-2\n- Poin ke-3')}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold px-2 py-1 rounded flex items-center gap-1 cursor-pointer"
                    >
                      <List className="w-3 h-3" /> List
                    </button>
                    <button
                      type="button"
                      onClick={() => insertContentSnippet('> **💡 Rekomendasi:** Catatan tips penting untuk pembaca.')}
                      className="bg-amber-100 hover:bg-amber-200 text-amber-900 text-[11px] font-semibold px-2 py-1 rounded flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" /> Tips Box
                    </button>
                    <button
                      type="button"
                      onClick={() => insertContentSnippet('| Kolom 1 | Kolom 2 |\n| :--- | :--- |\n| Data A | Data B |')}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold px-2 py-1 rounded flex items-center gap-1 cursor-pointer"
                    >
                      <Table className="w-3 h-3" /> Tabel
                    </button>
                  </div>
                </div>

                <textarea
                  required
                  rows={14}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tulis artikel edukasi kargo Anda di sini dengan Markdown..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs sm:text-sm font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
                />
              </div>

              {/* SEO Checklist Summary */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Audit SEO Otomatis
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    {title.length >= 35 && title.length <= 90 ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    )}
                    <span className="text-slate-600">Panjang Judul ({title.length} char)</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {excerpt.length >= 110 && excerpt.length <= 170 ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    )}
                    <span className="text-slate-600">Meta Desc ({excerpt.length} char)</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {content.trim().split(/\s+/).length >= 250 ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    )}
                    <span className="text-slate-600">Konten ({content.trim().split(/\s+/).length} kata)</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {targetKeywords.length > 5 ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    )}
                    <span className="text-slate-600">Kata Kunci Target</span>
                  </div>
                </div>
              </div>

            </form>
          ) : (
            /* Live Preview Tab */
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-md h-64 bg-slate-100">
                <img 
                  src={coverImage || imagePresets[0].url} 
                  alt={title}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase">
                    {category}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400">
                  Dipublikasikan oleh {author} • {readTimeMinutes} menit baca
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                  {title || 'Judul Artikel Anda Akan Tampil di Sini'}
                </h1>
                <p className="text-slate-600 mt-3 p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg text-sm">
                  {excerpt || 'Ringkasan meta deskripsi artikel logistik Anda...'}
                </p>
              </div>

              <div className="prose prose-slate max-w-none text-slate-800 text-sm leading-relaxed whitespace-pre-wrap">
                {content}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex justify-between items-center shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="bg-white hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2 rounded-xl text-xs sm:text-sm border border-slate-300 transition-colors cursor-pointer"
          >
            Batal
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setStatus('draft');
                setTimeout(() => {
                  const form = document.getElementById('article-form') as HTMLFormElement;
                  if (form) form.requestSubmit();
                }, 50);
              }}
              className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer border border-amber-300"
            >
              Simpan Draft
            </button>

            <button
              type="submit"
              form="article-form"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-blue-600/20 cursor-pointer flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {initialArticle ? 'Simpan Perubahan' : 'Publikasikan Artikel'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
