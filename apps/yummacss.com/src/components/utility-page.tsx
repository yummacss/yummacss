import type { ComponentType, ReactNode } from "react";
import Baseline from "@/components/baseline";
import Reference, { Variants } from "@/components/reference";
import { useMDXComponents } from "@/mdx-components";
import type { Category } from "@/utils/yummacss";

interface Props {
	page: {
		category: string;
		baseline: string;
		tables: (string | string[])[];
		variants: string;
		negative?: boolean;
	};
}

/** A utility page from the table, laid out as its MDX file would be. */
export default function UtilityPage({ page }: Props) {
	// the page's own heading, so it gets the same anchor & style as an MDX `##`
	const H2 = useMDXComponents().h2 as ComponentType<{ children: ReactNode }>;
	const category = page.category as Category;

	return (
		<>
			<Baseline path={page.baseline} />
			{page.tables.map((table) =>
				Array.isArray(table) ? (
					<Reference key={table[0]} category={category} names={table} />
				) : (
					<Reference key={table} category={category} name={table} />
				),
			)}
			<H2>Variants</H2>
			<Variants
				category={category}
				name={page.variants}
				negative={page.negative}
			/>
		</>
	);
}
