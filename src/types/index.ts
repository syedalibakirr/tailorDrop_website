export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  measurements?: {
    waist?: number;
    inseam?: number;
    height?: number;
    chest?: number;
    hips?: number;
    shoulders?: number;
  };
}

export interface AlterationRequest {
  id: string;
  userId: string;
  clothingType: string;
  alterationType: string;
  customInstructions?: string;
  photos: File[];
  pickupWindow: {
    date: string;
    timeSlot: string;
  };
  status: 'pending_pickup' | 'in_alteration' | 'out_for_delivery' | 'completed';
  estimatedPrice: number;
  createdAt: string;
  estimatedCompletion?: string;
}

export interface PricingItem {
  service: string;
  price: number;
  description?: string;
}