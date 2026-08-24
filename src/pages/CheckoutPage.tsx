import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { SHIPPING_OPTIONS } from '../data/perfumes';
import {
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Truck,
  Lock,
  Sparkles,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    subtotal,
    discountAmount,
    discountCode,
    shippingFee,
    tax,
    cartTotal,
    customerDetails,
    updateCustomerDetails,
    selectedShipping,
    setShippingOption,
    selectedSamples,
    navigateTo,
    showToast,
  } = useShop();

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!customerDetails.firstName.trim()) errors.firstName = 'First name is required';
    if (!customerDetails.lastName.trim()) errors.lastName = 'Last name is required';
    if (!customerDetails.email.trim() || !customerDetails.email.includes('@')) {
      errors.email = 'Valid email is required';
    }
    if (!customerDetails.phone.trim()) errors.phone = 'Phone number is required';
    if (!customerDetails.address.trim()) errors.address = 'Street address is required';
    if (!customerDetails.city.trim()) errors.city = 'City is required';
    if (!customerDetails.postalCode.trim()) errors.postalCode = 'Postal code is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Please complete all required shipping fields.', 'info');
      return;
    }
    navigateTo('payment');
  };

  if (cart.length === 0) {
    return (
      <div className="bg-white min-h-[70vh] flex items-center justify-center py-20 px-4 text-[#111111]">
        <div className="max-w-md w-full bg-[#F8FAFC] border border-[#E2E8F0] p-8 text-center shadow-xs">
          <h2 className="font-serif text-2xl font-black text-[#111111] mb-3">No Items in Checkout</h2>
          <p className="text-xs text-[#64748B] font-sans mb-6">
            Please add fragrances to your shopping bag before proceeding to checkout.
          </p>
          <button
            type="button"
            onClick={() => navigateTo('shop')}
            className="bg-[#0F2C59] text-white hover:bg-[#0A1E3F] px-6 py-3 text-xs uppercase font-sans tracking-[0.15em] font-bold cursor-pointer shadow-xs"
          >
            Explore Fragrances
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-[#111111] min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Checkout Header */}
        <div className="mb-10 text-center max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs uppercase font-sans tracking-[0.2em] text-[#64748B] mb-2">
            <span className="text-[#0F2C59] font-bold">1. Shipping & Contact</span>
            <span>→</span>
            <span>2. Payment</span>
            <span>→</span>
            <span>3. Confirmation</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#111111]">
            Secure Order Checkout
          </h1>
        </div>

        {/* 2-Column Form & Summary */}
        <form onSubmit={handleProceedToPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact & Address Details */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Customer Contact */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 sm:p-8 space-y-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                <h2 className="font-serif text-xl font-bold text-[#111111]">
                  1. Contact Information
                </h2>
                <span className="text-[11px] text-[#64748B] font-sans">
                  For order tracking and delivery updates
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-sans tracking-[0.12em] text-[#475569] mb-1 font-semibold">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={customerDetails.firstName}
                    onChange={(e) => updateCustomerDetails({ firstName: e.target.value })}
                    placeholder="e.g. Tariq"
                    className={`w-full bg-white border text-xs p-3 text-[#111111] focus:outline-none focus:border-[#0F2C59] ${
                      formErrors.firstName ? 'border-red-500' : 'border-[#CBD5E1]'
                    }`}
                  />
                  {formErrors.firstName && (
                    <span className="text-[10px] text-red-600 font-sans">{formErrors.firstName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase font-sans tracking-[0.12em] text-[#475569] mb-1 font-semibold">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={customerDetails.lastName}
                    onChange={(e) => updateCustomerDetails({ lastName: e.target.value })}
                    placeholder="e.g. Malik"
                    className={`w-full bg-white border text-xs p-3 text-[#111111] focus:outline-none focus:border-[#0F2C59] ${
                      formErrors.lastName ? 'border-red-500' : 'border-[#CBD5E1]'
                    }`}
                  />
                  {formErrors.lastName && (
                    <span className="text-[10px] text-red-600 font-sans">{formErrors.lastName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase font-sans tracking-[0.12em] text-[#475569] mb-1 font-semibold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={customerDetails.email}
                    onChange={(e) => updateCustomerDetails({ email: e.target.value })}
                    placeholder="e.g. tariq.malik@example.com"
                    className={`w-full bg-white border text-xs p-3 text-[#111111] focus:outline-none focus:border-[#0F2C59] ${
                      formErrors.email ? 'border-red-500' : 'border-[#CBD5E1]'
                    }`}
                  />
                  {formErrors.email && (
                    <span className="text-[10px] text-red-600 font-sans">{formErrors.email}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase font-sans tracking-[0.12em] text-[#475569] mb-1 font-semibold">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    value={customerDetails.phone}
                    onChange={(e) => updateCustomerDetails({ phone: e.target.value })}
                    placeholder="e.g. +92 300 1234567"
                    className={`w-full bg-white border text-xs p-3 text-[#111111] focus:outline-none focus:border-[#0F2C59] ${
                      formErrors.phone ? 'border-red-500' : 'border-[#CBD5E1]'
                    }`}
                  />
                  {formErrors.phone && (
                    <span className="text-[10px] text-red-600 font-sans">{formErrors.phone}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 sm:p-8 space-y-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                <h2 className="font-serif text-xl font-bold text-[#111111]">
                  2. Shipping Destination
                </h2>
                <span className="text-[11px] text-[#64748B] font-sans">
                  Doorstep Delivery Across Pakistan & International
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase font-sans tracking-[0.12em] text-[#475569] mb-1 font-semibold">
                    Country / Region *
                  </label>
                  <select
                    value={customerDetails.country}
                    onChange={(e) => updateCustomerDetails({ country: e.target.value })}
                    className="w-full bg-white border border-[#CBD5E1] text-xs p-3 text-[#111111] focus:outline-none focus:border-[#0F2C59]"
                  >
                    <option value="Pakistan">Pakistan</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-sans tracking-[0.12em] text-[#475569] mb-1 font-semibold">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={customerDetails.address}
                    onChange={(e) => updateCustomerDetails({ address: e.target.value })}
                    placeholder="House / Street / Area"
                    className={`w-full bg-white border text-xs p-3 text-[#111111] focus:outline-none focus:border-[#0F2C59] ${
                      formErrors.address ? 'border-red-500' : 'border-[#CBD5E1]'
                    }`}
                  />
                  {formErrors.address && (
                    <span className="text-[10px] text-red-600 font-sans">{formErrors.address}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-sans tracking-[0.12em] text-[#475569] mb-1 font-semibold">
                      Apartment / Sector
                    </label>
                    <input
                      type="text"
                      value={customerDetails.apartment || ''}
                      onChange={(e) => updateCustomerDetails({ apartment: e.target.value })}
                      placeholder="e.g. Block 4, Clifton"
                      className="w-full bg-white border border-[#CBD5E1] text-xs p-3 text-[#111111] focus:outline-none focus:border-[#0F2C59]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-sans tracking-[0.12em] text-[#475569] mb-1 font-semibold">
                      City *
                    </label>
                    <input
                      type="text"
                      value={customerDetails.city}
                      onChange={(e) => updateCustomerDetails({ city: e.target.value })}
                      placeholder="e.g. Karachi / Lahore / Islamabad"
                      className={`w-full bg-white border text-xs p-3 text-[#111111] focus:outline-none focus:border-[#0F2C59] ${
                        formErrors.city ? 'border-red-500' : 'border-[#CBD5E1]'
                      }`}
                    />
                    {formErrors.city && (
                      <span className="text-[10px] text-red-600 font-sans">{formErrors.city}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-sans tracking-[0.12em] text-[#475569] mb-1 font-semibold">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      value={customerDetails.postalCode}
                      onChange={(e) => updateCustomerDetails({ postalCode: e.target.value })}
                      placeholder="e.g. 75500"
                      className={`w-full bg-white border text-xs p-3 text-[#111111] focus:outline-none focus:border-[#0F2C59] ${
                        formErrors.postalCode ? 'border-red-500' : 'border-[#CBD5E1]'
                      }`}
                    />
                    {formErrors.postalCode && (
                      <span className="text-[10px] text-red-600 font-sans">{formErrors.postalCode}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Shipping Method Selection */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                <h2 className="font-serif text-xl font-bold text-[#111111]">
                  3. Shipping Method
                </h2>
                <Truck className="w-5 h-5 text-[#0F2C59]" />
              </div>

              <div className="space-y-3">
                {SHIPPING_OPTIONS.map((opt) => {
                  const isSelected = selectedShipping.id === opt.id;
                  const priceLabel =
                    opt.id === 'standard' && subtotal >= 5000
                      ? 'Free'
                      : `PKR ${opt.price.toLocaleString()}`;

                  return (
                    <label
                      key={opt.id}
                      onClick={() => setShippingOption(opt)}
                      className={`p-4 border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#F0F4F8] border-[#0F2C59]'
                          : 'bg-white border-[#E2E8F0] hover:border-[#0F2C59]/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="shippingOption"
                          checked={isSelected}
                          onChange={() => setShippingOption(opt)}
                          className="mt-1 text-[#0F2C59] focus:ring-[#0F2C59]"
                        />
                        <div>
                          <span className="font-serif text-sm font-bold text-[#111111] block">
                            {opt.name}
                          </span>
                          <span className="text-xs text-[#64748B] font-sans block">
                            {opt.description} • Est. {opt.estimatedDelivery}
                          </span>
                        </div>
                      </div>
                      <span className="font-serif text-sm font-bold text-[#0F2C59] whitespace-nowrap pl-2">
                        {priceLabel}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Navigation back and continue */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => navigateTo('cart')}
                className="text-xs uppercase font-sans tracking-[0.15em] text-[#64748B] hover:text-[#111111] flex items-center gap-2 cursor-pointer font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Shopping Bag</span>
              </button>

              <button
                type="submit"
                className="bg-[#0F2C59] hover:bg-[#0A1E3F] text-white py-3.5 px-8 text-xs uppercase font-sans tracking-[0.2em] font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-[#0F2C59]/15"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Order Review Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 space-y-6 sticky top-24 shadow-xs">
              <h3 className="font-serif text-xl font-bold text-[#111111] border-b border-[#E2E8F0] pb-3">
                Order Review ({cart.length} items)
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center py-2 border-b border-[#E2E8F0]">
                    <img
                      src={item.product.primaryImage}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-14 object-cover bg-white border border-[#E2E8F0] shrink-0"
                    />
                    <div className="flex-1 overflow-hidden">
                      <h4 className="font-serif text-xs font-bold text-[#111111] truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[10px] text-[#64748B] font-sans">
                        Qty: {item.quantity} • {item.selectedSize.size}
                      </p>
                    </div>
                    <span className="font-serif text-xs font-bold text-[#111111] shrink-0">
                      PKR {(item.selectedSize.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Included Samples preview */}
              {selectedSamples.length > 0 && (
                <div className="bg-white p-3 border border-[#E2E8F0] text-xs font-sans space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#0F2C59] font-bold block">
                    Free Discovery Samples:
                  </span>
                  {selectedSamples.map((s, i) => (
                    <div key={i} className="text-[#475569] text-[11px] flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#0F2C59] shrink-0" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Calculations breakdown */}
              <div className="space-y-2.5 text-xs font-sans border-t border-[#E2E8F0] pt-4">
                <div className="flex justify-between text-[#64748B]">
                  <span>Subtotal</span>
                  <span className="text-[#111111] font-bold">PKR {subtotal.toLocaleString()}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#0F2C59] font-bold">
                    <span>Discount ({discountCode})</span>
                    <span>-PKR {discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#64748B]">
                  <span>Shipping ({selectedShipping.name.split(' ')[0]})</span>
                  <span className="text-[#111111] font-bold">
                    {shippingFee === 0 ? 'Free' : `PKR ${shippingFee.toLocaleString()}`}
                  </span>
                </div>

                <div className="flex justify-between text-[#64748B]">
                  <span>Taxes</span>
                  <span className="text-[#111111] font-bold">PKR {tax.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-base font-serif font-black text-[#111111] border-t border-[#E2E8F0] pt-3">
                  <span>Grand Total</span>
                  <span className="text-[#0F2C59]">PKR {cartTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Security Seal */}
              <div className="pt-2 flex items-center justify-center gap-2 text-[10px] text-[#64748B] font-sans text-center">
                <Lock className="w-3.5 h-3.5 text-[#0F2C59]" />
                <span>SSL Encrypted Checkout • AVENDORA 100% Authentic Guarantee</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
