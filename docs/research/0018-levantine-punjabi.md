# Research for issue #18: Levantine and Punjabi Slot coverage

Scope: new Ingredients za'atar, garam-masala, aleppo-pepper, black-pepper, tamarind, beef, potato, green-beans and cod; re-tags for scallion, lime, cilantro and a possible third Punjabi soft herb; exceptions where a Cuisine has fewer than 3 Ingredients of a Slot type; and Pairings for the new Ingredients. This builds on `docs/research/0017-levantine-punjabi.md` (batch 1) and doesn't repeat it.

## 1. Method

- I fetched and read every URL in the citation key (section 6) during this batch. Quotes are as close to verbatim as the fetch tool returned them. Where I paraphrase an ingredient list or method, it's marked "(paraphrase)".
- Where I lean on evidence from batch 1 that I didn't re-fetch (Helou's tabbouleh [H1][H2], Eat Palestine's fattoush [EP1]), I say "per 0017" and don't add the URL to my key. Use batch 1's citations for those.
- I didn't use The Flavour Thesaurus, The Flavor Bible or any compound or flavour-molecule data (ADR 0001). Wikipedia, search-result summaries and listicles helped me find dishes but aren't cited.
- I didn't try to get round bot blocks. Sites that refused are listed in section 7.
- Source priority:
  - **Levantine:** Reem Kassis (East Fork, Refinery29, NPR's *Fresh Air*), Wafa Shami (Palestine in a Dish), Hadia Zebib (Hadia's Lebanese Cuisine) and Anissa Helou (Substack).
  - **Syrian and Aleppine:** Tom Verde's *New York Times* piece, which quotes Marlene Matar and Nidal Hajomar. For tamarind, Poopa Dweck (*Aromas of Aleppo*) via PRX's *The World*.
  - **Punjabi:** Izzah Cheema (Tea for Turmeric), Kunal Kapur, Sanjeev Kapoor, Anupy Singla and Maunika Gowardhan.
  - **Weaker sources, used for support only and flagged where they appear:** Mariam Nabbout (The Matbakh), Iman (Simply Lebanese), Omayah Cooks, Zaatar and Zaytoun, Muna Kenny, Crystal Rivera (The Nosher), My Heart Beets and Ajay Chopra.
  - **Food safety:** US FDA.
- Abbreviations: L = levantine, P = punjabi.

### Slot coverage after this batch, if all recommendations are taken

| Slot type | Levantine | Punjabi |
|---|---|---|
| protein | chicken-thigh, lamb, **beef**, **cod** (cod is weak, see below) | chicken-thigh, lamb, **cod** |
| acid | lemon, sumac (**exception**, see section 4; tamarind is Aleppine only) | lemon, **lime**, **tamarind** |
| soft herb | mint, parsley, **cilantro** | cilantro, mint (**exception**) |
| heat | chile, **aleppo-pepper**, **black-pepper** | chile, **black-pepper** (**exception**) |
| vegetable | already fine, plus **potato** and **green-beans** | already fine, plus **potato** and **green-beans** (green beans weak) |
| aromatic | already fine | already fine |

## 2. New Ingredients

### Za'atar

- **Suggested category:** blend (gremolata already uses it)
- **Slot types:** garnish. It's a finishing condiment, not an acid or a heat, though its sumac adds sourness.
- **Cuisines:**
  - levantine: Kassis says the condiment is "probably present on every table in any Palestinian, Syrian, Lebanese, Jordanian household" [K4].
  - punjabi: not found. Don't tag it.
- **Typical components:**
  - The dried leaves of the za'atar herb, crushed and "mix[ed] with sesame seeds and sumac" [K3], plus salt: "mixed with sumac, sesame seed and salt" [K4].
  - Where the herb isn't available, Kassis substitutes "½ tsp. each dried oregano and thyme" [K2].
- **Essay points:**
  1. Za'atar is the name of a plant as well as the blend. Kassis: "Za'atar is an actual plant native to the Levant, most closely related to oregano", and "za'atar is not thyme or a mixture of different dried herbs and spices" [K3][K4].
  2. The blend is "traditionally made by drying the herb's leaves and then crushing and mixing them with sesame seeds and sumac" [K3]. The sumac in it gives a sour edge.
  3. The commonest use is the plainest: "You dip pita bread in olive oil and za'atar, and you're good to go" [K4]. It also goes into "doughs, different types of bread and pastries" [K4].
  4. Kassis uses it as a seasoning in cooked dishes too: over eggs in a potato, onion and chilli shakshuka, mixed into labaneh for a tomato salad [K3], and in a chicken marinade [K2].
  5. The fresh leaves are used too, "fresh in salads or folded into pastries" [K3].
- **Tip:** Stir za'atar into olive oil just before you use it, then spoon it over bread, eggs or labneh. Its sesame and dried herb taste best when fresh. (Built on [K4]'s olive-oil-and-bread use.)
- **Cultural context:** Kassis traces za'atar as "a staple in Arab cuisine since the Middle Ages" [K3]. The blend is common at breakfast with bread and olive oil in Palestinian, Syrian, Lebanese and Jordanian homes [K4].
- **Contested:** Many English-language sources describe za'atar as thyme, or as a thyme-based blend. Kassis argues firmly against that [K3][K4]. Shop blends vary, and some add wheat or other fillers (seen only on retail listings, not cited). Write the essay so it doesn't claim one fixed recipe.
- **Food safety:** none.
- **Citations:** [K2], [K3], [K4].

### Garam masala

- **Suggested category:** blend
- **Slot types:** aromatic. It's usually a finishing spice, but it's also cooked in.
- **Cuisines:**
  - punjabi: [C7][C4][SG].
  - levantine: not found. Don't tag it.
- **Typical components:**
  - Cheema names five "essential" spices, black peppercorns, cumin seeds, cinnamon, black cardamom and cloves, and says they are "the main spices used in Punjabi garam masala" [C7].
  - Her full blend also has coriander seeds, fennel seeds, star anise, bay leaves, green cardamom, optional mace and a pinch of nutmeg [C7].
