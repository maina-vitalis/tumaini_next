export interface Tour {
  id: string;
  slug?: string;
  tourName: string;
  price: number;
  booking: number;
  imageUrl?: string; // legacy
  images?: string[] | any;
  rating: number;
  difficulty: string;
  level: string;
  hikeType: string;
  location: string;
  date: string;
  description: string;
  summary: string;
  itinerary: ItineraryItem[];
  inclusive: InclusiveItem[];
  exclusive: ExclusiveItem[];
  createdAt: string;
  updatedAt: string; // Date string in ISO format
}

interface ItineraryItem {
  day: string;
  details: string;
}

interface InclusiveItem {
  item: string;
}

interface ExclusiveItem {
  item: string;
}
