/**
 * Function to remove Vietnamese accents from a string
 * @function
 * @param {string} str - The string from which to remove accents
 * @returns {string} - The string after removing accents
 */
export function removeAccents(str: string) {
  if (!str) {
    return '';
  }
  return str
    .normalize('NFD') // Normalize the string to Unicode Normalization Form D (NFD)
    .replace(/[\u0300-\u036f]/g, '') // Remove all combining diacritical marks
    .replace('đ', 'd') // Replace specific Vietnamese characters with their non-accented counterparts
    .replace('Đ', 'D'); // Replace specific Vietnamese characters with their non-accented counterparts
}

/**
 * Function to create a slug from a string
 * @function
 * @param {string} str - The string from which to create a slug
 * @param {string|number} id - Id which will be added to the end of the slug
 * @returns {string} - The slug created from the input string
 */
export function slug(str: string, id?: string | number) {
  str = removeAccents(str);
  str = str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
  if (id) {
    str += `~${id}`;
  }
  return str;
}

/**
 * Clones an object or array.
 * @param {any} any - the value to clone
 * @returns {object} a clone of the input value
 */
export function cloneObj<T>(any: T): T {
  if (typeof any === 'object') {
    return JSON.parse(JSON.stringify(any));
  }
  return any;
}

/**
 * Parse JSON value to object.
 * @param {string} obj - the value to parse
 * @returns {object | null}  Object parsed or null
 */
export function parseObj(obj: string): object | null {
  let result: object | null;
  try {
    result = JSON.parse(obj);
  } catch {
    result = null;
  }
  return result;
}

/**
 * Formats a phone number by removing all non-numeric characters except the plus sign, and replaces the country code +84 with 0.
 * This function is specifically designed for Vietnamese phone numbers but can be adapted for other formats.
 *
 * @param {string} phone - The phone number to be formatted.
 * @returns {string} - The formatted phone number with non-numeric characters removed and the country code +84 replaced with 0.
 */
export function formatPhone(phone: string): string {
  let cleanPhone = phone.replace(/[^\d+]/g, '');
  cleanPhone = cleanPhone.replace(/^\+84/, '0');
  return cleanPhone;
}

/**
 * Normalizes a string for search operations by removing accents, converting to lowercase, and trimming whitespace.
 * This function is particularly useful for preparing strings for comparison or inclusion checks in a way that is insensitive to case, accents, or leading/trailing whitespace.
 *
 * @param {string} value - The string to be normalized for search.
 * @returns {string} - The normalized string, with accents removed, converted to lowercase, and trimmed of leading and trailing whitespace.
 */
export function makeSearchValue(value: string): string {
  return removeAccents(value.toLowerCase().trim());
}

/**
 * Checks if a parent string includes a search string after normalizing both strings.
 * This function is useful for performing case-insensitive and accent-insensitive searches.
 *
 * @param {string} parentString - The string to search within.
 * @param {string} searchString - The string to search for.
 * @returns {boolean} - Returns `true` if the normalized `searchString` is found within the normalized `parentString`, otherwise returns `false`.
 */
export function includeSearch(
  parentString: string,
  searchString: string,
): boolean {
  return makeSearchValue(parentString).includes(makeSearchValue(searchString));
}

/**
 * Truncates a string to a specified length and appends an ellipsis ('...') if the original string exceeds that length.
 * This function is useful for shortening strings to fit within UI elements or for previewing longer text.
 *
 * @param {string} str - The string to be truncated.
 * @param {number} limit - The maximum length of the string before truncation.
 * @returns {string} - The truncated string with an ellipsis appended if the original string exceeded the limit, or the original string if it did not.
 */
export const truncate = (str: string, limit: number) => {
  if (str.length <= limit) {
    return str;
  }
  return str.slice(0, limit) + '...';
};
