import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Package, PackageFilterState } from '../types/package';
import { Enquiry, EnquiryStatus } from '../types/enquiry';
import { BlogPost } from '../types/blog';
import { SiteSettings } from '../types/settings';
import { packageService } from '../services/packageService';
import { enquiryService } from '../services/enquiryService';
import { storageService } from '../services/storageService';

interface DataContextType {
  packages: Package[];
  publishedPackages: Package[];
  filteredPackages: Package[];
  filters: PackageFilterState;
  setFilters: React.Dispatch<React.SetStateAction<PackageFilterState>>;
  resetFilters: () => void;
  savePackage: (pkg: Partial<Package>) => Package;
  deletePackage: (id: string) => boolean;
  togglePackageStatus: (id: string) => void;
  togglePackageFeatured: (id: string) => void;
  togglePackageTrending: (id: string) => void;

  enquiries: Enquiry[];
  submitEnquiry: typeof enquiryService.submit;
  updateEnquiryStatus: (id: string, status: EnquiryStatus, notes?: string) => boolean;
  deleteEnquiry: (id: string) => boolean;
  exportEnquiriesCSV: () => void;

  blogs: BlogPost[];
  saveBlog: (blog: Partial<BlogPost>) => BlogPost;
  deleteBlog: (id: string) => boolean;

  settings: SiteSettings;
  updateSettings: (settings: SiteSettings) => void;
}

const defaultFilters: PackageFilterState = {
  searchQuery: '',
  classification: 'all',
  category: 'all',
  duration: 'all',
  priceSort: 'default',
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [packages, setPackages] = useState<Package[]>(() => packageService.getAll());
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => enquiryService.getAll());
  const [blogs, setBlogs] = useState<BlogPost[]>(() => storageService.getBlogs());
  const [settings, setSettings] = useState<SiteSettings>(() => storageService.getSettings());
  const [filters, setFilters] = useState<PackageFilterState>(defaultFilters);

  // Sync event listeners
  useEffect(() => {
    const handlePackagesUpdate = () => setPackages(packageService.getAll());
    const handleEnquiriesUpdate = () => setEnquiries(enquiryService.getAll());
    const handleBlogsUpdate = () => setBlogs(storageService.getBlogs());
    const handleSettingsUpdate = () => setSettings(storageService.getSettings());

    window.addEventListener('instaholiday_packages_updated', handlePackagesUpdate);
    window.addEventListener('instaholiday_enquiries_updated', handleEnquiriesUpdate);
    window.addEventListener('instaholiday_blogs_updated', handleBlogsUpdate);
    window.addEventListener('instaholiday_settings_updated', handleSettingsUpdate);

    return () => {
      window.removeEventListener('instaholiday_packages_updated', handlePackagesUpdate);
      window.removeEventListener('instaholiday_enquiries_updated', handleEnquiriesUpdate);
      window.removeEventListener('instaholiday_blogs_updated', handleBlogsUpdate);
      window.removeEventListener('instaholiday_settings_updated', handleSettingsUpdate);
    };
  }, []);

  const publishedPackages = packages.filter((p) => p.status === 'published');
  const filteredPackages = packageService.filterPackages(publishedPackages, filters);

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const savePackage = (pkg: Partial<Package>): Package => {
    const saved = packageService.save(pkg);
    setPackages(packageService.getAll());
    return saved;
  };

  const deletePackage = (id: string): boolean => {
    const res = packageService.delete(id);
    setPackages(packageService.getAll());
    return res;
  };

  const togglePackageStatus = (id: string) => {
    const pkg = packages.find((p) => p.id === id);
    if (!pkg) return;
    savePackage({
      ...pkg,
      status: pkg.status === 'published' ? 'draft' : 'published',
    });
  };

  const togglePackageFeatured = (id: string) => {
    const pkg = packages.find((p) => p.id === id);
    if (!pkg) return;
    savePackage({
      ...pkg,
      featured: !pkg.featured,
    });
  };

  const togglePackageTrending = (id: string) => {
    const pkg = packages.find((p) => p.id === id);
    if (!pkg) return;
    savePackage({
      ...pkg,
      trending: !pkg.trending,
    });
  };

  const updateEnquiryStatus = (id: string, status: EnquiryStatus, notes?: string): boolean => {
    const res = enquiryService.updateStatus(id, status, notes);
    setEnquiries(enquiryService.getAll());
    return res;
  };

  const deleteEnquiry = (id: string): boolean => {
    const res = enquiryService.delete(id);
    setEnquiries(enquiryService.getAll());
    return res;
  };

  const exportEnquiriesCSV = () => {
    const csv = enquiryService.exportToCSV();
    if (!csv) return;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `instaholiday-enquiries-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const saveBlog = (blog: Partial<BlogPost>): BlogPost => {
    const current = storageService.getBlogs();
    let saved: BlogPost;
    if (blog.id) {
      const idx = current.findIndex((b) => b.id === blog.id);
      if (idx !== -1) {
        saved = { ...current[idx], ...blog } as BlogPost;
        current[idx] = saved;
      } else {
        saved = { ...blog, id: 'blog-' + Date.now() } as BlogPost;
        current.unshift(saved);
      }
    } else {
      saved = {
        id: 'blog-' + Date.now(),
        slug: blog.slug || blog.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'new-blog',
        title: blog.title || 'Untitled',
        excerpt: blog.excerpt || '',
        content: blog.content || '',
        coverImage: blog.coverImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
        author: blog.author || 'InstaHoliday Travel Desk',
        category: blog.category || 'General',
        tags: blog.tags || [],
        status: blog.status || 'published',
        publishedAt: blog.publishedAt || new Date().toISOString().split('T')[0],
      };
      current.unshift(saved);
    }
    storageService.saveBlogs(current);
    setBlogs(current);
    return saved;
  };

  const deleteBlog = (id: string): boolean => {
    const current = storageService.getBlogs().filter((b) => b.id !== id);
    storageService.saveBlogs(current);
    setBlogs(current);
    return true;
  };

  const updateSettings = (newSettings: SiteSettings) => {
    storageService.saveSettings(newSettings);
    setSettings(newSettings);
  };

  return (
    <DataContext.Provider
      value={{
        packages,
        publishedPackages,
        filteredPackages,
        filters,
        setFilters,
        resetFilters,
        savePackage,
        deletePackage,
        togglePackageStatus,
        togglePackageFeatured,
        togglePackageTrending,

        enquiries,
        submitEnquiry: enquiryService.submit,
        updateEnquiryStatus,
        deleteEnquiry,
        exportEnquiriesCSV,

        blogs,
        saveBlog,
        deleteBlog,

        settings,
        updateSettings,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
