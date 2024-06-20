const ALLOW_ORIGINS = [
  'http://localhost:3000',
  'https://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3001',
  'http://localhost:3002',
  'https://localhost:3002',
  "https://vago-group-admin.vercel.app",
  "https://vago-group.vercel.app"
];

export default function cors(req, res, next) {
  try {
    const { origin } = req.headers;
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization,Content-Type');
    // if (ALLOW_ORIGINS.includes(origin)) {
    //   res.setHeader('Access-Control-Allow-Origin', origin);
    //   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    //   res.setHeader('Access-Control-Allow-Headers', 'Authorization,Content-Type');
    // }
    next();
  } catch (e) {
    next(e)
  }
}


