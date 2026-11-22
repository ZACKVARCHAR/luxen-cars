export type VehicleBrand = "Dacia" | "Peugeot" | "Opel";

export type VehicleCategory =
  | "Économique"
  | "Citadine"
  | "Berline"
  | "SUV"
  | "Compacte";

export type FuelType = "Essence" | "Diesel" | "Hybride";
export type Transmission = "Manuelle" | "Automatique";

export type AvailabilityStatus = "AVAILABLE" | "LIMITED" | "UNAVAILABLE";

export interface Vehicle {
  id: string;
  slug: string;
  brand: VehicleBrand;
  model: string;
  category: VehicleCategory;
  dailyRate: number;
  currency: "MAD";
  deposit: number;
  seats: number;
  bags: number;
  transmission: Transmission;
  fuel: FuelType;
  airConditioning: boolean;
  features: string[];
  status: AvailabilityStatus;
  image: string;
  gallery: string[];
  colors: string[];
  has3d: boolean;
  model3dUrl?: string;
  description: string;
  placeholder?: boolean;
}

export interface Agency {
  id: string;
  code: string;
  name: string;
  city: string;
  currency: "MAD";
  address: string;
  phone: string;
  email: string;
}

export interface SearchParams {
  city: string;
  pickupLocation: string;
  returnLocation: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  category?: VehicleCategory | "";
}

export interface BookingOption {
  id: string;
  label: string;
  description: string;
  pricePerDay: number;
}

export interface QuoteLine {
  label: string;
  amount: number;
}

export interface Quote {
  vehicleId: string;
  days: number;
  dailyRate: number;
  optionsTotal: number;
  discount: number;
  deposit: number;
  subtotal: number;
  total: number;
  currency: "MAD";
  lines: QuoteLine[];
  isEstimate: boolean;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
}

export type PaymentMethod = "TPA" | "CASH" | "CHEQUE" | "VIREMENT";

export interface BookingDraft {
  search: SearchParams;
  vehicleId: string | null;
  vehicle?: Vehicle | null;
  optionIds: string[];
  customer: CustomerInfo | null;
  paymentMethod: PaymentMethod;
  paymentBank?: string | null;
}

export type BookingMode = "mock" | "live";

export interface BookingConfirmation {
  mode: BookingMode;
  reference: string;
  status: "PENDING_CONFIRMATION" | "CONFIRMED";
  message: string;
  quote: Quote;
  vehicle: Vehicle;
  search: SearchParams;
  customer: CustomerInfo;
  paymentMethod: PaymentMethod;
  paymentBank?: string | null;
  createdAt: string;
}

export interface ReservationLookup {
  reference: string;
  emailOrPhone: string;
}
