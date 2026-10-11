import React, { useState } from 'react';
import { ChevronDown, MapPin, Utensils, Bed, Compass } from 'lucide-react';
import { ItineraryDay } from '../../types/package';

interface ItineraryAccordionProps {
  itinerary: ItineraryDay[];
}

export const ItineraryAccordion: React.FC<ItineraryAccordionProps> = ({ itinerary }) => {
  // Keep first 2 days open by default
  const [openDays, setOpenDays] = useState<number[]>([1, 2]);

  const toggleDay = (dayNum: number) => {
    setOpenDays((prev) =>
      prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum]
    );
  };

  const expandAll = () => {
    setOpenDays(itinerary.map((d) => d.day));
  };

  const collapseAll = () => {
    setOpenDays([]);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-brand-600" />
          <h3 className="text-lg font-bold text-slate-900">Day-by-Day Tour Itinerary</h3>
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold">
          <button
            onClick={expandAll}
            className="text-brand-600 hover:text-brand-800 transition-colors"
          >
            Expand All
          </button>
          <span className="text-slate-300">|</span>
          <button
            onClick={collapseAll}
            className="text-slate-500 hover:text-slate-800 transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {itinerary.map((day) => {
          const isOpen = openDays.includes(day.day);
          return (
            <div
              key={day.day}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'border-brand-200 bg-white shadow-sm ring-1 ring-brand-500/10'
                  : 'border-slate-200 bg-slate-50/60 hover:bg-slate-50'
              }`}
            >
              <button
                onClick={() => toggleDay(day.day)}
                className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
              >
                <div className="flex items-center gap-3.5 pr-4">
                  <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-extrabold shrink-0 transition-colors ${
                    isOpen
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    D{day.day}
                  </span>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 block">
                      Day {day.day}
                    </span>
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                      {day.title}
                    </h4>
                  </div>
                </div>

                <div className={`p-1.5 rounded-lg text-slate-400 transition-transform duration-200 shrink-0 ${
                  isOpen ? 'rotate-180 text-brand-600 bg-brand-50' : ''
                }`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                  <p className="whitespace-pre-line mb-3.5">{day.details}</p>

                  <div className="flex flex-wrap items-center gap-3 text-xs pt-2 border-t border-slate-100 text-slate-500">
                    {day.meals && (
                      <div className="flex items-center gap-1.5 bg-amber-50 text-amber-800 px-2.5 py-1 rounded-lg font-medium border border-amber-200/60">
                        <Utensils className="w-3.5 h-3.5 text-amber-600" />
                        <span>Meals: {day.meals}</span>
                      </div>
                    )}
                    {day.stay && (
                      <div className="flex items-center gap-1.5 bg-sky-50 text-sky-800 px-2.5 py-1 rounded-lg font-medium border border-sky-200/60">
                        <Bed className="w-3.5 h-3.5 text-sky-600" />
                        <span>Overnight: {day.stay}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
