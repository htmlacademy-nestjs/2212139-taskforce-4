export interface IComment {
  commentId: number;
  text: string;
  taskId: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
