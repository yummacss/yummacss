import {
	IconArrowBackUp,
	IconArrowUpRight,
	IconBook,
	IconBrandGithub,
	IconBrandX,
	IconCheck,
	IconChevronDown,
	IconChevronLeft,
	IconChevronRight,
	IconChevronUp,
	IconCopy,
	IconCornerDownLeft,
	IconCube,
	IconDiamond,
	IconFile,
	IconFolder,
	IconLetterT,
	IconLogout,
	IconMarkdown,
	IconPlus,
	IconSearch,
	IconSettings2,
	IconTerminal2,
	type Icon,
	type IconProps,
} from "@tabler/icons-react";

// a 1.5 stroke: Tabler's 2 reads heavy at 16px. See the notes, "Icons at 16px".
const line = (Glyph: Icon) => {
	const Line = (props: IconProps) => <Glyph stroke={1.5} {...props} />;
	return Line;
};

export const ArrowUpRight = line(IconArrowUpRight);
export const Check = line(IconCheck);
export const ComponentSolid = line(IconCube);
export const Copy = line(IconCopy);
export const Diamond = line(IconDiamond);
export const FileMd = line(IconMarkdown);
export const Folder = line(IconFolder);
export const GitHub = line(IconBrandGithub);
export const LogOut = line(IconLogout);
export const LongArrowDownLeftSolid = line(IconCornerDownLeft);
export const NavArrowDown = line(IconChevronDown);
export const NavArrowLeft = line(IconChevronLeft);
export const NavArrowRight = line(IconChevronRight);
export const NavArrowUp = line(IconChevronUp);
export const OpenBook = line(IconBook);
export const Page = line(IconFile);
export const Plus = line(IconPlus);
export const Search = line(IconSearch);
export const Settings = line(IconSettings2);
export const Terminal = line(IconTerminal2);
export const TextLayer = line(IconLetterT);
export const Twitter = line(IconBrandX);
export const Undo = line(IconArrowBackUp);
