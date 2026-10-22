/** The text with the first run of the query in the accent. */
export default function Match({
  text,
  query,
}: {
  text: string;
  query: string;
}) {
  const at = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1;
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="c:accent">{text.slice(at, at + query.length)}</span>
      {text.slice(at + query.length)}
    </>
  );
}
