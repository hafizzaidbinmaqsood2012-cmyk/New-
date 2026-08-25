import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, ArrowRight, Award, Droplets, ShieldCheck, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="bg-white text-[#111111] min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumbs */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs uppercase font-sans tracking-[0.2em] text-[#64748B] mb-2">
            <span className="cursor-pointer hover:text-[#0F2C59]" onClick={() => navigateTo('home')}>
              Home
            </span>
            <span>/</span>
            <span className="text-[#0F2C59] font-bold">Maison Story</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-black text-[#111111] mb-4">
            The Spirit of AVENDORA
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] font-sans leading-relaxed">
            Crafting pure, long-lasting Extrait de Parfum using rare aged agarwood, botanical absolutes, and French distillation heritage.
          </p>
        </div>

        {/* Narrative Section 1: Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-[11px] font-sans uppercase tracking-[0.25em] text-[#0F2C59] font-bold bg-[#F0F4F8] border border-[#D8E2ED] px-3.5 py-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Founded with a Vision for Purity</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] font-bold leading-tight">
              An Obsession with Depth, Longevity, and Natural Essence.
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] font-sans leading-relaxed">
              AVENDORA was created to revive the golden standard of haute perfumery. In a modern fragrance industry crowded with synthetic shortcuts and fast-fading colognes, we chose a deliberate, timeless path: ultra-high Extrait concentrations (30% to 32%) blended from authentic rare extracts.
            </p>
            <p className="text-xs sm:text-sm text-[#475569] font-sans leading-relaxed">
              Every bottle undergoes weeks of slow maceration in controlled low-light conditions. This natural process marries top citrus sparkle, floral hearts, and deep woody bases into a harmonious olfactory aura that lasts 16+ hours on skin.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigateTo('shop')}
                className="bg-[#0F2C59] hover:bg-[#0A1E3F] text-white px-7 py-3.5 text-xs uppercase font-sans tracking-[0.2em] font-bold transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Discover All Formulations</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] bg-[#F1F5F9] border border-[#CBD5E1] overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=85"
                alt="AVENDORA Artisanal Flacon"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-8 sm:p-12 mb-20 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[11px] uppercase font-sans tracking-[0.25em] text-[#0F2C59] font-bold block mb-1">
              Quality Above All
            </span>
            <h3 className="font-serif text-3xl font-bold text-[#111111]">
              The Four Pillars of AVENDORA
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 border border-[#E2E8F0] space-y-3">
              <Droplets className="w-6 h-6 text-[#0F2C59]" />
              <h4 className="font-serif text-lg font-bold text-[#111111]">Extrait Concentration</h4>
              <p className="text-xs text-[#64748B] font-sans leading-relaxed">
                We blend at 30–32% pure oil ratio to ensure unmatched sillage and 16+ hours of persistent elegance.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#E2E8F0] space-y-3">
              <Award className="w-6 h-6 text-[#0F2C59]" />
              <h4 className="font-serif text-lg font-bold text-[#111111]">Rare Natural Botanicals</h4>
              <p className="text-xs text-[#64748B] font-sans leading-relaxed">
                Distilled from aged wild Cambodian oud, Damascus rose dawn harvests, and premium Mysore sandalwood.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#E2E8F0] space-y-3">
              <ShieldCheck className="w-6 h-6 text-[#0F2C59]" />
              <h4 className="font-serif text-lg font-bold text-[#111111]">Artisanal Inspection</h4>
              <p className="text-xs text-[#64748B] font-sans leading-relaxed">
                Every flacon is filled, hand-polished, sealed, and packaged in velvet-lined signature gift boxes.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#E2E8F0] space-y-3">
              <Heart className="w-6 h-6 text-[#0F2C59]" />
              <h4 className="font-serif text-lg font-bold text-[#111111]">Complimentary Samples</h4>
              <p className="text-xs text-[#64748B] font-sans leading-relaxed">
                Two 2ml Extrait discovery vials accompany every order so you can test notes with zero hesitation.
              </p>
            </div>
          </div>
        </div>

        {/* Master Parfumeur Quote */}
        <div className="bg-[#0F2C59] text-white p-10 sm:p-16 text-center max-w-4xl mx-auto shadow-md">
          <blockquote className="font-serif italic text-xl sm:text-2xl leading-relaxed mb-6 text-blue-50">
            &ldquo;A fragrance should never shout; it should gently beckon. It is an invisible signature that lingers long after you leave the room.&rdquo;
          </blockquote>
          <span className="text-xs uppercase font-sans tracking-[0.2em] text-blue-200 font-bold block">
            — Master Parfumeur, AVENDORA Atelier
          </span>
        </div>
      </div>
    </div>
  );
};
