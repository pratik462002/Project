import React, { useState } from 'react';
import { X, CheckCircle2, Phone, Mail, User, Calendar, Users, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Package } from '../../types/package';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';

interface EnquiryModalProps {
  pkg?: Package | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ pkg, isOpen, onClose }) => {
  const { submitEnquiry } = useData();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [travellers, setTravellers] = useState('2');
  const [message, setMessage] = useState('');
  const [botHoneypot, setBotHoneypot] = useState(''); // Anti-spam
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      showToast('Please provide your name and phone number.', 'error');
      return;
    }

    setLoading(true);

    const res = submitEnquiry({
      type: 'package',
      packageId: pkg?.id,
      packageTitle: pkg?.title || 'General Enquiry',
      packageSlug: pkg?.slug,
      name,
      phone,
      email,
      travelDate,
      travellers: Number(travellers) || 2,
      message,
      botHoneypot,
    });

    setLoading(false);

    if (res.success) {
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
      showToast('Enquiry received! Our travel specialist will contact you shortly.', 'success');
    } else {
      showToast(res.error || 'Failed to submit enquiry.', 'error');
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    setEmail('');
    setTravelDate('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-brand-500 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-[11px] uppercase tracking-wider font-bold bg-white/20 text-white px-2.5 py-1 rounded-full">
            Instant Quote & Booking Support
          </span>

          <h3 className="text-xl font-bold mt-2">
            {pkg ? pkg.title : 'Plan Your Dream Holiday'}
          </h3>

          {pkg && (
            <p className="text-xs text-brand-100 mt-1 flex items-center gap-2">
              <span>{pkg.destinations}</span>
              <span>•</span>
              <span>{pkg.durationNights}N / {pkg.durationDays}D</span>
              {pkg.priceAmount && (
                <>
                  <span>•</span>
                  <span className="font-semibold text-sun-300">
                    ₹{pkg.priceAmount.toLocaleString('en-IN')} {pkg.priceLabel}
                  </span>
                </>
              )}
            </p>
          )}
        </div>

        {/* Modal body */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Thank You, {name}!</h4>
              <p className="text-sm text-slate-600 max-w-xs mb-6">
                Your enquiry for <span className="font-semibold text-brand-600">{pkg?.title || 'your holiday'}</span> has been submitted. Our tour coordinator will call or WhatsApp you within 24 hours.
              </p>
              <button onClick={handleReset} className="btn-primary w-full py-2.5">
                Done & Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Anti-spam honeypot */}
              <input
                type="text"
                name="website_url"
                value={botHoneypot}
                onChange={(e) => setBotHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kulkarni"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98227 29072"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tentative Travel Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full text-xs pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Number of Travellers
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={travellers}
                    onChange={(e) => setTravellers(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
                  >
                    <option value="1">1 Person (Solo)</option>
                    <option value="2">2 Persons (Couple / Pair)</option>
                    <option value="3">3 - 4 Persons (Family)</option>
                    <option value="5">5 - 10 Persons (Group)</option>
                    <option value="11">10+ Persons (Large Group / Corporate)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Customization or Special Requests (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us if you need flight ticketing, vegetarian dining, specific hotel tier, or custom pace..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 text-sm font-bold mt-2"
              >
                {loading ? 'Submitting...' : 'Send Free Enquiry'}
                <Send className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-slate-400">
                🔒 We respect your privacy. No spam. Direct consultation from Pune travel desk.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
