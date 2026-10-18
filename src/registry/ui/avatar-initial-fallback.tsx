import Avatar, { type AvatarProps } from "./avatar";

export default function AvatarFallbackInitial() {
  return (
    <div className="d:f ai:c g:4">
      {tints.map((tint) => (
        <Avatar key={tint} fallback="ME" tint={tint} />
      ))}
    </div>
  );
}

const tints: NonNullable<AvatarProps["tint"]>[] = ["blue", "mint", "indigo"];
