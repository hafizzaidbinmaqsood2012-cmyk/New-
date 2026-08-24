import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Star, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateTo, addToCart, isInWishlist, toggleWishlist } = useShop();
  const isWished = isInWishlist(product.id);

  const defaultSize = product.sizes[1] || product.sizes[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col bg-white border border-[#E2E8F0] hover:border-[#0F2C59] transition-all duration-300 shadow-[0_2px_10px_rgba(15,44,89,0.03)] hover:shadow-[0_8px_24px_rgba(15,44,89,0.08)]"
      id={`product-card-${product.id}`}
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.isBestSeller && (
          <span className="bg-white/95 backdrop-blur-sm border border-[#0F2C59] text-[#0F2C59] text-[10px] uppercase font-sans tracking-[0.2em] px-2.5 py-0.5 font-bold shadow-xs">
            Best Seller
          </span>
        )}
        {product.isNew && (
          <span className="bg-[#0F2C59] text-white text-[10px] uppercase font-sans tracking-[0.2em] px-2.5 py-0.5 font-bold shadow-xs">
            New Arrival
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        className={`absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 border ${
          isWished
            ? 'bg-white text-[#0F2C59] border-[#0F2C59]'
            : 'bg-white/90 backdrop-blur-sm text-[#64748B] hover:text-[#0F2C59] border-[#E2E8F0] hover:border-[#0F2C59]'
        } shadow-sm cursor-pointer`}
        title={isWished ? 'Remove from wishlist' : 'Save to wishlist'}
        aria-label="Toggle wishlist"
      >
        <Heart className={`w-4 h-4 ${isWished ? 'fill-[#0F2C59]' : ''}`} />
      </button>

      {/* Product Image Stage */}
      <div
        onClick={() => navigateTo('product', { id: product.id })}
        className="relative w-full aspect-[4/5] bg-[#F8FAFC] overflow-hidden cursor-pointer flex items-center justify-center p-6 border-b border-[#E2E8F0]"
      >
        <img
          src={product.primaryImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Quick Scent Note Overlay on Hover */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0F2C59]/90 via-[#0F2C59]/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
          <p className="text-[10px] uppercase font-sans tracking-[0.15em] text-[#E2E8F0] mb-0.5 font-bold">
            Top Notes
          </p>
          <p className="text-xs text-white line-clamp-1 font-serif italic">
            {product.notes.top.join(' • ')}
          </p>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex-1 flex flex-col p-5 bg-white">
        {/* Category & Concentration */}
        <div className="flex items-center justify-between text-[11px] font-sans tracking-[0.15em] uppercase text-[#0F2C59] mb-1.5 font-bold">
          <span>{product.categoryLabel.replace('The ', '')}</span>
          <span className="text-[#64748B] font-normal">{product.characteristics.gender}</span>
        </div>

        {/* Name */}
        <h3
          onClick={() => navigateTo('product', { id: product.id })}
          className="font-serif text-lg font-bold text-[#111111] group-hover:text-[#0F2C59] transition-colors cursor-pointer line-clamp-1 mb-1"
        >
          {product.name}
        </h3>

        {/* Subtitle / Concentration */}
        <p className="text-xs text-[#64748B] font-sans line-clamp-1 mb-3">
          {product.subtitle}
        </p>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 mb-4">
          <div className="flex text-[#0F2C59]">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? 'fill-[#0F2C59]'
                    : 'text-[#E2E8F0] fill-[#E2E8F0]'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-sans text-[#64748B]">
            {product.rating.toFixed(2)} ({product.reviewCount})
          </span>
        </div>

        {/* Price & Action Row */}
        <div className="mt-auto pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#64748B] uppercase tracking-wider block font-sans">From</span>
            <span className="font-serif text-base text-[#111111] font-bold">
              PKR {defaultSize.price.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigateTo('product', { id: product.id })}
              className="text-xs font-sans tracking-[0.1em] uppercase text-[#475569] hover:text-[#0F2C59] px-2 py-1.5 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              Details
              <ArrowRight className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() => addToCart(product, defaultSize, 1, true)}
              className="bg-[#0F2C59] hover:bg-[#0A1E3F] text-white px-3.5 py-2 text-xs font-sans tracking-[0.1em] uppercase transition-all duration-200 flex items-center gap-1.5 font-bold cursor-pointer shadow-xs"
              title="Add to Shopping Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
