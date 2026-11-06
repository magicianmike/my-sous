/**
 * The voice guide's banned words (docs/voice-guide.md): MySous never tells the Cook something is
 * easy, or that a dish is authentic. Matched as whole words in any case, so "adjust" passes.
 */
export const BANNED_WORDS = /\b(easy|easily|simply|just|authentic\w*)\b/i;

export const BANNED_WORDS_RULE = `MySous doesn't say "easy", "simply", "just" or "authentic" (docs/voice-guide.md).`;
