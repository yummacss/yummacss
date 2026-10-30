declare module "wawoff2/decompress" {
	/** A woff2 file as TrueType bytes. */
	export default function decompress(woff2: Uint8Array): Promise<Uint8Array>;
}
