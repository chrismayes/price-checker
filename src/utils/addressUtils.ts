import { Store } from '../data/dummyStores';

export const formatAddress = (store: Store): string => {
  const { address_line1, address_line2, city, state, postal_code, country } = store;
  return `${address_line1}${address_line2 ? `, ${address_line2}` : ''}, ${city}, ${state} ${postal_code}, ${country}`;
};
