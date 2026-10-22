import Skeleton from "./skeleton";

const ENTRIES = Array.from({ length: 4 }, (_, i) => ({ id: `activity-${i}` }));

export default function SkeletonActivity() {
  return (
    <div className="d:f fd:c g:4 p:8 h:56">
      {ENTRIES.map((entry, row) => (
        <div key={entry.id} className="d:f ai:c g:4">
          <Skeleton
            shape="circle"
            dimensions="w:9 h:9"
            delay={row * 0.15}
            className="fs:0"
          />
          <div className="d:f fd:c g:1 fg:1">
            <Skeleton dimensions="h:3 w:48" delay={row * 0.15} />
            <Skeleton tone="subtle" dimensions="h:2 w:32" delay={row * 0.15} />
          </div>
        </div>
      ))}
    </div>
  );
}
