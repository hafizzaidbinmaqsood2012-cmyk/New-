import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PERFUMES_DATA } from '../data/perfumes';
import { Search, X, ArrowRight, Sparkles, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SearchModal: React.FC = () => {
  const { isSearchModalOpen, setIsSearchModalOpen, navigateTo } = useShop();
  const [searchTerm, setSearchTerm] = useState('');

  const trendingTags = [
    'Cambodian Oud',
    'White Musk',
    'Turkish Rose',
    'Sandalwood',
    'Ambergris',
    'Cardamom',
    'Bergamot',
    'Cedarwood',
  ];

  const results = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const query = searchTerm.toLowerCase().trim();
    return PERFUMES_DATA.filter((p) => {
      const matchName = p.name.toLowerCase().includes(query);
      const matchCategory = p.category.toLowerCase().includes(query) || p.categoryLabel.toLowerCase().includes(query);
      const matchDescription = p.shortDescription.toLowerCase().includes(query) || p.fullDescription.toLowerCase().includes(query);
      const matchNotes = [
        ...p.notes.top,
        ...p.notes.middle,
        ...p.notes.base,
      ].some((note) => note.toLowerCase().includes(query));
      const matchPerfumer = p.perfumer.toLowerCase().includes(query);

      return matchName || matchCategory || matchDescription || matchNotes || matchPerfumer;
    });
  }, [searchTerm]);

  if (!isSearchModalOpen) return null;

  const handleSelectProduct = (productId: string) => {
    setIsSearchModalOpen(false);
    navigateTo('product', { id: productId });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsSearchModalOpen(false);
      navigateTo('search', { query: searchTerm });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSearchModalOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        />

        <div className="min-h-screen flex items-start justify-center p-4 sm:p-6 md:p-20 z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            className="w-full max-w-3xl bg-white border border-[#CBD5E1] shadow-2xl overflow-hidden text-[#111111]"
          >
            {/* Search Input Bar */}
            <form onSubmit={handleSearchSubmit} className="relative border-b border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:p-6 flex items-center gap-3">
              <Search className="w-6 h-6 text-[#0F2C59] shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search perfumes, notes (Oud, Rose, Sandalwood), or collections..."
                className="w-full text-base sm:text-lg font-serif text-[#111111] placeholder:text-[#94A3B8] focus:outline-none bg-transparent"
                autoFocus
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="p-1 text-[#64748B] hover:text-[#111111] cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsSearchModalOpen(false)}
                className="p-2 text-[#64748B] hover:text-[#111111] border-l border-[#CBD5E1] pl-3 ml-1 cursor-pointer"
                aria-label="Close search modal"
              >
                <X className="w-5 h-5" />
              </button>
            </form>

            {/* Content Area */}
            <div className="p-6 max-h-[60vh] overflow-y-auto bg-white">
              {!searchTerm.trim() ? (
                <div>
                  <div className="mb-6">
                    <p className="text-xs uppercase font-sans tracking-[0.2em] text-[#0F2C59] mb-3 flex items-center gap-1.5 font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-[#0F2C59]" />
                      Popular Searches
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {trendingTags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setSearchTerm(tag)}
                          className="text-xs bg-[#F0F4F8] border border-[#D8E2ED] hover:border-[#0F2C59] text-[#0F2C59] hover:bg-[#0F2C59] hover:text-white px-3.5 py-1.5 transition-colors font-sans cursor-pointer"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-[#E2E8F0] pt-6">
                    <p className="text-xs uppercase font-sans tracking-[0.2em] text-[#64748B] mb-3 font-semibold">
                      Featured Fragrances
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {PERFUMES_DATA.slice(0, 4).map((perfume) => (
                        <div
                          key={perfume.id}
                          onClick={() => handleSelectProduct(perfume.id)}
                          className="flex items-center gap-3 p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0F2C59] cursor-pointer transition-all group"
                        >
                          <img
                            src={perfume.primaryImage}
                            alt={perfume.name}
                            referrerPolicy="no-referrer"
                            className="w-12 h-14 object-cover shrink-0 bg-[#F1F5F9]"
                          />
                          <div className="overflow-hidden">
                            <h4 className="font-serif text-sm text-[#111111] group-hover:text-[#0F2C59] truncate font-bold">
                              {perfume.name}
                            </h4>
                            <p className="text-[11px] text-[#64748B] font-sans truncate">
                              {perfume.categoryLabel} • From PKR {perfume.sizes[0].price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : results.length > 0 ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs text-[#64748B] font-sans">
                      Found <span className="font-bold text-[#111111]">{results.length}</span> fragrances matching &ldquo;{searchTerm}&rdquo;
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSearchModalOpen(false);
                        navigateTo('search', { query: searchTerm });
                      }}
                      className="text-xs text-[#0F2C59] hover:underline font-sans uppercase tracking-[0.1em] flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <span>Full Results Page</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {results.map((perfume) => (
                      <div
                        key={perfume.id}
                        onClick={() => handleSelectProduct(perfume.id)}
                        className="flex items-center justify-between p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0F2C59] cursor-pointer transition-all group shadow-xs"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={perfume.primaryImage}
                            alt={perfume.name}
                            referrerPolicy="no-referrer"
                            className="w-14 h-16 object-cover shrink-0 bg-[#F1F5F9] border border-[#E2E8F0]"
                          />
                          <div>
                            <span className="text-[10px] uppercase font-sans tracking-[0.15em] text-[#0F2C59] font-bold block">
                              {perfume.categoryLabel}
                            </span>
                            <h4 className="font-serif text-base text-[#111111] group-hover:text-[#0F2C59] transition-colors font-bold">
                              {perfume.name}
                            </h4>
                            <p className="text-xs text-[#64748B] line-clamp-1 font-serif italic">
                              Notes: {perfume.notes.top.slice(0, 2).join(', ')}, {perfume.notes.base[0]}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0 pl-4">
                          <div className="flex items-center gap-1 text-[#0F2C59] text-xs justify-end mb-0.5">
                            <Star className="w-3 h-3 fill-[#0F2C59]" />
                            <span className="font-sans font-bold">{perfume.rating}</span>
                          </div>
                          <span className="font-serif text-sm font-bold text-[#111111]">
                            PKR {perfume.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="font-serif text-lg text-[#111111] font-bold mb-1">
                    No fragrances found for &ldquo;{searchTerm}&rdquo;
                  </p>
                  <p className="text-xs text-[#64748B] font-sans max-w-sm mx-auto mb-4">
                    Try searching by note (e.g. Amber, Jasmine, Iris, Oud) or explore our complete catalog.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchModalOpen(false);
                      navigateTo('shop');
                    }}
                    className="bg-[#0F2C59] text-white hover:bg-[#0A1E3F] px-5 py-2.5 text-xs uppercase font-sans tracking-[0.15em] font-bold transition-colors cursor-pointer"
                  >
                    View All Perfumes
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
