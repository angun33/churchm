export function isNullOrUndefined(v) {
  return v === null || v === undefined;
}

export function isNotNullAndUndefined(v) {
  return v !== null && v !== undefined;
}

export function isEmptyString(v) {
  return v === null || v === undefined || v === '';
}
