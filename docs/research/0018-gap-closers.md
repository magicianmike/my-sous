# Research for issue #18: closing Slot-exception gaps

Pomegranate molasses, cider vinegar, chicken breast, dried chile and five-spice, plus a fresh-or-dried split of every existing `chile` Pairing.

## 1. Method

- I started from the batch notes (`0017-*.md`, `0018-*.md`). I reused their sources wherever they support a claim, and re-fetched a page when I needed a quote the notes didn't record. I also re-fetched to check which form of chile a page uses, since most notes didn't say.
- I fetched and read every URL cited here during this research. Quotes are verbatim, as the fetch tool returned them. Short Spanish and Italian quotes are left in the original, with my translation. "(paraphrase)" marks text that isn't verbatim.
- I didn't use *The Flavour Thesaurus*, *The Flavor Bible* or any compound or flavour-molecule data (ADR 0001). Wikipedia, shops and aggregators turned up in searches, but none is cited.
- **Sources I leaned on:**
  - **Levantine:** Reem Kassis, Wafa Shami (Palestine in a Dish), Hadia Zebib, and Slow Food's Ark of Taste (nominated by Slow Food Beirut).
  - **Oaxacan:** the Larousse Cocina *Diccionario enciclopédico de la Gastronomía Mexicana*, and Rick Bayless's Oaxacan recipes.
  - **Sichuan:** Fuchsia Dunlop (via The Splendid Table and Sous Chef), The Mala Market, The Woks of Life and China Sichuan Food.
  - **Punjabi:** Izzah Cheema, Anupy Singla, Kunal Kapur and Maunika Gowardhan.
  - **Southern Italian:** Portanapoli, Turismo Roma, Dissapore and iCalabresi.
  - **Cantonese:** The Woks of Life (Bill Leung), and Made With Lau (Daddy Lau, a Cantonese restaurant chef).
  - **Food safety:** US FDA and the UK Food Standards Agency (gov.uk).
- **What closes, if everything here is taken:**

  | Exception | Ingredients after this batch |
  |---|---|
  | Levantine acid | lemon, sumac, pomegranate molasses |
  | Oaxacan acid | lime, tomatillo, cider vinegar |
  | Sichuan protein | pork, beef, chicken breast |
  | Oaxacan heat | chile, dried chile, black pepper |
  | Punjabi heat | chile, dried chile, black pepper |
  | Southern Italian heat | chile, dried chile, black pepper |

  Each Ingredient's current tags in `content/ingredients/` support the second column. The Sichuan acid, Sichuan soft herb, Southern Italian acid and Japanese exceptions don't change.

## 2. New Ingredients

### Pomegranate molasses

- **Category:** condiment. **Slot types:** acid.
- **Cuisines:** levantine.
  - It's on the Ark of Taste for Lebanon (Mount Lebanon), as "a very concentrated sour juice used to flavour stews and other meat dishes" [SF-pom].
  - Lebanese: Hadia Zebib's fattoush [HZ-fat].
  - Palestinian: Kassis's pomegranate chicken [K2], Shami's kafta (optional) [S2], and Shami's rummaniyeh [S-rum].
- **Essay points:**
  1. It's pomegranate juice boiled down: "a thick pomegranate syrup made by boiling down pomegranate juice until it reduces to a dark-brown liquid" [HZ-fat]. It's "prepared from the sour varieties of pomegranate fruit" [SF-pom].
  2. It's sour but carries sugar. Kassis's roast chicken gets "skin that crisps and browns nicely thanks to sugars found in the pomegranate molasses" [K2]. Shami says "a small amount adds a subtle tangy depth" to kafta [S2]. So it browns where lemon doesn't. That's the thing that changes how you cook it.
  3. It's often used alongside lemon and sumac rather than instead of them. Hadia's fattoush dressing whisks "pomegranate molasses, sumac, fresh lemon juice" together [HZ-fat]. Kassis says sumac "can be used in place of lemon juice or pomegranate molasses" [K3]. Slow Food says it "can replace lemon or vinegar" in dressings (paraphrase) [SF-pom].
- **Tip (proposed):** "Start with a spoonful and taste; brands and fruit vary from sharp to sweet, and its sugars brown fast under high heat."
  - Support: Slow Food notes that some pomegranate varieties are much sweeter than others (paraphrase) [SF-pom]. Kassis shows the browning [K2].
  - The "brands vary" part isn't directly sourced. Drop it to "fruit varies" if you want only what's cited.
- **Cultural context (proposed):** "Pomegranate molasses is common across the Levant, in Lebanese fattoush dressing and meat dishes such as kibbeh and sfiha, and in Palestinian kitchens in roast chicken, kafta and the lentil-and-eggplant stew rummaniyeh."
  - [SF-pom] gives the Lebanese mezze uses, [HZ-fat] the fattoush, and [K2][S2][S-rum] the Palestinian dishes.
  - **Hedge needed:** Shami says "some Lebanese versions commonly add pomegranate molasses" to fattoush, while Palestinian fattoush leans on the harvest, such as purslane [S-fat]. So it's not in every fattoush.
- **Safety:** none specific found. No agency guidance was looked for beyond the general.
- **Citations:** [SF-pom], [HZ-fat], [K2], [K3], [S2], [S-rum], [S-fat].

### Cider vinegar

- **Category:** condiment. **Slot types:** acid.
- **Cuisines:** oaxacan.
  - Larousse says Mexican vinegars are mild: "En México se utilizan vinagres suaves que no alcanzan un alto porcentaje de acidez" (in Mexico mild vinegars are used, of low acidity). They're generally made from cider, apple, malt beer, plantain and other fruit (paraphrase) [L-vin].
  - Bayless: "apple cider vinegar is common in Mexico" [B-cmp].
  - Oaxacan uses:
    - cecina enchilada [B-cmp], whose marinade has vinegar of unnamed type [L-cec]
    - pork picadillo, "1 1/2 tablespoons cider vinegar" [B-pic]
    - barbacoa de borrego, "2/3 cup apple cider vinegar" [B-bar]
    - piedrazo, "1 cup apple cider vinegar" [B-pie]
- **Essay points:**
  1. In Mexico it's used for pickled chiles, escabeches of all kinds, some cabbage or lettuce salads, and "adobos y marinados diversos" (various adobos and marinades) [L-vin].
  2. In Oaxacan adobos it's blended with dried chiles, garlic and spices into a paste for meat [B-cmp][B-bar][L-cec].
  3. It's milder than many wine vinegars, which is why a few tablespoons can season a whole marinade [L-vin]. The "milder than wine vinegar" comparison is my inference from "suaves", so state only "mild".
- **Tip (proposed):** "Blend it into a dried-chile adobo, where its sourness brightens the chile and helps the paste cling to the meat."
  - Support: [B-cmp] puts the vinegar into the blender with the chile, herbs and spices.
  - **"Helps the paste cling" is unsourced.** A safer version: "Blend it into the chile paste for adobos; a few tablespoons season a pound or more of meat." [B-cmp] uses 3 tbsp for 1½ lb pork.
