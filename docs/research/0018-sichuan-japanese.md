# Research for #18: Sichuan and Japanese home cooking (with Cantonese where it comes up)

Research notes for new Ingredients, re-tags, exceptions and Pairings. Nothing here has been put into `content/` yet; this is input for authoring. It builds on `docs/research/0017-sichuan-japanese-cantonese.md` ("batch 1") and reuses its sources where they fit.

## 1. Method

- I fetched and read every URL cited below during this research, and each supports the claim it's attached to. Quotes are verbatim, or a close paraphrase where marked. I translated the Japanese MAFF pages myself.
- I didn't use pairing books or compound/flavour-molecule data (ADR 0001). I used Wikipedia and search-result summaries only to find sources, never as citations.
- **Sources I relied on most:**
  - **Japan's Ministry of Agriculture, Forestry and Fisheries (MAFF)**: うちの郷土料理 (Our Regional Cuisines), にっぽん伝統食図鑑 (Traditional Foods), its "mezamashi gohan" recipe pages and the *aff* magazine feature on aromatic vegetables. These carry most of the Japanese claims, which moves the Japanese side well beyond Just One Cookbook.
  - **Kikkoman's English cookbook and glossary**, from a Japanese seasoning maker with a long record of publishing on washoku. It's commercial, but it's an established institution in the tradition.
  - **Yumiko, RecipeTin Japan** (born and raised in Japan) and **Namiko Hirasawa Chen, Just One Cookbook** (a Japanese home cook).
  - **Fuchsia Dunlop** for Sichuan, via SBS (mapo tofu), The Splendid Table (gong bao), Sous Chef (cold-dressed chicken) and the *Then Do Better* interview. Luisa Weiss's credited adaptation of a Dunlop recipe is on Goodreads.
  - **The Woks of Life** (the Leung family) and **Elaine, China Sichuan Food**.
  - **The Mala Market blog**: Kathy Yuan, daughter of Sichuan immigrants; Taylor Holliday, the founder.
  - **Yi, Yi's Sichuan Kitchen** (from Chengdu).
  - **Maggie Zhu, Omnivore's Cookbook** (from Beijing).
  - **FDA** and the **UK FSA** for food safety.
- **Blocked or failed fetches, none cited:**
  - Food52, which hosts Dunlop's dry-fried green beans and returned 429 three times.
  - Saveur (403). The redirected Zojirushi blog (404). Red House Spice (403). Healthy Nibbles (403).
  - USDA FSIS chart (403). nippon.com (404). tasteofjapan.maff.go.jp (DNS failure).
  - KCRW's Dunlop interview (429). The fuchsiadunlop.com garlic post (404).
  - Two PDFs, the FDA temperature chart and the MAFF shabu-shabu pamphlet, came back as unreadable binary.
  - I didn't try to get around any block.

---

## 2. New Ingredients

### shichimi (shichimi togarashi, 七味唐辛子)

- **Category:** blend
- **typicallyIncludes (from current content):** chile, ginger, shiso.
  - Kikkoman lists "chili pepper, black pepper, sesame seeds, and dried mandarin orange peel" as standard, plus "seaweed flakes, Japanese peppercorn, hemp seeds, and poppy seeds", and notes that recipes vary by maker.
  - MAFF's Kyoto shichimi page lists 唐辛子、山椒、麻の実、白胡麻、黒胡麻、青のり、青紫蘇 (chili, sansho, hemp seed, white and black sesame, aonori, green shiso). It also mentions citrus peel and ginger in production.
  - Just One Cookbook lists "dried red chili pepper, sansho pepper, hemp seeds, white and/or black sesame seeds, mandarin orange peel, and nori."
  - **Don't list sichuan-pepper.** Sansho is a related but different prickly-ash pepper; JOC calls it "a cousin to the Chinese Sichuan peppercorn". This follows batch 1's decision.
