import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { UsuarioEntity } from "./usuario.entity";
import { Recrutador } from "../../../models/recrutador.model";

@Entity("vaga")
export class VagaEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  descricao: string;

  @Column()
  nomeEmpresa: string;

  @Column({
    name: "dt_limite",
  })
  dtLimite: Date;

  @Column({
    name: "ind_ativo",
    default: true,
  })
  indAtivo: boolean;

  @Column({
    name: "max_candidatos",
    nullable: true,
    type: "int4",
  })
  maxCandidatos: number;

  @Column({
    name: "id_recrutador",
  })
  idRecrutador: string;

  @ManyToOne(() => UsuarioEntity, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "id_recrutador",
  })
  recrutador: UsuarioEntity;

  @CreateDateColumn({
    name: "dthr_cadastro",
  })
  dthrCadastro: Date;
}
