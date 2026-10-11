import React, { useState } from 'react';
import { Calendar, Users, MapPin, DollarSign, Hotel, Sparkles, Send, CheckCircle2, Phone, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';

export const CustomTripPage: React.FC = () => {
  const { submitEnquiry, settings } = useData();
  const { showToast } = useToast();

  const [destination, setDestination] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [duration, setDuration] = useState('5 - 7 Days');
  const [travellers, setTravellers] = useState('2');
  const [children, setChildren] = useState('0');
  const [hotelPreference, setHotelPreference] = useState('4-Star Premium');
  const [budget, setBudget] = useState('₹40,000 - ₹75,000 per person');
  const [message, setMessage] = useState('');
  const [botHoneypot, setBotHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const cleanPhone = settings.phonePrimary.replace(/[^0-9]/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !destination.trim()) {
      showToast('Please provide your name, phone number, and destination.', 'error');
      return;
    }

    setLoading(true);

    const res = submitEnquiry({
      type: 'custom_trip',
      destination,
      name,
      phone,
      email,
      travelDate,
      duration,
      travellers: Number(travellers),
      children: Number(children),
      hotelPreference,
      budget,
      message,
      botHoneypot,
    });

    setLoading(false);

    if (res.success) {
      setSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      showToast('Custom trip request submitted! We will send a customized proposal shortly.', 'success');
    } else {
      showToast(res.error || 'Failed to submit request.', 'error');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tailor-Made Vacation Planner</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Plan Your Custom Holiday
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Tell us about your dream getaway. Our Pune travel specialists will curate a personalized day-wise itinerary, private cabs, and handpicked stays within 24 hours.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10">
          {submitted ? (
            <div className="py-12 text-center flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Request Received, {name}!</h2>
              <p className="text-sm text-slate-600 max-w-md mb-8 leading-relaxed">
                Thank you for choosing InstaHoliday Solutions. Our destination specialist is already reviewing your preferences for <strong className="text-brand-600">{destination}</strong>. We will contact you at {phone}.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`https://wa.me/${cleanPhone}?text=Hi%20InstaHoliday!%20I%20just%20submitted%20a%20custom%20trip%20request%20for%20${encodeURIComponent(destination)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 btn-gold px-6 py-3 text-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect on WhatsApp Instantly</span>
                </a>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary px-6 py-3 text-xs"
                >
                  Submit Another Itinerary
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Dream Destination(s) *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-brand-500 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kerala, Dubai, Vietnam, Kashmir..."
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full text-xs pl-9 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Tentative Travel Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-brand-500 absolute left-3 top-3.5" />
                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full text-xs pl-9 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Trip Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full text-xs px-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
                  >
                    <option value="3 - 4 Days">3 - 4 Days (Weekend Escape)</option>
                    <option value="5 - 7 Days">5 - 7 Days (Standard Tour)</option>
                    <option value="8 - 10 Days">8 - 10 Days (Extended Holiday)</option>
                    <option value="11+ Days">11+ Days (Grand Journey)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Adults (12+ Yrs)
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-brand-500 absolute left-3 top-3.5" />
                    <select
                      value={travellers}
                      onChange={(e) => setTravellers(e.target.value)}
                      className="w-full text-xs pl-9 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 Persons (Couple)</option>
                      <option value="3">3 Persons</option>
                      <option value="4">4 Persons</option>
                      <option value="5">5 - 8 Persons</option>
                      <option value="10">10+ Persons (Group)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Children (Below 12)
                  </label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(e.target.value)}
                    className="w-full text-xs px-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
                  >
                    <option value="0">0 Children</option>
                    <option value="1">1 Child</option>
                    <option value="2">2 Children</option>
                    <option value="3">3+ Children</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Preferred Hotel Category
                  </label>
                  <div className="relative">
                    <Hotel className="w-4 h-4 text-brand-500 absolute left-3 top-3.5" />
                    <select
                      value={hotelPreference}
                      onChange={(e) => setHotelPreference(e.target.value)}
                      className="w-full text-xs pl-9 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
                    >
                      <option value="3-Star Comfortable">3-Star Standard / Boutique</option>
                      <option value="4-Star Premium">4-Star Deluxe / Premium</option>
                      <option value="5-Star Luxury">5-Star Luxury Resorts & Heritage</option>
                      <option value="Homestays & Villas">Private Villas / Homestays</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Approximate Budget Per Person
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-brand-500 absolute left-3 top-3.5" />
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full text-xs pl-9 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
                    >
                      <option value="Under ₹25,000">Under ₹25,000</option>
                      <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                      <option value="₹50,000 - ₹80,000">₹50,000 - ₹80,000</option>
                      <option value="₹80,000 - ₹1,50,000">₹80,000 - ₹1,50,000</option>
                      <option value="₹1,50,000+ (Luxury)">₹1,50,000+ (Luxury / Europe)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 mb-3">Your Contact Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patel"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs px-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98227 29072"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs px-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs px-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Specific Requests (Sightseeings, food preferences, flight requirements)
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us what matters most: e.g. Jain / Pure Veg meals, sea view room, private cab with child seat, fast-track Burj Khalifa passes..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs p-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-4 text-sm font-bold shadow-xl shadow-brand-500/25"
              >
                {loading ? 'Submitting Request...' : 'Get My Custom Vacation Proposal'}
                <Send className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-slate-400">
                ✨ Free consultation. No payment required to generate itinerary proposal.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
