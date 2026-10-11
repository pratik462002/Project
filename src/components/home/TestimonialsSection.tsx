import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useData();

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-600 font-bold text-xs uppercase tracking-widest mb-3">
              <span className="text-amber-500 text-[10px]">◆</span>
              <span>VERIFIED GUEST TESTIMONIALS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
              Loved by Pune <span className="text-amber-500">Travellers.</span>
            </h2>
            <div className="border-l-2 border-amber-400 pl-3.5 mt-2 text-xs sm:text-sm text-slate-600 max-w-xl">
              Read firsthand stories from families and group travellers who celebrated their holidays with InstaHoliday Solutions.
            </div>
          </div>
          <div className="hidden md:block">
            <span className="text-xs font-bold text-slate-500 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm">
              4.9/5 सरासरी रेटिंग • 1,500+ समाधानी पर्यटक
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card hover:shadow-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-sun-400 fill-sun-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{item.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{item.comment}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <img
                  src={item.photoUrl}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-500/20 shrink-0"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{item.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-brand-500" />
                      {item.location}
                    </span>
                    <span>•</span>
                    <span className="text-brand-600 font-medium">{item.tripTitle}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
