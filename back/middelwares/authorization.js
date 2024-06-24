import jwt from "jsonwebtoken";
import HttpError from "http-errors";

const { JWT_SECRET } = process.env;

const EXCLUDES = [
  'POST:/users/register',
  'POST:/users/login',
  'POST:/users/admin-login',
  'POST:/users/activate',
  'POST:/users/send-password-recovery-code',
  'POST:/users/validate-password-recovery-code',
  'POST:/users/password-update',
  'GET:/works/list',
  'GET:/works/get-by-id',
  'GET:/contacts/list',
  'GET:/partners/list',
  'GET:/prices/list',
  'GET:/packages/list',
  'GET:/login-image/list',
  'GET:/services/list',
  'GET:/histories/list',
  'GET:/projects/list',
  'GET:/projects/list-to-ended',
  'GET:/projects/list-to-pending',
  'GET:/galleries/list',
  'GET:/video-path/list',
  'GET:/banner/list',
  'GET:/cars/list',
  'GET:/cars/get-by-id',
  'GET:/our-advantages/list',
  'GET:/our-advantages-taxi/list',
];

export default function authorization(req, res, next) {

  try {
    const requestPath = `${req.method}:${req.path}`;

    if (EXCLUDES.includes(requestPath) || req.method === 'OPTIONS') {

      next();
      return;
    }

    const { authorization } = req.headers;

    if(!authorization){
      throw HttpError(401, "Authorization header i missing")
    }

    const { userId } = jwt.verify(authorization.replace('Bearer ', ''), JWT_SECRET)
    if (!userId) {
      throw HttpError(401)
    }
    req.userId = userId;
    next();
  } catch (e) {
    e.status = 401;
    next(e);
  }
}
