import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { PERFUMES_DATA } from '../data/perfumes';
import { ProductCard } from '../components/ProductCard';
import { BottleSize, Review } from '../types';
import {
  Star,
  Heart,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Plus,
  Minus,
  Award,
} from 'lucide-react';

interface ProductDetailPageProps {
  productId?: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
  const {
    navigateTo,
    addToCart,
    isInWishlist,
    toggleWishlist,
    showToast,
  } = useShop();

  const product =
    (productId ? PERFUMES_DATA.find((p) => p.id === productId || p.slug === productId) : null) ||
    PERFUMES_DATA[0];

  const [selectedImage, setSelectedImage] = useState<string>(product.primaryImage);
  const [selectedSize, setSelectedSize] = useState<BottleSize>(
    product.sizes[1] || product.sizes[0]
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'description' | 'notes' | 'perfumer' | 'reviews'>('description');

  // Review Form State
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [customReviews, setCustomReviews] = useState<Review[]>(product.reviews || []);

  useEffect(() => {
    setSelectedImage(product.primaryImage);
    setSelectedSize(product.sizes[1] || product.sizes[0]);
    setQuantity(1);
    setCustomReviews(product.reviews || []);
  }, [product.id, product.primaryImage]);

  const isWished = isInWishlist(product.id);

  const relatedProducts = PERFUMES_DATA.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = (openDrawer: boolean = true) => {
    addToCart(product, selectedSize, quantity, openDrawer);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity, false);
    navigateTo('checkout');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewTitle || !newReviewComment) {
      showToast('Please fill all review fields.', 'info');
      return;
    }

    const reviewObj: Review = {
      id: 'rev_' + Date.now(),
      author: newReviewAuthor,
      location: 'Verified Fragrance Buyer',
      rating: newReviewRating,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      title: newReviewTitle,
      comment: newReviewComment,
      verified: true,
    };

