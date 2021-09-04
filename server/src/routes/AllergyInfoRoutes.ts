'use strict';
import express, { raw, Request, Response } from 'express';
import AllergyInfoServiceController from '../controller/AllergyInfoServiceController';

const router = express.Router();

router.get('/patient/:id', async (req: Request, res: Response) => {
  console.log(`GET :: /patient ::::: ${req.params.id}`);

  const patientData = await AllergyInfoServiceController.getPatientBaseOnCriteria({
    _id: req.params.id,
  })
    .then((patient) => {
      return patient;
    })
    .catch((err) => {
      console.log(err);
      console.error;
      res.status(500).send(err);
    });
  res.status(201).send(patientData);
});


export { router as AllergyInfoRoutes };
