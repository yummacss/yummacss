import { visit } from "unist-util-visit";

const KINDS = new Set(["note", "warning"]);

export default function remarkAdmonition() {
	return (tree) => {
		visit(tree, "containerDirective", (node) => {
			if (!KINDS.has(node.name)) return;

			const [first] = node.children;
			const labelled = first?.data?.directiveLabel === true;
			const title = labelled ? toText(first) : undefined;

			if (labelled) node.children = node.children.slice(1);

			node.data = {
				...node.data,
				hName: "Admonition",
				hProperties: { kind: node.name, ...(title ? { title } : {}) },
			};
		});
	};
}

function toText(node) {
	if (node.value) return node.value;
	return (node.children ?? []).map(toText).join("");
}
