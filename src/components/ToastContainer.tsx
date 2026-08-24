import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, CheckCircle2, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto flex items-start gap-3 p-4 border shadow-xl ${
              toast.type === 'navy'
                ? 'bg-[#0F2C59] border-[#0A1E3F] text-white'
                : toast.type === 'success'
                ? 'bg-emerald-900 border-emerald-800 text-white'
                : 'bg-white border-[#E2E8F0] text-[#111111]'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {toast.type === 'navy' ? (
                <Sparkles className="w-4 h-4 text-amber-300" />
              ) : toast.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <Info className="w-4 h-4 text-[#0F2C59]" />
              )}
            </div>

            <div className="flex-1 text-xs font-sans leading-relaxed">
              {toast.message}
            </div>

            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className={`shrink-0 p-0.5 transition-colors cursor-pointer ${
                toast.type === 'navy' || toast.type === 'success'
                  ? 'text-white/60 hover:text-white'
                  : 'text-[#94A3B8] hover:text-[#111111]'
              }`}
              aria-label="Close toast notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