- **Essay points:**
  1. Garam masala is a blend of warm, whole spices, toasted and then ground. There's no fixed ratio: Cheema says, "I have no secret family recipe" [C7].
  2. It "is warming, but not spicy-hot"; "black pepper lends it warmth and sharpness" [C7].
  3. It's often added at the end. Cheema suggests adding it "as a finishing touch along with cilantro, lemon, or other garnishes", though some recipes use it earlier, or in a marinade [C7].
  4. Usage varies:
     - In Cheema's tandoori chicken, it goes into the yogurt marinade: "1 tsp garam masala, or store-bought Tandoori Masala" [C4].
     - Singla adds it with the cauliflower in her Punjabi aloo gobi [SG].
     - Gowardhan's aloo gobi shows no garam masala in its visible ingredients [MG], so it isn't universal.
- **Tip:** Add a pinch at the end of cooking, with the cilantro or lemon, so its aroma stays bright. Ground spices fade, so make or buy small amounts. Cheema keeps hers for "up to 3 months" in an airtight jar [C7].
- **Cultural context:** Cheema describes the blend as "widely used in Indian and Pakistani cuisine" [C7]. Its makeup varies by region and household. One reader on Cheema's page describes a Hyderabadi version with no cumin or coriander; that's a comment, not Cheema's claim.
- **Food safety:** none.
- **Citations:** [C7], [C4], [SG], [MG].

### Aleppo pepper

- **Suggested category:** spice
- **Slot types:** heat
- **Cuisines:**
  - levantine: Syrian (Aleppine) in origin [NYT]. Kassis uses it in her Palestinian pomegranate chicken [K2].
  - punjabi: not found. Don't tag it.
- **Essay points:**
  1. Aleppo pepper is a dried, ground red chilli from around Aleppo in Syria. It's mildly hot and salty-sweet, with a fruity note [NYT].
  2. How it's made explains its texture. The peppers are seeded and sun-dried on rooftops, then "coarsely ground, mixed with salt and olive oil, and dried completely" (paraphrase) [NYT]. So the flakes are slightly oily and salted.
  3. Common uses are sprinkling it over hummus, on kebabs, and blended with red peppers in muhammara [NYT].
  4. Kassis puts 2 tsp in a marinade with sumac, za'atar, cumin and garlic for a whole jointed chicken [K2].
  5. The trade collapsed with the Syrian war. Many growers moved to southern Turkey, where it's now grown from Syrian seed [NYT]. Most "Aleppo pepper" sold today is probably Turkish-grown; I couldn't verify that from an owning source.
- **Tip:** Sprinkle it on at the end as well as cooking it in. Its mild heat lets you use it by the teaspoon, where its colour and fruitiness show.
- **Cultural context:**
  - Marlene Matar: "In Arabic, the Aleppo red pepper is called 'Baladi,' meaning it belongs to my country" [NYT].
  - Nidal Hajomar: "They may use it throughout Syria, like in Damascus and other places, but they make it just in Aleppo" [NYT].
  - Helou calls the pepper paste she brought back from Aleppo in 2010 "possibly the best ever pepper paste" [AH3]. That's paste, not flakes.
- **Food safety:** none.
- **Citations:** [NYT], [K2], [AH3].

### Black pepper

- **Suggested category:** spice
- **Slot types:** heat
- **Cuisines:**
  - punjabi: [C5][C4][C8][C9][C7].
  - levantine: [HZ2][S2][SL1][OM][MK].
- **Essay points:**
  1. In Punjabi cooking, black pepper is both a spice in its own right and one of the five essentials of garam masala [C7].
  2. Cheema's mutton karahi uses it twice: ground pepper boils with the meat, and "1 tsp black peppercorns, freshly ground using a mortar and pestle" goes in at the end with butter and lemon. She advises against pre-ground pepper [C5].
  3. In Lebanese kibbeh, black pepper seasons the meat and bulgur shell, "½ tsp Black Pepper" with cinnamon and seven-spice [HZ2]. It's also one of the usual spices in Lebanese seven-spice mixes (Simply Lebanese lists it [SL2], supporting only).
  4. It's often the plain background seasoning in Levantine home cooking: "Salt and pepper, to taste" in Shami's kafta [S2], and "½ tsp. Black Pepper" in loubye bzeit [SL1] (supporting).
- **Tip:** Grind it fresh, and add some at the end; Cheema grinds whole peppercorns for the finish of a karahi [C5].
- **Cultural context:** Common in Punjabi meat curries and marinades, and in Levantine meat and rice dishes, usually alongside allspice and cinnamon [HZ2][OM].
- **Exception note:** Black pepper raises Punjabi heat to 2 (with chile). See section 4.
- **Food safety:** none.
- **Citations:** [C4], [C5], [C7], [C8], [C9], [HZ2], [S2], [SL1], [SL2], [OM], [MK].

### Tamarind

- **Suggested category:** condiment (sold as a pulp or concentrate)
- **Slot types:** acid
- **Cuisines:**
  - punjabi: as imli ki chutney [C4][C9][C10].
  - levantine: **contested, so don't tag it at Levantine level.** It's attested for Aleppo, but chiefly through Syrian Jewish cooking [PD][CR]. Batch 1's Palestinian and Lebanese sources didn't use it.
- **Essay points:**
  1. Tamarind is the sour, sticky pulp of a tropical pod. Cooks usually buy it as a concentrate and use it for sweet-sour depth rather than a sharp, bright acid.
  2. In Punjabi and Pakistani cooking, it's mostly met as imli ki chutney:
     - Cheema calls it "an essential chaat topping" [C9] and "a compulsory dahi bhalla topping" [C10].
     - Her quick version mixes tamarind concentrate with brown sugar, hot water, red chilli powder and salt [C10].
  3. It's also served beside grilled food. Cheema serves tandoori chicken "with lime/lemon, thinly sliced red onion, and Mint Raita or Imli ki (Tamarind) Chutney" [C4].
  4. In Aleppo, Poopa Dweck calls tamarind the "sour secret of Syrian cooking":
     - It's used "as a flavoring" in meat-stuffed grape leaves and bulgur salad [PD].
     - She cooks it into a concentrate, ou', with lemon juice and sugar [PD].
