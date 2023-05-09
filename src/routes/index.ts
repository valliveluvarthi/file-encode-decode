import express from 'express';
import  defaultRoute  from './exapleRoute';

export const routes = express.Router();

routes.use(defaultRoute);
// we can add the routes here