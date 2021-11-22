import type { PaginationResponse } from "../pipedream";
import type { RouteParam } from "../utils";
import type { Workflow } from "../models";

export type Get = {
  Method: Get.Method;
  Pathname: Get.Pathname;
  Response: Get.Response;
};

/**
 * Create a component via API.
 */
export declare namespace Get {
  export type Pathname = [base: "/workflows", workflow_id: RouteParam<string>];
  export type QueryParams = {
    event_summaries?: boolean;
    /**
     * If you're retrieving logger events and need to see
     * the full event data, pass expand="event"
     * @see https://pipedream.com/docs/api/rest/#workflows
     */
    expand?: "event";
  };
  export type Method = "GET";
  export type Response = PaginationResponse<Array<Workflow>>;
}
