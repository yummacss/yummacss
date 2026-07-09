import { createConnection, ProposedFeatures } from "vscode-languageserver/node";
import { createServer } from "./index";

const connection = createConnection(
	ProposedFeatures.all,
	process.stdin,
	process.stdout,
);

createServer(connection);
