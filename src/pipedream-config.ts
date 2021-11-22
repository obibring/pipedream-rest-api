import { join } from "path";
import { existsSync } from "fs";
import type { ParsedPipedreamConfig } from "./types/parses-config";
import { parseConfigLineValue, readLinesFromFile } from "./utils";

const DEFAULT_PIPEDREAM_PATH = process.env.XDG_CONFIG_HOME
  ? join(process.env.XDG_CONFIG_HOME, "pipedream")
  : join(process.env.HOME ?? "", ".config", "pipedream", "config");
const HEADING_REGEXP = new RegExp(`^\\[(.+)\\]`);

/**
 * Parses a pipedream config object into a JS object. Profiles
 * are parsed into the `profiles` property, and all other
 * properties are added onto the
 * @returns
 */
export function parseConfig(
  path: string = DEFAULT_PIPEDREAM_PATH
): ParsedPipedreamConfig {
  if (!existsSync(path)) {
    throw new Error(
      `Could not find pipedream config file` +
        `at path ${path}. Pass a customConfigPath to resolve the issue.`
    );
  }
  const lines = readLinesFromFile(path);
  const conf: Record<string, any> = {
    api_key: null,
    profiles: {}
  };
  let currentProfile: string | undefined = undefined;
  const getProfileData = (profile: string) => {
    let data = conf.profiles[profile] || {};
    conf.profiles[profile] = data;
    return data;
  };
  for (const line of lines) {
    if (HEADING_REGEXP.test(line)) {
      const profileName = line.match(HEADING_REGEXP);
      if (profileName) {
        const profile = profileName[1];
        currentProfile = profile;
      }
      continue;
    }
    if (line.includes("=")) {
      const { key, value } = parseConfigLineValue(line);
      let data = currentProfile ? getProfileData(currentProfile) : conf;
      data[key] = value;
    }
  }
  if (typeof conf.api_key !== "string") {
    throw new Error(`Could not parse top level api_key from ${path}.`);
  }
  return conf as ParsedPipedreamConfig;
}
