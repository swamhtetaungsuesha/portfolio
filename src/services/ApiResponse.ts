import { NextApiResponse } from "next";

type SuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
};
type ErrorResponse = {
  success: false;
  message: string;
};
export type ResponseData<T> = SuccessResponse<T> | ErrorResponse;

export type ExtendedNextApiReponse<T> = NextApiResponse<ResponseData<T>>;
