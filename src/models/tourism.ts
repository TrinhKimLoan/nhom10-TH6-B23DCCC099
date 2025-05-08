export enum DestinationCategory {
    Bien = 'biển',
    Nui = 'núi',
    ThanhPho = 'thành phố',
  }
  
  export interface Destination {
    id: string;
    name: string;
    description: string;
    image: string;
    category: DestinationCategory;
    rating: number;
    visitDurationHours: number;
    cost: {
      food: number;
      accommodation: number;
      transport: number;
    };
  }
  
  export interface BudgetItem {
    category: string;
    amount: number;
  }
  
  export interface ItineraryDestination {
    destinationId: string;
    visitDate: string;
    note?: string;
  }
  
  export interface TravelPlan {
    id: string;
    name: string;
    destinations: ItineraryDestination[];
    totalBudget: number;
  }
  
  // LocalStorage helper
  export const getFromLocalStorage = <T,>(key: string): T | null => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };
  
  export const setToLocalStorage = <T,>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  