import { TipoUsuario } from "../../../models/usuario.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/return.contract";
import { UsuarioRepository } from "../../usuario/database/usuario.repository";

export class ListRecrutadoresUsecase {
  public async execute(): Promise<Return> {
    const cacheRepository = new CacheRepository();
    const cacheResult = await cacheRepository.get("listaRecrutadores");

    if (cacheResult) {
      return {
        ok: true,
        code: 200,
        message: "Recrutadores listados com sucesso! - Cache",
        data: cacheResult,
      };
    }

    const repository = new UsuarioRepository();
    const listaRecrutadores = await repository.list(TipoUsuario.Recrutador);

    const result = await cacheRepository.set(
      `listaRecrutadores`,
      listaRecrutadores
    );

    return {
      ok: true,
      code: 200,
      message: "Recrutadores listados com sucesso!",
      data: listaRecrutadores,
    };
  }
}
