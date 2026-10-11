import React, { useState } from 'react';
import { Check, X, ShieldAlert, Sparkles } from 'lucide-react';

interface InclusionsExclusionsProps {
  inclusions: string[];
  exclusions: string[];
}

export const InclusionsExclusions: React.FC<InclusionsExclusionsProps> = ({
  inclusions,
  exclusions,
}) => {
  const [activeTab, setActiveTab] = useState<'both' | 'inc' | 'exc'>('both');

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-brand-600 block mb-1">
            Transparent Pricing Policy
          </span>
          <h3 className="text-xl font-bold text-slate-900">What's Included & Excluded</h3>
        </div>

        {/* Tab Switcher for mobile/compact viewing */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveTab('both')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'both' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Details
          </button>
          <button
            onClick={() => setActiveTab('inc')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'inc' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Inclusions Only
          </button>
          <button
            onClick={() => setActiveTab('exc')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'exc' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Exclusions Only
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
        {/* Inclusions */}
        {(activeTab === 'both' || activeTab === 'inc') && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-100">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Included in Your Package</span>
            </div>

            <ul className="flex flex-col gap-2.5 mt-2">
              {inclusions.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Exclusions */}
        {(activeTab === 'both' || activeTab === 'exc') && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-sm bg-rose-50 px-3 py-2 rounded-xl border border-rose-100">
              <X className="w-4 h-4 text-rose-600" />
              <span>Not Included / Exclusions</span>
            </div>

            <ul className="flex flex-col gap-2.5 mt-2">
              {exclusions.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 leading-relaxed"
                >
                  <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3 h-3" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-3 text-xs text-slate-500">
        <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
        <span>Customizable options available upon request during booking consultation.</span>
      </div>
    </div>
  );
};
