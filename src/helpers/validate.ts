import { formatPhone } from './string';

export const patternEmail =
  /^(([^<>()\\[\].,;:\s@"]+(\.[^<>()\\[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const patternUUID =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
export const patternPhone =
  /^(?:\+84|0)(3|5|7|8|9|1[2|6|8|9])([0-9]{8})$|^(?:\+84|0)2([0-9]{9})$|^(?:\+84|0)?1900([0-9]{4,6})$/;
export const patternUsername = /^[a-zA-Z0-9]{5,32}$/;
export const patternPassword = /^.{6,32}$/;
export const patternOTP = /^[0-9]{6}$/;

/**
 * Function to check if a string is a valid email.
 * @function
 * @param {string} email - The string email to check.
 * @returns {boolean} - True if the string is a valid email.
 */
export function validEmail(email: string = ''): boolean {
  return patternEmail.test(email);
}

/**
 * Function to check if a string is a valid uuid.
 * @function
 * @param {string} uuid - The string uuid to check.
 * @returns {boolean} - True if the string is a valid uuid.
 */
export function validUUID(uuid: string = ''): boolean {
  return patternUUID.test(uuid);
}

/**
 * Validates a Vietnamese phone number, including those with country code prefix, switchboard numbers, and service/hotline numbers.
 *
 * @param phone The phone number to validate.
 * @returns true if the phone number is valid, false otherwise.
 */
export function validPhone(phone: string = ''): boolean {
  const cleanPhone = formatPhone(phone);
  return patternPhone.test(cleanPhone);
}
