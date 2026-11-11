export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: any;
}

export interface ClassItem {
  id: string;
  name: string;
  totalSeats: number;
  heldSeats: number;
  confirmedSeats: number;
  availableSeats: number;
}

export interface CreateClassPayload {
  name: string;
  totalSeats: number;
}

export interface UpdateClassPayload {
  id: string;
  name?: string;
  totalSeats?: number;
}

export type HoldStatusType = 'HELD' | 'CONFIRMED' | 'EXPIRED' | 'CANCELLED' | 0 | 1 | 2 | 3;

export interface HoldItem {
  id: string;
  status: HoldStatusType;
  classId: string;
  class?: {
    id: string;
    name: string;
    totalSeats: number;
  };
  expiresAt: string;
  studentId: string;
  createdAt: string;
  updatedAt: string;
}
