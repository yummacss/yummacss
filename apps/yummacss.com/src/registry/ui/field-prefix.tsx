import Field from "./field";

export default function FieldPrefix() {
  return (
    <Field
      label="Custom domain"
      placeholder="yummacss.com/ui"
      prefixNode="https://"
    />
  );
}
