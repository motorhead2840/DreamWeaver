import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, RefreshCw, X, Check } from 'lucide-react';

export default function VirtualTryOn() {
  const [isActive, setIsActive] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    setIsActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    setIsActive(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  return (
    <section className="py-24 px-6 bg-brand-sage/30 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-serif mb-8 leading-tight">Virtual Atelier</h2>
          <p className="text-brand-ink/60 mb-10 font-light leading-relaxed text-lg">
            Experience our collection from the comfort of your home. Our virtual try-on technology 
            allows you to see how our bespoke pieces drape and flow on your silhouette.
          </p>
          <ul className="space-y-4 mb-12">
            {['Real-time silhouette mapping', 'Fabric drape simulation', 'Personalized sizing advice'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm tracking-wide text-brand-ink/80">
                <Check size={16} className="text-brand-gold" />
                {item}
              </li>
            ))}
          </ul>
          {!isActive ? (
            <button
              onClick={startCamera}
              className="px-10 py-4 bg-brand-ink text-brand-cream rounded-full text-xs uppercase tracking-[0.2em] font-semibold hover:bg-brand-gold transition-colors flex items-center gap-3"
            >
              <Camera size={18} />
              Launch Try-On
            </button>
          ) : (
            <button
              onClick={stopCamera}
              className="px-10 py-4 border border-brand-ink text-brand-ink rounded-full text-xs uppercase tracking-[0.2em] font-semibold hover:bg-brand-ink hover:text-brand-cream transition-all flex items-center gap-3"
            >
              <X size={18} />
              Close Atelier
            </button>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-[3/4] bg-white rounded-[40px] overflow-hidden shadow-2xl border border-brand-gold/10"
        >
          <AnimatePresence mode="wait">
            {isActive ? (
              <motion.div
                key="camera"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border-[20px] border-brand-cream/20 pointer-events-none" />
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
                  <button className="w-16 h-16 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                    <RefreshCw size={24} />
                  </button>
                  <button 
                    className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center text-white shadow-lg shadow-brand-gold/40"
                    onClick={() => setIsCapturing(true)}
                  >
                    <div className="w-12 h-12 border-2 border-white rounded-full" />
                  </button>
                </div>
                
                {/* Simulated Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                  <div className="w-64 h-96 border-2 border-dashed border-brand-gold rounded-full" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center"
              >
                <div className="w-24 h-24 bg-brand-blush rounded-full flex items-center justify-center mb-8">
                  <Camera size={40} className="text-brand-gold" />
                </div>
                <h3 className="text-2xl font-serif mb-4">Ready to try?</h3>
                <p className="text-brand-ink/40 font-light text-sm leading-relaxed">
                  Enable your camera to see our latest collection on you. 
                  Your privacy is our priority; no images are stored.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
