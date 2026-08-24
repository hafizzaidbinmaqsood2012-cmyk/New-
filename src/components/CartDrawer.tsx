import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartCount,
    subtotal,
    discountAmount,
    discountCode,
    shippingFee,
    cartTotal,
    removeFromCart,
    updateQuantity,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    navigateTo,
  } = useShop();

  if (!isCartDrawerOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartDrawerOpen(false)}
          className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="w-screen max-w-md bg-white text-[#111111] shadow-2xl flex flex-col border-l border-[#E2E8F0]"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#0F2C59]" />
                <span className="font-serif text-lg text-[#111111] font-bold">Shopping Bag</span>
                <span className="text-xs bg-[#0F2C59] text-white px-2 py-0.5 font-sans font-bold">
                  {cartCount}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsCartDrawerOpen(false)}
                className="p-1.5 text-[#64748B] hover:text-[#111111] transition-colors cursor-pointer"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="bg-[#F0F4F8] text-[#111111] px-5 py-2.5 text-xs font-sans border-b border-[#D8E2ED]">
              {subtotal >= 5000 ? (
                <div className="flex items-center gap-2 text-[#0F2C59] font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Complimentary express delivery unlocked!</span>
                </div>
              ) : (
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-[11px] text-[#64748B]">
                    <span>Add PKR {(5000 - subtotal).toLocaleString()} for free delivery</span>
                    <span className="font-bold text-[#0F2C59]">PKR {subtotal.toLocaleString()} / PKR 5,000</span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#0F2C59] h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (subtotal / 5000) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <div className="w-16 h-16 rounded-full bg-[#F0F4F8] border border-[#D8E2ED] flex items-center justify-center mx-auto mb-4 text-[#0F2C59]">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#111111] mb-2">
                    Your bag is empty
                  </h3>
                  <p className="text-xs text-[#64748B] font-sans mb-6 max-w-xs mx-auto leading-relaxed">
                    Explore our Oud, Musk, Floral, and Woody collections to discover your signature scent.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      navigateTo('shop');
                    }}
                    className="bg-[#0F2C59] text-white hover:bg-[#0A1E3F] px-6 py-3 text-xs font-sans uppercase tracking-[0.15em] font-bold transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Discover Perfumes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3.5 bg-white border border-[#E2E8F0] shadow-xs"
                  >
                    {/* Item Image */}
                    <div
                      onClick={() => {
                        setIsCartDrawerOpen(false);
                        navigateTo('product', { id: item.product.id });
                      }}
                      className="w-20 h-24 bg-[#F8FAFC] shrink-0 overflow-hidden cursor-pointer border border-[#E2E8F0]"
                    >
                      <img
                        src={item.product.primaryImage}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4
                            onClick={() => {
                              setIsCartDrawerOpen(false);
                              navigateTo('product', { id: item.product.id });
                            }}
                            className="font-serif text-sm font-bold text-[#111111] hover:text-[#0F2C59] cursor-pointer line-clamp-1"
                          >
                            {item.product.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#94A3B8] hover:text-[#0F2C59] transition-colors p-1 cursor-pointer"
                            title="Remove item"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-[#64748B] font-sans">
                          {item.selectedSize.size} • {item.product.characteristics.concentration}
                        </p>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#E2E8F0]">
                        <div className="flex items-center border border-[#CBD5E1] bg-[#F8FAFC]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-[#475569] hover:text-[#111111] hover:bg-[#E2E8F0] transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-sans font-bold text-[#111111]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-[#475569] hover:text-[#111111] hover:bg-[#E2E8F0] transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-serif text-sm font-bold text-[#111111]">
                          PKR {(item.selectedSize.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer */}
            {cart.length > 0 && (
              <div className="p-5 bg-[#F8FAFC] border-t border-[#E2E8F0] space-y-3">
                <div className="space-y-1.5 text-xs font-sans">
                  <div className="flex justify-between text-[#64748B]">
                    <span>Subtotal</span>
                    <span className="text-[#111111] font-semibold">PKR {subtotal.toLocaleString()}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#0F2C59] font-bold">
                      <span>Discount ({discountCode})</span>
                      <span>-PKR {discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#64748B]">
                    <span>Estimated Shipping</span>
                    <span className="text-[#111111]">{shippingFee === 0 ? 'Free' : `PKR ${shippingFee.toLocaleString()}`}</span>
                  </div>
                  <div className="flex justify-between text-[#111111] font-serif text-base font-bold pt-2 border-t border-[#E2E8F0]">
                    <span>Estimated Total</span>
                    <span className="text-[#0F2C59]">PKR {cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      navigateTo('checkout');
                    }}
                    className="w-full bg-[#0F2C59] text-white hover:bg-[#0A1E3F] py-3 text-xs uppercase font-sans tracking-[0.15em] font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      navigateTo('cart');
                    }}
                    className="w-full border border-[#0F2C59] text-[#0F2C59] hover:bg-[#0F2C59] hover:text-white py-2.5 text-xs uppercase font-sans tracking-[0.15em] font-bold transition-colors text-center block cursor-pointer"
                  >
                    View Bag & Samples
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[10px] text-[#64748B] font-sans pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0F2C59]" />
                  <span>Secure Checkout • Cash on Delivery / Card • Authentic Guaranteed</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