- **Cultural context (proposed):** "Mild fruit vinegars, often cider vinegar, are common in Mexican kitchens. In Oaxaca they sour the chile adobo for cecina enchilada, the slow-cooked picadillo for tacos, and the pickled onion of the street snack piedrazo."
  - Sources: [L-vin], [B-cmp], [B-pic], [B-pie]. Bayless says "white onion is typical in Oaxaca" [B-pie].
- **Flags:**
  - Larousse's "Chileajo" entry names "vinagre de frutas" (fruit vinegar) for one Oaxacan version, not cider specifically [L-chil].
  - Larousse's own home-vinegar method uses wine [L-vin], even though wine vinegar isn't on its list of Mexican vinegars.
  - Tamimi and Wigley's Palestinian shatta uses "3 tbsp cider vinegar" [T1]. That's one source, so it's not enough to tag levantine.
- **Citations:** [L-vin], [B-cmp], [L-cec], [B-pic], [B-bar], [B-pie], [L-chil].

### Chicken breast

- **Category:** meat. **Slot types:** protein.
- **Cuisines:** sichuan.
  - Dunlop's gong bao uses about 300–350 g "boneless chicken breast" (paraphrase of the ingredient list) [SPLENDID-GONGBAO].
  - The Mala Market's kou shui ji uses "2 bone-in, skin-on chicken breasts (or half of a chicken…)", and says "this is one of the few places in Sichuan cuisine where white meat chicken is often used" [MALA-KOUSHUIJI].
  - Dunlop's cold-dressed chicken uses "cold poached chicken meat off the bone (about half a chicken)" [SOUSCHEF-COLDCHICKEN]. That's mixed meat, so it's supporting only.
- **Flag on the exception text:** the current exception reason says "Sichuan chicken dishes usually use breast or a whole bird". [MALA-KOUSHUIJI]'s "one of the few places… where white meat chicken is often used" suggests breast is the exception, not the rule. The honest claim is narrower: gong bao and kou shui ji commonly use breast.
- **Other Cuisines:** none tagged.
  - Tea for Turmeric's chicken tikka uses breast, but the page labels it "Indian, Pakistani", not Punjabi, and isn't tandoori-style, so I don't cite it.
  - I didn't research Japanese or Cantonese breast dishes.
- **Essay points:**
  1. Breast is lean. The existing thigh essay already says thighs "have more fat and collagen than breast meat", so breast is less forgiving of extra cooking. That's a contrast inside MySous, not a new source claim.
  2. Sichuan cooks usually cut it small and even, and coat it before stir-frying. Dunlop cuts it "as evenly as possible into 1.5cm strips and then cut these into small cubes", and marinates it with salt, soy, Shaoxing wine, potato flour and water (paraphrase) [SPLENDID-GONGBAO].
  3. For cold dishes it's cooked gently, then cooled and dressed. The Mala Market steams it over low steam, cools it and keeps the juices for the sauce (paraphrase). It names poaching "over low heat in water with ginger and green onion" as an alternative [MALA-KOUSHUIJI].
- **Tip (proposed):** "Cut it into even cubes so every piece cooks through at the same moment" [SPLENDID-GONGBAO].
- **Cultural context (proposed):** "In Sichuan cooking, breast is common in gong bao chicken, stir-fried with dried chillies, Sichuan pepper and peanuts, and in mouthwatering chicken (kou shui ji), cold steamed chicken under chilli oil and black vinegar. Many other Sichuan chicken dishes use thigh or a whole bird."
  - Sources: [SPLENDID-GONGBAO], [MALA-KOUSHUIJI]. For the thigh-and-whole-bird hedge, see the batch-1 la zi ji note and [SOUSCHEF-COLDCHICKEN].
- **Safety (state plainly):**
  - **Cooking:** "Cook chicken to 165°F / 74°C in the thickest part; check with a clean thermometer."
    - FDA's table: "Poultry (ground, parts, whole, and stuffing)" "165oF" [FDA2]. 74°C is the conversion; Kassis also gives "165°F (74°C)" [K2].
    - The UK FSA gives a time-and-temperature rule instead: "70°C for 2 minutes" or "75°C for 30 seconds" and so on [FSA1].
    - FSA also says to cut the meat and check it is "steaming hot all the way through", with "no pink, fleshy meat" and juices that "run clear" [FSA1]. FDA's 165°F / 74°C is the stricter single figure, so lead with it.
  - **Rinsing:** "Don't rinse raw chicken; washing doesn't remove bacteria and can splash them onto nearby surfaces."
    - FSA: "Washing meat, fish and poultry doesn't get rid of harmful bacteria - only thorough cooking will" [FSA2].
    - The FDA Safe Food Handling page doesn't address rinsing poultry. The existing chicken-thigh file cites USDA FSIS for it; those links weren't re-tested.
  - **Boards and hands:** "Use a separate board for raw poultry, and wash your hands with soap and warm water for 20 seconds after handling it."
    - FDA: "Use one cutting board for fresh produce and a separate one for raw meat, poultry, and seafood"; "Wash your hands with warm water and soap for at least 20 seconds" [FDA2].
    - FSA: "use different chopping boards and utensils" for raw meat, fish or poultry [FSA2].
  - **Marinating:** "Always marinate food in the refrigerator" [FDA2]. Relevant to the gong bao marinade.
  - **Cold dishes:** kou shui ji is served cold. No agency page I fetched covers cooling cooked chicken for cold dishes, so add nothing beyond the above.
- **Citations:** [SPLENDID-GONGBAO], [MALA-KOUSHUIJI], [SOUSCHEF-COLDCHICKEN], [FDA2], [FSA1], [FSA2], [K2].

### Dried chile

