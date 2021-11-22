import type { PaginationResponse } from "../../pipedream";
import type { RouteParam } from "../../utils";
import type { Subscription } from "../../models";

type ComponentId = string;

export type Get = {
  Response: Get.Response;
  Method: Get.Method;
  Pathname: Get.Pathname;
};
/**
 * Create a component via API.
 */
export declare namespace Get {
  export type Pathname = [
    base: "/orgs",
    org_id: RouteParam<string>,
    suffix: "/subscriptions"
  ];
  export type Method = "GET";
  export type Response = PaginationResponse<Array<Subscription>>;
}

export type ListenCreate = {
  Pathname: ListenCreate.Pathname;
  Method: ListenCreate.Method;
  QueryParams: ListenCreate.QueryParams;
};
type ListenerEventType = "$errors" | "default" | "$logs";
type ComponetIdOrIdGlob = string | `*${string}*` | `${string}*` | `*${string}`;
/**
 * Assign a source to listen for events from another workflow or source.
 */
export declare namespace ListenCreate {
  export type Pathname = ["/subscriptions"];
  export type Method = "POST";
  export type QueryParams = {
    emitter_id: ComponetIdOrIdGlob;
    event_name?: ListenerEventType;
    listener_id: ComponetIdOrIdGlob;
  };
}

/**
 * Automatically assign a source to listen for events from another workflow or source
 * based on event name.
 */
export declare namespace AutosubscribeCreate {
  export type Pathname = ["/auto_subscriptions"];
  export type Method = "POST";
  export type ComponetId = string;
  export type QueryParams = {
    event_name?: ListenerEventType;
    listener_id: ComponentId;
  };
}

export type ListenDelete = {
  Pathname: ListenDelete.Pathname;
  Method: ListenDelete.Method;
  QueryParams: ListenDelete.QueryParams;
};

export declare namespace ListenDelete {
  export type Pathname = ListenCreate.Pathname;
  export type Method = "DELETE";
  export type ComponetId = string;
  export type QueryParams = {
    emitter_id: ComponetIdOrIdGlob;
    event_name: string;
    listener_id: ComponentId;
  };
}
