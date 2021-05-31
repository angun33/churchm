import {IsIP} from "class-validator";
import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import {UserEntity} from "./user.entity";

@Entity({name: 'tokens'})
export class TokenEntity {
  @PrimaryColumn({unique: true})
  token: string

  @CreateDateColumn()
  createdAt: Date

  @Column()
  expiredAt: Date

  @Column()
  @IsIP()
  ipAddress: string

  @Column()
  platform: string

  @ManyToOne(() => UserEntity, { cascade: true })
  user: UserEntity
}
