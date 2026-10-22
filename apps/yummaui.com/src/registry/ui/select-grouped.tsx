import Select, { type SelectGroup } from "./select";

export default function SelectGrouped() {
  return (
    <Select
      options={categories}
      label="Task Category"
      placeholder="Select category..."
    />
  );
}

const categories: SelectGroup[] = [
  {
    group: "Development",
    items: [
      { label: "Bug", value: "bug" },
      { label: "Feature", value: "feature" },
      { label: "Enhancement", value: "enhancement" },
    ],
  },
  {
    group: "Project",
    items: [
      { label: "Documentation", value: "documentation" },
      { label: "Design", value: "design" },
      { label: "Research", value: "research" },
    ],
  },
];
