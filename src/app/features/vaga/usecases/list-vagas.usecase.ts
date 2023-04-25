import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/return.contract";
import { VagaRepository } from "../database/vaga.repository";

export class ListVagasUsecase {
  public async execute(): Promise<Return> {
    const cacheRepository = new CacheRepository();
    const cacheResult = await cacheRepository.get("listaVagas");

    if (cacheResult) {
      return {
        ok: true,
        code: 200,
        message: "Vagas listadas com sucesso! - Cache",
        data: cacheResult,
      };
    }
    const repository = new VagaRepository();
    const listaVagas = await repository.list();

    const result = await cacheRepository.set(`listaVagas`, listaVagas);

    return {
      ok: true,
      code: 200,
      message: "Vagas listadas com sucesso.",
      data: listaVagas,
    };
  }
}
