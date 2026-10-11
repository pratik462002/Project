import React from 'react';
import { Link } from 'react-router-dom';
import { Palmtree, Mountain, Building2, Users, Compass, Globe } from 'lucide-react';

export const CategoryShowcase: React.FC = () => {
  const categories = [
    {
      title: 'Domestic India Tours',
      subtitle: 'Andaman, Kerala, Himachal, Goa',
      link: '/domestic',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80',
      icon: Compass,
      tag: 'Explore India',
    },
    {
      title: 'International Holidays',
      subtitle: 'Dubai, Europe, Vietnam, Sri Lanka',
      link: '/international',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
      icon: Globe,
      tag: 'Global Getaways',
    },
    {
      title: 'Island & Beach Retreats',
      subtitle: 'Havelock, Neil, Bali, Bentota',
      link: '/packages?category=Island%20%26%20Beach',
      image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=600&q=80',
      icon: Palmtree,
      tag: 'Sun & Sand',
    },
    {
      title: 'Hills & Nature Escapes',
      subtitle: 'Munnar, Thekkady, Manali, Shimla',
      link: '/packages?category=Hills%20%26%20Nature',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80',
      icon: Mountain,
      tag: 'Misty Peaks',
    },
    {
      title: 'City & Luxury Tours',
      subtitle: 'Dubai Skylines, Singapore, Paris',
      link: '/packages?category=City%20%26%20Luxury',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80',
      icon: Building2,
      tag: 'World Class',
    },
    {
      title: 'Guided Group Tours',
      subtitle: 'Dedicated tour manager & meals',
      link: '/packages',
      image: '/media/group-kerala-1.jpg',
      icon: Users,
      tag: 'Family & Senior Friendly',
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-wider text-brand-600 block mb-2">
            Curated Styles
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Find Your Ideal Travel Vibe
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Whether you seek tropical relaxation, snowy valleys, or modern metropolitan thrills, we have a handcrafted itinerary ready for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                to={cat.link}
                className="group relative h-64 rounded-3xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 flex flex-col justify-end p-6 border border-slate-100"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/20 backdrop-blur-md text-white text-[11px] font-bold mb-2">
                    <Icon className="w-3.5 h-3.5 text-sun-300" />
                    <span>{cat.tag}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                    {cat.subtitle}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
