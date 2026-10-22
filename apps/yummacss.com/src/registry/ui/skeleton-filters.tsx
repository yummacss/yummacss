import Skeleton from "./skeleton";

export default function SkeletonFilters() {
  return (
    <div className="d:f fd:c g:4 p:8 h:56">
      <Skeleton shape="block" dimensions="h:10 w:100%" />
      <div className="d:f g:2">
        <Skeleton shape="circle" dimensions="h:6 w:16" delay={0.05} />
        <Skeleton shape="circle" dimensions="h:6 w:20" delay={0.1} />
        <Skeleton shape="circle" dimensions="h:6 w:14" delay={0.15} />
      </div>
      <Skeleton tone="subtle" dimensions="h:3 w:24" delay={0.2} />
      <div className="d:f ai:c g:4">
        <Skeleton
          shape="block"
          dimensions="w:9 h:9"
          delay={0.25}
          className="fs:0"
        />
        <div className="d:f fd:c g:1 fg:1">
          <Skeleton dimensions="h:3 w:48" delay={0.25} />
          <Skeleton tone="subtle" dimensions="h:2 w:32" delay={0.25} />
        </div>
      </div>
    </div>
  );
}
