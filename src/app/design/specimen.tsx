"use client";

import { useState } from "react";
import { Button, buttonClass } from "@/components/Button";
import { Chip } from "@/components/Chip";
import { Combobox } from "@/components/Combobox";
import { Disclosure } from "@/components/Disclosure";
import { EmptyMark } from "@/components/EmptyMark";
import { IngredientMark, type IngredientLook } from "@/components/IngredientMark";
import { ListRow } from "@/components/ListRow";
import { MarkGroup } from "@/components/MarkGroup";
import { Panel } from "@/components/Panel";
import { Readiness } from "@/components/Readiness";
import { SegmentedControl } from "@/components/SegmentedControl";
import { Tooltip } from "@/components/Tooltip";
import { Toast } from "@/components/Toast";
import { TrayBar } from "@/components/TrayBar";
import { TrayView } from "@/components/TrayView";
import { palettes } from "@/design/tokens";
import { COMBINATION_LIMIT } from "@/kitchen/kitchen";

export type SpecimenIngredient = IngredientLook;

/** The design system's specimen. Components get fixture props here, never the URL or the Kitchen. */
export function Specimen({ ingredients }: { ingredients: SpecimenIngredient[] }) {
  const [tray, setTray] = useState(ingredients.slice(0, 2));
  const [status, setStatus] = useState("");
  const [chosen, setChosen] = useState("");
  const [segment, setSegment] = useState("all");
  const [lemon, garlic] = [ingredients.find(({ id }) => id === "lemon")!, ingredients.find(({ id }) => id === "garlic")!];

  return (
    <>
      <h1>Design system</h1>
      <p className="muted">
        Every component below gets fixture props, so it renders the same here, in the app and in
        the Case Study.
      </p>

      <h2>Colour</h2>
      <ul className="chips" aria-label="Colour tokens in the current theme">
        {Object.keys(palettes.light).map((token) => {
          const name = token.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
          return (
            <li key={token}>
              <Chip
                leading={<span aria-hidden="true" className="swatch" style={{ background: `var(--${name})` }} />}
              >
                {name}
              </Chip>
            </li>
          );
        })}
      </ul>

      <h2>Type</h2>
      <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-display)", lineHeight: "var(--leading-tight)", margin: 0 }}>
        Lemon
      </p>
      <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", margin: 0 }}>Pairs well with</p>
      <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", margin: 0 }}>Garlic</p>
      <p>Lemon&rsquo;s sharpness cuts through the richness of garlic cooked in oil or butter.</p>
      <p className="muted" style={{ fontSize: "var(--text-sm)" }}>
        Common in Southern Italian cooking.
      </p>

      <h2>Buttons</h2>
      <div className="actions">
        <Button variant="primary">Add</Button>
        <Button>Remove</Button>
        <Button variant="quiet">Remove</Button>
        <Button aria-disabled="true">Undo swap</Button>
        <a href="#buttons" className={buttonClass("primary")}>
          See what to make
        </a>
      </div>

      <h2>Ingredient marks and chips</h2>
      <ul className="chips" aria-label="Ingredient marks">
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            <Chip colour={ingredient.colour} leading={<IngredientMark ingredient={ingredient} size="sm" />}>
              {ingredient.name}
            </Chip>
          </li>
        ))}
      </ul>
      <div className="actions" style={{ marginTop: "var(--space-4)", alignItems: "center" }}>
        <IngredientMark ingredient={lemon} size="lg" />
        <IngredientMark ingredient={lemon} size="md" />
        <IngredientMark ingredient={lemon} size="sm" />
        <Tooltip label={lemon.name}>
          <a href="#tooltip" className="mark-link" aria-label={lemon.name}>
            <IngredientMark ingredient={lemon} size="sm" />
          </a>
        </Tooltip>
      </div>

      <h2>Suggestion parts</h2>
      <p className="muted">
        Whether a Suggestion is ready, and where its Ingredients come from, always in words.
      </p>
      <div className="actions" style={{ alignItems: "center" }}>
        <Readiness missing={0} />
        <Readiness missing={2} />
        <EmptyMark />
      </div>
      <div className="mark-groups" style={{ marginTop: "var(--space-4)" }}>
        <MarkGroup label="Yours" ingredients={[lemon, garlic]} />
        <MarkGroup
          label="Suggested"
          ingredients={ingredients.slice(2, 3)}
          empty={{ count: 1, label: "1 part nothing pairs with yet" }}
        />
      </div>

      <h2>List row and disclosure</h2>
      <ListRow
        mark={<IngredientMark ingredient={garlic} />}
        title={<a href="#list-row">Garlic</a>}
        action={<Button variant="primary">Add<span className="visually-hidden"> Garlic</span></Button>}
      >
        <p>Lemon&rsquo;s sharpness cuts through the richness of garlic cooked in oil or butter.</p>
        <Disclosure summary="More" hiddenSummary="about lemon and garlic">
          <p>Add the lemon off the heat or at the very end.</p>
        </Disclosure>
      </ListRow>

      <h2>Panel</h2>
      <Panel title="Not everything pairs yet" titleId="specimen-panel">
        <p>Chicken thigh and basil don&rsquo;t have a Pairing in MySous.</p>
        <div className="actions">
          <Button variant="primary">Swap basil for cilantro</Button>
        </div>
      </Panel>

      <h2>Basket (Combination tray)</h2>
      <div className="specimen-tray">
        <TrayView
          ingredients={tray}
          titleId="specimen-tray-heading"
          limit={COMBINATION_LIMIT}
          status={status}
          onRemove={(removed) => {
            setTray(tray.filter(({ id }) => id !== removed.id));
            setStatus(`${removed.name} removed from your basket, ${tray.length - 1} of ${COMBINATION_LIMIT}.`);
          }}
          renderName={({ id, name }) => <a href={`/ingredients/${id}`}>{name}</a>}
          action={seeWhatToMake}
        />
      </div>

      <h2>Tray bar</h2>
      <p className="muted">On a phone, the tray docks as this bar and opens as a sheet.</p>
      <div className="specimen-tray">
        <TrayBar
          ingredients={tray}
          limit={COMBINATION_LIMIT}
          onOpen={() => setStatus("The bar opens the tray as a sheet.")}
          action={seeWhatToMake}
        />
      </div>

      <h2>Toast</h2>
      <p className="muted">Shows each Combination change for a few seconds, then fades.</p>
      <Toast message="Garlic added to your basket, 2 of 4." />

      <h2>Segmented control</h2>
      <SegmentedControl
        label="Show Pairings by reason"
        options={[
          { value: "all", label: "All" },
          { value: "contrast", label: "Contrast" },
          { value: "tradition", label: "Tradition" },
        ]}
        value={segment}
        onChange={setSegment}
      />

      <h2>Combobox</h2>
      <Combobox<SpecimenIngredient>
        label="Find an ingredient"
        search={(query) =>
          query.trim() ? ingredients.filter(({ name }) => name.toLowerCase().includes(query.trim().toLowerCase())) : []
        }
        getKey={({ id }) => id}
        getLabel={({ name }) => name}
        onChoose={({ name }) => setChosen(name)}
        countNoun={["ingredient", "ingredients"]}
        noMatch={(query) => `“${query}” isn’t in MySous yet.`}
      />
      {chosen && <p>Chose {chosen}.</p>}
    </>
  );
}

const seeWhatToMake = (
  <a href="#combination-tray" className={buttonClass("primary")}>
    See what to make
  </a>
);
