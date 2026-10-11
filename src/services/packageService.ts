import { Package, PackageFilterState } from '../types/package';
import { storageService } from './storageService';

export const packageService = {
  getAll(): Package[] {
    return storageService.getPackages();
  },

  getPublished(): Package[] {
    return storageService.getPackages().filter(p => p.status === 'published');
  },

  getBySlug(slug: string): Package | undefined {
    return storageService.getPackages().find(p => p.slug === slug);
  },

  getById(id: string): Package | undefined {
    return storageService.getPackages().find(p => p.id === id);
  },

  filterPackages(packages: Package[], filters: PackageFilterState): Package[] {
    return packages.filter(pkg => {
      // Classification
      if (filters.classification !== 'all' && pkg.classification !== filters.classification) {
        return false;
      }

      // Search Query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = pkg.title.toLowerCase().includes(query);
        const matchesDest = pkg.destinations.toLowerCase().includes(query);
        const matchesDesc = pkg.shortDescription.toLowerCase().includes(query);
        const matchesCategory = pkg.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDest && !matchesDesc && !matchesCategory) {
          return false;
        }
      }

      // Category filter
      if (filters.category && filters.category !== 'all') {
        if (pkg.category.toLowerCase() !== filters.category.toLowerCase()) {
          return false;
        }
      }

      // Duration filter
      if (filters.duration === 'short' && pkg.durationDays > 4) return false;
      if (filters.duration === 'medium' && (pkg.durationDays < 5 || pkg.durationDays > 7)) return false;
      if (filters.duration === 'long' && pkg.durationDays < 8) return false;

      return true;
    }).sort((a, b) => {
      if (filters.priceSort === 'price-asc') {
        return (a.priceAmount || 999999) - (b.priceAmount || 999999);
      }
      if (filters.priceSort === 'price-desc') {
        return (b.priceAmount || 0) - (a.priceAmount || 0);
      }
      if (filters.priceSort === 'duration-asc') {
        return a.durationDays - b.durationDays;
      }
      if (filters.priceSort === 'duration-desc') {
        return b.durationDays - a.durationDays;
      }
      return 0;
    });
  },

  save(pkg: Partial<Package>): Package {
    const list = storageService.getPackages();
    const now = new Date().toISOString();

    if (pkg.id) {
      const index = list.findIndex(p => p.id === pkg.id);
      if (index !== -1) {
        const updated: Package = {
          ...list[index],
          ...pkg,
          updatedAt: now,
        } as Package;
        list[index] = updated;
        storageService.savePackages(list);
        return updated;
      }
    }

    const newPkg: Package = {
      id: 'pkg-' + Date.now(),
      slug: pkg.slug || pkg.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'new-package',
      title: pkg.title || 'Untitled Package',
      classification: pkg.classification || 'domestic',
      status: pkg.status || 'published',
      featured: pkg.featured || false,
      trending: pkg.trending || false,
      category: pkg.category || 'General',
      shortDescription: pkg.shortDescription || '',
      fullDescription: pkg.fullDescription || '',
      destinations: pkg.destinations || '',
      durationNights: pkg.durationNights || 3,
      durationDays: pkg.durationDays || 4,
      priceAmount: pkg.priceAmount !== undefined ? pkg.priceAmount : null,
      currency: pkg.currency || 'INR',
      priceLabel: pkg.priceLabel || 'per person',
      priceValidity: pkg.priceValidity || '',
      departureDates: pkg.departureDates || '',
      pickupPoints: pkg.pickupPoints || '',
      transportDetails: pkg.transportDetails || '',
      accommodationDetails: pkg.accommodationDetails || '',
      heroImage: pkg.heroImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
      galleryImages: pkg.galleryImages || [],
      itinerary: pkg.itinerary || [],
      inclusions: pkg.inclusions || [],
      exclusions: pkg.exclusions || [],
      faqs: pkg.faqs || [],
      bookingTerms: pkg.bookingTerms || '',
      cancellationPolicy: pkg.cancellationPolicy || '',
      createdAt: now,
      updatedAt: now,
    };

    storageService.savePackages([newPkg, ...list]);
    return newPkg;
  },

  delete(id: string): boolean {
    const list = storageService.getPackages();
    const filtered = list.filter(p => p.id !== id);
    storageService.savePackages(filtered);
    return true;
  },
};
