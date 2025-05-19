import { APIServiceError } from "@/services/ApiServiceError";
import axios, { AxiosError, AxiosInstance } from "axios";

class APIService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  async call(endpoint: string, method: string, payload: unknown = "<BLANK>") {
    try {
      let response;
      this.api.defaults.headers.common["Content-Type"] = "application/json";

      if (method === "POST") {
        response = await this.api.post(endpoint, payload);
      } else {
        response = await this.api.get(endpoint, {
          headers: {
            Accept: "application/json",
          },
        });
      }

      return Promise.resolve(response.data);
    } catch (e) {
      const error = e as AxiosError;
      if (error.response && error.code && error.message) {
        throw new APIServiceError(
          error.response.status,
          error.code,
          error.message
        );
      } else {
        throw new APIServiceError(
          500,
          "UNKNOWN_ERROR",
          "Unknown error occurred."
        );
      }
    }
  }
}

export default new APIService();
