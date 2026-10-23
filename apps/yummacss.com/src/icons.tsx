import type { Icon, IconProps } from "@phosphor-icons/react";
import {
	ArrowCounterClockwiseIcon,
	ArrowElbowDownLeftIcon,
	ArrowUpRightIcon,
	BookOpenIcon,
	CaretDownIcon,
	CaretLeftIcon,
	CaretRightIcon,
	CaretUpIcon,
	CheckIcon,
	CopyIcon,
	CubeIcon,
	DiamondIcon,
	FileIcon,
	FileMdIcon,
	FolderIcon,
	MagnifyingGlassIcon,
	PlusIcon,
	SignOutIcon,
	SlidersHorizontalIcon,
	TerminalWindowIcon,
	TextTIcon,
	TwitterLogoIcon,
} from "@phosphor-icons/react/ssr";

type Props = Omit<IconProps, "weight">;

// Regular weight: at 16px its 1px strokes sit on the pixel grid, where duotone's
// fill blurs every edge. See the notes, "Icons at 16px".
const regular = (Glyph: Icon) => {
	const Regular = (props: Props) => <Glyph weight="regular" {...props} />;
	return Regular;
};

export const ArrowUpRight = regular(ArrowUpRightIcon);
export const Check = regular(CheckIcon);
export const ComponentSolid = regular(CubeIcon);
export const Copy = regular(CopyIcon);
export const Diamond = regular(DiamondIcon);
export const FileMd = regular(FileMdIcon);
export const Folder = regular(FolderIcon);
export const LogOut = regular(SignOutIcon);
export const LongArrowDownLeftSolid = regular(ArrowElbowDownLeftIcon);
export const NavArrowDown = regular(CaretDownIcon);
export const NavArrowLeft = regular(CaretLeftIcon);
export const NavArrowRight = regular(CaretRightIcon);
export const NavArrowUp = regular(CaretUpIcon);
export const OpenBook = regular(BookOpenIcon);
export const Page = regular(FileIcon);
export const Plus = regular(PlusIcon);
export const Search = regular(MagnifyingGlassIcon);
export const Sliders = regular(SlidersHorizontalIcon);
export const Terminal = regular(TerminalWindowIcon);
export const TextLayer = regular(TextTIcon);
export const Twitter = regular(TwitterLogoIcon);
export const Undo = regular(ArrowCounterClockwiseIcon);
