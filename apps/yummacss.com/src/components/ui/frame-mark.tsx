/** A registration mark, centered on a point where two divider lines cross. */
export default function FrameMark({ className = "" }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 11 11"
			aria-hidden="true"
			className={`p:a zi:10 w:2 h:2 c:accent-dim pe:none ${className}`}
		>
			<path d="M5.5 0v11M0 5.5h11" stroke="currentColor" />
			<circle
				cx="5.5"
				cy="5.5"
				r="2"
				className="f:page"
				stroke="currentColor"
			/>
		</svg>
	);
}

/** The mark where the right column's line meets the navbar's, held there as the page scrolls. */
export function NavbarCrossing() {
	return (
		<div className="d:none p:st t:12 zi:20 h:0 @lg:d:b">
			<FrameMark className="t:-1 l:-1" />
		</div>
	);
}
