import express from "express";
import { Request, Response } from "express";
import { createServer } from "http";
import config from "config";
import logger from "./utils/logger";
import fileupload from "express-fileupload";
import { version } from "../package.json";
import { routes } from './routes';
import path from 'path';


const port = config.get<number>("port");
const host = config.get<string>("host");
const corsOrigin = config.get<string>("corsOrigin");

const app = express();

const httpServer = createServer(app);

/* const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
}); */
// routes
const act:any = true;
app.use(function (req : Request, res : Response, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3009');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', act);

    // Pass to next layer of middleware
    next();
});
app.use(express.json());
app.use(fileupload());
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(routes);
// app.get("/", (_, res) =>
//   res.send(`Server is up and running version ${version}`)
// );

httpServer.listen(port, host, () => {
  // logger.info(`🚀 Server version ${version} is listening 🚀`);
  // logger.info(`http://${host}:${port}`);
  // example check
  // exampleController.exampleCheck();
});
