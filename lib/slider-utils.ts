/**
 * Extracts a single number value from a Slider's onValueChange callback.
 * base-ui Slider passes `number | readonly number[]`.
 */
export function sliderValue(v: number | readonly number[]): number {
  return Array.isArray(v) ? (v[0] as number) : (v as number);
}
