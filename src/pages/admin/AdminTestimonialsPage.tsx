import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Search, Edit3, Trash2, Star, MapPin, Quote, User, Sparkles, X, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Testimonial } from '../../data/seedTestimonials';

export const AdminTestimonialsPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { testimonials, saveTestimonial, deleteTestimonial, packages } = useData();
  const { showToast } = useToast();

  const [search, setSearch] = useState('');
  const [editingItem, setEditingItem] = useState<Partial<Testimonial> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isAdmin) {
    navigate('/admin/login');
    return null;
  }

  const filtered = testimonials.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.location.toLowerCase().includes(search.toLowerCase()) ||
    t.tripTitle.toLowerCase().includes(search.toLowerCase()) ||
    t.comment.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenNew = () => {
    setEditingItem({
      name: '',
      location: 'Kothrud, Pune',
      tripTitle: packages[0]?.title || 'Kerala Tour',
      packageSlug: packages[0]?.slug || 'kerala',
      comment: '',
      date: 'Recent 2026',
      rating: 5,
      photoUrl: '/media/group-dubai-1.jpg',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: Testimonial) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete review from "${name}"?`)) {
      deleteTestimonial(id);
      showToast('Review deleted successfully.', 'info');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.name?.trim() || !editingItem?.comment?.trim()) {
      showToast('Name and comment are required.', 'error');
      return;
    }

    saveTestimonial(editingItem);
    showToast('Testimonial saved successfully!', 'success');
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20">
      {/* Top Admin Bar */}
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
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Customer Reviews & Testimonials</span>
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
            className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold"
          >
            Reviews
          </Link>
          <Link
            to="/admin/settings"
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
          >
            Settings
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-white">Pune Guest Reviews & Ratings</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Add genuine feedback from families, senior citizens, and groups to show social proof on the website.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-xs pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-400 w-48 sm:w-64"
              />
            </div>
            <button
              onClick={handleOpenNew}
              className="btn-gold py-2 px-4 text-xs font-bold flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add Testimonial</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-slate-850 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400">{item.date}</span>
                </div>

                <p className="text-xs text-slate-300 italic leading-relaxed mb-4 line-clamp-4">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.photoUrl}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-400/30"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{item.name}</h4>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Edit review"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.name)}
                    className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 hover:text-rose-300 transition-colors"
                    title="Delete review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit / Add Testimonial Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 my-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span>{editingItem.id ? 'Edit Review' : 'Add Guest Review'}</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Customer / Family Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.name || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  placeholder="e.g. Ramesh & Priya Kulkarni"
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Location in Pune
                  </label>
                  <input
                    type="text"
                    value={editingItem.location || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    placeholder="e.g. Kothrud, Baner, PCMC"
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Tour Taken
                  </label>
                  <input
                    type="text"
                    value={editingItem.tripTitle || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, tripTitle: e.target.value })}
                    placeholder="e.g. Dubai 5N6D Tour"
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Star Rating (1 - 5)
                  </label>
                  <select
                    value={editingItem.rating || 5}
                    onChange={(e) => setEditingItem({ ...editingItem, rating: Number(e.target.value) })}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Date / Month
                  </label>
                  <input
                    type="text"
                    value={editingItem.date || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                    placeholder="e.g. January 2026"
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Customer Avatar / Photo URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingItem.photoUrl || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, photoUrl: e.target.value })}
                    className="flex-1 text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                  {editingItem.photoUrl && (
                    <img
                      src={editingItem.photoUrl}
                      alt="preview"
                      className="w-10 h-10 rounded-full object-cover border border-slate-700"
                    />
                  )}
                </div>

                {/* Preset Avatars */}
                <div className="flex gap-2 mt-2">
                  {[
                    '/media/group-dubai-1.jpg',
                    '/media/group-kerala-1.jpg',
                    '/media/group-kanyakumari-1.jpg',
                    '/media/group-dubai-2.jpg',
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setEditingItem({ ...editingItem, photoUrl: preset })}
                      className="w-8 h-8 rounded-full overflow-hidden border border-slate-700 hover:ring-2 hover:ring-amber-400"
                    >
                      <img src={preset} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Review Comment *
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingItem.comment || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, comment: e.target.value })}
                  placeholder="Share details of the tour experience..."
                  className="w-full text-xs p-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold py-2 px-5 text-xs font-bold flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
