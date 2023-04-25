import { Router } from "express";
import { RecrutadorController } from "../controllers/recrutador.controller";
import { checkLoginValidator } from "../../login/validators/check-login.validator";
import { checkRecrutadorValidator } from "../validators/check-recrutador.validator";
import { CreateRecrutadorValidator } from "../validators/create-recrutador.validator";

export const recrutadorRoutes = () => {
  const router = Router();

  router.get(
    "/",
    [checkLoginValidator, checkRecrutadorValidator],
    new RecrutadorController().list
  );
  router.post(
    "/",
    [CreateRecrutadorValidator.validate],
    new RecrutadorController().create
  );

  return router;
};
