import { HTTPStatusCode } from "../constants/constants";

export default class TechnicalError extends Error {
  statuscode: number;
  message: string;
  public constructor(message = "Internal Server Error") {
    super(message);
    this.statuscode = HTTPStatusCode.INTERNAL_SERVER_ERROR;
    this.message = message;
  }
}
