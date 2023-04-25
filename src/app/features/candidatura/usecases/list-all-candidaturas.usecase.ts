import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/return.contract";
import { CandidaturaRepository } from "../database/candidatura.database";

export class ListAllCandidaturasUsecase {
  public async execute(): Promise<Return> {
    const cacheRepository = new CacheRepository();

    const cacheResult = await cacheRepository.get("listaCandidaturas");

    if (cacheResult) {
      return {
        ok: true,
        code: 200,
        message: "Lista de candidaturas obtidas com sucesso! - Cache",
        data: cacheResult,
      };
    }

    const candidaturaRepository = new CandidaturaRepository();

    const listaCandidaturas = await candidaturaRepository.listAll();
    // console.log(listaCandidaturas);

    const result = await cacheRepository.set(
      `listaCandidaturas`,
      listaCandidaturas
    );

    if (!listaCandidaturas) {
      return {
        ok: false,
        code: 404,
        message: "Candidaturas não encontradas.",
      };
    }

    return {
      ok: true,
      code: 200,
      message: "Candidaturas listadas com sucesso!",
      data: listaCandidaturas,
    };
  }
}
