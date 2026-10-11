import React from 'react';
import { Camera, MapPin, Sparkles } from 'lucide-react';

export const RealTourMoments: React.FC = () => {
  const photos = [
    {
      src: '/media/group-dubai-1.jpg',
      caption: 'Dubai Group Holiday – Limousine experience & Burj Khalifa',
      location: 'Dubai, UAE',
      tag: 'VIP Group Tour',
    },
    {
      src: '/media/group-kerala-1.jpg',
      caption: 'Kerala Backwaters & Munnar Tea Plantation tour group',
      location: 'Munnar, Kerala',
      tag: 'Family Tour',
    },
    {
      src: '/media/group-dubai-2.jpg',
      caption: 'Miracle Garden floral wonderland family tour',
      location: 'Dubai Miracle Garden',
      tag: 'Group Moments',
    },
    {
      src: '/media/group-kanyakumari-1.jpg',
      caption: 'Vivekananda Rock Memorial & Trivandrum coastal tour',
      location: 'Kanyakumari, Tamil Nadu',
      tag: 'Cultural Heritage',
    },
    {
      src: '/media/group-lake-1.jpg',
      caption: 'Mattupetty Lake boating & scenic dam excursion',
      location: 'Idukki, Kerala',
      tag: 'Nature Escape',
    },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sun-400 mb-2">
              <Camera className="w-4 h-4" />
              <span>Real Travellers, Real Smiles</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              Moments from Our Recent Tours
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Authentic snapshots of our happy guests experiencing Dubai, Kerala, Kanyakumari, and beyond with InstaHoliday tour managers.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>100% Unedited Guest Photos</span>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((item, idx) => (
            <div
              key={idx}
              className={`group relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-800/50 shadow-xl transition-all duration-300 hover:border-slate-700 ${
                idx === 0 ? 'sm:col-span-2 lg:col-span-2 h-80 sm:h-96' : 'h-80 sm:h-96'
              }`}
            >
              <img
                src={item.src}
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>

              <div className="absolute top-4 left-4 z-10">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-black/50 backdrop-blur-md text-sun-300 px-3 py-1 rounded-full border border-white/10">
                  {item.tag}
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 z-10">
                <div className="flex items-center gap-1.5 text-xs text-brand-300 font-medium mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.location}</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                  {item.caption}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
