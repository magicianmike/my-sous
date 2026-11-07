# Research for issue #19: staples, garnish and sauce

This note covers eggs, rice, bulgur and farro as staple Ingredients, plus coverage for two new Slot types, `garnish` and `sauce`, in each launch Cuisine. It also proposes the new Ingredients that close the gaps.

## 1. Method

- I started from `docs/voice-guide.md`, `content/cuisines.yaml`, `content/formulas.yaml`, the Ingredient files and the batch notes (`0017-*.md`, `0018-*.md`). I reused their sources where they fit, and I re-fetched every reused page during this research to get the quote used here.
- I fetched and read every URL cited here during this research. Quotes are verbatim, as the fetch tool returned them. Italian, Spanish and Japanese quotes are left in the original, with my translation. "(paraphrase)" marks text that isn't verbatim.
- I didn't use *The Flavour Thesaurus*, *The Flavor Bible* or any compound or flavour-molecule data (ADR 0001). Wikipedia, shops, recipe aggregators and home-cook blogs turned up in searches. None is cited, except where a named cook from the tradition writes the blog (Yi of Sichuan Kitchen, from Chengdu).
- **Blocked or failed pages**, which I didn't try to get around:
  - USDA FSIS (403).
  - Gambero Rosso recipe pages (403 on the second visit, so only the one Gambero Rosso article fetched earlier is cited).
  - PalermoToday (403), the Washington Post (403), the Sicilian Region tourism portal (connection refused) and UF/IFAS EDIS (redirect loop).
  - The food.gov.uk pages I tried redirected to gov.uk, where I read them.
- **Sources I leaned on:**
  - **Food safety:** US FDA, the UK Food Standards Agency (on gov.uk), and a CDC MMWR report.
  - **Japanese:** MAFF, Kikkoman's glossary, Just One Cookbook (Namiko Hirasawa Chen) and RecipeTin Japan (Yumiko).
  - **Southern Italian:** Regione Campania, Dissapore, Sonia Peronaci, Luciano Pignataro's site (Santa Di Salvo) and Portanapoli.
  - **Oaxacan:** the Larousse Cocina *Diccionario enciclopédico de la Gastronomía Mexicana*, and Rick Bayless.
  - **Levantine:** Hadia Zebib, Wafa Shami, Dima Sharif, Anissa Helou, Sami Tamimi (*Falastin*, on The Happy Foodie) and Reem Kassis.
  - **Sichuan:** The Mala Market (Taylor Holliday, Kathy Yuan, and a Q&A with Fuchsia Dunlop), The Woks of Life, SBS (Dunlop) and Yi (Sichuan Kitchen).
  - **Punjabi:** Izzah Cheema (Tea for Turmeric).
  - **Cantonese:** Made With Lau (Daddy Lau) and The Woks of Life.
  - **Ligurian:** Agriligurianet (Regione Liguria).
- **Ingredients that need a decision first:**
  - **Categories:** eggs, rice, bulgur and farro don't fit any existing `category`. I suggest two new ones, `egg` and `grain`.
  - **Slot types:** eggs probably take `protein`, and the grains take a new `grain` Slot type. See the grain-coverage warning in section 2.5.

## 2. Staple Ingredients

### 2.1 Eggs

- **Category:** `egg` (new). **Slot types:** protein, assuming the frittata and fried rice Formulas give eggs that role.
- **Cuisines:** southern-italian, oaxacan, levantine, sichuan, punjabi, japanese, ligurian, cantonese.
  - **southern-italian:**
    - Frittata di maccheroni was born "nei quartieri poveri di Napoli" (in the poor quarters of Naples). It "normalmente si prepara con la pasta avanzata" (is normally made with leftover pasta), using 4 eggs to 300 g pasta, and it's "il piatto tipico delle gite fuori porta e dei pranzi al sacco" (the typical dish for day trips and packed lunches) [DS-FRIT].
    - Uova in purgatorio: "Uova intere cotte nel sugo, tuorlo morbido e pane per la scarpetta" (whole eggs cooked in tomato sauce, soft yolk and bread to mop up). It appears "già nell'Ottocento" (already in the 1800s), in Ippolito Cavalcanti's cookbook [SP-PURG][DS-PURG].
  - **oaxacan:** Larousse's *huevos en salsa* entry: "En Oaxaca se prepara una torta de huevo bañada de una salsa de chile verde o chile de agua, ajo, cebolla y jitomate, y se aromatiza con epazote." (In Oaxaca an egg omelette is bathed in a sauce of green chile or chile de agua, garlic, onion and tomato, scented with epazote.) [L-hes]. Bayless's Oaxacan omelette (salsa de huevo) is the same dish [B-omel]. Larousse's *chintextle* is eaten "en ocasiones con huevo cocido" (sometimes with boiled egg) [L-chint].
  - **levantine:**
    - Hadia Zebib's parsley ejji uses "5 eggs" and "1 bunch of parsley", and she recalls her mother making it on Sundays [HZ-EJJI].
    - Her "Lebanese Fried Eggs" are fried in olive oil with garlic, then drizzled with sumac water [HZ-EGGS].
  - **sichuan (hedged):**
    - Egg dishes I found are pan-Chinese home dishes cooked in Sichuan, not Sichuan specialities. Yi, "originally from Chengdu", calls tomato and egg "such a widely loved homemade dish that probably every Chinese cook regularly!" [YI-TOMEGG].
    - Dunlop's revised *The Food of Sichuan* adds "Fried egg and tomato soup" and "Steamed egg custard with minced pork topping" (recipe titles only) [MALA-QA].
  - **punjabi:** "Punjabis, or at least those in my family, refer to this dish as Anda Bhurji" [C-BHURJI]. Cheema's Punjabi recipe list also includes "Aloo Anday Ki Bhujia (Bhurji)" and "My Go-To Desi Omelet (Masala Omelet)" [C1].
  - **japanese:**
    - MAFF: "玉子焼きとは卵を調味して厚く焼き上げた料理" (tamagoyaki is egg seasoned and cooked thick). It is "お弁当の定番" (a bento staple). Kanto cooks make it sweet, and Kansai cooks make dashi-maki served "大根おろしを添えて" (with grated daikon) [MAFF-TAMA].
    - Kikkoman lists tamagoyaki, tamago kake gohan and oyakodon as egg-led dishes, and says "Raw eggs are regularly consumed in Japan" [KIK-EGG].
  - **ligurian:** Regione Liguria's torta pasqualina fills chard and prescinsêua into thin pastry, then "rompete dentro ciascuna un uovo intero" (crack a whole egg into each [well]) [AGL-PASQ].
  - **cantonese:**
    - Daddy Lau "has made egg fried rice hundreds of thousands of times" (paraphrase of the page intro) [MWL-FRIEDRICE].
    - His family's steamed eggs use "2 cups of water to 4 eggs" [MWL-STEAMEGG].
- **Essay points:**
  1. Eggs set as they heat. That's why they bind other ingredients: in oyakodon they "Bind the chicken and onions together" [JOC-OYAKO], and in frittata di maccheroni they hold the pasta into a cake [DS-FRIT].
  2. Gentle heat keeps them tender. Daddy Lau stir-fries eggs "on medium-low heat… until they're set but still soft and silky" [MWL-FRIEDRICE]. For steamed egg, if "the heat is too strong, the egg will bubble as it steams" [MALA-STEAMEGG].
  3. The pan keeps cooking them after the heat goes off. Peronaci says to turn off the heat when the white is barely done, because residual heat keeps cooking the egg (paraphrase) [SP-PURG]. That's the thing that changes how you cook them.
  4. Many traditions cook eggs in a sauce: tomato in Naples [DS-PURG], tomato and chile de agua in Oaxaca [L-hes], dashi in Japan [MAFF-TAMA].
- **Tip (proposed):** "Take the pan off the heat a moment before the eggs look done; the heat in the pan finishes them." [SP-PURG]
- **Cultural context (proposed):** "Eggs are an everyday staple in many kitchens: Neapolitan cooks fry leftover pasta with them into a frittata, Oaxacan cooks bathe an omelette in chile and tomato sauce with epazote, Punjabi cooks scramble them with onion, chile and cilantro as anda bhurji, and Japanese cooks roll them into tamagoyaki for bento." [DS-FRIT][L-hes][C-BHURJI][MAFF-TAMA]
- **Food safety (state plainly):**
  - **Storage:** "Store promptly in a clean refrigerator at a temperature of 40° F or below" (40°F / 4°C) [FDA-EGG]. FSA: "Ideally, eggs should be stored in the fridge", and avoid temperature changes, which cause "condensation on the surface, which causes increased penetration of Salmonella" [FSA-FACT].
  - **Cooking:** FDA: "Cook eggs until both the yolk and the white are firm", and cook egg dishes to 160°F (71°C) [FDA-EGG]. FSA makes an exception for vulnerable groups, who "can now safely eat raw or lightly cooked hen eggs… if they have a British Lion mark or are produced under the Laid in Britain egg assurance scheme". That doesn't apply to people who are "severely immunocompromised" [FSA-FACT].
  - **Raw or runny eggs:** for dishes served raw or undercooked, FDA advises shell eggs "treated to destroy Salmonella" or pasteurized egg products [FDA-EGG]. JOC's oyakodon says the same: "cook eggs until fully set, or use pasteurized eggs if you prefer a runny texture" [JOC-OYAKO].
  - **Holding:** don't leave cooked eggs or egg dishes out "for more than 2 hours", or 1 hour above 90°F / 32°C [FDA-EGG].
  - **Proposed line:** "Cook eggs until the white and yolk are firm, and egg dishes to 160°F / 71°C. For a runny yolk, use pasteurized eggs (in the UK, British Lion or Laid in Britain eggs). Refrigerate eggs at 40°F / 4°C or below, and don't leave cooked egg dishes out for more than 2 hours."
  - **Conflict to note:** uova in purgatorio [SP-PURG], Hadia's fried eggs [HZ-EGGS] and tamago kake gohan [KIK-EGG] all serve soft or raw yolks. Under the voice guide's "stricter advice" rule, the safety line governs, and any Showcase Recipe with a runny yolk should name pasteurized eggs.
- **Citations:** [DS-FRIT], [SP-PURG], [DS-PURG], [L-hes], [B-omel], [L-chint], [HZ-EJJI], [HZ-EGGS], [YI-TOMEGG], [MALA-QA], [MALA-STEAMEGG], [C-BHURJI], [C1], [MAFF-TAMA], [KIK-EGG], [JOC-OYAKO], [AGL-PASQ], [MWL-FRIEDRICE], [MWL-STEAMEGG], [FDA-EGG], [FSA-FACT].

### 2.2 Rice

