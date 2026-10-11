import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Compass, Globe } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { PackageCard } from '../packages/PackageCard';

export const FeaturedPackages: React.FC = () => {
  const { publishedPackages } = useData();
  const [activeTab, setActiveTab] = useState<'all' | 'domestic' | 'international' | 'trending'>('all');

  const filtered = publishedPackages.filter((pkg) => {
    if (activeTab === 'domestic') return pkg.classification === 'domestic';
    if (activeTab === 'international') return pkg.classification === 'international';
    if (activeTab === 'trending') return pkg.trending || pkg.featured;
    return true;
  }).slice(0, 6);

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-600 mb-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Handpicked Itineraries</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Featured Tour Packages
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-lg">
              Verified itineraries designed with premium hotels, seamless transfers, sightseeing tickets, and dedicated on-tour management.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            {[
              { id: 'all', label: 'All Packages' },
              { id: 'domestic', label: 'Domestic' },
              { id: 'international', label: 'International' },
              { id: 'trending', label: 'Trending Deals' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/30'
                    : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        {/* Bottom CTA to see all */}
        <div className="text-center mt-12">
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 btn-secondary px-6 py-3 text-sm font-bold shadow-sm"
          >
            <span>Explore All {publishedPackages.length} Tour Packages</span>
            <ArrowRight className="w-4 h-4 text-brand-600" />
          </Link>
        </div>
      </div>
    </section>
  );
};
