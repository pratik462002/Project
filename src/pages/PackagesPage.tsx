import React, { useMemo } from 'react';
import { MapPin, Filter, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';
import { PackageCard } from '../components/packages/PackageCard';
import { PackageFilters } from '../components/packages/PackageFilters';

interface PackagesPageProps {
  initialClassification?: 'domestic' | 'international';
  pageTitle?: string;
  pageSubtitle?: string;
}

export const PackagesPage: React.FC<PackagesPageProps> = ({
  initialClassification,
  pageTitle = 'Explore All Holiday Packages',
  pageSubtitle = 'Discover curated domestic and international getaways with verified itineraries, comfortable stays, and direct tour management support.',
}) => {
  const { filteredPackages, packages, filters, setFilters, resetFilters } = useData();

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    packages.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [packages]);

  // If page is specifically for Domestic or International, auto-enforce
  React.useEffect(() => {
    if (initialClassification) {
      setFilters((prev) => ({
        ...prev,
        classification: initialClassification,
      }));
    }
  }, [initialClassification, setFilters]);

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-600 mb-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Tour Package Directory</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            {pageTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl">
            {pageSubtitle}
          </p>
        </div>

        {/* Content Layout: Filters Sidebar + Package Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <PackageFilters
                filters={filters}
                setFilters={setFilters}
                resetFilters={resetFilters}
                categories={categories}
              />
            </div>
          </div>

          {/* Package Grid & Results Summary */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200 text-xs text-slate-500">
              <span>
                Showing <strong className="text-slate-900">{filteredPackages.length}</strong> available holidays
              </span>
              {filters.searchQuery && (
                <span>
                  Query: "<strong className="text-brand-600">{filters.searchQuery}</strong>"
                </span>
              )}
            </div>

            {filteredPackages.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-4">
                  <Filter className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  No packages match your search criteria
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
                  Try clearing some filters or searching with a different destination name or duration.
                </p>
                <button onClick={resetFilters} className="btn-primary text-xs py-2.5 px-5">
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPackages.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
