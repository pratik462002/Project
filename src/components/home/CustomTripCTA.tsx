import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, MessageCircle, Phone, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const CustomTripCTA: React.FC = () => {
  const { settings } = useData();
  const cleanPhone = settings.phonePrimary.replace(/[^0-9]/g, '');

  return (
    <section className="py-20 bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 text-white relative overflow-hidden">
      {/* Decorative ambient blurred circles */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-brand-500/20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-sun-500/20 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-sun-300 text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Tailor-Made Holiday Specialists</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4 font-display">
          Don’t Settle for an Ordinary Vacation.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sun-300 via-amber-200 to-white">
            Let’s Build Your Dream Itinerary Together.
          </span>
        </h2>

        <p className="text-xs sm:text-sm sm:max-w-xl mx-auto text-slate-300 leading-relaxed mb-10">
          Whether it’s a romantic honeymoon, a multi-generational family retreat, or an adrenaline-fueled island adventure, our Pune specialists will design every single detail with zero hidden surprises.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/plan-your-trip"
            className="btn-gold px-6 py-3.5 text-sm font-bold shadow-xl shadow-amber-500/20"
          >
            <Calendar className="w-4 h-4" />
            <span>Customize My Holiday Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={`https://wa.me/${cleanPhone}?text=Hi%20InstaHoliday!%20I%20would%20like%20to%20plan%20a%20tailor-made%20holiday.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all text-sm shadow-xl shadow-emerald-600/20"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat With Trip Expert</span>
          </a>

          <a
            href={`tel:${settings.phonePrimary}`}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-white/10 hover:bg-white/20 transition-all text-sm border border-white/20"
          >
            <Phone className="w-4 h-4 text-brand-300" />
            <span>Call: {settings.phonePrimary}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
