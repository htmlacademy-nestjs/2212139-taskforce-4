import { IEntity, ISubscriber } from '@project/shared/app-types';

export class EmailSubscriberEntity
  implements IEntity<EmailSubscriberEntity>, ISubscriber
{
  public id: string;
  public email: string;
  public name: string;
  public userId: string;
  public role: string;

  constructor(emailSubscriber: ISubscriber) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity) {
    this.email = entity.email;
    this.name = entity.name;
    this.id = entity.id;
    this.role = entity.role;
  }

  public toObject(): EmailSubscriberEntity {
    return { ...this };
  }
}
