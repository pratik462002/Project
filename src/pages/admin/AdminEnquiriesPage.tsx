import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Trash2, CheckCircle, Clock, Phone, Mail, MessageCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { EnquiryStatus } from '../../types/enquiry';

export const AdminEnquiriesPage: React.FC = () => {
  const { isAdmin } = useAuth();
  const { enquiries, updateEnquiryStatus, deleteEnquiry, exportEnquiriesCSV, settings } = useData();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [filterStatus, setFilterStatus] = useState<string>('all');

  React.useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, navigate]);

  const filtered = enquiries.filter((e) => {
    if (filterStatus === 'all') return true;
    return e.status === filterStatus;
  });

  const handleStatusChange = (id: string, status: EnquiryStatus) => {
    updateEnquiryStatus(id, status);
    showToast(`Enquiry marked as ${status}`, 'info');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this customer enquiry record?')) {
      deleteEnquiry(id);
      showToast('Enquiry deleted.', 'info');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20">
      <header className="bg-slate-950 border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <span className="text-slate-700">|</span>
          <span className="text-sm font-bold text-white">Customer Enquiries & Leads</span>
        </div>

        <button
          onClick={exportEnquiriesCSV}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {['all', 'new', 'contacted', 'quoted', 'booked', 'closed'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                filterStatus === st
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {st} ({st === 'all' ? enquiries.length : enquiries.filter((e) => e.status === st).length})
            </button>
          ))}
        </div>

        {/* Enquiries List */}
        <div className="bg-slate-850 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-xs">
              No enquiries found in this category.
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {filtered.map((enq) => {
                const cleanPhone = enq.phone.replace(/[^0-9]/g, '');
                return (
                  <div key={enq.id} className="p-5 hover:bg-slate-800/40 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h3 className="font-bold text-sm text-white">{enq.name}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            enq.status === 'new' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                            enq.status === 'booked' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                            'bg-slate-800 text-slate-400'
                          }`}>
                            {enq.status}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {new Date(enq.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <span className="text-xs text-brand-400 font-semibold mt-0.5 block">
                          {enq.type === 'package' ? `Tour: ${enq.packageTitle}` : `Custom Plan: ${enq.destination || 'Unspecified'}`}
                        </span>
                      </div>

                      {/* Action status selector & buttons */}
                      <div className="flex items-center gap-2">
                        <select
                          value={enq.status}
                          onChange={(e) => handleStatusChange(enq.id, e.target.value as EnquiryStatus)}
                          className="text-xs bg-slate-900 border border-slate-700 text-slate-200 px-2.5 py-1.5 rounded-lg focus:outline-none"
                        >
                          <option value="new">New Lead</option>
                          <option value="contacted">Contacted</option>
                          <option value="quoted">Quoted</option>
                          <option value="booked">Booked</option>
                          <option value="closed">Closed</option>
                        </select>

                        <a
                          href={`https://wa.me/${cleanPhone}?text=Hi%20${encodeURIComponent(enq.name)}%2C%20this%20is%20InstaHoliday%20regarding%20your%20trip%20enquiry.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300"
                          title="WhatsApp guest"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>

                        <a
                          href={`tel:${enq.phone}`}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                          title="Call guest"
                        >
                          <Phone className="w-4 h-4" />
                        </a>

                        <button
                          onClick={() => handleDelete(enq.id)}
                          className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300"
                          title="Delete enquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Details row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800 mb-2">
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase">Phone:</span>
                        <span className="text-white font-medium">{enq.phone}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase">Email:</span>
                        <span className="text-white font-medium">{enq.email || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase">Travel Date:</span>
                        <span className="text-white font-medium">{enq.travelDate || 'Flexible'}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase">Guests:</span>
                        <span className="text-white font-medium">{enq.travellers || 2} Pax</span>
                      </div>
                    </div>

                    {enq.message && (
                      <p className="text-xs text-slate-300 italic bg-slate-900/30 p-2.5 rounded-lg border border-slate-800/60">
                        "{enq.message}"
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
