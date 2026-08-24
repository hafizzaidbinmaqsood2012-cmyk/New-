import React from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES_DATA, PERFUMES_DATA } from '../data/perfumes';
import { ArrowRight, Sparkles, Droplets } from 'lucide-react';
import { motion } from 'motion/react';

export const CategoriesPage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="bg-white text-[#111111] min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs uppercase font-sans tracking-[0.2em] text-[#64748B] mb-2">
            <span className="cursor-pointer hover:text-[#0F2C59]" onClick={() => navigateTo('home')}>
              Home
            </span>
            <span>/</span>
            <span className="text-[#0F2C59] font-bold">Collections</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-black text-[#111111] mb-4">
            Fragrance Universes
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] font-sans leading-relaxed">
            Explore our four distinct fragrance collections: Aged Resins, Clean Skin Musks, Pure Florals, and Architectural Woods.
          </p>
        </div>

        {/* Collection Blocks */}
        <div className="space-y-16">
          {CATEGORIES_DATA.map((category, index) => {
            const categoryPerfumes = PERFUMES_DATA.filter((p) => p.category === category.id);
            const isReversed = index % 2 !== 0;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="border border-[#E2E8F0] bg-white p-6 sm:p-10 shadow-xs hover:border-[#0F2C59] transition-all"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isReversed ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Category Image */}
                  <div className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div
                      onClick={() => navigateTo(`category-${category.id}`)}
                      className="relative w-full aspect-[4/3] bg-[#F1F5F9] overflow-hidden cursor-pointer group border border-[#E2E8F0]"
                    >
                      <img
                        src={category.heroImage}
                        alt={category.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    </div>
                  </div>

                  {/* Category Details */}
                  <div className={`lg:col-span-7 space-y-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div>
                      <div className="inline-flex items-center gap-2 text-[11px] font-sans uppercase tracking-[0.2em] text-[#0F2C59] font-bold mb-2 bg-[#F0F4F8] border border-[#D8E2ED] px-3 py-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{category.tagline}</span>
                      </div>
                      <h2
                        onClick={() => navigateTo(`category-${category.id}`)}
                        className="font-serif text-3xl sm:text-4xl text-[#111111] hover:text-[#0F2C59] transition-colors cursor-pointer font-bold mb-2"
                      >
                        {category.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#64748B] font-sans leading-relaxed max-w-xl">
                        {category.description}
                      </p>
                    </div>

                    {/* Featured Perfumes in this Category */}
                    <div className="border-t border-[#E2E8F0] pt-4">
                      <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#64748B] font-bold block mb-3">
                        Included Extraits &amp; Formulations ({categoryPerfumes.length}):
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {categoryPerfumes.map((p) => (
                          <div
                            key={p.id}
                            onClick={() => navigateTo('product', { id: p.id })}
                            className="bg-[#F8FAFC] p-3 border border-[#E2E8F0] hover:border-[#0F2C59] cursor-pointer transition-all group"
                          >
                            <span className="font-serif text-xs text-[#111111] group-hover:text-[#0F2C59] font-bold block truncate">
                              {p.name}
                            </span>
                            <span className="text-[10px] text-[#64748B] font-sans">
                              PKR {p.price.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => navigateTo(`category-${category.id}`)}
                        className="bg-[#0F2C59] hover:bg-[#0A1E3F] text-white px-7 py-3 text-xs uppercase font-sans tracking-[0.18em] font-bold transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
                      >
                        <span>Explore {category.name}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Discovery Guide Box */}
        <div className="mt-20 bg-[#F8FAFC] border border-[#CBD5E1] p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xs">
          <Droplets className="w-8 h-8 text-[#0F2C59] mx-auto mb-3" />
          <h3 className="font-serif text-2xl sm:text-3xl text-[#111111] font-bold mb-3">
            Unsure which collection suits your profile?
          </h3>
          <p className="text-xs sm:text-sm text-[#64748B] font-sans max-w-xl mx-auto mb-6 leading-relaxed">
            Our master parfumeur concierge can guide you through notes, sillage requirements, and occasion matching. Every order includes 2 complimentary discovery vials.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => navigateTo('contact')}
              className="bg-[#0F2C59] hover:bg-[#0A1E3F] text-white px-6 py-3 text-xs uppercase font-sans tracking-[0.15em] font-bold transition-colors cursor-pointer shadow-xs"
            >
              Consult Perfume Concierge
            </button>
            <button
              type="button"
              onClick={() => navigateTo('shop')}
              className="bg-white border border-[#CBD5E1] hover:border-[#0F2C59] text-[#0F2C59] px-6 py-3 text-xs uppercase font-sans tracking-[0.15em] font-bold transition-colors cursor-pointer"
            >
              View Full Catalog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
