import express from "express";
import path from "node:path";
import fs from "node:fs"
import https from "node:https";
import indexRouter from "./routes/index.js";
import HttpError from "http-errors";
import authorization from "./middelwares/authorization.js";
import errorHandler from "./middelwares/errorHandler.js";
import cors from "./middelwares/cors.js";

const app = express();

app.use(cors);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve('public')));

app.use(authorization)
app.use(indexRouter)
app.use((req, res, next) => {
    next(HttpError(404))
})

app.use(errorHandler)

const sslServer = https.createServer({
    key: fs.readFileSync(path.join("cert", "key.pem")),
    cert: fs.readFileSync(path.join("cert", "cert.pem"))
}, app)

sslServer.listen(4001, () => {
    console.log('Server started...');
})
