import { TypeormConnection } from "../../../../main/database/typeorm.connection";
import { TipoUsuario, Usuario } from "../../../models/usuario.model";
import { UsuarioEntity } from "../../../shared/database/entities/usuario.entity";

interface GetParams {
  username: string;
  password?: string;
  tipo?: TipoUsuario;
}

export class UsuarioRepository {
  private repository =
    TypeormConnection.connection.getRepository(UsuarioEntity);

  public async getByUsernameAndType(
    username: string,
    tipo: TipoUsuario
  ): Promise<Usuario | null> {
    const result = await this.repository.findOneBy({
      username,
      tipo,
    });
    if (!result) {
      return null;
    }

    return UsuarioRepository.mapEntityToModel(result);
  }

  public async getByUsername(params: GetParams): Promise<Usuario | null> {
    const result = await this.repository.findOneBy({
      username: params.username,
      password: params.password,
      tipo: params.tipo,
    });

    if (!result) {
      return null;
    }

    return UsuarioRepository.mapEntityToModel(result);
  }

  public async get(id: string): Promise<Usuario | null> {
    const result = await this.repository.findOneBy({
      id,
    });

    if (!result) {
      return null;
    }

    return UsuarioRepository.mapEntityToModel(result);
  }

  public async create(usuario: Usuario) {
    const usuarioEntity = this.repository.create({
      id: usuario.id,
      nome: usuario.nome,
      username: usuario.username,
      nomeEmpresa: usuario.nomeEmpresa,
      password: usuario.password,
      tipo: usuario.tipo,
    });

    await this.repository.save(usuarioEntity);
  }

  public async list(tipo?: TipoUsuario) {
    const result = await this.repository.findBy({
      tipo,
    });

    return result.map((item) => UsuarioRepository.mapEntityToModel(item));
  }

  public static mapEntityToModel(entity: UsuarioEntity): Usuario {
    return Usuario.create(
      entity.id,
      entity.nome,
      entity.username,
      entity.password,
      entity.tipo,
      entity.nomeEmpresa
    );
  }
}
