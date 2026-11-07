/**
 * The voice guide's banned words (docs/voice-guide.md): MySous never tells the Cook something is
 * easy, or that a dish is authentic. Matched as whole words in any case, so "adjust" passes.
 */
const WORDS = ["easy", "easily", "simply", "just", "authentic"];

// "authentic" also catches "authentically" and "authenticity".
export const BANNED_WORDS = new RegExp(`\\b(${WORDS.join("|").replace("authentic", "authentic\\w*")})\\b`, "i");

const quoted = WORDS.map((word) => `"${word}"`);

/** A banned word quoted on its own, as where the Case Study names the rule: a mention, not a use. */
export const BANNED_WORD_MENTION = new RegExp(quoted.join("|"), "gi");
export const BANNED_WORDS_RULE = `MySous doesn't say ${quoted.slice(0, -1).join(", ")} or ${quoted.at(-1)} (docs/voice-guide.md).`;
