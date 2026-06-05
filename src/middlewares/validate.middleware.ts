import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

interface ValidationSchemas {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
}

export function validate({ body, params, query }: ValidationSchemas) {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.validated = {
      body: body?.parse(req.body),
      params: params?.parse(req.params),
      query: query?.parse(req.query),
    };

    next();
  };
}
