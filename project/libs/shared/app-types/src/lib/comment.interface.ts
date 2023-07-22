export interface Comment {
  id?: number;
  message: string;
  taskId: number;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
