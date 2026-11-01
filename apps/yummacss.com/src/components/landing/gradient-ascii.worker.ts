import { type Input, mount, type Settings } from "./gradient-ascii-render";

type Init = {
	type: "init";
	canvas: OffscreenCanvas;
	settings: Settings;
	reduce: boolean;
};

let renderer: ReturnType<typeof mount> = null;

self.onmessage = (event: MessageEvent<Init | Input>) => {
	const message = event.data;
	if (message.type === "init")
		renderer = mount(message.canvas, message.settings, message.reduce);
	else renderer?.send(message);
};
