import { Candidato } from "../../../models/candidato.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/return.contract";
import { UsuarioRepository } from "../../usuario/database/usuario.repository";

interface CreateCandidatoParams {
  nome: string;
  username: string;
  password: string;
}

export class CreateCandidatoUsecase {
  public async execute(data: CreateCandidatoParams): Promise<Return> {
    const repository = new UsuarioRepository();
    const usuario = await repository.getByUsername({ username: data.username });

    if (usuario !== null) {
      return {
        ok: false,
        code: 400,
        message: "Candidato já existe!",
      };
    }

    const candidato = new Candidato(data.nome, data.username, data.password);

    const result = await repository.create(candidato);

    await new CacheRepository().delete(`listaCandidatos`);
    return {
      ok: true,
      code: 201,
      message: "Candidato criado com sucesso!",
      data: result,
    };
  }
}
