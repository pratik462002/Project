import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Trash2, Plus, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Package, ItineraryDay } from '../../types/package';

export const AdminPackageEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { packages, savePackage, deletePackage } = useData();
  const { showToast } = useToast();

  const isNew = !id || id === 'new';
  const existing = packages.find((p) => p.id === id);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [classification, setClassification] = useState<'domestic' | 'international'>('domestic');
  const [category, setCategory] = useState('General');
  const [destinations, setDestinations] = useState('');
  const [durationNights, setDurationNights] = useState(3);
  const [durationDays, setDurationDays] = useState(4);
  const [priceAmount, setPriceAmount] = useState<string>('');
  const [priceLabel, setPriceLabel] = useState('per person');
  const [heroImage, setHeroImage] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [newGalleryInput, setNewGalleryInput] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [inclusionsText, setInclusionsText] = useState('');
  const [exclusionsText, setExclusionsText] = useState('');
  const [status, setStatus] = useState<Package['status']>('published');
  const [featured, setFeatured] = useState(false);
  const [trending, setTrending] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
      return;
    }

    if (existing) {
      setTitle(existing.title);
      setSlug(existing.slug);
      setClassification(existing.classification);
      setCategory(existing.category);
      setDestinations(existing.destinations);
      setDurationNights(existing.durationNights);
      setDurationDays(existing.durationDays);
      setPriceAmount(existing.priceAmount ? String(existing.priceAmount) : '');
      setPriceLabel(existing.priceLabel || 'per person');
      setHeroImage(existing.heroImage);
      setGalleryImages(existing.galleryImages || []);
      setShortDescription(existing.shortDescription);
      setFullDescription(existing.fullDescription);
      setInclusionsText((existing.inclusions || []).join('\n'));
      setExclusionsText((existing.exclusions || []).join('\n'));
      setStatus(existing.status);
      setFeatured(existing.featured || false);
      setTrending(existing.trending || false);
    }
  }, [existing, isAdmin, navigate]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Title is required.', 'error');
      return;
    }

    const inclusions = inclusionsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const exclusions = exclusionsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const saved = savePackage({
      id: isNew ? undefined : id,
      title: title.trim(),
      slug: slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      classification,
      category,
      destinations,
      durationNights: Number(durationNights),
      durationDays: Number(durationDays),
      priceAmount: priceAmount ? Number(priceAmount) : null,
      priceLabel,
      heroImage: heroImage.trim() || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
      galleryImages,
      shortDescription,
      fullDescription,
      inclusions,
      exclusions,
      status,
      featured,
      trending,
      itinerary: existing?.itinerary || [
        { day: 1, title: 'Arrival & Welcome', details: 'Meet your tour representative and transfer to hotel.' },
      ],
    });

    showToast('Package saved successfully!', 'success');
    navigate('/admin/dashboard');
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      if (id) {
        deletePackage(id);
        showToast('Package deleted.', 'info');
        navigate('/admin/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20">
      <header className="bg-slate-950 border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
        <span className="text-sm font-bold text-white">
          {isNew ? 'Create New Tour Package' : `Editing: ${title}`}
        </span>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-8">
        <form onSubmit={handleSave} className="bg-slate-850 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Tour Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                URL Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="auto-generated-if-empty"
                className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Classification
              </label>
              <select
                value={classification}
                onChange={(e) => setClassification(e.target.value as any)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="domestic">Domestic India</option>
                <option value="international">International Global</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Destinations
              </label>
              <input
                type="text"
                value={destinations}
                onChange={(e) => setDestinations(e.target.value)}
                placeholder="e.g. Cochin, Munnar, Alleppey"
                className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Nights
              </label>
              <input
                type="number"
                min="1"
                value={durationNights}
                onChange={(e) => setDurationNights(Number(e.target.value))}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Days
              </label>
              <input
                type="number"
                min="1"
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Price (INR)
              </label>
              <input
                type="number"
                placeholder="Leave blank for Custom"
                value={priceAmount}
                onChange={(e) => setPriceAmount(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Price Label
              </label>
              <input
                type="text"
                value={priceLabel}
                onChange={(e) => setPriceLabel(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Hero Cover Image & Gallery Manager */}
          <div className="space-y-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-700/60">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Hero Main Cover Image URL *
              </label>
              <div className="flex gap-3">
                <input
                  type="url"
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="flex-1 text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
                {heroImage && (
                  <img
                    src={heroImage}
                    alt="Cover preview"
                    className="w-16 h-10 object-cover rounded-lg border border-slate-700 shrink-0"
                  />
                )}
              </div>
            </div>

            {/* Tour Gallery Images */}
            <div className="pt-3 border-t border-slate-800">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Tour Photo Gallery ({galleryImages.length} images)
              </label>
              <p className="text-[11px] text-slate-400 mb-3">
                Add high-resolution destination photos to showcase on the package detail page gallery.
              </p>

              {/* Add image input bar */}
              <div className="flex gap-2 mb-4">
                <input
                  type="url"
                  value={newGalleryInput}
                  onChange={(e) => setNewGalleryInput(e.target.value)}
                  placeholder="Paste destination image URL..."
                  className="flex-1 text-xs px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newGalleryInput.trim()) {
                      setGalleryImages([...galleryImages, newGalleryInput.trim()]);
                      setNewGalleryInput('');
                    }
                  }}
                  className="btn-secondary text-xs px-4 py-2 shrink-0 flex items-center gap-1 font-bold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Photo</span>
                </button>
              </div>

              {/* Quick Preset Buttons */}
              <div className="mb-4">
                <span className="text-[10px] uppercase font-bold text-slate-400 mr-2">Quick Presets:</span>
                <div className="inline-flex flex-wrap gap-1.5 mt-1">
                  {[
                    { label: '+ Dubai Skyline', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80' },
                    { label: '+ Kerala Backwaters', url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80' },
                    { label: '+ Swiss Alps', url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80' },
                    { label: '+ Vietnam Bay', url: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80' },
                    { label: '+ Bali Beach', url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80' },
                    { label: '+ Andaman Reef', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80' },
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setGalleryImages([...galleryImages, preset.url])}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 font-semibold border border-slate-700 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gallery Image Grid with delete buttons */}
              {galleryImages.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {galleryImages.map((imgUrl, index) => (
                    <div
                      key={index}
                      className="group relative rounded-xl overflow-hidden aspect-video border border-slate-700 bg-slate-900 shadow-sm"
                    >
                      <img
                        src={imgUrl}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <button
                        type="button"
                        onClick={() => setGalleryImages(galleryImages.filter((_, i) => i !== index))}
                        className="absolute top-1 right-1 p-1 rounded-full bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-700 shadow-md"
                        title="Remove image"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-[9px] text-white">
                        #{index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 bg-slate-900/40 rounded-xl border border-dashed border-slate-750 text-slate-500 text-xs">
                  No additional gallery images added yet. Add URLs or click quick presets above.
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Short Description (Card teaser)
            </label>
            <textarea
              rows={2}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full text-xs p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Full Description & Highlights
            </label>
            <textarea
              rows={4}
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              className="w-full text-xs p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1.5">
                Inclusions (One per line)
              </label>
              <textarea
                rows={4}
                value={inclusionsText}
                onChange={(e) => setInclusionsText(e.target.value)}
                className="w-full text-xs p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-rose-400 mb-1.5">
                Exclusions (One per line)
              </label>
              <textarea
                rows={4}
                value={exclusionsText}
                onChange={(e) => setExclusionsText(e.target.value)}
                className="w-full text-xs p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
              ></textarea>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-slate-800">
            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={status === 'published'}
                onChange={(e) => setStatus(e.target.checked ? 'published' : 'draft')}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
              />
              <span className="font-semibold text-white">Publish on Public Website</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
              />
              <span className="font-semibold text-white">Feature on Homepage</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={trending}
                onChange={(e) => setTrending(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
              />
              <span className="font-semibold text-sun-300">Mark as Trending Deal</span>
            </label>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-slate-800">
            {!isNew && (
              <button
                type="button"
                onClick={handleDelete}
                className="btn-danger py-2.5 px-4 text-xs font-semibold flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Tour</span>
              </button>
            )}

            <div className="ml-auto flex items-center gap-3">
              <Link
                to="/admin/dashboard"
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="btn-primary py-2.5 px-5 text-xs font-bold flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Package</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
