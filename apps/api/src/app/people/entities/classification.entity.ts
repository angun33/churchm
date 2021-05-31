import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

export interface Classification {
  id: number
  name: string
  order: number
}

@Entity('classifications')
export class ClassificationEntity implements Classification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({default: 0})
  order: number;
}