- **Tip:** Balance it with something sweet; tamarind on its own is very sour, which is why Punjabi chutneys add sugar or jaggery [C10].
- **Cultural context:**
  - In Punjab, tamarind is a condiment for chaat, kebabs and snacks rather than a cooking acid [C9][C10]. Lemon does most of the in-pan souring (batch 1).
  - Dweck says tamarind "came from India via Persia to Aleppo, Syria, in the seventh century" [PD].
  - For the Formula, tamarind fits "acid" best as a finishing condiment, not a deglazing acid. Consider whether the pan-sauce Formula should accept it.
- **Food safety:** none.
- **Citations:** [C4], [C9], [C10], [PD], [CR].

### Beef

- **Suggested category:** meat
- **Slot types:** protein
- **Cuisines:**
  - levantine: kafta [S2], kibbeh [HZ2], fasolia [S3], Aleppine meatballs [CR].
  - punjabi: **Pakistani Punjab only.** Cheema lists "Aloo Keema: Ground Beef and Potato Curry" among her Punjabi recipes [C1]. Beef is rarely eaten in Indian Punjab, but I didn't fetch a source saying so (section 7). Recommend tagging levantine only for now.
- **Essay points:**
  1. In Levantine cooking, beef and lamb are often interchangeable:
     - Shami's kafta is "1 pound ground beef or lamb (or half of each)", and she suggests 80/20 or 85/15 beef for juiciness [S2].
     - Her fasolia uses "1 pound beef or lamb" [S3].
  2. Zebib's grilled kibbeh shell is "500 g 1 lb Lean Goat or Beef" pounded with fine bulgur, onion, basil, black pepper, cinnamon and seven-spice. The filling uses goat or lamb fat [HZ2].
  3. Kafta is usually mixed with onion, parsley and allspice. Shami bakes it with thin rounds of potato, then pours tahini sauce over [S2].
  4. In Aleppine Syrian Jewish cooking, beef meatballs are simmered in tamarind, tomato paste and lemon juice [CR].
- **Tip:** Lean beef dries out, so for kafta choose beef with some fat (about 80/20), as Shami suggests [S2].
- **Cultural context:** Common in Palestinian, Lebanese and Syrian meat dishes, often swapped for lamb or goat depending on the household and what's available [S2][HZ2][OM].
- **Food safety (FDA):**
  - "Cook ground beef, veal, lamb, and pork to at least 160° F (71° C)."
  - "Cook beef, pork, veal, and lamb roasts, steaks, and chops to at least 145° F (63° C), with a 3 minute rest time." [FDA1]
  - Kibbeh nayeh (raw kibbeh) exists. Zebib notes kibbeh can be "fried, baked, grilled, or served raw" [HZ2]. MySous should give only the cooked temperatures.
- **Citations:** [S2], [S3], [HZ2], [CR], [C1], [OM], [FDA1].

### Potato

- **Suggested category:** produce
- **Slot types:** vegetable
- **Cuisines:**
  - punjabi: aloo gobi [SG][MG], aloo tikki [C9], and Cheema's list of aloo dishes (aloo gosht, aloo keema, aloo palak, aloo baingan) [C1].
  - levantine: baked with kafta [S2], batata harra [MN], potato shakshuka with za'atar [K3]. Kassis serves her chicken "with some roast potatoes or vegetables" [K2].
- **Essay points:**
  1. In Punjabi cooking, potato is the partner vegetable in many sabzis and curries. Cheema's Punjabi roundup lists aloo gobi, aloo palak, aloo baingan, aloo gosht and aloo keema [C1].
  2. Gowardhan boils the potatoes before they go into aloo gobi, because boiled chunks "soak up the spice flavour" (paraphrase) and speed up cooking [MG]. Singla cooks them raw and unpeeled in the pan [SG].
  3. For Lebanese batata harra, the potatoes are usually fried, then tossed with olive oil, garlic and cilantro. Nabbout calls double frying the most popular method in Lebanon [MN].
  4. Mashed potato is the base of aloo tikki, shaped with onion, chilli, cilantro, mint and spices, then pan-fried [C9].
- **Tip:** Parboil the cubes before frying or roasting; they brown faster and stay soft inside [MN][MG].
- **Cultural context:**
  - Nabbout says batata harra is "always" served with lemon wedges, and in North Lebanon it comes with fried fish [MN].
  - Cheema calls aloo tikki "traditionally considered a street food or Chai-time snack" [C9].
- **Food safety:** none specific. Ordinary produce handling applies.
- **Citations:** [SG], [MG], [C1], [C9], [S2], [MN], [K2], [K3].

### Green beans

- **Suggested category:** produce
- **Slot types:** vegetable
- **Cuisines:**
  - levantine: fasolia with meat [S3][OM], loubieh or loubye bi zeit [SL1].
  - punjabi: **weak.** Aloo beans is called a "popular Punjabi potato and green bean stir-fry" by My Heart Beets [MHB], whose author doesn't state a Punjabi connection. Chef Ajay Chopra's aloo beans has cumin, garlic and garam masala but calls it only "a classic Indian dish" [AC]. Tag Punjabi only if the reviewer accepts this; I'd hold it.
- **Essay points:**
  1. In Levantine cooking, green beans are usually braised slowly in tomato with olive oil, often with onion and garlic, until very soft [S3][SL1][OM].
  2. There are two common styles:
     - With meat (beef or lamb) and allspice, served hot with vermicelli rice [S3].
     - Meatless, "bi zeit" (in oil), served at room temperature with pita [SL1].
  3. Shami notes that long string beans (loubiyah) are usually cooked vegan, with only tomatoes and olive oil [S3].
  4. In north Indian aloo beans, the beans are stir-fried dry with potatoes, cumin seeds and ground spices [AC][MHB].
