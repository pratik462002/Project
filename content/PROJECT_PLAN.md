# InstaHoliday Solutions — Official Project Plan

## 1. Executive Summary
InstaHoliday Solutions is an enquiry-generation and holiday discovery web platform built with React, Vite, TypeScript, and Tailwind CSS. The platform showcases domestic and international holiday packages, custom trip planning, verified customer group tours, company story, and blog guides.

## 2. Public Information Architecture
- **Home (`/`)**: Brand proposition, instant search bar, category discovery, featured & trending packages, verified statistics, authentic customer group tour photos, testimonials, custom-trip CTA, travel guides, and footer.
- **Packages Catalog (`/packages`)**: Real-time keyword search, classification tabs (All, Domestic, International), category filters (Beach, Hills, City, Heritage, Family, Group), duration, budget range, and sorting.
- **Domestic Packages (`/domestic`)**: Dedicated showcase for Indian destinations (Andaman, Kerala, Himachal, Goa, Gujarat, Odisha).
- **International Packages (`/international`)**: Dedicated showcase for global destinations (Dubai, Europe, Vietnam, Sri Lanka, Thailand, Malaysia, Singapore, Bali).
- **Trending Deals (`/trending`)**: Curated spotlight on high-demand packages with special inclusions.
- **Package Detail (`/packages/:slug`)**: Comprehensive trip layout including hero photo gallery, duration/location badges, transparent pricing, day-by-day itinerary accordion, inclusions & exclusions tabs, stay & transport info, direct prefilled WhatsApp enquiry CTA, direct phone call CTA, interactive package enquiry form, FAQs, and booking/cancellation terms.
- **Custom Trip Planner (`/plan-your-trip`)**: Multi-step inquiry form capturing destination, travel dates, passenger count, hotel preference, and budget.
- **About Us (`/about`)**: Company story, mission, verified milestones, team values, and real group tour moments.
- **Why Us (`/why-us`)**: Key pillars of trust, transparent pricing, 24/7 on-tour support, and service process.
- **Blog (`/blog` & `/blog/:slug`)**: Travel guides and expert tips.
- **Contact Us (`/contact`)**: Pune head office address, business phone numbers, email, WhatsApp, interactive Google Map, and direct inquiry form.
- **Not Found (`*`)**: Custom branded 404 page with navigation fallbacks.

## 3. Admin CMS Architecture
- Protected route: `/admin/login` and `/admin`
- Package CMS: Add, Edit, Delete, Toggle Publish/Draft, Toggle Featured/Trending, Edit Itineraries & Inclusions.
- Enquiries Manager: Real-time list of all submissions (Package leads, Custom trip requests, Contact queries) with status workflow (`New`, `In Progress`, `Contacted`, `Closed`), WhatsApp reply deep link, and CSV export.
- Settings Manager: Easily update phone numbers, emails, addresses, and social links.

## 4. Security & SEO
- Zero secrets committed to source control.
- Input validation on all forms with honeypot spam protection.
- Open Graph tags, canonical URLs, XML sitemap (`/sitemap.xml`), and robots.txt.
