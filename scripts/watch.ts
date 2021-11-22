import { build as esbuild } from "esbuild";
import type { BuildOptions } from "./helpers";
import { baseOpts } from "./helpers";
import chalk from "chalk";

function watch(format: NonNullable<BuildOptions["format"]>) {
  esbuild({
    format,
    ...baseOpts,
    watch: {
      onRebuild(error, result) {
        if (error) {
          const json = JSON.stringify(error);
          console.error(chalk.red.bold`${json}`);
        } else {
          result?.rebuild?.();
        }
      }
    }
  });
}

watch("esm");
