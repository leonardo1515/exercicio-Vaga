import { TipoUsuario } from "../../../models/usuario.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/return.contract";
import { UsuarioRepository } from "../../usuario/database/usuario.repository";

export class ListCandidatoUsecase {
  public async execute(): Promise<Return> {
    const cacheRepository = new CacheRepository();
    const cacheResult = await cacheRepository.get("listaCandidatos");

    if (cacheResult) {
      return {
        ok: true,
        code: 200,
        message: "Candidatos listados com sucesso! - Cache",
        data: cacheResult,
      };
    }
    const repository = new UsuarioRepository();
    const listaCandidatos = await repository.list(TipoUsuario.Candidato);

    const result = await cacheRepository.set(
      `listaCandidatos`,
      listaCandidatos
    );

    return {
      ok: true,
      code: 200,
      message: "Candidatos listados com sucesso",
      data: listaCandidatos,
    };
  }
}
