const isType = (type: string, value: any): boolean => typeof value === type;

export const isString = (value: any): value is string => isType('string', value);
export const isRegExp = (value: any): value is RegExp => value instanceof RegExp;
export const isObject = (value: any): value is object =>
  Boolean(value) && !Array.isArray(value) && isType('object', value);
