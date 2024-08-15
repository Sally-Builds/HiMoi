import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../helpers/lib/App';
import { UserModel } from '../models';
import { Token, verifyToken } from '../helpers/lib/App';
import jwt from 'jsonwebtoken';
import { UserRole } from '../helpers/constants';

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer')) {
    return next(
      new CustomError({ message: 'Unauthorized Access', code: 401, ctx: { data: 'invalid bearer token' } }),
    );
  }

  let accessToken = bearer.split('Bearer ')[1].trim();
  try {
    const accessPayload: Token | jwt.JsonWebTokenError = await verifyToken(accessToken)

    if (accessPayload instanceof jwt.JsonWebTokenError) {
      return next(new CustomError({ message: 'access token invalid', code: 401, ctx: { data: 'invalid bearer token' } }))
    }

    const user = await UserModel.findOne({ _id: accessPayload.id }, { __v: 0, password: 0 })

    if (!user) {
      return next(new CustomError({ message: 'access token invalid.', code: 401, ctx: { data: 'invalid bearer token' } }))
    }

    req.user = user.toObject({
      transform: (doc, ret) => {
        delete ret.password;
      }
    })
    next()
  } catch (e) {
    next(new CustomError({ message: 'access token invalid', code: 401, ctx: { data: 'invalid bearer token' } }))
  }
}

export function restrictTo(...roles: [UserRole]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) throw new CustomError({ message: 'Forbidden', code: 403 })

    if (!roles.includes(req.user.role)) throw new CustomError({ message: 'Forbidden', code: 403 })

    next()
  }
}