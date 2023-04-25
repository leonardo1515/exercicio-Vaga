import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/return.contract";
import { VagaRepository } from "../database/vaga.repository";

export class ListarVagaUsecase {
  public async execute(idVaga: string): Promise<Return> {
    const cacheRepository = new CacheRepository();

    const cacheResult = await cacheRepository.get(`listaVaga:${idVaga}`);

    if (cacheResult) {
      return {
        ok: true,
        code: 200,
        message: "Vaga obtida com sucesso! - Cache",
        data: cacheResult,
      };
    }

    const repository = new VagaRepository();
    const listaVaga = await repository.get(idVaga);

    await cacheRepository.set(`listaVaga:${idVaga}`, listaVaga);

    if (!listaVaga) {
      return {
        ok: false,
        code: 404,
        message: "Vaga não encontrada",
      };
    }
    return {
      ok: true,
      code: 200,
      message: "Vaga obtida com sucesso!",
      data: listaVaga,
    };
  }
}
