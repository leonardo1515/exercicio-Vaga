import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/return.contract";
import { CandidaturaRepository } from "../database/candidatura.database";

export class ListarCandidaturasUsecase {
  public async execute(idCandidato: string): Promise<Return> {
    const cacheRepository = new CacheRepository();

    const cacheResult = await cacheRepository.get(
      `listaCandidatura:${idCandidato}`
    );

    if (cacheResult) {
      return {
        ok: true,
        code: 200,
        message: "Candidaturas obtidas com sucesso! - Cache",
        data: cacheResult,
      };
    }

    const repository = new CandidaturaRepository();
    const listaCandidaturas = await repository.getById(idCandidato);

    await cacheRepository.set(
      `listaCandidatura:${idCandidato}`,
      listaCandidaturas
    );

    if (!listaCandidaturas) {
      return {
        ok: false,
        code: 404,
        message: "Candidaturas não encontradas",
      };
    }
    return {
      ok: true,
      code: 200,
      message: "Candidaturas obtidas com sucesso!",
      data: listaCandidaturas,
    };
  }
}
