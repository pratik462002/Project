import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Package as PackageIcon,
  MessageSquare,
  Users,
  Settings,
  Plus,
  Eye,
  LogOut,
  ArrowUpRight,
  RefreshCw,
  Download,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';

export const AdminDashboardPage: React.FC = () => {
  const { isAdmin, logout } = useAuth();
  const { packages, enquiries, exportEnquiriesCSV, togglePackageStatus } = useData();
  const { showToast } = useToast();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, navigate]);

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'new').length;
  const domesticCount = packages.filter((p) => p.classification === 'domestic').length;
  const internationalCount = packages.filter((p) => p.classification === 'international').length;

  const handleLogout = () => {
    logout();
    showToast('Logged out of Admin Portal.', 'info');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-16">
      {/* Top Admin Header */}
      <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="InstaHoliday" className="h-9 w-auto bg-white rounded p-0.5" />
          <div>
            <h1 className="text-sm font-bold text-white leading-tight">Admin CMS Console</h1>
            <span className="text-[10px] text-brand-400 font-semibold uppercase tracking-wider">
              InstaHoliday Solutions
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/60 border border-rose-800/40 text-rose-300 hover:bg-rose-900/60 text-xs transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Dashboard Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-slate-850 border border-slate-800 rounded-2xl p-5">
            <span className="text-xs text-slate-400 font-semibold block mb-1">Total Packages</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-white">{packages.length}</span>
              <span className="text-xs text-slate-400">{domesticCount} Dom / {internationalCount} Int</span>
            </div>
          </div>

          <div className="bg-slate-850 border border-slate-800 rounded-2xl p-5">
            <span className="text-xs text-slate-400 font-semibold block mb-1">Customer Leads</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-sun-400">{enquiries.length}</span>
              {newEnquiriesCount > 0 && (
                <span className="text-[10px] bg-sun-500/20 text-sun-300 px-2 py-0.5 rounded-full font-bold">
                  {newEnquiriesCount} New
                </span>
              )}
            </div>
          </div>

          <div className="bg-slate-850 border border-slate-800 rounded-2xl p-5">
            <span className="text-xs text-slate-400 font-semibold block mb-1">Published Online</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-emerald-400">
                {packages.filter((p) => p.status === 'published').length}
              </span>
              <span className="text-xs text-emerald-400/80">Active</span>
            </div>
          </div>

          <div className="bg-slate-850 border border-slate-800 rounded-2xl p-5">
            <span className="text-xs text-slate-400 font-semibold block mb-1">Lead CSV Export</span>
            <button
              onClick={exportEnquiriesCSV}
              className="mt-1 flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-300 font-semibold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Enquiries (.csv)</span>
            </button>
          </div>
        </div>

        {/* Quick Nav Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-slate-800 pb-3">
          <Link
            to="/admin/dashboard"
            className="px-3.5 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold"
          >
            Tour Packages ({packages.length})
          </Link>
          <Link
            to="/admin/enquiries"
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Leads & Enquiries ({enquiries.length})
          </Link>
          <Link
            to="/admin/blogs"
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Blogs & SEO
          </Link>
          <Link
            to="/admin/testimonials"
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Reviews & Ratings
          </Link>
          <Link
            to="/admin/settings"
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Site Settings
          </Link>
          <div className="sm:ml-auto w-full sm:w-auto mt-2 sm:mt-0">
            <Link
              to="/admin/packages/new"
              className="btn-gold text-xs py-2 px-3.5 flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Package</span>
            </Link>
          </div>
        </div>

        {/* Packages Management Table */}
        <div className="bg-slate-850 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <PackageIcon className="w-4 h-4 text-brand-400" />
              <span>Tour Catalog Management</span>
            </h2>
            <span className="text-xs text-slate-400">
              Click edit to modify itineraries, prices, or status
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/60 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Tour Package</th>
                  <th className="py-3 px-4">Region</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {packages.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-white">
                      <div className="flex items-center gap-3">
                        <img
                          src={pkg.heroImage}
                          alt={pkg.title}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-800 shrink-0"
                        />
                        <div>
                          <span className="block font-bold">{pkg.title}</span>
                          <span className="text-[11px] text-slate-400 font-normal">{pkg.destinations}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 capitalize">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        pkg.classification === 'domestic' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/40' : 'bg-brand-950 text-brand-300 border border-brand-800/40'
                      }`}>
                        {pkg.classification}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {pkg.durationNights}N / {pkg.durationDays}D
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-sun-300">
                      {pkg.priceAmount ? `₹${pkg.priceAmount.toLocaleString('en-IN')}` : 'Custom'}
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => togglePackageStatus(pkg.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                          pkg.status === 'published'
                            ? 'bg-emerald-900/60 text-emerald-300 hover:bg-emerald-800'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {pkg.status}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/packages/${pkg.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                          title="Preview public page"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          to={`/admin/packages/edit/${pkg.id}`}
                          className="px-2.5 py-1 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