- **Tip:** For a Levantine braise, cook the beans until they're fully tender and have soaked up the tomato; they aren't meant to be crisp [S3][SL1].
- **Cultural context:** Shami grew up eating fasolia in summer, "when green beans are grown and freshly picked" (paraphrase) [S3].
- **Food safety:** none specific. Ordinary produce handling applies.
- **Citations:** [S3], [SL1], [OM], [AC], [MHB].

### Cod (or firm white fish)

- **Suggested category:** seafood
- **Slot types:** protein
- **Cuisines:**
  - punjabi:
    - Cheema's fish curry, tagged "Indian, Pakistani, Punjabi", uses "any type of firm white fish such as: cod (pictured here)" [C8].
    - Amritsari fish is a well-known Punjabi fried fish [KK2][SK]. It's traditionally made with river or pond fish such as "singhara, surmai and sole" [KK2], or "especially surmai" [SK], not cod.
  - levantine: **weak.**
    - Sayadieh is a fish and rice dish. Zaatar and Zaytoun say it "can be made with any white fish such as sea bass, sea bream or even cod" [ZZ], and Muna Kenny lists cod as an option [MK]. Neither is a strong owning source.
    - Nabbout mentions fried fish with batata harra in North Lebanon [MN].
    - Tag levantine only if the reviewer accepts these; otherwise the Levantine protein count is already 3 with beef.
- **Essay points:**
  1. Cod is a lean, flaky white fish. It holds up to spice, but it falls apart if you stir it in a sauce.
  2. Cheema pan-fries the fish "4 minutes per side, until cooked through and golden" before adding it to the curry, because otherwise "the fish pieces are more likely to break and disintegrate" [C8].
  3. Amritsari fish is coated very lightly in besan (gram flour) with ajwain, ginger-garlic paste, turmeric, chilli and lemon juice. It's fried twice, then finished with chaat masala [KK2].
  4. Sayadieh pairs fried white fish with rice cooked with deeply browned onions and cumin, usually with tahini sauce [ZZ][MK].
- **Tip:** Turn fish with two spatulas, a large one to lift and a small one to steady it, so the fillet stays whole [C8].
- **Cultural context:** Kapur says Amritsari fish is "made specifically with pond and river fish caught over early morning picnics" [KK2]. Present cod as a common substitute outside Punjab [C8], not the traditional fish.
- **Food safety (FDA):**
  - "Finfish should be cooked to an internal temperature of 145° F (63° C)." Without a thermometer, "Cook fish until it's opaque (milky white) and flakes with a fork" [FDA1].
  - Keep fresh fish at 40°F / 4°C or below and use it within 2 days, or freeze it.
  - Thaw it in the fridge overnight, or sealed in cold water [FDA2].
- **Citations:** [C8], [KK2], [SK], [ZZ], [MK], [MN], [FDA1], [FDA2].

## 3. Re-tags

- **Scallion as Levantine: confirm.**
  - Helou uses spring onions in tabbouleh (per 0017 [H1][H2]), and the parsley + scallion Pairing already exists.
  - Kassis's Palestinian split-pea falafel uses "4 scallions (spring onions), or 1 small onion, halved" [K2].
  - Add `levantine` to scallion.
- **Lime as Punjabi: confirm, with a naming caveat.**
  - Cheema serves tandoori chicken "with lime/lemon" [C4].
  - The UC Riverside Citrus Variety Collection identifies the West Indian or Mexican lime with "the kaghzi nimbu … of India" [UCR], the small acid lime that's widely cooked with in north India.
  - Many English-language Punjabi recipes write "lemon" for nimbu, so lemon and lime overlap here. Note in the cultural context that the two are often used interchangeably. Add `punjabi` to lime.
- **Third Levantine soft herb: confirm cilantro; hold dill.**
  - Cilantro:
    - Zebib's arnabeet harra uses "1 cup finely chopped cilantro" with garlic and lemon, and she says it's inspired by Lebanese batata harra [HZ3].
    - Nabbout's batata harra lists "4 tablespoons chopped cilantro (coriander)" [MN].
    - Kassis's Palestinian pomegranate chicken sauce blends "1 ½ cups … sprigs fresh cilantro" with parsley, jalapeños, garlic, labneh and lemon [K2].
    - Batch 1 found it weak because it looked only at tabbouleh-style dishes. These sources make it reasonable as "common in some dishes". Add `levantine` to cilantro.
  - Dill: it's strongly attested for Gaza. SBS reports El-Haddad naming "dill (both fresh green and in seed form)" among Gaza's dominant flavours [SBS], and dagga, Gaza's "most basic and most frequently served salad" [GK], is built on dill, tomatoes and hot chillies [SBS]. But it's sub-regional, and dill isn't in content yet. Consider it as a future Ingredient tagged levantine with a Gaza note.
- **Third Punjabi soft herb: reject fenugreek leaves as a soft herb.**
  - The sources I read use fenugreek leaves (methi) dried, as kasoori methi:
    - Singla crushes them into the pan at the start [SG].
    - Gowardhan scatters them at the end [MG].
    - Cheema puts them in the tandoori marinade [C4] and in sarson ka saag [C1].
  - That's a dried seasoning, not a fresh, soft finishing herb. Fresh methi is usually cooked down as a green (aloo methi), and I found only recipe aggregators for that, so it's not cited.
  - If added later, fenugreek leaves fit an aromatic or a new "dried herb" role better than soft herb. See the exception in section 4.

## 4. Exceptions

- **Punjabi soft herb: 2 (cilantro, mint).**
  - The Punjabi sources show cilantro and mint as the fresh finishing herbs:
    - Cheema's green chutney is "Mint and Cilantro Chutney (Hari Chutney)" [C9][C10].
    - Her karahi and fish curry finish with cilantro [C5][C8], and Kapur's Amritsari fish adds no fresh herb [KK2].
  - The other leaf, fenugreek, is used dried as a seasoning [SG][MG][C4] (section 3).
  - No source states "only two", so this is shown, not said.
