import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { X, Download, Copy, ExternalLink, Check } from 'lucide-react';

interface QRCodeModalProps {
  url: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  url,
  isOpen,
  onClose,
  title = 'QR Code ข้อสอบออนไลน์',
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (url && isOpen) {
      QRCode.toDataURL(url, {
        width: 320,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      })
        .then((dataUrl) => {
          setQrDataUrl(dataUrl);
        })
        .catch((err) => {
          console.error('Failed to generate QR code', err);
        });
    }
  }, [url, isOpen]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = 'exam-logic-qrcode.png';
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95">
        <button
          id="btn-close-qr-modal"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-4">
          <h3 className="text-base font-bold text-slate-900">{title}</h3>
          <p className="text-xs text-slate-500 mt-1">
            ให้นักเรียนสแกนเพื่อเข้าทำข้อสอบในห้องเรียนได้ทันที
          </p>
        </div>

        <div className="flex justify-center p-3 bg-slate-50 rounded-xl border border-slate-200 mb-4">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="QR Code สำหรับทำข้อสอบ"
              className="w-64 h-64 rounded-lg shadow-xs"
            />
          ) : (
            <div className="w-64 h-64 flex items-center justify-center text-slate-400 text-sm">
              กำลังสร้าง QR Code...
            </div>
          )}
        </div>

        <div className="space-y-2">
          <button
            id="btn-copy-exam-link-modal"
            onClick={handleCopy}
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'คัดลอกลิ้งค์แล้ว!' : 'คัดลอกลิงก์สอบ'}
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              id="btn-download-qr"
              onClick={handleDownload}
              className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              บันทึกรูป QR
            </button>
            <a
              id="btn-open-form-external"
              href={url}
              target="_blank"
              rel="noreferrer noopener"
              className="py-2 px-3 bg-violet-50 hover:bg-violet-100 text-violet-700 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              เปิดแบบฟอร์ม
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
