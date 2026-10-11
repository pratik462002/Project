import React from 'react';
import { Star, Quote, MapPin, CheckCircle2 } from 'lucide-react';
import { initialTestimonials } from '../../data/seedTestimonials';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-wider text-brand-600 block mb-2">
            Guest Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Loved by Pune Travellers
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Read firsthand stories from families and group travellers who celebrated their holidays with InstaHoliday Solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {initialTestimonials.map((item) => (
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
