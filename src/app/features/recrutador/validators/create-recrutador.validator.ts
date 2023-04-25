import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../../shared/errors/api.error";
import { RequestError } from "../../../shared/errors/request.error";
import { UsuarioRepository } from "../../usuario/database/usuario.repository";
import { TipoUsuario } from "../../../models/usuario.model";

export class CreateRecrutadorValidator {
  public static async validate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { nome, username, password, nomeEmpresa } = req.body;

      if (!nome) {
        RequestError.fieldNotProvided(res, "Name");
      }

      if (!username) {
        RequestError.fieldNotProvided(res, "Username");
      }

      if (!password) {
        RequestError.fieldNotProvided(res, "Password");
      }

      if (!nomeEmpresa) {
        RequestError.fieldNotProvided(res, "Company name");
      }

      const repository = new UsuarioRepository();
      const usuario = await repository.getByUsernameAndType(
        username,
        TipoUsuario.Recrutador
      );

      if (usuario !== null) {
        RequestError.invalidData(res, "Username já existe!");
      }

      next();
    } catch (error: any) {
      ApiError.serverError(res, error);
    }
  }
}
