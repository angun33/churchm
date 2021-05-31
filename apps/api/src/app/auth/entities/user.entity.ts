import {IsEmail} from "class-validator";
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

export interface User {
  id: number
  username: string
  email: string
}

@Entity({name: 'users'})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;

  @Column({unique: true})
  @IsEmail()
  email: string;

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn({nullable: true})
  updatedAt: Date
}
