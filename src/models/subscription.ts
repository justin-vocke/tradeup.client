export interface SubscriptionResponse {
  threshold: number; // Maps from decimal
  ticker: string;
  userId: string; // Maps from Guid
  id: string; // Maps from Guid
  email: string;
  position: number; // Maps from the enum
  userNotified: boolean;
}

export interface SubscriptionRequest {
  email: string;
  ticker: string;
  threshold: number;
  position: number;
}
