import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, MessageCircle, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { Package } from '../../types/package';
import { EnquiryModal } from '../common/EnquiryModal';
import { useData } from '../../context/DataContext';

interface PackageCardProps {
  pkg: Package;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { settings } = useData();

  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const waMessage = `Hi InstaHoliday! I am interested in the ${pkg.title} (${pkg.durationNights}N/${pkg.durationDays}D) package. Please share itinerary & quote details.`;
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMessage)}`;

  return (
    <>
      <div className="card-premium group flex flex-col h-full overflow-hidden relative">
        {/* Badges Overlay */}
        <div className="absolute top-3.5 left-3.5 z-10 flex flex-wrap gap-1.5">
          <span className={`badge-category text-[11px] font-bold ${
            pkg.classification === 'domestic'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-brand-600 text-white shadow-sm'
          }`}>
            {pkg.classification === 'domestic' ? 'Domestic' : 'International'}
          </span>
          {pkg.trending && (
            <span className="badge-category text-[11px] font-bold bg-amber-500 text-white shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Trending
            </span>
          )}
        </div>

        {/* Thumbnail Image */}
        <Link to={`/packages/${pkg.slug}`} className="relative h-56 overflow-hidden block bg-slate-200">
          <img
            src={pkg.heroImage}
            alt={pkg.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

          {/* Duration Badge Bottom Left */}
          <div className="absolute bottom-3 left-3 text-white text-xs font-semibold flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-sun-400" />
            <span>{pkg.durationNights} Nights / {pkg.durationDays} Days</span>
          </div>

          <div className="absolute bottom-3 right-3 text-[11px] font-medium text-slate-200 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
            {pkg.category}
          </div>
        </Link>

        {/* Card Content */}
        <div className="p-5 flex flex-col flex-1 justify-between">
          <div>
            <div className="flex items-center gap-1 text-slate-500 text-xs mb-1.5 line-clamp-1">
              <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0" />
              <span>{pkg.destinations}</span>
            </div>

            <Link to={`/packages/${pkg.slug}`}>
              <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-brand-600 transition-colors line-clamp-2 mb-2">
                {pkg.title}
              </h3>
            </Link>

            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
              {pkg.shortDescription}
            </p>
          </div>

          {/* Pricing & Call to Actions */}
          <div className="pt-3 border-t border-slate-100 mt-auto">
            <div className="flex items-baseline justify-between mb-3">
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Starting From</span>
                {pkg.priceAmount ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-extrabold text-slate-900">
                      ₹{pkg.priceAmount.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-slate-500">{pkg.priceLabel}</span>
                  </div>
                ) : (
                  <span className="text-sm font-bold text-brand-600">Request Custom Quote</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setModalOpen(true)}
                className="btn-primary text-xs py-2 px-3"
              >
                Enquire Now
              </button>
              <Link
                to={`/packages/${pkg.slug}`}
                className="btn-secondary text-xs py-2 px-3 justify-center"
              >
                <span>Details</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-600" />
              </Link>
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      </div>

      <EnquiryModal
        pkg={pkg}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};
