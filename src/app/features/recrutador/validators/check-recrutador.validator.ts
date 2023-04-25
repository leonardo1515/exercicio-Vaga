import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../../shared/errors/api.error";
import { JwtAdapter } from "../../../shared/util/jwt.adapter";
import { TipoUsuario } from "../../../models/usuario.model";

export const checkRecrutadorValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const usuario = req.headers["usuario"] as string;

    if (!usuario) {
      return res.status(401).send({
        ok: false,
        message: "Usuario não logado",
      });
    }

    const decodedUsuario = JSON.parse(usuario);

    if (decodedUsuario.tipo !== TipoUsuario.Recrutador) {
      return res.status(403).send({
        ok: false,
        message: "Usuario não possui permissão",
      });
    }
    return next();
  } catch (error: any) {
    return ApiError.serverError(res, error);
  }
};
