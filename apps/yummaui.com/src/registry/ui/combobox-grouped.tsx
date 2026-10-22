import Combobox, { type ComboboxGroup } from "./combobox";

export default function ComboboxGrouped() {
  return (
    <Combobox
      items={cityGroups}
      label="Advanced search"
      placeholder="Search by city or country"
      emptyMessage="No cities found."
    />
  );
}

const cityGroups: ComboboxGroup[] = [
  {
    group: "Europe",
    items: [
      { label: "Athens", description: "Greece" },
      { label: "Berlin", description: "Germany" },
      { label: "Lisbon", description: "Portugal" },
    ],
  },
  {
    group: "Africa",
    items: [
      { label: "Cairo", description: "Egypt" },
      { label: "Dakar", description: "Senegal" },
      { label: "Nairobi", description: "Kenya" },
    ],
  },
  {
    group: "Asia",
    items: [
      { label: "Osaka", description: "Japan" },
      { label: "Seoul", description: "South Korea" },
      { label: "Taipei", description: "Taiwan" },
    ],
  },
];
