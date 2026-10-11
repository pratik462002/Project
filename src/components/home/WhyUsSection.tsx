import React from 'react';
import { Sliders, ShieldCheck, UserCheck, Headphones, Map, FileCheck, CheckCircle2 } from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  const pillars = [
    {
      icon: Sliders,
      title: '100% Customized Itineraries',
      desc: 'No cookie-cutter trips. We tailor day-to-day schedules, hotel tiers, and paces around your family\'s preferences.',
      color: 'text-brand-600 bg-brand-50 border-brand-100',
    },
    {
      icon: ShieldCheck,
      title: 'Handpicked Verified Stays',
      desc: 'We personally inspect resorts, hotels, and houseboats to guarantee cleanliness, hygienic dining, and prime locations.',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    {
      icon: UserCheck,
      title: 'Dedicated Tour Managers',
      desc: 'Experience stress-free travel with knowledgeable, courteous tour captains accompanying your journeys on group and VIP tours.',
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      icon: Headphones,
      title: '24/7 Pune Travel Desk',
      desc: 'Direct WhatsApp and phone assistance before, during, and after your trip. We are with you from takeoff to touchdown.',
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Share Your Vision',
      desc: 'Tell us where you want to go, your dates, family size, and preferences via call, WhatsApp, or our quick form.',
    },
    {
      step: '02',
      title: 'Receive Custom Plan',
      desc: 'Our destination specialist crafts a day-wise itinerary with clear inclusions, hotel options, and transparent pricing.',
    },
    {
      step: '03',
      title: 'Refine & Confirm',
      desc: 'Modify sightseeings, upgrade stays, or adjust pace until the plan matches your dream vacation.',
    },
    {
      step: '04',
      title: 'Pack & Relax',
      desc: 'Receive your complete booking vouchers, flight tickets, visa copies, and driver details well in advance.',
    },
    {
      step: '05',
      title: 'Enjoy Stress-Free',
      desc: 'Travel with complete peace of mind knowing InstaHoliday\'s operations team is monitoring your journey round-the-clock.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-wider text-brand-600 block mb-2">
            The InstaHoliday Advantage
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Why Hundreds of Families Choose Us
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Founded with a passion for genuine hospitality, we take the stress out of holiday planning so you focus purely on memories.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl border border-slate-100 bg-white shadow-card hover:shadow-hover transition-all duration-300 flex flex-col"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border ${pillar.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* 5-Step Process */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs uppercase font-bold tracking-wider text-sun-400 block mb-1">
                How It Works
              </span>
              <h3 className="text-2xl font-extrabold text-white">
                5 Simple Steps to Your Dream Vacation
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {steps.map((s, idx) => (
                <div key={idx} className="flex flex-col relative">
                  <span className="text-3xl font-black text-brand-500/40 mb-2 font-display">
                    {s.step}
                  </span>
                  <h4 className="font-bold text-sm text-white mb-1.5">{s.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
