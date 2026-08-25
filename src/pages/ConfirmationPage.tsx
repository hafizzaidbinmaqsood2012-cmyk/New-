import React from 'react';
import { useShop } from '../context/ShopContext';
import {
  CheckCircle2,
  Sparkles,
  Printer,
  ShoppingBag,
  ArrowRight,
  Package,
  Calendar,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';

interface ConfirmationPageProps {
  orderId?: string;
}

export const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ orderId }) => {
  const { currentOrder, navigateTo } = useShop();

  const order = currentOrder || {
    id: orderId || 'AVD-98241',
    createdAt: new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
    items: [],
    subtotal: 17000,
    discountAmount: 0,
    shippingFee: 0,
    tax: 0,
    total: 17000,
    customer: {
      firstName: 'Tariq',
      lastName: 'Malik',
      email: 'tariq.malik@example.com',
      phone: '+92 300 1234567',
      address: 'House 42, Main Boulevard, DHA Phase 5',
      city: 'Karachi',
      country: 'Pakistan',
      postalCode: '75500',
    },
    shippingMethod: 'Express Courier Delivery (2-3 Business Days)',
    paymentMethod: 'Credit / Debit Card',
    cardLast4: '4242',
    samples: ['Royal Oud (2ml Sample)', 'Rose Royale (2ml Sample)'],
  };

  return (
    <div className="bg-white text-[#111111] min-h-screen py-10 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header Box */}
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-8 sm:p-12 text-center mb-10 shadow-xs">
          <div className="w-16 h-16 bg-[#F0F4F8] border border-[#D8E2ED] text-[#0F2C59] flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-xs uppercase font-sans tracking-[0.25em] text-[#0F2C59] font-bold block mb-1">
            Order Successfully Placed
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#111111] mb-2">
            Thank You for Your Order
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] font-sans max-w-md mx-auto">
            A confirmation receipt and courier tracking details have been sent to{' '}
            <strong className="text-[#111111]">{order.customer.email}</strong>.
          </p>

          <div className="mt-6 inline-flex items-center gap-4 bg-white border border-[#CBD5E1] px-5 py-2.5 text-xs font-sans shadow-xs">
            <span className="text-[#64748B]">Order Reference:</span>
            <span className="font-mono font-bold text-[#0F2C59] text-sm">{order.id}</span>
          </div>
        </div>

        {/* Printable Order Receipt */}
        <div className="bg-white border border-[#E2E8F0] p-6 sm:p-10 mb-10 space-y-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E2E8F0] gap-4">
            <div>
              <span className="font-serif text-2xl font-black text-[#0F2C59] tracking-widest block">
                AVENDORA
              </span>
              <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#64748B]">
                Haute Parfumerie & Extrait
              </span>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1.5 text-xs font-sans text-[#64748B] sm:justify-end">
                <Calendar className="w-3.5 h-3.5" />
                <span>Date: {order.createdAt}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-sans text-[#64748B] sm:justify-end mt-1">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Payment: {order.paymentMethod}</span>
              </div>
            </div>
          </div>

          {/* Details 2-Column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs font-sans">
            <div>
              <span className="text-[10px] uppercase font-sans tracking-[0.15em] text-[#0F2C59] font-bold block mb-2">
                Shipping Destination:
              </span>
              <p className="font-bold text-[#111111] text-sm">
                {order.customer.firstName} {order.customer.lastName}
              </p>
              <p className="text-[#475569]">{order.customer.address}</p>
              <p className="text-[#475569]">
                {order.customer.city}, {order.customer.postalCode}, {order.customer.country}
              </p>
              <p className="text-[#475569] mt-1">{order.customer.phone}</p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-sans tracking-[0.15em] text-[#0F2C59] font-bold block mb-2">
                Dispatch & Delivery Method:
              </span>
              <p className="font-bold text-[#111111] text-sm">{order.shippingMethod}</p>
              <p className="text-[#475569] mt-1">
                Dispatched in signature gift presentation box with velvet interior and security seals.
              </p>
            </div>
          </div>

          {/* Purchased Items */}
          <div className="border-t border-[#E2E8F0] pt-6">
            <span className="text-[10px] uppercase font-sans tracking-[0.15em] text-[#0F2C59] font-bold block mb-4">
              Purchased Fragrance Formulations:
            </span>

            <div className="divide-y divide-[#E2E8F0]">
              {order.items.length > 0 ? (
                order.items.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between text-xs font-sans">
                    <div className="flex items-center gap-3">
                      <Package className="w-4 h-4 text-[#0F2C59]" />
                      <div>
                        <span className="font-serif text-sm font-bold text-[#111111] block">
                          {item.product.name}
                        </span>
                        <span className="text-[#64748B]">
                          Qty: {item.quantity} • {item.selectedSize.size} ({item.selectedSize.volume})
                        </span>
                      </div>
                    </div>
                    <span className="font-serif font-bold text-[#111111]">
                      PKR {(item.selectedSize.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))
              ) : (
                <div className="py-3 flex items-center justify-between text-xs font-sans">
                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4 text-[#0F2C59]" />
                    <div>
                      <span className="font-serif text-sm font-bold text-[#111111] block">
                        Royal Oud — Extrait de Parfum
                      </span>
                      <span className="text-[#64748B]">Qty: 1 • 50ml (1.7 fl. oz.)</span>
                    </div>
                  </div>
                  <span className="font-serif font-bold text-[#111111]">PKR 17,000</span>
                </div>
              )}
            </div>
          </div>

          {/* Complimentary Discovery Samples */}
          {order.samples && order.samples.length > 0 && (
            <div className="bg-[#F8FAFC] p-4 border border-[#E2E8F0] text-xs font-sans space-y-1">
              <span className="text-[10px] uppercase font-sans tracking-[0.15em] text-[#0F2C59] font-bold block mb-1">
                Complimentary 2ml Discovery Vials:
              </span>
              {order.samples.map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-[#475569]">
                  <Sparkles className="w-3.5 h-3.5 text-[#0F2C59]" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          )}

          {/* Final Receipt Figures */}
          <div className="border-t border-[#E2E8F0] pt-6 flex justify-end">
            <div className="w-full sm:w-64 space-y-2 text-xs font-sans">
              <div className="flex justify-between text-[#64748B]">
                <span>Items Subtotal:</span>
                <span className="text-[#111111] font-semibold">PKR {order.subtotal.toLocaleString()}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-[#0F2C59] font-bold">
                  <span>Discount:</span>
                  <span>-PKR {order.discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-[#64748B]">
                <span>Delivery:</span>
                <span className="text-[#111111]">
                  {order.shippingFee === 0 ? 'Complimentary' : `PKR ${order.shippingFee.toLocaleString()}`}
                </span>
              </div>
              <div className="border-t border-[#E2E8F0] pt-2 flex justify-between font-serif text-base font-bold text-[#111111]">
                <span>Total Paid:</span>
                <span className="text-[#0F2C59]">PKR {order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => window.print()}
            className="w-full sm:w-auto border border-[#CBD5E1] hover:border-[#0F2C59] text-[#111111] hover:text-[#0F2C59] px-6 py-3.5 text-xs uppercase font-sans tracking-[0.15em] font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer bg-white shadow-xs"
          >
            <Printer className="w-4 h-4 text-[#0F2C59]" />
            <span>Print Receipt</span>
          </button>

          <button
            type="button"
            onClick={() => navigateTo('shop')}
            className="w-full sm:w-auto bg-[#0F2C59] hover:bg-[#0A1E3F] text-white px-8 py-3.5 text-xs uppercase font-sans tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#0F2C59]/15"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quality assurance footer */}
        <div className="mt-12 text-center text-xs text-[#64748B] font-sans flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#0F2C59]" />
          <span>Every bottle is hand-inspected and sealed in tamper-evident luxury boxing.</span>
        </div>
      </div>
    </div>
  );
};
