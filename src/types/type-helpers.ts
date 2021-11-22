import type { L } from "ts-toolbelt";
export type Path = `/${string}`;

export type RouteParam<T> = T;
export type FromRouteParam<T> = T extends RouteParam<infer Value>
  ? Value
  : never;

export type OptionalQueryParams<
  T extends { QueryParams?: Record<string, string> }
> = T extends {
  QueryParams: infer Value;
}
  ? { queryParams: Value & CommonParams }
  : { queryParams?: undefined | CommonParams };
export type OptionalBodyParams<T extends { BodyParams?: any }> = T extends {
  BodyParams: infer Value;
}
  ? { bodyParams: Value }
  : { bodyParams?: undefined };
type _OptionalRouteParams<T extends ReadonlyArray<RouteParam<any>>> =
  L.Length<T> extends 0
    ? { routeParams?: undefined }
    : {
        routeParams: { [index in keyof T]: FromRouteParam<T[index]> };
      };
export type OptionalRouteParams<
  T extends { Pathname?: Array<Path | RouteParam<any>> }
> = T extends { Pathname: Array<Path | RouteParam<any>> }
  ? _OptionalRouteParams<L.Filter<T["Pathname"], Path>>
  : never;

export type FromCommonParams<T> = T extends CommonParams
  ? Omit<T, "fields" | "include" | "exclude"> & {
      include?: string;
      exclude?: string;
      fields?: string;
    }
  : T;
export type CommonParams = {
  before?: string; // End cursor
  after?: string; // Begin cursor
  limit?: number;
  fields?: string[];
  include?: string[];
  exclude?: string[];
};
