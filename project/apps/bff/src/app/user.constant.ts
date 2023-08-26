export const AUTH_USER_EXISTS = 'User with this email exists';
export const AUTH_USER_NOT_FOUND = 'User not found';
export const AUTH_USER_PASSWORD_WRONG = 'User password is wrong';
export const AUTH_USER_EMAIL_NOT_VALID = 'The email is not valid';
export const AUTH_USER_DATE_BIRTH_NOT_VALID =
  'The user date birth is not valid';

export enum ValidateCondition {
  MinPasswordLength = 6,
  MaxPasswordLength = 12,
  MinResponseTextLength = 50,
  MaxResponseTextLength = 500,
  MinScore = 1,
  MaxScore = 5,
  MinNameLength = 3,
  MaxNameLength = 50,
}