- **Punjabi heat: 2 (chile, black pepper).**
  - Punjabi heat comes from chile in many forms plus black pepper. Cheema's mutton karahi alone uses:
    - fresh serrano or finger chillies;
    - "1 tsp Kashmiri red chili powder";
    - "1/2 tsp red chili flakes";
    - Thai green chillies to garnish;
    - freshly ground black peppercorns [C5].
  - Kapur's Amritsari fish uses chilli powder [KK2], and Singla's aloo gobi uses fresh Thai or serrano chillies and red chile powder [SG]. All of those fall under MySous's single `chile`.
  - Cheema also notes garam masala "is warming, but not spicy-hot" [C7], so it shouldn't count as heat.
- **Levantine acid: 2 (lemon, sumac), unless tamarind is tagged.**
  - Kassis frames sumac as the alternative to the region's other sours: "Sumac can be used in place of lemon juice or pomegranate molasses or anytime you want something sour" [K3].
  - Gaza's souring agents are "sour pomegranate juice, lemons, sour plums" [SBS].
  - Tamarind is Aleppine and mostly attested through Syrian Jewish cooking [PD]. Tagging it Levantine would overstate it.
  - The well-sourced third Levantine acid is **pomegranate molasses**, which isn't in scope. Recommend recording this exception now and proposing pomegranate molasses in a later batch. It's in Kassis's chicken [K2] and optional in Shami's kafta [S2].

## 5. Pairings

None of these are in `pairings.yaml`; every new Ingredient is new to the file. Quotes are short.

### Za'atar

1. **za'atar + sumac** (aromatic bridge, L)
   - Claim: Sumac is one of za'atar's own components, so extra sumac deepens its sourness.
   - Sources: [K3], "crushing and mixing them with sesame seeds and sumac". [K4]: "mixed with sumac, sesame seed and salt".
2. **za'atar + tomato** (contrast, L)
   - Claim: Za'atar's dry, herbal sourness seasons ripe tomatoes in Palestinian salads.
   - Sources: [K2], "Tomato and Za'atar Bread Salad", 1 Tbsp za'atar with 300 g tomatoes. [K3]: "Tomato Salad with Labaneh and Za'atar".
3. **za'atar + potato** (tradition, L)
   - Claim: Kassis sprinkles za'atar over a potato, onion and chilli shakshuka.
   - Source: [K3], "Potato, Onion, and Chili Shakshuka with Za'atar", with 2 tsp za'atar sprinkled over the eggs (paraphrase).
4. **za'atar + yogurt** (contrast, L)
   - Claim: Za'atar is mixed into labaneh, strained yogurt, whose creaminess carries the herb.
   - Source: [K3], "scant 1 tbsp za'atar blend … mixed into the labaneh" (paraphrase).
5. **za'atar + mint** (aromatic bridge, L)
   - Claim: Fresh mint and za'atar season the same Palestinian bread salad.
   - Source: [K2], "1 Tbsp za'atar" with "3 sprigs fresh mint".
6. **za'atar + chicken-thigh** (tradition, L)
   - Claim: Za'atar goes into Kassis's marinade for jointed chicken.
   - Source: [K2], "1 tsp crushed dried za'atar" in the marinade for "1 whole chicken … jointed". The cut isn't thigh-specific.

### Garam masala

7. **garam-masala + chicken-thigh** (tradition, P)
   - Claim: Garam masala seasons the yogurt marinade for tandoori chicken legs.
   - Source: [C4], "1 tsp garam masala", with "chicken leg quarters".
8. **garam-masala + cauliflower** (tradition, P)
   - Claim: Garam masala goes into Punjabi aloo gobi with the cauliflower.
   - Source: [SG], "Add the cauliflower, garam masala, coriander powder, red chile, and salt."
9. **garam-masala + potato** (tradition, P)
   - Claim: Garam masala seasons potato in aloo gobi and aloo beans.
   - Sources: [SG], potato and "2 teaspoons garam masala". [AC] (supporting): "1/2 tsp Garam Masala" with "4 Potatoes".
10. **garam-masala + cumin** (aromatic bridge, P)
    - Claim: Cumin is one of garam masala's five essential spices, so the two share a warm, earthy base.
    - Source: [C7], "The essential 5 also happen to be the main spices used in Punjabi garam masala" (the five include cumin seeds).
11. **garam-masala + cilantro** (contrast, P)
    - Claim: Garam masala and fresh cilantro are often added together at the end of a curry.
    - Source: [C7], "add Garam Masala as a finishing touch along with cilantro, lemon". [C1]: chicken curry "garnished with cilantro and garam masala".
12. **garam-masala + lemon** (contrast, P)
    - Claim: Lemon's sharpness lifts warm garam masala when both finish a dish.
    - Source: [C7], "a finishing touch along with cilantro, lemon".

### Aleppo pepper

13. **aleppo-pepper + sumac** (contrast, L)
    - Claim: Mild, fruity heat and sumac's sourness season the same Palestinian chicken marinade.
    - Source: [K2], "2 tsp Aleppo pepper" with "1 tsp sumac".
14. **aleppo-pepper + za'atar** (aromatic bridge, L)
    - Claim: Aleppo pepper and za'atar are rubbed onto chicken together.
    - Source: [K2], the same marinade lists Aleppo pepper and "crushed dried za'atar".
15. **aleppo-pepper + garlic** (tradition, L)
    - Claim: Garlic and Aleppo pepper season Kassis's chicken marinade.
    - Source: [K2], "1 Tbsp garlic granules" with "2 tsp Aleppo pepper". Granulated garlic, not fresh.
16. **aleppo-pepper + cumin** (aromatic bridge, L)
    - Claim: A little cumin sits under Aleppo pepper in the same marinade.
    - Source: [K2], "¼ tsp ground cumin" with Aleppo pepper.
17. **aleppo-pepper + chicken-thigh** (tradition, L)
    - Claim: Aleppo pepper seasons Kassis's roast chicken.
    - Source: [K2], "2 tsp Aleppo pepper" for "1 whole chicken … jointed". Not thigh-specific.

   Weak set: all five come from one Kassis recipe. [NYT] supports Aleppo pepper over kebabs and hummus, but it doesn't name the meat.

### Black pepper

