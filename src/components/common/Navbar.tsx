import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Menu, X, Compass, Globe, Sparkles, MapPin, Calendar } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { settings } = useData();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'All Packages', path: '/packages' },
    { label: 'Domestic', path: '/domestic' },
    { label: 'International', path: '/international' },
    { label: 'Trending', path: '/trending', badge: 'Hot' },
    { label: 'Plan Custom Trip', path: '/plan-your-trip' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const cleanPhone = settings.phonePrimary.replace(/[^0-9]/g, '');

  return (
    <header className="sticky top-0 z-40 transition-all duration-300">
      {/* Top micro bar for verified contacts & tagline */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-sun-400 font-medium tracking-wider text-[11px] uppercase">
              <Sparkles className="w-3 h-3 text-sun-400" />
              {settings.tagline}
            </span>
            <span className="hidden md:inline-block text-slate-600">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400 text-[11px]">
              <MapPin className="w-3 h-3 text-brand-400" />
              Head Office: Pimple Gurav, Pune
            </span>
          </div>

          <div className="flex items-center gap-4 text-[12px]">
            <a
              href={`tel:${settings.phonePrimary}`}
              className="flex items-center gap-1 hover:text-white transition-colors text-slate-300"
            >
              <Phone className="w-3 h-3 text-brand-400" />
              <span>{settings.phonePrimary}</span>
            </a>
            <a
              href={`https://wa.me/${cleanPhone}?text=Hi%20InstaHoliday%2C%20I%20would%20like%20to%20plan%20a%20holiday.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <MessageCircle className="w-3 h-3" />
              <span className="hidden sm:inline">WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <nav
        className={`transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-slate-200/80'
            : 'bg-white py-3.5 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <img
              src="/logo.png"
              alt="InstaHoliday Solutions Logo"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors">
                Insta<span className="text-brand-500">Holiday</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">
                Solutions Pvt Ltd
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'text-brand-600 bg-brand-50'
                      : 'text-slate-700 hover:text-brand-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white animate-pulse">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              to="/plan-your-trip"
              className="btn-gold text-xs px-4 py-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Plan My Trip</span>
            </Link>
            <a
              href={`tel:${settings.phonePrimary}`}
              className="btn-primary text-xs px-3.5 py-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Us</span>
            </a>
          </div>

          {/* Mobile hamburger toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/plan-your-trip"
              className="btn-gold text-xs px-3 py-1.5 sm:hidden"
            >
              Plan Trip
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-brand-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile slide-down drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 animate-slide-up shadow-xl">
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'text-brand-600 bg-brand-50'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}

              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                <a
                  href={`tel:${settings.phonePrimary}`}
                  className="btn-primary w-full py-2.5 text-sm"
                >
                  <Phone className="w-4 h-4" />
                  Call: {settings.phonePrimary}
                </a>
                <a
                  href={`https://wa.me/${cleanPhone}?text=Hi%20InstaHoliday%2C%20I%20would%20like%20to%20plan%20a%20holiday.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors text-sm shadow-md shadow-emerald-600/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Us Now
                </a>
                <Link
                  to="/admin/login"
                  className="text-center text-xs text-slate-400 hover:text-slate-600 pt-2"
                >
                  Admin Portal Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
