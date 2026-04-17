import { motion } from 'motion/react';
import { ShoppingBag, Search, Menu, User } from 'lucide-react';
import { STORE_NAME, BRAND_NAME, COMPANY_NAME } from '../constants';

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 bg-brand-cream/80 backdrop-blur-md border-b border-brand-gold/10"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button className="p-2 hover:text-brand-gold transition-colors">
            <Menu size={20} />
          </button>
          <div className="hidden md:flex gap-6 text-xs uppercase tracking-[0.2em] font-medium">
            <a href="#" className="hover:text-brand-gold transition-colors">Collection</a>
            <a href="#" className="hover:text-brand-gold transition-colors">Bespoke</a>
            <a href="#" className="hover:text-brand-gold transition-colors">Atelier</a>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-2xl font-serif tracking-widest uppercase text-brand-ink">
            {STORE_NAME}
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <button className="p-2 hover:text-brand-gold transition-colors">
            <Search size={20} />
          </button>
          <button className="p-2 hover:text-brand-gold transition-colors">
            <User size={20} />
          </button>
          <button className="p-2 hover:text-brand-gold transition-colors relative">
            <ShoppingBag size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-brand-gold rounded-full" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-ink text-brand-cream py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-3xl font-serif mb-6 tracking-widest uppercase">{STORE_NAME}</h2>
          <p className="text-brand-cream/60 max-w-md leading-relaxed font-light">
            Crafting elegance for the modern woman. Our designs are a tribute to confidence, 
            style, and the silent strength that comes from feeling sexy on the inside.
          </p>
        </div>
        
        <div>
          <h3 className="text-xs uppercase tracking-widest font-semibold mb-6 text-brand-gold">Explore</h3>
          <ul className="space-y-4 text-sm font-light text-brand-cream/80">
            <li><a href="#" className="hover:text-brand-gold transition-colors">Our Story</a></li>
            <li><a href="#" className="hover:text-brand-gold transition-colors">Virtual Try-On</a></li>
            <li><a href="#" className="hover:text-brand-gold transition-colors">Personal Styling</a></li>
            <li><a href="#" className="hover:text-brand-gold transition-colors">Sustainability</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-widest font-semibold mb-6 text-brand-gold">Contact</h3>
          <ul className="space-y-4 text-sm font-light text-brand-cream/80">
            <li>Customer Care</li>
            <li>Shipping & Returns</li>
            <li>Privacy Policy</li>
            <li className="pt-4 text-xs text-brand-cream/40">
              © {new Date().getFullYear()} {BRAND_NAME} by {COMPANY_NAME}
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
