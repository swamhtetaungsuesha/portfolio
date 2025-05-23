import { NextApiRequest } from "next";

export interface ExtendedNextApiRequest<T> extends NextApiRequest {
  body: T;
}
