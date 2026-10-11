export type EnquiryType = 'package' | 'custom_trip' | 'contact';
export type EnquiryStatus = 'new' | 'in_progress' | 'contacted' | 'quoted' | 'booked' | 'closed' | 'archived';

export interface Enquiry {
  id: string;
  type: EnquiryType;
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
  status: EnquiryStatus;
  sourceUrl?: string;
  createdAt: string;
  updatedAt: string;
  adminNotes?: string;
}
