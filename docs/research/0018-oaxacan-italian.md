# Research for issue #18: Oaxacan and Southern Italian depth, and safety for beef and cod

Scope: new Ingredients anchovy, red wine vinegar, epazote, beef, black pepper, cod, potato and green beans for the Oaxacan and Southern Italian Cuisines. Re-tags for pork, lamb, onion, eggplant, parsley and mint (Southern Italian), and parsley, zucchini and chicken thigh (Oaxacan). Slot-type exceptions, gremolata Pairings, food safety for beef and cod, and new Pairings.

This builds on `docs/research/0017-oaxacan-italian-safety.md` (batch 1). I don't repeat its work. Where I reuse one of its sources, I fetched the page again myself and kept its key.

## 1. Method

- I fetched and read every URL in the citation key (section 8). Quotes are as the fetch tool returned them, kept short. Italian and Spanish stay in the original with a gloss. Anything I paraphrase is marked "(paraphrase)".
- I didn't use The Flavour Thesaurus, The Flavor Bible or any compound or flavour-molecule data (ADR 0001). Wikipedia and search snippets helped me find dishes, but I don't cite them. I don't cite content farms, SEO recipe aggregators or anything I only saw in a search snippet.
- **Oaxacan sources:**
  - The *Diccionario enciclopédico de la Gastronomía Mexicana* (Larousse Cocina): entries for Oaxaca, chichilo, mole verde, mole amarillo, mole coloradito, cecina oaxaqueña, tlayuda, sopa de guías, epazote and vinagre. Its "Tasajo" entry is behind a registration wall, so I don't cite it.
  - Secretaría de Agricultura (gob.mx): the mole verde from INPI's *Mulli*, and the quelites article.
  - El Universal Oaxaca (Fabiola Hidalgo) on tasajo.
  - Bricia Lopez and Javier Cabral's *Oaxaca*, through its ckbk reference page. Lopez is from a Oaxacan family.
  - Rick Bayless's recipe pages, as support.
  - UIC Heritage Garden (University of Illinois Chicago) on epazote.
