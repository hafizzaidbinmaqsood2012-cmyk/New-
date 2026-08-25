import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { User, Lock, Mail, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { user, loginUser, logoutUser, navigateTo } = useShop();
  const [isLoginView, setIsLoginView] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('tariq.malik@example.com');
  const [password, setPassword] = useState('••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    loginUser({
      name: name || (isLoginView ? 'Tariq Malik' : 'New Collector'),
      email: email,
      membershipTier: 'VIP Collector',
      points: 450,
    });
  };

  if (user) {
    return (
      <div className="bg-white text-[#111111] min-h-[75vh] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-[#F8FAFC] border border-[#E2E8F0] p-8 sm:p-10 shadow-xs text-center space-y-6">
          <div className="w-16 h-16 bg-[#F0F4F8] border border-[#D8E2ED] text-[#0F2C59] flex items-center justify-center mx-auto">
            <User className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[11px] uppercase font-sans tracking-[0.25em] text-[#0F2C59] font-bold block mb-1">
              Member Profile Active
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#111111]">{user.name}</h1>
            <p className="text-xs text-[#64748B] font-sans mt-1">{user.email}</p>
          </div>

          <div className="bg-white p-4 border border-[#E2E8F0] text-xs font-sans space-y-2">
            <div className="flex justify-between">
              <span className="text-[#64748B]">Club Status:</span>
              <span className="text-[#0F2C59] font-bold">{user.membershipTier}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">VIP Loyalty Scent Points:</span>
              <span className="font-mono font-bold text-[#111111]">{user.points} Pts</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={() => navigateTo('shop')}
              className="w-full bg-[#0F2C59] hover:bg-[#0A1E3F] text-white py-3.5 text-xs uppercase font-sans tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Explore Boutique</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={logoutUser}
              className="w-full bg-white border border-[#CBD5E1] hover:border-red-500 text-[#64748B] hover:text-red-600 py-3 text-xs uppercase font-sans tracking-[0.15em] font-bold transition-colors cursor-pointer"
            >
              Sign Out from Atelier
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-[#111111] min-h-screen py-10 lg:py-16">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <span className="text-xs uppercase font-sans tracking-[0.25em] text-[#0F2C59] font-bold block mb-1">
            Maison AVENDORA
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#111111] mb-2">
            {isLoginView ? 'Member Sign In' : 'Join the Atelier'}
          </h1>
          <p className="text-xs text-[#64748B] font-sans">
            {isLoginView
              ? 'Access your bespoke order history and VIP fragrance privileges.'
              : 'Create an account to unlock complimentary samples and private reserve allocations.'}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 sm:p-8 shadow-xs space-y-6">
          {/* Toggle Tab */}
          <div className="flex border border-[#CBD5E1] bg-white p-1">
            <button
              type="button"
              onClick={() => setIsLoginView(true)}
              className={`flex-1 py-2 text-xs uppercase font-sans tracking-[0.15em] font-bold transition-colors cursor-pointer ${
                isLoginView ? 'bg-[#0F2C59] text-white' : 'text-[#64748B] hover:text-[#111111]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsLoginView(false)}
              className={`flex-1 py-2 text-xs uppercase font-sans tracking-[0.15em] font-bold transition-colors cursor-pointer ${
                !isLoginView ? 'bg-[#0F2C59] text-white' : 'text-[#64748B] hover:text-[#111111]'
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginView && (
              <div>
                <label className="block text-xs uppercase font-sans tracking-[0.15em] text-[#475569] mb-1 font-semibold">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tariq Malik"
                    className="w-full bg-white border border-[#CBD5E1] text-xs pl-9 pr-3 py-2.5 text-[#111111] focus:outline-none focus:border-[#0F2C59]"
                    required={!isLoginView}
                  />
                  <User className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs uppercase font-sans tracking-[0.15em] text-[#475569] mb-1 font-semibold">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tariq@example.com"
                  className="w-full bg-white border border-[#CBD5E1] text-xs pl-9 pr-3 py-2.5 text-[#111111] focus:outline-none focus:border-[#0F2C59]"
                  required
                />
                <Mail className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-sans tracking-[0.15em] text-[#475569] mb-1 font-semibold">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-[#CBD5E1] text-xs pl-9 pr-3 py-2.5 text-[#111111] focus:outline-none focus:border-[#0F2C59]"
                  required
                />
                <Lock className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#64748B] font-sans pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="text-[#0F2C59] focus:ring-[#0F2C59]"
                />
                <span>Remember me</span>
              </label>
              {isLoginView && (
                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to your registered email.')}
                  className="text-[#0F2C59] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#0F2C59] hover:bg-[#0A1E3F] text-white py-3.5 text-xs uppercase font-sans tracking-[0.2em] font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#0F2C59]/15"
            >
              <span>{isLoginView ? 'Authenticate Account' : 'Create Collector Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Member perks footnote */}
          <div className="pt-4 border-t border-[#E2E8F0] space-y-2 text-[11px] text-[#64748B] font-sans">
            <div className="flex items-center gap-2 text-[#0F2C59]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complimentary 2ml discovery samples with every member order.</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0F2C59]" />
              <span>Encrypted security & guaranteed authenticity.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
