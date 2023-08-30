import { IEntity, IResponse } from '@project/shared/app-types';

export class ResponseEntity implements IEntity<ResponseEntity>, IResponse {
  public responseId: number;
  public executorId: string;
  public taskId: number;
  public offerPrice: number;

  constructor(resp: IResponse) {
    this.fillEntity(resp);
  }

  public fillEntity(entity: IResponse) {
    this.responseId = entity.responseId;
    this.executorId = entity.executorId;
    this.taskId = entity.taskId;
    this.offerPrice = entity.offerPrice;
  }

  public toObject(): ResponseEntity {
    return { ...this };
  }
}
