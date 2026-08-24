import React, { useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES_DATA, PERFUMES_DATA } from '../data/perfumes';
import { ProductCard } from '../components/ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';

interface CategoryPageProps {
  categoryId?: string;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categoryId = 'oud' }) => {
  const { navigateTo } = useShop();

  const category = useMemo(() => {
    return CATEGORIES_DATA.find((c) => c.id === categoryId) || CATEGORIES_DATA[0];
  }, [categoryId]);

  const categoryPerfumes = useMemo(() => {
    return PERFUMES_DATA.filter((p) => p.category === category.id);
  }, [category.id]);

  return (
    <div className="bg-white text-[#111111] min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs uppercase font-sans tracking-[0.2em] text-[#64748B] mb-6">
          <span className="cursor-pointer hover:text-[#0F2C59]" onClick={() => navigateTo('home')}>
            Home
          </span>
          <span>/</span>
          <span className="cursor-pointer hover:text-[#0F2C59]" onClick={() => navigateTo('categories')}>
            Collections
          </span>
          <span>/</span>
          <span className="text-[#0F2C59] font-bold">{category.name}</span>
        </div>

        {/* Collection Hero Banner */}
        <div className="relative bg-[#F8FAFC] border border-[#E2E8F0] overflow-hidden mb-16 p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.25em] text-[#0F2C59] font-bold bg-white border border-[#CBD5E1] px-3.5 py-1.5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{category.tagline}</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl font-black text-[#111111] leading-tight">
                {category.name}
              </h1>
              <p className="text-sm sm:text-base text-[#475569] font-sans leading-relaxed max-w-xl">
                {category.description}
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs font-sans text-[#64748B]">
                <span>{categoryPerfumes.length} Formulations Available</span>
                <span>•</span>
                <span>Complimentary 2ml Sample Vials</span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/3] bg-[#F1F5F9] border border-[#E2E8F0] overflow-hidden shadow-lg">
                <img
                  src={category.heroImage}
                  alt={category.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Collection Switcher Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {CATEGORIES_DATA.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => navigateTo(`category-${cat.id}`)}
              className={`px-6 py-2.5 text-xs font-sans uppercase tracking-[0.15em] transition-all cursor-pointer ${
                cat.id === category.id
                  ? 'bg-[#0F2C59] text-white font-bold shadow-xs'
                  : 'bg-[#F8FAFC] text-[#475569] hover:text-[#111111] border border-[#E2E8F0]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E2E8F0]">
            <h2 className="font-serif text-2xl text-[#111111] font-bold">
              Available Formulations ({categoryPerfumes.length})
            </h2>
            <button
              type="button"
              onClick={() => navigateTo('shop')}
              className="text-xs uppercase font-sans tracking-[0.15em] text-[#0F2C59] hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>View All Fragrances</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryPerfumes.map((perfume) => (
              <ProductCard key={perfume.id} product={perfume} />
            ))}
          </div>
        </div>

        {/* Other Collections Carousel Preview */}
        <div className="border-t border-[#E2E8F0] pt-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[11px] uppercase font-sans tracking-[0.25em] text-[#0F2C59] font-bold block mb-1">
              Explore Other Universes
            </span>
            <h3 className="font-serif text-3xl text-[#111111] font-bold">
              Complementary Collections
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {CATEGORIES_DATA.filter((c) => c.id !== category.id).map((otherCat) => (
              <div
                key={otherCat.id}
                onClick={() => navigateTo(`category-${otherCat.id}`)}
                className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 cursor-pointer hover:border-[#0F2C59] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] bg-[#F1F5F9] overflow-hidden mb-4 border border-[#E2E8F0]">
                    <img
                      src={otherCat.heroImage}
                      alt={otherCat.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="font-serif text-lg text-[#111111] group-hover:text-[#0F2C59] font-bold mb-1">
                    {otherCat.name}
                  </h4>
                  <p className="text-xs text-[#64748B] font-sans line-clamp-2">
                    {otherCat.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-sans uppercase tracking-[0.1em] text-[#0F2C59] font-bold">
                  <span>Explore Universe</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
