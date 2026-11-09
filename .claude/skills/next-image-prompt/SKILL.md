---
name: next-image-prompt
description: The image loop for #64, replacing placeholders with reviewed AI-generated images. Use when the user asks for the next image prompt, or hands back a generated image file.
---

# Next image prompt

The author generates each image by hand in Google AI Studio; you hand them the prompt, then take the image back in. Each image is one sub-issue of #64, and its body holds the **prompt**, the reference images to attach, and the alt text. The rules are ADR 0005 and `docs/image-style-guide.md`.

All work happens on the `real-images` branch. Switch to it first; create it from `main` if it's missing.

## "Give me the next prompt"

1. Find the **frontier**, the lowest-numbered open sub-issue with no open blocker:

   ```sh
   gh api repos/{owner}/{repo}/issues/64/sub_issues --paginate \
     --jq '.[] | select(.state=="open" and .issue_dependencies_summary.blocked_by==0) | .number' | sort -n | head -1
   ```

   No number back means either every sub-issue is closed (say so, and offer the PR below) or the rest are blocked by an open anchor (name it).
2. Read its body and reply with exactly this, and nothing more:
   - the issue number and title;
   - the settings line, and which files to attach, as absolute paths so they can be dragged in;
   - the prompt, verbatim, in its own fenced `text` block, so it copies in one go.

Done when the user has a prompt they can paste unedited.

## "Here it is: <file>"

The image belongs to the last prompt you gave. If you gave none this session, it belongs to the frontier; confirm that with the user before going on.

1. **Measure** it: `sips -g pixelWidth -g pixelHeight -g format <file>` and its size on disk. It needs at least 1024 px on its shorter side and must be under 5 MB. If it fails, give the numbers and say how to fix it (in AI Studio, 2K resolution at 3:2), and stop.
2. **Look** at it with the Read tool, and check it against the style guide's look and its "Never show" list. For a Recipe, also check it against the Recipe as written: every filled Slot and fixed line, the garnish, the portion and the doneness, and nothing the Recipe doesn't list. List what you see as concerns, or say you see none.
3. **Ask** the user whether it matches. The review is theirs (ADR 0005): your concerns inform it, and their answer decides it.

### It matches

1. Copy it over `content/images/<id>.png`, converting with `sips -s format png` if it isn't PNG.
2. In the owner's frontmatter (`content/ingredients/<id>.md` or `content/recipes/<id>.md`), delete the placeholder comment above `image:` and set:

   ```yaml
   image:
     file: <id>.png
     alt: <the issue's alt text, adjusted if the image shows something different>
     provenance:
       made: ai-generated
       model: Nano Banana Pro (gemini-3-pro-image-preview), Google AI Studio, 3:2 at 2K
       prompt: <the prompt as sent, plus "Then: <follow-up>" for each edit asked of the model>
       date: "<today>"
       review:
         date: "<today>"
         matches: true
   ```

3. Run `npm run images` and `npm test`. Both must pass.
4. Commit the image and its frontmatter as `<Name>'s image (#<issue>)`, then `gh issue close <issue> --comment "<commit sha>"`.

Done when the issue is closed and the tests pass. Then offer the next prompt.

### It doesn't match

Leave the placeholder in place. Comment on the issue with what was wrong. Then give the user a fix in a fenced `text` block, as one of these:
- a follow-up to send in the same AI Studio chat, for a local fix ("Remove the parsley; keep everything else the same.");
- a revised prompt, for a wrong composition.

Whatever they send becomes the prompt as sent, so carry it into the provenance when the image matches.

## When every sub-issue is closed

Offer to push `real-images` and open the PR that closes #64.
