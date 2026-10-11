import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { WhatsAppFloatingButton } from './components/common/WhatsAppFloatingButton';

import { HomePage } from './pages/HomePage';
import { PackagesPage } from './pages/PackagesPage';
import { PackageDetailPage } from './pages/PackageDetailPage';
import { CustomTripPage } from './pages/CustomTripPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { WhyUsPage } from './pages/WhyUsPage';
import { TrendingPage } from './pages/TrendingPage';

import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminPackageEditPage } from './pages/admin/AdminPackageEditPage';
import { AdminEnquiriesPage } from './pages/admin/AdminEnquiriesPage';
import { AdminBlogsPage } from './pages/admin/AdminBlogsPage';
import { AdminTestimonialsPage } from './pages/admin/AdminTestimonialsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

export const App: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen text-slate-800 bg-white">
      {!isAdminRoute && <Navbar />}

      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route
            path="/domestic"
            element={
              <PackagesPage
                initialClassification="domestic"
                pageTitle="Domestic India Tour Packages"
                pageSubtitle="From serene Kerala backwaters & Munnar hill retreats to Kashmir snows and Andaman beaches."
              />
            }
          />
          <Route
            path="/international"
            element={
              <PackagesPage
                initialClassification="international"
                pageTitle="International Holiday Packages"
                pageSubtitle="Explore Dubai luxury, Southeast Asia adventures, Europe, and tropical island holidays."
              />
            }
          />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/packages/:slug" element={<PackageDetailPage />} />
          <Route path="/plan-your-trip" element={<CustomTripPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/why-us" element={<WhyUsPage />} />

          {/* Admin CMS Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/packages/new" element={<AdminPackageEditPage />} />
          <Route path="/admin/packages/edit/:id" element={<AdminPackageEditPage />} />
          <Route path="/admin/enquiries" element={<AdminEnquiriesPage />} />
          <Route path="/admin/blogs" element={<AdminBlogsPage />} />
          <Route path="/admin/testimonials" element={<AdminTestimonialsPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />

          {/* Fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppFloatingButton />}
    </div>
  );
};
