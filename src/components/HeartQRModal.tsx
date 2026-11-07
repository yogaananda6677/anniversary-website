import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Download, Copy, Check, Heart, Sparkles } from 'lucide-react';
import QRCode from 'qrcode';

interface HeartQRModalProps {
  url: string;
  recipientName: string;
  onClose: () => void;
}

export const HeartQRModal: React.FC<HeartQRModalProps> = ({
  url,
  recipientName,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    QRCode.toCanvas(
      canvas,
      url,
      {
        width: 260,
        margin: 2,
        color: {
          dark: '#881337',
          light: '#ffffff',
        },
        errorCorrectionLevel: 'H',
      },
      (err) => {
        if (err) console.error(err);
      }
    );
  }, [url]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `QR-Anniversary-2-Years-${recipientName}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-sm bg-white border-2 border-rose-200 rounded-3xl shadow-2xl p-6 text-center text-rose-950"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-rose-100 text-rose-800 hover:bg-rose-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-rose-600 font-mono mb-1 uppercase tracking-wider font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Anniversary Keepsake</span>
        </div>
        <h3 className="font-serif text-xl font-bold text-rose-950 mb-4">
          QR Code Cinta Kita
        </h3>

        {/* QR Code Canvas with Heart Accent */}
        <div className="relative inline-block p-3 bg-rose-50/50 rounded-2xl shadow-inner mb-4 border-2 border-rose-200">
          <canvas ref={canvasRef} className="rounded-xl block" />
          {/* Center Heart Emblem */}
          <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-gradient-to-tr from-rose-600 to-rose-400 flex items-center justify-center shadow-md border-2 border-white pointer-events-none">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
        </div>

        <p className="text-xs text-rose-800 font-serif leading-relaxed mb-5">
          Scan QR Code ini dengan kamera ponsel untuk langsung membuka website anniversary spesial untuk <strong>{recipientName}</strong>.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleDownload}
            className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-rose-400/40 transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Unduh QR (PNG)</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="py-2.5 px-3 rounded-xl bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Salin Link</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
