export interface Testimonial {
  id: string;
  name: string;
  location: string;
  tripTitle: string;
  packageSlug: string;
  comment: string;
  date: string;
  rating: number;
  photoUrl: string;
}

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-01',
    name: 'Rajesh & Sunita Kulkarni',
    location: 'Kothrud, Pune',
    tripTitle: 'Dubai & Abu Dhabi Extravaganza',
    packageSlug: 'dubai-abu-dhabi-extravaganza',
    comment: 'Our family tour to Dubai with InstaHoliday Solutions was exceptional! Everything from the Burj Khalifa tickets to the desert safari and Abu Dhabi mosque was organized like clockwork. Having our tour manager available at all times gave us complete peace of mind. Highly recommended!',
    date: 'November 2025',
    rating: 5,
    photoUrl: '/media/group-dubai-1.jpg',
  },
  {
    id: 'test-02',
    name: 'Dr. Amit & Neha Deshmukh',
    location: 'Baner, Pune',
    tripTitle: 'Kerala God\'s Own Country Group Tour',
    packageSlug: 'kerala-gods-own-country',
    comment: 'We booked the 6N7D Kerala tour for our parents\' anniversary. The deluxe houseboat experience in Alleppey and the resort in Munnar amidst tea gardens were unforgettable. Pure vegetarian food was properly taken care of throughout. Thank you InstaHoliday!',
    date: 'October 2025',
    rating: 5,
    photoUrl: '/media/group-kerala-1.jpg',
  },
  {
    id: 'test-03',
    name: 'Vikram Joshi & Friends',
    location: 'Hadapsar, Pune',
    tripTitle: 'Andaman Island Explorer',
    packageSlug: 'andaman-island-explorer',
    comment: 'Booked our college reunion trip to Andaman with InstaHoliday. Radhanagar beach sunset and snorkeling at Elephant beach were breathtaking. Super transparent pricing and zero hidden surprises!',
    date: 'January 2026',
    rating: 5,
    photoUrl: '/media/group-kanyakumari-1.jpg',
  },
  {
    id: 'test-04',
    name: 'Manoj & Priya Shinde',
    location: 'Pimple Saudagar, Pune',
    tripTitle: 'Dubai Group Holiday',
    packageSlug: 'dubai-abu-dhabi-extravaganza',
    comment: 'The Miracle Garden flowers and the desert BBQ evening were pure magic for our kids. Outstanding coordination and very humble tour managers.',
    date: 'December 2025',
    rating: 5,
    photoUrl: '/media/group-dubai-2.jpg',
  },
];
