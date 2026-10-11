import { Package } from '../types/package';
import { Enquiry } from '../types/enquiry';
import { BlogPost } from '../types/blog';
import { SiteSettings } from '../types/settings';
import { initialPackages } from '../data/seedPackages';
import { initialBlogs } from '../data/seedBlogs';
import { initialSettings } from '../data/seedSettings';

import { Testimonial, initialTestimonials } from '../data/seedTestimonials';

const STORAGE_KEYS = {
  PACKAGES: 'instaholiday_packages_v1',
  ENQUIRIES: 'instaholiday_enquiries_v1',
  BLOGS: 'instaholiday_blogs_v1',
  TESTIMONIALS: 'instaholiday_testimonials_v1',
  SETTINGS: 'instaholiday_settings_v1',
  AUTH: 'instaholiday_admin_session_v1',
};

export const storageService = {
  // Packages
  getPackages(): Package[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PACKAGES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(initialPackages));
        return initialPackages;
      }
      return JSON.parse(data);
    } catch (err) {
      console.error('Failed to load packages from storage', err);
      return initialPackages;
    }
  },

  savePackages(packages: Package[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));
      window.dispatchEvent(new Event('instaholiday_packages_updated'));
    } catch (err) {
      console.error('Failed to save packages to storage', err);
    }
  },

  // Enquiries
  getEnquiries(): Enquiry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error('Failed to load enquiries from storage', err);
      return [];
    }
  },

  saveEnquiries(enquiries: Enquiry[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
      window.dispatchEvent(new Event('instaholiday_enquiries_updated'));
    } catch (err) {
      console.error('Failed to save enquiries to storage', err);
    }
  },

  // Blogs
  getBlogs(): BlogPost[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BLOGS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(initialBlogs));
        return initialBlogs;
      }
      return JSON.parse(data);
    } catch (err) {
      console.error('Failed to load blogs from storage', err);
      return initialBlogs;
    }
  },

  saveBlogs(blogs: BlogPost[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs));
      window.dispatchEvent(new Event('instaholiday_blogs_updated'));
    } catch (err) {
      console.error('Failed to save blogs to storage', err);
    }
  },

  // Testimonials
  getTestimonials(): Testimonial[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(initialTestimonials));
        return initialTestimonials;
      }
      return JSON.parse(data);
    } catch (err) {
      console.error('Failed to load testimonials from storage', err);
      return initialTestimonials;
    }
  },

  saveTestimonials(testimonials: Testimonial[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
      window.dispatchEvent(new Event('instaholiday_testimonials_updated'));
    } catch (err) {
      console.error('Failed to save testimonials to storage', err);
    }
  },

  // Site Settings
  getSettings(): SiteSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(initialSettings));
        return initialSettings;
      }
      return JSON.parse(data);
    } catch (err) {
      console.error('Failed to load settings from storage', err);
      return initialSettings;
    }
  },

  saveSettings(settings: SiteSettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      window.dispatchEvent(new Event('instaholiday_settings_updated'));
    } catch (err) {
      console.error('Failed to save settings to storage', err);
    }
  },

  // Reset to seed data
  resetAll(): void {
    localStorage.removeItem(STORAGE_KEYS.PACKAGES);
    localStorage.removeItem(STORAGE_KEYS.ENQUIRIES);
    localStorage.removeItem(STORAGE_KEYS.BLOGS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    window.location.reload();
  },
};
