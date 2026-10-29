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

**Pantry**:
The set of Ingredients the Cook has on hand right now, fridge included.
_Avoid_: Fridge, inventory, my ingredients

### Dishes

**Combination**:
The one to four Ingredients the Cook wants to cook around, whether or not they are in the Pantry. Both entry points (exploring Pairings and starting from the Pantry) converge on a Combination, and Formula suggestions are always made for one.
_Avoid_: Selection, basket, cart, idea

**Formula**:
An adaptable dish template (for example a pan sauce or a grain bowl) made of Slots that the Cook's Ingredients fill.
_Avoid_: Template, recipe, pattern

**Slot**:
A named role within a Formula, such as "an acid" or "a soft herb", that one or more Ingredients can fill.
_Avoid_: Placeholder, component

**Suggestion**:
A Formula recommended for a Combination, with its Slots filled and a stated reason for its rank. A Suggestion is **makeable** when the Combination and Pantry together fill every required Slot.
_Avoid_: Result, match, recommendation

**Tension**:
Two Ingredients in a Combination that have no Pairing between them. MySous names each tension and offers one fix for every Ingredient involved: a swap for an Ingredient that pairs with all the rest of the Combination, or, when none does, removing it.
_Avoid_: Conflict, clash, mismatch

**Showcase Recipe**:
A complete, fixed recipe that serves as a worked example of a Formula filled in.
_Avoid_: Sample recipe, example

### Later

**Rescue**:
Guided diagnosis of, and recovery from, a cooking problem that happens mid-cook. Planned as a follow-on, not part of the MVP.
_Avoid_: Troubleshooting, fix-it, help
