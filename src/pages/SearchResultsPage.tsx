import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PERFUMES_DATA } from '../data/perfumes';
import { ProductCard } from '../components/ProductCard';
import { Search, Sparkles, X } from 'lucide-react';

interface SearchResultsPageProps {
  initialQuery?: string;
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ initialQuery = '' }) => {
  const { searchQuery, setSearchQuery, navigateTo } = useShop();
  const query = searchQuery || initialQuery;

  const [inputVal, setInputVal] = useState(query);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(inputVal);
  };

  const results = PERFUMES_DATA.filter((p) => {
    if (activeCategoryFilter !== 'all' && p.category !== activeCategoryFilter) {
      return false;
    }
    if (!query.trim()) return true;

    const q = query.toLowerCase();
    const matchesName = p.name.toLowerCase().includes(q);
    const matchesCategory = p.categoryLabel.toLowerCase().includes(q);
    const matchesDesc = p.shortDescription.toLowerCase().includes(q);
    const matchesNotes = [...p.notes.top, ...p.notes.middle, ...p.notes.base].some((n) =>
      n.toLowerCase().includes(q)
    );
    const matchesPerfumer = p.perfumer.toLowerCase().includes(q);

    return matchesName || matchesCategory || matchesDesc || matchesNotes || matchesPerfumer;
  });

  return (
    <div className="bg-white text-[#111111] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar Header */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <span className="text-xs uppercase font-sans tracking-[0.25em] text-[#0F2C59] font-bold block mb-2">
            Fragrance Catalog
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#111111] mb-6">
            Search & Discover Fragrances
          </h1>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative mb-4">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Search by note (e.g. Rose, Saffron, Oud, Sandalwood), category, or name..."
              className="w-full bg-[#F8FAFC] border border-[#CBD5E1] text-xs sm:text-sm pl-12 pr-28 py-3.5 text-[#111111] focus:outline-none focus:border-[#0F2C59]"
            />
            <Search className="w-5 h-5 text-[#64748B] absolute left-4 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#0F2C59] hover:bg-[#0A1E3F] text-white px-4 py-2 text-xs uppercase font-sans tracking-[0.1em] font-bold transition-colors cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Popular Tag suggestions */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-[#64748B] font-sans">
            <span className="text-[11px] text-[#64748B] uppercase tracking-wider font-bold">Suggested:</span>
            {['Oud', 'May Rose', 'Silk Musk', 'Mysore Sandalwood', 'Iris', 'Extrait 32%'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setInputVal(tag);
                  setSearchQuery(tag);
                }}
                className="px-2.5 py-1 bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0F2C59] text-[11px] text-[#475569] hover:text-[#0F2C59] transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Bar & Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-[#F8FAFC] p-4 border border-[#E2E8F0]">
          <div className="flex items-center gap-2 text-xs font-sans text-[#64748B]">
            {query ? (
              <span>
                Found <strong className="text-[#111111] font-bold">{results.length}</strong> fragrances matching &ldquo;{query}&rdquo;
              </span>
            ) : (
              <span>Browsing all {results.length} AVENDORA fragrances</span>
            )}
            {query && (
              <button
                type="button"
                onClick={() => {
                  setInputVal('');
                  setSearchQuery('');
                }}
                className="text-[11px] text-[#0F2C59] hover:underline flex items-center gap-1 ml-2 font-sans uppercase font-bold cursor-pointer"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {['all', 'oud', 'musk', 'floral', 'woody'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategoryFilter(cat)}
                className={`text-[11px] uppercase font-sans tracking-[0.1em] px-3 py-1.5 transition-colors cursor-pointer ${
                  activeCategoryFilter === cat
                    ? 'bg-[#0F2C59] text-white font-bold'
                    : 'bg-white text-[#64748B] border border-[#CBD5E1] hover:border-[#0F2C59] hover:text-[#111111]'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        {results.length === 0 ? (
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-10 sm:p-12 text-center max-w-lg mx-auto shadow-xs">
            <Sparkles className="w-10 h-10 text-[#0F2C59] mx-auto mb-3" />
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111111] mb-2">No Fragrances Found</h3>
            <p className="text-xs text-[#64748B] font-sans mb-6 leading-relaxed">
              We couldn&apos;t find any perfumes matching &ldquo;{query}&rdquo;. Try searching for notes like Rose, Oud, Saffron, Sandalwood, or Amber.
            </p>
            <button
              type="button"
              onClick={() => {
                setInputVal('');
                setSearchQuery('');
                setActiveCategoryFilter('all');
              }}
              className="bg-[#0F2C59] hover:bg-[#0A1E3F] text-white px-6 py-3 text-xs uppercase font-sans tracking-[0.15em] font-bold transition-colors cursor-pointer shadow-md shadow-[#0F2C59]/15"
            >
              View All Perfumes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
