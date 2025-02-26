import axios, { AxiosError, AxiosInstance } from "axios";
import { APIServiceError } from "@/services/ApiServiceError";

interface ErrorResponseData {
  code: string;
  message: string;
}

class APIService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:3000",
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
        console.log(
          `Calling API: ${this.api.defaults.baseURL}${endpoint}, Method: ${method}`
        );
        console.log("....", endpoint);
        response = await this.api.get(endpoint, {
          headers: {
            Accept: "application/json",
          },
        });

        console.log("Response headers:", response.headers);
        console.log("Response type:", response.headers["content-type"]);
      }

      return Promise.resolve(response.data);
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.message, "error message");
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