- **Category:** spice. **Slot types:** heat.
- **Cuisines:** sichuan, oaxacan, punjabi, southern-italian.
  - **Sichuan:**
    - Dunlop, quoted in The National: "The most distinctive element of Sichuanese cuisine is its abundance of sun-dried chillies", "used whole, chopped-up, ground, pickled, or as the base of a paste made with fermented broad beans" [NAT].
    - Gong bao uses at least 10 dried chillies, stir-fried with Sichuan pepper "until the chillies are darkening but not burnt" [SPLENDID-GONGBAO].
    - Dried chillies also go into hot-and-sour potato [MALA-TUDOUSI][CSF-TUDOUSI] and dry-fried green beans [WOL-GREENBEANS][CSF-GREENBEANS].
    - Chilli oil is made from Sichuan chilli flakes, whose character depends on "whether or not the peppers were toasted before grinding" [WOL-CHILIOIL].
  - **Oaxacan:**
    - Larousse's Oaxaca entry lists regional chiles, "chilcostle, chilhuacle, costeño, de agua, de onza, parado y pasilla oaxaqueño" [L-oax]. Of these, chile de agua is fresh ("Chile fresco… Raramente se usa seco") [L-cda].
    - Chilhuacle: "tres chiles secos de diferentes colores" (three dried chiles of different colours), grown only in Cuicatlán. Black chilhuacle goes into mole negro and chichilo, and yellow is "indispensable en el mole amarillo" [L-chilh].
    - Pasilla oaxaqueño: "Chile seco ahumado" (a dried, smoked chile) from the Sierra Mixe [L-pas].
    - Guajillo: "un chile seco color café rojizo" (a reddish-brown dried chile), used in "moles, adobos, salsas picantes" and to stand in for Oaxaca's chilhuacles [L-guaj].
    - The cecina adobo is guajillo-based [L-cec]. Bayless's cecina uses guajillo or ancho powder [B-cmp], and his picadillo uses "1 medium dried Oaxacan pasilla chile (chile mixe)" [B-pic].
  - **Punjabi:**
    - Kunal Kapur's dhaba-style baingan bharta: "Add whole red chillies and cumin and cook till it begins spluttering", from "Dry red chilli – 2nos" [KK].
    - Kashmiri chili powder in tandoori chicken "adds color and very mild spice" [C4]. Karahi uses "1 tsp Kashmiri red chili powder" and "1/2 tsp red chili flakes" [C5].
    - Aloo gobi uses "2 teaspoons red chile powder" [SG]. Dahi bhalla's tamarind chutney uses "1/8 tsp red chili powder" [C10].
  - **Southern Italian:**
    - Portanapoli's aglio, olio e peperoncino uses "peperoncino intero secco da triturare" (whole dried chile, to crumble) [PN1]. Dissapore's puttanesca uses "Peperoncino secco 2" [DS-put].
    - In Calabria, chiles were dried for winter soups, "una volta seccati e «stritolati» erano adoperati in gran quantità in ragù, frittate, zuppe e salumi" (once dried and crushed they were used in quantity in ragù, frittatas, soups and cured meats). They were used "in luogo del costoso pepe nero" (instead of costly black pepper) [GS].
- **Essay points:**
  1. Drying changes the chile. Some get new names: fresh guajillo "se llama chile mirasol" (is called chile mirasol) [L-guaj]. Some are smoked as they dry, like pasilla oaxaqueño, smoked in adobe ovens (paraphrase) [L-pas].
  2. Dried chiles are usually woken with heat.
     - Sichuan cooks fry them in oil until they darken but don't burn [SPLENDID-GONGBAO], or start them in cold oil [MALA-TUDOUSI].
     - Oaxacan cooks usually toast, soak in hot water and blend them [B-pic]. Chichilo's chiles are charred ("quemados") [L-chi].
     - Punjabi cooks sizzle whole red chiles with cumin in a tempering [KK].
  3. Heat varies by type. Kashmiri powder is mostly for colour ("very mild spice") [C4], while plain red chili powder is for heat [C4]. The existing chile essay's placenta point [NM1] applies to dried chiles too.
- **Tip (proposed):** "Fry dried chiles only until they darken; once they burn, start again."
  - Support: "until the chillies are darkening but not burnt" [SPLENDID-GONGBAO].
  - The usual reason given, that burnt chile turns bitter, isn't in a source I fetched, so it's left out.
- **Cultural context (proposed):** "Dried chiles are the backbone of much Sichuan cooking, fried by the handful for dishes such as gong bao chicken. In Oaxaca, dried chilhuacle, pasilla and guajillo colour the moles and adobos. Punjabi cooks sizzle whole dried chiles in a tadka and use Kashmiri powder for colour, and in Calabria and Naples dried peperoncino is crumbled into the oil."
  - Sources: [NAT][SPLENDID-GONGBAO][L-chilh][L-pas][L-guaj][KK][C4][GS][PN1].
- **Safety:** none specific found.
- **Changes to the existing `chile` file if this is adopted:**
  - Move "Dried chiles, often by the handful, are the backbone of much Sichuan cooking" out of chile's culturalContext.
  - Drop "and dried ones are often toasted in oil until fragrant" from chile's essay.
- **Citations:** [NAT], [SPLENDID-GONGBAO], [MALA-TUDOUSI], [CSF-TUDOUSI], [WOL-GREENBEANS], [CSF-GREENBEANS], [WOL-CHILIOIL], [L-oax], [L-cda], [L-chilh], [L-pas], [L-guaj], [L-cec], [L-chi], [B-cmp], [B-pic], [KK], [C4], [C5], [SG], [C10], [PN1], [DS-put], [GS], [NM1].

### Chile, now fresh chile: Cuisine check

| Cuisine | Holds for fresh? | Evidence |
|---|---|---|
| southern-italian | Yes, contested | Turismo Roma: "Peperoncino piccante (preferibilmente fresco)" [TR1]. Portanapoli's vongole: "Ottimo se si usa quello fresco, il cui aroma è decisamente più intenso" (best fresh, whose aroma is much more intense) [PN2]. Calabrian pro loco leaflets say it's used "fresco, sott'olio o in polvere" (fresh, in oil or powdered) [GS]. **But** Portanapoli's own aglio e olio uses dried [PN1], so the copy should say cooks use either. |
| oaxacan | Yes | Chile de agua is "Chile fresco cónico…" and "Raramente se usa seco" [L-cda]. Oaxacan salsa verde uses "chile verde" [L-sv], which Larousse defines as chiles "que se comen frescos y en su mayoría inmaduros" (eaten fresh and mostly unripe) [L-cv]. |
| punjabi | Yes | "1-6 fresh Thai or serrano chiles" in aloo gobi [SG]. Green chilies in karahi [C5] and raita [C3]. "3 green chillies slit lengthwise" in Gowardhan's aloo gobi [MG]. |
| levantine | Yes | Shatta: "9 oz/250g red or green chiles (with seeds), stems trimmed, very thinly sliced", salted three days [T1]. The page doesn't say "fresh", but stems trimmed and thinly sliced means fresh pods. Kassis's "1 green chili, finely chopped" and "2 or 3 jalapeno peppers" [K2]. Shami's optional "Jalapenos or green chilli" in rummaniyeh [S-rum]. |
| sichuan | Yes, weaker | Tiger-skin peppers: "In Sichuan, tiger skin peppers are usually made with green erjingtiao chilies or sweet bell peppers" [MALA-HUPI]. Pickled chillies (paojiao) are central to fish-fragrant dishes [NAT], and China Sichuan Food's paojiao recipe is titled "Pickled Fresh Chili" [CSF-PAOJIAO]. That pickled chillies are made from fresh rests on that title, not on an owning source's sentence. Keep the tag, but say fresh chile is much less common than dried in Sichuan cooking [NAT]. |

Proposed new culturalContext for `chile`:

> "Fresh chile is sliced into Palestinian shatta, roasted and cut into strips in Oaxaca, and cooked into many Punjabi dishes. In Naples many cooks prefer it fresh for aglio, olio e peperoncino, though others use dried. In Sichuan, fresh green chiles are blistered for tiger-skin peppers."

## 3. Chile classification

"Fresh" keeps the Pairing on `chile`, "dried" moves it to `dried-chile`, and "both" splits it.

