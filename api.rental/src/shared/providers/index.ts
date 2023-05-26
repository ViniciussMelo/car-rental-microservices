import { CAR_REPOSITORY, RENTAL_REPOSITORY } from '@shared/constants';
import { Rental } from '@modules/rentals/models/rental.model';
import { Car } from '@modules/cars/models/car.model';

export const carProvider = {
  provide: CAR_REPOSITORY,
  useValue: Car,
};

export const rentalProvider = {
  provide: RENTAL_REPOSITORY,
  useValue: Rental,
};
