import { build as esbuild } from "esbuild";
import { join } from "path";
import type { BuildOptions, Format } from "./helpers";
import { baseOpts, formats, BUILD_DIR } from "./helpers";

const format: Format = process.argv[2] as string as Format;

if (formats.indexOf(format) === -1) {
  const str = formats.map((f) => `"${f}"`).join(", ");
  throw new Error(`Invalid format! Expected one of ${str}`);
}

function build(format: NonNullable<BuildOptions["format"]>) {
  esbuild({
    ...baseOpts,
    outfile: join(BUILD_DIR, `index.${format}.js`),
    format
  });
}

build(format);
