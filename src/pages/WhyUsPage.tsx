import React from 'react';
import { Link } from 'react-router-dom';
import { WhyUsSection } from '../components/home/WhyUsSection';
import { ShieldCheck, FileText, RefreshCw, HelpCircle, ArrowRight } from 'lucide-react';

export const WhyUsPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Why Us section components */}
        <WhyUsSection />

        {/* Policies and Booking Guarantees */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm mt-12">
          <h2 className="text-2xl font-bold text-slate-900 font-display mb-6">
            Transparent Booking & Cancellation Guidelines
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-brand-600 font-bold">
                <FileText className="w-4 h-4" />
                <span>Confirmation Deposit Terms</span>
              </div>
              <p>
                Booking confirmations are secured upon payment of the initial reservation token (25% to 50% depending on airline and peak seasonal resort requirements). The balance amount is payable prior to document and voucher dispatch.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-rose-600 font-bold">
                <RefreshCw className="w-4 h-4" />
                <span>Fair Cancellation Policy</span>
              </div>
              <p>
                We understand unexpected emergencies happen. Cancellations processed 30+ days in advance retain credit or receive full refunds less minimal third-party non-refundable flight/hotel fees. Full transparency is provided on every voucher.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link to="/plan-your-trip" className="btn-primary py-3 px-6 text-xs font-bold inline-flex items-center gap-2">
              <span>Ready to Plan? Start Customizing Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
