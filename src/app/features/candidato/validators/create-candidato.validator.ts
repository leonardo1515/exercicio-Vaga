import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../../shared/errors/api.error";
import { RequestError } from "../../../shared/errors/request.error";
import { UsuarioRepository } from "../../usuario/database/usuario.repository";

export class CreateCandidatoValidator {
  public static async validate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { nome, username, password } = req.body;

      if (!nome) {
        RequestError.fieldNotProvided(res, "Name");
      }

      if (!username) {
        RequestError.fieldNotProvided(res, "Username");
      }

      if (!password) {
        RequestError.fieldNotProvided(res, "Password");
      }

      //to do - fazer validação separada

      next();
    } catch (error: any) {
      ApiError.serverError(res, error);
    }
  }
}
