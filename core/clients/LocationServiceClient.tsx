// import { headers } from "next/headers";
// import { serialize } from "v8";
// import { unstable_cache } from "next/cache";
import { CacheManager } from "./CacheManager";
class ServerApiError extends Error {
  status: number;
  data: ApiErrorData;

  constructor(data: ApiErrorData, status: number) {
    super(data.message || "---");
    this.status = status;
    this.data = data;
    this.data.isSuccessful = false;
  }
}

class LocationServiceClient {
  baseUrl: string;
  session?: Session;
  private cacheManager = CacheManager.getInstance();

  constructor(session?: Session) {
    this.baseUrl = "https://get.geojs.io";
    this.session = session;
  }

  private buildFullPath(path: string, params?: { [key: string]: any }): string {
    let updatedPath = path;
    if (params) {
      Object.keys(params).forEach((key) => {
        updatedPath = updatedPath.replace("{" + key + "}", params[key]);
      });
    }
    return this.baseUrl + updatedPath;
  }

  private getConfig(): { headers: {} } {
    let config = { headers: {} };
    if (this.session) {
      if (this.session.oAuthToken) {
        // @ts-ignore
        config.headers["Authorization"] = "Bearer " + this.session.oAuthToken;
      }
      // @ts-ignore
      //   config.headers["cid"] = this.session.cid || "";
      //   // @ts-ignore
      //   config.headers["UserCurrencyCode"] =
      //     this.session.userCurrencyCode || "INR";
      //   // @ts-ignore
      //   config.headers["MarketCode"] = this.session.marketCode || "IND";
    }
    return config;
  }

  private handleFetchError(error: any): {
    message: string;
    isSuccessful: boolean;
  } {
    const serverApiError = error as ServerApiError;
    if (serverApiError) {
      return serverApiError.data;
    }
    return {
      message: "There is some error. Please try after sometime.",
      isSuccessful: false,
    };
  }

  public async fetchJsonWithCache<T>(
    fullPath: string,
    config: any
  ): Promise<T> {
    const cacheKey = fullPath;

    const cachedData = this.cacheManager.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    console.log("*****************CALLING API: " + cacheKey);
    const response = await fetch(fullPath, { headers: config.headers });

    if (!response.ok) {
      const apiErrorData = await response.json();
      throw new ServerApiError(apiErrorData, response.status);
    }

    const cacheControl = response.headers.get("Cache-Control");

    let revalidate = null; // Default to no caching if Cache-Control is not present

    if (cacheControl) {
      const maxAgeMatch = cacheControl.match(/max-age=(\d+)/);
      if (maxAgeMatch && maxAgeMatch[1]) {
        const maxAge = parseInt(maxAgeMatch[1], 10);
        revalidate = maxAge * 1000; // Convert seconds to milliseconds
      }
    }

    const data = await response.json();
    data.isSuccessful = true;

    if (revalidate !== null) {
      //console.log("revalidate:" + revalidate);
      this.cacheManager.set(cacheKey, data, revalidate);
    }

    return data;
  }

  private async handleRequest<T>(request: () => Promise<T>): Promise<T> {
    try {
      return await request();
    } catch (error: any) {
      // throw error;
      return null as T;
    }
  }






  async get<T>(
    path: string,
    params?: { [key: string]: any }
  ): Promise<T> {
    const request = async () => {
      const fullPath = this.buildFullPath(path, params);
      const config = this.getConfig();
      return await this.fetchJsonWithCache<T>(fullPath, config);
    };
    //try {
    return await this.handleRequest(request);
    //} catch (error: any) {
    //return T;
    //return this.handleFetchError(error);
    //}
  }





  async post(path: string, data: any): Promise<any> {
    const request = async () => {
      let fullPath = this.baseUrl + path;
      let config = this.getConfig();
      const response = await fetch(fullPath, {
        method: "POST",
        headers: {
          ...config.headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const apiErrorData = await response.json();
        throw new ServerApiError(apiErrorData, response.status);
      }

      const responseData = await response.json();
      responseData.isSuccessful = true;
      return responseData;
    };

    try {
      return await this.handleRequest(request);
    } catch (error: any) {
      return this.handleFetchError(error);
    }
  }

}

export default LocationServiceClient;
