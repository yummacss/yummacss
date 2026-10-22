export const CLI = "yummaui";
export const COMPONENTS_DIR = "components/ui";
export const ALIAS = "@";

export function targetPath(id) {
  return `${COMPONENTS_DIR}/${id}.tsx`;
}

export function importPath(id) {
  return `${ALIAS}/${COMPONENTS_DIR}/${id}`;
}

export function addCommand(id, flags = "") {
  return `${CLI} add ${id}${flags ? ` ${flags}` : ""}`;
}
