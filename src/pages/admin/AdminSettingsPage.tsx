import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Building, Phone, Mail, MapPin, Globe, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { SiteSettings } from '../../types/settings';

export const AdminSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { settings, updateSettings } = useData();
  const { showToast } = useToast();

  const [formData, setFormData] = useState<SiteSettings>({ ...settings });

  if (!isAdmin) {
    navigate('/admin/login');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    showToast('Site settings updated successfully!', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20">
      {/* Top Admin Header */}
      <header className="bg-slate-950 border-b border-slate-800 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <span className="text-slate-600">|</span>
          <span className="text-sm font-bold text-white flex items-center gap-2">
            <Building className="w-4 h-4 text-amber-400" />
            <span>Site & Contact Settings</span>
          </span>
        </div>

        {/* Admin Navigation Hub Links */}
        <div className="flex items-center gap-2 text-xs">
          <Link
            to="/admin/dashboard"
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
          >
            Packages
          </Link>
          <Link
            to="/admin/enquiries"
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
          >
            Leads
          </Link>
          <Link
            to="/admin/blogs"
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
          >
            Blogs & SEO
          </Link>
          <Link
            to="/admin/testimonials"
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
          >
            Reviews
          </Link>
          <Link
            to="/admin/settings"
            className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold"
          >
            Settings
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-8">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-white">Global Site & Company Configuration</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Update phone numbers, WhatsApp links, Pune office address, and social proof counters displayed site-wide.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-850 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          {/* General Branding */}
          <div className="border-b border-slate-800 pb-6">
            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Company Branding</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Tagline / Header Slogan
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="border-b border-slate-800 pb-6">
            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>Contact Channels & WhatsApp</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Primary Phone
                </label>
                <input
                  type="text"
                  value={formData.phonePrimary}
                  onChange={(e) => setFormData({ ...formData, phonePrimary: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Secondary Phone
                </label>
                <input
                  type="text"
                  value={formData.phoneSecondary}
                  onChange={(e) => setFormData({ ...formData, phoneSecondary: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Office Working Hours
                </label>
                <input
                  type="text"
                  value={formData.officeHours}
                  onChange={(e) => setFormData({ ...formData, officeHours: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Pune Office Address
              </label>
              <textarea
                rows={2}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full text-xs p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Trust Numbers & Stats */}
          <div className="pb-2">
            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Trust Statistics & Social Proof</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  Happy Travellers
                </label>
                <input
                  type="text"
                  value={formData.stats.happyTravellers}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: { ...formData.stats, happyTravellers: e.target.value },
                    })
                  }
                  className="w-full text-xs px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  Tours Completed
                </label>
                <input
                  type="text"
                  value={formData.stats.toursCompleted}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: { ...formData.stats, toursCompleted: e.target.value },
                    })
                  }
                  className="w-full text-xs px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  Destinations
                </label>
                <input
                  type="text"
                  value={formData.stats.destinations}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: { ...formData.stats, destinations: e.target.value },
                    })
                  }
                  className="w-full text-xs px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  Star Rating
                </label>
                <input
                  type="text"
                  value={formData.stats.rating}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: { ...formData.stats, rating: e.target.value },
                    })
                  }
                  className="w-full text-xs px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-800">
            <Link
              to="/admin/dashboard"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="btn-gold py-2.5 px-6 text-xs font-bold flex items-center gap-2 shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
