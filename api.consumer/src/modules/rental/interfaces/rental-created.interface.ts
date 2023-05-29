import { ICreateUser } from '@modules/users/interfaces/create-user.interface';

export interface IRentalCreatedPayload {
  car: {
    deletedAt: string;
    id: number;
    name: string;
    description: string;
    isAvailable: boolean;
    licensePlate: string;
    brand: string;
    dailyRate: number;
    createdAt: string;
    updatedAt: string;
  };
  user: ICreateUser;
  rent: {
    userId: number;
    carId: number;
    startDate: Date;
  };
}
