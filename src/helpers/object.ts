/**
 * Filters an object by removing properties with falsy values.
 *
 * This function iterates over each property of the provided object. If a property's value is falsy (e.g., `false`, `0`, `""`, `null`, `undefined`, or `NaN`),
 * that property is omitted from the returned object. Properties with truthy values are retained.
 *
 * @param obj - The object to filter. It must be an object that extends `Record<string, any>`, meaning its keys are strings and its values can be of any type.
 * @returns A new object of type `Partial<T>`. This object includes only the properties of the input object that have truthy values.
 *          The returned object is a partial representation of the input object, potentially containing fewer properties.
 *
 * @template T - A generic type extending `Record<string, any>`, representing the shape of the input object.
 */
export function filterObject<T extends Record<string, any>>(
  obj: T,
): Partial<T> {
  const filter = (currentObj: any): any => {
    const filteredObj: Record<string, any> = {};

    Object.entries(currentObj).forEach(([key, value]) => {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        const deepFilteredObj = filter(value);
        if (Object.keys(deepFilteredObj).length > 0) {
          filteredObj[key] = deepFilteredObj;
        }
      } else if (value) {
        filteredObj[key] = value;
      }
    });

    return filteredObj;
  };

  return filter(obj);
}

/**
 * Removes keys from an object if their corresponding *Id keys exist and filters out falsy values, with exceptions.
 *
 * @param obj - The object to filter and clean.
 * @param exception - An array of keys to exclude from the removal process.
 * @returns A new object of type `Partial<T>`.
 */
export function removeObjectWithId<T extends Record<string, any>>(
  obj: T,
  exception: string[] = [],
): Partial<T> {
  const filteredObj = filterObject(obj);

  const keysToRemove = new Set<string>();
  const keysWithId = Object.keys(filteredObj).filter(
    (key) =>
      key.endsWith('Id') &&
      !exception.includes(key) &&
      !exception.includes(key.replace('Id', '')),
  );
  keysWithId.forEach((keyWithId) => {
    const originalKey = keyWithId.replace('Id', '');
    if (
      !exception.includes(originalKey) &&
      Object.prototype.hasOwnProperty.call(filteredObj, originalKey)
    ) {
      keysToRemove.add(originalKey);
    }
  });

  const finalFilteredObj: Partial<T> = {};
  Object.entries(filteredObj).forEach(([key, value]) => {
    if (!keysToRemove.has(key)) {
      finalFilteredObj[key as keyof T] = value;
    }
  });

  exception.forEach((key) => {
    if (key.endsWith('Id') && filteredObj[key]) {
      const baseKey = key.replace('Id', '');
      finalFilteredObj[baseKey as keyof T] = filteredObj[key];
    }
  });

  return finalFilteredObj;
}

/**
 * Removes keys from an object if their corresponding keys without the "Id" suffix exist and filters out falsy values, with exceptions.
 *
 * @param obj - The object to filter and clean.
 * @param exception - An array of keys to exclude from the removal process.
 * @returns A new object of type `Partial<T>`.
 */
export function removeObjectWithKey<T extends Record<string, any>>(
  obj: T,
  exception: string[] = [],
): Partial<T> {
  const filteredObj = filterObject(obj);

  const finalFilteredObj: Partial<T> = {};
  Object.keys(filteredObj).forEach((key) => {
    const baseKey = key.endsWith('Id') ? key.slice(0, -2) : key;
    if (!exception.includes(baseKey)) {
      finalFilteredObj[key as keyof T] = filteredObj[key];
    } else if (key.endsWith('Id') && exception.includes(baseKey)) {
      finalFilteredObj[baseKey as keyof T] = filteredObj[key];
    }
  });

  return finalFilteredObj;
}

/**
 * Modifies an object for search parameters by handling date range fields specifically.
 * If only one of `startDate` or `endDate` is provided, it combines them into a single `date` field.
 * This is particularly useful for search parameters where a single date field is required even if only one end of the range is specified.
 * Additionally, it retains the behavior of removing keys with corresponding *Id keys and filtering out falsy values.
 *
 * @param obj - The object to modify for search parameters. It extends `Record<string, any>`.
 * @param exception - An array of keys to exclude from the removal process.
 * @returns A new object of type `Partial<T>`. For search parameters, if only `startDate` or `endDate` is present, they are combined into a single `date` field.
 *          Also applies the logic of `removeObjectWithId` to filter out keys with corresponding *Id keys and falsy values.
 *
 * @template T - A generic type extending `Record<string, any>`, representing the shape of the input object.
 */
export function modifyDateForSearch<T extends Record<string, any>>(
  obj: T,
  exception: string[] = [],
): Partial<T> & {
  date?: string;
  startDate?: string;
  endDate?: string;
} {
  const modifiedObj: Partial<T> & {
    date?: string;
    startDate?: string;
    endDate?: string;
  } = removeObjectWithKey(obj, exception);

  const hasStartDate = 'startDate' in modifiedObj;
  const hasEndDate = 'endDate' in modifiedObj;

  // If only startDate is provided
  if (hasStartDate && !hasEndDate) {
    modifiedObj.date = modifiedObj.startDate;
    delete modifiedObj.startDate;
  }
  // If only endDate is provided
  else if (!hasStartDate && hasEndDate) {
    modifiedObj.date = modifiedObj.endDate;
    delete modifiedObj.endDate;
  }

  return modifiedObj;
}

/**
 * Creates an empty equivalent of the provided value based on its type.
 *
 * This function checks the type of the input value and returns an empty equivalent:
 * - For arrays, it returns an empty array.
 * - For strings, it returns an empty string.
 * - For numbers, it returns `0`.
 * - For objects (excluding `null`), it returns an empty object.
 * - For all other types, including `null`, it returns `null`.
 *
 * @param value - The value for which to create an empty equivalent. Its type can be array, string, number, object, or any other.
 * @returns An empty equivalent of the input value, matching its type (`[]` for arrays, `''` for strings, `0` for numbers, `{}` for objects, or `null` for others).
 */
export function makeEmpty(value: any) {
  if (Array.isArray(value)) {
    return [];
  } else if (typeof value === 'string') {
    return '';
  } else if (typeof value === 'number') {
    return 0;
  } else if (typeof value === 'object' && value !== null) {
    return {};
  } else {
    return null;
  }
}

/**
 * Recursively flattens a nested object, converting it into a single-level object with dot-separated keys.
 *
 * This function takes a nested object and flattens it into a single-level object. The keys of the resulting object
 * are dot-separated strings representing the path to each value in the original nested object.
 *
 * @param obj - The nested object to flatten. It must be an object with string keys and values of any type.
 * @param parentKey - The base key to use for the current level of recursion. Defaults to an empty string.
 * @param result - The accumulator object that holds the flattened key-value pairs. Defaults to an empty object.
 * @returns A single-level object with dot-separated keys representing the paths to the values in the original nested object.
 */
export function flatObj(
  obj: Record<string, any>,
  parentKey = '',
  result: Record<string, any> = {},
): Record<string, any> {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (
        typeof obj[key] === 'object' &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        flatObj(obj[key], newKey, result);
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
}