- **Slot types:** heat (also works as garnish).
- **Cuisines:** japanese (MAFF Kyoto shichimi; Kikkoman; MAFF cod yosenabe and imoni; JOC karaage and tonjiru).
- **Essay points:**
  1. It's a blend built around chili. Kikkoman describes it as a mix of seven spices and ingredients, with chili as the main one. The other ingredients vary by maker and region.
  2. It's milder and more aromatic than plain chili powder. Kikkoman's ichimi entry says ground red chili alone is much spicier than mixed blends. MAFF describes Kyoto shichimi as having 辛さは控えめで香りが豊か ("modest heat and a rich aroma"; paraphrase of the page's description).
  3. It started in the Edo period. Kikkoman says it began in Edo-period Tokyo as a mixture sold near shrines and temples, first as a herbal remedy, and grew popular as a soba topping. MAFF says Kyoto has old shichimi shops 清水寺や八坂神社前などの大きな寺社の門前 ("at the gates of large temples and shrines such as Kiyomizu-dera and Yasaka Shrine").
  4. It's a finishing condiment, added at the table. Kikkoman: sprinkled over "warm noodles and flame-broiled foods." MAFF (Kyoto): 特に鍋料理、うどん、焼き鳥などには欠かせない ("especially indispensable for hot pots, udon and yakitori").
- **Tip:** Sprinkle it on at the table, not into the pot, so the citrus peel and sansho keep their aroma. Kikkoman advises refrigerating it once opened, because heat, moisture and sunlight dull it.
- **Cultural context:**
  - Three makers are best known: Yagenbori (Tokyo), Shichimiya Honpo (Kyoto) and Yawataya Isogorō (Nagano). Only the Kyoto one is sourced here (MAFF), so don't name the other two in content without another source.
  - MAFF notes the blend and its proportions vary by shop and region.
- **Food safety:** None beyond storage.
- **Citations:**
  - [KIK-SHICHIMI], [KIK-ICHIMI], [MAFF-KYOSHICHIMI], [JOC-HERBS], [JOC-KARAAGE], [JOC-TONJIRU], [MAFF-TARA-YOSENABE], [MAFF-IMONI].

### ponzu (ポン酢)

- **Category:** condiment (citrus-soy sauce)
- **Slot types:** acid
- **Cuisines:** japanese (MAFF yuzu ponzu; MAFF mizutaki; MAFF cod yosenabe; Kikkoman; JOC).
- **Essay points:**
  1. It's a citrus-based seasoning, and in modern use usually citrus juice with soy sauce.
     - MAFF (yuzu ponzu): 酢に柚子果汁を加えた調味料 ("a seasoning made by adding yuzu juice to vinegar"). The listed ingredients are 柚子、酢、醤油、みりん、鰹節、昆布 (yuzu, vinegar, soy sauce, mirin, bonito, kombu).
     - Kikkoman: strictly, soy-based versions are "ponzu soy sauce", but in Japan today both go by the same name.
     - JOC: the original version used sudachi, yuzu, kabosu and daidai juice with rice vinegar, and no soy sauce.
  2. Its citrus can make up for less salt. Kikkoman says ponzu can make up for a lack of saltiness. Common citrus in store-bought ponzu includes "Yuzu, Sudachi Citrus, Kabosu Citrus, Shikuwasa Citrus, Lemon."
  3. Its usual job is a dip for hot pots and a dressing for simple foods.
     - MAFF: 鍋物はもちろん、酢の物、焼き魚、刺身、冷奴など ("hot pots of course, plus vinegared dishes, grilled fish, sashimi, cold tofu").
     - Kikkoman: dip for "sashimi, potstickers, and shabu shabu"; "pairs especially well with grated daikon radish."
  4. The origin of the name is uncertain. Kikkoman gives two theories: a Dutch word or a Portuguese word for citrus juice, with 酢 (su, vinegar) added. Present it as uncertain.
- **Tip:** Use it at the table or right at the end of cooking, not as a long simmering liquid; its citrus aroma fades with heat. Once opened, keep it in the fridge (JOC: "once opened, in the fridge").
- **Cultural context:** MAFF says Kochi's yuzu ponzu began as a way to sell yuzu that couldn't reach market as fresh fruit, around 1965. Home-made ponzu was sold commercially from about 1986 and became known across Japan. It's a staple for Kochi's mizutaki and chirinabe (MAFF).
- **Food safety:** None. Refrigerate after opening.
- **Citations:** [MAFF-YUZUPONZU], [KIK-PONZU], [JOC-PONZU], [MAFF-MIZUTAKI], [MAFF-TARA-YOSENABE].

### beef

- **Category:** meat
- **Slot types:** protein
- **Cuisines:**
  - **japanese:**
    - nikujaga: MAFF 呉の肉じゃが and MAFF's standard nikujaga recipe, both with 牛肉.
    - gyudon: JOC.
    - imoni: MAFF (inland Yamagata, beef).
    - cold shabu-shabu with ponzu: MAFF.
  - **sichuan:**
    - mapo tofu with beef mince: Dunlop via SBS.
    - water-boiled beef: The Woks of Life.
    - celery with minced beef: Dunlop via Luisa Weiss.
  - cantonese: not researched.
- **Essay points:**
  1. In Japanese home cooking, beef is usually thinly sliced and simmered briefly in a sweet soy broth, as in nikujaga and gyudon.
     - MAFF nikujaga: 牛うす切り肉 150 g with potatoes, carrot and onion, in dashi with sugar, sake and soy sauce.
     - JOC gyudon: "Thinly sliced beef (chuck or ribeye)"; "Don't overcook the beef."
  2. Nikujaga varies by region: beef in the west, pork in the east. JOC: "In western Japan, nikujaga typically features beef, while pork is more commonly used in eastern Japan."
     - MAFF's imoni page shows the same kind of split within Yamagata. Inland imoni is 牛肉を使った醤油味 ("beef, soy-sauce seasoned"), while Shonai on the coast uses pork and miso.
  3. In Sichuan cooking, beef is often minced or cut into thin slices and cooked in chili bean paste.
     - Dunlop's mapo tofu (SBS) uses "250 g beef mince", browned and then simmered in fried doubanjiang.
     - The Woks of Life's boiled beef poaches flank slices in a doubanjiang broth: "It's crucial to cut the beef against the grain."
  4. In Sichuan water-boiled beef, the beef is cooked only briefly. The Woks of Life: "a hint of pink in the middle equals tender beef." The cooked slices are then topped with garlic, chili and cilantro and doused with hot oil.
- **Tip:** Slice it thinly across the grain and cook it briefly; thin beef turns chewy when it's simmered too long (JOC gyudon; The Woks of Life).
- **Cultural context:**
  - Nikujaga is called *ofukuro no aji*, "the taste of mother's cooking" (JOC). MAFF notes that Kure, in Hiroshima, links the dish to the navy and Admiral Tōgō, and says it is now 家庭料理として一般的に作られ ("commonly made as home cooking").
  - The navy-origin story is a local claim. MAFF reports it as Kure's claim (「呉は肉じゃが発祥の地である」), so hedge it in content.
- **Food safety (FDA, UK FSA):**
  - FDA: "Cook beef, pork, veal, and lamb roasts, steaks, and chops to at least 145° F (63° C), with a 3 minute rest time." "Cook ground beef, veal, lamb, and pork to at least 160° F (71° C)."
  - UK FSA: whole cuts such as steaks "only ever have bacteria on the outside surface" and "can be served pink in the middle". "Any meat that has been minced or skewered all the way through should be cooked thoroughly." The FSA's benchmark is "70°C for 2 minutes" in the middle, or an equivalent combination.
  - Practical consequence: beef mince for mapo tofu should be cooked through. Thin slices for gyudon or water-boiled beef are whole-muscle meat, but the FDA's 145°F / 63°C figure is the stricter guidance.
- **Citations:** [MAFF-KURE-NIKUJAGA], [MAFF-NIKUJAGA], [JOC-NIKUJAGA], [JOC-GYUDON], [MAFF-IMONI], [MAFF-HIYASHABU], [SBS-MAPO], [WOL-BOILEDBEEF], [WEISS-CELERY], [FDA-MOMS], [FSA-COOKING].

### cod (white fish)

- **Category:** fish
- **Slot types:** protein
- **Cuisines:** japanese only. Sichuan isn't supported for cod specifically; see section 7.
- **Japanese sources:**
  - MAFF 鱈の寄せ鍋 (cod hot pot).
  - MAFF 鱈汁 (Akita): 鱈とネギを味噌ベースの汁で煮た鍋料理 ("a hot pot of cod and leek simmered in a miso-based broth").
  - Saikyo-yaki: RecipeTin Japan; JOC miso cod (batch 1).
- **Name it "Cod" and say in the essay that Japanese recipes often use black cod (sablefish, *gindara*), which isn't a true cod.** RecipeTin Japan treats black cod as the first choice for saikyo-yaki and also uses blue eye cod, salmon and Spanish mackerel.
- **Essay points:**
  1. Cod is a winter fish in Japan, often simmered whole in hot pots.
     - MAFF describes Akita's 鱈汁 as using the cod at its peak, 身だけでなくアラや肝、白子などすべて ("not only the flesh but the bones, liver, milt and all"), in late January to February.
     - MAFF's cod yosenabe calls cod 高タンパク低脂肪 ("high-protein, low-fat").
  2. In hot pots it's usually eaten with ponzu and condiments. MAFF's cod yosenabe is served with ぽん酢、大根おろし、七味 (ponzu, grated daikon, shichimi).
  3. Marinating in sweet white miso (saikyo-yaki) is a common way to cook fillets. RecipeTin Japan: "Marinating time is 1-3 days, preferably 3 days."
  4. Lean cod flakes and falls apart easily. Maggie Zhu (Omnivore's Cookbook) advises against it for Sichuan water-boiled fish: "Avoid cod because it will fall apart during cooking." So cook it gently in larger pieces.
- **Tip:** Wipe off as much of the miso as you can before you grill a saikyo-marinated fillet; the sugar in the miso burns fast (RecipeTin Japan: "remove the miso from the surface of the fish as much as possible before grilling").
- **Cultural context:** Akita's 鱈汁 is linked to the Kakeyo festival in Nikaho, which has been held for over 300 years (MAFF).
- **Food safety (FDA, UK FSA):**
  - FDA: "Finfish should be cooked to an internal temperature of 145° F (63° C)", or until "the flesh is clear and separates easily with a fork."
  - UK FSA: fish flesh "should turn opaque (no longer transparent) and separates easily with a fork."
  - FDA: freezing kills some parasites, but not all germs. Pregnant women, children, older adults and immunocompromised people should avoid raw or undercooked seafood.
- **Citations:** [MAFF-TARA-YOSENABE], [MAFF-TARAJIRU], [RTJ-SAIKYO], [JOC-MISOCOD], [OMNI-SHUIZHUYU], [FDA-SEAFOOD], [FDA-MOMS], [FSA-COOKING].

### potato

- **Category:** produce
- **Slot types:** vegetable
- **Cuisines:**
  - **japanese:**
    - nikujaga: MAFF Kure and MAFF standard recipes; JOC.
    - kujira-jaga: MAFF Nagasaki.
  - **sichuan:**
    - hot-and-sour shredded potato: Kathy Yuan, The Mala Market; Elaine, China Sichuan Food.
    - Dunlop's 熗土豆絲 (potato slivers with chilli and Sichuan pepper) exists in *Every Grain of Rice*, but I could only confirm its title and the book (ckbk), not its text.
- **Essay points:**
  1. Potato does opposite jobs in these two Cuisines.
     - In Japanese nikujaga it simmers until soft and soaks up a sweet soy-dashi broth. MAFF calls the dish ホクホクの肉じゃがは和食の定番 ("fluffy nikujaga is a washoku standard").
     - In Sichuan shredded potato it's cut into slivers and stir-fried so it stays a little crisp. Kathy Yuan: "It is easy to overcook the potatoes, which will go from crisp to limp."
  2. The variety matters.
     - MAFF says Kure nikujaga uses メークイン (May Queen, a waxy, oval potato), which holds its shape. JOC: "Yukon golds keep their shape better during simmering"; russets absorb flavour but break more.
     - For shredded potato, Kathy Yuan says "select waxy yellow potatoes for this dish" (not russet).
  3. For stir-frying, soak or rinse the slivers first to remove surface starch so they don't stick. Elaine (China Sichuan Food) soaks them "in clean water for around 10 minutes before frying".
  4. In the Sichuan dish, black vinegar goes in last. Elaine adds it "at the very end of the stir-frying process" because the acid is volatile. Kathy Yuan prefers Chinese black vinegar to white rice vinegar, which she calls "sharper, more acidic and adds less depth."
- **Tip:** For a stir-fry, cut thin slivers and rinse off the surface starch; for a simmer, cut large, even chunks of a waxy potato so they soften without falling apart.
- **Cultural context:**
  - JOC calls nikujaga "synonymous with good old home cooking in Japan." Kathy Yuan calls suanla tudou si a "stir-fry mainstay in restaurants and homes" in China.
  - MAFF's Nagasaki page shows a local variation: kujira-jaga, nikujaga made with salted whale, grew up in households after nikujaga itself appeared.
- **Food safety:** None specific from official sources in this research.
- **Citations:** [MAFF-KURE-NIKUJAGA], [MAFF-NIKUJAGA], [JOC-NIKUJAGA], [MAFF-KUJIRAJAGA], [MALA-TUDOUSI], [CSF-TUDOUSI], [CKBK-POTATO].

### green-beans

- **Category:** produce
- **Slot types:** vegetable
- **Cuisines:**
  - **sichuan:** dry-fried green beans, 干煸四季豆 (The Woks of Life; China Sichuan Food). Dunlop has a vegetarian version, 乾煸四季豆(素), in *Every Grain of Rice*; ckbk confirms the title only.
  - **japanese:**
    - goma-ae: Kikkoman.
    - sesame-miso dressing: MAFF 七色お和え (Nara).
    - nikujaga and kujira-jaga: JOC; MAFF Nagasaki.
- **Essay points:**
  1. Sichuan "dry-frying" (gan bian) cooks the beans in a hot pan until they wrinkle and scorch in spots, then adds pork, chili and preserved vegetable.
     - The Woks of Life: "You want to see small scorch marks on the green beans."
     - China Sichuan Food cooks them "until wrinkled, about 10–12 minutes" (paraphrase), then fries minced pork, garlic, ginger, scallion white, ya cai, chilies and Sichuan peppercorn and returns the beans.
  2. In Japanese goma-ae, the beans are blanched briefly and dressed with ground toasted sesame, soy and sugar. Kikkoman's goma-ae boils them "1.5 to 2 minutes" and cools them in a colander, not water: "Placing the green beans in water to cool will cause them to become soggy." This colander cooling is called *okaage*.
  3. In Japanese simmered dishes they're often the green that goes in last.
     - MAFF (kujira-jaga): さやいんげんはサッと下ゆでし… 仕上げ際にいんげんを加える ("blanch briefly… add at the very end").
     - JOC (nikujaga): add the green vegetable "right before serving to keep its bright color."
  4. The Sichuan dish is often made without meat. Dunlop's book has a vegetarian version, and The Woks of Life suggests replacing the pork with more ya cai.
- **Tip:** Dry the beans well before they go into the pan or the dressing. Wet beans steam instead of blistering, and they thin a sesame dressing (Kikkoman: pat dry before dressing).
- **Cultural context:**
  - MAFF's Nara page shows sayaingen among the seven vegetables of 七色お和え, an offering dish for Obon in Shingon Buddhism. The vegetables are dressed in すりごま、味噌、砂糖 ("ground sesame, miso, sugar").
  - Dry-fried green beans are widely cooked in Sichuan restaurants and homes. Keep it to "common in Sichuan cooking" in content.
- **Food safety:** None from an official source. Undercooked green beans are sometimes said to be a concern, but I didn't find FDA/FSA guidance specific to fresh green beans, so leave it out.
- **Citations:** [WOL-GREENBEANS], [CSF-GREENBEANS], [CKBK-GREENBEANS], [KIK-GOMAAE], [MAFF-NANAIRO], [MAFF-KUJIRAJAGA], [JOC-NIKUJAGA].

---

## 3. Re-tags

| Ingredient | Proposed tag | Verdict | Evidence |
|---|---|---|---|
| chicken-thigh | sichuan | **Reject.** The dishes are Sichuan, but the thigh isn't. | Dunlop's gong bao specifies "2 boneless chicken breasts" ([SPLENDID-GONGBAO]). Her cold-dressed chicken uses "cold poached chicken meat off the bone (about half a chicken)" ([SOUSCHEF-COLDCHICKEN]). The Mala Market's kou shui ji uses bone-in breasts or half a chicken; thighs are an option, and the author notes "this is one of the few places in Sichuan cuisine where white meat chicken is often used" ([MALA-KOUSHUIJI]). La zi ji used thighs "by choice" (batch 1). A generic "chicken" Ingredient would be Sichuan; chicken thigh specifically isn't sourced. |
| lemon | japanese | **Confirm, as a garnish acid.** | Kikkoman karaage: "1/2 lemon, sliced into wedges", squeezed over just before eating ([KIK-KARAAGE]). JOC karaage: usually served with mayo and "a squeeze of lemon juice" ([JOC-KARAAGE]). Kikkoman also lists lemon among the citrus used in store-bought ponzu ([KIK-PONZU]). The cultural context should say lemon is mostly a squeeze at the table, and that yuzu, sudachi and kabosu are the more traditional Japanese citrus. |
| cauliflower | sichuan | **Confirm, moderately.** | Yi (Yi's Sichuan Kitchen, "originally from Chengdu") cooks dry-pot cauliflower (干锅花菜) with garlic, Sichuan peppercorn and dried chili, and calls it "one of my favorite dishes in the restaurant" ([YI-DRYPOT]). This rests on one source from the tradition, and it's a restaurant-style dish. A second source would make it firmer; I didn't fetch others. |
| cilantro | sichuan | **Propose, with a hedge** (not asked, but it bears on the soft-herb gap) | The Woks of Life's Sichuan boiled beef: "Top it with the minced garlic, chili flakes, and chopped cilantro" ([WOL-BOILEDBEEF]). China Sichuan Food's shredded potato: "Spring onion and coriander for garnishing" ([CSF-TUDOUSI]). Coriander appears as an optional finish in some Sichuan home dishes, but none of the Dunlop recipes read here use it. |

---

## 4. Exceptions

These are slots where the Cuisine won't reach three Ingredients, with a source that says or shows why.

1. **Sichuan, soft herb (0, or 1 with the cilantro re-tag).** Sichuan dishes usually finish with scallion greens, ground Sichuan pepper, peanuts or sesame rather than leafy herbs, though coriander does appear on some home dishes.
   - **Shows it:**
     - Dunlop's mapo tofu finishes with "1 tsp ground Sichuan pepper, to serve" ([SBS-MAPO]).
     - Her gong bao has no herb ([SPLENDID-GONGBAO]).
     - Her cold-dressed chicken is garnished only with sesame seeds ([SOUSCHEF-COLDCHICKEN]).
     - The Mala Market's kou shui ji is garnished with "2 scallions, green part only", peanuts and sesame ([MALA-KOUSHUIJI]).
   - **Counter-evidence:** coriander on water-boiled beef ([WOL-BOILEDBEEF]) and shredded potato ([CSF-TUDOUSI]). Dunlop also names coriander alongside garlic and spices among ingredients that correct off-tastes ([THENDOBETTER-DUNLOP]), which is a seasoning role, not a herb finish.
   - **Wording for content:** "Sichuan cooking uses few soft herbs; coriander sometimes finishes a dish, but scallion greens and ground Sichuan pepper do that job more often." No source says "rarely" outright, so treat this as shown, not stated.

2. **Sichuan, acid (1: black vinegar).** Sichuan sourness comes mostly from black vinegar and from pickles (pao cai, pickled chillies), and pickles aren't Ingredients in the graph.
   - Dunlop's gong bao: "3 tsp Chinkiang or black Chinese vinegar" ([SPLENDID-GONGBAO]).
   - Kathy Yuan prefers "Chinese black vinegar" over white rice vinegar for shredded potato ([MALA-TUDOUSI]).
   - Taylor Holliday: "Many meals in Sichuan (and in our house) are accompanied by a side dish of pickled vegetables." Fermented vegetables taste "like sour versions of themselves instead of like vinegar" ([MALA-PAOCAI]).
   - Dunlop names "some kind of preserved and pickled vegetables" as a source of savoury depth, and "vinegar sourness" in strange-flavour sauce ([THENDOBETTER-DUNLOP]).
   - **Wording for content:** "Sour notes in Sichuan cooking usually come from black vinegar or from pickles."

3. **Sichuan, protein (2: pork, beef).** There's no third sourced protein. Chicken thigh is rejected (section 3), and cod isn't attested in a Sichuan source.
   - A generic "chicken" Ingredient, or a "white fish" Ingredient for water-boiled fish ([OMNI-SHUIZHUYU] recommends sea bass, snapper, branzino or flounder), would fill the gap. Either is a modelling decision.
   - This is a modelling gap more than a culinary one, so it isn't a true exception.

4. **Japanese, soft herb (1: shiso).** Japanese home cooking uses aromatics as *yakumi* (small condiments: negi, myoga, shiso, ginger, wasabi) rather than handfuls of leafy herbs. Scallion fills much of that role.
   - MAFF's aromatic-vegetables feature covers ginger, wasabi, ōba and myoga, and says 「青じそ」は薬味としておなじみです ("green shiso is familiar as a yakumi") ([MAFF-KOUSHIN]).
   - MAFF's Fukushima page: ねぎやみょうが、紫蘇の葉などの香り豊かな薬味を用意することが一般的 ("it's usual to prepare fragrant yakumi such as negi, myoga and shiso leaves") ([MAFF-JUUNEN]).
   - MAFF's mizutaki page: 薬味にはもみじおろしや、おろししょうが、ねぎ、柚子など ("for yakumi, momiji-oroshi, grated ginger, negi, yuzu") ([MAFF-MIZUTAKI]).
   - Mitsuba is the main other soft herb. JOC says it garnishes chawanmushi and oyakodon ([JOC-HERBS]), so it's a candidate for a future Ingredient.
   - JOC: Japanese herbs and spices "accentuate the other ingredients rather than altering their natural flavors" ([JOC-HERBS]).

5. **Japanese, heat (1: shichimi).** Japanese home cooking is rarely chili-hot. Pungency usually comes from table condiments: shichimi, wasabi, karashi, grated ginger, and momiji-oroshi (daikon grated with chili).
   - Kikkoman: shichimi is sprinkled on "as much as you like" at the table ([KIK-SHICHIMI]). Kikkoman also says ichimi is much spicier than shichimi ([KIK-ICHIMI]).
   - MAFF: wasabi 今は主に薬味として活用されています ("now used mainly as a yakumi") ([MAFF-KOUSHIN]). MAFF Kyoto shichimi: 辛さは控えめ ("restrained heat") ([MAFF-KYOSHICHIMI]).
   - JOC lists wasabi, karashi and ichimi as condiments ([JOC-HERBS]).
   - Wasabi or karashi could become Ingredients later, but neither is in scope here.
   - No source says "Japanese food isn't spicy" outright; these sources show heat as a mild, optional table condiment.

**Resulting counts** (if all proposals are accepted):

| Cuisine | Protein | Acid | Soft herb | Heat | Vegetable |
|---|---|---|---|---|---|
| Sichuan | 2: pork, beef | 1 (exception) | 0, or 1 with cilantro (exception) | fine | 4: eggplant, green beans, potato, cauliflower |
| Japanese | 5: pork, salmon, chicken thigh, beef, cod | 3: rice vinegar, ponzu, lemon | 1 (exception) | 1: shichimi (exception) | 4: eggplant, onion, potato, green beans |

---

## 5. Pairings

All pairs below are new. None appear in `pairings.yaml`, because every pair includes at least one new Ingredient or isn't already listed. "Weak" means the source shows the two only as co-ingredients or as an optional garnish.

### shichimi

1. **shichimi + cod** (tradition). Shichimi is a usual table condiment for cod hot pot, alongside ponzu and grated daikon. *Cuisines:* japanese.
   - [MAFF-TARA-YOSENABE]: 「ぽん酢、大根おろし、七味、など」 as condiments; "Serve with ponzu, grated daikon, or shichimi as you like" (paraphrase).
2. **shichimi + pork** (tradition). A sprinkle of shichimi is a common optional finish for pork-and-miso tonjiru. *Cuisines:* japanese.
   - [JOC-TONJIRU]: "Sprinkle shichimi togarashi over individual bowls for a spicy finish."
3. **shichimi + miso** (contrast). Shichimi's citrusy heat cuts through the rounded saltiness of miso soups. *Cuisines:* japanese.
   - [JOC-TONJIRU]: "Add shichimi togarashi (Japanese seven spice) at the table for an optional spicy kick."
   - Weak-to-moderate: one source. The contrast reasoning is ours.
4. **shichimi + scallion** (tradition). Sliced green onion and shichimi finish bowls of miso soup and noodles together. *Cuisines:* japanese.
   - [JOC-TONJIRU]: "Green onion and optional shichimi togarashi finish the soup."
5. **shichimi + chicken-thigh** (tradition). Fried thigh karaage is often served with a sprinkle of shichimi. *Cuisines:* japanese.
   - [JOC-KARAAGE]: "Serve the fried chicken warm with optional lemon wedges, Japanese Kewpie mayo, and a sprinkle of shichimi togarashi."
   - [MAFF-KYOSHICHIMI]: shichimi is indispensable for 焼き鳥 (yakitori), which isn't thigh-specific.
6. **shichimi + beef** (tradition). Weak. Beef-and-taro imoni can be finished with shichimi. *Cuisines:* japanese.
   - [MAFF-IMONI]: basic ingredients 里芋、牛肉、こんにゃく、ねぎ; 七味唐辛子をかけても美味しい ("also good with shichimi sprinkled over").

### ponzu

1. **ponzu + cod** (contrast). Citrusy ponzu sharpens mild, lean cod from the hot pot. *Cuisines:* japanese.
   - [MAFF-TARA-YOSENABE]: ponzu is the first condiment listed for cod yosenabe.
   - [MAFF-YUZUPONZU]: yuzu ponzu is used 鍋物はもちろん… 焼き魚 ("hot pots, of course… grilled fish").
2. **ponzu + beef** (contrast). Ponzu's sour citrus balances the richness of thinly sliced, quickly cooked beef in shabu-shabu. *Cuisines:* japanese.
   - [MAFF-HIYASHABU]: beef (牛もも) swished in boiling water, served with ポンズ.
   - [JOC-PONZU]: "used as a finishing sauce or for dipping shabu shabu or hot pot dishes."
   - [KIK-PONZU]: a dip for "shabu shabu".
3. **ponzu + scallion** (tradition). Chopped negi is the usual yakumi stirred into ponzu for hot pots. *Cuisines:* japanese.
   - [MAFF-MIZUTAKI]: eaten with ポン酢と醤油の合わせ酢; condiments include ねぎ.
4. **ponzu + ginger** (aromatic bridge). Grated ginger in ponzu adds a fresh bite alongside the citrus. *Cuisines:* japanese.
   - [MAFF-MIZUTAKI]: 薬味にはもみじおろしや、おろししょうが、ねぎ、柚子などお好みで ("momiji-oroshi, grated ginger, negi, yuzu as you like").
   - Moderate: it's one yakumi among several.
5. **ponzu + shichimi** (tradition). Weak. Both are offered as table condiments for cod hot pot. *Cuisines:* japanese.
   - [MAFF-TARA-YOSENABE], as above.
   - I'd keep this only if the graph wants condiment-condiment pairs.

### beef

1. **beef + doubanjiang** (tradition). Beef is cooked in chilli bean paste fried until the oil turns red, as in mapo tofu and water-boiled beef. *Cuisines:* sichuan.
   - [SBS-MAPO]: "250 g beef mince"; "fry the chilli bean sauce until the oil turns red" (paraphrase of step 3); then "Add the fried beef and spring onion" (batch 1 quote).
   - [WOL-BOILEDBEEF]: "3 tablespoons spicy bean sauce (AKA spicy bean paste)."
   - [WEISS-CELERY] (Dunlop, adapted): ground beef, then chili bean paste "until the oil turns red" (paraphrase).
2. **beef + sichuan-pepper** (tradition). Ground or whole Sichuan pepper gives Sichuan beef dishes their numbing finish. *Cuisines:* sichuan.
   - [SBS-MAPO]: "1 tsp ground Sichuan pepper, to serve."
   - [WOL-BOILEDBEEF]: "1 tablespoon Sichuan peppercorns."
3. **beef + potato** (tradition). Thin beef and potato simmered in sweet soy dashi make nikujaga. *Cuisines:* japanese.
   - [MAFF-NIKUJAGA]: 牛うす切り肉 and じゃがいも; ホクホクの肉じゃがは和食の定番.
   - [MAFF-KURE-NIKUJAGA]: main ingredients じゃがいも、牛肉、糸こんにゃく、玉ねぎ.
4. **beef + onion** (tradition). Thinly sliced onion simmered with beef sweetens nikujaga and gyudon. *Cuisines:* japanese.
   - [JOC-GYUDON]: "Thinly slice the onion so it becomes tender and sweeter quickly."
   - [MAFF-KURE-NIKUJAGA], as above.
5. **beef + scallion** (tradition). Scallion simmers with beef in mapo tofu and finishes gyudon. *Cuisines:* sichuan, japanese.
   - [SBS-MAPO]: "6 thick spring onions, cut into 5 cm lengths."
   - [JOC-GYUDON]: "Green onion/scallion", sprinkled over near the end.
   - [WOL-BOILEDBEEF]: scallions fried in the base.
6. **beef + ginger** (aromatic bridge). Ginger is fried with chilli bean paste and minced beef in Sichuan dishes, and pickled red ginger tops gyudon. *Cuisines:* sichuan, japanese.
   - [WEISS-CELERY] (Dunlop): "1½ tablespoons finely chopped ginger" with ground beef and chili bean paste.
   - [SBS-MAPO]: "1 tbsp grated ginger."
   - [JOC-GYUDON]: "Pickled red ginger (beni shoga…) – for garnish."
   - Japanese use is pickled ginger, so the note should say so.
7. **beef + ponzu**: see ponzu 2.

### cod

1. **cod + miso** (tradition). Cod is simmered in miso broth (tarajiru) or marinated in sweet white miso and grilled (saikyo-yaki). *Cuisines:* japanese.
   - [MAFF-TARAJIRU]: 鱈とネギを味噌ベースの汁で煮た鍋料理.
   - [RTJ-SAIKYO]: fish marinated in "Saikyo miso, sake, mirin, and sugar."
   - [JOC-MISOCOD] (batch 1).
2. **cod + scallion** (tradition). Leek and green onion simmer with cod in Japanese winter hot pots. *Cuisines:* japanese.
   - [MAFF-TARAJIRU]: main ingredients 鱈、ネギ.
   - [MAFF-TARA-YOSENABE]: 長ネギ 1本.
3. **cod + ponzu**: see ponzu 1.
4. **cod + shichimi**: see shichimi 1.
5. **cod + shiso** (contrast). Weak. Shiso leaves are a common garnish beside miso-grilled fish. *Cuisines:* japanese.
   - [RTJ-SAIKYO]: garnishes include "shiso (Japanese perilla leaves), pickled ginger, and radish" (paraphrase of the page's garnish list).
   - That page's fish choices include cod but aren't only cod.

### potato

1. **potato + beef**: see beef 3.
2. **potato + onion** (tradition). Onion melts into the broth around simmered potatoes in nikujaga. *Cuisines:* japanese.
   - [MAFF-NIKUJAGA]: 玉ねぎをかぶせるように散らし入れ、じゃがいもが柔らかくなるまで… 煮込む ("scatter the onion over the top and simmer until the potatoes are soft").
   - [MAFF-KUJIRAJAGA]: じゃがいも、にんじん、たまねぎ.
3. **potato + black-vinegar** (contrast). A splash of black vinegar at the end gives crisp shredded potato its sour edge. *Cuisines:* sichuan.
   - [MALA-TUDOUSI]: "Chinese black vinegar", added last, off the heat.
   - [CSF-TUDOUSI]: "2 teaspoons black vinegar", added "at the very end of the stir-frying process."
4. **potato + chile** (tradition). Dried chillies fried in the oil season Sichuan shredded potato. *Cuisines:* sichuan.
   - [MALA-TUDOUSI]: "3-4 dried chilies, chopped (zidantou preferred)."
   - [CSF-TUDOUSI]: "4 dry chili peppers."
5. **potato + sichuan-pepper** (tradition). Whole Sichuan pepper bloomed in the oil perfumes stir-fried potato slivers. *Cuisines:* sichuan.
   - [MALA-TUDOUSI]: "½ teaspoon whole huajiao (Sichuan pepper)."
   - [CSF-TUDOUSI]: "1 tsp. Sichuan peppercorns."
   - [CKBK-POTATO]: Dunlop's "Stir-Fried Potato Slivers with Chilli and Sichuan Pepper" (title only).
6. **potato + green-beans** (tradition). Green beans are a common last-minute green in nikujaga. *Cuisines:* japanese.
   - [JOC-NIKUJAGA]: the green vegetable is "most often snow peas, green beans, or green peas" (paraphrase).
   - [MAFF-KUJIRAJAGA]: さやいんげん added 仕上げ際.

### green-beans

1. **green-beans + pork** (tradition). Minced pork fried crisp is the usual partner for Sichuan dry-fried green beans. *Cuisines:* sichuan.
   - [WOL-GREENBEANS]: "1/4 cup ground pork."
   - [CSF-GREENBEANS]: minced pork fried "until crispy and browned" (paraphrase).
2. **green-beans + chile** (tradition). Dried chillies fried with the blistered beans give dry-fried green beans their heat. *Cuisines:* sichuan.
   - [WOL-GREENBEANS]: "2 dried red chilies."
   - [CSF-GREENBEANS]: "6, halved."
3. **green-beans + garlic** (tradition). Garlic goes in with the pork and chillies before the beans return to the wok. *Cuisines:* sichuan.
   - [WOL-GREENBEANS]: "2 garlic cloves."
   - [CSF-GREENBEANS]: "2 cloves."
4. **green-beans + sichuan-pepper** (tradition). Moderate. Sichuan peppercorns are fried with the aromatics in dry-fried green beans. *Cuisines:* sichuan.
   - [CSF-GREENBEANS]: "Sichuan peppercorn, 1/4 tsp."
   - The Woks of Life's version omits it, so it varies.
5. **green-beans + miso** (tradition). Blanched green beans are dressed in sesame-miso, as in Nara's 七色お和え. *Cuisines:* japanese.
   - [MAFF-NANAIRO]: 三度豆（さやいんげん） dressed in すりごま、味噌、砂糖を混ぜた和え衣.
   - Moderate: a regional offering dish. Kikkoman's goma-ae uses soy, not miso.
6. **green-beans + potato**: see potato 6.

### Optional extra (existing Ingredients, supports the cauliflower re-tag)

- **cauliflower + sichuan-pepper** (tradition). Sichuan peppercorn and dried chilli season dry-pot cauliflower. *Cuisines:* sichuan.
  - [YI-DRYPOT]: ingredients "Cauliflower, Garlic, Thai Chili, Korean Sweet Peppers, Sichuan Peppercorn, Dry Chili, Soy Sauce, Salt, Sugar."
  - Single source.

**Count:** 29 distinct new Pairings. Counted per Ingredient, including shared ones:

| Ingredient | Pairings |
|---|---|
| shichimi | 7 |
| ponzu | 5 |
| beef | 7 |
| cod | 5 |
| potato | 6 |
| green-beans | 6 |

Plus 1 optional cauliflower + sichuan-pepper. None pair with the other batches' new Ingredients (za'atar, garam-masala, aleppo-pepper, black-pepper, tamarind, red-wine-vinegar, anchovy, epazote); I found no source in these Cuisines that would support one.

---

## 6. Citation key

```
[MAFF-KYOSHICHIMI] 京七味（きょうしちみ）, にっぽん伝統食図鑑, MAFF. https://www.maff.go.jp/j/keikaku/syokubunka/traditional-foods/menu/kyo_sitimi.html
[MAFF-YUZUPONZU] 柚子ポン酢（ゆずぽんず）, にっぽん伝統食図鑑, MAFF. https://www.maff.go.jp/j/keikaku/syokubunka/traditional-foods/menu/yuzuponzu.html
[MAFF-MIZUTAKI] 若鶏の水炊き 福岡県, うちの郷土料理, MAFF. https://www.maff.go.jp/j/keikaku/syokubunka/k_ryouri/search_menu/menu/wakadori_no_mizutaki_fukuoka.html
[MAFF-TARA-YOSENABE] 鱈の寄せ鍋, MAFF. https://www.maff.go.jp/j/seisan/kakou/mezamasi/recipe/recipe124.html
[MAFF-TARAJIRU] 鱈汁 秋田県, うちの郷土料理, MAFF. https://www.maff.go.jp/j/keikaku/syokubunka/k_ryouri/search_menu/menu/29_17_akita.html
[MAFF-KURE-NIKUJAGA] 呉の肉じゃが 広島県, うちの郷土料理, MAFF. https://www.maff.go.jp/j/keikaku/syokubunka/k_ryouri/search_menu/menu/42_20_hiroshima.html
[MAFF-NIKUJAGA] 肉じゃが, MAFF. https://www.maff.go.jp/j/seisan/kakou/mezamasi/recipe/recipe112.html
[MAFF-KUJIRAJAGA] 鯨じゃが 長崎県, うちの郷土料理, MAFF. https://www.maff.go.jp/j/keikaku/syokubunka/k_ryouri/search_menu/menu/46_19_nagasaki.html
[MAFF-IMONI] 芋煮 山形県, うちの郷土料理, MAFF. https://www.maff.go.jp/j/keikaku/syokubunka/k_ryouri/search_menu/menu/imoni_yamagata.html
[MAFF-HIYASHABU] 米粉をつかったひんやり冷しゃぶ, MAFF. https://www.maff.go.jp/j/seisan/kakou/mezamasi/recipe/recipe233.html
[MAFF-NANAIRO] 七色お和え 奈良県, うちの郷土料理, MAFF. https://www.maff.go.jp/j/keikaku/syokubunka/k_ryouri/search_menu/menu/nana_iro_oae_nara.html
[MAFF-KOUSHIN] 食卓を彩る 香辛野菜&つまものの魅力, aff (Aug 2021), MAFF. https://www.maff.go.jp/j/pr/aff/2108/spe1_03.html
[MAFF-JUUNEN] じゅうねん冷やだれ 福島県, うちの郷土料理, MAFF. https://www.maff.go.jp/j/keikaku/syokubunka/k_ryouri/search_menu/menu/30_28_fukushima.html
[KIK-SHICHIMI] Seven-Spice Chili Pepper, Kikkoman glossary. https://www.kikkoman.com/en/cookbook/glossary/shichimitougarashi.html
[KIK-ICHIMI] Ichimi-Togarashi / Ground Red Chili Pepper, Kikkoman glossary. https://www.kikkoman.com/en/cookbook/glossary/ichimitogarashi.html
[KIK-PONZU] Ponzu Sauce, Kikkoman glossary. https://www.kikkoman.com/en/cookbook/glossary/ponzu.html
[KIK-GOMAAE] Sesame-Dressed Green Beans (Gomaae), Kikkoman. https://www.kikkoman.com/en/cookbook/recipe/00058705.html
[KIK-KARAAGE] Crispy Karaage Recipe (Japanese Fried Chicken), Kikkoman. https://www.kikkoman.com/en/cookbook/washoku/karaage.html
[RTJ-SAIKYO] Saikyo Yaki Fish (Saikyo Miso Marinated Grilled Fish), Yumiko, RecipeTin Japan. https://japan.recipetineats.com/saikyo-yaki-fish-saikyo-miso-marinated-grilled-fish/
[JOC-HERBS] Unique Japanese Herbs and Spices, Namiko Hirasawa Chen, Just One Cookbook. https://www.justonecookbook.com/japanese-herbs-and-spices/
[JOC-PONZU] Ponzu Sauce, Namiko Hirasawa Chen, Just One Cookbook. https://www.justonecookbook.com/ponzu/
[JOC-NIKUJAGA] Nikujaga (Japanese Meat and Potato Stew), Namiko Hirasawa Chen, Just One Cookbook. https://www.justonecookbook.com/nikujaga/
[JOC-GYUDON] Gyudon (Japanese Beef Rice Bowl), Namiko Hirasawa Chen, Just One Cookbook. https://www.justonecookbook.com/gyudon/
[JOC-TONJIRU] Tonjiru, Namiko Hirasawa Chen, Just One Cookbook. https://www.justonecookbook.com/tonjiru/
[JOC-KARAAGE] Karaage, Namiko Hirasawa Chen, Just One Cookbook. https://www.justonecookbook.com/karaage/
[JOC-MISOCOD] Miso Cod (Black Cod with Miso), Namiko Hirasawa Chen, Just One Cookbook (fetched in batch 1). https://www.justonecookbook.com/black-cod-with-miso/
[SBS-MAPO] Fuchsia Dunlop's mapo tofu, SBS Food. https://www.sbs.com.au/food/recipe/fuchsia-dunlops-mapo-tofu/fwvcw6ya9
[SPLENDID-GONGBAO] Gong Bao Chicken with Peanuts (Fuchsia Dunlop, Every Grain of Rice), The Splendid Table. https://www.splendidtable.org/story/2015/02/13/gong-bao-chicken-with-peanuts
[SOUSCHEF-COLDCHICKEN] Fuchsia Dunlop's Cold-dressed Chicken, Sous Chef. https://www.souschef.co.uk/blogs/the-bureau-of-taste/cold-dressed-chicken
[WEISS-CELERY] Fuchsia Dunlop's Sichuanese Chopped Celery with Beef (adapted from Every Grain of Rice), Luisa Weiss, Goodreads blog. https://www.goodreads.com/author_blog_posts/5739656-fuchsia-dunlop-s-sichuanese-chopped-celery-with-beef
[THENDOBETTER-DUNLOP] Fuchsia Dunlop: Five Tastes, Chinese Flavour and the Art of Balance, Then Do Better (interview). https://www.thendobetter.com/arts/2026/9/4/fuchsia-dunlop-five-tastes-chinese-flavour-and-the-art-of-balance
[WOL-BOILEDBEEF] Sichuan Boiled Beef (Shuizhu Niurou), Judy Leung, The Woks of Life. https://thewoksoflife.com/sichuan-boiled-beef/
[WOL-GREENBEANS] Sichuan Dry Fried Green Beans, The Woks of Life. https://thewoksoflife.com/sichuan-dry-fried-green-beans/
[CSF-GREENBEANS] Szechuan Dry Fried Green Beans (Simplified version), Elaine, China Sichuan Food. https://www.chinasichuanfood.com/szechuan-green-beans/
[CSF-TUDOUSI] Spicy and Sour Shredded Potato, Elaine, China Sichuan Food. https://www.chinasichuanfood.com/spicy-and-sour-potato/
[MALA-TUDOUSI] Sichuan Hot and Sour Shredded Potato (Suanla Tudou Si), Kathy Yuan, The Mala Market. https://blog.themalamarket.com/sichuan-hot-and-sour-shredded-potato-suanla-tudou-si/
[MALA-PAOCAI] Sichuan Lacto-Fermented Pickles (Paocai), Taylor Holliday, The Mala Market. https://blog.themalamarket.com/sichuans-naturally-fermented-pickles-pao-cai/
[MALA-KOUSHUIJI] Mouthwatering Sichuan Cold Chicken (Kou Shui Ji), Taylor Holliday, The Mala Market. https://blog.themalamarket.com/mouthwatering-chicken-kou-shui-ji/
[YI-DRYPOT] How to make traditional Sichuan dish Dry Pot Cauliflower (干锅花菜), Yi, Yi's Sichuan Kitchen. https://sichuankitchenrecipes.com/2020/07/11/how-to-make-traditional-sichuan-dish-dry-pot-cauliflower-recipe%E5%B9%B2%E9%94%85%E8%8A%B1%E8%8F%9C%EF%BC%89gan-guo-hua-cai/
[OMNI-SHUIZHUYU] Shui Zhu Yu (Sichuan Boiled Fish), Maggie Zhu, Omnivore's Cookbook. https://omnivorescookbook.com/shui-zhu-yu-boiled-fish/
[CKBK-GREENBEANS] Sichuanese 'Dry-Fried' Green Beans (Vegetarian Version), Every Grain of Rice, Fuchsia Dunlop, ckbk (title/metadata only). https://app.ckbk.com/recipe/ever17842c07s001r001/sichuanese-dry-fried-green-beans-vegetarian-version
[CKBK-POTATO] Stir-Fried Potato Slivers with Chilli and Sichuan Pepper, Every Grain of Rice, Fuchsia Dunlop, ckbk (title/metadata only). https://app.ckbk.com/recipe/ever17842c11s001r001/stir-fried-potato-slivers-with-chilli-and-sichuan-pepper
[FDA-MOMS] Meat, Poultry & Seafood (Food Safety for Moms-to-Be), FDA. https://www.fda.gov/food/people-risk-foodborne-illness/meat-poultry-seafood-food-safety-moms-be
[FDA-SEAFOOD] Selecting and Serving Fresh and Frozen Seafood Safely, FDA. https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely
[FSA-COOKING] Cooking your food, Food Standards Agency (GOV.UK). https://www.gov.uk/government/publications/cooking-your-food/cooking-your-food
```

---

## 7. What I couldn't verify

- **Cod in Sichuan cooking.** Water-boiled fish uses white fish, but Maggie Zhu says to avoid cod because it falls apart. I found no Sichuan source that uses cod. Tag cod as japanese only, or model a broader "white fish" Ingredient.
- **Dunlop's text for dry-fried green beans and potato slivers.** Food52 returned 429 three times, and ckbk shows only titles. The Sichuan claims for these rest on The Woks of Life, China Sichuan Food and The Mala Market. Elaine's own origin isn't stated on the pages I read, so describe her as the China Sichuan Food author, not as Sichuanese.
- **Water-boiled beef in Dunlop's own words.** I found only blog adaptations of her *Sichuan Cookery* version, so it isn't cited. The Woks of Life carries the dish.
- **Gyudon and shichimi.** JOC's gyudon page doesn't mention shichimi, so there's no beef + shichimi via gyudon. Only imoni supports it, weakly.
- **Shabu-shabu in a MAFF text.** The MAFF pamphlet (30-33_japanese.pdf) came back as unreadable binary, and tasteofjapan.maff.go.jp didn't resolve. Beef + ponzu rests on the MAFF cold-shabu recipe plus JOC and Kikkoman.
- **The three shichimi makers by name.** Yagenbori and Yawataya Isogorō aren't sourced; nippon.com returned 404. Only Kyoto's shops are sourced (MAFF).
- **The origin of ponzu's name** (Dutch *pons* or Portuguese) is uncertain. Kikkoman gives both theories, so present it as uncertain or leave it out.
- **The navy origin of nikujaga** is reported by MAFF as Kure's local claim. Hedge it.
- **Saikyo-yaki's Kyoto origin.** RecipeTin Japan doesn't mention Kyoto, and no MAFF page I fetched explains saikyo-yaki. Batch 1's MAFF 白味噌 page links Kyoto white miso to miso-zuke, which is enough to say "named for Kyoto's sweet white miso" if that page's wording supports it; recheck when authoring.
- **A source saying outright that "Sichuan cooking rarely uses soft herbs" or that "Japanese food is rarely spicy".** None was found; both exceptions are shown by recipes, not stated. Dunlop's KCRW interview (429) and her own garlic post (404) couldn't be read.
- **Food safety for green beans and potatoes.** I found no FDA or FSA guidance for these specific vegetables (such as raw-bean lectins or green potatoes), so none is proposed.
- **A second source for Sichuan dry-pot cauliflower.** Yi's Sichuan Kitchen is the only one read. Adam Liaw's SBS version and Omnivore's Cookbook weren't fetched.
- **Cantonese** didn't come up for any new Ingredient in sources I read, so nothing is tagged Cantonese.
- **Source caveats:**
  - The Woks of Life boiled-beef page calls the recipe "authentic". That's their word; don't reuse it.
  - Kikkoman is a commercial maker.
  - The Mala Market is a retailer's blog, though Kathy Yuan writes from a Sichuan family background.
  - The Goodreads post is Luisa Weiss's credited adaptation, not Dunlop's own publication.
  - The *Then Do Better* page is dated September 2026 and is an interview transcript.
