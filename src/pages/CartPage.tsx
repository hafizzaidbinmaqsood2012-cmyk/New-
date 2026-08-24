import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PERFUMES_DATA } from '../data/perfumes';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Check,
  Tag,
  Gift,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    subtotal,
    discountAmount,
    discountCode,
    shippingFee,
    cartTotal,
    removeFromCart,
    updateQuantity,
    applyDiscount,
    selectedSampleIds,
    toggleSampleSelection,
    navigateTo,
  } = useShop();

  const [inputCode, setInputCode] = useState('');
  const [discountError, setDiscountError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const success = applyDiscount(inputCode.trim());
    if (!success) {
      setDiscountError('Invalid promotional code. Try AVENDORA10 or NOIR15');
    } else {
      setDiscountError('');
      setInputCode('');
    }
  };

  const sampleOptions = PERFUMES_DATA.slice(0, 8);

  if (cart.length === 0) {
    return (
      <div className="bg-white text-[#111111] min-h-[70vh] flex items-center justify-center py-20 px-4">
        <div className="text-center max-w-md bg-[#F8FAFC] border border-[#E2E8F0] p-10 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#F0F4F8] border border-[#D8E2ED] flex items-center justify-center mx-auto mb-4 text-[#0F2C59]">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#111111] mb-2">
            Your Bag is Empty
          </h1>
          <p className="text-xs text-[#64748B] font-sans mb-8 leading-relaxed">
            Your shopping bag contains no items. Explore our curated collections of Extraits de Parfum and signature blends to begin.
          </p>
          <button
            type="button"
            onClick={() => navigateTo('shop')}
            className="bg-[#0F2C59] hover:bg-[#0A1E3F] text-white px-8 py-3.5 text-xs uppercase font-sans tracking-[0.2em] font-bold transition-all duration-200 inline-flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <span>Explore Fragrance Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-[#111111] min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center max-w-xl mx-auto">
          <span className="text-[11px] uppercase font-sans tracking-[0.25em] text-[#0F2C59] font-bold block mb-1">
            Order Review
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#111111]">
            Shopping Bag ({cart.length} {cart.length === 1 ? 'Item' : 'Items'})
          </h1>
        </div>

        {/* Free Shipping Alert */}
        <div className="mb-8 bg-[#F0F4F8] border border-[#D8E2ED] p-4 text-xs font-sans text-[#111111] flex flex-col sm:flex-row items-center justify-between gap-3">
          {subtotal >= 5000 ? (
            <div className="flex items-center gap-2 text-[#0F2C59] font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Complimentary express delivery is unlocked for your order!</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-[#475569]">
              <Sparkles className="w-4 h-4 text-[#0F2C59]" />
              <span>
                Add <strong className="text-[#0F2C59]">PKR {(5000 - subtotal).toLocaleString()}</strong> more to receive free express shipping nationwide.
              </span>
            </div>
          )}
          <span className="text-[11px] uppercase tracking-wider text-[#64748B] font-bold">
            Subtotal: PKR {subtotal.toLocaleString()}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Cart Items & Sample Selection */}
          <div className="lg:col-span-8 space-y-10">
            {/* Items Table */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] overflow-hidden shadow-xs">
              <div className="p-4 border-b border-[#E2E8F0] bg-white hidden sm:grid grid-cols-12 text-[11px] uppercase font-sans tracking-[0.15em] text-[#64748B] font-bold">
                <span className="col-span-6">Fragrance Formulation</span>
                <span className="col-span-2 text-center">Unit Price</span>
                <span className="col-span-2 text-center">Quantity</span>
                <span className="col-span-2 text-right">Total</span>
              </div>

              <div className="divide-y divide-[#E2E8F0]">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center bg-white"
                  >
                    {/* Product Media & Info */}
                    <div className="sm:col-span-6 flex items-center gap-4 w-full">
                      <div
                        onClick={() => navigateTo('product', { id: item.product.id })}
                        className="w-20 h-24 bg-[#F8FAFC] border border-[#E2E8F0] shrink-0 overflow-hidden cursor-pointer"
                      >
                        <img
                          src={item.product.primaryImage}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-[10px] uppercase font-sans tracking-[0.15em] text-[#0F2C59] font-bold block">
                          {item.product.categoryLabel}
                        </span>
                        <h3
                          onClick={() => navigateTo('product', { id: item.product.id })}
                          className="font-serif text-base font-bold text-[#111111] hover:text-[#0F2C59] transition-colors cursor-pointer truncate"
                        >
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-[#64748B] font-sans">
                          Size: {item.selectedSize.size} ({item.selectedSize.volume})
                        </p>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-[11px] text-[#94A3B8] hover:text-[#0F2C59] font-sans mt-2 flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                    {/* Unit Price */}
                    <div className="sm:col-span-2 text-center text-xs font-serif text-[#64748B] w-full sm:w-auto flex justify-between sm:block">
                      <span className="sm:hidden text-xs font-sans text-[#64748B]">Unit Price:</span>
                      <span>PKR {item.selectedSize.price.toLocaleString()}</span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="sm:col-span-2 flex items-center justify-center w-full sm:w-auto">
                      <div className="flex items-center border border-[#CBD5E1] bg-[#F8FAFC]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-[#475569] hover:text-[#111111] hover:bg-[#E2E8F0] cursor-pointer transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-sans font-bold text-[#111111]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-[#475569] hover:text-[#111111] hover:bg-[#E2E8F0] cursor-pointer transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Row Total */}
                    <div className="sm:col-span-2 text-right font-serif text-sm font-bold text-[#111111] w-full sm:w-auto flex justify-between sm:block border-t sm:border-t-0 pt-2 sm:pt-0">
                      <span className="sm:hidden text-xs font-sans text-[#64748B]">Subtotal:</span>
                      <span>PKR {(item.selectedSize.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Complimentary Discovery Samples Picker (2 Vials) */}
            <div className="bg-[#F8FAFC] border border-[#CBD5E1] p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-2">
                <Gift className="w-5 h-5 text-[#0F2C59]" />
                <h3 className="font-serif text-xl font-bold text-[#111111]">
                  Select 2 Complimentary Discovery Samples (2ml Vials)
                </h3>
              </div>
              <p className="text-xs text-[#64748B] font-sans mb-6">
                Receive two bespoke 2ml discovery vials with your order. Selected: <strong className="text-[#0F2C59] font-bold">{selectedSampleIds.length}/2</strong>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {sampleOptions.map((sample) => {
                  const isSelected = selectedSampleIds.includes(sample.id);
                  const isMaxReached = selectedSampleIds.length >= 2 && !isSelected;

                  return (
                    <div
                      key={sample.id}
                      onClick={() => !isMaxReached && toggleSampleSelection(sample.id)}
                      className={`p-3 border transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#0F2C59] bg-[#0F2C59] text-white shadow-xs cursor-pointer'
                          : isMaxReached
                          ? 'border-[#E2E8F0] bg-white opacity-40 cursor-not-allowed'
                          : 'border-[#E2E8F0] bg-white text-[#111111] hover:border-[#0F2C59] cursor-pointer'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1 mb-2">
                        <span className={`text-[10px] uppercase font-sans font-bold tracking-wider ${isSelected ? 'text-white' : 'text-[#0F2C59]'}`}>
                          2ml Sample
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0" />}
                      </div>
                      <div>
                        <h4 className="font-serif text-xs font-bold truncate">
                          {sample.name}
                        </h4>
                        <p className={`text-[10px] font-sans truncate ${isSelected ? 'text-white/80' : 'text-[#64748B]'}`}>
                          {sample.categoryLabel}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Summary & Coupon */}
          <div className="lg:col-span-4 space-y-6">
            {/* Promo Code Box */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 shadow-xs">
              <h3 className="font-serif text-base font-bold text-[#111111] flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-[#0F2C59]" />
                <span>Promotional Voucher</span>
              </h3>

              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="e.g. AVENDORA10"
                  className="flex-1 bg-white border border-[#CBD5E1] text-xs px-3 py-2 text-[#111111] uppercase tracking-wider focus:outline-none focus:border-[#0F2C59]"
                />
                <button
                  type="submit"
                  className="bg-[#0F2C59] text-white hover:bg-[#0A1E3F] px-4 py-2 text-xs font-sans uppercase font-bold tracking-wider transition-colors cursor-pointer shadow-xs"
                >
                  Apply
                </button>
              </form>

              {discountError && (
                <p className="text-[11px] text-red-600 font-sans mt-2">{discountError}</p>
              )}
              {discountCode && (
                <p className="text-[11px] text-emerald-700 font-sans mt-2 font-bold flex items-center gap-1">
                  <Check className="w-3 h-3" /> Voucher &ldquo;{discountCode}&rdquo; Applied Successfully!
                </p>
              )}
            </div>

            {/* Order Cost Breakdown */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#111111] border-b border-[#E2E8F0] pb-3">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs font-sans">
                <div className="flex justify-between text-[#64748B]">
                  <span>Items Subtotal</span>
                  <span className="text-[#111111] font-semibold">PKR {subtotal.toLocaleString()}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#0F2C59] font-bold">
                    <span>Voucher Discount ({discountCode})</span>
                    <span>-PKR {discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#64748B]">
                  <span>Nationwide Express Delivery</span>
                  <span className="text-[#111111]">
                    {shippingFee === 0 ? 'Complimentary (Free)' : `PKR ${shippingFee.toLocaleString()}`}
                  </span>
                </div>

                <div className="flex justify-between text-[#64748B]">
                  <span>Discovery Samples (2 Vials)</span>
                  <span className="text-[#0F2C59] font-bold">FREE</span>
                </div>

                <div className="border-t border-[#E2E8F0] pt-3 flex justify-between items-baseline">
                  <span className="font-serif text-base font-bold text-[#111111]">Total Amount</span>
                  <span className="font-serif text-2xl font-bold text-[#0F2C59]">
                    PKR {cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigateTo('checkout')}
                  className="w-full bg-[#0F2C59] hover:bg-[#0A1E3F] text-white py-4 text-xs uppercase font-sans tracking-[0.2em] font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-[#0F2C59]/15 cursor-pointer"
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-[#E2E8F0] space-y-2 text-[11px] text-[#64748B] font-sans">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0F2C59] shrink-0" />
                  <span>Cash on Delivery & Secure Online Card Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0F2C59] shrink-0" />
                  <span>100% Authentic Handcrafted Extrait Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
