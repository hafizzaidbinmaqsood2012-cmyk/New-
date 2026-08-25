import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  CreditCard,
  Lock,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Building,
  Smartphone,
  Banknote,
} from 'lucide-react';

export const PaymentPage: React.FC = () => {
  const {
    cart,
    cartTotal,
    subtotal,
    discountAmount,
    discountCode,
    shippingFee,
    tax,
    customerDetails,
    selectedShipping,
    completeOrder,
    navigateTo,
    showToast,
  } = useShop();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'bank' | 'easypaisa'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardHolder, setCardHolder] = useState(
    customerDetails.firstName && customerDetails.lastName
      ? `${customerDetails.firstName} ${customerDetails.lastName}`
      : 'TARIQ MALIK'
  );
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const last4 = paymentMethod === 'card' ? cardNumber.slice(-4).replace(/\s/g, '') || '4242' : 'COD';
      const order = completeOrder(
        paymentMethod === 'card'
          ? 'Credit / Debit Card (Visa / Mastercard)'
          : paymentMethod === 'cod'
          ? 'Cash on Delivery (COD)'
          : paymentMethod === 'easypaisa'
          ? 'JazzCash / EasyPaisa / Raast'
          : 'Direct Bank Transfer',
        last4
      );
      showToast('Order confirmed! Your order receipt is ready.', 'navy');
      navigateTo('confirmation', { orderId: order.id });
    }, 1000);
  };

  if (cart.length === 0) {
    return (
      <div className="bg-white text-[#111111] min-h-[70vh] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-[#F8FAFC] border border-[#E2E8F0] p-8 text-center shadow-xs">
          <h2 className="font-serif text-2xl font-black text-[#111111] mb-3">No Active Order</h2>
          <p className="text-xs text-[#64748B] font-sans mb-6">
            Your shopping bag is currently empty.
          </p>
          <button
            type="button"
            onClick={() => navigateTo('shop')}
            className="bg-[#0F2C59] text-white hover:bg-[#0A1E3F] px-6 py-3 text-xs uppercase font-sans tracking-[0.15em] font-bold cursor-pointer shadow-xs"
          >
            Discover Perfumes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-[#111111] min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Indicator */}
        <div className="mb-10 text-center max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs uppercase font-sans tracking-[0.2em] text-[#64748B] mb-2">
            <span
              className="cursor-pointer hover:text-[#111111]"
              onClick={() => navigateTo('checkout')}
            >
              1. Shipping & Contact
            </span>
            <span>→</span>
            <span className="text-[#0F2C59] font-bold">2. Payment Method</span>
            <span>→</span>
            <span>3. Confirmation</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#111111]">
            Secure Payment
          </h1>
        </div>

        {/* 2-Column Payment Grid */}
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
          {/* Left: Payment Method & Inputs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                <h2 className="font-serif text-xl font-bold text-[#111111]">
                  Select Payment Method
                </h2>
                <div className="flex items-center gap-2 text-[10px] text-[#64748B] font-sans">
                  <Lock className="w-3.5 h-3.5 text-[#0F2C59]" />
                  <span>256-Bit SSL Encrypted</span>
                </div>
              </div>

              {/* Payment Type Selection Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 border text-center transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-[#0F2C59] bg-[#F0F4F8] text-[#0F2C59] font-bold'
                      : 'border-[#E2E8F0] bg-white text-[#475569] hover:border-[#0F2C59]/50'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mx-auto mb-1 text-[#0F2C59]" />
                  <span className="text-[11px] font-sans block">Debit / Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 border text-center transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-[#0F2C59] bg-[#F0F4F8] text-[#0F2C59] font-bold'
                      : 'border-[#E2E8F0] bg-white text-[#475569] hover:border-[#0F2C59]/50'
                  }`}
                >
                  <Banknote className="w-4 h-4 mx-auto mb-1 text-[#0F2C59]" />
                  <span className="text-[11px] font-sans block">Cash on Delivery</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('easypaisa')}
                  className={`p-3 border text-center transition-all cursor-pointer ${
                    paymentMethod === 'easypaisa'
                      ? 'border-[#0F2C59] bg-[#F0F4F8] text-[#0F2C59] font-bold'
                      : 'border-[#E2E8F0] bg-white text-[#475569] hover:border-[#0F2C59]/50'
                  }`}
                >
                  <Smartphone className="w-4 h-4 mx-auto mb-1 text-[#0F2C59]" />
                  <span className="text-[11px] font-sans block">JazzCash / Raast</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-3 border text-center transition-all cursor-pointer ${
                    paymentMethod === 'bank'
                      ? 'border-[#0F2C59] bg-[#F0F4F8] text-[#0F2C59] font-bold'
                      : 'border-[#E2E8F0] bg-white text-[#475569] hover:border-[#0F2C59]/50'
                  }`}
                >
                  <Building className="w-4 h-4 mx-auto mb-1 text-[#0F2C59]" />
                  <span className="text-[11px] font-sans block">Bank Transfer</span>
                </button>
              </div>

              {/* Credit Card Interactive Structure */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 pt-2">
                  {/* Digital Card Preview */}
                  <div className="p-5 bg-gradient-to-tr from-[#0F2C59] via-[#1E3A8A] to-[#2563EB] text-white rounded-none border border-[#0F2C59]/30 shadow-md relative overflow-hidden">
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-sans tracking-[0.2em] text-xs uppercase text-blue-100 font-bold">
                        AVENDORA CLUB
                      </span>
                      <span className="font-serif italic text-xs text-blue-200">Official Member Card</span>
                    </div>
                    <div className="font-mono text-lg tracking-[0.2em] text-white mb-4">
                      {cardNumber || '•••• •••• •••• ••••'}
                    </div>
                    <div className="flex justify-between items-end text-xs font-sans">
                      <div>
                        <span className="text-[9px] uppercase tracking-[0.15em] text-blue-200 block">
                          Cardholder
                        </span>
                        <span className="font-bold tracking-wider uppercase">
                          {cardHolder || 'CARDHOLDER NAME'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-[0.15em] text-blue-200 block">
                          Expires
                        </span>
                        <span className="font-bold font-mono">{cardExpiry || 'MM/YY'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-sans tracking-[0.12em] text-[#475569] mb-1 font-semibold">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 4242 4242 4242"
                      className="w-full bg-white border border-[#CBD5E1] text-xs p-3 font-mono text-[#111111] focus:outline-none focus:border-[#0F2C59]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-sans tracking-[0.12em] text-[#475569] mb-1 font-semibold">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="e.g. Tariq Malik"
                        className="w-full bg-white border border-[#CBD5E1] text-xs p-3 text-[#111111] focus:outline-none focus:border-[#0F2C59]"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs uppercase font-sans tracking-[0.12em] text-[#475569] mb-1 font-semibold">
                          Expiry
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="12/28"
                          className="w-full bg-white border border-[#CBD5E1] text-xs p-3 font-mono text-[#111111] focus:outline-none focus:border-[#0F2C59]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase font-sans tracking-[0.12em] text-[#475569] mb-1 font-semibold">
                          CVC / CVV
                        </label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="888"
                          className="w-full bg-white border border-[#CBD5E1] text-xs p-3 font-mono text-[#111111] focus:outline-none focus:border-[#0F2C59]"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* COD View */}
              {paymentMethod === 'cod' && (
                <div className="p-6 bg-white border border-[#E2E8F0] text-center space-y-3">
                  <Banknote className="w-8 h-8 text-[#0F2C59] mx-auto" />
                  <h4 className="font-serif text-lg font-bold text-[#111111]">Cash on Delivery</h4>
                  <p className="text-xs text-[#64748B] font-sans max-w-sm mx-auto">
                    Pay with cash when the courier delivers your parcel at your doorstep. Please have the exact amount ready upon delivery.
                  </p>
                </div>
              )}

              {/* EasyPaisa / JazzCash / Raast View */}
              {paymentMethod === 'easypaisa' && (
                <div className="p-6 bg-white border border-[#E2E8F0] space-y-3 text-xs font-sans">
                  <h4 className="font-serif text-lg font-bold text-[#111111]">
                    JazzCash / EasyPaisa / Raast Instant Transfer
                  </h4>
                  <p className="text-[#475569] leading-relaxed">
                    Send payment of <strong>PKR {cartTotal.toLocaleString()}</strong> to our official business account:
                  </p>
                  <div className="p-3 bg-[#F8FAFC] border border-[#CBD5E1] font-mono text-xs text-[#0F2C59]">
                    <p>Account Title: <strong>AVENDORA LUXURY PERFUMES</strong></p>
                    <p>Raast ID / Number: <strong>0300-1234567</strong></p>
                  </div>
                  <p className="text-[11px] text-[#64748B]">
                    Please share your transaction ID with our WhatsApp support after placing the order for instant dispatch verification.
                  </p>
                </div>
              )}

              {/* Bank Transfer View */}
              {paymentMethod === 'bank' && (
                <div className="p-6 bg-white border border-[#E2E8F0] space-y-2 text-xs font-sans">
                  <h4 className="font-serif text-lg font-bold text-[#111111] mb-1">
                    Direct Bank Transfer (Meezan / HBL / Standard Chartered)
                  </h4>
                  <p className="text-[#475569]">
                    Bank: <strong>Meezan Bank Ltd (Main Branch)</strong>
                  </p>
                  <p className="text-[#475569]">
                    Account Title: <strong>AVENDORA LUXURY PERFUMES</strong>
                  </p>
                  <p className="text-[#475569]">
                    IBAN: <strong>PK36 MEZN 0001 2345 6789 0123</strong>
                  </p>
                  <p className="text-[#64748B] pt-1 text-[11px]">
                    Your perfume order will be prepared immediately upon transfer confirmation.
                  </p>
                </div>
              )}

              {/* Billing Address Checkbox */}
              <div className="border-t border-[#E2E8F0] pt-4">
                <label className="flex items-center gap-2.5 text-xs text-[#475569] font-sans cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="text-[#0F2C59] focus:ring-[#0F2C59]"
                  />
                  <span>Billing address is identical to shipping destination ({customerDetails.address || 'Delivering to customer address'})</span>
                </label>
              </div>
            </div>

            {/* Back & Submit Actions */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigateTo('checkout')}
                className="text-xs uppercase font-sans tracking-[0.15em] text-[#64748B] hover:text-[#111111] flex items-center gap-2 cursor-pointer font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Shipping Details</span>
              </button>

              <button
                type="submit"
                disabled={isProcessing}
                className="bg-[#0F2C59] hover:bg-[#0A1E3F] text-white py-4 px-8 text-xs uppercase font-sans tracking-[0.2em] font-bold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-md shadow-[#0F2C59]/15"
              >
                {isProcessing ? (
                  <span>Confirming Order...</span>
                ) : (
                  <>
                    <span>Confirm & Place Order • PKR {cartTotal.toLocaleString()}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right: Order Summary Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 space-y-5 sticky top-24 shadow-xs">
              <h3 className="font-serif text-xl font-bold text-[#111111] border-b border-[#E2E8F0] pb-3">
                Final Order Summary
              </h3>

              {/* Customer & Shipping Brief */}
              <div className="bg-white p-3.5 border border-[#E2E8F0] text-xs font-sans space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Delivering To:</span>
                  <span className="font-bold text-[#111111]">
                    {customerDetails.firstName} {customerDetails.lastName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Destination:</span>
                  <span className="text-[#475569] truncate max-w-[200px]">
                    {customerDetails.city || 'Karachi'}, {customerDetails.country}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Courier:</span>
                  <span className="text-[#475569]">{selectedShipping.name}</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 text-xs font-sans border-t border-[#E2E8F0] pt-3">
                <div className="flex justify-between text-[#64748B]">
                  <span>Items Subtotal</span>
                  <span className="text-[#111111] font-bold">PKR {subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#0F2C59] font-bold">
                    <span>Discount ({discountCode})</span>
                    <span>-PKR {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#64748B]">
                  <span>Shipping Fee</span>
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

              <div className="pt-2 text-[11px] text-[#64748B] font-sans text-center space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-[#0F2C59] font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>30-Day Sealed Bottle Return Guarantee</span>
                </div>
                <p>Includes 2x complimentary 2ml discovery sample vials.</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