| Pair (current Cuisines) | Verdict | Evidence |
|---|---|---|
| chile + lime (oaxacan) | **Both**, split | **Fresh, oaxacan:** chile de agua strips "curtidas en limón" [L-cda]. **Dried:** [L-limon] is "sal y chile en polvo" over fruit and vegetables, across Mexico, so it's not Oaxacan. Bayless serves dried-chile cecina "with salsa and lime wedges" (paraphrase; "2 limes, cut into wedges") [B-cmp], so dried-chile + lime can be oaxacan via [B-cmp], with [L-limon] as general support. Move the "lime, salt and chile powder" half of the detail to the dried Pairing. |
| chile + garlic (southern-italian, sichuan, punjabi) | **Both**, split | **Fresh:** [TR1] (southern-italian, "preferibilmente fresco"); [SG] (punjabi, "Add the ginger, garlic, and fresh chiles"); [KK] (punjabi, "Green chilli chopped – 1no" with garlic). **Dried:** [PN1] (southern-italian, "peperoncino intero secco"); [DS-put] (southern-italian, "fate soffriggere l'aglio e il peperoncino"; *peperoncino secco*); [SPLENDID-GONGBAO] (sichuan, dried chillies with garlic); [KK] (punjabi, whole red chillies, then garlic); [WOL-GREENBEANS] (sichuan, "2 dried red hot peppers" with garlic). Fresh Cuisines: southern-italian, punjabi. Dried Cuisines: southern-italian, sichuan, punjabi. |
| chile + cilantro (oaxacan, punjabi) | **Fresh**, keep | [L-sv] "ajo, chile verde y miltomate… mezclados con cilantro" (chile verde = fresh per [L-cv]); [C3] "1 slice Serrano pepper". |
| sichuan-pepper + chile (sichuan) | **Dried**, move | [WOL-SICHUANPEPPER] doesn't say which form ("spicy Chinese chilies"). [NAT] calls sun-dried chillies the most distinctive element and pairs chilli with pepper for mala. [SPLENDID-GONGBAO] and [MALA-TUDOUSI] fry dried chillies with Sichuan pepper. Add [SPLENDID-GONGBAO] as a citation. |
| black-vinegar + chile (sichuan) | **Dried**, move; fresh optional | **Dried:** gong bao's dried chillies with "Chinkiang or black vinegar" [SPLENDID-GONGBAO]. Dunlop's noodles use "2tbsp chilli oil" with "2tbsp Chinkiang vinegar" [IRISH], and chilli oil is ground dried chilli [WOL-CHILIOIL]. **Fresh (optional, weak):** tiger-skin peppers, green erjingtiao chilies with Baoning black vinegar [MALA-HUPI], though that recipe itself uses bell peppers. |
| mint + chile (punjabi) | **Fresh**, keep | [C3] serrano or green chili. |
| cumin + chile (punjabi) | **Dried**, move | [KK] "Add whole red chillies and cumin"; "Dry red chilli – 2nos". [C1]'s kadhi caption, "tadka made of cumin seeds, red chili, and cilantro", doesn't state the form. Keep it as support only. |
| cauliflower + chile (punjabi) | **Both**, split | **Fresh:** [SG] "1-6 fresh Thai or serrano chiles"; [MG] "3 green chillies slit lengthwise". **Dried:** [SG] "2 teaspoons red chile powder". The current note already names both ("Green chiles and chile powder"). |
| tomato + chile (levantine, punjabi, oaxacan, southern-italian) | **Both**, split | **Fresh:** [K2] levantine, "green chilies", "1 green chili"; [C5] punjabi, green chilies with tomatoes; [L-cda] oaxacan, stuffed chile de agua "served in a tomato caldillo" (paraphrase). **Dried:** [DS-put] southern-italian, "Peperoncino secco 2" with "Pomodori pelati 800 g"; [C5] punjabi, Kashmiri powder and chili flakes also go in. [PN-put] says only "un pezzetto di peperoncino forte" (a small piece of hot chile), form unstated, so it supports either. Fresh Cuisines: levantine, punjabi, oaxacan. Dried: southern-italian, punjabi. Move "Neapolitan puttanesca" to the dried note. |
| chile + ginger (punjabi) | **Fresh**, keep | [SG] "Add the ginger, garlic, and fresh chiles"; [C5] green chili, then garlic and ginger. |
| chile + lemon (levantine) | **Fresh**, keep | [T1] shatta of sliced red or green chiles with lemon juice (and cider vinegar). |
| tomatillo + chile (oaxacan) | **Fresh**, keep | [L-sv] "chile verde y miltomate"; [L-mv] "chile de agua o serrano". [MX2] wasn't re-fetched by me. |
| pork + chile (oaxacan) | **Dried**, move | [L-cec] "chiles guajillos" (dried per [L-guaj]); [B-pic] "1 medium dried Oaxacan pasilla chile"; [L-chil] guajillo, ancho, costeño. |
| potato + chile (sichuan) | **Dried**, move | [MALA-TUDOUSI] "3-4 dried chilies, chopped"; [CSF-TUDOUSI] "2-4 dry chili peppers". |
| green-beans + chile (sichuan) | **Dried**, move | [WOL-GREENBEANS] "2 dried red hot peppers"; [CSF-GREENBEANS] "6 dried chili peppers". |
| tamarind + chile (punjabi) | **Dried**, move | [C10] tamarind chutney: "1/8 tsp red chili powder". Change the note's "red chile" to "red chile powder". |
| anchovy + chile (southern-italian) | **Dried**, move | [DS-put] dried chile and anchovy melted in the oil. [SP-ore] mentions chile only as an optional note ("un peperoncino tritato… per la versione piccante", a chopped chile for a spicy version), form unstated. Drop [SP-ore] or keep it as weak, and drop "in some versions, orecchiette" from the note unless it's kept. |
| epazote + chile (oaxacan) | **Fresh**, keep | [L-mv] "chile de agua" with "perejil, epazote y hierba santa"; chile de agua is fresh [L-cda]. |
| beef + chile (oaxacan) | **Dried**, move | [L-chi] "chilhuacle negro, pasilla, mulato" (chilhuacle is dried per [L-chilh]; pasilla oaxaqueño per [L-pas]); [B-tla] "the pasilla chile salsa… is most common", form not stated on that page. The note's "dark dried chiles" already says dried. |
| black-pepper + chile (oaxacan) | **Dried**, move | [L-cec] "chiles guajillos, pimienta negra…"; [B-cmp] guajillo or ancho powder with "1/2 teaspoon ground black pepper". |
| parsley + chile (southern-italian) | **Fresh**, keep; dried optional | [PN2] "una punta di peperoncino", "Ottimo se si usa quello fresco". Optional new Pairing: dried-chile + parsley (southern-italian) from [PN1], whose ingredients are "aglio, peperoncino, sale, prezzemolo" with dried chile. |

**Tally:**

| Verdict | Count | Pairs |
|---|---|---|
| Keep on `chile` | 7 | cilantro, mint, ginger, lemon, tomatillo, epazote, parsley |
| Move to `dried-chile` | 10 | sichuan-pepper, black-vinegar, cumin, pork, potato, green-beans, tamarind, anchovy, beef, black-pepper |
| Split | 4 | lime, garlic, cauliflower, tomato |

That covers all 21 existing Pairings. Black-vinegar could also keep a weak fresh side (tiger-skin peppers [MALA-HUPI]), which would make it a fifth split.

