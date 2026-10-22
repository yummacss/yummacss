import Autocomplete, { type AutocompleteGroup } from "./autocomplete";

export default function AutocompleteGrouped() {
  return (
    <Autocomplete
      items={cityGroups}
      label="Advanced search"
      placeholder="Search by city or country"
    />
  );
}

const cityGroups: AutocompleteGroup[] = [
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
