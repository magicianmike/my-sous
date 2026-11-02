import type { Metadata } from "next";
import { PantryEditor } from "./pantry-editor";

export const metadata: Metadata = { title: "Pantry" };

export default function PantryPage() {
  return (
    <>
      <h1>Your Pantry</h1>
      <p>
        What you have on hand. MySous puts what you can make now first, and says what you&rsquo;d need for
        the rest.
      </p>
      <PantryEditor />
    </>
  );
}
