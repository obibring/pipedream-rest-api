import type { AxiosPromise } from "axios";
import axios from "axios";
import { toRestApiUrl, stringy } from "./utils";
import type { TArgs, Def, FactoryParam } from "./utils";
import type { Endpoints, OptionalResponseBody } from "./types";

const DEFAULT_BASE_URL = "https://api.pipedream.com/v1";

/**
 * @see https://pipedream.com/docs/api/rest
 */
class PipedreamRestClient<
  Options extends {
    /**
     * The Rest API's base url.
     * @see https://pipedream.com/docs/api/rest/#base-url
     */
    basesUrl?: string;
    /**
     * An Optional profile name for debugging
     */
    profile?: string;
  }
> {
  public readonly apiKey: string;
  public readonly baseUrl: string;
  public readonly profile: Options["profile"];

  constructor(apiKey: string, options?: Options) {
    if (typeof apiKey !== "string" || apiKey.trim() === "") {
      throw new Error(`Pipedream: invalid api key ${stringy(apiKey)}`);
    }
    const baseUrl = options?.basesUrl ?? DEFAULT_BASE_URL;
    if (typeof baseUrl !== "string" || baseUrl.trim() === "") {
      throw new Error(`Pipedream: invalid base url ${stringy(baseUrl)}`);
    }
    this.profile = options?.profile;
    this.apiKey = apiKey;
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }
  /**
   * @see https://pipedream.com/docs/api/rest/#required-headers
   */
  private get headers() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.apiKey}`
    };
  }
  private fetch = <E extends Def>(
    pathParts: string[],
    args: Omit<TArgs<E>, "routeParams">
  ) => {
    const url = toRestApiUrl(this.baseUrl, pathParts, args.queryParams);
    return axios(url, {
      method: args.method,
      headers: this.headers,
      ...(args.bodyParams ? { data: JSON.stringify(args.bodyParams) } : {})
    });
  };

  private fetchFactory<E extends Def, Args extends TArgs<E> = TArgs<E>>(
    pathname: FactoryParam<Args["routeParams"]>
  ) {
    return (args: Args): AxiosPromise<OptionalResponseBody<E>> => {
      const pathParts = Array.isArray(pathname)
        ? [...pathname, ...args.routeParams]
        : pathname(args.routeParams);
      return this.fetch<E>(pathParts, args);
    };
  }
  get workflows() {
    const base: Endpoints.Workflows.Get.Pathname[0] = "/workflows";
    return {
      get: this.fetchFactory<Endpoints.Workflows.Get>((routeParams) => {
        return [...base, ...routeParams];
      })
    };
  }
  get sources() {
    const pathParts: Endpoints.Sources.Get.Pathname = ["/sources"];
    return {
      get: this.fetchFactory<Endpoints.Sources.Get>(pathParts),
      create: this.fetchFactory<Endpoints.Sources.Create>(pathParts),
      update: this.fetchFactory<Endpoints.Sources.Update>(pathParts),
      delete: this.fetchFactory<Endpoints.Sources.Delete>((routeParams) => [
        ...pathParts,
        ...routeParams
      ])
    };
  }
  get components() {
    const base: Endpoints.Components.Get.Pathname[0] = "/components";
    return {
      get: this.fetchFactory<Endpoints.Components.Get>((routeParams) => [
        base,
        ...routeParams
      ]),
      create: this.fetchFactory<Endpoints.Components.Create>((routeParams) => [
        base,
        ...routeParams
      ])
    };
  }
  private get orgSubscritions() {
    const base: Endpoints.Organizations.Subscription.Get.Pathname[0] = "/orgs";
    const suffix: Endpoints.Organizations.Subscription.Get.Pathname[2] =
      "/subscriptions";
    return {
      get: this.fetchFactory<Endpoints.Organizations.Subscription.Get>(
        ([org_id]) => [base, org_id, suffix]
      ),
      listenDelete:
        this.fetchFactory<Endpoints.Organizations.Subscription.ListenDelete>([
          base
        ]),
      listenCreate:
        this.fetchFactory<Endpoints.Organizations.Subscription.ListenCreate>([
          base
        ])
    };
  }
  public get organizations() {
    return {
      subscriptions: this.orgSubscritions
    };
  }
}

export default PipedreamRestClient;
