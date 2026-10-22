export default function PropDescription({ text }: { text?: string }) {
  if (!text) return null;

  return (
    <>
      {text
        .split("`")
        .map((value, index) => ({
          id: `${index}-${value}`,
          value,
          code: index % 2,
        }))
        .map((segment) =>
          segment.code ? (
            <code key={segment.id} className="c:code fs:sm ff:m">
              {segment.value}
            </code>
          ) : (
            segment.value
          ),
        )}
    </>
  );
}
