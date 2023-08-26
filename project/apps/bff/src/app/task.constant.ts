import { SortType } from '@project/shared/app-types';

export enum ValidTask {
  MinTitleLength = 20,
  MaxTitleLength = 50,
  MinDetailsLength = 100,
  MaxDetailsLength = 1024,
  MinPrice = 0,
  MinAddressLength = 10,
  MaxAddressLength = 255,
}

export const enum SortDirection {
  desc = 'desc',
  asc = 'asc',
}

export const TASK_DEFAULT = {
  TASKS_LIMIT: 25,
  MAX_TAGS_NUMBER: 5,
  SORT_DIRECTION: SortDirection.desc,
  SORT_TYPE: SortType.CreatedAt,
};