## 4. Pairings for the new Ingredients

### Pomegranate molasses

1. **pomegranate-molasses + sumac** (aromatic bridge). Both are fruity sours, and fattoush dressings often use them together, the molasses adding a sweeter note to sumac's dry sharpness.
   - *Cuisines:* levantine.
   - [HZ-fat]: "The two star ingredients that give fattoush its tangy flavor are sumac and pomegranate molasses."
   - [S-fat]: dressing of "½ teaspoon sumac" and "1 teaspoon pomegranate molasses".
2. **pomegranate-molasses + chicken-thigh** (tradition). A spoonful in the marinade gives roast chicken a tart edge, and its sugars help the skin brown.
   - *Cuisines:* levantine.
   - [K2]: "1 Tbsp. pomegranate molasses" in the marinade; skin "crisps and browns nicely thanks to sugars found in the pomegranate molasses".
   - **Flag:** Kassis uses a whole chicken, "spatchcocked, halved, or jointed". Same loose fit as musakhan.
3. **pomegranate-molasses + lamb** (contrast). A little sharpens rich minced lamb in Palestinian kafta.
   - *Cuisines:* levantine.
   - [S2]: "2 tablespoons pomegranate molasses (optional)" with "ground beef, lamb, or a half-and-half mix"; "A small amount adds a subtle tangy depth that pairs beautifully with the meat mixture."
   - It's optional in the source; say "some cooks add".
4. **pomegranate-molasses + eggplant** (tradition). Sour pomegranate seasons eggplant and lentils in rummaniyeh, a stew from coastal Palestine and Gaza.
   - *Cuisines:* levantine.
   - [S-rum]: "2 tablespoons sour pomegranate molasses"; "This dish is also popular in Gaza"; "The origins of this dish trace back to the coastal regions of historical Palestine."
   - The main sour there is pomegranate juice, with molasses to enhance it.
5. **pomegranate-molasses + parsley** (tradition). In kafta, the molasses goes into the chopped parsley and onion before the meat.
   - *Cuisines:* levantine.
   - [S2]: "add salt, pepper, allspice, and pomegranate molasses (if using)" to the onion-parsley mixture, then "combine the ground meat with the onion-parsley mixture".
   - Weak-to-moderate: they're co-ingredients. Could also be pomegranate-molasses + onion on the same source.
6. **pomegranate-molasses + aleppo-pepper** (contrast). In Kassis's roast chicken marinade, the molasses' sweet-sour balances Aleppo pepper's mild, fruity heat.
   - *Cuisines:* levantine.
   - [K2]: "1 Tbsp. pomegranate molasses" and "2 Tsp. aleppo pepper" in the same marinade.
   - Weak: co-ingredients, and "balances" is my reading. Muhammara would be the stronger case, but I found no owning source for it.
7. **(Optional) pomegranate-molasses + tomato** (contrast). In Lebanese fattoush the dressing is tossed through diced tomato.
   - *Cuisines:* levantine.
   - [HZ-fat]: "4 medium-sized tomatoes diced" with the molasses dressing.
   - Weak: salad co-ingredients.

### Cider vinegar

1. **cider-vinegar + pork** (tradition). Cider vinegar sours the chile adobo for Oaxacan cecina and the slow-cooked pork picadillo.
   - *Cuisines:* oaxacan.
   - [B-cmp]: "3 tablespoons vinegar (apple cider vinegar is common in Mexico)" for "1 1/2 pounds boneless pork loin".
   - [B-pic]: "1 1/2 tablespoons cider vinegar" with "1 1/2 pounds lean, coarse-ground pork".
   - [L-cec]: "vinagre" in the cecina marinade.
2. **cider-vinegar + dried-chile** (contrast). Its mild sourness brightens deep, earthy dried chile in Oaxacan adobos.
   - *Cuisines:* oaxacan.
   - [B-cmp]: guajillo or ancho powder blended "along with the herb and spices, vinegar and salt".
   - [B-bar]: "6 ounces (about 24) dried guajillo chiles" with "2/3 cup apple cider vinegar".
   - "Brightens deep, earthy" is my description, not the source's.
3. **cider-vinegar + garlic** (tradition). Garlic is blended with the vinegar into the adobo, or simmered in the pickling liquid for piedrazo.
   - *Cuisines:* oaxacan.
   - [B-cmp]: "8 garlic cloves, peeled".
   - [B-pie]: "combine the vinegar, piloncillo, salt, bay, thyme, garlic and ¾ cup water".
4. **cider-vinegar + onion** (tradition). Sliced onion pickled in sweetened cider vinegar is part of Oaxaca's street snack piedrazo.
   - *Cuisines:* oaxacan.
   - [B-pie]: "1 cup apple cider vinegar"; onion "(white onion is typical in Oaxaca…)"; the carrot and onion are pickled in the mixture (paraphrase of the method).
5. **cider-vinegar + black-pepper** (tradition). Black pepper is ground with the vinegar and dried chiles in Oaxacan adobos.
   - *Cuisines:* oaxacan.
   - [B-cmp]: "1/2 teaspoon ground black pepper".
   - [B-bar]: "1 teaspoon fresh black pepper".
   - [L-cec]: "pimienta negra… vinagre y sal, todo molido" (black pepper… vinegar and salt, all ground).
- **Not proposed:** cider-vinegar + lamb. Barbacoa de borrego, "Estilo Oaxaqueño", supports it [B-bar], but lamb isn't tagged oaxacan and that's the only source.

### Chicken breast

1. **chicken-breast + dried-chile** (tradition). In gong bao, dried chillies are fried until they darken, then the chicken cubes go into the scorched-chilli oil.
   - *Cuisines:* sichuan.
   - [SPLENDID-GONGBAO]: "a good handful of dried chillies (at least 10)" (from batch notes); "until the chillies are darkening but not burnt"; "kick of scorched chilli".
2. **chicken-breast + sichuan-pepper** (tradition). Sichuan pepper's tingle runs through both gong bao and kou shui ji.
   - *Cuisines:* sichuan.
   - [SPLENDID-GONGBAO]: "tingle of Sichuan pepper"; a teaspoon of whole Sichuan pepper (paraphrase).
   - [MALA-KOUSHUIJI]: Sichuan pepper oil in the sauce (paraphrase).
3. **chicken-breast + black-vinegar** (contrast). Black vinegar's gentle sourness gives mild white meat the sweet-sour edge of gong bao sauce and kou shui ji dressing.
   - *Cuisines:* sichuan.
   - [SPLENDID-GONGBAO]: "gentle sweet-sour sauce" with "Chinkiang or black vinegar".
   - [MALA-KOUSHUIJI]: Chinese black vinegar in the sauce (paraphrase).
4. **chicken-breast + scallion** (tradition). Scallion whites go into gong bao, and sliced greens finish cold-dressed chicken.
   - *Cuisines:* sichuan.
   - [SPLENDID-GONGBAO]: white spring onion parts (paraphrase).
   - [MALA-KOUSHUIJI]: scallions as garnish (paraphrase).
   - [SOUSCHEF-COLDCHICKEN]: "4 spring onions".
