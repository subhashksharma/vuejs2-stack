'use strict';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';

//ts-ignore
import * as allergyData from '../static-json/allergyData.json';

import { strict } from 'assert';

const router = express.Router();

router.get('/api/allergy', async (req: Request, res: Response) => {
  res.send(allergyData);
});

export { router as staticDataRoutes };
