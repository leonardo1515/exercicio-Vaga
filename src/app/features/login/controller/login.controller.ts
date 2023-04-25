import { Request, Response } from "express";
import { ApiError } from "../../../shared/errors/api.error";
import { LoginUsecase } from "../usecase/login.usecase";

export class LoginController {
  public async login(req: Request, res: Response) {
    try {
      const { username, password, tipo } = req.body;

      const result = await new LoginUsecase().execute({
        username,
        password,
        tipo,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      return ApiError.serverError(res, error);
    }
  }
}
