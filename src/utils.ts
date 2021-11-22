import type {
  Endpoints,
  OptionalResponseBody,
  EndpointArgs,
  EndpointDefinition
} from "./types";

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
