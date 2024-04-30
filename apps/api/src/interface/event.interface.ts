export interface IEvent {
  userId: number;
  name: string;
  description: string;
  image: string;
  location: string;
  available_seats: number;
  start_date: Date;
  end_date: Date;
  categoryId: number;
  promotionId: number;
}

