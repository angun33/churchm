import {IsIP} from "class-validator";
import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import {UserEntity} from "./user.entity";

@Entity({name: 'tokens'})
export class TokenEntity {
  @PrimaryColumn({unique: true})
  token: string

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date

  @Column({name: 'expired_at'})
  expiredAt: Date

  @Column({name: 'ip_address'})
  @IsIP()
  ipAddress: string

  @Column()
  platform: string

  @ManyToOne(() => UserEntity, { cascade: true })
  user: UserEntity
}
