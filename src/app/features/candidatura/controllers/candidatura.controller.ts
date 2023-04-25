import { Request, Response } from "express";
import { ApiError } from "../../../shared/errors/api.error";
import {
  AplicacaoUsecase,
  ListAllCandidaturasUsecase,
  ListarCandidaturasUsecase,
} from "../usecases";

export class CandidaturaController {
  public async create(req: Request, res: Response) {
    try {
      const { idVaga } = req.body;

      const candidato = req.headers["usuario"] as string;
      const candidatoDecoded = JSON.parse(candidato);

      const result = await new AplicacaoUsecase().execute({
        idVaga,
        idCandidato: candidatoDecoded._id,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      ApiError.serverError(res, error);
    }
  }

  public async listCandidaturas(req: Request, res: Response) {
    try {
      const candidato = req.headers["usuario"] as string;
      const candidatoDecoded = JSON.parse(candidato);

      const result = await new ListarCandidaturasUsecase().execute(
        candidatoDecoded._id
      );

      return res.status(result.code).send(result);
    } catch (error: any) {
      return ApiError.serverError(res, error);
    }
  }

  public async listAllCandidaturas(req: Request, res: Response) {
    try {
      const result = await new ListAllCandidaturasUsecase().execute();

      return res.status(result.code).send(result);
    } catch (error: any) {
      return ApiError.serverError(res, error);
    }
  }
}
