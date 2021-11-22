import { resolve, join } from "path";
import { existsSync, readFileSync } from "fs";

const DEFAULT_PIPEDREAM_PATH = join(".config", "pipedream", "config");

/**
 * Extracts the api key from the Pipedream config file, optionally
 * for a specific profile.
 */
export function readApiKey(
  profile: string,
  customConfigPath?: string
): { api_key: string; org_id: string };
export function readApiKey(
  profile: undefined,
  customConfigPath?: string
): { api_key: string; org_id: undefined };
export function readApiKey(): { api_key: string; org_id: undefined };
export function readApiKey(profile?: string, customConfigPath?: string) {
  if (typeof profile === "string" && profile.trim() === "") {
    console.warn(`Received an empty profile string. Using default api_key.`);
  }
  const home = process.env.HOME as string;
  if (!customConfigPath && !home) {
    throw new Error(
      `process.env.HOME is not set and a customConfigPath was not provided.`
    );
  }
  const configPath =
    customConfigPath ?? resolve(join(home, DEFAULT_PIPEDREAM_PATH));
  if (!existsSync(configPath)) {
    throw new Error(
      `Could not find pipedream config file` +
        `at path ${configPath}. Pass a customConfigPath to resolve the issue.`
    );
  }
  const lines = readFileSync(configPath, { encoding: "utf-8" })
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");
  console.log("\n\n", lines.join("\n"), "\n\n");
  const api_key_regexp = /api_key\s*=\s*[a-zA-Z0-9]+/;
  const org_id_key_regexp = /org_id\s*=\s*[a-zA-Z0-9_]+/;
  const getProfileRegex = (name?: string) =>
    new RegExp(`\\[${name ?? ".+"}\\]`);
  const parseConfigValue = (line: string): string => {
    const [_, api_key] = line.split("=").map((s) => s.trim());
    return api_key;
  };
  const anyProfileStartRegex = getProfileRegex();
  if (typeof profile === "string" && profile !== "") {
    const targetProfileRegex = getProfileRegex(profile);
    let inProfileScope = false;
    let [api_key, org_id] = [undefined, undefined] as [
      string | undefined,
      string | undefined
    ];
    for (const line of lines) {
      if (!inProfileScope && !targetProfileRegex.test(line)) {
        continue;
      }
      if (targetProfileRegex.test(line)) {
        inProfileScope = true;
        continue;
      } else if (inProfileScope && anyProfileStartRegex.test(line)) {
        inProfileScope = false;
        continue;
      }
      if (api_key_regexp.test(line)) {
        api_key = parseConfigValue(line);
      } else if (org_id_key_regexp.test(line)) {
        org_id = parseConfigValue(line);
      }
      if (api_key && org_id) {
        return { api_key, org_id };
      }
    }
  } else {
    const anyProfileRegex = getProfileRegex();
    let skip = false;
    for (const line of lines) {
      if (anyProfileRegex.test(line)) {
        skip = true;
      }
      if (!skip && api_key_regexp.test(line)) {
        return { api_key: parseConfigValue(line), org_id: undefined };
      }
    }
  }
  throw new Error(
    `Could not find piepdream api key.` + `Config file:\n\n` + lines.join("\n")
  );
}