5. **chicken-breast + ginger** (aromatic bridge). Ginger goes into the wok for gong bao, and into the poaching water when kou shui ji is poached.
   - *Cuisines:* sichuan.
   - [SPLENDID-GONGBAO]: fresh ginger in the ingredients (paraphrase).
   - [MALA-KOUSHUIJI]: poach "over low heat in water with ginger and green onion".
6. **chicken-breast + garlic** (tradition). Garlic goes into the wok with ginger and scallion for gong bao.
   - *Cuisines:* sichuan.
   - [SPLENDID-GONGBAO]: garlic in the ingredients; batch notes record "3 cloves of garlic".
   - **Flag:** kou shui ji doesn't need garlic. The Mala Market says it "should have garlic if you want it to have garlic" [MALA-KOUSHUIJI]. Keep this Pairing to gong bao.

### Dried chile

The Pairings come from section 3's moves and splits, with these note changes:

- **dried-chile + lime** (contrast, oaxacan): "Lime squeezed over dried-chile cecina, or mixed with salt and chile powder over fruit, cuts the chile's earthy heat." Sources: [B-cmp], [L-limon].
- **dried-chile + garlic** (tradition, southern-italian, sichuan, punjabi): "Warmed together in oil, they season aglio e olio and puttanesca, gong bao, and Punjabi tadkas." Sources: [PN1], [DS-put], [SPLENDID-GONGBAO], [KK].
- **dried-chile + tomato** (contrast, southern-italian, punjabi): "Dried chile's heat sharpens tomato in Neapolitan puttanesca and Punjabi karahi." Sources: [DS-put], [C5].
- **New, from this batch:** dried-chile + cider-vinegar, dried-chile + chicken-breast (above).
- **Optional:** dried-chile + parsley (southern-italian) [PN1].

Fresh-side notes to edit:

- chile + garlic: "Warmed together in oil, fresh chile and garlic start Neapolitan aglio e olio and many Punjabi dishes" [TR1][SG][KK].
- chile + tomato: drop puttanesca [K2][C5][L-cda].
- chile + cauliflower: "Green chiles bring fresh heat to mild cauliflower in aloo gobi" [SG][MG]. The powder half goes to dried-chile + cauliflower [SG].

### Five-spice

- **Category:** blend. **Slot types:** aromatic.
- **Typically includes:** [cinnamon (cassia), fennel, star anise, cloves, sichuan-pepper]. Only `sichuan-pepper` is a MySous id.
  - [WOL-5SPICE] lists cassia cinnamon, fennel seeds, Sichuan peppercorns, cloves and star anise, with optional sand ginger.
  - The core is four spices, and the fifth "can be a bit of a wild card" between ginger, white pepper and Sichuan peppercorns [WOL-5SPICE].
  - Name the disagreement: say "often Sichuan pepper".
  - [WOL-SICHUANPEPPER]: "Sichuan peppercorns are also one of the five main ingredients in Five Spice Powder!"
- **Cuisines:** cantonese.
  - [WOL-CHARSIU] "Char siu (叉烧) is a type of Cantonese roast meat", with "½ teaspoon five spice powder".
  - [MWL-CHARSIU] "Char siu originally comes from Cantonese cuisine", with "1 tsp five spice powder".
  - [WOL-SIUYUK] Cantonese roast pork belly, "1/2 teaspoon five spice powder".
  - [MWL-CHICKEN] Cantonese crispy-skin chicken, five-spice in the rub and the dipping salt.
- **Sichuan: not tagged.** The only Sichuan-adjacent source is The Mala Market's five-spice beef. Its authors call that dish Northern Chinese Muslim in origin, served cold in Shanghainese restaurants, and say Sichuan cooks may add dried chilies or doubanjiang [MALA-5SPICEBEEF]. That doesn't show five-spice is common in Sichuan.
- **Essay points:**
  1. A warm, sweet-scented blend of ground whole spices, built on cinnamon, fennel, star anise and cloves, with a fifth that varies [WOL-5SPICE].
  2. A small amount seasons a lot. Char siu uses ½ tsp for 3 lb of pork [WOL-CHARSIU], and siu yuk ½ tsp for a 3 lb slab [WOL-SIUYUK]. That's a measurement, not a source's claim that it's strong.
  3. Ground spices fade. Store it "in a sealed container away from heat or light", and toast the whole spices in a dry pan over low heat before grinding [WOL-5SPICE].
- **Tip (proposed):** "Use it by the half-teaspoon; in char siu, half a teaspoon seasons a 3 lb / 1.4 kg shoulder" [WOL-CHARSIU].
- **Cultural context (proposed):** "Five-spice is common in Cantonese roast meats: it goes into the marinade for char siu, the rub for crisp roast pork belly, and the seasoned salt served with crispy-skin chicken."
  - Sources: [WOL-CHARSIU][MWL-CHARSIU][WOL-SIUYUK][MWL-CHICKEN].
  - Made With Lau: "Five spice powder, a popular Chinese ingredient, ties it all together" [MWL-CHARSIU].
- **Pairings:**
  1. **five-spice + pork** (tradition). Five-spice is in the marinade for char siu and the rub for siu yuk, two common Cantonese roast meats.
     - *Cuisines:* cantonese.
     - [WOL-CHARSIU] "½ teaspoon five spice powder", "3 pounds boneless pork shoulder/pork butt".
     - [MWL-CHARSIU] "1 tsp five spice powder", "2 lb pork shoulder".
     - [WOL-SIUYUK] "1/2 teaspoon five spice powder"; "rub this spice mixture into the meat".
  2. **five-spice + garlic** (aromatic bridge). Minced garlic sits alongside five-spice in the char siu marinade.
     - *Cuisines:* cantonese.
     - [WOL-CHARSIU] "3 cloves finely minced garlic".
     - Made With Lau uses garlic salt instead ("1 Tbsp garlic salt") [MWL-CHARSIU].
  3. **five-spice + chicken-thigh** (tradition, weak). A five-spice salt rub seasons Cantonese crispy-skin chicken, and the same salt is served for dipping.
     - *Cuisines:* cantonese.
     - [MWL-CHICKEN] "We'll season only the inside of the chicken with the dry seasoning mix"; "This seasoned salt is typically served in small plates alongside the chicken".
     - **Flag:** it's a whole bird, so thigh is a loose fit. Better as five-spice + a whole-chicken Ingredient, if MySous gets one.
  4. **five-spice + beef** (tradition, no Cuisine tag). Beef shank braised with the five spices and Sichuan pepper is a cold-cut classic in northern Chinese and Shanghainese cooking.
     - [MALA-5SPICEBEEF] "usually the tough but rewarding shank"; spices in "a tea bag".
     - **Flag:** whole spices, not the powder, and neither of those Cuisines is in MySous. Leave the Cuisines empty, or drop it.
  5. **five-spice + sichuan-pepper:** not proposed as a Pairing. Sichuan pepper is a component (`typicallyIncludes`), not a partner.

## 5. Citation key

New this batch:

