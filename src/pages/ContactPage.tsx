import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';

export const ContactPage: React.FC = () => {
  const { settings, submitEnquiry } = useData();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [botHoneypot, setBotHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const cleanPhone = settings.phonePrimary.replace(/[^0-9]/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      showToast('Name and Phone number are required.', 'error');
      return;
    }

    setLoading(true);
    const res = submitEnquiry({
      type: 'contact',
      name,
      phone,
      email,
      message,
      botHoneypot,
    });
    setLoading(false);

    if (res.success) {
      setSubmitted(true);
      showToast('Message sent! Our travel desk will contact you shortly.', 'success');
    } else {
      showToast(res.error || 'Failed to submit message.', 'error');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-wider text-brand-600 block mb-2">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Contact InstaHoliday Solutions
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Have a question about a destination, visa requirements, or customized itineraries? Reach out directly to our Pune office.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Office Details Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-6 font-display">
                Pune Head Office
              </h3>

              <div className="space-y-6 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Physical Address:</strong>
                    <p className="leading-relaxed">{settings.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Phone Lines:</strong>
                    <p>
                      Primary: <a href={`tel:${settings.phonePrimary}`} className="text-brand-600 hover:underline">{settings.phonePrimary}</a>
                    </p>
                    <p>
                      Alternate: <a href={`tel:${settings.phoneSecondary}`} className="text-brand-600 hover:underline">{settings.phoneSecondary}</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Email Support:</strong>
                    <a href={`mailto:${settings.email}`} className="text-brand-600 hover:underline">
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Consultation Timings:</strong>
                    <p>{settings.officeHours}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${cleanPhone}?text=Hi%20InstaHoliday!%20I%20have%20an%20enquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold flex-1 py-3 text-xs justify-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant WhatsApp Chat</span>
              </a>
              <a
                href={`tel:${settings.phonePrimary}`}
                className="btn-primary flex-1 py-3 text-xs justify-center"
              >
                <Phone className="w-4 h-4" />
                <span>Call Directly</span>
              </a>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">
              Send an Enquiry
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Drop us a message and our tour specialist will get back to you with answers and options.
            </p>

            {submitted ? (
              <div className="py-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Message Received</h4>
                <p className="text-xs text-slate-600 max-w-xs mb-6">
                  Thank you for reaching out, {name}. Our travel consultant will be in touch shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-primary text-xs py-2 px-5"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="website_url"
                  value={botHoneypot}
                  onChange={(e) => setBotHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98227 29072"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
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
                      className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Message / Question
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what destination or holiday package you are inquiring about..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3 text-xs font-bold"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
