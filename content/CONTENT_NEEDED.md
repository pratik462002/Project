# Content Needed — InstaHoliday Solutions

The following items are optional business assets or credentials that the owner can provide to enhance the live production deployment. Clear placeholders and fallback defaults have been configured so the site runs completely error-free:

1. **Transactional Email Service Credentials**:
   - Resend API Key (`RESEND_API_KEY`) or SMTP credentials for sending automated email notifications directly to `info@instaholiday.in`.
   - *Current Status:* Enquiries are securely captured and saved to the persistent database and admin panel, with direct WhatsApp links and email mailto fallbacks available.

2. **Cloud Database / Supabase Credentials (Optional for cloud sync)**:
   - Supabase Project URL (`VITE_SUPABASE_URL`)
   - Supabase Anon Public Key (`VITE_SUPABASE_ANON_KEY`)
   - *Current Status:* An out-of-the-box persistent data engine is implemented with seed packages and real-time CRUD, plus a Supabase migration file ready to run when cloud credentials are provided.

3. **Google Maps Place Embed Key**:
   - Optional customized Google Maps API Embed key for Pimple Gurav, Pune head office (a responsive open map embed is currently rendered).

4. **Additional Testimonial Quotes & Group Photos**:
   - Any further high-resolution photos or customer video reels from recent tours can be added via the Admin CMS or placed in `/public/media`.
