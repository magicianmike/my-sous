import { CombinationLink } from "./combination";

export default function NotFound() {
  return (
    <>
      <h1>This isn’t in MySous yet</h1>
      <p>
        MySous covers a curated set of ingredients, and this one isn’t among them yet.{" "}
        <CombinationLink href="/">Find an ingredient that is</CombinationLink>.
      </p>
    </>
  );
}
