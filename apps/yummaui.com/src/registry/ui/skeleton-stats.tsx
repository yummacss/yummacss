import Skeleton from "./skeleton";

const CARDS = Array.from({ length: 3 }, (_, i) => ({ id: `card-${i}` }));

export default function SkeletonStats() {
  return (
    <div className="d:f g:6 p:8 h:56">
      {CARDS.map((card, column) => (
        <div key={card.id} className="d:f fd:c ai:c jc:c g:3 fg:1">
          <Skeleton
            shape="block"
            dimensions="w:10 h:10"
            delay={column * 0.15}
          />
          <Skeleton dimensions="h:6 w:16" delay={column * 0.15} />
          <Skeleton tone="subtle" dimensions="h:3 w:12" delay={column * 0.15} />
        </div>
      ))}
    </div>
  );
}
