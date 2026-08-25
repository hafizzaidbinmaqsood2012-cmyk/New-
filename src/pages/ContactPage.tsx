import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Sparkles } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { navigateTo, showToast } = useShop();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Bespoke Fragrance Consultation');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'info');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been sent to our concierge atelier.', 'navy');
  };

  return (
    <div className="bg-white text-[#111111] min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumbs */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs uppercase font-sans tracking-[0.2em] text-[#64748B] mb-2">
            <span className="cursor-pointer hover:text-[#0F2C59]" onClick={() => navigateTo('home')}>
              Home
            </span>
            <span>/</span>
            <span className="text-[#0F2C59] font-bold">Contact Atelier</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-black text-[#111111] mb-4">
            Connect with Our Concierge
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] font-sans leading-relaxed">
            Whether you need custom olfactory consultations, order tracking updates, or corporate gifting arrangements, our master parfumeur atelier is at your service.
          </p>
        </div>

        {/* 2-Column Contact Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Atelier Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-8 space-y-6 shadow-xs">
              <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] text-[#0F2C59] font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Atelier Headquarters</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#111111]">
                AVENDORA Haute Parfumerie
              </h2>
              <p className="text-xs text-[#64748B] font-sans leading-relaxed">
                Our customer concierge team is available 7 days a week to ensure seamless fragrance deliveries and personalized fragrance profiling.
              </p>

              <div className="space-y-4 pt-4 border-t border-[#E2E8F0] text-xs font-sans">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#0F2C59] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#111111] block">Flagship Atelier:</strong>
                    <span className="text-[#64748B]">
                      Plot 14-C, Main Boulevard, Phase 6, DHA, Karachi, Pakistan
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#0F2C59] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#111111] block">Direct Concierge Hotline &amp; WhatsApp:</strong>
                    <span className="text-[#64748B]">+92 300 1234567 / +92 21 35890123</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#0F2C59] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#111111] block">Official Inquiries:</strong>
                    <span className="text-[#64748B]">concierge@avendora.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#0F2C59] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#111111] block">Atelier Hours:</strong>
                    <span className="text-[#64748B]">Monday – Sunday: 10:00 AM – 10:00 PM PKT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Quick Chat Box */}
            <div className="bg-[#0F2C59] text-white p-6 shadow-md flex items-center justify-between gap-4">
              <div>
                <h4 className="font-serif text-base font-bold mb-1">Instant WhatsApp Support</h4>
                <p className="text-xs text-blue-100 font-sans">Get real-time scent advice and order assistance.</p>
              </div>
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noreferrer"
                className="bg-white text-[#0F2C59] hover:bg-[#F8FAFC] px-4 py-2.5 text-xs uppercase font-sans tracking-[0.1em] font-bold whitespace-nowrap shadow-xs"
              >
                Chat Now
              </a>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-[#F8FAFC] border border-[#E2E8F0] p-8 sm:p-10 shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 bg-[#F0F4F8] border border-[#D8E2ED] text-[#0F2C59] flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#111111]">
                  Message Received
                </h3>
                <p className="text-xs text-[#64748B] font-sans max-w-sm mx-auto leading-relaxed">
                  Thank you for contacting AVENDORA. A fragrance concierge consultant will respond to your inquiry within 2 to 4 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="bg-[#0F2C59] text-white px-6 py-2.5 text-xs uppercase font-sans tracking-[0.15em] font-bold cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-[#E2E8F0] pb-3 mb-6">
                  <h3 className="font-serif text-xl font-bold text-[#111111] flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#0F2C59]" />
                    Send a Direct Message
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-sans tracking-[0.15em] text-[#475569] mb-1 font-semibold">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Tariq Malik"
                      className="w-full bg-white border border-[#CBD5E1] text-xs p-3 text-[#111111] focus:outline-none focus:border-[#0F2C59]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-sans tracking-[0.15em] text-[#475569] mb-1 font-semibold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. tariq@example.com"
                      className="w-full bg-white border border-[#CBD5E1] text-xs p-3 text-[#111111] focus:outline-none focus:border-[#0F2C59]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-sans tracking-[0.15em] text-[#475569] mb-1 font-semibold">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +92 300 1234567"
                      className="w-full bg-white border border-[#CBD5E1] text-xs p-3 text-[#111111] focus:outline-none focus:border-[#0F2C59]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-sans tracking-[0.15em] text-[#475569] mb-1 font-semibold">
                      Topic of Inquiry
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-white border border-[#CBD5E1] text-xs p-3 text-[#111111] focus:outline-none focus:border-[#0F2C59]"
                    >
                      <option value="Bespoke Fragrance Consultation">Bespoke Fragrance Consultation</option>
                      <option value="Order Tracking & Dispatch">Order Tracking &amp; Dispatch</option>
                      <option value="Corporate & VIP Gifting">Corporate &amp; VIP Gifting</option>
                      <option value="Wholesale Inquiries">Wholesale &amp; Retail Inquiries</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-sans tracking-[0.15em] text-[#475569] mb-1 font-semibold">
                    Your Message / Scent Preference Notes *
                  </label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you're looking for, preferred notes, or your order reference number..."
                    className="w-full bg-white border border-[#CBD5E1] text-xs p-3 text-[#111111] focus:outline-none focus:border-[#0F2C59]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#0F2C59] hover:bg-[#0A1E3F] text-white px-8 py-3.5 text-xs uppercase font-sans tracking-[0.2em] font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-[#0F2C59]/15"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
