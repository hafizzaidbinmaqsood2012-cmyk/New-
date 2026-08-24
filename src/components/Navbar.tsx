import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Search,
  ShoppingBag,
  Heart,
  User as UserIcon,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  LogOut,
  FolderArchive,
} from 'lucide-react';
import { CATEGORIES_DATA } from '../data/perfumes';
import { ExportProjectModal } from './ExportProjectModal';

export const Navbar: React.FC = () => {
  const {
    currentRoute,
    navigateTo,
    cartCount,
    wishlist,
    currentUser,
    logout,
    setIsCartDrawerOpen,
    setIsSearchModalOpen,
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionsDropdownOpen, setCollectionsDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Announcement Bar with Direct ZIP Export Link */}
      <div className="bg-[#0F2C59] text-white py-2 px-4 text-center text-[11px] font-sans tracking-[0.2em] uppercase flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 mx-auto">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span>
            Complimentary 2-vial discovery set &amp; gift box with all orders • Free delivery over PKR 5,000
          </span>
        </div>

        {/* Instant Export / Download Button in Header */}
        <button
          onClick={() => setIsExportModalOpen(true)}
          className="bg-amber-400 hover:bg-amber-300 text-[#0F2C59] px-3 py-1 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ml-auto"
        >
          <FolderArchive className="w-3.5 h-3.5" />
          <span>Export All Files (ZIP)</span>
        </button>
      </div>

      {/* Main Luxury Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E2E8F0] py-3.5'
            : 'bg-white border-b border-[#E2E8F0] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left Nav (Desktop) */}
            <nav className="hidden lg:flex items-center space-x-7 text-xs tracking-[0.18em] uppercase font-sans font-medium text-[#111111]">
              <button
                type="button"
                onClick={() => navigateTo('home')}
                className={`hover:text-[#0F2C59] transition-colors py-1 relative cursor-pointer ${
                  currentRoute === 'home' ? 'text-[#0F2C59] font-semibold' : ''
                }`}
              >
                Home
                {currentRoute === 'home' && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0F2C59]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => navigateTo('shop')}
                className={`hover:text-[#0F2C59] transition-colors py-1 relative cursor-pointer ${
                  currentRoute === 'shop' ? 'text-[#0F2C59] font-semibold' : ''
                }`}
              >
                All Perfumes
                {currentRoute === 'shop' && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0F2C59]" />
                )}
              </button>

              {/* Collections Mega Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCollectionsDropdownOpen(true)}
                onMouseLeave={() => setCollectionsDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => navigateTo('categories')}
                  className={`hover:text-[#0F2C59] transition-colors py-1 flex items-center gap-1 relative cursor-pointer ${
                    currentRoute.startsWith('category') ? 'text-[#0F2C59] font-semibold' : ''
                  }`}
                >
                  <span>Collections</span>
                  <ChevronDown className="w-3 h-3" />
                  {currentRoute.startsWith('category') && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0F2C59]" />
                  )}
                </button>

                {collectionsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-[#E2E8F0] shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="text-[10px] text-[#64748B] font-sans tracking-[0.2em] uppercase px-3 py-1.5 border-b border-[#E2E8F0] mb-1">
                      Fragrance Collections
                    </div>
                    {CATEGORIES_DATA.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          navigateTo(`category-${cat.id}`);
                          setCollectionsDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2.5 text-xs hover:bg-[#F0F4F8] transition-colors flex flex-col group cursor-pointer"
                      >
                        <span className="font-serif text-sm font-medium text-[#111111] group-hover:text-[#0F2C59]">
                          {cat.name}
                        </span>
                        <span className="text-[10px] text-[#64748B] font-sans">
                          {cat.tagline}
                        </span>
                      </button>
                    ))}
                    <div className="pt-2 border-t border-[#E2E8F0] mt-1">
                      <button
                        type="button"
                        onClick={() => {
                          navigateTo('categories');
                          setCollectionsDropdownOpen(false);
                        }}
                        className="w-full text-center py-1.5 text-[11px] text-[#0F2C59] hover:underline font-sans uppercase tracking-[0.1em] font-medium cursor-pointer"
                      >
                        View All Collections →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => navigateTo('about')}
                className={`hover:text-[#0F2C59] transition-colors py-1 relative cursor-pointer ${
                  currentRoute === 'about' ? 'text-[#0F2C59] font-semibold' : ''
                }`}
              >
                About Us
                {currentRoute === 'about' && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0F2C59]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => navigateTo('contact')}
                className={`hover:text-[#0F2C59] transition-colors py-1 relative cursor-pointer ${
                  currentRoute === 'contact' ? 'text-[#0F2C59] font-semibold' : ''
                }`}
              >
                Concierge
                {currentRoute === 'contact' && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0F2C59]" />
                )}
              </button>
            </nav>

            {/* Center Brand Identity */}
            <div className="text-center cursor-pointer select-none" onClick={() => navigateTo('home')}>
              <div className="font-serif tracking-[0.28em] text-xl sm:text-2xl font-bold text-[#0F2C59] uppercase hover:opacity-85 transition-opacity">
                AVENDORA
              </div>
              <div className="font-serif italic text-[11px] text-[#475569] tracking-[0.3em] uppercase -mt-0.5 font-medium">
                Luxury Parfums
              </div>
            </div>

            {/* Right Quick Actions */}
            <div className="flex items-center space-x-3 sm:space-x-4 text-[#111111]">
              {/* Search Modal Trigger */}
              <button
                type="button"
                onClick={() => setIsSearchModalOpen(true)}
                className="p-1.5 hover:text-[#0F2C59] transition-colors cursor-pointer"
                title="Search fragrances and notes"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <button
                type="button"
                onClick={() => navigateTo('wishlist')}
                className="p-1.5 hover:text-[#0F2C59] transition-colors relative cursor-pointer"
                title="Wishlist / Fragrance Vault"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#0F2C59] text-white font-bold text-[9px] rounded-full flex items-center justify-center font-sans">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Account Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setUserMenuOpen(true)}
                onMouseLeave={() => setUserMenuOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => (currentUser ? navigateTo('account') : navigateTo('login'))}
                  className="p-1.5 hover:text-[#0F2C59] transition-colors flex items-center gap-1 cursor-pointer"
                  title="Account"
                  aria-label="Account"
                >
                  <UserIcon className="w-5 h-5" />
                  {currentUser && (
                    <span className="hidden xl:inline-block text-[11px] font-sans uppercase tracking-[0.1em] max-w-[80px] truncate">
                      {currentUser.name.split(' ')[0]}
                    </span>
                  )}
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#E2E8F0] shadow-xl p-2 z-50 animate-in fade-in duration-150">
                    {currentUser ? (
                      <div>
                        <div className="px-3 py-2 border-b border-[#E2E8F0]">
                          <p className="text-xs font-serif font-semibold text-[#111111]">
                            {currentUser.name}
                          </p>
                          <p className="text-[10px] text-[#64748B] font-sans truncate">
                            {currentUser.email}
                          </p>
                          <span className="inline-block mt-1 bg-[#F0F4F8] text-[#0F2C59] border border-[#D8E2ED] text-[9px] uppercase px-1.5 py-0.5 font-bold font-sans">
                            {currentUser.memberTier} Member
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            navigateTo('account');
                            setUserMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs text-[#111111] hover:bg-[#F0F4F8] font-sans cursor-pointer transition-colors"
                        >
                          My Account &amp; Orders
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            navigateTo('wishlist');
                            setUserMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs text-[#111111] hover:bg-[#F0F4F8] font-sans flex items-center justify-between cursor-pointer transition-colors"
                        >
                          <span>Fragrance Wishlist</span>
                          <span className="text-[10px] text-[#64748B]">{wishlist.length}</span>
                        </button>
                        <div className="border-t border-[#E2E8F0] my-1" />
                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setUserMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs text-[#0F2C59] hover:bg-[#F0F4F8] flex items-center gap-1.5 font-sans cursor-pointer transition-colors"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    ) : (
                      <div className="p-2">
                        <p className="text-xs text-[#64748B] font-sans mb-3 text-center">
                          Sign in to access your orders &amp; private perks
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            navigateTo('login');
                            setUserMenuOpen(false);
                          }}
                          className="w-full bg-[#0F2C59] text-white hover:bg-[#0A1E3F] py-2 text-xs font-sans uppercase tracking-[0.15em] font-semibold transition-colors mb-2 text-center block cursor-pointer"
                        >
                          Sign In
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            navigateTo('signup');
                            setUserMenuOpen(false);
                          }}
                          className="w-full border border-[#0F2C59] text-[#0F2C59] hover:bg-[#0F2C59] hover:text-white py-2 text-xs font-sans uppercase tracking-[0.15em] font-semibold transition-colors text-center block cursor-pointer"
                        >
                          Create Account
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={() => setIsCartDrawerOpen(true)}
                className="p-1.5 hover:text-[#0F2C59] transition-colors relative flex items-center gap-1 cursor-pointer"
                title="Shopping Bag"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="w-5 h-5 bg-[#0F2C59] text-white text-[10px] font-bold rounded-full flex items-center justify-center font-sans">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 hover:text-[#0F2C59] transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#111111]" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative ml-auto w-4/5 max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] mb-6">
                <span className="font-serif text-lg font-bold text-[#0F2C59]">AVENDORA</span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-[#64748B] hover:text-[#111111]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4 font-sans text-xs uppercase tracking-[0.18em]">
                <button
                  onClick={() => {
                    navigateTo('home');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 hover:text-[#0F2C59] font-medium"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    navigateTo('shop');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 hover:text-[#0F2C59] font-medium"
                >
                  All Perfumes
                </button>
                <button
                  onClick={() => {
                    navigateTo('categories');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 hover:text-[#0F2C59] font-medium"
                >
                  Collections
                </button>
                <button
                  onClick={() => {
                    navigateTo('about');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 hover:text-[#0F2C59] font-medium"
                >
                  About Us
                </button>
                <button
                  onClick={() => {
                    navigateTo('contact');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 hover:text-[#0F2C59] font-medium"
                >
                  Concierge
                </button>
                <button
                  onClick={() => {
                    setIsExportModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-[#0F2C59] font-bold"
                >
                  Export Project (ZIP)
                </button>
              </div>
            </div>

            <div className="border-t border-[#E2E8F0] pt-6 space-y-3">
              {currentUser ? (
                <div>
                  <p className="text-xs font-serif font-bold text-[#111111]">{currentUser.name}</p>
                  <p className="text-[10px] text-[#64748B] mb-2">{currentUser.email}</p>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs text-red-600 font-bold uppercase tracking-wider"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    navigateTo('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-[#0F2C59] text-white py-3 text-xs uppercase font-sans tracking-[0.15em] font-bold text-center"
                >
                  Sign In / Register
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Interactive Export Project ZIP Modal */}
      <ExportProjectModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </>
  );
};
