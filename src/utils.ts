import type { EndpointArgs, EndpointDefinition } from "./types";
import { readFileSync } from "fs";

export function isObj(t: unknown): t is Record<string, any> {
  return t != null && typeof t === "object";
}
export function isStr(t: unknown): t is string {
  return typeof t === "string";
}

export function toRestApiUrl(
  baseUrl: string,
  pathParts: string[],
  queryParams:
    | undefined
    | Record<string, string | number | number[] | boolean | string[]>
) {
  const path = pathParts.join("/").replace(/\/\//g, "/"); // fix any double-slashes.
  const qs = queryParams
    ? Object.keys(queryParams)
        .reduce((fields, name) => {
          const rawValue = queryParams[name];
          const value = Array.isArray(rawValue)
            ? rawValue.map((v) => String(v)).join(",")
            : rawValue;
          return [...fields, `${name}=${encodeURIComponent(value)}`];
        }, [] as string[])
        .join("&")
    : "";
  return baseUrl + path + (qs !== "" ? `?${qs}` : qs);
}

export const stringy = JSON.stringify;
export type Def = EndpointDefinition;
export type TArgs<T extends Def> = EndpointArgs<T>;
export type FactoryParam<RouteParams> =
  | string[]
  | ((routeParams: RouteParams) => [...route_parts: string[]]);

export const parseConfigLineValue = (
  line: string
): { key: string; value: string } => {
  const [key, value] = line.split("=").map((s) => s.trim());
  return { key, value };
};

export const readLinesFromFile = (path: string) =>
  readFileSync(path, { encoding: "utf-8" })
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");
