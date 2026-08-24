import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, ShieldCheck, Sparkles, Award, Globe, CheckCircle2, FolderArchive } from 'lucide-react';
import { ExportProjectModal } from './ExportProjectModal';

export const Footer: React.FC = () => {
  const { navigateTo, showToast } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please provide a valid email address.', 'info');
      return;
    }
    setSubscribed(true);
    showToast('Welcome to AVENDORA. Check your inbox for your 15% invitation code.', 'navy');
    setEmail('');
  };

  return (
    <>
      <footer className="bg-[#F8FAFC] text-[#111111] pt-16 pb-12 border-t border-[#E2E8F0]">
        {/* Brand Guarantees Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-[#E2E8F0]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F0F4F8] border border-[#D8E2ED] flex items-center justify-center text-[#0F2C59] shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-base text-[#111111] font-semibold mb-1">Ancestral Distillation</h4>
                <p className="text-xs text-[#64748B] font-sans leading-relaxed">
                  Aged botanical essences and wild resins macerated for up to 9 months in glass amphorae.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F0F4F8] border border-[#D8E2ED] flex items-center justify-center text-[#0F2C59] shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-base text-[#111111] font-semibold mb-1">Two Discovery Vials Included</h4>
                <p className="text-xs text-[#64748B] font-sans leading-relaxed">
                  Choose 2 complimentary 2ml extrait samples with each full-sized flacon purchase.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F0F4F8] border border-[#D8E2ED] flex items-center justify-center text-[#0F2C59] shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-base text-[#111111] font-semibold mb-1">Nationwide Express Delivery</h4>
                <p className="text-xs text-[#64748B] font-sans leading-relaxed">
                  Complimentary tracked express courier delivery on all orders over PKR 5,000.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F0F4F8] border border-[#D8E2ED] flex items-center justify-center text-[#0F2C59] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-base text-[#111111] font-semibold mb-1">100% Authentic Luxury</h4>
                <p className="text-xs text-[#64748B] font-sans leading-relaxed">
                  Every bottle is individually inspected and sealed by hand in our fragrance workshop.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand Col */}
            <div className="lg:col-span-2 space-y-4">
              <div className="cursor-pointer" onClick={() => navigateTo('home')}>
                <span className="font-serif tracking-[0.25em] text-xl font-bold uppercase text-[#0F2C59] block hover:opacity-85 transition-opacity">
                  AVENDORA
                </span>
                <span className="font-serif italic text-xs text-[#475569] tracking-[0.3em] uppercase block mt-0.5 font-medium">
                  Luxury Parfums
                </span>
              </div>
              <p className="text-xs text-[#64748B] font-sans leading-relaxed max-w-sm">
                AVENDORA creates bespoke olfactory treasures, marrying ancestral techniques with the rarest resins, flowers, and aged botanicals in existence.
              </p>
              <div className="pt-2 text-xs text-[#64748B] space-y-1 font-sans">
                <p>Customer Support: support@avendora.com • +92 (042) 111-AVN-00</p>
                <p>Nationwide Delivery across Pakistan &amp; Worldwide Courier</p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsExportModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#0F2C59] text-amber-300 border border-[#0F2C59] hover:bg-[#0A1E3F] text-xs font-sans uppercase font-bold tracking-wider transition-colors cursor-pointer shadow-xs"
                >
                  <FolderArchive className="w-4 h-4 text-amber-300" />
                  <span>Download Codebase (ZIP)</span>
                </button>
              </div>
            </div>

            {/* Collections */}
            <div>
              <h4 className="text-xs uppercase font-sans tracking-[0.2em] text-[#0F2C59] font-bold mb-4">
                Collections
              </h4>
              <ul className="space-y-2.5 text-xs text-[#475569] font-sans">
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('category-oud')}
                    className="hover:text-[#0F2C59] transition-colors cursor-pointer"
                  >
                    The Oud Collection
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('category-musk')}
                    className="hover:text-[#0F2C59] transition-colors cursor-pointer"
                  >
                    The Musk Collection
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('category-floral')}
                    className="hover:text-[#0F2C59] transition-colors cursor-pointer"
                  >
                    The Floral Collection
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('category-woody')}
                    className="hover:text-[#0F2C59] transition-colors cursor-pointer"
                  >
                    The Woody Collection
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('shop')}
                    className="hover:text-[#0F2C59] transition-colors cursor-pointer"
                  >
                    All Perfumes
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('categories')}
                    className="hover:text-[#0F2C59] transition-colors cursor-pointer"
                  >
                    Browse Collections
                  </button>
                </li>
              </ul>
            </div>

            {/* Customer Service & Navigation */}
            <div>
              <h4 className="text-xs uppercase font-sans tracking-[0.2em] text-[#0F2C59] font-bold mb-4">
                Customer Care
              </h4>
              <ul className="space-y-2.5 text-xs text-[#475569] font-sans">
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('about')}
                    className="hover:text-[#0F2C59] transition-colors cursor-pointer"
                  >
                    Brand Heritage
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('contact')}
                    className="hover:text-[#0F2C59] transition-colors cursor-pointer"
                  >
                    Fragrance Consultation
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('contact')}
                    className="hover:text-[#0F2C59] transition-colors cursor-pointer"
                  >
                    Concierge Support
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('cart')}
                    className="hover:text-[#0F2C59] transition-colors cursor-pointer"
                  >
                    Shopping Bag
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('checkout')}
                    className="hover:text-[#0F2C59] transition-colors cursor-pointer"
                  >
                    Checkout
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('wishlist')}
                    className="hover:text-[#0F2C59] transition-colors cursor-pointer"
                  >
                    Wishlist
                  </button>
                </li>
              </ul>
            </div>

            {/* VIP Newsletter */}
            <div>
              <h4 className="text-xs uppercase font-sans tracking-[0.2em] text-[#0F2C59] font-bold mb-4">
                VIP Club
              </h4>
              <p className="text-xs text-[#64748B] font-sans mb-3 leading-relaxed">
                Receive exclusive invitations to new fragrance releases, special editions, and complimentary discovery vials.
              </p>
              {subscribed ? (
                <div className="bg-[#F0F4F8] p-3 border border-[#D8E2ED] text-[#0F2C59] text-xs font-sans flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>You are now subscribed to the AVENDORA VIP club.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="w-full bg-white border border-[#CBD5E1] text-[#111111] text-xs px-3.5 py-2.5 placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0F2C59] transition-colors font-sans"
                      required
                    />
                    <button
                      type="submit"
                      className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#0F2C59] text-white font-semibold px-3 flex items-center justify-center hover:bg-[#0A1E3F] transition-colors cursor-pointer"
                      aria-label="Subscribe"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[10px] text-[#64748B] font-sans">
                    Use promo code <span className="text-[#0F2C59] font-mono font-bold">AVENDORA15</span> for 15% off your order.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] font-sans gap-4">
          <p>© {new Date().getFullYear()} AVENDORA Parfums. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[11px]">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Authenticity Guarantee</span>
            <span>Customer Care</span>
          </div>
        </div>
      </footer>

      {/* Interactive Export Project ZIP Modal */}
      <ExportProjectModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </>
  );
};
