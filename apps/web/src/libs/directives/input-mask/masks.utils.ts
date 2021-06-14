import {format, isValid, parse} from "date-fns";
import {Mask, MaskEvent, ProcessedMask} from "./input-mask.directive";

export class DateMask implements Mask {
  /**
   * @param format dd - for date, MM for months, yyyy for year
   */
  constructor(private format = 'dd/MM/yyyy') {}

  process(event:MaskEvent): ProcessedMask {
    // Handle backspace
    if (event.keyPressed === 'Backspace') {
      return (event.selectionStart === 0 && event.selectionEnd === this.format.length) ?
        {
          unmaskedValue: null,
          maskedValue: '',
          cursorStart: 0,
          cursorEnd: 0
        } :
        {
          unmaskedValue: event.lastUnmaskedValue,
          maskedValue: isValid(event.lastMaskedValue) ? this.mask(event.lastUnmaskedValue) : event.lastMaskedValue,
          cursorStart: event.cursorPosition,
          cursorEnd: event.cursorPosition
        }
    }

    const normalizedValue = this.normalizedValue(event.value.replace(/[^-0-9\/]/, ''), event.cursorPosition);
    let unmaskedValue, maskedValue = normalizedValue;
    try {
      unmaskedValue = parse(normalizedValue, this.format, new Date());
      maskedValue = isValid(unmaskedValue) ? this.mask(unmaskedValue) : normalizedValue;
    } catch(e) {}

    const cursor = { start: event.cursorPosition, end: event.cursorPosition };

    // When the cursor meet with the separator then move after it
    if (maskedValue[event.cursorPosition] === this.format[event.cursorPosition]) {
      cursor.start += 1;
      cursor.end += 1;
    }

    return {
      unmaskedValue,
      maskedValue,
      cursorStart: cursor.start,
      cursorEnd: cursor.end
    };
  }

  mask(value: Date): string {
    return isValid(value) ? format(value, this.format) : '';
  }

  private normalizedValue(rawValue, cursorStart) {
    let normalizedValue = rawValue.length < this.format.length ? this.normalizedLengthValue(rawValue) : rawValue;

    if (rawValue.length > this.format.length) {
      if (DateMask.isPartOfDateFormat(this.format[cursorStart - 1], normalizedValue[cursorStart - 1])) {
        // replace the old value with the new value
        // old value is at the cursor, new value is before the cursor
        // so we remove character at the cursor, which is old value
        normalizedValue = DateMask.splice(normalizedValue, cursorStart, 1);
      }
      else {
        // remove the unwanted character
        normalizedValue = DateMask.splice(normalizedValue, cursorStart - 1, 1);
      }
    }

    return normalizedValue;
  }

  private normalizedLengthValue(rawValue) {
    let normalizedValue = rawValue.length === 1 ? (String(rawValue) + "0000000") : rawValue;
    const characters = this.format.split('');
    for(let index = 1; index <= characters.length; index++) {
      let char = characters[characters.length - index];
      let vChar = normalizedValue[normalizedValue.length - index];

      if (DateMask.isPartOfDateFormat(char, vChar)) continue;

      if (DateMask.isMustBeNumber(char, vChar)) {
        // Insert a zero where it must be a number
        let idx = normalizedValue.length - index < 0 ? 0 : normalizedValue.length - index + 1;
        normalizedValue = DateMask.splice(normalizedValue, idx, 0, '0');
      } else if (char !== vChar) {
        // Insert a separator where it must be
        let idx = normalizedValue.length - index < 0 ? 0 : normalizedValue.length - index + 1;
        normalizedValue = DateMask.splice(normalizedValue, idx, 0, char);
      }
    }

    return normalizedValue;
  }

  private static isPartOfDateFormat(char, vChar) {
    return DateMask.isNumber(char, vChar) || char === vChar;
  }

  // Is the format ask for a number and the value is a number?
  private static isNumber(char, vChar) {
    return (char === 'd' || char === 'M' || char === 'y') && /\d/.test(vChar);
  }

  // Is the format ask for a number but the value is not a number
  private static isMustBeNumber(char, vChar) {
    return (char === 'd' || char === 'M' || char === 'y') && ! /\d/.test(vChar);
  }

  private static splice(string:string, start: number, delCount: number, newSubStr: string = '') {
    return string.slice(0, start) + newSubStr + string.slice(start + Math.abs(delCount));
  }
}
