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
  'POST:/home-info/add',
  'POST:/login-image/add',
  'POST:/welcome/add',
  'POST:/products/add',
  'GET:/works/list',
  'GET:/contacts/list',
  'GET:/partners/list',
  'GET:/prices/list',
  'GET:/login-image/list',
];

export default function authorization(req, res, next) {

  try {
    const requestPath = `${req.method}:${req.path}`;

    if (EXCLUDES.includes(requestPath) || req.method === 'OPTIONS') {

      next();
      return;
    }

    const { authorization } = req.headers;

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
