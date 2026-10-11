import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, MapPin, Award, Users, Phone, MessageCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

export const AboutPage: React.FC = () => {
  const { settings } = useData();
  const cleanPhone = settings.phonePrimary.replace(/[^0-9]/g, '');

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-wider text-brand-600 block mb-2">
            About InstaHoliday Solutions
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
            Passionate Travel Crafters from Pune
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Founded with the belief that a holiday should be refreshing rather than exhausting, InstaHoliday Solutions Pvt Ltd delivers seamlessly executed domestic and international holidays tailored around genuine care and comfort.
          </p>
        </div>

        {/* Story & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-20">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 h-96 relative">
            <img
              src="/media/group-dubai-1.jpg"
              alt="InstaHoliday tour group in Dubai"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-5 left-5 text-white">
              <span className="text-xs font-semibold text-sun-300 block">Real Guest Memory</span>
              <p className="font-bold text-sm">Dubai VIP Group Departure</p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <h2 className="text-2xl font-bold text-slate-900 font-display">
              Our Journey & Commitment
            </h2>
            <p>
              Operating out of Pimple Gurav, Pune, InstaHoliday Solutions has grown from an energetic travel consultancy into a full-service holiday company serving families, couples, senior citizen groups, and corporate teams across Maharashtra.
            </p>
            <p>
              Unlike mass online aggregator portals where travellers are left talking to automated chatbots when a flight is delayed or hotel check-in has an issue, InstaHoliday assigns dedicated on-tour managers and maintains a 24/7 direct communication line.
            </p>
            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200">
                <span className="text-xl font-extrabold text-brand-600 block">{settings.stats.happyTravellers}</span>
                <span className="text-xs text-slate-500">Delighted Guests</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200">
                <span className="text-xl font-extrabold text-brand-600 block">{settings.stats.rating}</span>
                <span className="text-xs text-slate-500">Google Customer Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm mb-16">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10 font-display">
            The Principles That Guide Us
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">Honest & Transparent</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clear inclusions, transparent hotel tiers, and upfront cost breakdowns with zero hidden surprise charges.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-sun-50 text-sun-600 flex items-center justify-center mb-4">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">Guest-First Hospitality</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Special dietary care (Jain, vegetarian, child-friendly dining) and relaxed itineraries that respect your family's pace.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">Personalized Touch</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                From pre-departure packing checklists to flight boarding support, we treat every traveller like our own family.
              </p>
            </div>
          </div>
        </div>

        {/* Head Office CTA */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-sun-400 uppercase tracking-wider block mb-1">
              Visit Us in Pune
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">Have a Cup of Tea & Plan Your Vacation</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-lg">
              {settings.address}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`tel:${settings.phonePrimary}`}
              className="btn-primary text-xs py-2.5 px-4"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Pune Office</span>
            </a>
            <Link to="/contact" className="btn-secondary text-xs py-2.5 px-4 bg-white/10 text-white hover:bg-white/20 border-white/20">
              Get Directions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
