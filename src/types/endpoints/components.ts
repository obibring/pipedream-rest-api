import type { O } from "ts-toolbelt";
import type { RouteParam } from "../utils";
import type { Component } from "../models";

export type Create = {
  Pathname: Create.Pathname;
  Params: Create.BodyParams;
  Response: Create.Response;
  Method: Create.Method;
};

/**
 * Create a component via API.
 */
export declare namespace Create {
  export type Pathname = Get.Pathname;
  export type Method = "POST";
  export type BodyParams = O.AtLeast<{
    component_code?: string;
    component_url?: string;
  }>;
  export type Response = {
    data: Component;
  };
}

export type Get = {
  Pathname: Get.Pathname;
  Response: Get.Response;
  Method: Get.Method;
};
/**
 * Create a component via API.
 */
export declare namespace Get {
  export type Pathname = [
    base: `/components`,
    component_id_or_key: RouteParam<string>
  ];
  export type Method = "GET";
  export type Response = {
    data: Component;
  };
}
