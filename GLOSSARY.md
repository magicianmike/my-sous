# MySous

A kitchen assistant that helps home cooks become more confident and resourceful, alongside a Case Study that explains how and why it was built.

## Language

### People and deliverables

**Cook**:
The person using the app, at home, deciding what to make or making it. Every in-app decision is made for the Cook.
_Avoid_: User (ambiguous with the Case Study's reader), customer

**Case Study**:
The web-accessible write-up of the product's design, UX and architectural decisions, aimed at hiring managers. Lives at its own route on the same site as the app.
_Avoid_: Portfolio page, write-up

**Paired Decision**:
A single product decision traced through both layers: the UX choice and the engineering choice that makes it possible. The Case Study's unit of structure.
_Avoid_: Design note, rationale

### Flavor

**Ingredient**:
A single item in the curated set that the Cook can explore or say they have.
_Avoid_: Item, food

**Pairing**:
A curated relationship between two Ingredients that work well together, always carrying at least one Pairing Reason.
_Avoid_: Match, combo, affinity

**Pairing Reason**:
The plain-language principle explaining why a Pairing works, such as contrast, an aromatic bridge, texture, or culinary tradition.
_Avoid_: Science, explanation, why

**Blend**:
An Ingredient that is itself a mix of other Ingredients, such as za'atar or garam masala, recorded with its typical components and Cuisine.
_Avoid_: Spice mix, seasoning

**Cuisine**:
A regional cooking tradition in which a Pairing is attested, named at regional rather than continental granularity (for example "Sichuan" or "Levantine", never "Asian").
_Avoid_: Culture, ethnic food, authentic

### Dishes

**Combination**:
The one to four Ingredients the Cook wants to cook around, whether they're already in the fridge or something to shop for. It's the one concept the Cook builds, and Formula suggestions are always made for one. The Cook sees it called their **basket** ("Your basket", "Add to your basket"); "Combination" stays in code, content and docs. MySous keeps no record of what the Cook owns (ADR 0004), so the basket never means a pantry or an inventory.
_Avoid_: Selection, cart, idea, pantry, inventory

**Formula**:
An adaptable dish template (for example a pan sauce or a grain bowl) made of Slots that the Cook's Ingredients fill. The Cook sees it called a **dish**; "Formula" stays in code, content and docs. A Formula can have a Recipe; the two aren't the same thing.
_Avoid_: Template, pattern

**Slot**:
A named role within a Formula, such as "an acid" or "a soft herb", that one or more Ingredients can fill. The Cook sees it called a **part** ("every part a dish needs"); "Slot" stays in code, content and docs.
_Avoid_: Placeholder, component

**Suggestion**:
A Formula recommended for a Combination, with its Slots filled and a stated reason for its rank. A Suggestion is **makeable** (shown as "Ready") when the Combination fills every required Slot.
_Avoid_: Result, match, recommendation

**Recipe**:
A Formula's quantities, timings and full method, shown on the dish's page. It's written for its own Ingredients (the recipe as written), which fill any part the Combination and its Pairings leave empty, and it follows every fill and swap: each part's amount is given for particular Ingredients, with a general amount for the rest. A step whose safety depends on a part (poultry temperatures, say) shows the cited safety guidance of the Ingredient that fills it. The Cook sees it called a **recipe**.
_Avoid_: Showcase Recipe (its earlier name, in the original spec), worked example

### Later

**Rescue**:
Guided diagnosis of, and recovery from, a cooking problem that happens mid-cook. Planned as a follow-on, not part of the MVP.
_Avoid_: Troubleshooting, fix-it, help
