import { Enquiry, EnquiryStatus } from '../types/enquiry';
import { storageService } from './storageService';

export interface SubmitEnquiryInput {
  type: 'package' | 'custom_trip' | 'contact';
  packageId?: string;
  packageTitle?: string;
  packageSlug?: string;
  name: string;
  email: string;
  phone: string;
  travelDate?: string;
  travellers?: number;
  children?: number;
  duration?: string;
  destination?: string;
  budget?: string;
  hotelPreference?: string;
  message?: string;
  botHoneypot?: string; // Must be empty
}

export const enquiryService = {
  getAll(): Enquiry[] {
    return storageService.getEnquiries();
  },

  submit(input: SubmitEnquiryInput): { success: boolean; error?: string; enquiry?: Enquiry } {
    // Spam bot protection check
    if (input.botHoneypot && input.botHoneypot.trim() !== '') {
      console.warn('Bot submission blocked');
      return { success: true }; // Silent drop
    }

    if (!input.name || !input.phone) {
      return { success: false, error: 'Name and Phone number are required.' };
    }

    const newEnquiry: Enquiry = {
      id: 'enq-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      type: input.type,
      packageId: input.packageId,
      packageTitle: input.packageTitle,
      packageSlug: input.packageSlug,
      name: input.name.trim(),
      email: input.email ? input.email.trim() : '',
      phone: input.phone.trim(),
      travelDate: input.travelDate,
      travellers: input.travellers ? Number(input.travellers) : undefined,
      children: input.children ? Number(input.children) : undefined,
      duration: input.duration,
      destination: input.destination,
      budget: input.budget,
      hotelPreference: input.hotelPreference,
      message: input.message ? input.message.trim() : undefined,
      status: 'new',
      sourceUrl: typeof window !== 'undefined' ? window.location.pathname : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const current = storageService.getEnquiries();
    storageService.saveEnquiries([newEnquiry, ...current]);

    return { success: true, enquiry: newEnquiry };
  },

  updateStatus(id: string, status: EnquiryStatus, adminNotes?: string): boolean {
    const list = storageService.getEnquiries();
    const index = list.findIndex(e => e.id === id);
    if (index === -1) return false;

    list[index] = {
      ...list[index],
      status,
      adminNotes: adminNotes !== undefined ? adminNotes : list[index].adminNotes,
      updatedAt: new Date().toISOString(),
    };

    storageService.saveEnquiries(list);
    return true;
  },

  delete(id: string): boolean {
    const list = storageService.getEnquiries();
    const filtered = list.filter(e => e.id !== id);
    storageService.saveEnquiries(filtered);
    return true;
  },

  buildWhatsAppUrl(phone: string, text: string): string {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  },

  exportToCSV(): string {
    const enquiries = storageService.getEnquiries();
    if (enquiries.length === 0) return '';

    const headers = ['ID', 'Type', 'Package', 'Name', 'Phone', 'Email', 'Travel Date', 'Travellers', 'Status', 'Date Submitted'];
    const rows = enquiries.map(e => [
      e.id,
      e.type,
      e.packageTitle || e.destination || 'N/A',
      `"${e.name.replace(/"/g, '""')}"`,
      e.phone,
      e.email,
      e.travelDate || 'N/A',
      e.travellers || 'N/A',
      e.status,
      new Date(e.createdAt).toLocaleDateString(),
    ]);

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  },
};
