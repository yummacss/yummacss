import Autocomplete, { type AutocompleteItem } from "./autocomplete";

export default function AutocompleteHelper() {
  return (
    <Autocomplete
      items={cities}
      label={
        <>
          City <span className="c:red-5">*</span>
        </>
      }
      placeholder="Search cities"
      description="Start typing to narrow the list."
    />
  );
}

const cities: AutocompleteItem[] = [
  "Athens",
  "Berlin",
  "Cairo",
  "Dakar",
  "Helsinki",
  "Lisbon",
  "Nairobi",
  "Osaka",
  "Quito",
  "Reykjavik",
  "Seville",
  "Valparaiso",
].map((label) => ({ label }));
