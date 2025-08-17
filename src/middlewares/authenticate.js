import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    next(createHttpError(401, 'Please provide Authorization header.'));
    return;
  }

  const [bearer, accessToken] = authorization.split(' ');
  if (bearer !== 'Bearer' || !accessToken) {
    next(createHttpError(401, 'Authorization header must be of type Bearer'));
    return;
  }

  const session = await SessionsCollection.findOne({ accessToken });
  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);
  if (isAccessTokenExpired) {
    next(createHttpError(401, 'Access token expired.'));
  }

  const user = await UsersCollection.findOne({ _id: session.userId });
  if (!user) {
    next(createHttpError(401, 'User not found'));
    return;
  }

  req.user = user;

  next();
};