18. **black-pepper + lamb** (tradition, P)
    - Claim: Freshly ground black pepper finishes mutton karahi, with butter and lemon.
    - Source: [C5], "1 tsp black peppercorns, freshly ground … plus more for garnish".
19. **black-pepper + beef** (tradition, L)
    - Claim: Black pepper seasons the beef and bulgur shell of Lebanese kibbeh.
    - Source: [HZ2], "Lean Goat or Beef" with "½ tsp Black Pepper".
20. **black-pepper + chicken-thigh** (tradition, P)
    - Claim: Ground black pepper goes into the tandoori marinade.
    - Source: [C4], "1/2 tsp ground black pepper", with leg quarters.
21. **black-pepper + cod** (tradition, P)
    - Claim: Black pepper seasons Punjabi fish curry made with cod.
    - Source: [C8], "black pepper: a quarter teaspoon, freshly ground", with "cod (pictured here)".
22. **black-pepper + potato** (tradition, L and P)
    - Claim: Black pepper seasons Lebanese batata harra and Punjabi aloo tikki.
    - Sources: [MN], "1 teaspoon black pepper" with "5 large potatoes". [C9]: black pepper in the tikki mix (paraphrase).
23. **black-pepper + garam-masala** (aromatic bridge, P)
    - Claim: Black pepper is one of garam masala's essentials and gives it its sharpness.
    - Source: [C7], "black pepper lends it warmth and sharpness."

### Tamarind

24. **tamarind + potato** (contrast, P)
    - Claim: Sweet-sour tamarind chutney is a usual topping for potato chaat such as aloo tikki.
    - Source: [C9], "This tangy and sweet chutney is an essential chaat topping."
25. **tamarind + chicken-thigh** (contrast, P)
    - Claim: Tamarind chutney is served beside tandoori chicken to cut its smoky richness.
    - Source: [C4], "Mint Raita or Imli ki (Tamarind) Chutney".
26. **tamarind + yogurt** (contrast, P)
    - Claim: Tamarind chutney is spooned over yogurt in dahi bhalla.
    - Source: [C10], dumplings "doused in yogurt (dahi) and topped with sweet and spicy chutneys", with imli chutney "a compulsory dahi bhalla topping".
27. **tamarind + chile** (contrast, P)
    - Claim: A little red chilli powder sharpens sweet-sour tamarind chutney.
    - Source: [C10], "1 tbsp tamarind concentrate, 1/8 tsp red chili powder".
