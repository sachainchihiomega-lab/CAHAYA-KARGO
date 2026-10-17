import React, { useRef, useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Share2, 
  Check, 
  ShieldCheck, 
  FileText, 
  Building2, 
  Phone, 
  MapPin, 
  Calendar, 
  Truck, 
  Plane, 
  Ship, 
  Layers, 
  QrCode,
  Sparkles
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { TrackingShipment, CompanyProfile } from '../../types';
import { CahayaKargoLogo } from '../CahayaKargoLogo';
import { Barcode2D } from './Barcode2D';
import { Barcode1D } from './Barcode1D';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  shipment: TrackingShipment | null;
  companyProfile: CompanyProfile;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  shipment,
  companyProfile,
}) => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !shipment) return null;

  // Calculate volumetric weight
  const volWeight = shipment.dimensions
    ? Math.round((shipment.dimensions.length * shipment.dimensions.width * shipment.dimensions.height) / 4000)
    : Math.round(shipment.weightKg * 1.1);

  const chargeableWeight = Math.max(shipment.weightKg, volWeight);

  // Download PDF using html2canvas and jsPDF
  const handleDownloadPdf = async () => {
    if (!receiptRef.current) return;
    setIsGeneratingPdf(true);

    try {
      const element = receiptRef.current;
      
      const canvas = await html2canvas(element, {
        scale: 2, // High resolution (2x retina)
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, Math.min(pdfHeight, 297));
      pdf.save(`Resi_CahayaKargo_${shipment.resiNumber}.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
      // Fallback to window.print if html2canvas fails
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const url = `${window.location.origin}/#lacak-resi?no=${shipment.resiNumber}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const getServiceLabel = (type: string) => {
    switch (type) {
      case 'udara': return 'KARGO UDARA (EXPRESS AIR FREIGHT)';
      case 'laut': return 'KARGO LAUT (CONTAINER FCL/LCL)';
      case 'sewa_truk': return 'SEWA TRUK CHARTER (FTL)';
      case 'pindahan': return 'JASA PINDAHAN LOGISTIK';
      default: return 'KARGO DARAT (TRUCKING DOOR-TO-DOOR)';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 print:p-0 print:bg-white print:static">
      
      {/* Modal Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 print:border-none print:shadow-none print:w-full print:max-w-none">
        
        {/* Top Control Bar (Hidden when printing) */}
        <div className="bg-slate-900 text-white p-4 sm:px-6 flex flex-wrap justify-between items-center gap-3 print:hidden border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-white">
                Cetak Surat Muatan / Resi Kargo Resmi (PDF)
              </h3>
              <p className="text-xs text-slate-400">
                Resi: <span className="font-mono text-amber-300 font-bold">{shipment.resiNumber}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
              title="Salin Link Resi"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              {copiedLink ? 'Tersalin' : 'Bagikan'}
            </button>

            <button
              onClick={handlePrint}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              Cetak / Print
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-4 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              {isGeneratingPdf ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                  Membuat PDF...
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  Download PDF
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Container */}
        <div className="p-4 sm:p-6 bg-slate-100 max-h-[82vh] overflow-y-auto print:p-0 print:bg-white print:max-h-none print:overflow-visible">
          
          {/* THE OFFICIAL PDF RECEIPT DOCUMENT (A4 Ratio Standard) */}
          <div 
            ref={receiptRef}
            id="printable-receipt-doc"
            className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-slate-300 mx-auto max-w-3xl text-slate-900 relative font-sans print:shadow-none print:border-none print:p-4 print:max-w-none"
            style={{ minHeight: '920px' }}
          >
            
            {/* Watermark Logo in Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none">
              <span className="text-8xl font-black text-slate-900 rotate-[-35deg] tracking-widest text-center">
                CAHAYA KARGO INDONESIA
              </span>
            </div>

            {/* TOP HEADER: Company Credentials + AWB & Barcodes */}
            <div className="border-b-2 border-slate-900 pb-5 mb-5">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                
                {/* Brand & PT Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CahayaKargoLogo className="h-10" />
                  </div>
                  <h1 className="text-sm font-black tracking-wider text-slate-950 uppercase">
                    {companyProfile.name}
                  </h1>
                  <p className="text-[10px] text-slate-600 leading-tight max-w-sm mt-0.5">
                    {companyProfile.address}
                  </p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-600 mt-1 font-mono">
                    <span>Telp: {companyProfile.phone}</span>
                    <span>WA: +{companyProfile.whatsapp}</span>
                    <span>Web: cahayakargo.co.id</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-[9px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded mt-1.5 border border-slate-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>Izin Kemenhub RI: SK.091/ALFI/Jkt &bull; ISO 9001:2015</span>
                  </div>
                </div>

                {/* Right: Resi Number + 1D Barcode + 2D QR Barcode */}
                <div className="flex items-end sm:items-start gap-4 flex-shrink-0">
                  <div className="flex flex-col items-center sm:items-end text-right">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
                      SURAT MUATAN KARGO (AIR WAYBILL)
                    </span>
                    <span className="font-mono text-2xl font-black text-slate-950 tracking-wider">
                      {shipment.resiNumber}
                    </span>
                    <div className="mt-1">
                      <Barcode1D value={shipment.resiNumber} height={36} />
                    </div>
                  </div>

                  {/* 2D Barcode (QR Matrix) */}
                  <div className="flex flex-col items-center">
                    <Barcode2D 
                      value={`https://cahayakargo.co.id/lacak-resi?no=${shipment.resiNumber}`} 
                      size={92} 
                      label="SCAN VALIDASI 2D"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* ROUTE BANNER & SERVICE TYPE */}
            <div className="bg-slate-900 text-white rounded-lg p-3 mb-5 flex flex-col sm:flex-row justify-between items-center gap-2">
              <div className="flex items-center gap-3">
                <span className="bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded tracking-wide">
                  RUTE:
                </span>
                <span className="font-black text-base tracking-wide text-white uppercase">
                  {shipment.senderCity} &rarr; {shipment.recipientCity}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <span className="text-slate-400 uppercase text-[10px]">Layanan:</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700 uppercase">
                  {getServiceLabel(shipment.serviceType)}
                </span>
              </div>
            </div>

            {/* SHIPPER & CONSIGNEE 2-COLUMN BOX */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              
              {/* Data Pengirim (Shipper) */}
              <div className="border border-slate-300 rounded-lg p-3.5 bg-slate-50/60">
                <div className="flex justify-between items-center border-b border-slate-200 pb-1.5 mb-2">
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
                    PENGIRIM (SHIPPER)
                  </span>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                    ASAL: {shipment.senderCity}
                  </span>
                </div>
                <div className="text-xs font-black text-slate-900 uppercase">
                  {shipment.senderName}
                </div>
                <div className="text-[11px] font-mono text-slate-700 mt-0.5">
                  Telp / WA: <strong>{shipment.senderPhone}</strong>
                </div>
                <div className="text-[11px] text-slate-600 mt-1 leading-snug">
                  Loket: Drop Point Cahaya Kargo {shipment.senderCity}
                </div>
              </div>

              {/* Data Penerima (Consignee) */}
              <div className="border-2 border-slate-900 rounded-lg p-3.5 bg-white shadow-xs">
                <div className="flex justify-between items-center border-b border-slate-200 pb-1.5 mb-2">
                  <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider">
                    PENERIMA (CONSIGNEE)
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                    TUJUAN: {shipment.recipientCity}
                  </span>
                </div>
                <div className="text-xs font-black text-slate-900 uppercase">
                  {shipment.recipientName}
                </div>
                <div className="text-[11px] font-mono text-slate-700 mt-0.5">
                  Telp / WA: <strong>{shipment.recipientPhone}</strong>
                </div>
                <div className="text-[11px] text-slate-800 mt-1 font-medium leading-snug">
                  Alamat Lengkap: {shipment.recipientAddress}
                </div>
              </div>

            </div>

            {/* SHIPMENT SPECIFICATIONS TABLE */}
            <div className="border border-slate-300 rounded-lg overflow-hidden mb-5">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-300">
                  <tr>
                    <th className="py-2 px-3 border-r border-slate-300">Uraian / Deskripsi Muatan</th>
                    <th className="py-2 px-3 text-center border-r border-slate-300">Koli</th>
                    <th className="py-2 px-3 text-center border-r border-slate-300">Berat Aktual</th>
                    <th className="py-2 px-3 text-center border-r border-slate-300">Volumetrik</th>
                    <th className="py-2 px-3 text-center border-r border-slate-300">Dimensi (cm)</th>
                    <th className="py-2 px-3 text-center">Ditagihkan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium text-slate-900">
                  <tr>
                    <td className="py-2.5 px-3 border-r border-slate-300">
                      <strong className="block text-slate-900 uppercase">{shipment.goodsDescription}</strong>
                      <span className="text-[10px] text-slate-500">
                        Instruksi: {shipment.notes || 'Handle with care &bull; Jaga dari kelembapan'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center border-r border-slate-300 font-bold">
                      {shipment.colliCount} Koli
                    </td>
                    <td className="py-2.5 px-3 text-center border-r border-slate-300">
                      {shipment.weightKg} Kg
                    </td>
                    <td className="py-2.5 px-3 text-center border-r border-slate-300 text-slate-600">
                      {volWeight} Kg
                    </td>
                    <td className="py-2.5 px-3 text-center border-r border-slate-300 font-mono text-[11px]">
                      {shipment.dimensions
                        ? `${shipment.dimensions.length}x${shipment.dimensions.width}x${shipment.dimensions.height}`
                        : '80x60x50'}
                    </td>
                    <td className="py-2.5 px-3 text-center font-black text-blue-700 bg-blue-50/50">
                      {chargeableWeight} Kg
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* CHARGES & PAYMENT SUMMARY */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-5">
              
              {/* Left notes & Security info */}
              <div className="sm:col-span-7 border border-slate-200 rounded-lg p-3 bg-slate-50/50 flex flex-col justify-between text-[10px] text-slate-600 space-y-2">
                <div>
                  <span className="font-bold text-slate-800 block uppercase mb-1">
                    Catatan Proteksi & Pelacakan:
                  </span>
                  <ul className="list-disc pl-4 space-y-0.5 leading-relaxed">
                    <li>Paket dilindungi Asuransi Pengiriman All-Risk sesuai SOP PT Cahaya Kargo.</li>
                    <li>Lacak status real-time 24 jam di <strong>cahayakargo.co.id/lacak-resi</strong> atau scan 2D Barcode.</li>
                    <li>Klaim kerusakan wajib disertai video unboxing dan dilaporkan maksimal 1x24 jam sejak serah terima.</li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between font-mono text-[9px] text-slate-500">
                  <span>Waktu Cetak: {new Date().toLocaleString('id-ID')}</span>
                  <span>Operator: SYSTEM DISPATCH-01</span>
                </div>
              </div>

              {/* Right charges calculation & Stamp */}
              <div className="sm:col-span-5 border border-slate-300 rounded-lg p-3.5 bg-white relative overflow-hidden">
                
                {/* Visual Stamp "LUNAS / VERIFIED" */}
                <div className="absolute right-2 bottom-2 pointer-events-none opacity-20 rotate-[-15deg]">
                  <div className="border-4 border-emerald-600 text-emerald-800 font-black text-xs px-3 py-1 rounded uppercase tracking-widest text-center">
                    PT CAHAYA KARGO<br />
                    VERIFIED & PAID<br />
                    ORIGINAL COPY
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Biaya Kirim Dasar:</span>
                    <span className="font-mono">Rp {(shipment.totalCost * 0.9).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Biaya Asuransi All-Risk:</span>
                    <span className="font-mono">Rp {(shipment.totalCost * 0.05).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Biaya Admin & Handling:</span>
                    <span className="font-mono">Rp {(shipment.totalCost * 0.05).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="border-t-2 border-slate-900 pt-1.5 flex justify-between items-baseline font-black">
                    <span className="text-slate-900 uppercase">TOTAL BIAYA:</span>
                    <span className="text-base text-amber-600 font-mono">
                      Rp {shipment.totalCost.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] pt-1 font-bold">
                    <span className="text-slate-500">Metode Bayar:</span>
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono">
                      {shipment.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* THREE SIGNATURE BOXES (Standard Official Logistics Waybill) */}
            <div className="border border-slate-300 rounded-lg p-3 grid grid-cols-3 gap-3 text-center text-[10px]">
              
              {/* Petugas Pengirim / Loket */}
              <div className="flex flex-col justify-between h-24 border-r border-slate-200 pr-2">
                <span className="font-bold text-slate-600 uppercase">
                  1. Petugas Loket / Ekspedisi
                </span>
                <div className="text-[9px] text-slate-400 font-mono">
                  (Tanda Tangan & Cap Loket)
                </div>
                <div className="border-t border-slate-400 pt-1 font-bold text-slate-800">
                  Bambang Santoso (Loket Asal)
                </div>
              </div>

              {/* Kurir / Driver Pengantar */}
              <div className="flex flex-col justify-between h-24 border-r border-slate-200 pr-2">
                <span className="font-bold text-slate-600 uppercase">
                  2. Driver / Kurir Pengantar
                </span>
                <div className="text-[9px] text-slate-400 font-mono">
                  (Armada Delivery Hub)
                </div>
                <div className="border-t border-slate-400 pt-1 font-bold text-slate-800">
                  Joko Purwanto (Kurir CDD)
                </div>
              </div>

              {/* Penerima Barang */}
              <div className="flex flex-col justify-between h-24">
                <span className="font-bold text-slate-600 uppercase">
                  3. Diterima Oleh (Penerima)
                </span>
                <div className="text-[9px] text-slate-400 font-mono">
                  (Nama Terang & Cap Perusahaan)
                </div>
                <div className="border-t border-slate-400 pt-1 font-bold text-slate-800">
                  {shipment.recipientName}
                </div>
              </div>

            </div>

            {/* FOOTER BAR OF RECEIPT */}
            <div className="mt-4 pt-2 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-[9px] text-slate-500">
              <span>Lembar 1: Pengirim &bull; Lembar 2: Surat Jalan Driver &bull; Lembar 3: Arsip Akuntansi Cabang</span>
              <span className="font-mono mt-1 sm:mt-0 font-bold text-slate-700">
                PT CAHAYA KARGO INDONESIA &bull; DOKUMEN RESI OTENTIK RESMI 2026
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
export default ReceiptModal;
