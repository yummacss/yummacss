import Combobox, { type ComboboxItem } from "./combobox";

export default function ComboboxHelper() {
  return (
    <Combobox
      items={cities}
      label={
        <>
          City <span className="c:red-5">*</span>
        </>
      }
      placeholder="Search cities"
      description="Start typing to narrow the list."
      emptyMessage="No cities found."
    />
  );
}

const cities: ComboboxItem[] = [
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
