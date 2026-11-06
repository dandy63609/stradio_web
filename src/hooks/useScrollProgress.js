/**
 * Clamps a numeric value to [min, max].
 */
export function clamp(val, min = 0, max = 1) {
  return Math.max(min, Math.min(max, val));
}

/**
 * Maps progress p in [start, end] to [0, 1] with optional Hermite smoothstep easing.
 */
export function rangeProgress(p, start, end, smooth = true) {
  const t = clamp((p - start) / (end - start), 0, 1);
  return smooth ? t * t * (3 - 2 * t) : t;
}
