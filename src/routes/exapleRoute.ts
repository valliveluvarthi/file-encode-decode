import { Router } from 'express';
import cors from 'cors';
import  exampleClassCheck  from "../controllers/example";
import { Request, Response } from "express";
import fileUpload from "express-fileupload";

// route
const defaultRoute = Router();

defaultRoute.get('/', (req, res) => {
    exampleClassCheck.exampleCheck();
    exampleClassCheck.exampleCheckReqRes(req,res);
});
defaultRoute.get('/dashboard', (req, res) => {
    exampleClassCheck.exampleCheckDashboardReqRes(req,res);
});
defaultRoute.post('/upload', (req : Request, res : Response) => {
    exampleClassCheck.exampleCheckDashboardReqRes(req,res);
});
defaultRoute.get('/download/:fn', (req : Request, res : Response) => {
    exampleClassCheck.downloadFile(req,res);
});
defaultRoute.post('/decode', (req : Request, res : Response) => {
    exampleClassCheck.decodeBase64Str(req,res);
});
export default defaultRoute;