    setCustomReviews([reviewObj, ...customReviews]);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
    showToast('Your review has been submitted successfully.', 'navy');
  };

  return (
    <div className="bg-white text-[#111111] min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs uppercase font-sans tracking-[0.2em] text-[#64748B] mb-8">
          <span className="cursor-pointer hover:text-[#0F2C59]" onClick={() => navigateTo('home')}>
            Home
          </span>
          <ChevronRight className="w-3 h-3 text-[#CBD5E1]" />
          <span className="cursor-pointer hover:text-[#0F2C59]" onClick={() => navigateTo('shop')}>
            All Perfumes
          </span>
          <ChevronRight className="w-3 h-3 text-[#CBD5E1]" />
          <span
            className="cursor-pointer hover:text-[#0F2C59]"
            onClick={() => navigateTo(`category-${product.category}`)}
          >
            {product.categoryLabel}
          </span>
          <ChevronRight className="w-3 h-3 text-[#CBD5E1]" />
          <span className="text-[#0F2C59] font-bold truncate">{product.name}</span>
        </nav>

        {/* Product Main Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-[#F8FAFC] border border-[#E2E8F0] p-6 sm:p-10 mb-16 shadow-xs">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/5] bg-white border border-[#E2E8F0] overflow-hidden flex items-center justify-center p-8">
              <img
                src={selectedImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-500"
              />
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  isWished
                    ? 'bg-white text-[#0F2C59] border border-[#CBD5E1] shadow-sm'
                    : 'bg-white/80 backdrop-blur-sm text-[#64748B] hover:text-[#0F2C59] hover:bg-white shadow-xs'
                }`}
                title={isWished ? 'Remove from wishlist' : 'Save to wishlist'}
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-5 h-5 ${isWished ? 'fill-[#0F2C59]' : ''}`} />
              </button>

              {product.isBestSeller && (
                <div className="absolute top-4 left-4 bg-[#0F2C59] text-white text-[10px] uppercase font-sans tracking-[0.2em] px-3 py-1 font-bold shadow-xs">
                  Best Seller
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-24 bg-white border-2 shrink-0 overflow-hidden cursor-pointer transition-all ${
                      selectedImage === img
                        ? 'border-[#0F2C59] opacity-100 shadow-xs'
                        : 'border-[#E2E8F0] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} angle ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Ordering */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Origin */}
              <div className="flex items-center justify-between text-xs font-sans uppercase tracking-[0.2em] text-[#64748B] mb-2">
                <span className="text-[#0F2C59] font-bold">{product.categoryLabel}</span>
                <span>{product.origin}</span>
              </div>

              {/* Title & Subtitle */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#111111] font-black mb-2">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B] font-sans mb-4">
                {product.subtitle}
              </p>

              {/* Ratings */}
              <div className="flex items-center gap-3 pb-5 border-b border-[#E2E8F0]">
                <div className="flex text-[#0F2C59]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#0F2C59]'
                          : 'text-[#E2E8F0] fill-[#E2E8F0]'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-sans text-[#111111] font-bold">
                  {product.rating} / 5.0
                </span>
                <span className="text-xs font-sans text-[#64748B]">
                  • {product.reviewCount + customReviews.length - product.reviews.length} Verified Customer Reviews
                </span>
              </div>

              {/* Price */}
              <div className="py-5 flex items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#111111]">
                  PKR {selectedSize.price.toLocaleString()}
                </span>
                <span className="text-xs text-[#64748B] font-sans uppercase tracking-[0.1em]">
                  ({selectedSize.size} • {selectedSize.volume})
                </span>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-[#475569] font-sans leading-relaxed mb-6">
                {product.shortDescription}
              </p>

              {/* Bottle Size Selector */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-xs font-sans uppercase tracking-[0.15em] text-[#111111] font-bold">
                  <span>Select Bottle Size</span>
                  <span className="text-[#0F2C59] font-normal lowercase tracking-normal text-xs">
                    {selectedSize.inStock ? 'In Stock & Ready for Dispatch' : 'Currently Unavailable'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size.size}
                      type="button"
                      disabled={!size.inStock}
                      onClick={() => setSelectedSize(size)}
                      className={`p-3 text-center border transition-all cursor-pointer ${
                        selectedSize.size === size.size
                          ? 'border-[#0F2C59] bg-[#0F2C59] text-white font-bold shadow-xs'
                          : size.inStock
                          ? 'border-[#E2E8F0] bg-white text-[#475569] hover:border-[#0F2C59]'
                          : 'border-[#E2E8F0] bg-[#F1F5F9] text-[#94A3B8] cursor-not-allowed opacity-50'
                      }`}
                    >
                      <span className="block font-serif text-sm font-bold">
                        {size.size}
                      </span>
                      <span className="block text-[10px] font-sans opacity-80">
                        {size.volume}
                      </span>
                      <span className="block text-xs font-sans font-bold mt-1">
                        PKR {size.price.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-4 pt-2">
                <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between border border-[#CBD5E1] bg-white px-3 py-2 sm:w-32 shrink-0">
                    <span className="text-[10px] uppercase font-sans tracking-[0.1em] text-[#64748B] sm:hidden">
                      Qty:
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 text-[#475569] hover:text-[#111111] cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-sans text-sm font-bold text-[#111111] px-2">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1 text-[#475569] hover:text-[#111111] cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Bag CTA */}
                  <button
                    type="button"
                    onClick={() => handleAddToCart(true)}
                    className="flex-1 bg-[#0F2C59] hover:bg-[#0A1E3F] text-white py-3.5 px-6 text-xs uppercase font-sans tracking-[0.2em] font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#0F2C59]/15"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag • PKR {(selectedSize.price * quantity).toLocaleString()}</span>
                  </button>
                </div>

                {/* Direct Buy Now CTA */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full border-2 border-[#0F2C59] text-[#0F2C59] hover:bg-[#0F2C59] hover:text-white py-3 px-6 text-xs uppercase font-sans tracking-[0.2em] font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer bg-white"
                >
                  <span>Buy Now — Direct Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Stock Notice & Perks */}
              <div className="pt-6 border-t border-[#E2E8F0] space-y-2.5 text-xs text-[#64748B] font-sans">
                <div className="flex items-center gap-2 text-[#0F2C59]">
                  <Sparkles className="w-4 h-4 text-[#0F2C59] shrink-0" />
                  <span>
                    Batch #{Math.floor(100 + Math.random() * 900)}: {product.stockQuantity} bottles available in this batch.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#0F2C59] shrink-0" />
                  <span>2 complimentary 2ml sample vials included with every order.</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0F2C59] shrink-0" />
                  <span>Free shipping on orders above PKR 5,000 & 100% authentic guarantee.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Olfactory Scent Pyramid Section */}
        <section className="bg-[#F8FAFC] border border-[#E2E8F0] p-8 sm:p-12 mb-16 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[11px] uppercase font-sans tracking-[0.25em] text-[#0F2C59] font-bold block mb-1">
              Fragrance Architecture
            </span>
            <h2 className="font-serif text-3xl font-black text-[#111111]">The Scent Notes Pyramid</h2>
            <p className="text-xs text-[#64748B] font-sans mt-2">
              Formulated by {product.perfumer} using pure and long-lasting fragrance oils.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Top Notes */}
            <div className="bg-white border border-[#E2E8F0] p-6 text-center shadow-xs">
              <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#0F2C59] font-bold block mb-2">
                Top Notes • Opening
              </span>
              <h3 className="font-serif text-xl font-bold text-[#111111] mb-3">The Opening</h3>
              <ul className="space-y-1.5 text-xs text-[#475569] font-serif italic">
                {product.notes.top.map((note, i) => (
                  <li key={i} className="text-[#111111] font-medium">
                    {note}
                  </li>
                ))}
              </ul>
              <span className="inline-block mt-4 text-[10px] text-[#64748B] font-sans uppercase">
                First 30 Minutes
              </span>
            </div>

            {/* Heart Notes */}
            <div className="bg-[#F0F4F8] border-2 border-[#0F2C59] p-6 text-center shadow-sm">
              <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#0F2C59] font-bold block mb-2">
                Heart Notes • The Center
              </span>
              <h3 className="font-serif text-xl font-bold text-[#111111] mb-3">The Character</h3>
              <ul className="space-y-1.5 text-xs text-[#475569] font-serif italic">
                {product.notes.middle.map((note, i) => (
                  <li key={i} className="text-[#0F2C59] font-bold">
                    {note}
                  </li>
                ))}
              </ul>
              <span className="inline-block mt-4 text-[10px] text-[#0F2C59] font-sans font-bold uppercase">
                Hours 1 to 6
              </span>
            </div>

            {/* Base Notes */}
            <div className="bg-white border border-[#E2E8F0] p-6 text-center shadow-xs">
              <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#0F2C59] font-bold block mb-2">
                Base Notes • Dry Down
              </span>
              <h3 className="font-serif text-xl font-bold text-[#111111] mb-3">The Sillage</h3>
              <ul className="space-y-1.5 text-xs text-[#475569] font-serif italic">
                {product.notes.base.map((note, i) => (
                  <li key={i} className="text-[#111111] font-medium">
                    {note}
                  </li>
                ))}
              </ul>
              <span className="inline-block mt-4 text-[10px] text-[#64748B] font-sans uppercase">
                Hours 6 to 16+
              </span>
            </div>
          </div>

          {/* Fragrance Metrics Bar */}
          <div className="mt-12 pt-8 border-t border-[#E2E8F0] grid grid-cols-2 sm:grid-cols-4 gap-6 text-center max-w-4xl mx-auto">
            <div>
              <span className="text-[10px] uppercase font-sans tracking-[0.15em] text-[#64748B] block mb-1">
                Longevity
              </span>
              <span className="font-serif text-lg text-[#111111] font-bold">
                {product.characteristics.longevity}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-sans tracking-[0.15em] text-[#64748B] block mb-1">
                Sillage Aura
              </span>
              <span className="font-serif text-lg text-[#111111] font-bold">
                {product.characteristics.sillage}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-sans tracking-[0.15em] text-[#64748B] block mb-1">
                Recommended Seasons
              </span>
              <span className="font-serif text-lg text-[#111111] font-bold">
                {product.characteristics.season.join(', ')}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-sans tracking-[0.15em] text-[#64748B] block mb-1">
                Ideal Time
              </span>
              <span className="font-serif text-lg text-[#111111] font-bold">
                {product.characteristics.timeOfDay}
              </span>
            </div>
          </div>
        </section>

        {/* Tabbed In-Depth Information */}
        <section className="bg-[#F8FAFC] border border-[#E2E8F0] p-8 sm:p-12 mb-16 shadow-xs">
          <div className="flex border-b border-[#E2E8F0] gap-6 text-xs uppercase font-sans tracking-[0.2em] mb-8 overflow-x-auto pb-2">
            <button
              type="button"
              onClick={() => setActiveTab('description')}
              className={`pb-3 font-bold transition-colors relative cursor-pointer ${
                activeTab === 'description'
                  ? 'text-[#0F2C59]'
                  : 'text-[#64748B] hover:text-[#111111]'
              }`}
            >
              Description & Notes
              {activeTab === 'description' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0F2C59]" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('perfumer')}
              className={`pb-3 font-bold transition-colors relative cursor-pointer ${
                activeTab === 'perfumer'
                  ? 'text-[#0F2C59]'
                  : 'text-[#64748B] hover:text-[#111111]'
              }`}
            >
              Craftsmanship & Origin
              {activeTab === 'perfumer' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0F2C59]" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 font-bold transition-colors relative cursor-pointer ${
                activeTab === 'reviews'
                  ? 'text-[#0F2C59]'
                  : 'text-[#64748B] hover:text-[#111111]'
              }`}
            >
              Customer Reviews ({customReviews.length})
              {activeTab === 'reviews' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0F2C59]" />
              )}
            </button>
          </div>

          {/* Tab 1: Description & Story */}
          {activeTab === 'description' && (
            <div className="space-y-6 max-w-3xl">
              <h3 className="font-serif text-2xl font-bold text-[#111111]">
                The Inspiration Behind {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] font-sans leading-relaxed">
                {product.fullDescription}
              </p>
              <blockquote className="border-l-2 border-[#0F2C59] pl-5 py-2 my-4 bg-white">
                <p className="font-serif italic text-base text-[#111111]">
                  &ldquo;{product.story}&rdquo;
                </p>
                <cite className="block text-[11px] uppercase font-sans text-[#64748B] mt-2 not-italic font-semibold">
                  — {product.perfumer}
                </cite>
              </blockquote>
            </div>
          )}

          {/* Tab 2: Craftsmanship */}
          {activeTab === 'perfumer' && (
            <div className="space-y-6 max-w-3xl">
              <h3 className="font-serif text-2xl font-bold text-[#111111]">
                Artisanal Formulation & Distillation
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] font-sans leading-relaxed">
                Every bottle of {product.name} is macerated carefully to allow essential oils and natural resins to blend smoothly. We use pure perfume oil concentrations that ensure outstanding sillage and projection.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white border border-[#E2E8F0]">
                  <span className="text-[10px] uppercase font-sans tracking-[0.15em] text-[#0F2C59] font-bold block mb-1">
                    Master Perfumer
                  </span>
                  <p className="font-serif text-lg text-[#111111] font-bold">{product.perfumer}</p>
                </div>
                <div className="p-4 bg-white border border-[#E2E8F0]">
                  <span className="text-[10px] uppercase font-sans tracking-[0.15em] text-[#0F2C59] font-bold block mb-1">
                    Origin
                  </span>
                  <p className="font-serif text-lg text-[#111111] font-bold">{product.origin}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-10">
              {/* Existing Reviews List */}
              <div className="space-y-4">
                {customReviews.length === 0 ? (
                  <p className="text-xs text-[#64748B] font-sans italic">
                    Be the first customer to review this fragrance.
                  </p>
                ) : (
                  customReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-5 bg-white border border-[#E2E8F0] space-y-2 shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex text-[#0F2C59]">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < rev.rating
                                    ? 'fill-[#0F2C59]'
                                    : 'text-[#E2E8F0] fill-[#E2E8F0]'
                                  }`}
                              />
                            ))}
                          </div>
                          <span className="font-serif text-sm font-bold text-[#111111]">
                            {rev.title}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#64748B] font-sans">{rev.date}</span>
                      </div>
                      <p className="text-xs text-[#475569] font-sans leading-relaxed">
                        {rev.comment}
                      </p>
                      <div className="pt-2 flex items-center gap-2 text-[10px] font-sans text-[#64748B]">
                        <span className="font-bold text-[#111111]">{rev.author}</span>
                        <span>•</span>
                        <span>{rev.location}</span>
                        {rev.verified && (
                          <span className="text-[#0F2C59] font-bold">✓ Verified Purchase</span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Submit Review Form */}
              <div className="border-t border-[#E2E8F0] pt-8 max-w-xl">
                <h4 className="font-serif text-xl font-bold text-[#111111] mb-3">
                  Write a Customer Review
                </h4>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase font-sans tracking-[0.15em] text-[#475569] mb-1 font-semibold">
                      Your Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReviewRating(star)}
                          className="p-1 cursor-pointer"
                          aria-label={`Rate ${star} stars`}
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= newReviewRating
                                ? 'text-[#0F2C59] fill-[#0F2C59]'
                                : 'text-[#CBD5E1]'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-sans tracking-[0.15em] text-[#475569] mb-1 font-semibold">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      placeholder="e.g. Zaid Khan"
                      className="w-full bg-white border border-[#CBD5E1] text-xs p-2.5 text-[#111111] focus:outline-none focus:border-[#0F2C59]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-sans tracking-[0.15em] text-[#475569] mb-1 font-semibold">
                      Review Headline
                    </label>
                    <input
                      type="text"
                      value={newReviewTitle}
                      onChange={(e) => setNewReviewTitle(e.target.value)}
                      placeholder="e.g. Outstanding longevity and elegant projection"
                      className="w-full bg-white border border-[#CBD5E1] text-xs p-2.5 text-[#111111] focus:outline-none focus:border-[#0F2C59]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-sans tracking-[0.15em] text-[#475569] mb-1 font-semibold">
                      Your Feedback
                    </label>
                    <textarea
                      rows={3}
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      placeholder="Share your experience with the fragrance..."
                      className="w-full bg-white border border-[#CBD5E1] text-xs p-2.5 text-[#111111] focus:outline-none focus:border-[#0F2C59]"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#0F2C59] hover:bg-[#0A1E3F] text-white px-6 py-2.5 text-xs uppercase font-sans tracking-[0.15em] font-bold transition-colors cursor-pointer shadow-xs"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          )}
        </section>

        {/* Related Perfumes */}
        {relatedProducts.length > 0 && (
          <section className="pt-6">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#E2E8F0]">
              <div>
                <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#0F2C59] font-bold block mb-1">
                  Complimentary Fragrances
                </span>
                <h2 className="font-serif text-3xl font-black text-[#111111]">
                  You May Also Like
                </h2>
              </div>
              <button
                type="button"
                onClick={() => navigateTo(`category-${product.category}`)}
                className="text-xs uppercase font-sans tracking-[0.15em] text-[#111111] hover:text-[#0F2C59] font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>View Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
