
export interface BillDetails {
  wattage: number;
  hours: number;
  days: number;
  totalWh: number;
  totalKWh: number;
  subtotal: number;
  fixedCharge: number;
  totalAmount: number;
  rateDetails: {
    slab: string;
    units: number;
    rate: number;
    amount: number;
  ā
  }