[SF-pom] Pomegranate molasses, Ark of Taste, Slow Food Foundation for Biodiversity. https://www.fondazioneslowfood.com/en/ark-of-taste-slow-food/pomegranate-molasses/
[HZ-fat] Fattoush, Hadia Zebib, Hadia's Lebanese Cuisine. https://hadiaslebanesecuisine.com/newsite/recipe-items/fattoush/
[S-rum] Rummaniyeh (Lentil and Eggplant Stew), Wafa Shami, Palestine in a Dish. https://palestineinadish.com/recipes/rumaniyeh-lentil-eggplant-stew/
[S-fat] Fattoush Salad, Wafa Shami, Palestine in a Dish. https://palestineinadish.com/recipes/fattoush-salad-a-fantastic-meal-on-its-own/
[B-pic] Oaxacan Pork Picadillo, Rick Bayless. https://www.rickbayless.com/recipe/oaxacan-pork-picadillo/
[B-bar] Oaxacan-Style Lamb Pit Barbeque (Barbacoa de Borrego, Estilo Oaxaqueño), Rick Bayless. https://www.rickbayless.com/recipe/oaxacan-style-lamb-pit-barbeque/
[B-pie] Oaxacan Piedrazo Bar Snack or Salad, Rick Bayless. https://www.rickbayless.com/recipe/oaxacan-piedrazo-bar-snack-or-salad/
[L-chilh] Chile chilhuacle, Diccionario enciclopédico de la Gastronomía Mexicana, Larousse Cocina. https://laroussecocina.mx/palabra/chile-chilhuacle/
[L-pas] Chile pasilla oaxaqueño, same dictionary. https://laroussecocina.mx/palabra/chile-pasilla-oaxaqueno/
[L-guaj] Chile guajillo, same dictionary. https://laroussecocina.mx/palabra/chile-guajillo/
[L-cv] Chile verde, same dictionary. https://laroussecocina.mx/palabra/chile-verde/
[MALA-HUPI] Tiger Skin Peppers (Hupi Qingjiao), Taylor Holliday, The Mala Market. https://blog.themalamarket.com/chengdu-challenge-23-tiger-skin-peppers-hu-pi-qing-jiao/
[CSF-PAOJIAO] Chinese Pickled Fresh Chili (Sichuan Paojiao), Elaine, China Sichuan Food (title only supports the claim). https://www.chinasichuanfood.com/pickled-fresh-chili/
[WOL-CHILIOIL] How to Make Chili Oil, The Woks of Life. https://thewoksoflife.com/how-to-make-chili-oil/
[WOL-SICHUANPEPPER] Sichuan Peppercorns, The Woks of Life. https://thewoksoflife.com/sichuan-peppercorns/
[WOL-5SPICE] How to Make Five Spice Powder, The Woks of Life. https://thewoksoflife.com/how-to-make-five-spice-powder/
[WOL-CHARSIU] Chinese BBQ Pork (Char Siu), Bill Leung, The Woks of Life. https://thewoksoflife.com/chinese-bbq-pork-cha-siu/
[WOL-SIUYUK] Cantonese Roast Pork Belly (Siu Yuk), The Woks of Life. https://thewoksoflife.com/cantonese-roast-pork-belly/
[MWL-CHARSIU] Dad's Char Siu Pork, Made With Lau. https://www.madewithlau.com/recipes/char-siu-chinese-bbq-pork
[MWL-CHICKEN] Dad's Crispy Skin Chicken, Made With Lau. https://www.madewithlau.com/recipes/crispy-skin-chicken
[MALA-5SPICEBEEF] Five-Spice Beef (Wuxiang Niurou), Zoe Yang and Iris Zhao, The Mala Market. https://blog.themalamarket.com/five-spice-beef-wuxiang-niurou/
[NAT] The food of Sichuan: how a British writer brought the flavours of provincial China to the world (Fuchsia Dunlop), The National. https://www.thenationalnews.com/lifestyle/food/the-food-of-sichuan-how-a-british-writer-brought-the-flavours-of-provincial-china-to-the-world-1.1028035
[IRISH] Fuchsia Dunlop: Sichuan food is all about balance, not battering your palate with heat, The Irish News. https://www.irishnews.com/lifestyle/2019/11/09/news/fuchsia-dunlop-sichuan-food-is-all-about-balance-not-battering-your-palate-with-heat-1758271/

Reused from other notes (re-fetched by me unless marked "notes only"):

