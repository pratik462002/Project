import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, Clock, ShieldCheck, Heart, Sparkles, Instagram, Facebook } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const Footer: React.FC = () => {
  const { settings, publishedPackages } = useData();
  const cleanPhone = settings.phonePrimary.replace(/[^0-9]/g, '');

  const domesticList = publishedPackages
    .filter((p) => p.classification === 'domestic')
    .slice(0, 5);

  const internationalList = publishedPackages
    .filter((p) => p.classification === 'international')
    .slice(0, 5);

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="InstaHoliday Solutions"
                className="h-12 w-auto bg-white rounded-lg p-1"
              />
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight">
                  Insta<span className="text-brand-400">Holiday</span>
                </span>
                <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">
                  Solutions Pvt Ltd
                </p>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Your trusted travel partner for handcrafted domestic and international holidays, all-inclusive group tours, honeymoon getaways, and corporate retreats. Vacation starts now!
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-gradient-to-tr hover:from-amber-500 hover:to-rose-500 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-emerald-600 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-2 p-3 bg-slate-850/80 rounded-xl border border-slate-800 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-brand-400 shrink-0" />
              <div className="text-xs">
                <span className="text-white font-semibold block">100% Verified Operations</span>
                <span className="text-slate-400">Transparent pricing & dedicated 24/7 on-tour managers.</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Explore</h4>
            <ul className="flex flex-col gap-2 text-sm text-slate-400">
              <li>
                <Link to="/packages" className="hover:text-brand-400 transition-colors">
                  All Tour Packages
                </Link>
              </li>
              <li>
                <Link to="/domestic" className="hover:text-brand-400 transition-colors">
                  Domestic Holidays
                </Link>
              </li>
              <li>
                <Link to="/international" className="hover:text-brand-400 transition-colors">
                  International Getaways
                </Link>
              </li>
              <li>
                <Link to="/trending" className="hover:text-brand-400 transition-colors flex items-center gap-1.5">
                  <span>Trending Deals</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-amber-500/20 text-amber-400 font-bold rounded">HOT</span>
                </Link>
              </li>
              <li>
                <Link to="/plan-your-trip" className="hover:text-brand-400 transition-colors">
                  Plan Custom Trip
                </Link>
              </li>
              <li>
                <Link to="/why-us" className="hover:text-brand-400 transition-colors">
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-400 transition-colors">
                  About InstaHoliday
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-brand-400 transition-colors">
                  Travel Guides & Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Packages */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Top Tours</h4>
            <ul className="flex flex-col gap-2 text-sm text-slate-400">
              {internationalList.map((pkg) => (
                <li key={pkg.id}>
                  <Link
                    to={`/packages/${pkg.slug}`}
                    className="hover:text-brand-400 transition-colors line-clamp-1"
                  >
                    {pkg.title}
                  </Link>
                </li>
              ))}
              {domesticList.map((pkg) => (
                <li key={pkg.id}>
                  <Link
                    to={`/packages/${pkg.slug}`}
                    className="hover:text-brand-400 transition-colors line-clamp-1"
                  >
                    {pkg.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Head Office & Contacts */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Head Office</h4>
            <div className="flex flex-col gap-3 text-xs text-slate-400 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${settings.phonePrimary}`} className="hover:text-white transition-colors">
                  {settings.phonePrimary}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${settings.phoneSecondary}`} className="hover:text-white transition-colors">
                  {settings.phoneSecondary}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sun-400 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                  {settings.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{settings.officeHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} InstaHoliday Solutions Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:text-slate-300 transition-colors">
              Pune Office
            </Link>
            <span>•</span>
            <Link to="/why-us" className="hover:text-slate-300 transition-colors">
              Booking Policy
            </Link>
            <span>•</span>
            <Link to="/admin/login" className="hover:text-slate-300 transition-colors">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
