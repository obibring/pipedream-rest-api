import { O } from "ts-toolbelt";
import type { PaginationResponse } from "../pipedream";
import type { Source } from "../models";

export type Get = {
  Method: Get.Method;
  Pathname: Get.Pathname;
  Response: Get.Response;
};

type BasePath = "/sources";

export declare namespace Get {
  export type Method = "GET";
  export type Pathname = [base: BasePath];
  export type Response = PaginationResponse<Array<Source>>;
}

export type Create = {
  BodyParams: Create.BodyParams;
  Method: Create.Method;
  Pathname: Create.Pathname;
  Response: Create.Response;
};

export declare namespace Create {
  export type BodyParams = O.AtLeast<{
    component_id?: string;
    component_url?: string;
    component_code?: string;
  }> & {
    name?: string;
  };
  export type Method = "POST";
  export type Pathname = [base: BasePath];
  export type Response = PaginationResponse<
    Array<O.Compulsory<Source, "user_id">>
  >;
}

export type Update = {
  Method: Update.Method;
  Params: Update.BodyParams;
  Pathname: Update.Pathname;
  Response: Update.Response;
};

export declare namespace Update {
  export type BodyParams = O.AtLeast<{
    component_id?: string;
    component_url?: string;
    component_code?: string;
  }> & {
    active?: boolean;
    name?: string;
  };
  export type Method = "PUT";
  export type Pathname = [base: BasePath];
  export type Response = PaginationResponse<
    Array<O.Compulsory<Source, "user_id">>
  >;
}

export type Delete = {
  Method: Delete.Method;
  Pathname: Delete.Pathname;
  Response: Delete.Response;
};

export declare namespace Delete {
  export type Method = "DELETE";
  export type Pathname = [base: BasePath, source_id: string];
  export type Response = PaginationResponse<
    Array<O.Compulsory<Source, "user_id">>
  >;
  export type SourceId = string;
}
