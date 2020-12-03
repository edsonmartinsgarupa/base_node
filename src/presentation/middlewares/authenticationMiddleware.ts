import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';

import ApplicationError from '../../domain/shared/object_values/ApplicationError';
import APIResponse from '../dto/APIResponse';

function authenticationMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
): Response | void {
  const { authorization } = request.headers;

  if (!authorization) {
    return response
      .status(401)
      .json(
        APIResponse.withError(
          new ApplicationError(
            'middleware > autenticação',
            'TOKEN_NAO_ENVIADO',
            401,
            []
          )
        )
      );
  }

  const [, token] = authorization.split(' ');

  if (token !== process.env.TOKEN_APP) {
    return response
      .status(401)
      .json(
        APIResponse.withError(
          new ApplicationError(
            'middleware > Autenticação',
            'TOKEN_INVALIDO',
            401,
            []
          )
        )
      );
  }

  return next();
}

export default authenticationMiddleware;
