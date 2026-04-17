import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export default function StylingAdvice() {
  const [input, setInput] = useState('');
  const [advice, setAdvice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getAdvice = async () => {
    if (!input.trim() || !process.env.GEMINI_API_KEY) return;
    
    setIsLoading(true);
    try {
      const prompt = `You are a high-end fashion stylist for the luxury brand "DreamWeaver". 
      The brand's theme is "feel sexy on the inside" - minimalist, global, elegant, and sophisticated.
      The user is asking for styling advice: "${input}".
      Available products: ${PRODUCTS.map(p => p.name).join(', ')}.
      Provide a personalized, stylish, and encouraging response that reflects the brand's luxurious yet approachable aesthetic. 
      Keep it concise and elegant.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
      
      setAdvice(response.text || "I'm sorry, I couldn't generate advice right now.");
    } catch (error) {
      console.error("Error getting styling advice:", error);
      setAdvice("I apologize, but I'm unable to provide styling advice at the moment. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-brand-blush/30">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Sparkles className="mx-auto mb-6 text-brand-gold" size={32} />
          <h2 className="text-4xl font-serif mb-6">Personalized Styling</h2>
          <p className="text-brand-ink/60 mb-12 font-light">
            Tell us about your occasion or style preference, and our AI stylist will curate the perfect look for you.
          </p>
        </motion.div>

        <div className="relative mb-12">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && getAdvice()}
            placeholder="e.g., I'm attending a gala in Paris next month..."
            className="w-full bg-white border border-brand-gold/20 rounded-full px-8 py-4 pr-16 focus:outline-none focus:border-brand-gold transition-colors font-light italic"
          />
          <button
            onClick={getAdvice}
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-brand-ink text-brand-cream rounded-full flex items-center justify-center hover:bg-brand-gold transition-colors disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {advice && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white p-8 rounded-3xl border border-brand-gold/10 shadow-sm text-left"
            >
              <h3 className="text-xs uppercase tracking-widest font-semibold mb-4 text-brand-gold">Stylist Recommendation</h3>
              <p className="text-brand-ink leading-relaxed font-light italic">
                "{advice}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
