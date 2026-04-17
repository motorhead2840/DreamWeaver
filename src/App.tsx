import { motion } from 'motion/react';
import { Navbar, Footer } from './components/Layout';
import CustomCursor from './components/CustomCursor';
import VirtualTryOn from './components/VirtualTryOn';
import StylingAdvice from './components/StylingAdvice';
import { PRODUCTS, STORE_NAME } from './constants';
import { ArrowRight } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-gold/20">
      <CustomCursor />
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=80" 
              alt="Luxury Fashion"
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-cream/20 via-transparent to-brand-cream" />
          </div>

          <div className="relative z-10 text-center px-6">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xs uppercase tracking-[0.4em] font-semibold text-brand-gold mb-6 block"
            >
              The New Collection
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-7xl md:text-9xl font-serif mb-8 leading-none text-brand-ink"
            >
              Feel Sexy <br /> <span className="italic font-light">on the Inside</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <button className="px-12 py-5 bg-brand-ink text-brand-cream rounded-full text-xs uppercase tracking-[0.2em] font-semibold hover:bg-brand-gold transition-all duration-500 transform hover:scale-105">
                Explore The Atelier
              </button>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium opacity-40">Scroll to Discover</span>
            <div className="w-px h-12 bg-brand-gold/30" />
          </motion.div>
        </section>

        {/* Brand Philosophy */}
        <section className="py-32 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-serif mb-12 leading-snug">
              "Confidence is the ultimate accessory. We design for the woman who knows her worth and wears it with grace."
            </h2>
            <div className="w-20 h-px bg-brand-gold mx-auto mb-8" />
            <p className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold">
              — DreamWeaver
            </p>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-serif mb-4">The Seasonal Edit</h2>
              <p className="text-brand-ink/40 font-light">Curated pieces for the global minimalist.</p>
            </div>
            <button className="text-xs uppercase tracking-widest font-semibold flex items-center gap-2 hover:text-brand-gold transition-colors">
              View All <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl mb-6">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-ink/0 group-hover:bg-brand-ink/10 transition-colors duration-500" />
                  <button className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    Quick View
                  </button>
                </div>
                <h3 className="font-serif text-lg mb-1">{product.name}</h3>
                <p className="text-xs uppercase tracking-widest text-brand-ink/40 font-medium mb-2">{product.category}</p>
                <p className="text-brand-gold font-medium">{product.price}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Virtual Try-On Section */}
        <VirtualTryOn />

        {/* Styling Advice Section */}
        <StylingAdvice />

        {/* Global Presence */}
        <section className="py-32 px-6 bg-brand-ink text-brand-cream text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xs uppercase tracking-[0.5em] font-semibold text-brand-gold mb-12">Global Flagship</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60 text-sm font-light tracking-widest uppercase">
              <div>Mumbai</div>
              <div>Paris</div>
              <div>New York</div>
              <div>London</div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
