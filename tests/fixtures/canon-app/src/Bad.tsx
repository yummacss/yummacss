export function Bad() {
	const foreignClass = "unused-string with-hyphens";
	return (
		<div className="gap-4 items-center docs-card d-f">
			<span className="c-white">{foreignClass}</span>
		</div>
	);
}
