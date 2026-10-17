import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  HelpCircle,
  Minimize2,
  RefreshCw,
  PhoneCall
} from 'lucide-react';
import { ChatMessage, CompanyProfile } from '../../types';

interface AiChatbotProps {
  companyProfile: CompanyProfile;
}

export const AiChatbot: React.FC<AiChatbotProps> = ({ companyProfile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: `Halo! Saya Cahaya AI Assistant, asisten virtual resmi PT Cahaya Kargo Indonesia. 🚚✨\n\nAda yang bisa saya bantu seputar tarif kargo, jadwal kapal/truk, rumus kubikasi, atau pelacakan resi?`,
      timestamp: 'Baru saja',
      suggestedQuestions: [
        'Berapa minimal berat pengiriman?',
        'Bagaimana rumus hitung kubikasi?',
        'Apakah bisa jemput barang ke rumah?',
        'Berapa lama estimasi Jakarta ke Surabaya?'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // Knowledge base retrieval based on user query
  const generateAiAnswer = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('minimal') || q.includes('min berat') || q.includes('paling sedikit') || q.includes('kg')) {
      if (q.includes('udara')) {
        return 'Untuk Kargo Udara (Air Cargo Express), minimal pengiriman adalah 10 Kg dengan estimasi sampai 1-2 hari (Same/Next Day).';
      }
      return 'Untuk Kargo Darat dan Laut, berat minimal pengiriman umumnya adalah 50 Kg s/d 100 Kg tergantung rute tujuan. Jika muatan Anda di bawah 50 Kg, tetap bisa dikirim dengan perhitungan tarif minimal tersebut.';
    }

    if (q.includes('rumus') || q.includes('kubikasi') || q.includes('volume') || q.includes('volumetrik') || q.includes('dimensi')) {
      return 'Rumus perhitungan berat volumetrik standar ekspedisi kargo adalah:\n• Kargo Darat & Laut: (Panjang × Lebar × Tinggi dlm cm) / 4.000\n• Kargo Udara: (P × L × T dlm cm) / 5.000\n\nBiaya pengiriman akan diambil dari angka tertinggi antara berat timbangan aktual atau berat volumetrik.';
    }

    if (q.includes('jemput') || q.includes('pickup') || q.includes('ambil') || q.includes('door to door')) {
      return 'Ya! Cahaya Kargo melayani penjemputan barang Door-to-Door GRATIS (Free Pickup) untuk area Jabodetabek, Surabaya, Bandung, Semarang, Medan, dan kota-kota besar lainnya dengan minimum berat tertentu. Armada kami akan datang langsung ke alamat Anda.';
    }

    if (q.includes('surabaya') || q.includes('jakarta ke surabaya') || q.includes('jakarta-surabaya')) {
      return 'Pengiriman Jakarta ke Surabaya:\n• Kargo Darat: Rp 2.500/Kg (Min. 50 Kg, estimasi 2-3 hari via Tol Trans Jawa)\n• Kargo Udara: Rp 18.500/Kg (Min. 10 Kg, estimasi 1 hari)\n• Sewa Truk CDD/Fuso: Tersedia charter langsung 1-2 hari sampai.';
    }

    if (q.includes('asuransi') || q.includes('klaim') || q.includes('rusak') || q.includes('hilang') || q.includes('garansi')) {
      return 'Seluruh pengiriman Cahaya Kargo dilindungi oleh Asuransi Pengiriman All-Risk resmi (premi hanya 0,2% - 0,3% dari total nilai barang). Klaim kehilangan atau kerusakan diproses cepat dan transparan dalam waktu 7-14 hari kerja dengan bukti dokumentasi yang sah.';
    }

    if (q.includes('dilarang') || q.includes('dangerous') || q.includes('baterai') || q.includes('cairan')) {
      return 'Barang yang dilarang dikirim meliputi:\n• Narkotika & obat terlarang\n• Senjata api / amunisi ilegal\n• Bahan mudah meledak tanpa dokumen MSDS\n• Hewan langka yang dilindungi\nUntuk cairan kimia atau aki/baterai litium, wajib menyertakan dokumen MSDS dan konfirmasi terlebih dahulu dengan tim operasional kami.';
    }

    if (q.includes('lacak') || q.includes('resi') || q.includes('cek resi') || q.includes('posisi')) {
      return 'Anda dapat melacak posisi kargo secara real-time 24 jam dengan memasukkan Nomor Resi (misal: CK-889210) pada kolom "Lacak Resi" di menu atas website ini, atau langsung konfirmasi ke CS kami.';
    }

    if (q.includes('sewa truk') || q.includes('charter') || q.includes('fuso') || q.includes('tronton') || q.includes('wingbox') || q.includes('cdd')) {
      return 'Kami menyediakan sewa truk charter penuh (FTL) tanpa dicampur muatan orang lain. Pilihan armada: Blindvan, Pickup, CDD Long Box (4-5 Ton), Fuso Heavy Duty (8-12 Ton), dan Tronton Wingbox 3-Axle (15-25 Ton) dengan GPS aktif 24 jam.';
    }

    if (q.includes('pindahan') || q.includes('rumah') || q.includes('kantor')) {
      return 'Layanan Jasa Pindahan Cahaya Kargo meliputi survey muatan gratis, tenaga bongkar muat profesional, material packing (bubble wrap tebal, peti kayu, kardus), serta penataan kembali perabot di lokasi tujuan.';
    }

    if (q.includes('harga') || q.includes('ongkir') || q.includes('tarif') || q.includes('biaya')) {
      return 'Tarif kargo kami sangat kompetitif mulai dari Rp 2.500/Kg untuk kargo darat. Anda dapat menggunakan kalkulator "Cek Tarif" pada website kami atau klik tombol "Minta Penawaran" untuk mendapatkan proposal harga resmi.';
    }

    if (q.includes('kontak') || q.includes('telepon') || q.includes('wa') || q.includes('hubungi') || q.includes('alamat')) {
      return `Kantor Pusat kami berlokasi di Pergudangan Marunda Center, Jakarta Utara. Anda dapat menghubungi hotline kami di ${companyProfile.phone} atau WhatsApp CS 24 jam di +${companyProfile.whatsapp}.`;
    }

    // Default intelligent response
    return `Terima kasih atas pertanyaannya! PT Cahaya Kargo melayani pengiriman kargo darat, laut, udara, sewa truk, dan jasa pindahan ke seluruh Indonesia.\n\nUntuk perhitungan rute dan tarif muatan Anda (${query}), Anda dapat menggunakan menu "Cek Tarif" di atas atau langsung berkonsultasi dengan marketing kami via WhatsApp di +${companyProfile.whatsapp}.`;
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Realistic AI reply delay
    setTimeout(() => {
      const answer = generateAiAnswer(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: answer,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: [
          'Bagaimana cara cek ongkir rute lain?',
          'Berapa minimal berat kargo darat?',
          'Hubungi CS WhatsApp'
        ]
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    }, 700);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <aside aria-label="Chatbot AI" className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
          {/* WhatsApp Secondary button */}
          <a
            href={`https://wa.me/${companyProfile.whatsapp}?text=Halo%20Cahaya%20Kargo,%20saya%20ingin%20konsultasi%20pengiriman%20kargo.`}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-3.5 rounded-full shadow-lg transition-transform hover:scale-105 text-xs"
            title="Chat WhatsApp CS 24 Jam"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>WA Marketing</span>
          </a>

          {/* AI Chatbot Open Trigger */}
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold p-3.5 sm:py-3 sm:px-4 rounded-full shadow-2xl hover:shadow-blue-500/40 transition-all hover:scale-105 cursor-pointer active:scale-95"
            aria-label="Buka Chatbot AI Cahaya Kargo"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
            </span>
            <Bot className="w-5 h-5" />
            <span className="text-xs font-extrabold hidden sm:inline">Cahaya AI Support</span>
          </button>
        </aside>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[92vw] sm:w-[380px] h-[520px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white p-4 flex justify-between items-center border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md shadow-amber-500/20">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm text-white">Cahaya AI Assistant</h3>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.2 rounded border border-emerald-500/30">
                    Online 24/7
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Asisten Pintar Ekspedisi & Logistik</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Tutup Chat"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[82%] space-y-1.5`}>
                  <div
                    className={`p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none shadow-xs font-medium'
                        : 'bg-white text-slate-800 rounded-bl-none border border-slate-200 shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {msg.timestamp && (
                    <span className="text-[10px] text-slate-400 block px-1">
                      {msg.timestamp}
                    </span>
                  )}

                  {/* Suggested Question Chips */}
                  {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                    <div className="pt-1.5 flex flex-wrap gap-1.5">
                      {msg.suggestedQuestions.map((sq, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            if (sq.includes('WhatsApp')) {
                              window.open(
                                `https://wa.me/${companyProfile.whatsapp}?text=Halo%20Cahaya%20Kargo,%20saya%20ingin%20tanya%20seputar%20pengiriman.`,
                                '_blank'
                              );
                            } else {
                              handleSendMessage(sq);
                            }
                          }}
                          className="text-[11px] bg-slate-200/80 hover:bg-amber-100 hover:text-amber-900 text-slate-700 px-2.5 py-1 rounded-full transition-colors font-medium border border-slate-300/60 text-left"
                        >
                          {sq}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-slate-200 shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-[11px] text-slate-500 ml-1">Mengetik balasan...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ketik pertanyaan seputar kargo..."
                className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-xl transition-colors disabled:opacity-40 cursor-pointer flex-shrink-0"
                title="Kirim Pesan"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2 px-1">
              <span>Didukung basis pengetahuan FAQ & Data Tarif</span>
              <a
                href={`https://wa.me/${companyProfile.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-600 font-bold hover:underline"
              >
                Chat WA Manusia &rarr;
              </a>
            </div>
          </div>

        </div>
      )}
    </>
  );
};
export default AiChatbot;
