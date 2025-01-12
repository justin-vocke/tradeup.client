export interface SubscriptionResponse {
  threshold: number; // Maps from decimal
  tickerSymbol: string;
  userId: string; // Maps from Guid
  id: string; // Maps from Guid
  email: string;
  position: number; // Maps from the enum
  userNotified: boolean;
}
