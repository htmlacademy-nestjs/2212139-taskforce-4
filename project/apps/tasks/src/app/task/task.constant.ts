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

export const TASK_FORBIDDEN = 'Access is denied.';
export const TASK_STATUS_CONDITIONS_WRONG =
  'Update status conditions are wrong.';
export const TASK_NOT_FOUND = `Task is not found.`;
export const TASK_CANT_TAKE = `You're not executor.`;
export const TASK_EXECUTOR_APPOINTED = `The executor has been already appointed.`;
export const TASK_EXECUTOR_EXISTS = 'The executor already exists';
export const TASK_EXECUTOR_A_HAS_JOB = 'The executor already has a job';
export const RESPONSE_NOT_FOUND = 'Response is not found';

export const TAGS_MAX_COUNT = 5;
