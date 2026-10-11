import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Calendar,
  Bus,
  Bed,
  CheckCircle2,
  MessageCircle,
  Phone,
  Sparkles,
  ArrowLeft,
  Share2,
  ChevronRight,
  ShieldAlert,
  Send,
  HelpCircle,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { ItineraryAccordion } from '../components/packages/ItineraryAccordion';
import { InclusionsExclusions } from '../components/packages/InclusionsExclusions';
import { EnquiryModal } from '../components/common/EnquiryModal';
import { PackageCard } from '../components/packages/PackageCard';
import { useToast } from '../context/ToastContext';

export const PackageDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { packages, settings } = useData();
  const { showToast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string>('');

  const pkg = packages.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (pkg) {
      setActiveImage(pkg.heroImage);
    }
  }, [slug, pkg]);

  if (!pkg) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Package Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">The requested tour package could not be located or has moved.</p>
        <Link to="/packages" className="btn-primary py-2.5 px-6">
          Browse All Packages
        </Link>
      </div>
    );
  }

  const cleanPhone = settings.phonePrimary.replace(/[^0-9]/g, '');
  const waMessage = `Hi InstaHoliday! I would like to book or enquire about the ${pkg.title} (${pkg.durationNights}N/${pkg.durationDays}D) package.`;
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMessage)}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: pkg.title,
        text: pkg.shortDescription,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!', 'info');
    }
  };

  const relatedPackages = packages
    .filter((p) => p.id !== pkg.id && (p.classification === pkg.classification || p.category === pkg.category))
    .slice(0, 3);

  const allImages = [pkg.heroImage, ...(pkg.galleryImages || [])];

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link to="/packages" className="hover:text-brand-600 transition-colors">Packages</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link
              to={pkg.classification === 'domestic' ? '/domestic' : '/international'}
              className="hover:text-brand-600 transition-colors capitalize"
            >
              {pkg.classification}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-semibold line-clamp-1">{pkg.title}</span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-brand-600 transition-colors text-xs font-semibold"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>

        {/* Title Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <span className={`badge-category text-xs font-bold ${
              pkg.classification === 'domestic' ? 'bg-emerald-600 text-white' : 'bg-brand-600 text-white'
            }`}>
              {pkg.classification === 'domestic' ? 'Domestic India' : 'International Tour'}
            </span>
            <span className="badge-category text-xs font-bold bg-slate-200 text-slate-800">
              {pkg.category}
            </span>
            {pkg.trending && (
              <span className="badge-category text-xs font-bold bg-amber-500 text-white flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Trending
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3">
            {pkg.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-600">
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-brand-500" />
              {pkg.destinations}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-amber-500" />
              {pkg.durationNights} Nights / {pkg.durationDays} Days
            </span>
            {pkg.departureDates && (
              <span className="flex items-center gap-1.5 font-medium text-slate-500">
                <Calendar className="w-4 h-4 text-sky-500" />
                Departures: {pkg.departureDates}
              </span>
            )}
          </div>
        </div>

        {/* Hero Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">
          <div className="lg:col-span-2 h-[340px] sm:h-[460px] rounded-3xl overflow-hidden shadow-md bg-slate-900 relative">
            <img
              src={activeImage || pkg.heroImage}
              alt={pkg.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none"></div>
          </div>

          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto max-h-[460px] pb-2 lg:pb-0">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`h-24 lg:h-28 w-36 lg:w-full rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                  activeImage === img ? 'border-brand-500 ring-2 ring-brand-500/30' : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`${pkg.title} thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Layout with Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column (2 Cols): Tour Details */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            {/* Quick Specs Highlight Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">Duration</span>
                  <span className="text-sm font-bold text-slate-900">{pkg.durationNights}N / {pkg.durationDays}D</span>
                  <span className="text-xs text-slate-500 block">Round-trip trip flow</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Bus className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">Transport</span>
                  <span className="text-sm font-bold text-slate-900 line-clamp-1">{pkg.transportDetails || 'AC Vehicle Transfers'}</span>
                  <span className="text-xs text-slate-500 block">Dedicated driver-guide</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Bed className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">Stay Category</span>
                  <span className="text-sm font-bold text-slate-900 line-clamp-1">{pkg.accommodationDetails || '3-Star / 4-Star Premium'}</span>
                  <span className="text-xs text-slate-500 block">Hygiene verified stays</span>
                </div>
              </div>
            </div>

            {/* Overview / Full Description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-3 pb-3 border-b border-slate-100">
                Tour Overview & Highlights
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {pkg.fullDescription || pkg.shortDescription}
              </p>
            </div>

            {/* Day Wise Itinerary Accordion */}
            {pkg.itinerary && pkg.itinerary.length > 0 && (
              <ItineraryAccordion itinerary={pkg.itinerary} />
            )}

            {/* Inclusions & Exclusions */}
            <InclusionsExclusions
              inclusions={pkg.inclusions || []}
              exclusions={pkg.exclusions || []}
            />

            {/* FAQs if present */}
            {pkg.faqs && pkg.faqs.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                  <HelpCircle className="w-5 h-5 text-brand-600" />
                  <h3 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h3>
                </div>
                <div className="flex flex-col gap-4">
                  {pkg.faqs.map((faq, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <h4 className="font-bold text-sm text-slate-900 mb-1">{faq.question}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Booking Policies */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm text-xs text-slate-600 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Booking Terms & Cancellation Policy
              </h3>
              <div>
                <strong className="text-slate-800 block mb-1">Payment & Confirmation:</strong>
                <p>{pkg.bookingTerms || 'A minimum deposit of 25% to 50% is required at the time of confirmation. Balance amount must be cleared before voucher release.'}</p>
              </div>
              <div>
                <strong className="text-slate-800 block mb-1">Cancellation Terms:</strong>
                <p>{pkg.cancellationPolicy || 'Cancellations 30 days prior: Token refund minus service charge. Less than 15 days: Non-refundable hotel/flight charges apply as per vendor policies.'}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 flex flex-col gap-6">
              {/* Pricing & Booking Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xl relative overflow-hidden">
                <div className="mb-4">
                  <span className="text-xs text-slate-400 font-semibold block uppercase tracking-wider">
                    Package Price
                  </span>
                  {pkg.priceAmount ? (
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-3xl font-black text-slate-900">
                        ₹{pkg.priceAmount.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {pkg.priceLabel || 'per person'}
                      </span>
                    </div>
                  ) : (
                    <div className="text-xl font-bold text-brand-600 mt-1">
                      Custom Quotation on Request
                    </div>
                  )}

                  {pkg.priceValidity && (
                    <p className="text-[11px] text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg mt-2 inline-block border border-amber-200">
                      ⏱ {pkg.priceValidity}
                    </p>
                  )}
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="btn-primary w-full py-3.5 text-sm font-bold shadow-lg shadow-brand-500/25"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enquire / Request Quote</span>
                  </button>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors text-xs shadow-md shadow-emerald-600/20"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${settings.phonePrimary}`}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors text-xs"
                  >
                    <Phone className="w-4 h-4 text-brand-600" />
                    <span>Call: {settings.phonePrimary}</span>
                  </a>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Zero booking fees or surprise markups</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>100% customizable to your family's pace</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Dedicated Pune operations manager</span>
                  </div>
                </div>
              </div>

              {/* Need Help Card */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800">
                <h4 className="font-bold text-sm mb-1">Need a Custom Itinerary?</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Travelling with elderly parents, children, or seeking private luxury vehicles? Let our destination specialist design it for you.
                </p>
                <Link
                  to="/plan-your-trip"
                  className="btn-gold w-full py-2.5 text-xs font-bold"
                >
                  Open Custom Trip Planner
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Tour Packages */}
        {relatedPackages.length > 0 && (
          <div className="mt-20 pt-12 border-t border-slate-200">
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight font-display mb-6">
              You Might Also Like
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPackages.map((p) => (
                <PackageCard key={p.id} pkg={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <EnquiryModal
        pkg={pkg}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};
