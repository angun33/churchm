import {Directive, ElementRef, Input, forwardRef, Renderer2, OnChanges, SimpleChanges} from "@angular/core";
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";
import {MAT_INPUT_VALUE_ACCESSOR} from "@angular/material/input";
import {isNullOrUndefined} from "../../utils/checks.utils";

export interface ProcessedMask {
  maskedValue: string;
  unmaskedValue: any;
  cursorStart: number;
  cursorEnd: number;
}

export interface Mask {
  /**
   * Process the user raw input value to mask, the actual value, and calculate the cursor position
   *
   * @return ProcessedMask
   */
  process(event:MaskEvent): ProcessedMask;
  mask(cleanValue): string;
}

export const MASK_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputMaskDirective),
  multi: true
};

export interface MaskEvent {
  // the value after user typed
  value: string

  // the last key code that the user typed
  keyPressed:string,

  // the selection before last input
  selectionStart:number,
  selectionEnd:number,

  // the cursor position after the user typed
  cursorPosition:number,

  // the last masked and unmasked value
  lastMaskedValue: string,
  lastUnmaskedValue: any
}

@Directive({
  selector: 'input[mask], textarea[mask]',
  host: {
    '(input)': 'onInput($event.target.value)',
    '(keydown)': 'recordLastKey($event.code)',
    '(beforeinput)': 'recordSelection($event)',
    '(blur)': 'onTouched()'
  },
  providers: [
    MASK_VALUE_ACCESSOR,
    {provide: MAT_INPUT_VALUE_ACCESSOR, useExisting: InputMaskDirective}
  ]
})
export class InputMaskDirective implements ControlValueAccessor, OnChanges {
  @Input() mask: Mask;

  onChange = (_: any) => {};
  onTouched = () => {};

  private event:MaskEvent = {
    value: '',
    keyPressed: '',
    selectionStart: 0,
    selectionEnd: 0,
    cursorPosition: 0,
    lastMaskedValue: '',
    lastUnmaskedValue: null
  }

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  recordLastKey(code) {
    this.event.keyPressed = code;
  }

  recordSelection() {
    this.event.selectionStart = this.el.nativeElement.selectionStart;
    this.event.selectionEnd = this.el.nativeElement.selectionEnd;
    this.event.lastMaskedValue = this.el.nativeElement.value;
  }

  ngOnChanges(changes:SimpleChanges) {
    if (!changes.mask.firstChange) {
      this.writeValue(this.event.lastUnmaskedValue);
    }
  }

  onInput(rawValue) {
    const processedValue = this.mask.process({
      ...this.event, value: rawValue, cursorPosition: this.el.nativeElement.selectionStart
    });

    this.renderer.setProperty(this.el.nativeElement, 'value', processedValue.maskedValue);

    // set the model value
    this.onChange(processedValue.unmaskedValue);
    this.event.lastUnmaskedValue = processedValue.unmaskedValue;
    this.event.lastMaskedValue = processedValue.maskedValue;
    this.event.selectionStart = this.event.cursorPosition;
    this.event.selectionEnd = this.event.cursorPosition;

    // set the cursor location
    this.renderer.setProperty(this.el.nativeElement, 'selectionStart', processedValue.cursorStart);
    this.renderer.setProperty(this.el.nativeElement, 'selectionEnd', processedValue.cursorEnd);
  }

  writeValue(unmaskedValue: any): void {
    this.event.lastUnmaskedValue = unmaskedValue;
    this.event.lastMaskedValue = this.mask.mask(unmaskedValue);

    // set the initial value for cases where the mask is disabled
    const normalizedValue = isNullOrUndefined(unmaskedValue) ? '' : this.event.lastMaskedValue;
    this.renderer.setProperty(this.el.nativeElement, 'value', normalizedValue);
  }

  registerOnChange(fn: (value: any) => any): void { this.onChange = fn }
  registerOnTouched(fn: () => any): void { this.onTouched = fn }

  setDisabledState(isDisabled: boolean) {
    this.renderer.setProperty(this.el.nativeElement, 'disabled', isDisabled)
  }
}
