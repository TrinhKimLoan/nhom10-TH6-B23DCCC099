// src/services/typings.d.ts
export type CategoryType = 'biển' | 'núi' | 'thành phố';

export interface DestinationLocation {
  lat: number;
  lon: number;
  displayName: string;
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  duration: number; // thời gian tham quan (giờ)
  ticketPrice?: number; // giá vé nếu có
  location: DestinationLocation;
  rating: number; // từ 1 đến 5
  category: CategoryType;
}

  