- **Southern Italian sources:**
  - Regione Campania's agriculture department (Colatura di alici di Cetara DOP, and its older traditional-products sheet).
  - Neapolitan sites and writers:
    - Portanapoli (genovese, ragù, puttanesca, insalata di rinforzo, gnocchi, vongole, aglio e olio, and its Christmas and Easter menus).
    - Raffaele Bracale on Luciano Pignataro's blog (ragù and braciole).
    - Scatti di Gusto (Daniela Persico, with a Chiaia chef's lamb).
    - La cuoca galante (scapece).
  - Dissapore, with named authors: Rossella Neri on genovese and Norma, and Chiara Cajelli on pasta e patate.
  - Sonia Peronaci, on orecchiette learned in Bari vecchia.
  - Home cooks writing their own region's food on their own sites:
    - Clementina Urbano (Sedicipuglia).
    - Rita Caputo (La Cucina Pugliese).
    - Graziella Giannuzzi.
    - Maria Bonaccorso (Il Cuore in Pentola, Sicilian section).
  - Giovanni Sole on iCalabresi, on peperoncino in Calabria.
  - Fine Dining Lovers (editorial), on scapece and taralli.
- **Food safety:** US FDA (Safe Food Handling, Food Safety for Moms-to-Be, and Selecting and Serving Seafood) and the UK Food Standards Agency on gov.uk.
- **Couldn't fetch:**
  - These returned 403 or 429 to my fetcher, and I didn't try to get around it: La Jornada del Campo (epazote), NapoliToday (fagiolini), Fanpage (Neapolitan Easter) and Cesarine (Pugliese lamb).
  - Fine Dining Lovers' baccalà and impepata URLs were 404.

Caveats that apply throughout:

- Italian "pepe" in a recipe usually means black pepper. Only [FDL-tar] says "pepe nero" outright, so I flag the others.
- In Mexico, "pimienta" can mean black pepper or allspice ("pimienta gorda"). [L-cec] and [L-mv] say "pimienta negra"; [L-ma] says only "pimienta".
- Mexican "calabacita" is a young summer squash (*Cucurbita pepo*). It's often a rounder or striped local type, not the dark Italian zucchini, so tag zucchini as Oaxacan with that note.
- Several Southern Italian meat dishes are made with veal in some sources and beef in others ([DS-gen], [DS-piz]). I only claim beef where a source says "manzo".

## 2. New Ingredients

### Anchovy

- **Suggested category:** seafood
- **Slot types:** aromatic. When anchovy is melted into oil it acts as a seasoning base, not a protein.
- **Cuisines:**
  - southern-italian:
    - Puglia: Sonia Peronaci's orecchiette con cime di rapa, learned "nei vicoli di Bari vecchia", melts the anchovies in oil [SP-ore].
    - Naples:
      - Puttanesca's 19th-century ancestor is Cavalcanti's "Vermicelli all'olio con olive capperi ed alici salse" [DS-put].
      - Insalata di rinforzo uses "6-8 acciughe sotto sale" [PN-rinf].
      - Cetara's colatura is "il tradizionale condimento per gli spaghetti delle vigilie" [RC-col].
- **Essay points:**
  1. Melted, not fried: "falli sciogliere a fuoco dolce, mescolando: non devono friggere, devono disfarsi nell'olio fino a sparire" (melt them over low heat, stirring; they shouldn't fry, they should dissolve into the oil until they disappear) [SP-ore]. Dissapore also waits for them to dissolve, mashing them with a fork (paraphrase) [DS-put].
  2. Salted anchovies are layered with sea salt "testa-coda" (head to tail) under weights. The liquid that drains off is matured into colatura [RC-colt][RC-col].
  3. They're strong and salty. Portanapoli leaves them out of its own puttanesca because they "hanno un sapore molto forte e non tutti gradiscono" (have a very strong taste that not everyone likes) [PN-put]. Dissapore adds no salt to the sauce, because the other ingredients are already salty (paraphrase) [DS-put].
  4. Colatura was once "un cibo povero, sostitutivo del pesce fresco" (a poor food that stood in for fresh fish) [RC-colt].
- **Practical tip:** Warm the fillets in the oil over low heat and stir until they melt away; don't let them fry [SP-ore].
- **Cultural context:** Common in Southern Italian cooking melted into oil for pasta and greens, and on the Neapolitan Christmas Eve table in salads and as colatura over spaghetti [SP-ore][PN-rinf][RC-col]. Whether anchovy belongs in Neapolitan puttanesca varies: Dissapore includes it, while Portanapoli's own recipe leaves it out [DS-put][PN-put].
- **Citations:** [SP-ore], [DS-put], [PN-put], [PN-rinf], [RC-col], [RC-colt], [SDG1].

### Red wine vinegar

- **Suggested category:** condiment
- **Slot types:** acid
- **Cuisines:**
  - southern-italian (weak, one source): Clementina Urbano's Pugliese green-bean and potato salad uses "aceto di vino rosso" with mint and parsley [CU].
  - oaxacan: **rejected.** See section 4.
- **Scapece doesn't support red wine vinegar.** Every scapece recipe I fetched uses white wine vinegar: "Aceto di Vino Bianco: 100 ml" [FDL1] and "un bicchiere di aceto di vino bianco" [LCG-sc]. Behr's preview says only "vinegar" [AE1]. A search snippet called red wine vinegar a modern variant of scapece, but I couldn't fetch a citable source for that.
- **Essay points:**
  1. In Pugliese summer salads, a splash of red wine vinegar dresses boiled green beans and potatoes with mint (paraphrase) [CU].
  2. In Neapolitan scapece, fried vegetables or fish are "preserved for a short time in vinegar" with mint and often garlic [AE1]. The vinegar there is usually white [FDL1][LCG-sc].
  3. Portanapoli's insalata di rinforzo dresses cauliflower with "4 cucchiai di aceto" (4 tablespoons of vinegar) and doesn't name the type [PN-rinf].
- **Practical tip:** Dress boiled vegetables while they're still warm, so they soak up the vinegar. This is my own suggestion; I found no source for it, so it needs one or should be cut.
- **Cultural context:** Southern Italian cooks often use vinegar for vegetables and for scapece, usually white wine vinegar. Red wine vinegar shows up in some Pugliese home salads [CU][FDL1][LCG-sc].
- **Recommendation:** Tag southern-italian only if one source is enough. A white wine vinegar Ingredient would fit the Cuisine better; see section 4.
- **Citations:** [CU], [FDL1], [LCG-sc], [AE1], [PN-rinf].

### Epazote

- **Suggested category:** herb
- **Slot types:** soft herb
- **Cuisines:**
  - oaxacan:
    - The Valles Centrales mole verde, made with pork or chicken, includes "perejil, epazote y hierba santa" with miltomate and chile de agua (paraphrase of list) [L-mv].
    - The Mixteca (Yucanama) mole verde also uses epazote [L-mv].
    - The Secretaría de Agricultura's "Mole verde estilo Oaxaca" lists "ejotes, chayote, tomate, ajo, chile serrano, cebolla, masa, hoja santa, epazote, perejil y pierna de cerdo" [GOB1].
- **Essay points:**
  1. Larousse: "su olor específico, su sabor acre, bastante pronunciado" (a distinctive smell and a sharp, pronounced taste) "con un leve toque a limón" (with a slight touch of lemon) [L-epa].
  2. It's "indispensable en guisos como los frijoles de olla" (essential in stews such as pot beans) [L-epa]. The agriculture ministry says it's used as a seasoning "especialmente en la preparación de frijoles" (especially for beans) [GOB-q].
  3. The name comes from Nahuatl *epazotl*, which UIC glosses as combining "skunk" and "sweat" (paraphrase). Cooks describe it as "peppery and minty", "an acquired taste" [UIC-epa].
  4. Use it in small amounts. The plant is "poisonous in large doses", especially its oil, seeds and flowering tips [UIC-epa].
- **Practical tip:** Use a sprig or two, not a bunch. The flavour is strong, and the plant is toxic in large amounts [L-epa][UIC-epa]. "A sprig or two" is my wording; no source gives a quantity.
- **Cultural context:** In Oaxaca, epazote is one of the herbs that colours mole verde, alongside parsley and hierba santa [L-mv][GOB1].
- **Flag:** In Oaxaca, black beans are often seasoned with avocado leaf instead. Bayless's tlayuda beans are "simmered with anisey avocado leaves" (paraphrase) [B-tla], and chichilo uses toasted avocado leaf [L-chi]. Don't write that Oaxacan beans are usually made with epazote.
- **Citations:** [L-epa], [GOB-q], [UIC-epa], [L-mv], [GOB1], [B-tla], [L-chi].

### Beef

- **Suggested category:** meat
- **Slot types:** protein
- **Cuisines:**
  - oaxacan:
    - Tasajo is "un tipo de carne de res cortada en tiras delgadas, conservada en seco a través de salazón" (beef cut in thin strips, preserved dry by salting) [EU-tas]. Bricia Lopez: "Tasajo is Oaxaca's steak cut … a slice of heavily salted, paper-thin beef, usually from the top round" [BL-tas].
    - Chichilo, one of the seven moles of Oaxaca, is usually made with beef (paraphrase) [L-chi].
    - There's a mole amarillo "con carne de res", thickened with masa [L-ma].
  - southern-italian:
    - Neapolitan genovese: "1 Kg di carne di manzo, primo taglio oppure lacerto" with "1,5 Kg di cipolle" [PN-gen].
    - Bracale's ragù: "1,5 Kg. in un sol pezzo di primo o anche secondo taglio di manzo", plus braciole [LP-rag].
- **Essay points:**
  1. Neapolitan ragù and genovese cook a large piece of beef for hours, "almeno tre ore" (at least three hours) for genovese [PN-gen]. Bracale's ragù takes "almeno 7 ore" (at least seven hours) all told [LP-rag].
  2. The meat is usually a second course. Bracale: "Servire come pietanza la carne affettata e le brasciole" (serve the sliced meat and braciole as a main) [LP-rag], and Portanapoli says the same of genovese (paraphrase) [PN-gen].
  3. Braciole are thin slices of beef rolled around "pepe, cubetti di formaggio pecorino, aglio e prezzemolo tritati, uvetta e pinoli" (pepper, pecorino, chopped garlic and parsley, raisins and pine nuts) and cooked in the ragù [LP-rag].
  4. Oaxacan tasajo is cooked fast. "Asado al carbón o al comal, el tasajo le da a la tlayuda ese aroma ahumado" (grilled over charcoal or on the comal, it gives the tlayuda its smoky aroma) [EU-tas]. Lopez: "It tastes amazing simply grilled" [BL-tas].
- **Practical tip:** For a long braise, use one large piece of a tougher cut, as the Neapolitan cooks do, and keep the heat low [PN-gen][LP-rag].
- **Cultural context:**
  - In Oaxaca, "cecina" means chile-marinated pork, and beef is tasajo: "este término se reserva para la carne de cerdo enchilada" (the term is reserved for chile-marinated pork) [EU-tas][L-cec].
  - In Naples, genovese is a Sunday dish of beef and onions, despite its name [PN-gen][DS-gen].
- **Flags:**
  - Rossella Neri's genovese uses veal ("vitello", "la punta dello scamone") [DS-gen], and Dissapore's pizzaiola recommends veal too [DS-piz]. The cut varies by family, so hedge.
  - Whether tasajo is marinated varies by source (search snippets only). [EU-tas] and [BL-tas] describe salt only.
- **Citations:** [EU-tas], [BL-tas], [B-cmp], [L-chi], [L-ma], [L-tla], [PN-gen], [DS-gen], [LP-rag], [DS-piz].

### Black pepper

- **Suggested category:** spice
- **Slot types:** heat
- **Cuisines:**
  - oaxacan:
    - The cecina oaxaqueña marinade "suele contener chiles guajillos, pimienta negra…", with allspice, clove, cinnamon, garlic, oregano and vinegar (paraphrase of rest) [L-cec].
    - Bayless's Oaxacan chile-marinated pork uses "1/2 teaspoon ground black pepper" [B-cmp].
    - The general mole verde description lists black pepper (paraphrase) [L-mv].
  - southern-italian:
    - Neapolitan taralli: "strutto e pepe per un sapore deciso e piccante" (lard and pepper for a bold, hot flavour), with "Pepe Nero: q.b." in the list [FDL-tar].
    - Portanapoli's Easter casatiello is made "with lard, pepper, and salt", with "a lot of pepper" [PN-easter].
    - Pepper goes in braciole [LP-rag] and genovese ("sale e pepe") [PN-gen].
- **Essay points:**
  1. In Naples, pepper is a main flavour of some breads and snacks, not only a seasoning. Taralli sugna e pepe are said to date to the late 1700s, when a baker used up leftover bread dough with lard and pepper (paraphrase) [FDL-tar].
  2. In Oaxacan adobos, black pepper goes in with dried chiles and warm spices, ground into a paste for pork [L-cec][B-cmp].
  3. In Calabria, peperoncino was historically used "in luogo del costoso pepe nero" (instead of costly black pepper) [GS]. That helps explain why chile, not pepper, is the main heat in much Southern Italian cooking.
- **Practical tip:** Grind it fresh and coarse when it's the main flavour, as in braciole or taralli. This tip isn't sourced; [FDL-tar] and [LP-rag] only list pepper.
- **Cultural context:** Common in Neapolitan baking (taralli, casatiello) and in Oaxacan chile marinades for pork [FDL-tar][PN-easter][L-cec].
- **Citations:** [L-cec], [B-cmp], [L-mv], [FDL-tar], [PN-easter], [LP-rag], [PN-gen], [GS].

### Cod

- **Suggested category:** seafood
- **Slot types:** protein
- **Cuisines:**
  - southern-italian: mostly salt cod (baccalà).
    - Naples' Christmas Eve dinner has "Capitone e Baccalà fritto (fried eel and dried cod)" [PN-xmas].
    - Rita Caputo's baked baccalà with potatoes is "tipico di molte regioni del sud Italia" (common in many regions of southern Italy) [RCap].
    - Giuliana Manca's baccalà alla napoletana is floured, fried and baked in tomato with olives and capers (paraphrase) [GMan].
- **Essay points:**
  1. Salt cod has to be desalted first. Caputo soaks it in cold water "for at least 48 hours, changing the water three times a day" (paraphrase) [RCap].
  2. In baccalà alla napoletana, the fish is dusted in flour and fried "in abbondante olio" (in plenty of oil), then finished in a tomato sauce with olives and capers [GMan].
  3. Pugliese and Salentine versions layer the soaked fish on sliced potatoes with tomato, garlic, onion, parsley and breadcrumbs, and bake it at 180°C [RCap].
- **Practical tip:** Change the soaking water several times over two days, keeping it cold [RCap]. Taste a flake before seasoning. The tasting advice is mine.
- **Cultural context:** Fried baccalà is common on the Neapolitan Christmas Eve table [PN-xmas]. Baked baccalà with potatoes is cooked across the south [RCap].
- **Flag:** Every source here is about salt cod, not fresh cod. If MySous's cod is fresh fillet, write the essay so baccalà reads as a cured form of it, and say that the recipes start from salted fish.
- **Citations:** [PN-xmas], [RCap], [GMan].

### Potato

- **Suggested category:** produce
- **Slot types:** vegetable
- **Cuisines:**
  - southern-italian:
    - Pasta e patate is "un piatto della tradizione partenopea" (a dish of the Neapolitan tradition) [DS-pp].
    - Gnocchi alla sorrentina are baked with "mozzarella, pomodoro e basilico" [PN-gno].
    - Pugliese green-bean and potato salad [CU][GG] and baked baccalà with potatoes [RCap].
  - oaxacan:
    - Chichilo includes potato, chayote, green beans and calabacitas (paraphrase) [L-chi].
    - Mole amarillo includes "ejotes, chayotes, calabacitas y papas" [L-ma].
    - Coloradito is served with chicken or pork and boiled potatoes (paraphrase) [L-mc].
    - Larousse lists "las papas en escabeche" among Oaxacan dishes [L-oax].
- **Essay points:**
  1. For gnocchi, Portanapoli wants "patate asciutte, abbastanza farinose" (dry, fairly floury potatoes) [PN-gno].
  2. In pasta e patate, the pasta cooks raw in the potato base, with "poco brodo caldo o acqua alla volta" (a little hot stock or water at a time) until creamy [DS-pp].
  3. Graziella Giannuzzi boils potatoes whole in their skins from cold water, so they don't take on too much water (paraphrase) [GG].
- **Practical tip:** Start potatoes for salad in cold water, whole and in their skins, so they don't soak up too much water [GG].
- **Cultural context:** Common in Neapolitan home cooking (pasta e patate, gnocchi alla sorrentina) and in Oaxacan moles such as chichilo and amarillo, cut into pieces with other vegetables [DS-pp][PN-gno][L-chi][L-ma].
- **Citations:** [DS-pp], [PN-gno], [CU], [GG], [RCap], [L-chi], [L-ma], [L-mc], [L-oax].

### Green beans

- **Suggested category:** produce
- **Slot types:** vegetable
- **Cuisines:**
  - southern-italian:
    - Maria Bonaccorso's Sicilian fagiolini al pomodoro, best made with the flat beans her father called "spinnadduzzu" [MB].
    - Clementina Urbano's and Graziella Giannuzzi's Pugliese salads of green beans and potatoes [CU][GG].
  - oaxacan:
    - The gob.mx mole verde estilo Oaxaca includes "ejotes" [GOB1].
    - Larousse: green-bean and chayote chunks "sometimes" go into mole verde (paraphrase) [L-mv].
    - Chichilo [L-chi] and mole amarillo [L-ma] both include ejotes.
- **Essay points:**
  1. Sicilian fagiolini al pomodoro are boiled, cooled in cold water, then tossed for about 2 minutes in a fresh tomato and garlic sauce, finished with basil (paraphrase) [MB].
  2. Giannuzzi says never to cover the pot, so they stay green (paraphrase) [GG].
  3. In Oaxacan moles, they're cut into pieces and cooked in the sauce with chayote, potato and squash (paraphrase) [L-chi][L-ma].
- **Practical tip:** Boil them uncovered, so they stay green [GG].
- **Cultural context:** Common in Southern Italian summer side dishes and salads, and in several Oaxacan moles [MB][CU][L-chi].
- **Citations:** [MB], [CU], [GG], [GOB1], [L-mv], [L-chi], [L-ma].

## 3. Re-tags

### Southern Italian

| Ingredient | Verdict | Sources |
|---|---|---|
| pork | **Confirm** | Portanapoli's ragù uses "6 tracchiulelle (ovverosia le costine di maiale)" (pork ribs) [PN-rag]. Bracale's: "3 tracchiolelle (puntine) di maiale" [LP-rag]. |
| lamb | **Confirm** | Scatti di Gusto calls lamb with peas "una ricetta della cucina tradizionale napoletana", from a chef in Chiaia [SDG-agn]. Puglia and Basilicata: oven lamb with lampascioni and potatoes (weak source, see section 9) [MGal]. Caveat: agnello cacio e uova is mostly called Abruzzese, which is outside this Cuisine's described regions. |
| onion | **Confirm** | Genovese: "1,5 Kg di cipolle" to 1 kg beef [PN-gen]. Neri's ratio is "1,5 kg di cipolle ogni kg di carne" [DS-gen]. Ragù: "600 – 800 g. di cipolle dorate vecchie" [LP-rag]. Neapolitan lamb starts with onion softened in oil [SDG-agn]. |
| eggplant | **Confirm** | Pasta alla Norma: "Nata a Catania nel 1800", with "le melanzane fritte" [DS1]. |
| parsley | **Confirm** | "a Napoli è molto diffusa la versione col prezzemolo" (in Naples the version with parsley is very common) [PN1]. Vongole: "il prezzemolo tritato finemente" [PN2]. Puttanesca: "abbondante prezzemolo" [PN-put]. Braciole [LP-rag]. |
| mint | **Confirm** | Scapece: "Menta: 1 mazzetto" [FDL1], "foglie di menta" [LCG-sc]. Behr: in vinegar "along with mint" [AE1]. Pugliese bean salad with mint [CU]. |

### Oaxacan

| Ingredient | Verdict | Sources |
|---|---|---|
| parsley | **Confirm** | Valles Centrales and Mixteca mole verde both list perejil [L-mv]. The gob.mx mole verde estilo Oaxaca lists "perejil" [GOB1]. |
| zucchini | **Confirm, with caveat** | Sopa de guías: "guías de calabaza, calabacitas tiernas y flores de calabaza", with a herb called piojo added in the Valles Centrales [L-sg]. Chichilo [L-chi] and mole amarillo [L-ma] include calabacitas. Larousse lists "sopas … de calabacitas" among Oaxacan soups [L-oax]. Caveat: calabacita is a Mexican summer squash, often not the Italian zucchini cultivar. |
| chicken-thigh | **Confirm, with caveat** | Mixteca mole verde is usually chicken (paraphrase) [L-mv]. Coloradito is served with chicken or pork [L-mc]. Mole amarillo is made with "carne de cerdo o de pollo" [L-ma]. Larousse lists "el pollo almendrado" and "el pollo con orégano" among Oaxacan dishes [L-oax]. Caveat: all are whole-chicken dishes, not thigh-specific. |

## 4. Exceptions (fewer than 3 per Slot type)

Counts after this batch, if everything above is adopted:

- **Southern Italian:**
  - protein 4 (pork, lamb, beef, cod)
  - aromatic 3 (garlic, onion, anchovy)
  - acid 2 (lemon, red-wine-vinegar, weak)
  - soft herb 3 (basil, parsley, mint)
  - heat 2 (chile, black-pepper)
  - vegetable 6 (tomato, zucchini, eggplant, potato, green-beans, onion)
- **Oaxacan:**
  - protein 3 (pork, beef, chicken-thigh)
  - aromatic 3 (garlic, onion, scallion)
  - acid 2 (lime, tomatillo)
  - soft herb 3 (cilantro, epazote, parsley)
  - heat 2 (chile, black-pepper)
  - vegetable 6 (onion, tomato, tomatillo, zucchini, potato, green-beans)

Four exceptions remain:

1. **Oaxacan heat (2).** Oaxacan heat comes from many regional chiles, which MySous keeps as one Chile Ingredient. Larousse on Oaxaca: there's a "gran variedad de chiles regionales que se utilizan" (a great variety of regional chiles in use). "Entre ellos se pueden mencionar: chilcostle, chilhuacle, costeño, de agua, de onza, parado y pasilla oaxaqueño" (among them: …) [L-oax]. Splitting Chile into varieties would be the way to reach 3; black pepper [L-cec] is the second heat Ingredient.
2. **Oaxacan acid (2).** I reject red wine vinegar as Oaxacan. Larousse says Mexican vinegars are mild, "generalmente elaborados con sidra, manzana, cerveza de malta, plátano y otros frutos" (usually made from cider, apple, malt beer, banana and other fruit), and wine isn't on the list [L-vin]. Bayless: "apple cider vinegar is common in Mexico" [B-cmp]. Cecina's marinade does use vinegar of an unnamed type [L-cec]. A fruit or cider vinegar Ingredient would be the honest third.
3. **Southern Italian acid (2, one of them weak).** Lemon is well sourced (batch 1, [RC2]). The vinegar these sources use is usually white wine vinegar: scapece [FDL1][LCG-sc]. Puttanesca's capers go in salt-packed, not in vinegar, which would clash with the dish (paraphrase) [DS-put]. Red wine vinegar has one Pugliese source [CU]. Adding a white wine vinegar Ingredient would give a well-sourced third.
4. **Southern Italian heat (2).** Peperoncino dominates. Giovanni Sole calls it "considerato centrale nella tradizione culinaria della Calabria" and "simbolo dell'identità regionale" (central to Calabria's cooking and a symbol of its identity). It was used "in luogo del costoso pepe nero" (instead of costly black pepper) [GS]. Black pepper is the second, in Neapolitan baking and braciole [FDL-tar][PN-easter][LP-rag]. Splitting Chile (fresh and dried peperoncino, Calabrian chile) is the only route to 3.

## 5. Gremolata

All Italian sources tie gremolata to ossobuco, which is veal shank [SDG1]. I found two fetched, citable sources that put a gremolata on beef or lamb. Neither is from the Milanese tradition, so neither should carry a Cuisine tag.

- **gremolata + beef**: contrast.
  - Claim: A parsley, lemon-zest and garlic gremolata is scattered over braised beef short ribs.
  - Source: [ATK-sr] America's Test Kitchen, "Adobo-Inspired Short Ribs with Black Pepper Gremolata". The gremolata is "2 tablespoons chopped fresh parsley", "2 teaspoons grated lemon zest", "1 garlic clove, minced", plus breadcrumbs, chives and "2 teaspoons coarsely ground pepper", over "3 pounds bone-in English-style short ribs".
  - Caveat: it's a variant with breadcrumbs and pepper, and the page doesn't say why it works. The contrast reason would be MySous's own wording, not the source's.
- **gremolata + lamb**: contrast.
  - Claim: Gremolata garnishes braised lamb shanks.
  - Source: [FN-AB] Anne Burrell (Food Network), "Braised Lamb Shanks": "1/4 cup finely chopped parsley leaves", "1 lemon, zested", "1 small garlic clove, minced", plus orange zest and horseradish. "Transfer to serving plates and garnish with Gremolata."
  - Caveat: also a variant, and the reason isn't stated.
- **gremolata + anchovy**: tradition.
  - Claim: Some Milanese cooks chop a salted anchovy into gremolata.
  - Source: [SDG1] "buccia di limone, aglio, prezzemolo e a volte acciuga, tritati finemente" (lemon zest, garlic, parsley and sometimes anchovy, finely chopped), and the variant "l'acciuga salata nella gremolada".
  - No Cuisine tag (Milanese).
- **Not found:** gremolata with pork or cod.

## 6. Food safety: beef and cod

These are in the shape of `content/ingredients/pork.md`. The FDA gives °F with °C in its Moms-to-Be page, the FSA gives °C, and 40°F → 4°C is my conversion.

### Beef (whole cuts and ground)

- **handling:**
  - Note: Keep raw beef covered and apart from food that's ready to eat, in a fridge at 40°F / 4°C or below, and refrigerate it within 2 hours of buying (1 hour above 90°F / 32°C). Use a separate board for raw meat. Don't rinse it, since washing doesn't remove bacteria. Wash your hands with soap and warm water for at least 20 seconds after handling it. Thaw it in the fridge, in cold water or in the microwave, never on the counter.
  - Citations:
    - Safe Food Handling, U.S. Food and Drug Administration: "for at least 20 seconds"; "within 2 hours of cooking or purchasing" (1 hour above 90°F); "consistently 40° F or below"; "Use one cutting board for fresh produce and a separate one for raw meat, poultry, and seafood"; "Never thaw food at room temperature". https://www.fda.gov/food/buy-store-serve-safe-food/safe-food-handling
    - Why avoiding cross-contamination is important, Food Standards Agency: "Washing meat, fish and poultry doesn't get rid of harmful bacteria - only thorough cooking will"; "cover raw food, including meat, and keep it separate from ready-to-eat food in the fridge". https://www.gov.uk/government/publications/why-avoiding-cross-contamination-is-important/why-avoiding-cross-contamination-is-important
- **cooking:**
  - Note: Cook steaks and roasts until an instant-read thermometer reads 145°F / 63°C, then rest them for 3 minutes. The UK says whole cuts can be served pink in the middle, since bacteria sit on the outside. Cook ground beef, burgers and rolled joints all the way through, to 160°F / 71°C. The UK says burgers shouldn't be served rare or pink at home, and 70°C held for 2 minutes in the centre is its benchmark.
  - Citations:
    - Meat, Poultry & Seafood (Food Safety for Moms-to-Be), U.S. Food and Drug Administration: "Cook beef, pork, veal, and lamb roasts, steaks, and chops to at least 145° F (63° C), with a 3 minute rest time"; "Cook ground beef, veal, lamb, and pork to at least 160° F (71° C)." https://www.fda.gov/food/people-risk-foodborne-illness/meat-poultry-seafood-food-safety-moms-be
    - Cooking your food, Food Standards Agency: whole cuts "can be served pink in the middle according to taste"; "Any meat that has been minced or skewered all the way through should be cooked thoroughly"; "Burgers shouldn't be served rare or pink at home"; equivalents "65°C for 10 minutes", "75°C for 30 seconds", "80°C for 6 seconds". https://www.gov.uk/government/publications/cooking-your-food/cooking-your-food
  - Not covered by any official source I fetched: salt-dried beef such as tasajo. It's a thin whole cut, grilled through in practice [EU-tas]. I'd not add a tasajo-specific safety claim.

### Cod and other white fish (including salt cod)

- **handling:**
  - Note: Keep fresh fish in the fridge at 40°F / 4°C or below and use it within 2 days, or wrap it well and freeze it. Thaw it in the fridge overnight, or sealed in a bag in cold water. Fresh fish should smell mild, not sour or of ammonia. Don't rinse raw fish, and use a separate board for it.
  - Citations:
    - Selecting and Serving Fresh and Frozen Seafood Safely, U.S. Food and Drug Administration: "If seafood will be used within 2 days after purchase, store it in a clean refrigerator at a temperature of 40°F or below"; freeze if not used in 2 days; thaw in the fridge overnight or sealed in cold water; fresh fish smells mild, not "fishy, sour, or like ammonia" (paraphrase). https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely
    - Why avoiding cross-contamination is important, Food Standards Agency (no washing; separate boards), URL above.
- **cooking:**
  - Note: Cook fish to 145°F / 63°C, or until the flesh is opaque and flakes apart under a fork (the sources say "easily", which the voice guide bans). Pregnant people, young children, older adults and anyone with a weakened immune system should avoid raw or undercooked fish.
  - Citations:
    - Meat, Poultry & Seafood (Food Safety for Moms-to-Be), U.S. Food and Drug Administration: "Finfish should be cooked to an internal temperature of 145° F (63° C)."
    - Safe Food Handling, U.S. Food and Drug Administration: "Fin fish" "145oF or flesh is opaque & separates easily with fork".
    - Selecting and Serving Fresh and Frozen Seafood Safely, U.S. Food and Drug Administration: avoid "Raw or undercooked fish or shellfish" for at-risk groups.
    - Cooking your food, Food Standards Agency: "fish flesh should turn opaque (no longer transparent) and separates easily with a fork".
  - Salt cod: no official source I fetched covers desalting. Soaking in the fridge follows the general 40°F / 4°C rule, but that's inference, so state it without a citation or leave it out.

## 7. Pairings

None of these are in `content/pairings.yaml`; I checked every pair against its `ingredients:` lines. "SI" means southern-italian.

### Anchovy

1. **anchovy + garlic**: tradition.
   - Claim: Anchovies are melted into garlicky oil for Pugliese orecchiette with greens and for puttanesca.
   - Cuisines: SI.
   - Citations:
     - [SP-ore] "Aglio 1 spicchio"; the anchovies "devono disfarsi nell'olio fino a sparire".
     - [DS-put] garlic fried in the oil, then "Mettete nell'olio caldo i pezzetti di alici e attendete che si sciolgano".
2. **anchovy + chile**: tradition.
   - Claim: Dried chile and melted anchovy season the oil for puttanesca and, in some versions, orecchiette.
   - Cuisines: SI.
   - Citations:
     - [DS-put] garlic fried with dried chile in the oil before the anchovy (paraphrase).
     - [SP-ore] variation: "un peperoncino tritato, privato dei semi".
3. **anchovy + tomato**: contrast.
   - Claim: Salty anchovy deepens the quick tomato sauce of puttanesca.
   - Cuisines: SI.
   - Citations:
     - [DS-put] pelati mashed into the anchovy oil (paraphrase).
     - [PN-put] "le acciughe lavate, spinate e tagliate a pezzettini" go into the tomato sauce near the end.
     - Contested: Portanapoli's own recipe leaves them out.
4. **anchovy + parsley**: tradition.
   - Claim: Chopped parsley goes in with the anchovies at the end of a Neapolitan puttanesca.
   - Cuisines: SI.
   - Citations:
     - [PN-put] the anchovies are added at the end of cooking with chopped parsley (paraphrase); "abbondante prezzemolo".
     - [DS-put] parsley added with the olives (paraphrase).
5. **anchovy + cauliflower**: contrast.
   - Claim: Salted anchovies season the boiled cauliflower of Neapolitan insalata di rinforzo.
   - Cuisines: SI.
   - Citations: [PN-rinf] "1 cavolfiore di media dimensione", "6-8 acciughe sotto sale".
6. **anchovy + gremolata**: tradition. See section 5 [SDG1]. No Cuisine tag.

### Red wine vinegar

7. **red-wine-vinegar + green-beans**: contrast.
   - Claim: A splash of red wine vinegar sharpens a Pugliese salad of boiled green beans and potatoes.
   - Cuisines: SI.
   - Citations: [CU] fagiolini, patate, prezzemolo, menta, "aceto di vino rosso".
8. **red-wine-vinegar + potato**: contrast.
   - Claim: Vinegar cuts through boiled potato in the same Pugliese salad.
   - Cuisines: SI.
   - Citations: [CU] as above.
9. **red-wine-vinegar + mint**: aromatic bridge.
   - Claim: Mint and red wine vinegar dress Pugliese bean and potato salad together.
   - Cuisines: SI.
   - Citations: [CU] as above.
   - Scapece (white wine vinegar) supports the mint-and-vinegar pairing generally [FDL1][AE1].
10. **red-wine-vinegar + parsley**: tradition.
    - Claim: Parsley joins mint and red wine vinegar in the Pugliese bean salad.
    - Cuisines: SI.
    - Citations: [CU].
    - Weak, one source. Hold back if you want only 3.

### Epazote

11. **epazote + tomatillo**: tradition.
    - Claim: Epazote is ground with tomatillo for Oaxacan mole verde.
    - Cuisines: oaxacan.
    - Citations:
      - [L-mv] Valles Centrales: "miltomate, chile de agua, clavo, perejil, epazote y hierba santa" (paraphrase of list).
      - [GOB1] "tomate … epazote".
12. **epazote + pork**: tradition.
    - Claim: In the Valles Centrales, mole verde with epazote is often made with pork.
    - Cuisines: oaxacan.
    - Citations:
      - [L-mv] Valles Centrales versions are made with pork or chicken, with pork spine or shank preferred (paraphrase).
      - [GOB1] "epazote, perejil y pierna de cerdo".
13. **epazote + parsley**: aromatic bridge.
    - Claim: Parsley and epazote are two of the herbs that turn Oaxacan mole verde green.
    - Cuisines: oaxacan.
    - Citations: [L-mv], [GOB1] "hoja santa, epazote, perejil".
14. **epazote + green-beans**: tradition.
    - Claim: Green beans cook in the epazote-scented Oaxacan mole verde.
    - Cuisines: oaxacan.
    - Citations:
      - [GOB1] "ejotes, chayote … epazote".
      - [L-mv] ejotes and chayote are sometimes added (paraphrase).
15. **epazote + chicken-thigh**: tradition.
    - Claim: The Mixteca mole verde, usually made with chicken, includes epazote.
    - Cuisines: oaxacan.
    - Citations: [L-mv] Yucanama: usually chicken, with "perejil, epazote", lettuce and hierba santa (paraphrase).
    - Caveat: whole chicken.
16. **epazote + chile**: tradition.
    - Claim: Epazote and green chile de agua season the Valles Centrales mole verde.
    - Cuisines: oaxacan.
    - Citations: [L-mv].

### Beef

17. **beef + onion**: tradition.
    - Claim: Neapolitan genovese cooks beef for hours in about one and a half times its weight in onions.
    - Cuisines: SI.
    - Citations:
      - [PN-gen] "1 Kg di carne di manzo", "1,5 Kg di cipolle", "almeno tre ore".
      - [DS-gen] "1,5 kg di cipolle ogni kg di carne" (veal in her version).
      - [LP-rag] onions in ragù.
18. **beef + tomato**: tradition.
    - Claim: A large piece of beef simmers for hours in Neapolitan ragù, and beef is cooked with tomato in Oaxacan chichilo.
    - Cuisines: SI, oaxacan.
    - Citations:
      - [LP-rag] "manzo", "1 litro e mezzo di passata di pomodoro".
      - [L-chi] beef is the usual meat, and jitomate is a main ingredient (paraphrase).
19. **beef + chile**: tradition.
    - Claim: Oaxacan chichilo is beef in a sauce of dark chilhuacle and pasilla chiles, and grilled tasajo is eaten on tlayudas with pasilla salsa.
    - Cuisines: oaxacan.
    - Citations:
      - [L-chi] "chilhuacle negro, pasilla, mulato y tortillas quemadas".
      - [B-tla] "grilled Oaxacan tasajo"; pasilla salsa "is commonly served with tlayudas".
20. **beef + green-beans**: tradition.
    - Claim: Green beans cook with beef in Oaxacan chichilo.
    - Cuisines: oaxacan.
    - Citations: [L-chi] chayote, ejote, papa and calabacitas cut into pieces (paraphrase).
21. **beef + parsley**: tradition.
    - Claim: Neapolitan braciole roll thin beef around chopped garlic and parsley before they cook in the ragù.
    - Cuisines: SI.
    - Citations: [LP-rag] "aglio e prezzemolo tritati, uvetta e pinoli".
22. **beef + black-pepper**: tradition.
    - Claim: Pepper seasons the filling of Neapolitan braciole and the beef in genovese.
    - Cuisines: SI.
    - Citations: [LP-rag] "sale fino, pepe"; [PN-gen] "sale e pepe".
    - "Pepe" is unspecified; see the caveat in section 1.
23. **beef + gremolata**: contrast. See section 5 [ATK-sr]. No Cuisine tag.

### Black pepper

24. **black-pepper + pork**: tradition.
    - Claim: Black pepper is ground with guajillo chile into the marinade for Oaxacan cecina.
    - Cuisines: oaxacan.
    - Citations:
      - [L-cec] "Cecina de carne de cerdo … chiles guajillos, pimienta negra" (paraphrase of middle).
      - [B-cmp] "1/2 teaspoon ground black pepper".
25. **black-pepper + chile**: aromatic bridge.
    - Claim: Black pepper and dried chiles are ground together for Oaxacan adobos.
    - Cuisines: oaxacan.
    - Citations: [L-cec]; [B-cmp] "guajillo or ancho powdered chile" with black pepper.
26. **black-pepper + garlic**: tradition.
    - Claim: Garlic and black pepper go into the Oaxacan cecina marinade.
    - Cuisines: oaxacan.
    - Citations: [L-cec]; [B-cmp] "8 garlic cloves".
27. **black-pepper + tomatillo**: tradition.
    - Claim: Black pepper is one of the spices in tomatillo-based Oaxacan mole verde.
    - Cuisines: oaxacan.
    - Citations: [L-mv] the general description lists miltomate, garlic, clove and black pepper (paraphrase).
    - Weaker: it's the general description, not a Valles Centrales line.

### Cod

28. **cod + potato**: tradition.
    - Claim: Salt cod is baked on sliced potatoes across southern Italy.
    - Cuisines: SI.
    - Citations:
      - [RCap] "600 gr patate", "tipico di molte regioni del sud Italia".
      - [GMan] adding "400 g di patate" to baccalà alla napoletana.
29. **cod + tomato**: tradition.
    - Claim: In baccalà alla napoletana, fried salt cod finishes in tomato sauce with olives and capers.
    - Cuisines: SI.
    - Citations: [GMan] "polpa di pomodoro", "olive nere", "capperi"; [RCap] cherry tomatoes.
30. **cod + parsley**: tradition.
    - Claim: A coarse mix of parsley, garlic and onion tops Pugliese baked baccalà.
    - Cuisines: SI.
    - Citations: [RCap].
31. **cod + garlic**: tradition.
    - Claim: Garlic seasons both the Neapolitan and the Pugliese baccalà.
    - Cuisines: SI.
    - Citations: [GMan] one clove browned in oil, then removed (paraphrase); [RCap] "1 spicchio di aglio".
32. **cod + chile**: contrast.
    - Claim: A little chile warms the oil for baccalà alla napoletana.
    - Cuisines: SI.
    - Citations: [GMan] "peperoncino", two small pieces browned with the garlic (paraphrase).
    - Single source, author's origin not stated.

### Potato

33. **potato + green-beans**: tradition.
    - Claim: Boiled green beans and potatoes make a common Pugliese summer salad.
    - Cuisines: SI.
    - Citations:
      - [CU].
      - [GG] "un piatto unico di origine contadina della tradizione pugliese" (a peasant one-dish meal of the Pugliese tradition).
34. **potato + mint**: aromatic bridge.
    - Claim: Fresh mint dresses Pugliese potato and green-bean salad.
    - Cuisines: SI.
    - Citations: [CU] "menta"; [GG] mint as an option with basil or oregano (paraphrase).
35. **potato + tomato**: tradition.
    - Claim: Potato gnocchi are baked with tomato and mozzarella alla sorrentina, and Neapolitan pasta e patate cooks potatoes with cherry tomatoes.
    - Cuisines: SI.
    - Citations: [PN-gno] "mozzarella, pomodoro e basilico"; [DS-pp] patate, pomodorini.
36. **potato + basil**: tradition.
    - Claim: Basil finishes gnocchi alla sorrentina.
    - Cuisines: SI.
    - Citations: [PN-gno].
37. **potato + chicken-thigh**: tradition.
    - Claim: Oaxacan mole coloradito is served with chicken and boiled potatoes.
    - Cuisines: oaxacan.
    - Citations: [L-mc] served with chicken or pork and boiled potatoes (paraphrase).
38. **potato + pork**: tradition.
    - Claim: Potatoes cook with pork in Oaxacan mole amarillo and are served with pork in coloradito.
    - Cuisines: oaxacan.
    - Citations: [L-ma] "ejotes, chayotes, calabacitas y papas" with pork or chicken; [L-mc].
39. **potato + lamb**: tradition.
    - Claim: Lamb roasts with potatoes and onions in a terracotta dish in Puglia and Basilicata.
    - Cuisines: SI.
    - Citations: [MGal] lamb, lampascioni, onions and potatoes, baked at 180°C for about two hours (paraphrase).
    - Weak: author unnamed on the page. Hold back unless a better source turns up.

### Green beans

40. **green-beans + tomato**: tradition.
    - Claim: Boiled green beans are tossed in fresh tomato sauce for a Sicilian side dish.
    - Cuisines: SI.
    - Citations: [MB] "Fagiolini: 300 g", "Pomodori piccadilly: 600 g" (paraphrase of list).
41. **green-beans + garlic**: tradition.
    - Claim: The sauce for Sicilian fagiolini al pomodoro starts with garlic in oil.
    - Cuisines: SI.
    - Citations: [MB] "Aglio: 1 clove" (paraphrase).
42. **green-beans + basil**: tradition.
    - Claim: Basil finishes Sicilian green beans in tomato.
    - Cuisines: SI.
    - Citations: [MB].
43. **green-beans + mint**: aromatic bridge.
    - Claim: Mint dresses Pugliese green-bean salad.
    - Cuisines: SI.
    - Citations: [CU]; [GG].
44. **green-beans + pork**: tradition.
    - Claim: Green beans cook with pork leg in the Oaxacan mole verde.
    - Cuisines: oaxacan.
    - Citations: [GOB1] "ejotes … pierna de cerdo"; [L-mv].

### Southern Italian among existing Ingredients

45. **parsley + chile**: tradition.
    - Claim: Chopped parsley and a little chile go into the oil together for Neapolitan spaghetti alle vongole.
    - Cuisines: SI.
    - Citations: [PN2] parsley added with salt and chile; chile "si deve sentire appena" (should be barely noticeable).
46. **mint + garlic**: tradition.
    - Claim: Mint and sliced garlic go into the vinegar for Neapolitan scapece.
    - Cuisines: SI.
    - Citations: [FDL1] "Menta: 1 mazzetto", "Aglio: 2 spicchi"; [LCG-sc]; [AE1] "mint and often garlic".
47. **zucchini + chile**: contrast.
    - Claim: Some Neapolitan cooks add hot chile to the vinegar for zucchine alla scapece.
    - Cuisines: SI.
    - Citations: [LCG-sc] "un peperoncino piccante".
    - Single source.

### Oaxacan among existing Ingredients (from the re-tags)

48. **tomato + chicken-thigh**: tradition.
    - Claim: Oaxacan mole coloradito, made with tomato, is often served with chicken.
    - Cuisines: oaxacan.
    - Citations: [L-mc] "jitomate, ajo, ajonjolí, cebolla"; chicken or pork (paraphrase).
49. **parsley + chicken-thigh**: tradition.
    - Claim: Parsley is one of the herbs in the Mixteca's chicken mole verde.
    - Cuisines: oaxacan.
    - Citations: [L-mv].
50. **zucchini + chile**: the Oaxacan side is weak. Sopa de guías is served with a pasilla salsa [L-sg], but that's a side salsa, so I wouldn't tag oaxacan on Pairing 47.

### Suggested Cuisine additions to existing Pairings (not new Pairings)

- **pork + tomato**, add SI: ragù with pork ribs and tomato [PN-rag][LP-rag].
- **onion + tomato**, add SI: [PN-rag] "2 cipolle medie", "2 litri di passata di pomodoro"; [LP-rag].
- **lamb + onion**, add SI: [SDG-agn] lamb browned with the onion.
- **tomato + chile**, add SI: puttanesca [PN-put][DS-put].

## 8. Citation key

- [AE1] Edward Behr, "Zucchine alla Scapece: Summer Squash…", *The Art of Eating* (Substack; free preview only). https://artofeating.substack.com/p/zucchine-alla-scapece-summer-squash
- [ATK-sr] America's Test Kitchen, "Adobo-Inspired Short Ribs with Black Pepper Gremolata". https://www.americastestkitchen.com/recipes/15356-adobo-inspired-short-ribs-with-black-pepper-gremolata
- [B-cmp] Rick Bayless, "Chile-Marinated Pork, Oaxacan-Style". https://www.rickbayless.com/recipe/chile-marinated-pork-oaxacan-style/
- [B-tla] Rick Bayless, "Tlayuda Oaxaqueña". https://www.rickbayless.com/recipe/tlayuda-oaxaquena/
- [BL-tas] Bricia Lopez and Javier Cabral, *Oaxaca: Home Cooking from the Heart of Mexico*, "Tasajo" (ckbk reference). https://app.ckbk.com/reference/oaxa56523f03s001ss002e024/tasajo
- [CU] Clementina Urbano, "Insalata di fagiolini e patate – ricetta pugliese", Sedicipuglia (2016). https://www.sedicipuglia.it/2016/07/insalata-di-ortaggi-fagiolini-e-patate.html
- [DS1] Rossella Neri, "Pasta alla Norma, la ricetta originale catanese", Dissapore (2024). https://www.dissapore.com/ricette/pasta-alla-norma/
- [DS-gen] Rossella Neri, "Pasta alla genovese, la ricetta originale napoletana", Dissapore (2024). https://www.dissapore.com/ricette/pasta-alla-genovese-ricetta-originale/
- [DS-piz] Dissapore, "Carne alla pizzaiola" (2023). https://www.dissapore.com/ricette/carne-alla-pizzaiola/
- [DS-pp] Chiara Cajelli, "Pasta e patate", Dissapore (2019). https://www.dissapore.com/ricette/pasta-e-patate/
- [DS-put] Dissapore, "Spaghetti alla puttanesca" (2022). https://www.dissapore.com/ricette/spaghetti-puttanescae-perche-si-chiamano-cosi/
- [EU-tas] Fabiola Hidalgo, "Qué es el tasajo, el ingrediente principal de las tlayudas de Oaxaca", El Universal Oaxaca (2025). https://oaxaca.eluniversal.com.mx/mas-de-oaxaca/que-es-el-tasajo-el-ingrediente-principal-de-las-tlayudas-de-oaxaca/
- [FDA1] U.S. Food and Drug Administration, "Selecting and Serving Fresh and Frozen Seafood Safely". https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely
- [FDA2] U.S. Food and Drug Administration, "Safe Food Handling". https://www.fda.gov/food/buy-store-serve-safe-food/safe-food-handling
- [FDA3] U.S. Food and Drug Administration, "Meat, Poultry & Seafood (Food Safety for Moms-to-Be)". https://www.fda.gov/food/people-risk-foodborne-illness/meat-poultry-seafood-food-safety-moms-be
- [FDL1] Fine Dining Lovers (editorial), "Zucchine alla scapece: la ricetta napoletana". https://www.finedininglovers.it/esplora/ricette/zucchine-alla-scapece
- [FDL-tar] Fine Dining Lovers (editorial), "Taralli napoletani" (2022). https://www.finedininglovers.it/esplora/ricette/taralli-napoletani
- [FN-AB] Anne Burrell, "Braised Lamb Shanks", Food Network. https://www.foodnetwork.com/recipes/anne-burrell/braised-lamb-shanks-recipe-3381367
- [FSA1] Food Standards Agency, "Cooking your food" (gov.uk). https://www.gov.uk/government/publications/cooking-your-food/cooking-your-food
- [FSA2] Food Standards Agency, "Why avoiding cross-contamination is important" (gov.uk). https://www.gov.uk/government/publications/why-avoiding-cross-contamination-is-important/why-avoiding-cross-contamination-is-important
- [GG] Graziella Giannuzzi, "Insalata di fagiolini e patate alla pugliese", Cucina con me Graziella. https://www.cucinaconmegraziellaeraffaele.it/insalata-di-fagiolini-e-patate-alla-pugliese/
- [GMan] Giuliana Manca, "Baccalà alla napoletana", La Cucina Imperfetta. https://www.lacucinaimperfetta.com/baccala-alla-napoletana/
- [GOB1] Secretaría de Agricultura y Desarrollo Rural, "Mole verde estilo Oaxaca" (from INPI's *Mulli*). https://www.gob.mx/agricultura/articulos/mole-verde-estilo-oaxaca
- [GOB-q] Secretaría de Agricultura y Desarrollo Rural, "Quelites, el pequeño gran tesoro de la alimentación". https://www.gob.mx/agricultura/articulos/quelites-el-pequeno-gran-tesoro-de-la-alimentacion
- [GS] Giovanni Sole, "Peperoncino e Calabria, storia di un grande amore (nato male)", iCalabresi (2021). https://www.icalabresi.it/cultura/peperoncino-e-calabria-storia-di-un-grande-amore-nato-male/
- [L-cec] Larousse Cocina, *Diccionario enciclopédico de la Gastronomía Mexicana*, "Cecina oaxaqueña". https://laroussecocina.mx/palabra/cecina-oaxaquena/
- [L-chi] Same dictionary, "Chichilo". https://laroussecocina.mx/palabra/chichilo/
- [L-epa] Same dictionary, "Epazote". https://laroussecocina.mx/palabra/epazote/
- [L-ma] Same dictionary, "Mole amarillo". https://laroussecocina.mx/palabra/mole-amarillo/
- [L-mc] Same dictionary, "Mole coloradito". https://laroussecocina.mx/palabra/mole-coloradito/
- [L-mv] Same dictionary, "Mole verde". https://laroussecocina.mx/palabra/mole-verde/
- [L-oax] Same dictionary, "Oaxaca". https://laroussecocina.mx/palabra/oaxaca/
- [L-sg] Same dictionary, "Sopa de guías". https://laroussecocina.mx/palabra/sopa-de-guias/
- [L-tla] Same dictionary, "Tlayuda". https://laroussecocina.mx/palabra/tlayuda/
- [L-vin] Same dictionary, "Vinagre". https://laroussecocina.mx/palabra/vinagre/
- [LCG-sc] La cuoca galante, "Zucchine alla scapece" (Neapolitan food blog). https://lacuocagalante.com/recipe-items/zucchine-alla-scapece/
- [LP-rag] Raffaele Bracale, "Il vero ragù napoletano secondo la tradizione", Luciano Pignataro Wine Blog. https://www.lucianopignataro.it/a/il-vero-ragu-napoletano-secondo-la-tradizione/5668/
- [MB] Maria Bonaccorso, "Fagiolini al pomodoro", Il Cuore in Pentola (Ricette siciliane). https://www.ilcuoreinpentola.it/ricette/ricette-siciliane/contorni-siciliani/fagiolini-al-pomodoro/
- [MGal] Buon Palato (margheritagalanti.org), "Agnello al forno con lampascioni (Puglia)" (2016). https://margheritagalanti.org/2016/12/15/agnello-al-forno-con-lampascioni/
- [PN1] Portanapoli, "Spaghetti aglio, olio e peperoncino". https://www.portanapoli.com/Ita/Cucina/spaghetti_aglio_e_olio.html
- [PN2] Portanapoli, "Spaghetti con le vongole". https://www.portanapoli.com/Ita/Cucina/spaghetti-vongole.html
- [PN-easter] Portanapoli, "The traditional Easter Menu in Naples". https://www.portanapoli.com/en/culinary/easter-menu/
- [PN-gen] Portanapoli, "La genovese (napoletana) – Storia e ricetta". https://www.portanapoli.com/Ita/Cucina/la_genovese.html
- [PN-gno] Portanapoli, "Ricetta gnocchi di patate". https://www.portanapoli.com/Ita/Cucina/ricetta_gnocchi_patate.html
- [PN-put] Portanapoli, "Spaghetti alla puttanesca: storia e leggenda della ricetta". https://www.portanapoli.com/Ita/Cucina/ga_puttanesca.html
- [PN-rag] Portanapoli, "La ricetta del ragù napoletano". https://www.portanapoli.com/Ita/Cucina/ricetta_ragu.html
- [PN-rinf] Portanapoli, "Insalata di rinforzo – Ricetta e significato". https://www.portanapoli.com/Ita/Cucina/insalata_di_rinforzo.html
- [PN-xmas] Portanapoli, "The traditional Neapolitan Christmas Menu". https://www.portanapoli.com/en/culinary/neapolitan-christmas-menu/
- [RC-col] Regione Campania, Assessorato Agricoltura, "Colatura di Alici di Cetara DOP". https://agricoltura.regione.campania.it/tipici/colatura-alici.html
- [RC-colt] Regione Campania, Assessorato Agricoltura, traditional products sheet "Colatura di alici di Cetara". https://agricoltura.regione.campania.it/Tipici/tradizionali/colatura-alici.htm
- [RC2] Regione Campania, "Limone Costa d'Amalfi I.G.P." (batch 1's source; not re-fetched by me, so treat it as batch 1's citation). https://agricoltura.regione.campania.it/tipici/limone-amalfi.html
- [RCap] Rita Caputo, "Baccalà al forno con patate alla salentina", La Cucina Pugliese. https://www.lacucinapugliese.org/baccala-al-forno-con-patate-alla-salentina/
- [SDG1] Massimo D'Alma, "Ossobuco alla milanese: la ricetta scientifica spiegata in 5 punti", Scatti di Gusto. https://www.scattidigusto.it/ossobuco-milanese-ricetta-scientifica
- [SDG-agn] Daniela Persico, "Agnello a Pasqua: la ricetta migliore è con i piselli alla pasqualina", Scatti di Gusto (2012, updated 2026). https://www.scattidigusto.it/agnello-a-pasqua-la-ricetta-migliore-e-con-i-piselli-alla-pasqualina
- [SP-ore] Sonia Peronaci, "Orecchiette con cime di rapa: la ricetta imparata a Bari vecchia". https://www.soniaperonaci.it/orecchiette-con-cime-di-rapa/
- [UIC-epa] UIC Heritage Garden, University of Illinois Chicago, "Epazote (Dysphania ambrosioides)". http://heritagegarden.uic.edu/epazote

## 9. What I couldn't verify

- **Blocked or missing:**
  - Larousse "Tasajo" (registration wall).
  - La Jornada del Campo on epazote (403).
  - NapoliToday on Neapolitan fagiolini al pomodoro (403); its Estatico and Gagliardi cookbook attribution is unverified.
  - Fanpage on Neapolitan Easter (403).
  - Cesarine's Ginosa lamb (429).
  - Fine Dining Lovers' baccalà and impepata pages (404).
- **Red wine vinegar:**
  - Not supported for scapece: my scapece sources use white wine vinegar.
  - Not supported for Oaxacan escabeche: Larousse doesn't list wine vinegar as Mexican, and its "Escabeche" entry gives no vinegar type.
  - The only Southern Italian source is [CU].
- **Black pepper in aglio e olio:** batch 1 cited [PN1] for "some cooks use black pepper instead" of chile. On my fetch, [PN1] doesn't say that. Only [PN2] says "Qualcuno usa anche il pepe" (some also use pepper), of vongole. Batch 1's Chile essay point 3 should be re-checked.
- **Impepata di cozze:** the black-pepper mussel dish is often called Neapolitan, but I found only snippets and blogs. Nothing is cited.
- **Fresh cod in Southern Italy:** every source is salt cod (baccalà). I found nothing on fresh cod, and stockfish (stoccafisso alla messinese) wasn't checked.
- **Beef versus veal:** Neapolitan genovese and pizzaiola are veal in some sources [DS-gen][DS-piz], so the beef claim rests on [PN-gen] and [LP-rag].
- **Lamb with potatoes in Puglia:** only [MGal], whose author isn't named on the page.
- **Oaxacan beef with lime:** I didn't find a source for lime squeezed on tasajo. [B-tla] doesn't mention lime.
- **Epazote quantities and timing:** no fetched source gives how much to use or when to add it.
- **Unsourced tips:**
  - Dressing boiled vegetables warm (red wine vinegar).
  - Grinding pepper coarse (black pepper).
  - Tasting a flake of desalted baccalà (cod).
  - Soaking salt cod in the fridge (cod safety).
- **Gremolata:**
  - Both beef and lamb sources are variants with extra ingredients, not the Milanese mix.
  - Neither explains why gremolata suits braised meat.
  - Nothing found for pork or cod.
- **Calabrian chile IGP:** a search snippet said Peperoncino di Calabria got IGP status in 2026. I didn't verify it and don't cite it.

## 10. Added while authoring

- **White wine vinegar replaces red wine vinegar.** Red wine vinegar had one weak Southern Italian source [CU] and none for Oaxaca, while every scapece source uses white wine vinegar ([FDL1] "Aceto di Vino Bianco: 100 ml"; [LCG-sc] "un bicchiere di aceto di vino bianco"; [AE1] "vinegar"). The content adds White wine vinegar, tagged southern-italian, with Pairings to zucchini, mint and garlic from those sources, and drops the red wine vinegar Pairings.
- **Gremolata** takes the beef [ATK-sr], lamb [FN-AB] and anchovy [SDG1] Pairings from section 5, with no Cuisine tag.