- **Category:** `grain` (new). **Slot types:** grain (new).
- **Cuisines:** japanese, cantonese, sichuan, oaxacan, levantine, punjabi, southern-italian (hedged).
  - **japanese:** Ichiju sansai "refers to rice as the staple, some kind of soup, a main dish of fish or other protein, and two mainly vegetable-based side dishes" [NIP-ICHIJU]. Kikkoman says it "reflects a rice-centered food culture in Japan" [KIK-ICHIJU].
  - **cantonese:**
    - Egg fried rice [MWL-FRIEDRICE].
    - The Woks of Life's Cantonese-style steamed fish is served "immediately with rice" (paraphrase) [WOL-FISH].
  - **sichuan:**
    - Shuizhu niurou is to be enjoyed "with plenty of white rice" [WOL-BOILEDBEEF].
    - "Thin rice porridge" is one of the new recipe titles in Dunlop's *The Food of Sichuan* [MALA-QA].
  - **oaxacan:**
    - Larousse: in central Mexico rice "casi siempre se hace rojo y se sirve como sopa seca" (is almost always made red and served as a dry soup). It is often served with a fried egg, plantain or beans, and sometimes even "salsa de mole". In Oaxaca it is "aromatizado con hojas secas de chepil" (scented with dried chepil leaves) [L-arroz].
    - Arroz a la mexicana is fried, then "se sazona y colorea con jitomate molido" (seasoned and coloured with ground tomato) [L-amex]. That entry isn't Oaxaca-specific.
  - **levantine:**
    - Shami serves kafta with tahini "with a side of vermicelli rice" [S2].
    - Tamimi says mejadra's grain is "rice, most typically", though bulgur or freekeh work [TT-MEJ].
    - **Hedge:** Kassis notes that "rice was relegated only to the wealthier echelons of society until the 20th century" [KAS-INQ].
  - **punjabi (hedged):** matar pulao is "an everyday Pakistani and North Indian rice dish", made with "aged, long-grain basmati rice" [C-PULAO]. Cheema says Punjabi food is "known for its heavy use of dairy, wheat, legumes, and of course, all things Tandoori" [C1], and her karahi goes with naan or roti, not rice [C5]. So rice is common, but bread usually leads.
  - **southern-italian (hedged):**
    - Santa Di Salvo lists "Arancine e arancini in Sicilia, riso patate e cozze in Puglia" and "sartù di riso… in Campania" [LP-RISO].
    - She also says many Neapolitans still call rice "sciacquapanza" (belly-rinser) "ed è un insulto" (and it's an insult), and treat it as "un cibo per malati e convalescenti" (food for the sick and convalescent) [LP-RISO]. Tag it, but the cultural context should say rice is festive or regional there, not everyday.
  - **ligurian:** not researched.
- **Essay points:**
  1. Raw rice carries spores that survive cooking [CDC-RICE][FSA-FACT]. Cooked rice is safe while it's hot or cold, and risky while it sits warm, which is why cooling it quickly matters (see Safety).
  2. Washing changes the texture. Cheema washes basmati "until the water runs mostly clear" [C-PULAO].
  3. For fried rice, Daddy Lau says "most Chinese chefs use fresh rice and _not_ leftover or day-old rice". He cooks it with about 5–10% less water and fluffs it. Day-old rice is firmer and less clumpy but less fragrant (paraphrase) [MWL-FRIEDRICE]. This contradicts the common home advice to use day-old rice, so name the disagreement.
  4. Japanese meals pair plain rice with well-seasoned side dishes. Kikkoman says the practice "combines well-seasoned side dishes with plain rice in the mouth" [KIK-ICHIJU].
- **Tip (proposed):** "Wash the rice until the water runs mostly clear before you cook it." [C-PULAO] Any added claim that this keeps the grains separate is my inference.
- **Cultural context (proposed):** "Rice is the staple of a Japanese meal, set beside soup and a few side dishes, and it comes with most Cantonese and Sichuan home dishes. Oaxacan cooks often serve it red or scented with chepil, and Punjabi cooks make it into pulao, though bread usually leads there. In Naples many cooks still treat it with suspicion, while Sicily is known for arancine." [NIP-ICHIJU][MWL-FRIEDRICE][WOL-BOILEDBEEF][L-arroz][C-PULAO][LP-RISO]
- **Food safety (state plainly, flagged for the fried rice Formula):**
  - **Why:** "B. cereus is frequently present in uncooked rice, and heat-resistant spores may survive cooking. If cooked rice is subsequently held at room temperature, vegetative forms multiply, and heat-stable toxin is produced that can survive brief heating, such as stir frying." "Fried rice is a leading cause of B. cereus emetic-type food poisoning in the United States" [CDC-RICE].
  - **Cooling:** FSA: "If you have leftover rice you should chill it as quickly as possible, ideally within one hour", and "don't leave rice in the rice cooker, steamer or pan to cool down" [FSA-FACT]. CDC recommends that "the practice of cooling rice or any food at room temperature be discontinued", with food held below 41°F (5°C) or above 140°F (60°C) [CDC-RICE].
  - **Speeding it up:** Western Australia's health department advises dividing rice into "smaller, clean shallow containers less than 10 cm deep", "not stacked" [WA-RICE]. This is an official body, but it's not on the voice guide's agency list, so use it as supporting only.
  - **Storage:** "Keep rice in the fridge for no more than one day until reheating" [FSA-FACT]. Daddy Lau gives 3–5 days for fried rice [MWL-FRIEDRICE]. FSA's one day is stricter, so lead with it.
  - **Reheating:** "you should never reheat rice more than once", and always check "the dish is steaming hot all the way through" [FSA-FACT]. FSA's general guidance also says "only ever reheat once" [FSA1].
  - **Proposed line:** "Cool leftover rice fast, ideally within an hour, spread out in a shallow container, then refrigerate it at 40°F / 4°C or below. Use it within a day, and reheat it only once, until steaming hot all the way through."
- **Citations:** [NIP-ICHIJU], [KIK-ICHIJU], [MWL-FRIEDRICE], [WOL-FISH], [WOL-BOILEDBEEF], [MALA-QA], [L-arroz], [L-amex], [S2], [TT-MEJ], [KAS-INQ], [C-PULAO], [C1], [C5], [LP-RISO], [CDC-RICE], [FSA-FACT], [FSA1], [WA-RICE].

### 2.3 Bulgur

- **Category:** `grain` (new). **Slot types:** grain (new).
- **Cuisines:** levantine only.
  - Tabbouleh uses "30 g fine burghul" with "400 g flat-leaf parsley" and "70 g mint" [H2].
  - Kibbeh, "often considered Lebanon's national dish", has a shell of 450 g "Fine Bulgur Wheat" and "Lean Goat or Beef" [HZ2].
  - Tamimi's shulbato uses "350g coarse bulgur" with eggplant and tomato [TT-SHUL]. His mejadra can use "the bulgur or freekeh" in place of rice [TT-MEJ].
  - **Punjabi:** I found dalia (broken wheat) only on non-Punjabi recipe aggregators, so I didn't tag it.
- **Essay points:**
  1. Bulgur is wheat that's already been cooked and cracked, so fine bulgur barely needs cooking. Helou rinses it "in several changes of cold water, drain well" and adds it raw to tabbouleh [H2]. Hadia soaks fine bulgur for kibbeh: "Let it soak for 5 minutes" [HZ2].
     - "Already cooked" isn't stated in my sources. Cut it to "fine bulgur barely needs cooking" if you want only what's cited.
  2. Grind matters. Fine bulgur goes into salads and kibbeh [H2][HZ2]. Coarse bulgur is simmered as a pilaf, then rests with "the lid on… for 10 minutes" [TT-SHUL]. That's the thing that changes how you cook it.
  3. In tabbouleh it's a minor player. "The amount of burghul used varies according to regional or family tradition," and Helou uses very little [H2].
- **Tip (proposed):** "Check the grind: soak fine bulgur for a few minutes, and simmer coarse bulgur like rice." [HZ2][TT-SHUL]
- **Cultural context (proposed):** "Bulgur is common across the Levant: fine bulgur goes into tabbouleh and into kibbeh, and coarse bulgur is cooked into pilafs such as Palestinian shulbato or used in place of rice in mejadra." [H2][HZ2][TT-SHUL][TT-MEJ] Note that [TT-SHUL]'s page doesn't itself call shulbato Palestinian. The book is *Falastin*, and the page title says "Palestinian".
- **Safety:** none specific found.
- **Citations:** [H2], [HZ2], [TT-SHUL], [TT-MEJ].

### 2.4 Farro: drop it for Southern Italian

- **What I found:**
  - Farro is grown in inland Campania. Regione Campania lists "Farro dicocco del Sannio, pane e pasta di farro" as a traditional product, grown in "Ufita, Fortore, e aree cerealicole della Campania interna (AV e BN)".
  - The page describes farro made into pasta ("La pasta si ottiene miscelando semola di farro con acqua") and wood-fired bread. It gives Roman-era history ("la base dell'alimentazione del legionario"), but no whole-grain dishes eaten today [RC-FARRO].
  - I found no source from the tradition for whole farro as an everyday Southern Italian grain. Every whole-farro soup I found was from Garfagnana in Tuscany, and only on blogs, so I cite none of them.
- **Recommendation:**
  - Don't tag farro `southern-italian`.
  - **If the grain bowl needs a Southern Italian grain,** the best-attested whole grain is boiled wheat berries (grano cotto). It fills Neapolitan pastiera, "ricotta, zucchero, strutto, grano duro cotto, uova…" [RC-PAST]. Sicilian cuccìa is "un dolce di grano bollito" (a sweet of boiled wheat), eaten in Palermo on 13 December, when "è assolutamente vietato mangiare pane, pasta" (eating bread or pasta is strictly forbidden) [ORO-CUC].
  - Both of those are sweet or festive, and I couldn't source a savoury everyday use from a strong source. So I'd drop the third grain rather than add wheat berries, unless the author wants a festive note.
  - **If farro stays as an untagged Ingredient,** nothing above supports a Cuisine tag.

### 2.5 Warning: grain coverage

If the grain bowl or fried rice adds a `grain` Slot type, the rule needs three grain Ingredients in every launch Cuisine. After this batch, rice is the only grain in five of them:

| Cuisine | Grains after this batch |
|---|---|
| Levantine | rice, bulgur |
| Japanese, Sichuan, Oaxacan, Punjabi, Southern Italian | rice |

No Cuisine reaches three, so every launch Cuisine would need a `grain` exception or more grains. Possible candidates I didn't research: freekeh for Levantine [TT-MEJ names it], and glutinous rice for Sichuan [MALA-QA names a glutinous rice dish]. A sourced exception is plausible for Japanese, where rice is "the staple" [NIP-ICHIJU]. One option is for the Formula's Slot to accept rice by name rather than a Slot type, but that's a model decision.

## 3. Garnish coverage per launch Cuisine

Today only scallion, gremolata (no Cuisines) and za'atar carry `garnish`. Re-tags with sources:

| Cuisine | Garnish Ingredients | Evidence |
|---|---|---|
| southern-italian | basil, parsley, **toasted breadcrumbs (new)** | Basil: "Servire decorando ogni piatto con un ciuffetto di basilico" [PN3]; Norma is finished with "alcune foglie di basilico fresco spezzate con le mani" [DS1]. Parsley finishes uova in purgatorio ("prezzemolo", for the finish, paraphrase) [DS-PURG]. Breadcrumbs: section 5. |
| oaxacan | cilantro, epazote, scallion | Cilantro: "se utiliza como adorno en sopes, tlacoyos, chilaquiles…" [L-cil]; tlayuda ends with "Cilantro leaves, for garnish" [B-tla]. Epazote: the Oaxacan omelette is finished with extra epazote or cilantro (paraphrase) [B-omel]. Scallion: Valles Centrales cecina is served with "cebollitas asadas, rebanadas de aguacate, rábanos, limón y tortillas" [L-cec]. |
| levantine | za'atar (already tagged), sumac, parsley | Sumac: mutabbal, "sprinkle with sumac and cumin seeds, then top with loose pomegranate seeds" [D1]; Hadia's eggs are drizzled with sumac water [HZ-EGGS]. Parsley: kafta, "Garnish with toasted pine nuts and a sprinkle of fresh parsley" [S2]. |
| sichuan | scallion (already tagged), sichuan-pepper, cilantro | Scallion: kou shui ji, "2 scallions, green part only, thinly sliced" [MALA-KOUSHUIJI]. Sichuan pepper: mapo tofu, "serve scattered with ground Sichuan pepper" [SBS-MAPO]. Cilantro: boiled beef, "Top it with the minced garlic, chili flakes, and chopped cilantro" [WOL-BOILEDBEEF]. |
| punjabi | cilantro, ginger, chile, onion | Karahi: "Garnish with green chili peppers, julienned ginger, cilantro" [C5]. Tandoori chicken: "Garnish with cilantro and serve with lime/lemon, thinly sliced red onion" [C4]. |
| japanese | scallion (already tagged), shiso, shichimi, ginger | Miso eggplant: "sliced green onions, and julienned shiso leaves" [JOC-MISOEGG]. Tonjiru garnish: green onion and "shichimi togarashi" [JOC-TONJIRU]. Yaki nasu "is traditionally eaten with ginger, bonito flakes and some soy sauce" [RTJ-YAKINASU]. |

- **New Ingredients needed:** one, toasted breadcrumbs, for Southern Italian.
  - Sesame seeds would add a fourth garnish in Japanese and Sichuan, and appear in za'atar, but no Cuisine needs them. They're optional (section 5).
- **Exceptions:** none needed.
- **Re-tags proposed (add `garnish`):** basil, parsley, cilantro, epazote, sumac, sichuan-pepper, ginger, chile, onion, shiso, shichimi.
  - Add the Cuisine tags each Ingredient lacks for its row: `scallion` needs nothing new. Ginger already has punjabi and japanese.
- **Gremolata:** it's Milanese (see the 0018 notes) and carries no Cuisine, so it doesn't count for Southern Italian.
- **Flag:** cilantro as a Sichuan garnish sits next to the existing soft-herb exception, which already says "cilantro sometimes finishes a dish". That's consistent.

## 4. Sauce coverage per launch Cuisine

No Ingredient carries `sauce` today.

| Cuisine | Sauce Ingredients | Evidence |
|---|---|---|
| southern-italian | none existing. Candidates: salmoriglio (section 5, optional), others unresearched | **Gap: 0 of 3.** |
| oaxacan | **salsa verde (new)**, **pasilla salsa (new)**. Chintextle (optional) would make 3 | **Gap: 2 of 3** without chintextle. |
| levantine | yogurt, **tahini (new)**, pomegranate molasses | Yogurt is served with mejadra, "with some yoghurt" [TT-MEJ], and shulbato, "a spoonful of yoghurt" [TT-SHUL]. Pomegranate molasses is drizzled over mutabbal, optional (paraphrase) [D1]. |
| sichuan | **soy sauce (new)**, black vinegar, doubanjiang | Kou shui ji's sauce: "2 tablespoons Chinese black vinegar", "2 tablespoons Chinese soy sauce" [MALA-KOUSHUIJI]. Doubanjiang "can be eaten as a condiment, or used as a seasoning or sauce base in cooking" [WOL-DBJ]. |
| punjabi | yogurt, tamarind, **green chutney (new)** | Tandoori chicken is served with "Mint Raita or Imli ki (Tamarind) Chutney" [C4]. Imli chutney is a "compulsory dahi bhalla topping" [C10]. |
| japanese | miso, ponzu, **soy sauce (new)** | Ponzu is "most commonly used as a dressing or dipping sauce" [KIK-PONZU]. Miso is the glaze for nasu dengaku-style eggplant [JOC-MISOEGG]. |

- **Flags:**
  - **Doubanjiang:** it's usually fried in oil first ("that deep red color… comes from frying doubanjiang in oil") [WOL-DBJ]. Tag it `sauce` only if the Formula's sauce step cooks it.
  - **Black vinegar:** it's a sauce component, not a sauce on its own. I'd accept it for Sichuan because kou shui ji's dressing is built from it and soy [MALA-KOUSHUIJI]. Chili oil would be the stronger Sichuan sauce, but it's beyond the cap.
- **Exceptions:** I found no source saying any launch Cuisine seldom uses a sauce, so I propose none.
  - Oaxaca is the opposite case: Larousse lists salsa verde as a "salsa de mesa" (table sauce) [L-sv], and Bayless says a pasilla salsa is the most common choice for tlayudas (paraphrase) [B-tla].
  - Southern Italian cooking sauces pasta heavily. I couldn't source "seldom spooned over" honestly.
- **Update:** the author chose option (a). Section 9 gives full write-ups for chintextle, salmoriglio, colatura di alici and tomato sauce, which bring Oaxacan and Southern Italian to 3 sauces each.
- **Decision for the author (resolved, see section 9):** within about 6 new Ingredients, Southern Italian and Oaxacan can't reach 3 sauces. Options:
  - (a) Add chintextle for Oaxaca, plus three Southern Italian sauces: salmoriglio and two more, unresearched; candidates include colatura di alici, already a Regione Campania product in the 0017/0018 notes, and a tomato sugo. That's 10 new Ingredients in all.
  - (b) Keep the `sauce` Slot type out of Formulas until a later batch.
  - (c) Limit the sauce Slot to Formulas with a smaller launch Cuisine set, if the model allows it.

## 5. New Ingredients

Six core Ingredients (soy sauce, tahini, green chutney, salsa verde, pasilla salsa, toasted breadcrumbs), then three optional ones (sesame seeds, chintextle, salmoriglio).

### Soy sauce

- **Category:** condiment. **Slot types:** sauce.
- **Cuisines:** japanese, sichuan, cantonese.
  - **japanese:** "Of the soy sauce products manufactured across Japan, koikuchi soy sauce accounts for at least 80%" [MAFF-SOY]. Kikkoman: "Not only for dipping raw fish (sashimi)… it is also an all purpose seasoning" [KIK-SOY].
  - **sichuan:** kou shui ji's sauce [MALA-KOUSHUIJI].
  - **cantonese:** steamed fish sauce of water, salt, sugar and light soy sauce (paraphrase) [WOL-FISH].
- **Essay points:**
  1. It's fermented. "Koji and salt water are added to the steamed grains, and the mixture is fermented and aged", with the umami "produced by Aspergillus oryzae" [MAFF-SOY].
  2. Styles differ:
     - Japan: usukuchi is "light-colored soy sauce developed mainly in Kansai region", used where cooks want to keep ingredients' colour (paraphrase), and "Tamari soy sauce is used only in Tokai region" [MAFF-SOY].
     - Chinese cooking: light soy is the default. Dark soy is thicker and sweeter, used "for color as well as flavor", and has about 15% more sodium (paraphrase) [WOL-SOY].
  3. It's both a cooking seasoning and a table sauce [KIK-SOY]. That's the thing that changes how you use it: a splash cooks in, a drizzle finishes.
- **Tip (proposed):** "Check which soy a recipe means: Chinese recipes usually mean light soy, and dark soy is mostly for colour." [WOL-SOY]
- **Cultural context (proposed):** "Fermented seasonings such as soy sauce and miso form the basis of Japanese cooking. Cantonese cooks spoon seasoned soy over steamed fish, and Sichuan cooks mix it with black vinegar and chilli oil to dress cold chicken." [MAFF-SOY][WOL-FISH][MALA-KOUSHUIJI]
- **Citations:** [MAFF-SOY], [KIK-SOY], [WOL-SOY], [WOL-FISH], [MALA-KOUSHUIJI].

### Tahini

- **Category:** condiment. **Slot types:** sauce.
- **Cuisines:** levantine.
  - Lebanese: tarator for fried cauliflower [HZ].
  - Palestinian: kafta with tahini sauce [S2].
  - Mutabbal [D1].
- **Essay points:**
  1. Tahini is sesame seed paste ("tahini sesame seed paste") [HZ]. Kassis calls it "a strong, earthy taste with bitter undertones", but only via the Washington Post, which I couldn't open (403), so that isn't citable yet.
  2. As a sauce it's loosened with water and lemon. Hadia whisks "½ cup tahini" with water, "3 tablespoons freshly squeezed lemon juice" and "1 garlic clove crushed" to "a consistency similar to thick cream" [HZ]. Shami uses "½ cup of tahini", "1 cup of water", "2 cloves garlic" and "½ cup lemon juice" [S2].
  3. It thickens as it cools and when heated. Shami loosens it with warm water when reheating (paraphrase) [S2]. Stir the jar well before you use it [HZ]. That's the thing that changes how you cook it.
- **Tip (proposed):** "Whisk in water a spoonful at a time until the sauce flows like thick cream." [HZ]
- **Cultural context (proposed):** "Tahini sauce is common across the Levant: Lebanese cooks serve it as tarator with fried cauliflower, Palestinian cooks bake kafta and potatoes under it, and it's blended with charred eggplant for mutabbal." [HZ][S2][D1]
- **Citations:** [HZ], [S2], [D1].

### Green chutney (hari chutney)

- **Category:** blend. **typicallyIncludes:** cilantro, mint, chile, garlic, lemon. **Slot types:** sauce.
- **Cuisines:** punjabi.
  - Cheema's "Mint and Cilantro Green Chutney" goes on dahi bhalla, which the page names "Punjab – Dahi Bhalla" [C10]. It's also served with aloo tikki [C9].
  - **Hedge:** both pages label the recipe "Indian, Pakistani", not Punjabi alone.
- **Essay points:**
  1. It's raw herbs blended with chile and acid: cilantro, mint, a small green chili, garlic, lemon or lime juice, salt, sugar and water (paraphrase) [C10].
  2. Cheema calls it "like my mint raita but without the yogurt" [C9][C10]. So it's the sharper, lighter partner to raita.
  3. It's usually served with a sweet-sour tamarind chutney. Cheema suggests serving aloo tikki with green chutney, tamarind chutney or mint raita (paraphrase) [C9].
- **Tip (proposed):** "Make it close to serving time; raw herbs are brightest fresh." This is unsourced (general). A sourced alternative: "Serve it with tamarind chutney, so sharp herbs meet sweet-sour." [C9]
- **Cultural context (proposed):** "Green chutney and tamarind chutney are a common pair on Punjabi chaat such as dahi bhalla and aloo tikki." [C9][C10]
- **Citations:** [C9], [C10].

### Salsa verde (Oaxacan green salsa)

- **Category:** blend. **typicallyIncludes:** tomatillo, chile, garlic, cilantro, onion. **Slot types:** sauce.
- **Cuisines:** oaxacan.
  - Larousse: in Oaxaca it "se prepara con ajo, chile verde y miltomate, molidos en una chilmolera" (is made with garlic, green chile and miltomate, ground in a chilmolera), then mixed with chopped cilantro and onion (paraphrase) [L-sv].
- **Essay points:**
  1. It's a family of sauces "hechas por lo general con tomate, ajo, cebolla, chile verde y cilantro" (generally made with tomatillo, garlic, onion, green chile and cilantro), made raw, boiled or roasted. Larousse's *tomate* here means the green tomatillo [L-sv].
  2. The method sets the flavour: raw is sharp, boiled is mellow and sometimes gets epazote, and roasted on the comal is smoky (paraphrase) [L-sv]. That's the thing that changes how you make it.
  3. Cooked salsa verde "Se utiliza como salsa de mesa y sirve como base para las enchiladas verdes, chilaquiles verdes y entomatados" (is used as a table sauce and as the base for green enchiladas, green chilaquiles and entomatados) [L-sv]. Bayless's roasted version uses tomatillos, garlic, serrano or jalapeño, cilantro and white onion (paraphrase) [B-tomsal].
- **Tip (proposed):** "Roast the tomatillos and chile on a dry pan before you grind them for a smokier salsa." [L-sv][B-tomsal]
- **Cultural context (proposed):** "Green salsas are a table staple across Mexico. In Oaxaca, cooks often grind garlic, green chile and the small miltomate together, then stir in chopped cilantro and onion." [L-sv]
- **Citations:** [L-sv], [B-tomsal], [L-ent].

### Pasilla salsa (salsa de chile pasilla oaxaqueño)

- **Category:** blend. **typicallyIncludes:** dried chile (pasilla oaxaqueño), garlic. **Slot types:** sauce.
- **Cuisines:** oaxacan.
  - Larousse: "Es típica de Oaxaca" [L-pas-s].
  - Bayless calls a pasilla salsa the most common choice for tlayudas (paraphrase) [B-tla].
- **Essay points:**
  1. The basic version is "chile molido con agua, ajo asado y sal" (chile ground with water, roasted garlic and salt). The chile is roasted, then ground [L-pas-s].
  2. Pasilla oaxaqueño is "Chile seco ahumado" (a dried, smoked chile) [L-pas], so the salsa tastes smoky before it's ever near a grill.
  3. Variants add "tomates cocidos o asados" (boiled or roasted tomatoes). In the Valles Centrales cooks combine it with "el chile de onza" [L-pas-s].
- **Tip (proposed):** "Toast the chile until fragrant, not black, before grinding." This builds on [L-pas-s] ("se asa") and Dunlop's gong bao, where dried chillies are stir-fried "until the chillies are darkening but not burnt" [SPLENDID-GONGBAO]. The "not black" part is a cross-tradition inference, so drop it if you want only what's cited.
- **Cultural context (proposed):** "Smoky pasilla salsa is common in Oaxaca, served with antojitos, beans, grilled meats and soups, and spooned over tlayudas." [L-pas-s][B-tla]
- **Citations:** [L-pas-s], [L-pas], [B-tla].

### Toasted breadcrumbs (mollica tostata)

- **Category:** `grain` (new; or a new `bread` category). **Slot types:** garnish.
- **Cuisines:** southern-italian.
  - Palermo: pasta con le sarde [SP-SARDE], and pasta chi vruoccoli arriminati [SP-VRUOC][LP-VRUOC].
  - **Hedge:** my sources are Sicilian. Search results claimed the same in Calabria, Basilicata and Puglia, but only blogs said so. Keep the cultural context Sicilian, or hedge "especially in Sicily".
- **Essay points:**
  1. It's stale bread crumbled and toasted in a pan until crisp. Peronaci says it should be "dorata e croccante in modo uniforme, non scura" (evenly golden and crisp, not dark), at medium-low heat for 4–5 minutes (paraphrase) [SP-SARDE].
  2. It stands in for grated cheese: "Completa con la mollica di pane croccante a mo' di formaggio grattugiato!" (finish with crisp breadcrumbs like grated cheese). It was once called "il formaggio dei poveri" (the poor man's cheese) [SP-VRUOC].
  3. It goes on at the table, not in the pan, where it would go soggy (paraphrase) [SP-SARDE]. That's the thing that changes how you use it.
  4. Its dry, toasty flavour balances sweet dishes. Palermitans "sono soliti spolverare il piatto con della mollica tostata" (usually dust the dish with toasted breadcrumbs) on cauliflower pasta with raisins (paraphrase of the balancing point) [LP-VRUOC].
- **Tip (proposed):** "Scatter the crumbs over each plate at the table, so they stay crisp." [SP-SARDE]
- **Cultural context (proposed):** "Toasted breadcrumbs are common in Sicilian cooking, scattered over pasta con le sarde and cauliflower pasta where other cooks might use grated cheese." [SP-SARDE][SP-VRUOC][LP-VRUOC]
- **Citations:** [SP-SARDE], [SP-VRUOC], [LP-VRUOC].

### Optional: sesame seeds

- **Category:** spice (or a new `seed`). **Slot types:** garnish.
- **Cuisines:** japanese, sichuan.
  - Japanese: miso eggplant with "2 tsp toasted white sesame seeds" [JOC-MISOEGG].
  - Sichuan: kou shui ji with "½ teaspoon roasted sesame seeds" [MALA-KOUSHUIJI].
  - Levantine: only inside za'atar (the existing za'atar file), so no tag.
- **Essay points:**
  1. White seeds are sweet and aromatic. Black seeds are more bitter and are mixed with salt as gomashio (paraphrase) [KIK-SES].
  2. Roasted seeds are the ones used in cooking, and grinding them in a suribachi helps "enhance their aroma" [KIK-SES].
- **Tip (proposed):** "Toast them in a dry pan until fragrant, then grind a few to wake the aroma." [KIK-SES]
- **Cultural context (proposed):** "Toasted sesame seeds often finish Japanese glazed and dressed dishes, and Sichuan cold dishes such as mouthwatering chicken." [JOC-MISOEGG][MALA-KOUSHUIJI]
- **Pairings:** see section 6. **Citations:** [KIK-SES], [JOC-MISOEGG], [MALA-KOUSHUIJI].

### Optional: chintextle (closes Oaxacan sauce; full write-up in section 9)

- **Category:** blend. **typicallyIncludes:** dried chile, garlic. **Slot types:** sauce.
- **Cuisines:** oaxacan.
- **What it is:** "Pasta de chile molido, muy utilizada en Oaxaca para comer untada en tortillas" (a ground chile paste, much used in Oaxaca spread on tortillas) [L-chint].
  - Variants can include "camarón seco, hojas de aguacate asadas, ajo, chile pasilla, vinagre y aceite" (dried shrimp, toasted avocado leaves, garlic, pasilla chile, vinegar and oil) [L-chint].
  - In the sierra "la untan en tlayudas" (they spread it on tlayudas). It's eaten at midday, "en ocasiones con huevo cocido, tasajo o queso fresco" (sometimes with boiled egg, tasajo or fresh cheese) [L-chint].
- **Pairings:**
  - chintextle + eggs: tradition.
  - chintextle + beef: tradition. Tasajo is beef; for that link see the 0018 Oaxacan notes. Re-fetch before citing.
- **Citations:** [L-chint].

### Optional: salmoriglio (one of three Southern Italian sauces; full write-up in section 9)

- **Category:** blend. **typicallyIncludes:** lemon, garlic, parsley. **Slot types:** sauce.
- **Cuisines:** southern-italian.
- **What it is:**
  - Gambero Rosso calls it "emulsione tipica dello Stretto preparata con olio, limone, origano e sale" (an emulsion typical of the Strait [of Messina], made with oil, lemon, oregano and salt), spooned over grilled swordfish in Scilla [GR-SCILLA].
  - Dissapore's grilled-fish version is parsley and garlic chopped and loosened with oil, served at the table so "ciascuno se ne servirà a piacere" (each takes as much as they like) [DS-GRIG].
  - **Flag:** the two versions differ (oregano and lemon, or parsley and garlic). Oregano isn't an Ingredient.
- **Pairings:** salmoriglio + cod: tradition, for grilled fish. Note that [GR-SCILLA] is swordfish and [DS-GRIG] is mixed fish, so it's weak for cod specifically.
- **Citations:** [GR-SCILLA], [DS-GRIG].

## 6. Pairings

The format is: ids · category · claim · Cuisines · citations, each with a short quote. None of these is in `pairings.yaml` today (checked against the file's first lines and its structure; confirm with a full grep before authoring).

### Eggs

1. **eggs + tomato** · tradition · Eggs are often cooked in tomato sauce, as Neapolitan uova in purgatorio, Oaxacan huevos en salsa and Chinese stir-fried tomato and egg. · southern-italian, oaxacan, sichuan
   - [SP-PURG] "Uova intere cotte nel sugo, tuorlo morbido".
   - [DS-PURG] eggs immersed in tomato sauce, "rappresentate dal rosso della salsa di pomodoro".
   - [L-hes] "una salsa de chile verde o chile de agua, ajo, cebolla y jitomate".
   - [YI-TOMEGG] tomato egg, "such a widely loved homemade dish".
2. **eggs + epazote** · aromatic bridge · Epazote scents the chile-tomato sauce poured over Oaxacan omelettes. · oaxacan
   - [L-hes] "se aromatiza con epazote".
   - [B-omel] sauce and garnish of "epazote or cilantro" (paraphrase).
3. **eggs + parsley** · tradition · Lebanese cooks fold a whole bunch of parsley into eggs for ejji, an herb omelette. · levantine
   - [HZ-EJJI] "5 eggs", "1 bunch of parsley equivalent to about 1 cup after chopping".
4. **eggs + sumac** · contrast · A drizzle of sumac water gives sour lift to eggs fried in olive oil and garlic. · levantine
   - [HZ-EGGS] eggs fried in olive oil with garlic, then "drizzle the sumac water over the top" (paraphrase); "loaded with flavor, thanks to the sumac, olive oil and garlic".
5. **eggs + chicken-thigh** · tradition · In oyakodon, egg is poured over chicken thigh simmered in dashi and soy, and binds it as it sets. · japanese
   - [JOC-OYAKO] "boneless, skinless thighs"; eggs "Bind the chicken and onions together".
6. **eggs + onion** · tradition · Onion is softened before the eggs in Punjabi anda bhurji and grated into Lebanese ejji. · punjabi, levantine
   - [C-BHURJI] eggs, onion, tomato (optional), green chili, cilantro, cumin, garlic (paraphrase of ingredients).
   - [HZ-EJJI] "1 onion", squeezed "to remove as much moisture as possible".

### Rice

1. **rice + eggs** · texture · Soft-scrambled egg is tossed through hot rice for Cantonese egg fried rice, and a fried egg often tops Mexican rice. · cantonese, oaxacan
   - [MWL-FRIEDRICE] eggs "set but still soft and silky".
   - [L-amex] served with "plátano Tabasco o huevo estrellado" (paraphrase).
   - [L-arroz] rice served with a fried egg, plantain or beans (paraphrase).
2. **rice + yogurt** · contrast · Plain yogurt or raita cools spiced pulao, and yogurt is spooned over Palestinian mejadra. · punjabi, levantine
   - [C-PULAO] "Serve with vegetable raita, mint raita, or plain yogurt."
   - [TT-MEJ] "Serve this warm or at room temperature with some yoghurt."
3. **rice + tomato** · tradition · Mexican cooks fry rice, then season and colour it with ground tomato. · oaxacan
   - [L-amex] "se sazona y colorea con jitomate molido". The entry isn't Oaxaca-specific, so hedge it as Mexican or drop the tag. Larousse's general entry says red rice is the norm in central Mexico [L-arroz].
4. **rice + cumin** · aromatic bridge · Whole cumin seeds bloom in the oil before the rice goes in for pulao. · punjabi
   - [C-PULAO] "1 tsp cumin seeds" among "coriander seeds, cumin seeds, black cardamom, bay leaf, and a cinnamon stick".
5. **rice + scallion** · aromatic bridge · Scallion goes into Cantonese egg fried rice and finishes rice dishes with a fresh, grassy note. · cantonese
   - [MWL-FRIEDRICE] ingredients include "green onion" (paraphrase of the list).

### Bulgur

1. **bulgur + parsley** · tradition · In Lebanese tabbouleh a little fine bulgur is tossed with a great deal of parsley. · levantine
   - [H2] "30 g fine burghul", "400 g flat-leaf parsley".
2. **bulgur + tomato** · tradition · Diced tomato moistens tabbouleh's raw bulgur, and tomato cooks into Palestinian shulbato. · levantine
   - [H2] "600 g firm ripe tomatoes".
   - [TT-SHUL] "3 medium-sized ripe tomatoes".
3. **bulgur + beef** · texture · Fine bulgur kneaded with lean beef or goat makes the shell of Lebanese kibbeh. · levantine
   - [HZ2] "Fine Bulgur Wheat"; "Lean Goat or Beef".
4. **bulgur + eggplant** · texture · Cubes of eggplant cook down into coarse bulgur in shulbato. · levantine
   - [TT-SHUL] "350g coarse bulgur", "2 medium aubergines, cut into roughly 2cm dice".
5. **bulgur + yogurt** · contrast · Cool yogurt is spooned over warm bulgur pilafs. · levantine
   - [TT-SHUL] "serve with a spoonful of yoghurt".
   - [TT-MEJ] "with some yoghurt".

### Soy sauce

1. **soy sauce + ginger** · tradition · Ginger and soy make the sauce for shogayaki, a common Japanese home dish of pan-fried pork. · japanese
   - [JOC-SHOGA] "Shogayaki (生姜焼き), is a homey Japanese dish"; sauce of soy sauce, mirin, sake, sugar and ginger juice (paraphrase).
2. **soy sauce + scallion** · tradition · Cantonese cooks pour sizzling oil and seasoned soy over steamed fish topped with scallion and ginger. · cantonese
   - [WOL-FISH] scallion and ginger spread on the fish, then the hot soy sauce mixture spooned over (paraphrase).
3. **soy sauce + black-vinegar** · contrast · Soy's salt and black vinegar's malty sourness together dress Sichuan cold chicken. · sichuan
   - [MALA-KOUSHUIJI] "2 tablespoons Chinese black vinegar", "2 tablespoons Chinese soy sauce".
4. **soy sauce + eggplant** · tradition · Grilled, peeled eggplant is usually eaten with grated ginger, bonito flakes and soy sauce. · japanese
   - [RTJ-YAKINASU] "traditionally eaten with ginger, bonito flakes and some soy sauce".
5. **soy sauce + eggs** · tradition · Dashi-rolled omelette is often served with grated daikon dressed with soy sauce. · japanese
   - [JOC-TAMA] "often served with grated daikon"; drizzle soy sauce over the daikon (paraphrase).
   - [MAFF-TAMA] "大根おろしを添えて".

### Tahini

1. **tahini + lemon** · contrast · Lemon thins tahini and cuts its richness in tarator and Palestinian tahini sauce. · levantine
   - [HZ] "3 tablespoons freshly squeezed lemon juice".
   - [S2] "Don't skip the fresh lemon juice, it adds the perfect tanginess."
2. **tahini + garlic** · tradition · A little raw garlic is usually whisked into tahini sauce. · levantine
   - [HZ] "1 garlic clove crushed".
   - [S2] "2 cloves garlic".
3. **tahini + eggplant** · tradition · Charred eggplant is blended with tahini, garlic and lemon for mutabbal. · levantine
   - [D1] "2 large eggplants", "1/2 cup tahina".
4. **tahini + cauliflower** · contrast · Crisp fried cauliflower is served with smooth tahini sauce in Lebanon. · levantine
   - [HZ] the sauce is served with the fried cauliflower and "warm pita bread".
5. **tahini + beef** · tradition · Palestinian kafta of beef or lamb is baked under tahini sauce. · levantine
   - [S2] "covered in a rich, tangy tahini sauce". The 0017 note records "seasoned ground beef or lamb" for [S2].

### Green chutney

1. **green chutney + potato** · contrast · Sharp herb chutney lifts crisp potato aloo tikki. · punjabi
   - [C9] "the key is to add a saucy component like chutney"; served with green chutney, tamarind chutney or mint raita (paraphrase).
2. **green chutney + yogurt** · contrast · On dahi bhalla, green chutney's raw heat meets cool sweetened yogurt. · punjabi
   - [C10] "Mint and Cilantro Green Chutney"; plain whole-milk yogurt thinned and sweetened (paraphrase).
3. **green chutney + tamarind** · contrast · Fresh herb chutney and sweet-sour tamarind chutney are usually served together on chaat. · punjabi
   - [C10] imli chutney is a "compulsory dahi bhalla topping".
   - [C9] both chutneys are offered with aloo tikki (paraphrase).

### Salsa verde

1. **salsa verde + pork** · tradition · Pork stewed in green salsa makes entomatado. · oaxacan (hedged; Larousse places it in central Mexico and Guerrero)
   - [L-ent] "Guiso elaborado con salsa verde de tomate, carne de cerdo o chicharrón". Because the regions don't include Oaxaca, I'd tag the Pairing with no Cuisine or drop it.
2. **salsa verde + cilantro** · aromatic bridge · Oaxacan cooks stir chopped cilantro into ground green salsa. · oaxacan
   - [L-sv] mixed with chopped cilantro and onion (paraphrase).
3. **salsa verde + onion** · aromatic bridge · Chopped raw onion goes into Oaxacan green salsa with the cilantro. · oaxacan
   - [L-sv] as above.
   - [B-tomsal] uses white onion.

### Pasilla salsa

1. **pasilla salsa + beef** · tradition · Smoky pasilla salsa is served with grilled meats such as tasajo on tlayudas. · oaxacan
   - [L-pas-s] served with "carnes asadas".
   - [B-tla] tasajo or cecina enchilada are typical toppings (paraphrase).
2. **pasilla salsa + pork** · tradition · Pasilla salsa goes onto tlayudas topped with chorizo. · oaxacan
   - [B-tla] the classic tlayuda uses chorizo, beans and quesillo (paraphrase), served with pasilla salsa.
3. **pasilla salsa + tomato** · contrast · Some Oaxacan cooks add boiled or roasted tomato to soften the salsa's smoke and heat. · oaxacan
   - [L-pas-s] "tomates cocidos o asados".
4. **pasilla salsa + garlic** · aromatic bridge · Roasted garlic is ground into the basic pasilla salsa. · oaxacan
   - [L-pas-s] "chile molido con agua, ajo asado y sal".

### Toasted breadcrumbs

1. **toasted breadcrumbs + anchovy** · contrast · Crisp crumbs top pasta made with anchovy melted into oil, as in pasta con le sarde. · southern-italian
   - [SP-SARDE] "le acciughe si devono sciogliere completamente nell'olio"; "Mollica di pane 100 g".
2. **toasted breadcrumbs + cauliflower** · texture · Crunchy crumbs finish soft, creamy cauliflower pasta in Palermo. · southern-italian
   - [SP-VRUOC] "I 'vruoccoli' a Palermo indica in realtà il cavolfiore"; "a mo' di formaggio grattugiato".
   - [LP-VRUOC] "spolverare il piatto con della mollica tostata".
3. **toasted breadcrumbs + onion** · contrast · Dry, toasty crumbs balance the sweetness of slow-cooked onion and raisins in cauliflower pasta. · southern-italian
   - [SP-VRUOC] "cipolla dorata (150 g)" (paraphrase of the list).
   - [LP-VRUOC] the crumbs' dry flavour balances the dish's sweetness (paraphrase).

### Sesame seeds (optional)

1. **sesame seeds + eggplant** · texture · Toasted sesame seeds finish miso-glazed eggplant. · japanese
   - [JOC-MISOEGG] "Sprinkle the baked eggplants with 2 tsp toasted white sesame seeds".
2. **sesame seeds + miso** · aromatic bridge · Nutty sesame sits well on sweet, savoury miso glaze. · japanese
   - [JOC-MISOEGG] as above.
3. **sesame seeds + scallion** · tradition · Sesame and sliced scallion greens are scattered together over Japanese and Sichuan dishes. · japanese, sichuan
   - [JOC-MISOEGG] "sliced green onions".
   - [MALA-KOUSHUIJI] "2 scallions, green part only" with "½ teaspoon roasted sesame seeds".
4. **sesame seeds + chicken-breast** · texture · Roasted sesame seeds and peanuts top cold steamed chicken breast in kou shui ji. · sichuan
   - [MALA-KOUSHUIJI] "1 tablespoon roasted peanuts, roughly chopped", "½ teaspoon roasted sesame seeds".

## 7. Citation key

[AGL-PASQ] Torta Pasqualina, Agriligurianet (Regione Liguria). https://www.agriligurianet.it/it/vetrina/prodotti-e-produzioni/pane-pasta-dolci-e-focacce/ricette-focaccia/item/440-torta-pasqualina.html
[B-omel] Oaxacan Omelette (Salsa de Huevo), Rick Bayless. https://www.rickbayless.com/recipe/oaxacan-omelette/
[B-tla] Tlayuda Oaxaqueña, Rick Bayless (reused key). https://www.rickbayless.com/recipe/tlayuda-oaxaquena/
[B-tomsal] Roasted Tomatillo Salsa, Rick Bayless. https://www.rickbayless.com/recipe/roasted-tomatillo-salsa-2/
[C1] 50+ Traditional Punjabi Recipes, Izzah Cheema, Tea for Turmeric (reused key). https://www.teaforturmeric.com/punjabi-recipes/
[C4] Tandoori Chicken, Izzah Cheema, Tea for Turmeric (reused key). https://www.teaforturmeric.com/tandoori-chicken/
[C5] Mutton Karahi (Goat/Lamb Karahi), Izzah Cheema, Tea for Turmeric (reused key). https://www.teaforturmeric.com/mutton-karahi-goat-lamb-karahi/
[C9] Crispy Aloo Tikki, Izzah Cheema, Tea for Turmeric (reused key). https://www.teaforturmeric.com/aloo-tikki/
[C10] Dahi Bhalla (Dahi Bara), Izzah Cheema, Tea for Turmeric (reused key). https://www.teaforturmeric.com/dahi-bhalla/
[C-BHURJI] Egg Bhurji (Anda Bhurji), Izzah Cheema, Tea for Turmeric. https://www.teaforturmeric.com/egg-bhurji/
[C-PULAO] Matar Pulao (Peas Pulao), Izzah Cheema, Tea for Turmeric. https://www.teaforturmeric.com/matar-pulao/
[CDC-RICE] Bacillus cereus Food Poisoning Associated with Fried Rice at Two Child Day Care Centers, Virginia, 1993, MMWR, CDC. https://www.cdc.gov/mmwr/preview/mmwrhtml/00025744.htm
[D1] Mutabbal Beitinjan, Dima Sharif (reused key). https://www.dimasharif.com/recipes/eggplant-mutabal/
[DS1] Pasta alla Norma, la ricetta originale catanese, Dissapore (reused key). https://www.dissapore.com/ricette/pasta-alla-norma/
[DS-FRIT] Frittata di maccheroni, la ricetta della cucina napoletana, Dissapore. https://www.dissapore.com/ricette/frittata-di-maccheroni/
[DS-GRIG] Grigliata di pesce, Dissapore. https://www.dissapore.com/ricette/grigliata-di-pesce/
[DS-PURG] Uova in purgatorio, la ricetta napoletana delle uova al sugo, Dissapore. https://www.dissapore.com/ricette/uova-in-purgatorio/
[FDA-EGG] What You Need to Know About Egg Safety, U.S. Food and Drug Administration. https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety
[FSA1] Cooking your food, Food Standards Agency (gov.uk) (reused key). https://www.gov.uk/government/publications/cooking-your-food/cooking-your-food
[FSA-CHILL] How to chill, freeze and defrost food safely, Food Standards Agency (gov.uk). https://www.gov.uk/government/publications/how-to-chill-freeze-and-defrost-food-safely/how-to-chill-freeze-and-defrost-food-safely
[FSA-FACT] Home food fact checker, Food Standards Agency (gov.uk). https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker
[GR-SCILLA] Il panino col pesce spada più famoso della Calabria si mangia a Scilla, Sonia Ricci, Gambero Rosso (8 May 2026). https://www.gamberorosso.it/notizie/ristoranti/panino-pesce-spada-scilla-civico-5/
[H2] Tabbouleh, Anissa Helou, Pilot Guides (reused key). https://www.pilotguides.com/recipes/lebanon-recipes-tabbouleh/
[HZ] Fried Cauliflower with Tahini Sauce, Hadia Zebib, Hadia's Lebanese Cuisine (reused key). https://hadiaslebanesecuisine.com/newsite/recipe-items/fried-cauliflower-tahini-sauce/
[HZ2] Kibbeh Mishwieh (Grilled Kibbeh), Hadia Zebib, Hadia's Lebanese Cuisine (reused key). https://hadiaslebanesecuisine.com/blog/kibbeh-mishwieh-grilled-kibbeh/
[HZ-EGGS] Lebanese Fried Eggs, Hadia Zebib, Hadia's Lebanese Cuisine. https://hadiaslebanesecuisine.com/blog/lebanese-fried-eggs/
[HZ-EJJI] Fried Parsley Omelets (Parsley Ejji), Hadia Zebib, Hadia's Lebanese Cuisine. https://hadiaslebanesecuisine.com/newsite/recipe-items/fried-parsley-omelets-parsley-ejji/
[JOC-MISOEGG] Miso Glazed Eggplant, Namiko Hirasawa Chen, Just One Cookbook. https://www.justonecookbook.com/miso-glazed-eggplant/
[JOC-OYAKO] Oyakodon (Chicken and Egg Rice Bowl), Namiko Hirasawa Chen, Just One Cookbook. https://www.justonecookbook.com/oyakodon/
[JOC-SHOGA] Ginger Pork (Shogayaki), Namiko Hirasawa Chen, Just One Cookbook. https://www.justonecookbook.com/ginger-pork-shogayaki/
[JOC-TAMA] Tamagoyaki (Japanese Rolled Omelette), Namiko Hirasawa Chen, Just One Cookbook. https://www.justonecookbook.com/tamagoyaki/
[JOC-TONJIRU] Tonjiru (Pork and Vegetable Miso Soup), Namiko Hirasawa Chen, Just One Cookbook (reused key). https://www.justonecookbook.com/tonjiru/
[KAS-INQ] Palestinian author Reem Kassis explores Arab culture in new cookbook, Craig LaBan, Philadelphia Inquirer. https://www.inquirer.com/food/craig-laban/palestinian-food-culture-reem-kassis-20210326.html
[KIK-EGG] Eggs, Kikkoman glossary. https://www.kikkoman.com/en/cookbook/glossary/eggs.html
[KIK-ICHIJU] Ichiju Sansai, Kikkoman. https://www.kikkoman.com/en/cookbook/washoku/ichijusansai.html
[KIK-PONZU] Ponzu Sauce, Kikkoman glossary (reused key). https://www.kikkoman.com/en/cookbook/glossary/ponzu.html
[KIK-SES] Sesame Seeds (White, Black), Kikkoman glossary. https://www.kikkoman.com/en/cookbook/glossary/sesame.html
[KIK-SOY] Kikkoman Soy Sauce, Kikkoman glossary. https://www.kikkoman.com/en/cookbook/glossary/soysauce.html
[L-amex] Arroz a la mexicana, Diccionario enciclopédico de la Gastronomía Mexicana, Larousse Cocina. https://laroussecocina.mx/palabra/arroz-a-la-mexicana/
[L-arroz] Arroz, same dictionary. https://laroussecocina.mx/palabra/arroz/
[L-cec] Cecina oaxaqueña, same dictionary (reused key). https://laroussecocina.mx/palabra/cecina-oaxaquena/
[L-chint] Chintextle, same dictionary. https://laroussecocina.mx/palabra/chintextle/
[L-cil] Cilantro, same dictionary (reused key). https://laroussecocina.mx/palabra/cilantro/
[L-ent] Entomatado, same dictionary. https://laroussecocina.mx/palabra/entomatado/
[L-hes] Huevos en salsa, same dictionary. https://laroussecocina.mx/palabra/huevos-en-salsa/
[L-pas] Chile pasilla oaxaqueño, same dictionary (reused key). https://laroussecocina.mx/palabra/chile-pasilla-oaxaqueno/
[L-pas-s] Salsa de chile pasilla oaxaqueño, same dictionary. https://laroussecocina.mx/palabra/salsa-de-chile-pasilla-oaxaqueno/
[L-sv] Salsa verde, same dictionary (reused key). https://laroussecocina.mx/palabra/salsa-verde/
[LP-RISO] Il riso nella tradizione del Sud: arancine, sartù, tiella barese e tanto altro, Santa Di Salvo, Luciano Pignataro Wine Blog. https://www.lucianopignataro.it/a/ricette-riso-sud/177390/
[LP-VRUOC] Ricetta cult siciliana: pasta chi vruoccoli arriminati, Luciano Pignataro Wine Blog. https://www.lucianopignataro.it/a/ricette-cult-siciliana-pasta-chi-vruoccoli-arriminati/36505/
[MAFF-SOY] Soy sauce, miso, other seasonings, Traditional Foods in Japan, MAFF. https://www.maff.go.jp/e/policies/market/dento_syoku/bunrui/syouyu-miso.html
[MAFF-TAMA] 玉子焼き 東京都, うちの郷土料理, MAFF. https://www.maff.go.jp/j/keikaku/syokubunka/k_ryouri/search_menu/menu/34_11_tokyo.html
[MALA-KOUSHUIJI] Mouthwatering Sichuan Cold Chicken (Kou Shui Ji), Taylor Holliday, The Mala Market (reused key). https://blog.themalamarket.com/mouthwatering-chicken-kou-shui-ji/
[MALA-QA] Why You Need 'The Food of Sichuan': A Q&A With Fuchsia Dunlop, The Mala Market. https://blog.themalamarket.com/why-you-need-the-food-of-sichuan-a-qa-with-fuchsia-dunlop/
[MALA-STEAMEGG] Classic Chinese Steamed Egg (Zhengdan), Kathy Yuan, The Mala Market. https://blog.themalamarket.com/classic-chinese-steamed-egg-zhengdan/
[MWL-FRIEDRICE] The Fried Rice My Dad's Made 100,000 Times, Made With Lau. https://www.madewithlau.com/recipes/egg-fried-rice
[MWL-STEAMEGG] Dad's Steamed Eggs, Made With Lau. https://www.madewithlau.com/recipes/steamed-egg
[NIP-ICHIJU] Ichijū Sansai: The Standard Elements of a Typical Japanese Meal, Nippon.com. https://www.nippon.com/en/guide-to-japan/gu020011/
[ORO-CUC] Per Santa Lucia a Palermo si mangiano "solo" arancine e cuccìa, OroGastronomico. https://www.orogastronomico.it/per-santa-lucia-a-palermo/
[PN3] Spaghetti al pomodoro fresco e basilico, Portanapoli (reused key). https://www.portanapoli.com/Ita/Cucina/spaghetti_pomodoro_fresco.html
[RC-FARRO] Farro dicocco del Sannio, pane e pasta di farro, Prodotti tradizionali, Regione Campania. https://agricoltura.regione.campania.it/tipici/tradizionali/farro-dicocco.html
[RC-PAST] Pastiera, Prodotti tradizionali, Regione Campania. https://agricoltura.regione.campania.it/tipici/tradizionali/pastiera.htm
[RTJ-YAKINASU] Grilled Japanese Eggplant (Yaki Nasu), Yumiko, RecipeTin Japan. https://japan.recipetineats.com/grilled-japanese-eggplant-yaki-nasu/
[S2] Palestinian Kafta with Tahini Sauce, Wafa Shami, Palestine in a Dish (reused key). https://palestineinadish.com/recipes/kiftah-bi-tahini-sauce/
[SBS-MAPO] Fuchsia Dunlop's mapo tofu, SBS Food (reused key). https://www.sbs.com.au/food/recipe/fuchsia-dunlops-mapo-tofu/fwvcw6ya9
[SP-PURG] Uova in purgatorio: ricetta napoletana col tuorlo morbido, Sonia Peronaci. https://www.soniaperonaci.it/uova-in-purgatorio/
[SP-SARDE] Come fare la pasta con le sarde: la ricetta originale, Sonia Peronaci. https://www.soniaperonaci.it/pasta-con-le-sarde/
[SP-VRUOC] Pasta con vruoccoli arriminati, Sonia Peronaci. https://www.soniaperonaci.it/pasta-con-vruoccoli-arriminati/
[SPLENDID-GONGBAO] Gong Bao Chicken with Peanuts (Fuchsia Dunlop), The Splendid Table (reused key). https://www.splendidtable.org/story/2015/02/13/gong-bao-chicken-with-peanuts
[TT-MEJ] Bulgur Mejadra (Mjaddarat el Burgul), Sami Tamimi and Tara Wigley (*Falastin*), The Happy Foodie. https://thehappyfoodie.co.uk/recipes/bulgur-mejadra-mjaddarat-el-burgul/
[TT-SHUL] Bulgur, Tomato and Aubergine Pilaf (Shulbato), Sami Tamimi and Tara Wigley (*Falastin*), The Happy Foodie. https://thehappyfoodie.co.uk/recipes/bulgur-tomato-and-aubergine-pilaf-shulbato/
[WA-RICE] Safe cooling of cooked rice, HealthyWA (Government of Western Australia, Department of Health). https://www.healthywa.wa.gov.au/Articles/S_T/Safe-cooling-of-cooked-rice
[WOL-BOILEDBEEF] Sichuan Boiled Beef (Shuizhu Niurou), Judy Leung, The Woks of Life (reused key). https://thewoksoflife.com/sichuan-boiled-beef/
[WOL-DBJ] Doubanjiang (Chinese Broad Bean Chili Paste), The Woks of Life. https://thewoksoflife.com/doubanjiang/
[WOL-FISH] Steamed Whole Fish, Chinese Style, The Woks of Life. https://thewoksoflife.com/steamed-whole-fish/
[WOL-SOY] Soy Sauce: Everything You Need to Know, The Woks of Life. https://thewoksoflife.com/soy-sauce/
[YI-TOMEGG] Tomato Egg Recipe, Yi, Yi's Sichuan Kitchen. https://sichuankitchenrecipes.com/2022/07/20/tomato-egg-recipe/
[DS-COL] Spaghetti con colatura di alici: ricetta perfetta, Dissapore. https://www.dissapore.com/ricette/spaghetti-colatura-di-alici-ricetta-perfetta/
[EU-TASAJO] ¿Qué es el tasajo, el ingrediente principal de las tlayudas de Oaxaca?, El Universal Oaxaca. https://oaxaca.eluniversal.com.mx/mas-de-oaxaca/que-es-el-tasajo-el-ingrediente-principal-de-las-tlayudas-de-oaxaca/
[LP-COL] Spaghetti con la colatura di alici di Cetara: la ricetta dei cetaresi, Luciano Pignataro (from *La cucina napoletana di mare*, Newton Compton), Luciano Pignataro Wine Blog. https://www.lucianopignataro.it/a/spaghetti-alla-colatura-di-alici-di-cetara/4908/
[MEX-CHINT] Oaxaca chile and garlic seasoning paste: Chintestle, Karen Hursh Graber, MexConnect (2014). https://www.mexconnect.com/articles/4104-oaxaca-chile-and-garlic-seasoning-paste-chintestle/
[RC-col] Colatura di Alici di Cetara DOP, Regione Campania, Assessorato Agricoltura (reused key from 0018). https://agricoltura.regione.campania.it/tipici/colatura-alici.html
[RC-colt] Colatura di alici di Cetara, traditional products sheet, Regione Campania, Assessorato Agricoltura (reused key from 0018). https://agricoltura.regione.campania.it/Tipici/tradizionali/colatura-alici.htm
[RC-SM] Pomodoro San Marzano dell'Agro Sarnese-Nocerino DOP, Regione Campania, Assessorato Agricoltura. https://agricoltura.regione.campania.it/tipici/pomodoro_sanmarzano.html

[FSA-CHILL] is listed for completeness. It gives "Your fridge should be set between 0 and 5°C" and the general one-to-two-hour cooling rule, which can back the fridge temperature in the rice safety line if the author wants a UK figure.

## 8. What I couldn't verify

- **USDA FSIS** rice and egg pages returned 403. The US guidance here comes from FDA (eggs) and CDC MMWR (rice), and there's no US agency figure for how many days cooked rice keeps. A university extension figure (UF/IFAS, 3–5 days) appeared only in search snippets, because the page redirect-looped, so I don't cite it.
- **Farro as a Southern Italian whole grain:** I found no source. Cuccìa's savoury version, with chickpeas and oil, appeared only on blogs. PalermoToday (403) might have supported it.
- **Bulgur in Punjabi cooking (dalia):** only aggregators.
- **Rice in Ligurian cooking:** not researched.
- **Eggs as a Sichuan speciality:** the dishes I found are pan-Chinese home dishes cooked in Sichuan. The Mala Market tea eggs use Sichuan pepper, but the page frames them as Chinese-American and Taiwanese.
- **Kassis on tahini** ("a strong, earthy taste with bitter undertones"): it's quoted by the Washington Post, which returned 403. Not cited.
- **Toasted breadcrumbs outside Sicily** (Calabria, Basilicata, Puglia): blogs only. Gambero Rosso's Calabrian "pasta con la mollica" and struncatura pages returned 403.
- **Salmoriglio:** only one strong source ([GR-SCILLA]). The Dissapore version is a different, parsley-garlic sauce. The Sicily and Calabria split came from blogs.
- **Southern Italian sauces in general:** I couldn't source either three sauce Ingredients or an honest "seldom" exception. This needs an author decision (section 4).
- **Green chutney as specifically Punjabi:** Cheema labels her recipes "Indian, Pakistani". Only the dahi bhalla page names Punjab.
- **Salsa verde with pork in Oaxaca:** Larousse places entomatado in central Mexico and Guerrero, not Oaxaca.
- **Sesame in Levantine cooking** outside za'atar: not researched.
- **Kikkoman's sesame entry:** the tool mostly paraphrased it, so only "enhance[s] their aroma" is verbatim.
- **Daddy Lau's "fresh rice" advice:** it contradicts the common day-old-rice advice. Both views are reported; the safety rules apply either way.

## 9. Closing sauce

The author chose to close the sauce gap by adding Ingredients. These four write-ups replace the short "optional" entries for chintextle and salmoriglio in section 5, and add colatura di alici and tomato sauce. All URLs were fetched during this round. The new keys are in section 7.

**Sauce counts after this section, if everything is taken:**

| Cuisine | Sauce Ingredients | Count |
|---|---|---|
| Southern Italian | salmoriglio, colatura di alici, tomato sauce | 3 |
| Oaxacan | salsa verde, pasilla salsa, chintextle | 3 |
| Levantine | yogurt, tahini, pomegranate molasses | 3 |
| Sichuan | soy sauce, black vinegar, doubanjiang | 3 |
| Punjabi | yogurt, tamarind, green chutney | 3 |
| Japanese | miso, ponzu, soy sauce | 3 |

That makes 10 new Ingredients across sections 5 and 9:

- soy sauce
- tahini
- green chutney
- salsa verde
- pasilla salsa
- toasted breadcrumbs
- chintextle
- salmoriglio
- colatura di alici
- tomato sauce

Sesame seeds stay optional. The weakest of the four is salmoriglio, with only two usable sources (see its flags).

### 9.1 Chintextle

- **Category:** blend. **typicallyIncludes:** dried chile (pasilla oaxaqueño), garlic. **Slot types:** sauce.
- **Cuisines:** oaxacan.
  - Larousse: "Pasta de chile molido, muy utilizada en Oaxaca para comer untada en tortillas" (a ground chile paste, much used in Oaxaca spread on tortillas). It's made with pasilla oaxaqueño or chile mixe, ground on a metate. In the Valles Centrales it's spread on soft tortillas, and "Los habitantes de la sierra del estado la untan en tlayudas" (people in the sierra spread it on tlayudas) [L-chint].
  - Karen Hursh Graber says the Mixe people eat it as-is, spread on large, crisp tortillas (paraphrase) [MEX-CHINT].
- **Essay points:**
  1. It's a paste, not a pourable salsa: smoked pasilla oaxaqueño ground with garlic and salt [MEX-CHINT][L-chint]. Pasilla oaxaqueño is "Chile seco ahumado" from "la sierra Mixe de Oaxaca" [L-pas], so the paste tastes smoky before it touches a grill.
  2. Households vary it. Larousse lists versions that "pueden contener camarón seco, hojas de aguacate asadas, ajo, chile pasilla, vinagre y aceite" (can contain dried shrimp, toasted avocado leaves, garlic, pasilla chile, vinegar and oil), and some add pumpkin seeds, nuts, almond, guajillo or black beans (paraphrase) [L-chint].
  3. It's a seasoning base as much as a condiment. Graber calls it "a good seasoning paste" that can be the base of soups and sauces, and says toasted pumpkin seeds turn it into a simple mole base (paraphrase) [MEX-CHINT]. That's the thing that changes how you use it: a smear at the table, or a spoonful stirred into a pot.
- **Tip (proposed):** "Spread it thinly; a little smoky chile paste goes a long way on a tortilla or tlayuda." The "goes a long way" part is my inference. A sourced alternative: "Keep it in the fridge and use it as a base for soups and sauces as well as a spread." [MEX-CHINT]
- **Cultural context (proposed):** "Chintextle is common in Oaxaca, where cooks in the Valles Centrales spread it on soft tortillas and people in the sierra spread it on tlayudas, often at midday with a boiled egg, tasajo or fresh cheese." [L-chint]
- **Safety:** Graber says to refrigerate it [MEX-CHINT]. No agency guidance was looked for. If a variant uses oil, see the general note that garlic-in-oil mixtures need refrigeration; that wasn't researched here.
- **Pairings:**
  1. **chintextle + eggs** · tradition · Chintextle is often eaten at midday with a boiled egg. · oaxacan
     - [L-chint] "en ocasiones con huevo cocido, tasajo o queso fresco".
  2. **chintextle + beef** · tradition · Smoky chile paste goes with tasajo, Oaxaca's thin-cut dried beef. · oaxacan
     - [L-chint] as above.
     - [EU-TASAJO] "el tasajo es un tipo de carne de res cortada en tiras delgadas" (tasajo is beef cut into thin strips).
  3. **chintextle + garlic** · aromatic bridge · A whole head of garlic is ground into the chile for chintextle. · oaxacan
     - [MEX-CHINT] "One small head of garlic, peeled" (paraphrase of the ingredient line).
     - [L-chint] lists "ajo" among the variants.
  4. **chintextle + cumin** · aromatic bridge · Some cooks add a little cumin to round out the smoky chile. · oaxacan
     - [MEX-CHINT] cumin "to taste (optional)". Diana Kennedy's version adds cumin, peppercorns, cloves and onions (paraphrase).
- **Citations:** [L-chint], [L-pas], [MEX-CHINT], [EU-TASAJO].

### 9.2 Salmoriglio

- **Category:** blend. **typicallyIncludes:** lemon, garlic, parsley. **Slot types:** sauce.
- **Cuisines:** southern-italian.
  - Gambero Rosso: "emulsione tipica dello Stretto preparata con olio, limone, origano e sale" (an emulsion typical of the Strait [of Messina], made with oil, lemon, oregano and salt). Scilla's swordfish sandwich is dressed with it [GR-SCILLA].
  - Dissapore's grigliata di pesce serves a salmoriglio of parsley and garlic loosened with oil [DS-GRIG].
- **Essay points:**
  1. It's an uncooked emulsion of olive oil with lemon and herbs [GR-SCILLA]. The Strait version leads with lemon and oregano [GR-SCILLA]. Dissapore's leads with parsley and garlic: "tritando il prezzemolo con l'aglio. Stemperate con l'olio" (chopping parsley with garlic, then loosening with oil) [DS-GRIG].
  2. It's spooned over grilled fish after cooking, not cooked with it. Dissapore serves it on the side, so "ciascuno se ne servirà a piacere" (each person helps themselves) [DS-GRIG]. Scilla dresses grilled swordfish with it [GR-SCILLA]. That's the thing that changes how you use it.
  3. Versions vary between the two sides of the Strait and from cook to cook. My only sources for the Sicilian and Calabrian split were blogs, so name the variation without assigning it.
- **Tip (proposed):** "Whisk the lemon into the oil a little at a time, and spoon it over the fish once it's off the grill." The whisking method is common to the blog recipes I saw but not to a cited source. [DS-GRIG] supports only "serve it at the table with the fish".
- **Cultural context (proposed):** "Salmoriglio is common around the Strait of Messina, between Sicily and Calabria, where it dresses grilled swordfish; versions with oregano and lemon, or with parsley and garlic, are both made." [GR-SCILLA][DS-GRIG]
- **Pairings:**
  1. **salmoriglio + cod** · contrast · A sharp lemon-and-oil dressing lifts lean grilled white fish. · southern-italian
     - [DS-GRIG] "Servite questa salsa assieme al pesce".
     - [GR-SCILLA] swordfish.
     - **Weak:** neither source names cod. It's the only existing white fish Ingredient, so treat this as a substitution, or tag no Cuisine.
  2. **salmoriglio + lemon** · contrast · Lemon juice is whisked into olive oil to make the Strait's salmoriglio. · southern-italian
     - [GR-SCILLA] "olio, limone, origano e sale".
  3. **salmoriglio + garlic** · aromatic bridge · Raw garlic chopped with parsley gives some versions their bite. · southern-italian
     - [DS-GRIG] "Aglio 1 Spicchio", "tritando il prezzemolo con l'aglio".
- **Flags:**
  - Pairings 2 and 3 are with its own components. They're true but thin. If the build rejects component pairings, salmoriglio has only one (weak) Pairing.
  - Oregano, the defining herb in [GR-SCILLA], isn't an Ingredient.
  - Four further fetches for salmoriglio failed: CiboToday (403); Sonia Peronaci and Fine Dining Lovers (404, no such page); an Accademia Italiana della Cucina PDF, which I couldn't read as text. The rest of what I found was blogs.
  - If salmoriglio feels too thin, pesto alla trapanese is the alternative. I found it on Dissapore, Fine Dining Lovers and Sonia Peronaci in search results but didn't fetch it.
- **Citations:** [GR-SCILLA], [DS-GRIG].

### 9.3 Colatura di alici

- **Category:** condiment. **Slot types:** sauce.
- **Cuisines:** southern-italian.
  - Regione Campania: "Colatura di Alici di Cetara DOP". Cetara is "un antico borgo di pescatori della Costa d'Amalfi" (an old fishing village on the Amalfi Coast). The anchovies come from the sea off the province of Salerno, and processing must happen in that province (paraphrase) [RC-col].
- **Essay points:**
  1. It's the liquid drawn from salted anchovies: "un prodotto liquido ottenuto dalla maturazione delle alici" (a liquid obtained by maturing anchovies). Anchovies are gutted, salted, layered in a small cask called a terzigno, and the liquid is concentrated in the sun for about four or five months, poured back over the fish and filtered through linen (paraphrase) [RC-col][RC-colt]. Regione Campania calls it "erede del Garum" (heir to garum) [RC-colt].
  2. It's a "distillato limpido di colore ambrato carico, quasi bruno-mogano" (a clear, deep amber, almost mahogany liquid) with a "sapore deciso e corposo" (a strong, full flavour) [RC-col]. It was once "un cibo povero, sostitutivo del pesce fresco" (a poor food, a stand-in for fresh fish) [RC-colt].
  3. It carries the salt for the whole dish. Cetara cooks boil the pasta "senza sale al dente" (al dente, without salt) [LP-COL]; Dissapore's watchword is "Parola d'ordine: senza sale" (the watchword: no salt) [DS-COL]. That's the thing that changes how you cook with it.
  4. It isn't cooked. The dressing is made "rigorosamente a crudo" (strictly raw) [LP-COL], and "La pasta va condita lontano dal calore" (the pasta is dressed away from the heat) [DS-COL].
- **Tip (proposed):** "Cook the pasta in unsalted water and add the colatura off the heat, a spoonful at a time; it supplies all the salt." [LP-COL][DS-COL]
- **Amounts:** about 2 tablespoons for 400 g pasta in most of Pignataro's versions, and up to 4 [LP-COL]. Dissapore uses 4 [DS-COL].
- **Cultural context (proposed):** "Colatura is made in Cetara on the Amalfi Coast, and many Campanian cooks use it to dress spaghetti on Christmas Eve, as well as bruschetta, Christmas broccoli and other vegetables." [RC-col][RC-colt][DS-COL]
  - [RC-col] says "gli spaghetti delle vigilie" (Christmas Eve spaghetti). [DS-COL] says "tipica delle tavole natalizie cetaresi" (typical of Cetara's Christmas tables).
- **Pairings:**
  1. **colatura + garlic** · tradition · Cetara cooks dress spaghetti with colatura, raw garlic and olive oil. · southern-italian
     - [LP-COL] "2 cucchiai di colatura di alici", "1 spicchio di aglio tritato".
     - [DS-COL] "1 spicchio d'aglio".
  2. **colatura + parsley** · contrast · Fresh parsley cuts through colatura's deep, salty savour. · southern-italian
     - [DS-COL] "1 ciuffo di prezzemolo".
     - [LP-COL] parsley in each family version (paraphrase).
  3. **colatura + chile** · contrast · A little chile is often added to colatura spaghetti, to taste. · southern-italian
     - [DS-COL] "peperoncino q.b." (chile to taste).
     - [LP-COL] Vincenzo and Claudio's version uses "un peperoncino piccante" (paraphrase).
     - **Flag:** neither says fresh or dried. Tag `chile` or `dried-chile` after checking the 0018 note's convention for Neapolitan peperoncino.
- **Citations:** [RC-col], [RC-colt], [LP-COL], [DS-COL].

### 9.4 Tomato sauce (salsa di pomodoro)

The four candidates:

- **Neapolitan tomato sauce:** has an official body behind it, Regione Campania's San Marzano DOP page [RC-SM]. It also has three cooks from the tradition, already used in MySous: Portanapoli [PN3], Dissapore [DS1] and Sonia Peronaci [SP-PURG]. It pairs naturally with many existing Ingredients.
- **Pesto alla trapanese:** I found it only in search results and didn't fetch it.
- **Ragù's sugo:** harder to separate from the dish. A sugo that comes out of a meat ragù is a by-product, not a sauce you make on its own.
- **Choice:** tomato sauce is the strongest.

- **Category:** blend. **typicallyIncludes:** tomato, garlic, basil. **Slot types:** sauce.
  - **Flag:** a sauce Ingredient made from an existing Ingredient (tomato) may confuse the Kitchen. An alternative is to tag `tomato` itself with `sauce` and have the Formula say "cook {sauce} down". The write-up works either way.
- **Cuisines:** southern-italian.
  - **Naples:** Regione Campania describes San Marzano's "rosso sugo che copriva il bianco della pasta di Gragnano" (red sauce that covered the white pasta of Gragnano) as a Sunday and holiday dish (paraphrase), with a "sapore tipicamente agrodolce" (a typically sweet-sour flavour) [RC-SM]. Portanapoli: "A Napoli usiamo il pomodoro San Marzano" [PN3].
  - **Sicily:** pasta alla Norma, "Nata a Catania", is built on a fresh tomato sauce [DS1].
- **Essay points:**
  1. A quick sauce starts with garlic in olive oil. Portanapoli lets it go golden ("imbiondire l'aglio") and takes it out, then cooks small tomatoes for "un paio di minuti" over high heat and a few more minutes covered (paraphrase) [PN3].
  2. A slower sauce cooks tomatoes soft. Dissapore cooks chopped tomatoes "con l'olio di oliva, l'aglio sbucciato, il basilico e il sale" (with olive oil, peeled garlic, basil and salt), covered over low heat "fino a che i pomodori non sono ben spappolati" (until the tomatoes have broken down), then passes them through a food mill [DS1].
  3. Basil goes in twice. Portanapoli adds half with the salt and tears the rest over the pasta at the end [PN3]. That's the thing that changes how it tastes: cooked basil is mellow, raw basil is bright.
  4. The tomato sets the flavour. The San Marzano is prized for its sweet-sour taste [RC-SM], and Portanapoli also names Piennolo, Pachino and ciliegino tomatoes (paraphrase) [PN3].
- **Tip (proposed):** "Let the garlic turn pale gold, not brown, before the tomatoes go in." [PN3] This also matches the existing tomato + garlic Pairing detail.
- **Cultural context (proposed):** "Tomato sauce is common across Southern Italy: many Neapolitan cooks make it with San Marzano tomatoes for Sunday pasta, and in Catania it's the base of pasta alla Norma." [RC-SM][PN3][DS1]
- **Pairings:**
  1. **tomato sauce + basil** · tradition · Basil cooked into the sauce and torn over at the end is a common Southern Italian finish. · southern-italian
     - [PN3] "aggiungere le restanti foglie di basilico spezzettate con le mani".
     - [DS1] basil cooked with the tomatoes.
  2. **tomato sauce + garlic** · aromatic bridge · Garlic softened in oil is the usual base for a Southern Italian tomato sauce. · southern-italian
     - [PN3] "imbiondire l'aglio in un tegame".
     - [DS1] "l'aglio sbucciato".
  3. **tomato sauce + eggplant** · texture · Fried eggplant goes on top of the sauced pasta in pasta alla Norma, so it stays silky but not soggy. · southern-italian
     - [DS1] add the eggplant "direttamente in ogni piatto"; "resistere alla tentazione di aggiungere le melanzane alla salsa di pomodoro" (resist adding the eggplant to the sauce).
  4. **tomato sauce + eggs** · tradition · Neapolitan cooks poach whole eggs in tomato sauce for uova in purgatorio. · southern-italian
     - [SP-PURG] "Uova intere cotte nel sugo".
     - [DS-PURG] eggs immersed in tomato sauce (paraphrase).
     - **Note:** this overlaps with eggs + tomato in section 6. Keep only one: this one if tomato sauce is an Ingredient, the other if not.
- **Citations:** [RC-SM], [PN3], [DS1], [SP-PURG], [DS-PURG].

### 9.5 What this section couldn't verify

- **Salmoriglio:** no institutional source, and only two usable editorial ones. The Sicilian and Calabrian split rests on blogs.
- **Chintextle:**
  - Larousse's tasajo entry showed only its title, so [EU-TASAJO] carries the "tasajo is beef" claim.
  - The "goes a long way" tip is unsourced.
- **Colatura + chile:** fresh or dried isn't stated.
- **Pesto alla trapanese:** the Dissapore and Fine Dining Lovers pages weren't fetched, so it isn't written up.
- **Gambero Rosso:** recipe pages still return 403. [GR-SCILLA] was fetched earlier in this research.
