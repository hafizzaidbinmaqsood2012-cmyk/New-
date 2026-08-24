import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PERFUMES_DATA, CATEGORIES_DATA } from '../data/perfumes';
import { ProductCard } from '../components/ProductCard';
import { Filter, SlidersHorizontal, X, Sparkles } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { navigateTo } = useShop();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedConcentration, setSelectedConcentration] = useState<string>('all');
  const [selectedNote, setSelectedNote] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(15000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const availableNotes = [
    'Oud',
    'Rose',
    'Saffron',
    'Sandalwood',
    'Musk',
    'Iris',
    'Amber',
    'Cedar',
    'Jasmine',
    'Vanilla',
    'Bergamot',
    'Cardamom',
  ];

  const filteredPerfumes = useMemo(() => {
    return PERFUMES_DATA.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Concentration filter
      if (selectedConcentration !== 'all') {
        if (selectedConcentration === 'extrait' && !p.characteristics.concentration.includes('Extrait')) {
          return false;
        }
        if (selectedConcentration === 'edp' && !p.characteristics.concentration.includes('Eau de Parfum')) {
          return false;
        }
      }
      // Gender filter
      if (selectedGender !== 'all' && p.characteristics.gender !== selectedGender) {
        return false;
      }
      // Note filter
      if (selectedNote !== 'all') {
        const allNotes = [...p.notes.top, ...p.notes.middle, ...p.notes.base].map((n) => n.toLowerCase());
        if (!allNotes.some((n) => n.includes(selectedNote.toLowerCase()))) {
          return false;
        }
      }
      // Price filter
      if (p.price > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // default featured
    });
  }, [selectedCategory, selectedConcentration, selectedNote, selectedGender, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedConcentration('all');
    setSelectedNote('all');
    setSelectedGender('all');
    setMaxPrice(15000);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedConcentration !== 'all' ||
    selectedNote !== 'all' ||
    selectedGender !== 'all' ||
    maxPrice < 15000;

  return (
    <div className="bg-white text-[#111111] min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs uppercase font-sans tracking-[0.2em] text-[#64748B] mb-2">
            <span className="cursor-pointer hover:text-[#0F2C59]" onClick={() => navigateTo('home')}>
              Home
            </span>
            <span>/</span>
            <span className="text-[#0F2C59] font-bold">Fragrance Catalog</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-black text-[#111111] mb-3">All Perfumes</h1>
          <p className="text-xs sm:text-sm text-[#64748B] font-sans leading-relaxed">
            Discover our complete collection of artisanal Extraits and luxury Eaux de Parfum, crafted with pure wild agarwood, fresh floral extracts, and rich woody notes.
          </p>
        </div>

        {/* Quick Category Tab Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 pb-6 border-b border-[#E2E8F0]">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 text-xs font-sans uppercase tracking-[0.15em] transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#0F2C59] text-white font-bold shadow-xs'
                : 'bg-[#F8FAFC] text-[#475569] hover:text-[#111111] border border-[#E2E8F0]'
            }`}
          >
            All Fragrances ({PERFUMES_DATA.length})
          </button>
          {CATEGORIES_DATA.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 text-xs font-sans uppercase tracking-[0.15em] transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#0F2C59] text-white font-bold shadow-xs'
                  : 'bg-[#F8FAFC] text-[#475569] hover:text-[#111111] border border-[#E2E8F0]'
              }`}
            >
              {cat.name.replace('The ', '')}
            </button>
          ))}
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-[#F8FAFC] p-4 border border-[#E2E8F0]">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 text-xs uppercase font-sans tracking-[0.1em] font-bold text-[#111111] border border-[#E2E8F0] px-3 py-2 bg-white cursor-pointer shadow-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#0F2C59]" />
              <span>Filters {hasActiveFilters && '• Active'}</span>
            </button>

            <span className="text-xs text-[#64748B] font-sans">
              Showing <span className="font-bold text-[#111111]">{filteredPerfumes.length}</span> of {PERFUMES_DATA.length} Fragrances
            </span>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-[#0F2C59] hover:underline font-sans uppercase tracking-[0.1em] flex items-center gap-1 font-bold cursor-pointer"
              >
                <X className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#64748B] font-sans whitespace-nowrap">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#CBD5E1] text-xs font-sans px-3 py-2 text-[#111111] focus:outline-none focus:border-[#0F2C59] cursor-pointer shadow-xs"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">New Releases</option>
            </select>
          </div>
        </div>

        {/* Main Catalog Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} space-y-6`}>
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                <h3 className="font-serif text-lg font-bold text-[#111111] flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#0F2C59]" />
                  Filter Catalog
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] text-[#0F2C59] hover:underline uppercase font-sans font-bold cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Olfactory Universe */}
              <div>
                <h4 className="text-xs uppercase font-sans tracking-[0.18em] text-[#0F2C59] font-bold mb-3">
                  Fragrance Collection
                </h4>
                <div className="space-y-2">
                  {['all', 'oud', 'musk', 'floral', 'woody'].map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2.5 text-xs text-[#475569] hover:text-[#111111] cursor-pointer font-sans"
                    >
                      <input
                        type="radio"
                        name="categoryFilter"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        className="accent-[#0F2C59]"
                      />
                      <span className="capitalize">{cat === 'all' ? 'All Collections' : `${cat} Collection`}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Concentration */}
              <div className="border-t border-[#E2E8F0] pt-5">
                <h4 className="text-xs uppercase font-sans tracking-[0.18em] text-[#0F2C59] font-bold mb-3">
                  Concentration
                </h4>
                <div className="space-y-2">
                  {[
                    { id: 'all', label: 'All Concentrations' },
                    { id: 'extrait', label: 'Extrait de Parfum (30–32%)' },
                    { id: 'edp', label: 'Eau de Parfum Intense (22–26%)' },
                  ].map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center gap-2.5 text-xs text-[#475569] hover:text-[#111111] cursor-pointer font-sans"
                    >
                      <input
                        type="radio"
                        name="concentrationFilter"
                        checked={selectedConcentration === item.id}
                        onChange={() => setSelectedConcentration(item.id)}
                        className="accent-[#0F2C59]"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Key Scent Notes */}
              <div className="border-t border-[#E2E8F0] pt-5">
                <h4 className="text-xs uppercase font-sans tracking-[0.18em] text-[#0F2C59] font-bold mb-3">
                  Key Scent Notes
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedNote('all')}
                    className={`text-[11px] px-2.5 py-1 font-sans border transition-colors cursor-pointer ${
                      selectedNote === 'all'
                        ? 'bg-[#0F2C59] text-white font-bold border-[#0F2C59]'
                        : 'bg-white text-[#475569] border-[#E2E8F0] hover:border-[#0F2C59] hover:text-[#111111]'
                    }`}
                  >
                    All Notes
                  </button>
                  {availableNotes.map((note) => (
                    <button
                      key={note}
                      type="button"
                      onClick={() => setSelectedNote(note)}
                      className={`text-[11px] px-2.5 py-1 font-sans border transition-colors cursor-pointer ${
                        selectedNote === note
                          ? 'bg-[#0F2C59] text-white font-bold border-[#0F2C59]'
                          : 'bg-white text-[#475569] border-[#E2E8F0] hover:border-[#0F2C59] hover:text-[#111111]'
                      }`}
                    >
                      {note}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender Harmony */}
              <div className="border-t border-[#E2E8F0] pt-5">
                <h4 className="text-xs uppercase font-sans tracking-[0.18em] text-[#0F2C59] font-bold mb-3">
                  Gender Suitability
                </h4>
                <div className="space-y-2">
                  {['all', 'Unisex', 'Femme', 'Homme'].map((g) => (
                    <label
                      key={g}
                      className="flex items-center gap-2.5 text-xs text-[#475569] hover:text-[#111111] cursor-pointer font-sans"
                    >
                      <input
                        type="radio"
                        name="genderFilter"
                        checked={selectedGender === g}
                        onChange={() => setSelectedGender(g)}
                        className="accent-[#0F2C59]"
                      />
                      <span>{g === 'all' ? 'All Profiles' : g}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Max Price Slider */}
              <div className="border-t border-[#E2E8F0] pt-5">
                <div className="flex items-center justify-between text-xs font-sans mb-2">
                  <span className="uppercase tracking-[0.18em] text-[#475569] font-semibold">
                    Max Price
                  </span>
                  <span className="font-serif font-bold text-sm text-[#0F2C59]">PKR {maxPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="4000"
                  max="15000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#0F2C59] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#64748B] font-sans mt-1">
                  <span>PKR 4,000</span>
                  <span>PKR 15,000</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {filteredPerfumes.length === 0 ? (
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-12 text-center">
                <Sparkles className="w-10 h-10 text-[#0F2C59] mx-auto mb-3" />
                <h3 className="font-serif text-2xl font-bold text-[#111111] mb-2">
                  No Fragrance Matches Your Current Filter
                </h3>
                <p className="text-xs text-[#64748B] font-sans max-w-sm mx-auto mb-6 leading-relaxed">
                  Try adjusting your notes selection or price range to explore other formulations in our catalog.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="bg-[#0F2C59] text-white hover:bg-[#0A1E3F] px-6 py-3 text-xs uppercase font-sans tracking-[0.15em] font-bold transition-colors cursor-pointer shadow-xs"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPerfumes.map((perfume) => (
                  <ProductCard key={perfume.id} product={perfume} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
