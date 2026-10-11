import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Sparkles, ChevronLeft, ChevronRight, Star, Heart, Compass } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface HeroSlide {
  id: string;
  destination: string;
  duration: string;
  highlight: string;
  imageUrl: string;
  region: 'domestic' | 'international';
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'dubai',
    destination: 'Dubai & Abu Dhabi',
    duration: '5 Nights / 6 Days',
    highlight: 'Burj Khalifa, Desert Safari & Marina Cruise',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=85',
    region: 'international',
  },
  {
    id: 'kerala',
    destination: 'Kerala & Munnar Hills',
    duration: '6 Nights / 7 Days',
    highlight: 'Misty Tea Hills, Alleppey Houseboat & Spice Plantations',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2000&q=85',
    region: 'domestic',
  },
  {
    id: 'europe',
    destination: 'Swiss Alps & Paris, Europe',
    duration: '12 Nights / 13 Days',
    highlight: 'Eiffel Tower, Mount Titlis & Venetian Gondola',
    imageUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=2000&q=85',
    region: 'international',
  },
  {
    id: 'vietnam',
    destination: 'Vietnam & Halong Bay',
    duration: '7 Nights / 8 Days',
    highlight: 'Overnight Cruise, Ba Na Hills & Golden Bridge',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2000&q=85',
    region: 'international',
  },
  {
    id: 'bali',
    destination: 'Bali Tropical Paradise',
    duration: '5 Nights / 6 Days',
    highlight: 'Ubud Jungle Swing, Kelingking Cliff & Sunset Temples',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2000&q=85',
    region: 'international',
  },
  {
    id: 'andaman',
    destination: 'Andaman & Havelock Island',
    duration: '5 Nights / 6 Days',
    highlight: 'Radhanagar Beach, Neil Coral Reefs & Historic Cellular Jail',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85',
    region: 'domestic',
  },
];

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { settings, setFilters } = useData();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const [destination, setDestination] = useState('');
  const [classification, setClassification] = useState<'all' | 'domestic' | 'international'>('all');
  const [duration, setDuration] = useState<'all' | 'short' | 'medium' | 'long'>('all');

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

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

  const activeSlide = HERO_SLIDES[currentSlideIndex];

  return (
    <section
      className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center bg-slate-950 overflow-hidden py-14 sm:py-20 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 5-Second Crossfading Background Slider Images */}
      {HERO_SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlideIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
        >
          <img
            src={slide.imageUrl}
            alt={slide.destination}
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-[6000ms] ease-out"
          />
          {/* Atmospheric cinematic glass overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/45" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/40 to-slate-950/90" />
        </div>
      ))}

      {/* Manual Slide Navigation Arrows */}
      <button
        onClick={handlePrevSlide}
        aria-label="Previous destination"
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full items-center justify-center bg-black/30 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-md border border-white/10 transition-all hover:scale-110 shadow-lg"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={handleNextSlide}
        aria-label="Next destination"
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full items-center justify-center bg-black/30 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-md border border-white/10 transition-all hover:scale-110 shadow-lg"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full flex flex-col items-start text-left">
        {/* Style Tag from Reference: ◆ WHERE TO NEXT */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 font-bold text-xs uppercase tracking-widest backdrop-blur-md shadow-sm mb-4">
          <span className="text-amber-400 text-[10px]">◆</span>
          <span>WHERE TO NEXT</span>
        </div>

        {/* Style Headline matching Reference Image: "Places India falls in love with." */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-4xl mb-4 font-display">
          Places India{' '}
          <span className="relative inline-block text-amber-400">
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              falls in love with.
            </span>
            {/* Organic highlight curve underline */}
            <svg
              className="absolute -bottom-2 left-0 w-full h-3.5 text-amber-400 opacity-90 pointer-events-none"
              viewBox="0 0 240 10"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M2 6.5C50 1.5 120 1 238 7"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        {/* Style Subtitle with Left Vertical Accent Bar */}
        <div className="border-l-2 border-amber-400 pl-4 py-1 text-slate-200 text-sm sm:text-base md:text-lg max-w-2xl font-medium leading-relaxed mb-4">
          Handpicked destinations with the best months to visit, so you always arrive in season.
        </div>

        {/* Pune Minglish Cultural Resonance Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-xs text-slate-200 mb-8 shadow-md">
          <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-extrabold text-[10px] uppercase">
            आपलं पुणं
          </span>
          <span className="text-slate-300">
            पुणेकरांचा विश्वास • Pure Veg / Jain जेवणाची विशेष काळजी • मराठी भाषिक टूर मॅनेजर
          </span>
        </div>

        {/* Glassmorphic Quick Search Console */}
        <div className="w-full max-w-4xl bg-slate-900/85 backdrop-blur-xl p-4 sm:p-5 rounded-3xl shadow-2xl border border-white/20 mb-8 text-left">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                Where To?
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-amber-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Kerala, Dubai, Bali..."
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-800/90 text-white placeholder-slate-400 hover:bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                Tour Region
              </label>
              <select
                value={classification}
                onChange={(e) => setClassification(e.target.value as any)}
                className="w-full text-xs px-3 py-2.5 bg-slate-800/90 text-white border border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none"
              >
                <option value="all" className="bg-slate-900 text-white">All Destinations</option>
                <option value="domestic" className="bg-slate-900 text-white">Domestic India (केरळ, अंदमान)</option>
                <option value="international" className="bg-slate-900 text-white">International Global (दुबई, व्हिएतनाम)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                Trip Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value as any)}
                className="w-full text-xs px-3 py-2.5 bg-slate-800/90 text-white border border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none"
              >
                <option value="all" className="bg-slate-900 text-white">Any Duration</option>
                <option value="short" className="bg-slate-900 text-white">1 - 4 Days (Quick Escape)</option>
                <option value="medium" className="bg-slate-900 text-white">5 - 7 Days (Popular Holidays)</option>
                <option value="long" className="bg-slate-900 text-white">8+ Days (Grand Holiday)</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="btn-gold w-full py-2.5 text-xs font-bold shadow-lg shadow-amber-500/20"
              >
                <Search className="w-4 h-4" />
                <span>Explore Packages</span>
              </button>
            </div>
          </form>
        </div>

        {/* Live Active Slide Destination Card & Thumbnail Dots */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          {/* Active slide badge chip */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold">{activeSlide.destination}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-300">{activeSlide.duration}</span>
            <span className="hidden md:inline text-slate-400">•</span>
            <span className="hidden md:inline text-amber-300">{activeSlide.highlight}</span>
          </div>

          {/* Interactive Slide Progress Indicators (6 Destinations) */}
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlideIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-8 bg-amber-400 shadow-md shadow-amber-400/50'
                      : 'w-2.5 bg-white/30 hover:bg-white/60'
                  }`}
                  title={`${slide.destination} (${idx + 1}/6)`}
                  aria-label={`Go to slide ${idx + 1}: ${slide.destination}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
