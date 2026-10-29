import type { Metadata } from "next";
import { SuggestionList } from "./suggestion-list";

export const metadata: Metadata = { title: "What to make" };

export default function SuggestionsPage() {
  return (
    <>
      <h1>What to make</h1>
      <SuggestionList />
    </>
  );
}