[K2] Palestinian Table recipes (pomegranate chicken, tomato and za'atar bread salad), Reem Kassis, East Fork. https://eastfork.com/pages/palestinian-table-recipes-reem-kassis
[K3] Za'atar and sumac recipes from *The Arabesque Table*, Reem Kassis, Refinery29 (notes only). https://www.refinery29.com/en-gb/reem-kassis-the-arabesque-table-zaatar-recipes
[S2] Palestinian Kafta with Tahini Sauce, Wafa Shami, Palestine in a Dish. https://palestineinadish.com/recipes/kiftah-bi-tahini-sauce/
[T1] Sami Tamimi's Falastin is an ode to the complex food and history of Palestine (shatta recipe), Mother Jones. https://www.motherjones.com/food/2020/08/sami-tamimis-falastin-is-an-ode-to-the-complex-food-and-history-of-palestine/
[L-vin] Vinagre, Diccionario enciclopédico de la Gastronomía Mexicana, Larousse Cocina. https://laroussecocina.mx/palabra/vinagre/
[L-cec] Cecina oaxaqueña, same dictionary. https://laroussecocina.mx/palabra/cecina-oaxaquena/
[L-chil] Chileajo, same dictionary. https://laroussecocina.mx/palabra/chileajo/
[L-chi] Chichilo, same dictionary. https://laroussecocina.mx/palabra/chichilo/
[L-oax] Oaxaca, same dictionary (first 100,000 characters read). https://laroussecocina.mx/palabra/oaxaca/
[L-cda] Chile de agua, same dictionary. https://laroussecocina.mx/palabra/chile-de-agua/
[L-limon] Limón, same dictionary. https://laroussecocina.mx/palabra/limon/
[L-sv] Salsa verde, same dictionary. https://laroussecocina.mx/palabra/salsa-verde/
[L-mv] Mole verde, same dictionary. https://laroussecocina.mx/palabra/mole-verde/
[MX2] Qué nos aportan los tomates verdes, CONABIO (notes only). https://www.biodiversidad.gob.mx/diversidad/alimentos/que-nos-aportan/N_tomates
[B-cmp] Chile-Marinated Pork, Oaxacan-Style, Rick Bayless. https://www.rickbayless.com/recipe/chile-marinated-pork-oaxacan-style/
[B-tla] Tlayuda Oaxaqueña, Rick Bayless. https://www.rickbayless.com/recipe/tlayuda-oaxaquena/
[SPLENDID-GONGBAO] Gong Bao Chicken with Peanuts (Fuchsia Dunlop, Every Grain of Rice), The Splendid Table. https://www.splendidtable.org/story/2015/02/13/gong-bao-chicken-with-peanuts
[MALA-KOUSHUIJI] Mouthwatering Sichuan Cold Chicken (Kou Shui Ji), Taylor Holliday, The Mala Market. https://blog.themalamarket.com/mouthwatering-chicken-kou-shui-ji/
[SOUSCHEF-COLDCHICKEN] Fuchsia Dunlop's Cold-dressed Chicken, Sous Chef. https://www.souschef.co.uk/blogs/the-bureau-of-taste/cold-dressed-chicken
[MALA-TUDOUSI] Sichuan Hot and Sour Shredded Potato (Suanla Tudou Si), Kathy Yuan, The Mala Market. https://blog.themalamarket.com/sichuan-hot-and-sour-shredded-potato-suanla-tudou-si/
[CSF-TUDOUSI] Spicy and Sour Shredded Potato, Elaine, China Sichuan Food. https://www.chinasichuanfood.com/spicy-and-sour-potato/
[WOL-GREENBEANS] Sichuan Dry Fried Green Beans, The Woks of Life. https://thewoksoflife.com/sichuan-dry-fried-green-beans/
[CSF-GREENBEANS] Szechuan Dry Fried Green Beans, Elaine, China Sichuan Food. https://www.chinasichuanfood.com/szechuan-green-beans/
[FDA2] Safe Food Handling, U.S. Food and Drug Administration. https://www.fda.gov/food/buy-store-serve-safe-food/safe-food-handling
[FSA1] Cooking your food, Food Standards Agency (gov.uk). https://www.gov.uk/government/publications/cooking-your-food/cooking-your-food
[FSA2] Why avoiding cross-contamination is important, Food Standards Agency (gov.uk). https://www.gov.uk/government/publications/why-avoiding-cross-contamination-is-important/why-avoiding-cross-contamination-is-important
[KK] Baingan Bharta, Kunal Kapur. https://www.chefkunalkapur.com/recipe/baingan-bharta/
[SG] Stovetop: Punjabi Aloo Gobi, Anupy Singla, Indian As Apple Pie. https://www.indianasapplepie.com/blogs/indian-as-apple-pie/aloo-gobi
[MG] Punjabi Aloo Gobi, Maunika Gowardhan (visible part of ingredient list only). https://maunikagowardhan.co.uk/cook-in-a-curry/punjabi-aloo-gobi/
[C1] 50+ Traditional Punjabi Recipes, Izzah Cheema, Tea for Turmeric. https://www.teaforturmeric.com/punjabi-recipes/
[C3] Cilantro Mint Raita (Dahi Pudina Chutney), Izzah Cheema, Tea for Turmeric. https://www.teaforturmeric.com/cilantro-mint-raita-dahi-pudina-chutney/
[C4] Tandoori Chicken, Izzah Cheema, Tea for Turmeric. https://www.teaforturmeric.com/tandoori-chicken/
[C5] Mutton Karahi (Goat/Lamb Karahi), Izzah Cheema, Tea for Turmeric. https://www.teaforturmeric.com/mutton-karahi-goat-lamb-karahi/
[C10] Dahi Bhalla (Dahi Bara), Izzah Cheema, Tea for Turmeric. https://www.teaforturmeric.com/dahi-bhalla/
[TR1] Spaghetti aglio, olio e peperoncino, Turismo Roma. https://www.turismoroma.it/it/page/spaghetti-aglio-olio-e-peperoncino-0
[PN1] Spaghetti aglio, olio e peperoncino, Portanapoli. https://www.portanapoli.com/Ita/Cucina/spaghetti_aglio_e_olio.html
[PN2] Spaghetti con le vongole, Portanapoli. https://www.portanapoli.com/Ita/Cucina/spaghetti-vongole.html
[PN-put] Spaghetti alla puttanesca: storia e leggenda della ricetta, Portanapoli. https://www.portanapoli.com/Ita/Cucina/ga_puttanesca.html
[DS-put] Spaghetti alla puttanesca, Dissapore. https://www.dissapore.com/ricette/spaghetti-puttanescae-perche-si-chiamano-cosi/
[SP-ore] Orecchiette con cime di rapa, Sonia Peronaci. https://www.soniaperonaci.it/orecchiette-con-cime-di-rapa/
[GS] Peperoncino e Calabria, storia di un grande amore (nato male), Giovanni Sole, iCalabresi (2021). https://www.icalabresi.it/cultura/peperoncino-e-calabria-storia-di-un-grande-amore-nato-male/
[NM1] The Chile Cultivars of New Mexico State University, 1913–2022 (Circular 706), NMSU (notes only). https://pubs.nmsu.edu/_circulars/CR706/index.html

## 6. What I couldn't verify

- **Muhammara** (pomegranate molasses, Aleppo pepper and walnut): I found no owning source, only blogs and aggregators. So pomegranate-molasses + aleppo-pepper rests on Kassis's marinade alone.
- **Red House Spice's five-spice page** returned 403. Its author's Sichuan background, and any statement on five-spice in Sichuan, couldn't be read.
- **Five-spice in Sichuan cooking:** I found no Dunlop or other Sichuan source using it, so it isn't tagged.
- **Five-spice + beef:** no Cantonese beef source was found.
- **The Woks of Life's "crispy roast pork belly" URL** returned 404. The working siu yuk URL is the one cited.
- **Paojiao from fresh chiles:** supported only by China Sichuan Food's recipe title, not by an owning source's sentence. The Mala Market's pickled-chile product page turned up in search but wasn't fetched.
- **Bayless's Oaxacan pasilla salsa** (linked from [B-tla]) wasn't fetched. The beef + chile move to dried rests on [L-chi].
- **Gowardhan's aloo gobi** list was truncated after "+ 5 more", so whether she also uses chilli powder is unknown.
- **Kadhi tadka chile form** [C1] isn't stated.
- **Chilli oil = dried chile:** [WOL-CHILIOIL] implies it ("toasted before grinding") rather than saying "dried".
- **Larousse "Oaxaca"** is 166k characters; I read the first 100k.
- **Unsourced in proposed copy, so trim or source before authoring:**
  - "Burnt chile turns bitter" (left out of the tip).
  - "Brands vary" (pomegranate molasses tip).
  - Cider vinegar "helps the paste cling".
  - "Brightens deep, earthy" dried chile.
  - "Balances" in pomegranate-molasses + aleppo-pepper.
  - Five-spice is "warm, sweet-scented": none of the pages describes its flavour.
- **Chicken breast:**
  - No agency page I fetched covers holding cooked chicken cold for kou shui ji.
  - The FDA page doesn't address rinsing; FSA does.
  - Other Cuisines weren't researched beyond one non-Punjabi chicken tikka page.
- **The Sichuan protein exception's reason text** overstates breast use; see section 2.
- **Food safety for the other four Ingredients:** I found no agency guidance specific to pomegranate molasses, cider vinegar, dried chile or five-spice.
- **Source caveats:**
  - The Mala Market is a retailer's blog.
  - The Woks of Life's char siu and Hadia's fattoush pages use the word "authentic" in places. Don't reuse it.
  - Slow Food's Ark of Taste is a Lebanese nomination. It supports Lebanese use, not every Levantine kitchen.
