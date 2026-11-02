/**
 * Helper to compute deterministic or random stock scarcity across products.
 * Guarantees every product in the catalogue displays randomly either:
 * - "only 1 pieces left"
 * - "only 2 pieces left"
 * - "only 3 pieces left"
 * 
 * Uses a deterministic hash over product identifier (id, slug, or title)
 * so server and client renders never mismatch during hydration.
 */

export type ScarcityPieces = 1 | 2 | 3;

export function getScarcityPieces(identifier?: string | number): ScarcityPieces {
  if (!identifier) return 2;
  const str = String(identifier);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) % 9973;
  }
  const mod = Math.abs(hash) % 3;
  return (mod + 1) as ScarcityPieces;
}

export function getScarcityText(pieces: ScarcityPieces, uppercase = false): string {
  const text = `only ${pieces} pieces left`;
  return uppercase ? text.toUpperCase() : text;
}
