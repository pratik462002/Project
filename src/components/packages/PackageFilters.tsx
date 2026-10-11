import React from 'react';
import { Search, RotateCcw, Filter, MapPin } from 'lucide-react';
import { PackageFilterState } from '../../types/package';

interface PackageFiltersProps {
  filters: PackageFilterState;
  setFilters: React.Dispatch<React.SetStateAction<PackageFilterState>>;
  resetFilters: () => void;
  categories: string[];
}

export const PackageFilters: React.FC<PackageFiltersProps> = ({
  filters,
  setFilters,
  resetFilters,
  categories,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
          <Filter className="w-4 h-4 text-brand-500" />
          <span>Filter Packages</span>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs text-brand-600 hover:text-brand-800 font-semibold flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {/* Search input */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Search Destination / Tour
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="e.g. Kerala, Dubai, Andaman..."
              value={filters.searchQuery}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
              }
              className="w-full text-xs pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Classification */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">
            Region / Classification
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'all', label: 'All' },
              { id: 'domestic', label: 'Domestic' },
              { id: 'international', label: 'Global' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    classification: tab.id as PackageFilterState['classification'],
                  }))
                }
                className={`py-2 text-xs font-bold rounded-xl transition-all ${
                  filters.classification === tab.id
                    ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Trip Style / Theme
          </label>
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, category: e.target.value }))
            }
            className="w-full text-xs px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
          >
            <option value="all">All Styles & Themes</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Duration
          </label>
          <select
            value={filters.duration}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                duration: e.target.value as PackageFilterState['duration'],
              }))
            }
            className="w-full text-xs px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
          >
            <option value="all">Any Duration</option>
            <option value="short">Short Getaways (1 – 4 Days)</option>
            <option value="medium">Classic Tours (5 – 7 Days)</option>
            <option value="long">Grand Journeys (8+ Days)</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Sort By
          </label>
          <select
            value={filters.priceSort}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                priceSort: e.target.value as PackageFilterState['priceSort'],
              }))
            }
            className="w-full text-xs px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
          >
            <option value="default">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="duration-asc">Duration: Shortest First</option>
            <option value="duration-desc">Duration: Longest First</option>
          </select>
        </div>
      </div>
    </div>
  );
};
