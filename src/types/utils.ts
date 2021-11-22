import type {
  Path,
  RouteParam,
  OptionalQueryParams,
  OptionalBodyParams,
  OptionalRouteParams
} from "./type-helpers";
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface EndpointDefinition {
  Method: HttpMethod;
  Pathname: Array<Path | RouteParam<any>>;
  QueryParams?: Record<string, string>;
  BodyParams?: object;
  Response?: unknown;
}

export type EndpointArgs<E extends EndpointDefinition> = {
  method: E["Method"];
} & OptionalQueryParams<E> &
  OptionalBodyParams<E> &
  OptionalRouteParams<E>;

export type {
  CommonParams,
  FromCommonParams,
  Path,
  RouteParam
} from "./type-helpers";

export type OptionalResponseBody<T extends { Response?: any }> = T extends {
  Body: infer Value;
}
  ? Value
  : never;