28. **tamarind + lemon** (aromatic bridge, Aleppine; don't tag levantine)
    - Claim: Aleppine cooks cook tamarind down with lemon juice into the concentrate ou'.
    - Sources: [PD], "cooks down this liquid with sour salt, lemon juice and sugar". [CR] (supporting): tamarind and "juice from 1 lemon" in the meatball sauce.
29. **tamarind + beef** (tradition, Aleppine; don't tag levantine)
    - Claim: Beef meatballs are simmered in tamarind sauce in Syrian Jewish cooking.
    - Source: [CR], "3 lbs ground beef" with "good quality tamarind concentrate". Supporting strength only.

### Beef

30. **beef + parsley** (tradition, L)
    - Claim: Parsley is chopped into ground beef for Palestinian kafta.
    - Source: [S2], "1 pound ground beef or lamb" and "1 bunch fresh parsley".
31. **beef + potato** (tradition, L)
    - Claim: Kafta is baked between thin rounds of potato under tahini sauce.
    - Source: [S2], "2-3 medium size Yukon golden potatoes", sliced thin and placed between the kafta (paraphrase).
32. **beef + onion** (tradition, L)
    - Claim: Onion is mixed into kafta and pounded into the kibbeh shell.
    - Sources: [S2], "1 sweet onions". [HZ2]: "1 Onion quartered" with "Lean Goat or Beef".
33. **beef + green-beans** (tradition, L)
    - Claim: Beef and green beans stew together in tomato for Palestinian fasolia.
    - Sources: [S3], "1.5 pounds green beans" and "1 pound beef or lamb". [OM]: beef shank or lamb.
34. **beef + mint** (contrast, L)
    - Claim: Fresh mint or basil goes into the filling of grilled kibbeh, freshening the rich meat.
    - Source: [HZ2], "Handful of Fresh Basil or Mint" in the filling. The filling meat is lamb fat, so this is loose; the shell is beef.
35. **beef + garlic** (tradition, L)
    - Claim: Garlic seasons beef kafta, and its tahini sauce.
    - Source: [S2], "2-3 garlic cloves" in the kafta and "2 cloves garlic" in the sauce.

### Potato

36. **potato + cauliflower** (tradition, P)
    - Claim: Potato and cauliflower cook together dry in Punjabi aloo gobi.
    - Sources: [SG], "1 medium russet potato" and "1 medium head of cauliflower". [MG]: "260gms potatoes boiled" with "480gms cauliflower".
37. **potato + cilantro** (contrast, L and P)
    - Claim: Fresh cilantro is tossed through Lebanese batata harra and mixed into Punjabi aloo tikki.
    - Sources: [MN], "4 tablespoons chopped cilantro (coriander)". [C9]: cilantro in the tikki (paraphrase).
38. **potato + garlic** (tradition, L)
    - Claim: Fried potatoes are tossed in garlic and olive oil for batata harra.
    - Source: [MN], "6 garlic cloves, minced", with potatoes "finished in a pan with olive oil, garlic, and cilantro" (paraphrase).
39. **potato + cumin** (aromatic bridge, P)
    - Claim: Cumin seeds sizzled in oil start Punjabi potato sabzis.
    - Sources: [SG], "2 teaspoons cumin seeds" before the potato and cauliflower. [C9]: cumin seeds and powder in aloo tikki.
40. **potato + mint** (contrast, P)
    - Claim: Mint is mixed into aloo tikki and served with it as green chutney.
    - Source: [C9], mint in the tikki, served with "Mint and Cilantro Chutney (Hari Chutney)".
41. **potato + lamb** (tradition, P)
    - Claim: Potatoes cook into lamb or mutton curry as aloo gosht.
    - Source: [C1], "Aloo Gosht: Mutton/Lamb and Potato Curry." Title only, so supporting strength.

### Green beans

42. **green-beans + tomato** (tradition, L)
    - Claim: Green beans are braised in tomato and olive oil for Levantine fasolia and loubieh.
    - Sources: [S3], "Juice of 4-5 medium fresh, ripe tomatoes". [SL1]: "14.5 oz Diced Tomatoes".
43. **green-beans + onion** (tradition, L)
    - Claim: Onion softened in oil is the base of the green-bean stew.
    - Sources: [S3], "1 yellow onion". [SL1]: "1 Large Onion".
44. **green-beans + garlic** (tradition, L)
    - Claim: Garlic cooks into Lebanese and Syrian braised green beans.
    - Sources: [SL1], "6 Cloves of Garlic". [OM]: "one whole head, peeled" (paraphrase).
45. **green-beans + lamb** (tradition, L)
    - Claim: Fasolia is often made with lamb as well as beef.
    - Sources: [S3], "1 pound beef or lamb". [OM]: "Beef shank or lamb".
46. **green-beans + potato** (tradition, P; weak)
    - Claim: Green beans and potatoes stir-fry dry with cumin in north Indian aloo beans.
    - Sources: [MHB], "popular Punjabi potato and green bean stir-fry". [AC]: "4 Potatoes" with "1 cup French Beans".
47. **green-beans + cumin** (aromatic bridge, P; weak)
    - Claim: Cumin seeds temper the oil for aloo beans.
    - Source: [AC], "1 tsp Jeera (Cumin Seeds)" with French beans.

### Cod

48. **cod + lemon** (contrast, P)
    - Claim: Lemon juice goes into the marinade for Amritsari fish and is squeezed over it at the table.
    - Sources: [KK2], "Lemon juice, 2 tbsp". [SK]: "6-8 lemon wedges". [C8]: lemon in the marinade and as a finish.
49. **cod + ginger** (aromatic bridge, P)
    - Claim: Ginger-garlic paste seasons Amritsari fish, and ginger cooks into Punjabi fish curry.
    - Sources: [KK2], "Ginger garlic paste, 1½ tsp". [C8]: "a 1-inch piece, plus julienned ginger for garnish".
50. **cod + tomato** (tradition, P)
    - Claim: Fried cod is finished in a tomato and onion masala for Punjabi fish curry.
    - Source: [C8], "two ripe Roma or plum tomatoes".
51. **cod + cilantro** (contrast, P)
    - Claim: Fresh cilantro finishes the fish curry.
    - Source: [C8], "three tablespoons, chopped".
52. **cod + onion** (tradition, L and P)
    - Claim: Deeply browned onions flavour the rice of sayadieh, and onion is the base of Punjabi fish curry.
    - Sources: [ZZ] and [MK] (onions in the rice). [C8]: "two medium yellow onions".
53. **cod + cumin** (aromatic bridge, L and P)
    - Claim: Cumin seasons both sayadieh and Punjabi fish curry.
    - Sources: [MK], "1 teaspoon of cumin powder" in the rice (paraphrase). [ZZ]: cumin. [C8]: cumin powder.
54. **cod + potato** (tradition, L)
    - Claim: In North Lebanon, batata harra is served with fried fish.
    - Source: [MN], it's "served with fried fish" in North Lebanon (paraphrase). One writer's regional note, so supporting strength.

## 6. Citation key

[AC] Aloo Beans Sabji Recipe, Chef Ajay Chopra. https://chefajaychopra.com/food-recipes/aloo-beans-sabji-recipe/
[AH3] Aleppo Pepper Paste, Anissa Helou, Belly Dancer in the Kitchen (Substack; preview only). https://anissahelou.substack.com/p/aleppo-pepper-paste
[C1] 50+ Traditional Punjabi Recipes, Izzah Cheema, Tea for Turmeric. https://www.teaforturmeric.com/punjabi-recipes/
[C4] Tandoori Chicken, Izzah Cheema, Tea for Turmeric. https://www.teaforturmeric.com/tandoori-chicken/
[C5] Mutton Karahi (Goat/Lamb Karahi), Izzah Cheema, Tea for Turmeric. https://www.teaforturmeric.com/mutton-karahi-goat-lamb-karahi/
[C7] Garam Masala Recipe, Izzah Cheema, Tea for Turmeric. https://www.teaforturmeric.com/garam-masala-recipe/
[C8] Fish Curry (Fish Masala), Izzah Cheema, Tea for Turmeric. https://www.teaforturmeric.com/fish-curry-fish-masala/
[C9] Crispy Aloo Tikki, Izzah Cheema, Tea for Turmeric. https://www.teaforturmeric.com/aloo-tikki/
[C10] Dahi Bhalla (Dahi Bara), Izzah Cheema, Tea for Turmeric. https://www.teaforturmeric.com/dahi-bhalla/
[CR] Syrian Meatballs with Tamarind Sauce, Crystal Rivera, The Nosher (My Jewish Learning). https://www.myjewishlearning.com/the-nosher/syrian-meatballs-with-tamarind-sauce-recipe/
[FDA1] Meat, Poultry & Seafood (Food Safety for Moms-to-Be), U.S. Food and Drug Administration. https://www.fda.gov/food/people-risk-foodborne-illness/meat-poultry-seafood-food-safety-moms-be
[FDA2] Selecting and Serving Fresh and Frozen Seafood Safely, U.S. Food and Drug Administration. https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely
[GK] Gazan Hot Tomato and Dill Salad, Laila El-Haddad and Maggie Schmitt, *The Gaza Kitchen*, ckbk (intro only). https://app.ckbk.com/recipe/gaza70968c02s001r001/gazan-hot-tomato-and-dill-salad
[HZ2] Kibbeh Mishwieh (Grilled Kibbeh), Hadia Zebib, Hadia's Lebanese Cuisine. https://hadiaslebanesecuisine.com/blog/kibbeh-mishwieh-grilled-kibbeh/
[HZ3] Arnabit Harra (Spicy Cauliflower), Hadia Zebib, Hadia's Lebanese Cuisine. https://hadiaslebanesecuisine.com/blog/arnabit-harra-spicy-cauliflower/
[K2] Palestinian Table recipes (split pea falafel, tomato and za'atar bread salad, pomegranate chicken), Reem Kassis, East Fork. https://eastfork.com/pages/palestinian-table-recipes-reem-kassis
[K3] Za'atar and sumac recipes from *The Arabesque Table*, Reem Kassis, Refinery29. https://www.refinery29.com/en-gb/reem-kassis-the-arabesque-table-zaatar-recipes
[K4] For This Palestinian Cook, The Kitchen Is A 'Powerful Place' (Reem Kassis interview), Terry Gross, NPR *Fresh Air* (via Alabama Public Radio). https://www.apr.org/arts-life/2021-04-07/for-this-palestinian-cook-the-kitchen-is-a-powerful-place-not-a-life-sentence
[KK2] Amritsari Fish Fry, Kunal Kapur. https://www.chefkunalkapur.com/recipe/amritsari-fish-fry/
[MG] Punjabi Aloo Gobi, Maunika Gowardhan. https://maunikagowardhan.co.uk/cook-in-a-curry/punjabi-aloo-gobi/
[MHB] Instant Pot Aloo Beans, Ashley, My Heart Beets (supporting only). https://myheartbeets.com/instant-pot-aloo-beans/
[MK] Sayadieh, Muna Kenny, Munaty Cooking (supporting only). https://www.munatycooking.com/sayyadieh/
[MN] Batata Harra (Lebanese Fried Potato Chunks), Mariam Nabbout, The Matbakh. https://thematbakh.com/batata-harra-lebanese-spicy-potatoes-with-cilantro/
[NYT] The Long Journey of the Aleppo Pepper, Tom Verde, *The New York Times* (republished by WRAL). https://www.wral.com/the-long-journey-of-the-aleppo-pepper/17904371/
[OM] Fasolia (Syrian Green Beans with Beef and Tomato), Omayah Cooks (supporting only). https://www.omayahcooks.com/blog/2019/1/30/fosolia-syrian-braised-green-beans-with-lamb
[PD] Tamarind is the 'sour secret of Syrian cooking' (Poopa Dweck), Emma Morgenstern, PRX *The World*. https://theworld.org/stories/2014/07/02/poopa
[S2] Palestinian Kafta with Tahini Sauce, Wafa Shami, Palestine in a Dish. https://palestineinadish.com/recipes/kiftah-bi-tahini-sauce/
[S3] Fasolia (green bean stew), Wafa Shami, Palestine in a Dish. https://palestineinadish.com/recipes/fasolia-green-bean-stew/
[SBS] Shining a light on the forgotten food of Gaza, Mariam Digges, SBS Food. https://www.sbs.com.au/food/article/shining-a-light-on-the-forgotten-food-of-gaza/ttjljs5o5
[SG] Stovetop: Punjabi Aloo Gobi, Anupy Singla, Indian As Apple Pie. https://www.indianasapplepie.com/blogs/indian-as-apple-pie/aloo-gobi
[SK] Amritsari Fish, Sanjeev Kapoor. https://www.sanjeevkapoor.com/Recipe/Amritsari-Fish-Khazana-of-Indian-Recipes.html
[SL1] Loubye Bzeit, Iman, Simply Lebanese (supporting only). https://www.simplyleb.com/recipe/loubye-bzeit/
[SL2] Seven Spices, Iman, Simply Lebanese (supporting only). https://www.simplyleb.com/seven-spices/
[UCR] West Indian lime (CRC 1813), Citrus Variety Collection, University of California, Riverside. https://citrusvariety.ucr.edu/crc1813
[ZZ] Sayadieh (fish and rice), Yosra, Zaatar and Zaytoun (supporting only). https://zaatarandzaytoun.com/sayadieh/

## 7. Couldn't verify

- **Blocked or failed fetches:**
  - Feel Good Foodie (Yumna Jawad's sayadieh and batata harra) and Saveur (loubieh bil zeit) returned 403.
  - L'Orient Today (Helou's recipe with Aleppo pepper) returned 403.
  - The Herb Society of America's Aleppo pepper page returned 403.
  - UK FSA pages returned 404 or redirected. I used FDA instead, as batch 1 did.
- **Aleppo pepper's current origin:** that most "Aleppo pepper" sold now is Turkish-grown comes only from retailer pages. [NYT] supports only the move of growers and seeds to southern Turkey.
- **Helou on Aleppo pepper:** her post is paywalled. Only the preview, about pepper paste, could be read.
- **Za'atar components beyond Kassis:** I found no second owning source for the blend's makeup. The thyme-versus-za'atar-herb disagreement is real, but its other side comes only from retail listings and glossaries.
- **Beef in Punjabi cooking:** I didn't fetch a source saying beef is rarely eaten in Indian Punjab, though Pakistani Punjabi recipes use it [C1]. Tag levantine only until this is sourced.
- **Green beans as Punjabi:** only weak sources [MHB][AC]. No Punjabi-identified author found.
- **Cod or white fish as Levantine:** sayadieh with cod comes only from supporting blogs [ZZ][MK]. I found no owning source for cod specifically.
- **Tamarind in Levantine cooking beyond Aleppo:** not found in Palestinian, Lebanese or Jordanian sources. Aleppine use is attested chiefly through the Syrian Jewish community [PD][CR].
- **Fresh fenugreek (methi) in Punjabi cooking:** only aggregator recipes found, so not cited.
- **Lebanese seven spice:** only a supporting source [SL2]. Hadia's own blend wasn't found.
- **Dill in Gaza:** the full dagga recipe on ckbk is paywalled. The ingredient claims rest on [SBS].
- **Lime versus lemon as "nimbu":** [UCR] covers the botany. That north Indian home cooks mostly use small acid limes rests on recipe blogs and isn't cited.
- **Food safety:** I found no agency guidance specific to za'atar, garam masala, Aleppo pepper, black pepper, tamarind, potato or green beans. Ordinary produce handling applies to the vegetables.
