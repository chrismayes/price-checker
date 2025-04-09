export interface Store {
  id: number;
  name: string;
  address_line1: string;
  address_line2?: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone_number: string;
  email?: string | null;
  website?: string | null;
  description?: string | null;
  latitude: number;
  longitude: number;
  opening_hours: string;
}

export const dummyStores: Store[] = [
  {
    id: 1,
    name: 'Walmart',
    address_line1: '7000 S Sam Houston Pkwy W',
    address_line2: '',
    city: 'Houston',
    state: 'TX',
    postal_code: '77099',
    country: 'USA',
    phone_number: '281-123-4567',
    email: 'contact@walmart.com',
    website: 'https://www.walmart.com',
    description: 'Large discount department store.',
    latitude: 49.2827,
    longitude: -123.1207,
    opening_hours: '8AM - 10PM',
  },
  {
    id: 2,
    name: 'Target',
    address_line1: '2101 N. Central Expy',
    address_line2: '',
    city: 'Minneapolis',
    state: 'MN',
    postal_code: '55404',
    country: 'USA',
    phone_number: '612-123-4567',
    email: 'contact@target.com',
    website: 'https://www.target.com',
    description: 'One of the leading retail stores.',
    latitude: 48.4284,
    longitude: -123.3656,
    opening_hours: '9AM - 9PM',
  },
  {
    id: 3,
    name: 'Costco',
    address_line1: '999 Lake Drive',
    address_line2: '',
    city: 'Issaquah',
    state: 'WA',
    postal_code: '98027',
    country: 'USA',
    phone_number: '425-123-4567',
    email: 'contact@costco.com',
    website: 'https://www.costco.com',
    description: 'Membership-based warehouse club.',
    latitude: 49.8880,
    longitude: -119.4960,
    opening_hours: '10AM - 8PM',
  },
];
