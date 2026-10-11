import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Sparkles, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { settings, setFilters } = useData();

  const [destination, setDestination] = useState('');
  const [classification, setClassification] = useState<'all' | 'domestic' | 'international'>('all');
  const [duration, setDuration] = useState<'all' | 'short' | 'medium' | 'long'>('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({
      ...prev,
      searchQuery: destination,
      classification,
      duration,
    }));
    navigate('/packages');
  };

  return (
    <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center justify-center bg-slate-900 overflow-hidden py-16 sm:py-20">
      {/* Background Hero Image with atmospheric gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85"
          alt="Scenic travel background"
          className="w-full h-full object-cover object-center opacity-40 scale-105 transform animate-pulse duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/40 via-transparent to-slate-950/60"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full text-center flex flex-col items-center">
        {/* Brand Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sun-300 text-xs font-bold uppercase tracking-widest mb-6 animate-fade-in shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-sun-400" />
          <span>{settings.tagline}</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-4xl mb-4 font-display">
          Curated Vacations,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-sky-300 to-sun-300">
            Effortless Moments
          </span>
        </h1>

        <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl leading-relaxed mb-10">
          Handcrafted domestic and international holiday tour packages with dedicated tour managers, transparent pricing, and 24/7 on-tour support from Pune.
        </p>

        {/* Quick Search Console Card */}
        <div className="w-full max-w-4xl bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-3xl shadow-2xl border border-white/40 mb-10 text-left">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Where To?
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-brand-500 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Kerala, Dubai, Andaman..."
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Tour Region
              </label>
              <select
                value={classification}
                onChange={(e) => setClassification(e.target.value as any)}
                className="w-full text-xs px-3 py-2.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="all">All Destinations</option>
                <option value="domestic">Domestic India</option>
                <option value="international">International Global</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Trip Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value as any)}
                className="w-full text-xs px-3 py-2.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="all">Any Duration</option>
                <option value="short">1 - 4 Days (Quick Escape)</option>
                <option value="medium">5 - 7 Days (Standard Holiday)</option>
                <option value="long">8+ Days (Grand Tour)</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="btn-primary w-full py-2.5 text-xs font-bold"
              >
                <Search className="w-4 h-4" />
                <span>Find Holidays</span>
              </button>
            </div>
          </form>
        </div>

        {/* Trust & Verified Badges Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 text-slate-300 text-xs w-full max-w-3xl">
          <div className="flex items-center justify-center gap-2 bg-slate-800/40 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-700/40">
            <span className="font-extrabold text-white text-sm sm:text-base">{settings.stats.happyTravellers}</span>
            <span className="text-slate-400">Happy Guests</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-slate-800/40 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-700/40">
            <span className="font-extrabold text-white text-sm sm:text-base">{settings.stats.toursCompleted}</span>
            <span className="text-slate-400">Tour Departures</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-slate-800/40 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-700/40">
            <span className="font-extrabold text-white text-sm sm:text-base">{settings.stats.destinations}</span>
            <span className="text-slate-400">Destinations</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-slate-800/40 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-700/40">
            <Star className="w-3.5 h-3.5 text-sun-400 fill-sun-400" />
            <span className="font-extrabold text-white text-sm sm:text-base">{settings.stats.rating}</span>
            <span className="text-slate-400">Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
};
