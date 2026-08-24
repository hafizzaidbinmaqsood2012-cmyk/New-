import React from 'react';
import { useShop } from '../context/ShopContext';
import { PERFUMES_DATA, CATEGORIES_DATA } from '../data/perfumes';
import { ProductCard } from '../components/ProductCard';
import {
  Sparkles,
  ArrowRight,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'motion/react';

export const HomePage: React.FC = () => {
  const { navigateTo } = useShop();

  const featuredPerfumes = PERFUMES_DATA.filter((p) => p.isFeatured).slice(0, 4);
  const bestSellers = PERFUMES_DATA.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = PERFUMES_DATA.filter((p) => p.isNew).slice(0, 4);

  return (
    <div className="bg-white text-[#111111]">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] bg-[#F8FAFC] text-[#111111] flex items-center overflow-hidden border-b border-[#E2E8F0]">
        {/* Subtle Background Image with Light Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=2000&q=90"
            alt="AVENDORA Luxury Parfums"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-10 filter contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
          <div className="max-w-2xl space-y-6">
            {/* Heritage Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#CBD5E1] shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0F2C59]" />
              <span className="text-[11px] uppercase font-sans tracking-[0.25em] text-[#0F2C59] font-bold">
                Luxury Parfumerie & Extrait Collection
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-[#111111] leading-[1.1] tracking-tight"
            >
              Masterpiece Fragrances <span className="italic font-light text-[#0F2C59]">Crafted with Precision.</span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-[#475569] font-sans font-normal leading-relaxed max-w-xl"
            >
              Artisanal Extraits de Parfum distilled from aged wild agarwood, fresh rose dawn harvests, and precious sandalwood. Macerated slowly for intense depth and longevity.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-4 flex flex-col sm:flex-row gap-4"
            >
              <button
                type="button"
                onClick={() => navigateTo('shop')}
                className="bg-[#0F2C59] hover:bg-[#0A1E3F] text-white px-8 py-4 text-xs uppercase font-sans tracking-[0.2em] font-bold transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md shadow-[#0F2C59]/15 cursor-pointer"
              >
                <span>Explore All Perfumes</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => navigateTo('categories')}
                className="border border-[#CBD5E1] hover:border-[#0F2C59] text-[#0F2C59] hover:bg-white px-8 py-4 text-xs uppercase font-sans tracking-[0.2em] font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer bg-white"
              >
                <span>Browse Collections</span>
              </button>
            </motion.div>

            {/* Quick Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-10 grid grid-cols-3 gap-6 border-t border-[#E2E8F0] text-left max-w-lg"
            >
              <div>
                <span className="font-serif text-2xl text-[#0F2C59] font-bold block">32%</span>
                <span className="text-[11px] text-[#64748B] uppercase font-sans tracking-[0.1em] font-semibold">
                  Extrait Concentration
                </span>
              </div>
              <div>
                <span className="font-serif text-2xl text-[#0F2C59] font-bold block">16+ Hrs</span>
                <span className="text-[11px] text-[#64748B] uppercase font-sans tracking-[0.1em] font-semibold">
                  Long-Lasting Wear
                </span>
              </div>
              <div>
                <span className="font-serif text-2xl text-[#0F2C59] font-bold block">100%</span>
                <span className="text-[11px] text-[#64748B] uppercase font-sans tracking-[0.1em] font-semibold">
                  Authentic Guarantee
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. COLLECTION SELECTOR */}
      <section className="py-16 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[11px] uppercase font-sans tracking-[0.25em] text-[#0F2C59] font-bold block mb-1">
              Four Signature Universes
            </span>
            <h2 className="font-serif text-3xl text-[#111111] font-bold">Curated Fragrance Collections</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES_DATA.map((cat) => (
              <div
                key={cat.id}
                onClick={() => navigateTo(`category-${cat.id}`)}
                className="group relative bg-white border border-[#E2E8F0] p-6 cursor-pointer hover:border-[#0F2C59] transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="w-full aspect-[4/3] bg-[#F1F5F9] overflow-hidden mb-5 border border-[#E2E8F0]">
                    <img
                      src={cat.heroImage}
                      alt={cat.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#0F2C59] font-bold block mb-1">
                    {cat.perfumeCount} Signature Blends
                  </span>
                  <h3 className="font-serif text-xl text-[#111111] group-hover:text-[#0F2C59] transition-colors mb-2 font-bold">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#64748B] font-sans line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-sans uppercase tracking-[0.1em] text-[#111111] group-hover:text-[#0F2C59] font-bold">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PERFUMES */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[11px] uppercase font-sans tracking-[0.25em] text-[#0F2C59] font-bold block mb-1">
              Curator’s Selection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] font-bold">Featured Fragrances</h2>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('shop')}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs uppercase font-sans tracking-[0.18em] text-[#111111] hover:text-[#0F2C59] font-bold group cursor-pointer"
          >
            <span>View All 16 Fragrances</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPerfumes.map((perfume) => (
            <ProductCard key={perfume.id} product={perfume} />
          ))}
        </div>
      </section>

      {/* 4. BRAND QUALITY BANNER */}
      <section className="py-24 bg-[#F8FAFC] text-[#111111] relative overflow-hidden border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <span className="text-[11px] uppercase font-sans tracking-[0.25em] text-[#0F2C59] font-bold block">
                Artisanal Perfumery Standards
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
                Crafted with Uncompromising Quality and Purity.
              </h2>
              <p className="text-sm text-[#475569] font-sans leading-relaxed">
                At AVENDORA, each composition is aged slowly in dark glass containers to allow the natural oils, resinoids, and botanical extracts to achieve complete harmony and rich projection.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0F2C59] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-base text-[#111111] font-bold">Rare Natural Ingredients</h4>
                    <p className="text-xs text-[#64748B] font-sans">
                      Aged Cambodian agarwood, Damascus roses, and premium Mysore sandalwood.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0F2C59] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-base text-[#111111] font-bold">High Extrait Concentration (30–32%)</h4>
                    <p className="text-xs text-[#64748B] font-sans">
                      Ensures unmatched longevity of 12 to 16+ hours with deep, memorable sillage.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0F2C59] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-base text-[#111111] font-bold">Individually Hand-Inspected Bottles</h4>
                    <p className="text-xs text-[#64748B] font-sans">
                      Every flacon is sealed and packed with signature presentation boxing.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => navigateTo('about')}
                  className="bg-[#0F2C59] hover:bg-[#0A1E3F] text-white px-8 py-3.5 text-xs uppercase font-sans tracking-[0.2em] font-bold transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Learn About Our Story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="w-full aspect-[4/5] bg-white overflow-hidden border border-[#E2E8F0] shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=85"
                  alt="AVENDORA Perfume Flacon"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white border border-[#CBD5E1] p-5 shadow-xl hidden sm:block max-w-xs">
                <p className="font-serif italic text-sm text-[#0F2C59] mb-1">
                  &ldquo;A great fragrance is an aura of quiet confidence.&rdquo;
                </p>
                <p className="text-[10px] text-[#64748B] uppercase font-sans tracking-[0.15em] font-semibold">
                  — AVENDORA Master Parfumeur
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BEST SELLERS SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[11px] uppercase font-sans tracking-[0.25em] text-[#0F2C59] font-bold block mb-1">
              Top Customer Favorites
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] font-bold">Best Sellers</h2>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('shop')}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs uppercase font-sans tracking-[0.18em] text-[#111111] hover:text-[#0F2C59] font-bold cursor-pointer"
          >
            <span>Explore All Perfumes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((perfume) => (
            <ProductCard key={perfume.id} product={perfume} />
          ))}
        </div>
      </section>

      {/* 6. NEW ARRIVALS */}
      <section className="py-16 bg-[#F8FAFC] border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[11px] uppercase font-sans tracking-[0.25em] text-[#0F2C59] font-bold block mb-1">
                Fresh Compositions
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] font-bold">New Releases</h2>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('shop')}
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs uppercase font-sans tracking-[0.18em] text-[#111111] hover:text-[#0F2C59] font-bold cursor-pointer"
            >
              <span>View Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((perfume) => (
              <ProductCard key={perfume.id} product={perfume} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. OLFACTORY PYRAMID EDUCATION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] uppercase font-sans tracking-[0.25em] text-[#0F2C59] font-bold block mb-1">
            The Architecture of Fragrance
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] font-bold mb-3">
            Three Phases of Scent Evolution
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] font-sans">
            How a genuine Extrait de Parfum unfolds on your skin across 16 hours of wear.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-[#E2E8F0] p-8 text-center relative shadow-xs">
            <span className="text-xs uppercase font-sans tracking-[0.2em] text-[#0F2C59] font-bold block mb-2">
              Phase 01 • First 30 Minutes
            </span>
            <h3 className="font-serif text-2xl text-[#111111] font-bold mb-3">Top Notes</h3>
            <p className="text-xs text-[#64748B] font-sans leading-relaxed mb-4">
              The luminous initial opening with crisp citrus, fresh aldehydes, and rare aromatic spices.
            </p>
            <div className="text-[11px] text-[#64748B] font-serif italic border-t border-[#E2E8F0] pt-3">
              Bergamot, Saffron, Cardamom, Pink Pepper
            </div>
          </div>

          <div className="bg-white border-2 border-[#0F2C59] p-8 text-center relative shadow-sm">
            <span className="text-xs uppercase font-sans tracking-[0.2em] text-[#0F2C59] font-bold block mb-2">
              Phase 02 • Hours 1 to 6
            </span>
            <h3 className="font-serif text-2xl text-[#111111] font-bold mb-3">Heart Notes</h3>
            <p className="text-xs text-[#64748B] font-sans leading-relaxed mb-4">
              The emotional centerpiece of the fragrance featuring rich floral absolutes and warm resins.
            </p>
            <div className="text-[11px] text-[#0F2C59] font-serif italic border-t border-[#E2E8F0] pt-3 font-semibold">
              Turkish Rose, Florentine Iris, Night Jasmine, Amber
            </div>
          </div>

          <div className="bg-white border border-[#E2E8F0] p-8 text-center relative shadow-xs">
            <span className="text-xs uppercase font-sans tracking-[0.2em] text-[#0F2C59] font-bold block mb-2">
              Phase 03 • Hours 6 to 16+
            </span>
            <h3 className="font-serif text-2xl text-[#111111] font-bold mb-3">Base Notes</h3>
            <p className="text-xs text-[#64748B] font-sans leading-relaxed mb-4">
              The lasting dry-down of aged Cambodian oud, Mysore sandalwood, and velvety musks.
            </p>
            <div className="text-[11px] text-[#64748B] font-serif italic border-t border-[#E2E8F0] pt-3">
              Royal Oud, Mysore Sandalwood, Silk Musk, Ambergris
            </div>
          </div>
        </div>
      </section>

      {/* 8. VERIFIED REVIEWS */}
      <section className="py-20 bg-[#F8FAFC] text-[#111111] border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-1 text-[#0F2C59] mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#0F2C59]" />
              ))}
            </div>
            <span className="text-[11px] uppercase font-sans tracking-[0.25em] text-[#0F2C59] font-bold block mb-1">
              Client Feedback
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] font-bold">
              What Fragrance Connoisseurs Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-[#E2E8F0] p-8 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex text-[#0F2C59] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#0F2C59]" />
                  ))}
                </div>
                <h4 className="font-serif text-lg text-[#111111] font-bold mb-2">
                  &ldquo;Royal Oud is an undisputed masterpiece.&rdquo;
                </h4>
                <p className="text-xs text-[#64748B] font-sans leading-relaxed">
                  The Cambodian oud is extraordinarily smooth, rich, and sophisticated. It stays on clothes for days without ever turning harsh. Truly exceptional quality.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <span className="font-serif text-sm text-[#111111] font-bold block">
                    Hamza Malik
                  </span>
                  <span className="text-[10px] text-[#64748B] font-sans">Lahore, Pakistan</span>
                </div>
                <span className="text-[10px] uppercase font-sans text-[#0F2C59] tracking-[0.1em] bg-[#F0F4F8] border border-[#D8E2ED] px-2.5 py-1 font-bold">
                  Verified Buyer
                </span>
              </div>
            </div>

            <div className="bg-white border border-[#E2E8F0] p-8 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex text-[#0F2C59] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#0F2C59]" />
                  ))}
                </div>
                <h4 className="font-serif text-lg text-[#111111] font-bold mb-2">
                  &ldquo;Pure elegance in a bottle.&rdquo;
                </h4>
                <p className="text-xs text-[#64748B] font-sans leading-relaxed">
                  Rose Royale captures the natural honeyed freshness of living roses. The packaging and complimentary sample vials were an exquisite touch.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <span className="font-serif text-sm text-[#111111] font-bold block">
                    Ayesha Khan
                  </span>
                  <span className="text-[10px] text-[#64748B] font-sans">Karachi, Pakistan</span>
                </div>
                <span className="text-[10px] uppercase font-sans text-[#0F2C59] tracking-[0.1em] bg-[#F0F4F8] border border-[#D8E2ED] px-2.5 py-1 font-bold">
                  Verified Buyer
                </span>
              </div>
            </div>

            <div className="bg-white border border-[#E2E8F0] p-8 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex text-[#0F2C59] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#0F2C59]" />
                  ))}
                </div>
                <h4 className="font-serif text-lg text-[#111111] font-bold mb-2">
                  &ldquo;White Silk Musk is an intimate revelation.&rdquo;
                </h4>
                <p className="text-xs text-[#64748B] font-sans leading-relaxed">
                  It feels clean, fresh, and soothing. Never overpowering, yet deeply magnetic. I receive compliments every single time I wear it.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <span className="font-serif text-sm text-[#111111] font-bold block">
                    Bilal Ahmed
                  </span>
                  <span className="text-[10px] text-[#64748B] font-sans">Islamabad, Pakistan</span>
                </div>
                <span className="text-[10px] uppercase font-sans text-[#0F2C59] tracking-[0.1em] bg-[#F0F4F8] border border-[#D8E2ED] px-2.5 py-1 font-bold">
                  Verified Buyer
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. DISCOVERY SAMPLES CTA BANNER */}
      <section className="py-16 bg-[#0F2C59] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-white/80 font-bold block mb-1">
                Complimentary Discovery Privilege
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold mb-2">
                Experience AVENDORA with Free Sample Vials
              </h3>
              <p className="text-xs sm:text-sm text-white/90 font-sans leading-relaxed">
                Receive two bespoke 2ml Extrait de Parfum vials of your choice with every order, allowing you to test on skin before opening your main bottle.
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <button
                type="button"
                onClick={() => navigateTo('shop')}
                className="bg-white hover:bg-[#F8FAFC] text-[#0F2C59] px-7 py-3.5 text-xs uppercase font-sans tracking-[0.2em] font-bold transition-colors shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Shop Perfumes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
